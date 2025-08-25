import React from "react";
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import InteractiveMap from "./InteractiveMap";
import CitizenReportForm, { type CitizenReport } from "./CitizenReport";
import DataDetailsModal from "./DataDetailsModal";
import {
  Users,
  Flame,
  TrendingUp,
  Package,
  Eye,
  Calendar,
  CheckCircle,
  X,
  Plus,
  Bell,
} from "lucide-react";
import RecentEvents from "./RecentEvents";
import PovertyStatus from "./PovertyStatus";
import { motion } from "framer-motion";

interface StatCardProps {
  title: string;
  value: string | number;
  description: string;
  icon: React.ReactNode;
  trend?: string;
  onViewDetails: () => void;
}

function StatCard({
  title,
  value,
  description,
  icon,
  trend,
  onViewDetails,
}: StatCardProps) {
  const [animatedValue, setAnimatedValue] = useState(0);
  const targetValue =
    typeof value === "string"
      ? Number.parseInt(value.replace(/,/g, ""))
      : value;

  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const increment = targetValue / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= targetValue) {
        setAnimatedValue(targetValue);
        clearInterval(timer);
      } else {
        setAnimatedValue(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [targetValue]);

  return (
    <Card className="relative overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {typeof value === "string" && value.includes(",")
            ? animatedValue.toLocaleString()
            : animatedValue}
        </div>
        <p className="text-xs text-muted-foreground">{description}</p>
        {trend && (
          <Badge variant="secondary" className="mt-2">
            {trend}
          </Badge>
        )}
        <Button
          variant="outline"
          size="sm"
          className="mt-3 w-full bg-transparent"
          onClick={onViewDetails}
        >
          <Eye className="w-4 h-4 mr-2" />
          Ver detalles
        </Button>
      </CardContent>
    </Card>
  );
}

export default function Dashboard() {
  const [isLoadingEvents, setIsLoadingEvents] = useState(true);

  useEffect(() => {
    // Simula un loading de 2 segundos
    const timer = setTimeout(() => {
      setIsLoadingEvents(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isReportFormOpen, setIsReportFormOpen] = useState(false);
  const [recentReports, setRecentReports] = useState<CitizenReport[]>([]);
  const [showReportNotification, setShowReportNotification] = useState(false);
  const [detailsModal, setDetailsModal] = useState<{
    isOpen: boolean;
    section: string;
    title: string;
  }>({
    isOpen: false,
    section: "",
    title: "",
  });

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleViewDetails = (section: string) => {
    console.log(` Opening details for: ${section}`);
    const titles = {
      displaced: "Personas Desplazadas",
      fires: "Focos de Incendio",
      hectares: "Hectáreas Afectadas",
      food: "Asistencia Alimentaria",
      poverty: "Situación de Pobreza",
      map: "Mapa Interactivo",
    };

    setDetailsModal({
      isOpen: true,
      section,
      title: titles[section as keyof typeof titles] || "Detalles",
    });
  };

  const handleCitizenReport = () => {
    console.log(` Opening citizen report form`);
    setIsReportFormOpen(true);
  };

  const handleNewReport = (report: CitizenReport) => {
    console.log(` New citizen report received:`, report);
    setRecentReports((prev) => [report, ...prev.slice(0, 4)]); // Keep only 5 most recent
    setShowReportNotification(true);

    // Auto-hide notification after 5 seconds
    setTimeout(() => {
      setShowReportNotification(false);
    }, 5000);
  };
  return (
    <div>
      {/* Header */}

      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <motion.div
            className="flex items-center justify-between"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center space-x-3">
              <div>
                <img
                  src="src/assets/bannerLogin.jpg"
                  alt="Banner Emergencia Nacional"
                  className="h-25 object-contain rounded-md"
                />
              </div>
            </div>

            {/* Botones con animación escalonada */}
            <motion.div
              className="flex items-center space-x-4"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: {
                  transition: {
                    staggerChildren: 0.2,
                  },
                },
              }}
            >
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: -10 },
                  visible: { opacity: 1, y: 0 },
                }}
              >
                <Button
                  onClick={handleCitizenReport}
                  className="bg-primary hover:bg-orange-400"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Reportar Incidente
                </Button>
              </motion.div>
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: -10 },
                  visible: { opacity: 1, y: 0 },
                }}
              >
                <Button variant="outline" size="icon">
                  <Bell className="w-4 h-4" />
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        {showReportNotification && recentReports.length > 0 && (
          <Alert className="mb-6 border-green-200 bg-green-50 dark:bg-green-900/20">
            <CheckCircle className="w-4 h-4 text-green-600" />
            <AlertDescription className="flex items-center justify-between">
              <span>
                <strong>Nuevo reporte ciudadano recibido:</strong>{" "}
                {recentReports[0].title} -{recentReports[0].location.address}
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowReportNotification(false)}
                className="h-auto p-1"
              >
                <X className="w-4 h-4" />
              </Button>
            </AlertDescription>
          </Alert>
        )}

        {/* Time and Recent Activity */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Panel de Control</h2>
              <p className="text-muted-foreground">
                {currentTime.toLocaleDateString("es-PY", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}{" "}
                - {currentTime.toLocaleTimeString("es-PY")}
              </p>
            </div>
            <Badge variant="outline" className="text-primary border-primary">
              <Calendar className="w-4 h-4 mr-2" />
              Últimas 24 horas: {12 + recentReports.length} eventos nuevos
            </Badge>
          </div>
        </div>

        {/* Main Statistics Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.15, // Retraso entre cada tarjeta
              },
            },
          }}
        >
          {[
            // array de tarjetas para map
            {
              title: "Personas Desplazadas",
              value: "2,847",
              description: "Familias afectadas por eventos",
              icon: <Users className="w-4 h-4 text-chart-1" />,
              trend: "+127 esta semana",
              key: "displaced",
            },
            {
              title: "Focos de Incendio",
              value: 23 + recentReports.filter((r) => r.type === "fire").length,
              description: "Focos activos registrados",
              icon: <Flame className="w-4 h-4 text-chart-2" />,
              trend: "5 principales focos",
              key: "fires",
            },
            {
              title: "Hectáreas Afectadas",
              value: "15,432",
              description: "Por incendios forestales",
              icon: <TrendingUp className="w-4 h-4 text-chart-4" />,
              trend: "+2,100 esta semana",
              key: "hectares",
            },
            {
              title: "Asistencia Alimentaria",
              value: "8,950",
              description: "Kilos distribuidos por zona",
              icon: <Package className="w-4 h-4 text-chart-3" />,
              trend: "12 zonas cubiertas",
              key: "food",
            },
          ].map((stat) => (
            <motion.div
              key={stat.key}
              className="w-full"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
              }}
            >
              <StatCard
                title={stat.title}
                value={stat.value}
                description={stat.description}
                icon={stat.icon}
                trend={stat.trend}
                onViewDetails={() => handleViewDetails(stat.key)}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Interactive Map */}
        <InteractiveMap />

        {/* Secondary Statistics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8 mt-8">
          {/* Recent Events */}
          <PovertyStatus onViewDetails={() => handleViewDetails("poverty")} />
          <RecentEvents
            isLoading={isLoadingEvents}
            recentReports={recentReports}
          />
        </div>
      </div>

      <CitizenReportForm
        isOpen={isReportFormOpen}
        onClose={() => setIsReportFormOpen(false)}
        onSubmit={handleNewReport}
      />

      <DataDetailsModal
        isOpen={detailsModal.isOpen}
        onClose={() =>
          setDetailsModal({ isOpen: false, section: "", title: "" })
        }
        section={detailsModal.section}
        title={detailsModal.title}
      />
      {/* <SimpleModal
        isOpen={detailsModal.isOpen}
        onClose={() =>
          setDetailsModal({ isOpen: false, section: "", title: "" })
        }
        title="Modal de prueba"
        content="Este es un modal simple para probar centrado"
      /> */}
    </div>
  );
}
