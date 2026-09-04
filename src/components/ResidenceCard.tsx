import React from 'react';
import {
  MapPin,
  Phone,
  ExternalLink,
  MessageCircle,
  CheckCircle2,
  Circle,
  Trash2,
  ChevronUp,
  ChevronDown,
  Navigation
} from 'lucide-react';
import { ResidencePlace } from '../types';

interface ResidenceCardProps {
  place: ResidencePlace;
  index: number;
  totalPlaces: number;
  isFocused: boolean;
  onFocus: () => void;
  onUpdate: (updated: ResidencePlace) => void;
  onDelete: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
}

export const ResidenceCard: React.FC<ResidenceCardProps> = ({
  place,
  index,
  totalPlaces,
  isFocused,
  onFocus,
  onUpdate,
  onDelete,
  onMoveUp,
  onMoveDown,
}) => {
  const cleanPhone = place.phone.replace(/\D/g, '');
  const gmapsUrl = `https://maps.google.com/?q=${encodeURIComponent(place.address)}`;

  const handleBlurText = (field: keyof ResidencePlace, value: string) => {
    onUpdate({
      ...place,
      [field]: value.trim(),
    });
  };

  const toggleVisited = () => {
    onUpdate({
      ...place,
      visited: !place.visited,
    });
  };

  const handleTieredChange = (tierId: string, field: 'label' | 'amount', value: string) => {
    if (!place.pricesTiered) return;
    const updatedTiered = place.pricesTiered.map((t) =>
      t.id === tierId ? { ...t, [field]: value.trim() } : t
    );
    onUpdate({
      ...place,
      pricesTiered: updatedTiered,
      price: updatedTiered.map((t) => `${t.label}: ${t.amount}`).join(' | '),
    });
  };

  return (
    <div
      id={`place-card-${place.id}`}
      className={`page-card bg-white border transition-all duration-200 p-5 rounded-2xl shadow-sm flex flex-col gap-3.5 relative ${
        isFocused ? 'border-red-500 ring-2 ring-red-100 shadow-md' : 'border-slate-200 hover:border-red-300'
      } ${place.visited ? 'bg-emerald-50/20' : ''}`}
    >
      {/* Top row */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
        <div className="flex items-start gap-4">
          {/* Parada number badge */}
          <button
            type="button"
            onClick={onFocus}
            title="Centrar en el mapa"
            className={`w-10 h-10 rounded-full text-white font-bold flex items-center justify-center shrink-0 shadow-sm transition-transform active:scale-95 cursor-pointer ${
              place.visited ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-red-600 hover:bg-red-700'
            }`}
          >
            {index + 1}
          </button>

          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h3
                contentEditable
                suppressContentEditableWarning
                onBlur={(e) => handleBlurText('name', e.currentTarget.textContent || '')}
                className="editable-field font-bold text-slate-900 text-base md:text-lg px-1 py-0.5"
                title="Haz clic para editar el nombre"
              >
                {place.name}
              </h3>

              <span
                contentEditable
                suppressContentEditableWarning
                onBlur={(e) => handleBlurText('badge', e.currentTarget.textContent || '')}
                className={`editable-field text-xs font-semibold px-2 py-0.5 rounded border ${
                  place.visited
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                    : 'bg-red-50 text-red-700 border-red-200'
                }`}
                title="Haz clic para editar la etiqueta de estado"
              >
                {place.badge}
              </span>

              {/* Status pill: visited/pending */}
              <button
                type="button"
                onClick={toggleVisited}
                className={`no-print inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full font-medium transition-colors ${
                  place.visited
                    ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
                title={place.visited ? 'Marcar como pendiente' : 'Marcar como visitada'}
              >
                {place.visited ? (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Visitada</span>
                  </>
                ) : (
                  <>
                    <Circle className="w-3.5 h-3.5 text-slate-400" />
                    <span>Por visitar</span>
                  </>
                )}
              </button>
            </div>

            {/* Address */}
            <div className="text-slate-600 text-sm mt-1.5 flex items-center gap-1.5 flex-wrap">
              <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
              <strong>Dirección:</strong>
              <span
                contentEditable
                suppressContentEditableWarning
                onBlur={(e) => handleBlurText('address', e.currentTarget.textContent || '')}
                className="editable-field text-slate-800 px-1 py-0.5 font-medium"
                title="Haz clic para editar la dirección"
              >
                {place.address}
              </span>
            </div>

            {/* Phone */}
            <div className="text-slate-600 text-sm mt-1 flex items-center gap-1.5 flex-wrap">
              <Phone className="w-4 h-4 text-slate-400 shrink-0" />
              <strong>Teléfono:</strong>
              <span
                contentEditable
                suppressContentEditableWarning
                onBlur={(e) => handleBlurText('phone', e.currentTarget.textContent || '')}
                className="editable-field text-blue-700 font-semibold px-1 py-0.5"
                title="Haz clic para editar el teléfono"
              >
                {place.phone}
              </span>

              <div className="no-print inline-flex items-center gap-1 ml-1">
                <a
                  href={`tel:${place.phone}`}
                  className="p-1 text-slate-400 hover:text-blue-600 transition-colors"
                  title="Llamar por teléfono"
                >
                  <Phone className="w-3.5 h-3.5" />
                </a>
                {cleanPhone && (
                  <a
                    href={`https://wa.me/549${cleanPhone}`}
                    target="_blank"
                    rel="noreferrer"
                    className="p-1 text-slate-400 hover:text-emerald-600 transition-colors"
                    title="Enviar WhatsApp"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Pricing and Google Maps column */}
        <div className="flex flex-col sm:flex-row md:flex-col items-start md:items-end justify-between gap-2 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-slate-100 min-w-[170px]">
          <div className="text-left md:text-right w-full">
            <span className="text-[11px] text-slate-400 block uppercase tracking-wider font-semibold">
              {place.priceType === 'tiered' ? 'Precios planilla' : 'Precio planilla'}
            </span>

            {place.priceType === 'tiered' && place.pricesTiered ? (
              <div className="text-xs font-semibold text-slate-700 space-y-1 mt-0.5">
                {place.pricesTiered.map((tier) => (
                  <div key={tier.id} className="flex md:justify-end items-center gap-1">
                    <span
                      contentEditable
                      suppressContentEditableWarning
                      onBlur={(e) => handleTieredChange(tier.id, 'label', e.currentTarget.textContent || '')}
                      className="editable-field px-1"
                    >
                      {tier.label}:
                    </span>
                    <span
                      contentEditable
                      suppressContentEditableWarning
                      onBlur={(e) => handleTieredChange(tier.id, 'amount', e.currentTarget.textContent || '')}
                      className="editable-field text-emerald-700 font-bold px-1"
                    >
                      {tier.amount}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div
                contentEditable
                suppressContentEditableWarning
                onBlur={(e) => handleBlurText('price', e.currentTarget.textContent || '')}
                className={`editable-field px-1 py-0.5 ${
                  place.price.startsWith('$')
                    ? 'text-emerald-700 font-bold text-lg'
                    : 'text-slate-600 font-semibold text-base italic'
                }`}
                title="Haz clic para editar el precio"
              >
                {place.price}
              </div>
            )}
          </div>

          <div className="flex items-center gap-2 no-print">
            <button
              type="button"
              onClick={onFocus}
              className="inline-flex items-center gap-1 text-xs text-slate-600 hover:text-red-600 font-medium px-2 py-1 rounded-lg hover:bg-slate-50 transition-colors"
              title="Centrar en mapa interactivo"
            >
              <Navigation className="w-3 h-3 text-red-500" />
              Ver en mapa
            </button>
            <a
              href={gmapsUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800 font-medium px-2 py-1 rounded-lg hover:bg-blue-50 transition-colors"
              title="Abrir ubicación en Google Maps"
            >
              Google Maps
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>

      {/* Editable notes block */}
      <div className="mt-1 pt-2.5 border-t border-slate-100 flex items-start gap-2">
        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide shrink-0 pt-0.5">
          Notas:
        </span>
        <div
          contentEditable
          suppressContentEditableWarning
          onBlur={(e) => handleBlurText('notes', e.currentTarget.textContent || '')}
          className="editable-field text-xs text-slate-600 flex-1 min-h-[22px] px-1.5 py-0.5 rounded"
          title="Haz clic para escribir horario de visita, contacto o requisitos..."
        >
          {place.notes}
        </div>
      </div>

      {/* Control bar (Reorder, Delete, Focus) - no print */}
      <div className="no-print pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={onMoveUp}
            disabled={index === 0}
            className="p-1 rounded hover:bg-slate-100 disabled:opacity-30 disabled:hover:bg-transparent text-slate-500"
            title="Mover arriba en el orden de visita"
          >
            <ChevronUp className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={onMoveDown}
            disabled={index === totalPlaces - 1}
            className="p-1 rounded hover:bg-slate-100 disabled:opacity-30 disabled:hover:bg-transparent text-slate-500"
            title="Mover abajo en el orden de visita"
          >
            <ChevronDown className="w-4 h-4" />
          </button>
          <span className="text-[11px] text-slate-400 ml-1">Orden #{index + 1} de {totalPlaces}</span>
        </div>

        <div className="flex items-center gap-2">
          {totalPlaces > 1 && (
            <button
              type="button"
              onClick={onDelete}
              className="inline-flex items-center gap-1 text-slate-400 hover:text-red-600 p-1 rounded transition-colors"
              title="Eliminar residencia del circuito"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span className="text-[11px]">Eliminar</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
