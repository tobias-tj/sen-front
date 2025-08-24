import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  AlertTriangle,
  BarChart3,
  HandHelpingIcon,
  TrendingUp,
  Users,
} from "lucide-react";

interface PovertyData {
  department: string;
  affected: number;
  percentage: number;
  trend: "up" | "down" | "stable";
}

interface PovertyStatusProps {
  onViewDetails: () => void;
}

const povertyData: PovertyData[] = [
  {
    department: "Central",
    affected: 12450,
    percentage: 75,
    trend: "up",
  },
  {
    department: "Alto Paraná",
    affected: 8320,
    percentage: 60,
    trend: "stable",
  },
  {
    department: "Itapúa",
    affected: 5890,
    percentage: 45,
    trend: "down",
  },
  {
    department: "Caaguazú",
    affected: 4200,
    percentage: 35,
    trend: "up",
  },
];

const getTrendIcon = (trend: string) => {
  switch (trend) {
    case "up":
      return <TrendingUp className="w-3 h-3 text-red-500" />;
    case "down":
      return <TrendingUp className="w-3 h-3 text-green-500 rotate-180" />;
    default:
      return <div className="w-3 h-3 rounded-full bg-yellow-500" />;
  }
};

const getTrendColor = (trend: string) => {
  switch (trend) {
    case "up":
      return "text-red-600 bg-red-50 border-red-200";
    case "down":
      return "text-green-600 bg-green-50 border-green-200";
    default:
      return "text-yellow-600 bg-yellow-50 border-yellow-200";
  }
};

export default function PovertyStatus({ onViewDetails }: PovertyStatusProps) {
  const totalAffected = povertyData.reduce(
    (sum, item) => sum + item.affected,
    0
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 bg-gradient-to-br from-background to-background/95  ">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10">
              <HandHelpingIcon className="w-4 h-4 text-primary" />
            </div>
            Situación de Pobreza
            <Badge className="bg-primary  text-xs">
              <Users className="w-3 h-3 mr-1 " />
              {totalAffected.toLocaleString()}
            </Badge>
          </CardTitle>
          <CardDescription>
            Habitantes en situación vulnerable por departamento
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <motion.div
            className="space-y-4"
            initial="hidden"
            animate="visible"
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.1,
                },
              },
            }}
          >
            {povertyData.map((item, index) => (
              <motion.div
                key={item.department}
                variants={{
                  hidden: { opacity: 0, x: -20 },
                  visible: { opacity: 1, x: 0 },
                }}
                className="group"
              >
                <div className="flex justify-between items-center p-3 rounded-lg hover:bg-muted/50 transition-colors duration-200">
                  <div className="flex items-center space-x-3">
                    <div className="flex flex-col">
                      <span className="text-sm font-medium">
                        {item.department}
                      </span>
                      <div className="flex items-center space-x-2 mt-1">
                        <Badge
                          variant="outline"
                          className={`text-xs px-2 py-0.5 ${getTrendColor(
                            item.trend
                          )}`}
                        >
                          {getTrendIcon(item.trend)}
                          <span className="ml-1">
                            {item.trend === "up"
                              ? "↑"
                              : item.trend === "down"
                              ? "↓"
                              : "→"}
                          </span>
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="text-right">
                      <div className="text-sm font-semibold">
                        {item.affected.toLocaleString()}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {item.percentage}% del total
                      </div>
                    </div>
                    <Progress
                      value={item.percentage}
                      className="w-16 group-hover:w-20 transition-all duration-300"
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <Separator className="my-4" />

          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              variant="outline"
              className="w-full bg-transparent hover:bg-primary/5 hover:border-primary/50 transition-all duration-300"
              onClick={onViewDetails}
            >
              <BarChart3 className="w-4 h-4 mr-2" />
              Ver análisis completo
            </Button>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
