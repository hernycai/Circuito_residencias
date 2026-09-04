import React from 'react';
import {
  Navigation,
  RotateCcw
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
  // Generate dynamic multi-stop Google Maps URL
  const gmapsRouteUrl = `https://www.google.com/maps/dir/${places
    .map((p) => encodeURIComponent(p.address))
    .join('/')}`;

  const handleBlurSettings = (field: keyof RouteSettings, value: string) => {
    onUpdateSettings({
      ...settings,
      [field]: value.trim(),
    });
  };

  return (
    <header className="bg-white p-5 md:p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-5">
      <div className="flex-1">
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

        {/* Reset button */}
        <button
          type="button"
          onClick={onReset}
          className="p-2.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition-all border border-transparent hover:border-slate-200"
          title="Restaurar datos originales"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
};
