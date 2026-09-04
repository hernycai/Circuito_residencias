/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import {
  MapPin,
  AlertCircle,
  Clock,
  Navigation2,
  PlusCircle,
  FileSpreadsheet
} from 'lucide-react';
import { ResidencePlace, RouteSettings } from './types';
import { INITIAL_PLACES, INITIAL_SETTINGS } from './data/initialData';
import { RouteMap } from './components/RouteMap';
import { ResidenceCard } from './components/ResidenceCard';
import { Header } from './components/Header';
import { AddStopModal } from './components/AddStopModal';

const STORAGE_KEY_PLACES = 'circuito_residencias_places_v1';
const STORAGE_KEY_SETTINGS = 'circuito_residencias_settings_v1';

export default function App() {
  const [places, setPlaces] = useState<ResidencePlace[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_PLACES);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // fallback
    }
    return INITIAL_PLACES;
  });

  const [settings, setSettings] = useState<RouteSettings>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_SETTINGS);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // fallback
    }
    return INITIAL_SETTINGS;
  });

  const [focusedPlaceId, setFocusedPlaceId] = useState<number | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Save changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_PLACES, JSON.stringify(places));
    } catch {
      // ignore
    }
  }, [places]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_SETTINGS, JSON.stringify(settings));
    } catch {
      // ignore
    }
  }, [settings]);

  const handleUpdatePlace = (updated: ResidencePlace) => {
    setPlaces((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
  };

  const handleDeletePlace = (id: number) => {
    if (places.length <= 1) return;
    setPlaces((prev) => prev.filter((p) => p.id !== id));
    if (focusedPlaceId === id) {
      setFocusedPlaceId(null);
    }
  };

  const handleMoveUp = (index: number) => {
    if (index === 0) return;
    setPlaces((prev) => {
      const next = [...prev];
      const temp = next[index - 1];
      next[index - 1] = next[index];
      next[index] = temp;
      return next;
    });
  };

  const handleMoveDown = (index: number) => {
    if (index === places.length - 1) return;
    setPlaces((prev) => {
      const next = [...prev];
      const temp = next[index + 1];
      next[index + 1] = next[index];
      next[index] = temp;
      return next;
    });
  };

  const handleAddPlace = (newPlace: ResidencePlace) => {
    setPlaces((prev) => [...prev, newPlace]);
    setFocusedPlaceId(newPlace.id);
  };

  const handleReset = () => {
    if (window.confirm('¿Deseas restablecer el circuito con los 3 lugares originales?')) {
      setPlaces(INITIAL_PLACES);
      setSettings(INITIAL_SETTINGS);
      setFocusedPlaceId(null);
      localStorage.removeItem(STORAGE_KEY_PLACES);
      localStorage.removeItem(STORAGE_KEY_SETTINGS);
    }
  };

  const handleFocusPlace = (id: number) => {
    setFocusedPlaceId(id);
    // Smooth scroll to card if on mobile
    const cardEl = document.getElementById(`place-card-${id}`);
    if (cardEl) {
      cardEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  };

  const nextId = places.length > 0 ? Math.max(...places.map((p) => p.id)) + 1 : 1;

  return (
    <div className="bg-slate-100 text-slate-800 min-h-screen antialiased flex flex-col items-center p-3 md:p-6 selection:bg-red-100 selection:text-red-900">
      <div className="w-full max-w-4xl flex flex-col gap-5">
        {/* Top Header */}
        <Header
          settings={settings}
          places={places}
          onUpdateSettings={setSettings}
          onOpenAddModal={() => setIsAddModalOpen(true)}
          onReset={handleReset}
        />

        {/* Informative notification banner (no-print) */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-2.5 flex items-center justify-between text-xs text-amber-900 no-print shadow-xs">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
            <span>
              <strong>Documento editable:</strong> Puedes hacer clic y modificar directamente cualquier nombre, dirección, precio o agregar notas de visita en la hoja. Los cambios se guardan automáticamente.
            </span>
          </div>
        </div>

        {/* Interactive Map Section */}
        <section className="bg-white p-4 md:p-5 rounded-2xl shadow-sm border border-slate-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
            <h2 className="font-semibold text-slate-800 flex items-center gap-2 text-sm md:text-base">
              <MapPin className="w-5 h-5 text-red-500" />
              <span>Mapa del Circuito: Parque Leloir / Villa Udaondo</span>
            </h2>
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                <span>
                  Total circuito:{' '}
                  <span
                    contentEditable
                    suppressContentEditableWarning
                    onBlur={(e) =>
                      setSettings({ ...settings, estimatedDistance: e.currentTarget.textContent || '' })
                    }
                    className="editable-field font-medium text-slate-700 px-0.5"
                  >
                    {settings.estimatedDistance}
                  </span>{' '}
                  (
                  <span
                    contentEditable
                    suppressContentEditableWarning
                    onBlur={(e) =>
                      setSettings({ ...settings, estimatedTime: e.currentTarget.textContent || '' })
                    }
                    className="editable-field font-medium text-slate-700 px-0.5"
                  >
                    {settings.estimatedTime}
                  </span>
                  )
                </span>
              </span>
            </div>
          </div>

          <RouteMap
            places={places}
            focusedPlaceId={focusedPlaceId}
            onSelectPlace={handleFocusPlace}
          />
        </section>

        {/* Reference Cards Section */}
        <section className="space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div>
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <FileSpreadsheet className="w-5 h-5 text-red-600" />
                Fichas de Referencia para la Visita
              </h2>
              <span className="text-xs text-slate-500 no-print">
                Haz clic en cualquier campo para editar texto o números
              </span>
            </div>

            <div className="flex items-center gap-2 no-print">
              <button
                type="button"
                onClick={() => setIsAddModalOpen(true)}
                className="inline-flex items-center gap-1.5 text-xs bg-white hover:bg-slate-50 text-slate-700 font-medium px-3 py-1.5 rounded-xl border border-slate-200 shadow-xs transition-colors"
              >
                <PlusCircle className="w-3.5 h-3.5 text-red-600" />
                Agregar Parada
              </button>
            </div>
          </div>

          {/* List of cards */}
          <div className="space-y-4">
            {places.map((place, index) => (
              <ResidenceCard
                key={place.id}
                place={place}
                index={index}
                totalPlaces={places.length}
                isFocused={focusedPlaceId === place.id}
                onFocus={() => handleFocusPlace(place.id)}
                onUpdate={handleUpdatePlace}
                onDelete={() => handleDeletePlace(place.id)}
                onMoveUp={() => handleMoveUp(index)}
                onMoveDown={() => handleMoveDown(index)}
              />
            ))}
          </div>
        </section>

        {/* Quick Route Summary Box for Print & Review */}
        <section className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs text-xs text-slate-600 flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Navigation2 className="w-4 h-4 text-red-500 shrink-0" />
            <span>
              <strong>Orden del circuito recomendado:</strong>{' '}
              {places.map((p, i) => `${i + 1}. ${p.name}`).join(' → ')}
            </span>
          </div>
          <span className="text-slate-400 no-print text-[11px]">
            {places.length} paradas configuradas
          </span>
        </section>

        {/* Footer */}
        <footer className="text-center text-xs text-slate-400 py-3 border-t border-slate-200 mt-2">
          <p
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) =>
              setSettings({ ...settings, footerText: e.currentTarget.textContent || '' })
            }
            className="editable-field inline-block px-2 py-0.5 rounded"
          >
            {settings.footerText}
          </p>
        </footer>
      </div>

      {/* Modal for adding stops */}
      <AddStopModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddPlace}
        nextId={nextId}
      />
    </div>
  );
}
