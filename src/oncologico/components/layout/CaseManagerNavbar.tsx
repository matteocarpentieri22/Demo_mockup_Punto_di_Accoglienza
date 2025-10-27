import { Link, useLocation } from "react-router-dom";
import { Button } from "@/shared/components/ui/button";
import { Badge } from "@/shared/components/ui/badge";
import { User, Home, Users, Calendar, Search, ClipboardList } from "lucide-react";

const CaseManagerNavbar = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(path + "/");
  };

  return (
    <nav className="bg-white border-b border-gray-200 px-4 py-3">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo e titolo */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
            <Users className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-gray-900">Profilo Case Manager</h1>
            <Badge variant="secondary" className="text-xs bg-green-100 text-green-800">
              Coordinatore
            </Badge>
          </div>
        </div>

        {/* Navigazione */}
        <div className="flex items-center gap-1">
          <Link to="/oncologico/case-manager">
            <Button 
              variant={isActive("/oncologico/case-manager") && !isActive("/oncologico/case-manager/pazienti") && !isActive("/oncologico/case-manager/visite") && !isActive("/oncologico/case-manager/ricerca") ? "default" : "ghost"}
              size="sm"
              className="flex items-center gap-2"
            >
              <Home className="w-4 h-4" />
              Home
            </Button>
          </Link>
          
          <Link to="/oncologico/case-manager/pazienti">
            <Button 
              variant={isActive("/oncologico/case-manager/pazienti") ? "default" : "ghost"}
              size="sm"
              className="flex items-center gap-2"
            >
              <Users className="w-4 h-4" />
              Pazienti
            </Button>
          </Link>
          
          <Link to="/oncologico/case-manager/visite">
            <Button 
              variant={isActive("/oncologico/case-manager/visite") ? "default" : "ghost"}
              size="sm"
              className="flex items-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              Visite
            </Button>
          </Link>
          
          <Link to="/oncologico/case-manager/ricerca">
            <Button 
              variant={isActive("/oncologico/case-manager/ricerca") ? "default" : "ghost"}
              size="sm"
              className="flex items-center gap-2"
            >
              <Search className="w-4 h-4" />
              Ricerca
            </Button>
          </Link>
        </div>

        {/* Profilo utente */}
        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-sm font-medium text-gray-900">Dr. Carlo Bianchi</p>
            <p className="text-xs text-gray-500">Case Manager</p>
          </div>
          <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
            <User className="w-4 h-4 text-green-600" />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default CaseManagerNavbar;
