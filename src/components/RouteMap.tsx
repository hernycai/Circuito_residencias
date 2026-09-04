import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import { ResidencePlace } from '../types';

interface RouteMapProps {
  places: ResidencePlace[];
  focusedPlaceId: number | null;
  onSelectPlace: (id: number) => void;
}

export const RouteMap: React.FC<RouteMapProps> = ({
  places,
  focusedPlaceId,
  onSelectPlace,
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersRef = useRef<{ [key: number]: L.Marker }>({});
  const polylineRef = useRef<L.Polyline | null>(null);

  // Initialize map once
  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    const map = L.map(mapContainerRef.current, {
      center: [-34.6140, -58.6975],
      zoom: 14,
      zoomControl: true,
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noreferrer">OpenStreetMap</a>',
      maxZoom: 19,
    }).addTo(map);

    mapInstanceRef.current = map;

    // Handle container resize
    const resizeObserver = new ResizeObserver(() => {
      map.invalidateSize();
    });
    if (mapContainerRef.current) {
      resizeObserver.observe(mapContainerRef.current);
    }

    return () => {
      resizeObserver.disconnect();
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Update markers and polyline when places change
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    // Clean old markers
    for (const id in markersRef.current) {
      const marker = markersRef.current[id];
      if (marker) {
        marker.remove();
      }
    }
    markersRef.current = {};

    if (polylineRef.current) {
      polylineRef.current.remove();
      polylineRef.current = null;
    }

    if (places.length === 0) return;

    const latlngs: [number, number][] = [];

    places.forEach((place, index) => {
      const isFocused = place.id === focusedPlaceId;
      const isVisited = place.visited;

      const markerClass = `custom-marker ${isFocused ? 'active-marker' : ''} ${isVisited ? 'visited-marker' : ''}`;

      const customIcon = L.divIcon({
        className: 'custom-div-icon',
        html: `<div class="${markerClass}" style="width:34px;height:34px;font-size:15px;" title="Parada ${index + 1}: ${place.name}">${index + 1}</div>`,
        iconSize: [34, 34],
        iconAnchor: [17, 17],
        popupAnchor: [0, -18],
      });

      const marker = L.marker([place.lat, place.lng], { icon: customIcon }).addTo(map);

      const popupHtml = `
        <div class="p-1 min-w-[180px]">
          <span class="inline-block px-2 py-0.5 rounded ${place.visited ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-700'} text-xs font-bold mb-1">
            Parada ${index + 1} ${place.visited ? '✓ Visitada' : ''}
          </span>
          <h4 class="font-bold text-slate-900 text-sm">${place.name}</h4>
          <p class="text-xs text-slate-600 mt-0.5">${place.address}</p>
          <p class="text-xs text-slate-600"><strong>Tel:</strong> ${place.phone}</p>
          <p class="text-xs text-emerald-700 font-semibold mt-1">Precio: ${place.price}</p>
          <div class="mt-2 pt-1.5 border-t border-slate-100 flex items-center gap-2.5 flex-wrap">
            <a href="https://maps.google.com/?q=${encodeURIComponent(place.address)}" target="_blank" rel="noreferrer" class="text-[11px] text-blue-600 hover:underline font-medium">Google Maps ↗</a>
            ${place.website ? `<a href="${/^https?:\/\//i.test(place.website) ? place.website : 'https://' + place.website}" target="_blank" rel="noreferrer" class="text-[11px] text-emerald-700 hover:underline font-medium">Sitio Web ↗</a>` : ''}
          </div>
        </div>
      `;

      marker.bindPopup(popupHtml);

      marker.on('click', () => {
        onSelectPlace(place.id);
      });

      markersRef.current[place.id] = marker;
      latlngs.push([place.lat, place.lng]);
    });

    if (latlngs.length > 1) {
      const polyline = L.polyline(latlngs, {
        color: '#ef4444',
        weight: 4,
        opacity: 0.85,
        dashArray: '8, 8',
      }).addTo(map);
      polylineRef.current = polyline;

      map.fitBounds(polyline.getBounds(), { padding: [45, 45], maxZoom: 15 });
    } else if (latlngs.length === 1) {
      map.setView(latlngs[0], 15);
    }
  }, [places, onSelectPlace, focusedPlaceId]);

  // Handle focus changes
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map || focusedPlaceId === null) return;

    const place = places.find((p) => p.id === focusedPlaceId);
    const marker = markersRef.current[focusedPlaceId];

    if (place && marker) {
      map.flyTo([place.lat, place.lng], 16, { animate: true, duration: 0.8 });
      marker.openPopup();
    }
  }, [focusedPlaceId, places]);

  return (
    <div className="relative w-full">
      <div
        id="map"
        ref={mapContainerRef}
        className="h-[360px] md:h-[420px] w-full rounded-2xl z-10 border border-slate-200 shadow-inner"
      />
      <div className="absolute top-3 right-3 z-20 flex gap-1.5 no-print">
        <button
          type="button"
          id="btn-fit-route"
          onClick={() => {
            const map = mapInstanceRef.current;
            if (map && polylineRef.current) {
              map.fitBounds(polylineRef.current.getBounds(), { padding: [40, 40] });
            }
          }}
          className="bg-white/95 hover:bg-white text-slate-700 text-xs px-2.5 py-1.5 rounded-lg shadow-sm border border-slate-200 font-medium flex items-center gap-1 transition-colors"
          title="Ver todo el circuito"
        >
          <span>🎯</span> Centrar Circuito
        </button>
      </div>
    </div>
  );
};

