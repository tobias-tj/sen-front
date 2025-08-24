import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Flame,
  Package,
  AlertTriangle,
  BarChart3,
  Download,
  Filter,
  Clock,
  Truck,
} from "lucide-react";
import Modal from "react-modal";

interface DataDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  section: string;
  title: string;
}

const displacedPeopleData = [
  {
    id: 1,
    location: "Departamento Central - Lambaré",
    families: 45,
    people: 187,
    reason: "Inundación",
    date: "2025-01-15",
    status: "Asistidos",
    shelter: "Escuela Nacional N° 123",
  },
  {
    id: 2,
    location: "Alto Paraná - Ciudad del Este",
    families: 23,
    people: 89,
    reason: "Incendio",
    date: "2025-01-14",
    status: "En evaluación",
    shelter: "Centro Comunitario",
  },
  {
    id: 3,
    location: "Caaguazú - Coronel Oviedo",
    families: 67,
    people: 234,
    reason: "Deslizamiento",
    date: "2025-01-13",
    status: "Asistidos",
    shelter: "Polideportivo Municipal",
  },
  {
    id: 4,
    location: "Itapúa - Encarnación",
    families: 34,
    people: 142,
    reason: "Inundación",
    date: "2025-01-12",
    status: "Reubicados",
    shelter: "Albergue temporal",
  },
];

const fireIncidentsData = [
  {
    id: 1,
    location: "Boquerón - Filadelfia",
    hectares: 2450,
    status: "Activo",
    severity: "Alta",
    startDate: "2025-01-14",
    resources: "3 brigadas, 2 aviones",
    cause: "Sequía extrema",
  },
  {
    id: 2,
    location: "Alto Paraguay - Fuerte Olimpo",
    hectares: 1200,
    status: "Controlado",
    severity: "Media",
    startDate: "2025-01-13",
    resources: "2 brigadas",
    cause: "Actividad humana",
  },
  {
    id: 3,
    location: "Presidente Hayes - Villa Hayes",
    hectares: 890,
    status: "Extinguido",
    severity: "Baja",
    startDate: "2025-01-11",
    resources: "1 brigada",
    cause: "Rayo",
  },
];

const povertyData = [
  {
    department: "Central",
    district: "Lambaré",
    locality: "Centro",
    population: 12450,
    vulnerablePopulation: 3200,
    percentage: 25.7,
    lastUpdate: "2025-01-10",
    programs: ["Tekoporã", "Almuerzo Escolar"],
  },
  {
    department: "Alto Paraná",
    district: "Ciudad del Este",
    locality: "Microcentro",
    population: 8320,
    vulnerablePopulation: 2100,
    percentage: 25.2,
    lastUpdate: "2025-01-09",
    programs: ["Tekoporã", "Adultos Mayores"],
  },
  {
    department: "Itapúa",
    district: "Encarnación",
    locality: "San Isidro",
    population: 5890,
    vulnerablePopulation: 1400,
    percentage: 23.8,
    lastUpdate: "2025-01-08",
    programs: ["Tekoporã"],
  },
];

const foodDistributionData = [
  {
    zone: "Central - Zona Norte",
    kilos: 2340,
    families: 156,
    lastDistribution: "2025-01-15",
    nextDistribution: "2025-01-22",
    coordinator: "María González",
    products: ["Arroz", "Aceite", "Leche en polvo", "Conservas"],
  },
  {
    zone: "Alto Paraná - Zona Este",
    kilos: 1890,
    families: 98,
    lastDistribution: "2025-01-14",
    nextDistribution: "2025-01-21",
    coordinator: "Carlos Mendoza",
    products: ["Arroz", "Frijoles", "Aceite", "Harina"],
  },
  {
    zone: "Caaguazú - Zona Centro",
    kilos: 1560,
    families: 87,
    lastDistribution: "2025-01-13",
    nextDistribution: "2025-01-20",
    coordinator: "Ana Rodríguez",
    products: ["Arroz", "Aceite", "Azúcar", "Sal"],
  },
];

function getStatusColor(status: string) {
  switch (status.toLowerCase()) {
    case "activo":
    case "en evaluación":
      return "bg-red-500";
    case "controlado":
    case "asistidos":
      return "bg-yellow-500";
    case "extinguido":
    case "reubicados":
      return "bg-green-500";
    default:
      return "bg-gray-500";
  }
}

function getSeverityColor(severity: string) {
  switch (severity.toLowerCase()) {
    case "alta":
      return "text-red-600";
    case "media":
      return "text-yellow-600";
    case "baja":
      return "text-green-600";
    default:
      return "text-gray-600";
  }
}

Modal.setAppElement("#root");

export default function DataDetailsModal({
  isOpen,
  onClose,
  section,
  title,
}: DataDetailsModalProps) {
  const [activeTab, setActiveTab] = useState("overview");

  const renderDisplacedPeopleDetails = () => (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="overview">Resumen</TabsTrigger>
        <TabsTrigger value="details">Detalles</TabsTrigger>
        <TabsTrigger value="analytics">Análisis</TabsTrigger>
      </TabsList>

      <TabsContent value="overview" className="space-y-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold">159</div>
              <p className="text-xs text-muted-foreground">Familias Totales</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold">652</div>
              <p className="text-xs text-muted-foreground">Personas Totales</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold">4</div>
              <p className="text-xs text-muted-foreground">Departamentos</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground">Albergues Activos</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Motivos de Desplazamiento</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">Inundación</span>
                <div className="flex items-center space-x-2">
                  <Progress value={65} className="w-20" />
                  <span className="text-sm font-medium">65%</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Incendio</span>
                <div className="flex items-center space-x-2">
                  <Progress value={20} className="w-20" />
                  <span className="text-sm font-medium">20%</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Deslizamiento</span>
                <div className="flex items-center space-x-2">
                  <Progress value={15} className="w-20" />
                  <span className="text-sm font-medium">15%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="details" className="space-y-4">
        <ScrollArea className="h-96">
          <div className="space-y-4">
            {displacedPeopleData.map((item) => (
              <Card key={item.id}>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-medium">{item.location}</h4>
                      <p className="text-sm text-muted-foreground">
                        {item.families} familias • {item.people} personas
                      </p>
                    </div>
                    <Badge
                      className={`${getStatusColor(item.status)} text-white`}
                    >
                      {item.status}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Motivo:</span>{" "}
                      {item.reason}
                    </div>
                    <div>
                      <span className="text-muted-foreground">Fecha:</span>{" "}
                      {item.date}
                    </div>
                    <div className="col-span-2">
                      <span className="text-muted-foreground">Albergue:</span>{" "}
                      {item.shelter}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </TabsContent>

      <TabsContent value="analytics" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Tendencias Mensuales</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm">Enero 2025</span>
                <div className="flex items-center space-x-2">
                  <Progress value={85} className="w-32" />
                  <span className="text-sm font-medium">652 personas</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Diciembre 2025</span>
                <div className="flex items-center space-x-2">
                  <Progress value={60} className="w-32" />
                  <span className="text-sm font-medium">456 personas</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Noviembre 2025</span>
                <div className="flex items-center space-x-2">
                  <Progress value={40} className="w-32" />
                  <span className="text-sm font-medium">298 personas</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );

  const renderFireDetails = () => (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="active">Focos Activos</TabsTrigger>
        <TabsTrigger value="history">Historial</TabsTrigger>
      </TabsList>

      <TabsContent value="active" className="space-y-4">
        <ScrollArea className="h-96">
          <div className="space-y-4">
            {fireIncidentsData.map((fire) => (
              <Card key={fire.id}>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-medium flex items-center">
                        <Flame className="w-4 h-4 mr-2 text-red-500" />
                        {fire.location}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {fire.hectares.toLocaleString()} hectáreas afectadas
                      </p>
                    </div>
                    <div className="text-right">
                      <Badge
                        className={`${getStatusColor(
                          fire.status
                        )} text-white mb-1`}
                      >
                        {fire.status}
                      </Badge>
                      <p
                        className={`text-sm font-medium ${getSeverityColor(
                          fire.severity
                        )}`}
                      >
                        Severidad: {fire.severity}
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Inicio:</span>{" "}
                      {fire.startDate}
                    </div>
                    <div>
                      <span className="text-muted-foreground">Causa:</span>{" "}
                      {fire.cause}
                    </div>
                    <div className="col-span-full">
                      <span className="text-muted-foreground">Recursos:</span>{" "}
                      {fire.resources}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </TabsContent>

      <TabsContent value="history" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Estadísticas del Año</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">47</div>
                <p className="text-xs text-muted-foreground">
                  Incendios Totales
                </p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-600">23,450</div>
                <p className="text-xs text-muted-foreground">
                  Hectáreas Afectadas
                </p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">89%</div>
                <p className="text-xs text-muted-foreground">Controlados</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">15</div>
                <p className="text-xs text-muted-foreground">Días Promedio</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );

  const renderPovertyDetails = () => (
    <ScrollArea className="h-96">
      <div className="space-y-4">
        {povertyData.map((item, index) => (
          <Card key={index}>
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h4 className="font-medium">
                    {item.department} - {item.district}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {item.locality}
                  </p>
                </div>
                <Badge variant="outline">
                  {item.percentage}% vulnerabilidad
                </Badge>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm mb-3">
                <div>
                  <span className="text-muted-foreground">
                    Población total:
                  </span>{" "}
                  {item.population.toLocaleString()}
                </div>
                <div>
                  <span className="text-muted-foreground">
                    En situación vulnerable:
                  </span>{" "}
                  {item.vulnerablePopulation.toLocaleString()}
                </div>
                <div>
                  <span className="text-muted-foreground">
                    Última actualización:
                  </span>{" "}
                  {item.lastUpdate}
                </div>
              </div>
              <div>
                <span className="text-muted-foreground text-sm">
                  Programas activos:
                </span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {item.programs.map((program) => (
                    <Badge
                      key={program}
                      variant="secondary"
                      className="text-xs"
                    >
                      {program}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </ScrollArea>
  );

  const renderFoodDetails = () => (
    <ScrollArea className="h-96">
      <div className="space-y-4">
        {foodDistributionData.map((item, index) => (
          <Card key={index}>
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h4 className="font-medium flex items-center">
                    <Package className="w-4 h-4 mr-2 text-green-500" />
                    {item.zone}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {item.kilos} kg distribuidos a {item.families} familias
                  </p>
                </div>
                <Badge variant="outline">
                  <Truck className="w-3 h-3 mr-1" />
                  Activo
                </Badge>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm mb-3">
                <div>
                  <span className="text-muted-foreground">
                    Última distribución:
                  </span>{" "}
                  {item.lastDistribution}
                </div>
                <div>
                  <span className="text-muted-foreground">
                    Próxima distribución:
                  </span>{" "}
                  {item.nextDistribution}
                </div>
                <div>
                  <span className="text-muted-foreground">Coordinador:</span>{" "}
                  {item.coordinator}
                </div>
              </div>
              <div>
                <span className="text-muted-foreground text-sm">
                  Productos distribuidos:
                </span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {item.products.map((product) => (
                    <Badge
                      key={product}
                      variant="secondary"
                      className="text-xs"
                    >
                      {product}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </ScrollArea>
  );

  const renderContent = () => {
    switch (section) {
      case "displaced":
        return renderDisplacedPeopleDetails();
      case "fires":
        return renderFireDetails();
      case "poverty":
        return renderPovertyDetails();
      case "food":
        return renderFoodDetails();
      default:
        return (
          <div className="text-center py-8">
            <AlertTriangle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">
              Detalles no disponibles para esta sección
            </p>
          </div>
        );
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel={`${title} Detalles`}
      overlayClassName="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      className="bg-white rounded-2xl shadow-lg w-full sm:max-w-4xl max-h-[90vh] overflow-y-auto outline-none p-6"
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <h2 className="flex items-center text-xl font-bold mb-1">
            <BarChart3 className="w-5 h-5 mr-2" />
            {title} - Detalles Completos
          </h2>
          <p className="text-sm text-muted-foreground">
            Información detallada y análisis de datos actualizados en tiempo
            real
          </p>
        </div>
        <Button size="sm" variant="outline" onClick={onClose}>
          Cerrar
        </Button>
      </div>

      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-2">
          <Badge variant="outline">
            <Clock className="w-3 h-3 mr-1" />
            Actualizado hace 5 min
          </Badge>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" /> Filtrar
          </Button>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" /> Exportar
          </Button>
        </div>
      </div>

      <div className="overflow-y-auto max-h-[calc(90vh-150px)]">
        {renderContent()}
      </div>
    </Modal>
  );
}
