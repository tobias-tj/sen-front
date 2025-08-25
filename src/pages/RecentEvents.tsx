import type React from "react";

import { motion, AnimatePresence } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Flame,
  Users,
  CheckCircle,
  Clock,
  MapPin,
  User,
  Zap,
  BellDot,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

interface EventItemProps {
  id: string;
  color: string;
  title: string;
  description: string;
  badge?: string;
  icon?: React.ReactNode;
  timestamp?: string;
  location?: string;
}

function EventItem({
  id,
  color,
  title,
  description,
  badge,
  icon,
  timestamp,
  location,
}: EventItemProps) {
  return (
    <motion.div
      key={id}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.3 }}
      whileHover={{
        scale: 1.02,
        backgroundColor: "rgba(249, 115, 22, 0.05)",
      }}
      className="flex items-start space-x-4 p-3 rounded-lg border border-transparent hover:border-primary/20 transition-all duration-200 cursor-pointer group"
    >
      <div
        className="flex items-center justify-center w-8 h-8 rounded-full flex-shrink-0 group-hover:scale-110 transition-transform duration-200"
        style={{ backgroundColor: `${color}20` }}
      >
        <div style={{ color: color }} className="w-4 h-4">
          {icon}
        </div>
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          {badge && (
            <Badge
              variant="outline"
              className="text-xs border-primary/50 text-primary bg-primary/10 hover:bg-primary/20 transition-colors"
            >
              {badge}
            </Badge>
          )}
          {timestamp && (
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Clock className="w-3 h-3" />
              {timestamp}
            </div>
          )}
        </div>

        <p className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors leading-tight">
          {title}
        </p>

        <div className="flex items-start gap-2 mt-1">
          {location && (
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <MapPin className="w-3 h-3 flex-shrink-0" />
              <span className="truncate">{location}</span>
            </div>
          )}
        </div>

        <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
          {description}
        </p>
      </div>
    </motion.div>
  );
}

export default function RecentEvents({
  isLoading,
  recentReports,
}: {
  isLoading: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  recentReports: any[];
}) {
  return (
    <Card className=" shadow-lg hover:shadow-xl transition-shadow duration-300 bg-gradient-to-br from-background to-background/95">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10">
            <Zap className="w-3 h-3 text-primary" />
          </div>
          Eventos Recientes
          <Badge className="bg-primary  text-xs">
            <BellDot className="w-3 h-3 mr-1 " />
            12
          </Badge>
        </CardTitle>
        <CardDescription>
          Últimos reportes y actualizaciones del sistema de emergencias
        </CardDescription>
      </CardHeader>

      <CardContent className="pt-0">
        {isLoading ? (
          <div className="space-y-4">
            {[...Array(4)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.1 }}
                className="flex items-start space-x-4 p-3"
              >
                <Skeleton className="w-8 h-8 rounded-full" />
                <div className="flex-1 space-y-2">
                  <div className="flex gap-2">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-4 w-16" />
                  </div>
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-3 w-1/2" />
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <AnimatePresence>
            <motion.div
              className="space-y-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ staggerChildren: 0.1 }}
            >
              {recentReports.slice(0, 2).map((report, index) => (
                <motion.div
                  key={report.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <EventItem
                    id={report.id}
                    color="#f97316"
                    icon={<User className="w-4 h-4" />}
                    title={report.title}
                    description={`Reportado por ${report.reporter.name}`}
                    location={report.location.address}
                    timestamp="Hace pocos minutos"
                    badge="Reporte Ciudadano"
                  />
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <EventItem
                  id="fire"
                  color="#ef4444"
                  icon={<Flame className="w-4 h-4" />}
                  title="Nuevo foco de incendio reportado"
                  description="Situación crítica requiere atención inmediata"
                  location="Departamento de Boquerón"
                  timestamp="Hace 15 minutos"
                  badge="Crítico"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <EventItem
                  id="food"
                  color="#22c55e"
                  icon={<Users className="w-4 h-4" />}
                  title="Asistencia alimentaria distribuida"
                  description="450 kg de alimentos entregados exitosamente"
                  location="Distrito de Lambaré"
                  timestamp="Hace 1 hora"
                  badge="Completado"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <EventItem
                  id="verified"
                  color="#3b82f6"
                  icon={<CheckCircle className="w-4 h-4" />}
                  title="Reporte ciudadano verificado"
                  description="Verificación completada por equipo de campo"
                  location="Caaguazú"
                  timestamp="Hace 2 horas"
                  badge="Verificado"
                />
              </motion.div>
            </motion.div>
          </AnimatePresence>
        )}
        <Separator className="my-4" />

        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button
            variant="outline"
            className="w-full bg-transparent hover:bg-primary/5 hover:border-primary/50 transition-all duration-300"
            onClick={() => {}}
          >
            <Zap className="w-4 h-4 mr-2" />
            Ver todos los eventos
          </Button>
        </motion.div>
      </CardContent>
    </Card>
  );
}
