import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  MapPin,
  Flame,
  Users,
  AlertTriangle,
  Package,
  Navigation,
  Loader2,
  Eye,
  RefreshCw,
} from "lucide-react";

import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { Skeleton } from "@/components/ui/skeleton";

interface LocationData {
  latitude: number;
  longitude: number;
  accuracy: number;
}

interface MapEvent {
  id: string;
  type: "fire" | "displacement" | "poverty" | "food";
  title: string;
  description: string;
  latitude: number;
  longitude: number;
  severity: "low" | "medium" | "high";
  timestamp: Date;
  distance?: number;
}

const mockEvents: MapEvent[] = [
  {
    id: "1",
    type: "fire",
    title: "Incendio Forestal Activo",
    description: "Foco de incendio en zona rural de Ñeembucú",
    latitude: -26.8753,
    longitude: -58.2861,
    severity: "high",
    timestamp: new Date(Date.now() - 1000 * 60 * 30),
  },
  {
    id: "2",
    type: "displacement",
    title: "Familias Desplazadas",
    description: "12 familias evacuadas por inundación en Pilcomayo",
    latitude: -25.2887,
    longitude: -57.6359,
    severity: "medium",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
  },
  {
    id: "3",
    type: "food",
    title: "Distribución de Alimentos",
    description: "Centro de acopio activo en Lambaré",
    latitude: -25.3426,
    longitude: -57.6043,
    severity: "low",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4),
  },
  {
    id: "4",
    type: "poverty",
    title: "Zona de Alta Vulnerabilidad",
    description: "Área con necesidades prioritarias en Mariano Roque Alonso",
    latitude: -25.2003,
    longitude: -57.5347,
    severity: "medium",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6),
  },
  {
    id: "5",
    type: "fire",
    title: "Quema Controlada",
    description: "Quema controlada en zona agrícola de Itapúa",
    latitude: -26.8667,
    longitude: -55.5333,
    severity: "low",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 8),
  },
];

function createCustomIcon(type: string, severity: string) {
  // Always return a valid DivIcon, even on SSR
  let emoji = "";
  let color = "";

  switch (type) {
    case "fire":
      emoji = "🔥";
      color =
        severity === "high"
          ? "#dc2626"
          : severity === "medium"
          ? "#ea580c"
          : "#f59e0b";
      break;
    case "displacement":
      emoji = "👥";
      color =
        severity === "high"
          ? "#2563eb"
          : severity === "medium"
          ? "#3b82f6"
          : "#60a5fa";
      break;
    case "poverty":
      emoji = "⚠️";
      color =
        severity === "high"
          ? "#ca8a04"
          : severity === "medium"
          ? "#eab308"
          : "#facc15";
      break;
    case "food":
      emoji = "📦";
      color =
        severity === "high"
          ? "#16a34a"
          : severity === "medium"
          ? "#22c55e"
          : "#4ade80";
      break;
    case "user":
      emoji = "🧑";
      color = "#0ea5e9";
      break;
    default:
      emoji = "📍";
      color = "#6b7280";
  }

  return L.divIcon({
    html: `
      <div style="
        background-color: ${color};
        width: 32px;
        height: 32px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 16px;
        border: 2px solid white;
        box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        animation: pulse 2s infinite;
      ">
        ${emoji}
      </div>
      <style>
        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.1); }
          100% { transform: scale(1); }
        }
      </style>
    `,
    className: "custom-marker",
    iconSize: [32, 32],
    iconAnchor: [16, 16],
    popupAnchor: [0, -16],
  });
}

function MapUpdater({ center }: { center: [number, number] }) {
  const map = useMap();

  useEffect(() => {
    if (center) {
      map.setView(center, 12);
    }
  }, [center, map]);

  return null;
}

function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function getEventIcon(type: string) {
  switch (type) {
    case "fire":
      return <Flame className="w-4 h-4 text-red-500" />;
    case "displacement":
      return <Users className="w-4 h-4 text-blue-500" />;
    case "poverty":
      return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
    case "food":
      return <Package className="w-4 h-4 text-green-500" />;
    default:
      return <MapPin className="w-4 h-4" />;
  }
}

function getSeverityColor(severity: string) {
  switch (severity) {
    case "high":
      return "bg-red-500";
    case "medium":
      return "bg-yellow-500";
    case "low":
      return "bg-green-500";
    default:
      return "bg-gray-500";
  }
}

export default function InteractiveMap() {
  const [location, setLocation] = useState<LocationData | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [nearbyEvents, setNearbyEvents] = useState<MapEvent[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<MapEvent | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const requestLocation = () => {
    setIsLoadingLocation(true);
    setLocationError(null);

    if (!navigator.geolocation) {
      setLocationError(
        "La geolocalización no está soportada en este navegador"
      );
      setIsLoadingLocation(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const locationData = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy,
        };
        setLocation(locationData);
        setIsLoadingLocation(false);

        const eventsWithDistance = mockEvents.map((event) => ({
          ...event,
          distance: calculateDistance(
            locationData.latitude,
            locationData.longitude,
            event.latitude,
            event.longitude
          ),
        }));

        const sortedEvents = eventsWithDistance.sort(
          (a, b) => (a.distance || 0) - (b.distance || 0)
        );
        setNearbyEvents(sortedEvents.slice(0, 5));
      },
      (error) => {
        let errorMessage = "Error al obtener la ubicación";
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = "Permisos de ubicación denegados";
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = "Ubicación no disponible";
            break;
          case error.TIMEOUT:
            errorMessage = "Tiempo de espera agotado";
            break;
        }
        setLocationError(errorMessage);
        setIsLoadingLocation(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000,
      }
    );
  };

  useEffect(() => {
    requestLocation();
  }, []);

  const handleEventClick = (event: MapEvent) => {
    setSelectedEvent(event);
    console.log(` Selected event: ${event.title}`);
  };

  const formatTimeAgo = (timestamp: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor(
      (now.getTime() - timestamp.getTime()) / (1000 * 60)
    );

    if (diffInMinutes < 60) {
      return `Hace ${diffInMinutes} minutos`;
    } else if (diffInMinutes < 1440) {
      const hours = Math.floor(diffInMinutes / 60);
      return `Hace ${hours} hora${hours > 1 ? "s" : ""}`;
    } else {
      const days = Math.floor(diffInMinutes / 1440);
      return `Hace ${days} día${days > 1 ? "s" : ""}`;
    }
  };

  const defaultCenter: [number, number] = [-25.2637, -57.5759];
  const mapCenter: [number, number] = location
    ? [location.latitude, location.longitude]
    : defaultCenter;

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 mr-2">
                <MapPin className="w-3 h-3 text-primary" />
              </div>
              Mapa Interactivo
            </CardTitle>
            <CardDescription>
              Eventos y reportes en tiempo real cerca de tu ubicación
            </CardDescription>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={requestLocation}
            disabled={isLoadingLocation}
          >
            {isLoadingLocation ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <RefreshCw className="w-4 h-4" />
            )}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {locationError && (
          <Alert className="mb-4">
            <AlertTriangle className="w-4 h-4" />
            <AlertDescription>{locationError}</AlertDescription>
          </Alert>
        )}

        {location && (
          <div className="mb-4 p-3 bg-muted rounded-lg">
            <div className="flex items-center space-x-2">
              <Navigation className="w-4 h-4 text-accent" />
              <span className="text-sm font-medium">Tu ubicación:</span>
              <Badge variant="secondary">
                {location.latitude.toFixed(4)}, {location.longitude.toFixed(4)}
              </Badge>
            </div>
          </div>
        )}

        <div className="relative rounded-lg h-80 mb-4 overflow-hidden border">
          {isClient ? (
            isLoadingLocation ? (
              // Skeleton mientras se obtiene la ubicación
              <div className="flex flex-col items-center justify-center h-full gap-2">
                <Skeleton className="w-3/4 h-6" />
                <Skeleton className="w-1/2 h-6" />
                <Skeleton className="w-full h-64" />
              </div>
            ) : (
              <MapContainer
                center={mapCenter}
                zoom={location ? 12 : 7}
                style={{ height: "100%", width: "100%" }}
                className="z-0"
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                <MapUpdater center={mapCenter} />

                {location && (
                  <Marker
                    position={[location.latitude, location.longitude]}
                    icon={createCustomIcon("user", "high")}
                  >
                    <Popup>
                      <div className="text-center">
                        <strong>Tu ubicación actual</strong>
                        <br />
                        <small>
                          Precisión: ±{location.accuracy.toFixed(0)}m
                        </small>
                      </div>
                    </Popup>
                  </Marker>
                )}

                {mockEvents.map((event) => (
                  <Marker
                    key={event.id}
                    position={[event.latitude, event.longitude]}
                    icon={createCustomIcon(event.type, event.severity)}
                    eventHandlers={{
                      click: () => handleEventClick(event),
                    }}
                  >
                    <Popup>
                      <div className="min-w-[200px]">
                        <div className="flex items-center space-x-2 mb-2">
                          {getEventIcon(event.type)}
                          <strong className="text-sm">{event.title}</strong>
                        </div>
                        <p className="text-xs text-muted-foreground mb-2">
                          {event.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <Badge
                            variant="outline"
                            className={`text-xs ${getSeverityColor(
                              event.severity
                            )} text-white border-none`}
                          >
                            {event.severity === "high"
                              ? "Alta"
                              : event.severity === "medium"
                              ? "Media"
                              : "Baja"}
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            {formatTimeAgo(event.timestamp)}
                          </span>
                        </div>
                      </div>
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>
            )
          ) : (
            <div className="flex items-center justify-center h-full bg-muted">
              <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
            </div>
          )}
        </div>

        {/* Nearby Events List */}
        {nearbyEvents.length > 0 && (
          <div className="space-y-3">
            <h4 className="font-medium text-sm">
              Eventos cercanos a tu ubicación:
            </h4>
            {nearbyEvents.map((event) => (
              <div
                key={event.id}
                className={`p-3 rounded-lg border cursor-pointer transition-colors hover:bg-muted/50 ${
                  selectedEvent?.id === event.id
                    ? "bg-accent/10 border-accent"
                    : "bg-card"
                }`}
                onClick={() => handleEventClick(event)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    {getEventIcon(event.type)}
                    <div className="flex-1">
                      <h5 className="font-medium text-sm">{event.title}</h5>
                      <p className="text-xs text-muted-foreground">
                        {event.description}
                      </p>
                      <div className="flex items-center space-x-2 mt-1">
                        <Badge variant="outline" className="text-xs">
                          {event.distance
                            ? `${event.distance.toFixed(1)} km`
                            : "Calculando..."}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {formatTimeAgo(event.timestamp)}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div
                    className={`w-2 h-2 ${getSeverityColor(
                      event.severity
                    )} rounded-full`}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        )}

        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="mt-4"
        >
          <Button
            variant="outline"
            className="w-full bg-transparent hover:bg-primary/5 hover:border-primary/50 transition-all duration-300"
            onClick={() => {}}
          >
            <Eye className="w-4 h-4 mr-2" />
            Abrir mapa completo
          </Button>
        </motion.div>
      </CardContent>
    </Card>
  );
}
