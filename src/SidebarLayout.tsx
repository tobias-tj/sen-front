import {
  Users,
  Flame,
  UtensilsCrossed,
  LogOut,
  Zap,
  HandHelpingIcon,
  Settings, // Icono para administración
  FileText, // Icono para reportes
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { useNavigate } from "react-router-dom";

export function SidebarLayout({
  children,
  setToken,
}: {
  children: ReactNode;
  setToken: (t: string | null) => void;
}) {
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem("access_token");
    sessionStorage.removeItem("refresh_token");
    sessionStorage.removeItem("user");

    setToken(null);
    navigate("/login", { replace: true });
  };

  // Obtener usuario del sessionStorage
  const user = JSON.parse(sessionStorage.getItem("user") || "{}");
  const isAdmin = user?.rol === 1;

  // Items comunes
  const menuItems = [
    {
      title: "Personas Desplazadas",
      icon: Users,
      href: "/personas-desplazadas",
    },
    { title: "Focos de Incendio", icon: Flame, href: "/focos-incendio" },
    {
      title: "Asistencia Alimentaria",
      icon: UtensilsCrossed,
      href: "/asistencia-alimentaria",
    },
    {
      title: "Situación de Pobreza",
      icon: HandHelpingIcon,
      href: "/situacion-pobreza",
    },
    { title: "Eventos Recientes", icon: Zap, href: "/eventos-recientes" },
  ];

  // Items solo para administradores
  const adminMenuItems = [
    { title: "Dashboard Admin", icon: Settings, href: "/admin/dashboard" },
    { title: "Validar Reportes", icon: FileText, href: "/admin/reportes" },
  ];

  // Combinar items según rol
  const finalMenuItems = isAdmin
    ? [...menuItems, ...adminMenuItems]
    : menuItems;

  return (
    <div className="flex min-h-screen">
      <Sidebar className="w-64 border-r bg-card">
        <SidebarHeader className="p-0">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="px-4 py-6 border-b bg-primary/5"
          >
            <h1 className="text-lg font-bold text-primary leading-tight">
              Secretaría De Emergencia Nacional
            </h1>
            {isAdmin && (
              <p className="text-xs text-muted-foreground mt-1">
                Administrador
              </p>
            )}
          </motion.div>
        </SidebarHeader>

        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel className="text-muted-foreground font-medium">
              Gestión de Emergencias
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {finalMenuItems.map((item, index) => (
                  <SidebarMenuItem key={item.href}>
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <SidebarMenuButton
                        asChild
                        className="hover:bg-primary/10 hover:text-primary transition-colors duration-200"
                      >
                        <a href={item.href} className="flex items-center gap-3">
                          <item.icon className="w-4 h-4" />
                          <span className="font-medium">{item.title}</span>
                        </a>
                      </SidebarMenuButton>
                    </motion.div>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter className="p-4 border-t bg-muted/30">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="space-y-3"
          >
            <div className="text-center">
              <p className="text-xs text-muted-foreground">Desarrollado por</p>
              <a
                href="https://www.yvagacore.tech/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-semibold text-primary hover:text-primary/80 transition-colors duration-200"
              >
                Yvagacore
              </a>
            </div>

            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                variant="outline"
                size="sm"
                className="w-full hover:bg-primary hover:text-white hover:border-destructive transition-colors duration-200 bg-transparent"
                onClick={handleLogout}
              >
                <LogOut className="w-4 h-4 mr-2" />
                Cerrar Sesión
              </Button>
            </motion.div>
          </motion.div>
        </SidebarFooter>
      </Sidebar>

      <main className="flex-1 p-6 bg-background">{children}</main>
    </div>
  );
}
