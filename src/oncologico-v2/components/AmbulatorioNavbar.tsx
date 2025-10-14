import { Link, useLocation } from "react-router-dom";
import { Button } from "@/shared/components/ui/button";
import { Badge } from "@/shared/components/ui/badge";
import { Building2, Home, Calendar, FileText, Users } from "lucide-react";

interface AmbulatorioNavbarProps {
  ambulatorio: "cure-simultanee" | "oncogeriatria" | "osteoncologia";
}

const AmbulatorioNavbar = ({ ambulatorio }: AmbulatorioNavbarProps) => {
  const location = useLocation();

  const getAmbulatorioInfo = () => {
    switch (ambulatorio) {
      case "cure-simultanee":
        return {
          nome: "Cure Simultanee",
          colore: "blue",
          icona: Building2,
          descrizione: "Gestione cure oncologiche integrate"
        };
      case "oncogeriatria":
        return {
          nome: "Oncogeriatria",
          colore: "green",
          icona: Users,
          descrizione: "Oncologia per pazienti anziani"
        };
      case "osteoncologia":
        return {
          nome: "Osteoncologia",
          colore: "purple",
          icona: Building2,
          descrizione: "Oncologia ossea e tessuti molli"
        };
      default:
        return {
          nome: "Ambulatorio",
          colore: "gray",
          icona: Building2,
          descrizione: "Gestione ambulatorio"
        };
    }
  };

  const info = getAmbulatorioInfo();
  const IconaAmbulatorio = info.icona;

  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(path + "/");
  };

  const getColorClasses = (color: string) => {
    switch (color) {
      case "blue":
        return {
          bg: "bg-blue-600",
          bgLight: "bg-blue-100",
          text: "text-blue-800",
          border: "border-blue-200"
        };
      case "green":
        return {
          bg: "bg-green-600",
          bgLight: "bg-green-100",
          text: "text-green-800",
          border: "border-green-200"
        };
      case "purple":
        return {
          bg: "bg-purple-600",
          bgLight: "bg-purple-100",
          text: "text-purple-800",
          border: "border-purple-200"
        };
      default:
        return {
          bg: "bg-gray-600",
          bgLight: "bg-gray-100",
          text: "text-gray-800",
          border: "border-gray-200"
        };
    }
  };

  const colors = getColorClasses(info.colore);

  return (
    <nav className="bg-white border-b border-gray-200 px-4 py-3">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo e titolo */}
        <div className="flex items-center gap-3">
          <div className={`w-8 h-8 ${colors.bg} rounded-lg flex items-center justify-center`}>
            <IconaAmbulatorio className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-gray-900">{info.nome}</h1>
            <Badge variant="secondary" className={`text-xs ${colors.bgLight} ${colors.text} ${colors.border}`}>
              {info.descrizione}
            </Badge>
          </div>
        </div>

        {/* Navigazione */}
        <div className="flex items-center gap-1">
          <Link to="/oncologico-v2">
            <Button 
              variant="ghost"
              size="sm"
              className="flex items-center gap-2"
            >
              <Home className="w-4 h-4" />
              Home
            </Button>
          </Link>
          
          <Link to={`/oncologico-v2/ambulatori/${ambulatorio}`}>
            <Button 
              variant={isActive(`/oncologico-v2/ambulatori/${ambulatorio}`) ? "default" : "ghost"}
              size="sm"
              className="flex items-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              Occupazione
            </Button>
          </Link>
          
          <Link to={`/oncologico-v2/ambulatori/${ambulatorio}/pianificazione`}>
            <Button 
              variant={isActive(`/oncologico-v2/ambulatori/${ambulatorio}/pianificazione`) ? "default" : "ghost"}
              size="sm"
              className="flex items-center gap-2"
            >
              <Users className="w-4 h-4" />
              Pianificazione
            </Button>
          </Link>
          
          <Link to={`/oncologico-v2/ambulatori/${ambulatorio}/verbali`}>
            <Button 
              variant={isActive(`/oncologico-v2/ambulatori/${ambulatorio}/verbali`) ? "default" : "ghost"}
              size="sm"
              className="flex items-center gap-2"
            >
              <FileText className="w-4 h-4" />
              Verbali
            </Button>
          </Link>
        </div>

        {/* Profilo utente */}
        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-sm font-medium text-gray-900">Dr. Responsabile</p>
            <p className="text-xs text-gray-500">{info.nome}</p>
          </div>
          <div className={`w-8 h-8 ${colors.bgLight} rounded-full flex items-center justify-center`}>
            <Users className={`w-4 h-4 ${colors.text}`} />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default AmbulatorioNavbar;
