
import { useEffect, useState } from "react";
import {
    MapContainer,
    TileLayer,
    Marker,
    Popup,
    CircleMarker,
    LayersControl,
    FeatureGroup,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// -----------------------------
// Leaflet default marker fix
// -----------------------------
const DefaultIcon = L.icon({
    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

const TRAFFIC_BASE = "https://trafficnz.info/service/traffic/rest/4";
const NZTA_ARCGIS_CAMERAS =
    "https://services.arcgis.com/XTtANUDT8Va4DLwI/ArcGIS/rest/services/LiveCamerasNZTA_Public_View/FeatureServer/0/query";

// -----------------------------
// Utilities
// -----------------------------

// Convert WebMercator (EPSG:3857) to lat/lng
function mercatorToLatLng(x: number, y: number) {
    const R = 6378137;
    const lng = (x / R) * (180 / Math.PI);
    const lat = (2 * Math.atan(Math.exp(y / R)) - Math.PI / 2) * (180 / Math.PI);
    return { lat, lng };
}

function normalizeIncidents(data: any) {
    if (!data) return [];

    const list = Array.isArray(data?.incidents)
        ? data.incidents
        : Array.isArray(data)
            ? data
            : [];

    return list
        .map((i: any) => ({
            latitude: Number(i.latitude ?? i.lat),
            longitude: Number(i.longitude ?? i.lng),
            title: i.eventType || "Incident",
            description: i.description || "No details",
        }))
        .filter((i: any) => !Number.isNaN(i.latitude) && !Number.isNaN(i.longitude));
}

function normalizeArcGISCameras(data: any) {
    if (!Array.isArray(data?.features)) return [];

    return data.features
        .map((f: any) => {
            if (!f.geometry) return null;
            const { lat, lng } = mercatorToLatLng(f.geometry.x, f.geometry.y);
            return {
                latitude: lat,
                longitude: lng,
                title: f.attributes?.name || f.attributes?.CameraName || "Traffic camera",
                description: f.attributes?.description || f.attributes?.LocationDescription || "NZTA camera",
            };
        })
        .filter(Boolean);
}

// -----------------------------
// Component
// -----------------------------
export default function TrafficMap() {
    const [incidents, setIncidents] = useState<any[]>([]);
    const [trafficCams, setTrafficCams] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function load() {
            try {
                setLoading(true);

                // --- Incidents ---
                const incRes = await fetch(`${TRAFFIC_BASE}/incidents`);
                const incJson = incRes.ok ? await incRes.json() : null;
                const incPoints = normalizeIncidents(incJson);

                // --- NZTA Cameras (authoritative ArcGIS) ---
                const camUrl = `${NZTA_ARCGIS_CAMERAS}?where=1=1&outFields=*&f=json`;
                const camRes = await fetch(camUrl);
                const camJson = camRes.ok ? await camRes.json() : null;
                const camPoints = normalizeArcGISCameras(camJson);

                // --- Runtime sanity checks ---
                console.assert(Array.isArray(incPoints), "Incidents must be an array");
                console.assert(Array.isArray(camPoints), "Cameras must be an array");

                setIncidents(incPoints);
                setTrafficCams(camPoints);
            } catch (e: any) {
                console.error(e);
                setError(e.message || "Failed to load traffic data");
            } finally {
                setLoading(false);
            }
        }

        load();
    }, []);

    if (loading) {
        return (
            <div className="h-full w-full flex items-center justify-center text-[10px] font-black uppercase tracking-widest text-zinc-500 bg-[#09090b]">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-10 h-10 border-2 border-blue-500/20 border-t-blue-500 rounded-full animate-spin"></div>
                    <span>Syncing Strategic Map…</span>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="h-full w-full flex items-center justify-center text-xs text-red-500 font-bold uppercase tracking-tighter bg-[#09090b]">
                {error}
            </div>
        );
    }

    return (
        <div className="h-full w-full relative">
            <MapContainer center={[-41.2, 174.7]} zoom={6} className="h-full w-full" zoomControl={false}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                />

                <LayersControl position="topright">
                    <LayersControl.Overlay checked name={`Incidents (${incidents.length})`}>
                        <FeatureGroup>
                            {incidents.map((i, idx) => (
                                <CircleMarker
                                    key={`inc-${idx}`}
                                    center={[i.latitude, i.longitude]}
                                    radius={8}
                                    pathOptions={{
                                        color: "#ef4444",
                                        fillColor: "#ef4444",
                                        fillOpacity: 0.6,
                                        weight: 2
                                    }}
                                >
                                    <Popup className="tactical-popup">
                                        <div className="p-3 bg-[#18181b] text-white rounded-xl border border-red-500/30">
                                            <strong className="text-red-400 uppercase text-[10px] tracking-widest block mb-1">INCIDENT</strong>
                                            <h4 className="font-bold text-xs mb-1">{i.title}</h4>
                                            <p className="text-[10px] text-zinc-400 leading-relaxed">{i.description}</p>
                                        </div>
                                    </Popup>
                                </CircleMarker>
                            ))}
                        </FeatureGroup>
                    </LayersControl.Overlay>

                    <LayersControl.Overlay checked name={`NZTA Cameras (${trafficCams.length})`}>
                        <FeatureGroup>
                            {trafficCams.map((c, idx) => (
                                <Marker key={`cam-${idx}`} position={[c.latitude, c.longitude]}>
                                    <Popup className="tactical-popup">
                                        <div className="p-3 bg-[#18181b] text-white rounded-xl border border-blue-500/30">
                                            <strong className="text-blue-400 uppercase text-[10px] tracking-widest block mb-1">TRAFFIC NODE</strong>
                                            <h4 className="font-bold text-xs mb-1">{c.title}</h4>
                                            <p className="text-[10px] text-zinc-400 leading-relaxed">{c.description}</p>
                                        </div>
                                    </Popup>
                                </Marker>
                            ))}
                        </FeatureGroup>
                    </LayersControl.Overlay>
                </LayersControl>
            </MapContainer>

            {/* Tactical Legend HUD */}
            <div className="absolute bottom-6 left-6 z-[400] glass p-4 rounded-2xl shadow-2xl flex flex-col gap-3 pointer-events-none">
                <h5 className="text-[8px] font-black text-zinc-500 uppercase tracking-widest border-b border-zinc-800 pb-2">Strategic Intel</h5>
                <div className="flex gap-3 items-center">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500 shadow-[0_0_8px_#ef4444]"></div>
                    <span className="text-[9px] font-black uppercase text-zinc-400 tracking-wider">Incident Vectors</span>
                </div>
                <div className="flex gap-3 items-center">
                    <div className="w-2.5 h-2.5 rounded-full bg-blue-500 shadow-[0_0_8px_#3b82f6]"></div>
                    <span className="text-[9px] font-black uppercase text-zinc-400 tracking-wider">Authoritative Nodes</span>
                </div>
            </div>
        </div>
    );
}
