import type React from "react";
import { motion } from "framer-motion";
import { Shield, Users, Activity, MapPin, CloudRain } from "lucide-react";
import { Separator } from "@/components/ui/separator";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="h-screen bg-background">
      <div className="flex h-full">
        {/* Left Section */}
        <div className="hidden lg:flex flex-1 items-center justify-center p-12">
          <motion.div
            className="w-full max-w-3xl space-y-8"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Encabezado */}
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Shield className="w-16 h-16 mx-auto text-orange-500 mb-4" />
              <h1 className="text-2xl font-bold">
                Secretaría de Emergencia Nacional
              </h1>
              <p className="text-muted-foreground mt-2 max-w-lg mx-auto">
                Plataforma de análisis y monitoreo en tiempo real sobre
                fenómenos naturales, asistencia social y desplazamientos en
                Paraguay.
              </p>
            </motion.div>

            <Separator />

            {/* Features */}
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.15 } },
              }}
            >
              {[
                {
                  icon: CloudRain,
                  text: "Seguimiento de ",
                  bold: "fenómenos climáticos",
                },
                {
                  icon: Users,
                  text: "Registro de ",
                  bold: "familias asistidas",
                },
                {
                  icon: MapPin,
                  text: "",
                  bold: "Distribución geográfica de ayudas",
                },
                {
                  icon: Activity,
                  text: "Estadísticas de ",
                  bold: "kits y alimentos",
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  className="flex items-center space-x-3 border border-orange-200 rounded-xl p-3 hover:bg-orange-50 transition-colors"
                >
                  <item.icon className="w-6 h-6 text-orange-500" />
                  <span className="text-sm">
                    {item.text}
                    <b>{item.bold}</b>
                  </span>
                </motion.div>
              ))}
            </motion.div>

            {/* Últimas 24 horas */}
            <motion.div
              className="text-center text-sm text-muted-foreground"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              En las últimas <b>24 horas</b> se han registrado nuevos eventos en
              distintos departamentos. <br />
              Consulta el mapa interactivo para ver los focos activos en tu
              zona.
            </motion.div>
          </motion.div>
        </div>

        {/* Right Section: Form */}
        <div className="flex-1 flex flex-col bg-background">
          <div className="flex-1 flex items-center justify-center px-8 py-12">
            <motion.div
              className="w-full max-w-md"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
            >
              {children}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
