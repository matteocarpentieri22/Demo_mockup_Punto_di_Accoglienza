import { Link, useLocation } from "react-router-dom";
import { Button } from "@/shared/components/ui/button";
import { Badge } from "@/shared/components/ui/badge";
import { User, Home, Calendar, Users, FileText, Heart, LogOut } from "lucide-react";

const OncogeriatriaNavbar = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(path + "/");
  };

  const handleLogout = () => {
    if (confirm("Sei sicuro di voler uscire dall'ambulatorio Oncogeriatria?")) {
      window.location.href = '/oncologico';
    }
  };

  return (
    <nav className="bg-white border-b border-gray-200 px-4 py-3">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo e titolo */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
            <Heart className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-gray-900">Oncogeriatria</h1>
            <Badge variant="secondary" className="text-xs bg-green-100 text-green-800">
              Ambulatorio Oncologico
            </Badge>
          </div>
        </div>

        {/* Navigazione */}
        <div className="flex items-center gap-1">
          <Link to="/oncologico/ambulatori/oncogeriatria">
            <Button 
              variant={isActive("/oncologico/ambulatori/oncogeriatria") ? "default" : "ghost"}
              size="sm"
              className="flex items-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              Occupazione
            </Button>
          </Link>
          
          <Link to="/oncologico/ambulatori/oncogeriatria/pianificazione">
            <Button 
              variant={isActive("/oncologico/ambulatori/oncogeriatria/pianificazione") ? "default" : "ghost"}
              size="sm"
              className="flex items-center gap-2"
            >
              <Users className="w-4 h-4" />
              Pianificazione
            </Button>
          </Link>
          
          <Link to="/oncologico/ambulatori/oncogeriatria/verbali">
            <Button 
              variant={isActive("/oncologico/ambulatori/oncogeriatria/verbali") ? "default" : "ghost"}
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
            <p className="text-sm font-medium text-gray-900">Dr. Maria Rossi</p>
            <p className="text-xs text-gray-500">Oncogeriatra</p>
          </div>
          <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
            <User className="w-4 h-4 text-green-600" />
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

export default OncogeriatriaNavbar;
