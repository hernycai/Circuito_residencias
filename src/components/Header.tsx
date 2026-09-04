import React, { useState } from 'react';
import {
  Navigation,
  RotateCcw,
  Share2,
  Check,
  CheckCircle2
} from 'lucide-react';
import { ResidencePlace, RouteSettings } from '../types';

interface HeaderProps {
  settings: RouteSettings;
  places: ResidencePlace[];
  onUpdateSettings: (newSettings: RouteSettings) => void;
  onOpenAddModal?: () => void;
  onReset: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  settings,
  places,
  onUpdateSettings,
  onReset,
}) => {
  const [copied, setCopied] = useState(false);

  // Generate dynamic multi-stop Google Maps URL
  const gmapsRouteUrl = `https://www.google.com/maps/dir/${places
    .map((p) => encodeURIComponent(p.address))
    .join('/')}`;

  const visitedCount = places.filter((p) => p.visited).length;

  const handleCopySummary = () => {
    const summaryText = `${settings.title}\n${settings.subtitle}\n\n${places
      .map(
        (p, i) =>
          `Parada ${i + 1}: ${p.name}\n- Dirección: ${p.address}\n- Tel: ${p.phone}\n- Precio: ${p.price}\n- Notas: ${p.notes}\n- Mapa: https://maps.google.com/?q=${encodeURIComponent(p.address)}`
      )
      .join('\n\n')}\n\nRuta GPS Google Maps: ${gmapsRouteUrl}`;

    navigator.clipboard.writeText(summaryText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleBlurSettings = (field: keyof RouteSettings, value: string) => {
    onUpdateSettings({
      ...settings,
      [field]: value.trim(),
    });
  };

  return (
    <header className="bg-white p-5 md:p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-5">
      <div className="flex-1">
        <div className="flex flex-wrap items-center gap-2 mb-2">
          {/* Active stops badge */}
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-700">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
            <span
              contentEditable
              suppressContentEditableWarning
              onBlur={(e) => handleBlurSettings('badgeText', e.currentTarget.textContent || '')}
              className="editable-field px-1"
              title="Haz clic para editar"
            >
              {places.length} Residencias en Rojo
            </span>
          </span>

          {/* Visited counter if any visited */}
          {visitedCount > 0 && (
            <span className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-medium">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              {visitedCount} de {places.length} visitadas
            </span>
          )}

          <span className="text-xs px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200 font-medium no-print">
            ✏️ Ficha Editable para PDF
          </span>
        </div>

        {/* Editable Title */}
        <h1
          contentEditable
          suppressContentEditableWarning
          onBlur={(e) => handleBlurSettings('title', e.currentTarget.textContent || '')}
          className="editable-field text-xl md:text-2xl font-bold text-slate-900 transition-colors px-1 py-0.5 rounded"
          title="Haz clic para editar el título"
        >
          {settings.title}
        </h1>

        {/* Editable Subtitle */}
        <p
          contentEditable
          suppressContentEditableWarning
          onBlur={(e) => handleBlurSettings('subtitle', e.currentTarget.textContent || '')}
          className="editable-field text-sm text-slate-500 mt-1 px-1 py-0.5 rounded"
          title="Haz clic para editar la descripción"
        >
          {settings.subtitle}
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center gap-2 no-print shrink-0">
        {/* Main Google Maps GPS button */}
        <a
          id="gmapsRouteBtn"
          href={gmapsRouteUrl}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 active:scale-95 transition-all text-white px-4 py-2.5 rounded-xl font-medium text-sm shadow-sm"
          title="Abrir recorrido con todas las paradas en Google Maps"
        >
          <Navigation className="w-4 h-4" />
          Abrir GPS en Google Maps
        </a>

        {/* Copy summary */}
        <button
          type="button"
          onClick={handleCopySummary}
          className="p-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition-all border border-slate-200"
          title="Copiar resumen del circuito para WhatsApp o notas"
        >
          {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4 text-slate-600" />}
        </button>

        {/* Reset button */}
        <button
          type="button"
          onClick={onReset}
          className="p-2.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition-all"
          title="Restaurar datos originales"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
};
