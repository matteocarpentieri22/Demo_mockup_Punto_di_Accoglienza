import { Link, useLocation } from "react-router-dom";
import { Button } from "@/shared/components/ui/button";
import { Badge } from "@/shared/components/ui/badge";
import { User, Home, Calendar, Users, FileText, Building2, LogOut } from "lucide-react";

const CureSimultaneeNavbar = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(path + "/");
  };

  const handleLogout = () => {
    if (confirm("Sei sicuro di voler uscire dall'ambulatorio Cure Simultanee?")) {
      window.location.href = '/oncologico-v2';
    }
  };

  return (
    <nav className="bg-white border-b border-gray-200 px-4 py-3">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo e titolo */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <Building2 className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-gray-900">Cure Simultanee</h1>
            <Badge variant="secondary" className="text-xs bg-blue-100 text-blue-800">
              Ambulatorio Oncologico
            </Badge>
          </div>
        </div>

        {/* Navigazione */}
        <div className="flex items-center gap-1">
          <Link to="/oncologico-v2/ambulatori/cure-simultanee">
            <Button 
              variant={isActive("/oncologico-v2/ambulatori/cure-simultanee") ? "default" : "ghost"}
              size="sm"
              className="flex items-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              Occupazione
            </Button>
          </Link>
          
          <Link to="/oncologico-v2/ambulatori/cure-simultanee/pianificazione">
            <Button 
              variant={isActive("/oncologico-v2/ambulatori/cure-simultanee/pianificazione") ? "default" : "ghost"}
              size="sm"
              className="flex items-center gap-2"
            >
              <Users className="w-4 h-4" />
              Pianificazione
            </Button>
          </Link>
          
          <Link to="/oncologico-v2/ambulatori/cure-simultanee/verbali">
            <Button 
              variant={isActive("/oncologico-v2/ambulatori/cure-simultanee/verbali") ? "default" : "ghost"}
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
            <p className="text-sm font-medium text-gray-900">Dr. Carlo Bianchi</p>
            <p className="text-xs text-gray-500">Oncologo</p>
          </div>
          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
            <User className="w-4 h-4 text-blue-600" />
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLogout}
            className="text-gray-500 hover:text-gray-700"
          >
            <LogOut className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default CureSimultaneeNavbar;
