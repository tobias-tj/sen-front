import { useState } from "react";
import Modal from "react-modal";
import {
  CheckCircle,
  Clock,
  Flame,
  Users,
  Package,
  AlertTriangle,
  Send,
  Navigation,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";

Modal.setAppElement("#root"); // Accesibilidad

interface CitizenReportFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (report: CitizenReport) => void;
}

export interface CitizenReport {
  id: string;
  type: "fire" | "displacement" | "food_need" | "infrastructure" | "other";
  title: string;
  description: string;
  severity: "low" | "medium" | "high";
  location: { address: string; latitude?: number; longitude?: number };
  reporter: { name: string; phone: string; email?: string };
  images?: string[];
  timestamp: Date;
  status: "pending" | "verified" | "resolved";
  affectedPeople?: number;
}

const reportTypes = [
  {
    value: "fire",
    label: "Incendio",
    description: "Focos de incendio, humo, o riesgo de fuego",
    icon: <Flame className="w-5 h-5 text-red-500" />,
  },
  {
    value: "displacement",
    label: "Desplazamiento",
    description: "Familias evacuadas o en riesgo",
    icon: <Users className="w-5 h-5 text-blue-500" />,
  },
  {
    value: "food_need",
    label: "Necesidad Alimentaria",
    description: "Falta de alimentos o asistencia",
    icon: <Package className="w-5 h-5 text-green-500" />,
  },
  {
    value: "infrastructure",
    label: "Infraestructura",
    description: "Daños en caminos, puentes, servicios",
    icon: <AlertTriangle className="w-5 h-5 text-yellow-500" />,
  },
  {
    value: "other",
    label: "Otro",
    description: "Otra situación de emergencia",
    icon: <AlertTriangle className="w-5 h-5 text-gray-500" />,
  },
];

export default function CitizenReportForm({
  isOpen,
  onClose,
  onSubmit,
}: CitizenReportFormProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    type: "",
    title: "",
    description: "",
    severity: "medium",
    address: "",
    reporterName: "",
    reporterPhone: "",
    reporterEmail: "",
    affectedPeople: "",
    useCurrentLocation: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [currentLocation, setCurrentLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleLocationRequest = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          handleInputChange("useCurrentLocation", true);
        },
        (error) => {
          console.log("Location error:", error);
          handleInputChange("useCurrentLocation", false);
        }
      );
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    await new Promise((res) => setTimeout(res, 2000)); // Simulación API

    const report: CitizenReport = {
      id: `report_${Date.now()}`,
      type: formData.type as CitizenReport["type"],
      title: formData.title,
      description: formData.description,
      severity: formData.severity as CitizenReport["severity"],
      location: {
        address: formData.address,
        latitude: currentLocation?.lat,
        longitude: currentLocation?.lng,
      },
      reporter: {
        name: formData.reporterName,
        phone: formData.reporterPhone,
        email: formData.reporterEmail,
      },
      timestamp: new Date(),
      status: "pending",
      affectedPeople: formData.affectedPeople
        ? parseInt(formData.affectedPeople)
        : undefined,
    };

    onSubmit(report);
    setIsSubmitting(false);
    setIsSuccess(true);

    setTimeout(() => {
      setIsSuccess(false);
      setStep(1);
      setFormData({
        type: "",
        title: "",
        description: "",
        severity: "medium",
        address: "",
        reporterName: "",
        reporterPhone: "",
        reporterEmail: "",
        affectedPeople: "",
        useCurrentLocation: false,
      });
      setCurrentLocation(null);
      onClose();
    }, 3000);
  };

  const canProceedToStep2 =
    formData.type && formData.title && formData.description;
  const canSubmit =
    canProceedToStep2 &&
    formData.address &&
    formData.reporterName &&
    formData.reporterPhone;

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      overlayClassName="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      className="bg-white rounded-2xl shadow-lg w-full sm:max-w-2xl max-h-[90vh] overflow-y-auto p-6 outline-none"
      contentLabel="Reporte Ciudadano"
    >
      {isSuccess ? (
        <div className="text-center py-6">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">
            Reporte Enviado Exitosamente
          </h3>
          <p className="text-muted-foreground mb-4">
            Tu reporte ha sido recibido y será verificado por nuestro equipo. Te
            contactaremos si necesitamos más información.
          </p>
          <Badge
            variant="secondary"
            className="mb-4 flex items-center justify-center"
          >
            <Clock className="w-4 h-4 mr-2" />
            ID: {`RPT-${Date.now().toString().slice(-6)}`}
          </Badge>
          <p className="text-sm text-muted-foreground">
            Esta ventana se cerrará automáticamente...
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold mb-1">
              Reportar Incidente Ciudadano
            </h2>
            <p className="text-sm text-muted-foreground mb-4">
              Ayúdanos a mantener actualizada la información de emergencias en
              tu zona
            </p>
          </div>

          {step === 1 && (
            <div className="space-y-6">
              {/* Tipo de Incidente */}
              <div>
                <Label className="text-base font-medium">
                  Tipo de Incidente
                </Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
                  {reportTypes.map((type) => (
                    <Card
                      key={type.value}
                      className={`cursor-pointer transition-colors hover:bg-muted/50 ${
                        formData.type === type.value
                          ? "bg-accent/10 border-accent"
                          : ""
                      }`}
                      onClick={() => handleInputChange("type", type.value)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start space-x-3">
                          {type.icon}
                          <div>
                            <h4 className="font-medium">{type.label}</h4>
                            <p className="text-sm text-muted-foreground">
                              {type.description}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Título y descripción */}
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title">Título del Reporte</Label>
                  <Input
                    id="title"
                    placeholder="Ej: Incendio en zona rural..."
                    value={formData.title}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="description">Descripción Detallada</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe la situación..."
                    value={formData.description}
                    onChange={(e) =>
                      handleInputChange("description", e.target.value)
                    }
                    rows={4}
                  />
                </div>

                <div>
                  <Label className="text-base font-medium">
                    Nivel de Severidad
                  </Label>
                  <RadioGroup
                    value={formData.severity}
                    onValueChange={(value) =>
                      handleInputChange("severity", value)
                    }
                    className="flex space-x-6 mt-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="low" id="low" />
                      <Label htmlFor="low" className="text-green-600">
                        Baja
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="medium" id="medium" />
                      <Label htmlFor="medium" className="text-yellow-600">
                        Media
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="high" id="high" />
                      <Label htmlFor="high" className="text-red-600">
                        Alta
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                {(formData.type === "displacement" ||
                  formData.type === "food_need") && (
                  <div>
                    <Label htmlFor="affectedPeople">
                      Número de Personas Afectadas (aprox.)
                    </Label>
                    <Input
                      id="affectedPeople"
                      type="number"
                      placeholder="Ej: 15"
                      value={formData.affectedPeople}
                      onChange={(e) =>
                        handleInputChange("affectedPeople", e.target.value)
                      }
                    />
                  </div>
                )}
              </div>

              <div className="flex justify-end">
                <Button
                  onClick={() => setStep(2)}
                  disabled={!canProceedToStep2}
                >
                  Continuar
                </Button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              {/* Ubicación */}
              <div>
                <Label className="text-base font-medium">
                  Ubicación del Incidente
                </Label>
                <div className="space-y-4 mt-3">
                  <div>
                    <Label htmlFor="address">Dirección o Referencia</Label>
                    <Input
                      id="address"
                      placeholder="Ej: Ruta 2, km 45..."
                      value={formData.address}
                      onChange={(e) =>
                        handleInputChange("address", e.target.value)
                      }
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="useLocation"
                      checked={formData.useCurrentLocation}
                      onCheckedChange={(checked) => {
                        if (checked) handleLocationRequest();
                        else {
                          handleInputChange("useCurrentLocation", false);
                          setCurrentLocation(null);
                        }
                      }}
                    />
                    <Label htmlFor="useLocation" className="text-sm">
                      Usar mi ubicación actual
                    </Label>
                    {currentLocation && (
                      <Badge
                        variant="secondary"
                        className="ml-2 flex items-center"
                      >
                        <Navigation className="w-3 h-3 mr-1" /> Ubicación
                        obtenida
                      </Badge>
                    )}
                  </div>
                </div>
              </div>

              {/* Información del Reportante */}
              <div>
                <Label className="text-base font-medium">
                  Información de Contacto
                </Label>
                <div className="space-y-4 mt-3">
                  <div>
                    <Label htmlFor="reporterName">Nombre Completo</Label>
                    <Input
                      id="reporterName"
                      placeholder="Tu nombre completo"
                      value={formData.reporterName}
                      onChange={(e) =>
                        handleInputChange("reporterName", e.target.value)
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="reporterPhone">Teléfono</Label>
                    <Input
                      id="reporterPhone"
                      placeholder="Ej: 0981 123 456"
                      value={formData.reporterPhone}
                      onChange={(e) =>
                        handleInputChange("reporterPhone", e.target.value)
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="reporterEmail">Email (Opcional)</Label>
                    <Input
                      id="reporterEmail"
                      type="email"
                      placeholder="tu@email.com"
                      value={formData.reporterEmail}
                      onChange={(e) =>
                        handleInputChange("reporterEmail", e.target.value)
                      }
                    />
                  </div>
                </div>
              </div>

              <Alert>
                <AlertTriangle className="w-4 h-4" />
                <AlertDescription>
                  Tu información será usada únicamente para verificar el reporte
                  y contactarte si es necesario.
                </AlertDescription>
              </Alert>

              <div className="flex justify-between">
                <Button variant="outline" onClick={() => setStep(1)}>
                  Volver
                </Button>
                <Button
                  onClick={handleSubmit}
                  disabled={!canSubmit || isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Clock className="w-4 h-4 mr-2 animate-spin" />{" "}
                      Enviando...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" /> Enviar Reporte
                    </>
                  )}
                </Button>
              </div>
            </div>
          )}
        </div>
      )}
    </Modal>
  );
}
