import { Link, useLocation } from "react-router-dom";
import { FileText, ExternalLink, Home, User, LogOut, Users, UserPlus, BarChart3 } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { Avatar, AvatarFallback } from "@/shared/components/ui/avatar";

export const OncologicoNavbar = () => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 py-3 sm:py-5">
        {/* Desktop Layout */}
        <div className="hidden lg:flex items-center justify-between">
          {/* Logo e titolo */}
          <div className="flex flex-col">
            <h1 className="text-xl xl:text-2xl font-bold text-primary">Punto di Accoglienza IOV</h1>
            <p className="text-xs xl:text-sm text-muted-foreground mt-0.5">Portale Personale IOV</p>
          </div>
          
          {/* Navigazione principale - centrata */}
          <nav className="flex items-center gap-2 xl:gap-3">
            <Link to="/oncologico">
              <div 
                className={`flex items-center gap-2 px-3 xl:px-4 py-2 rounded-md cursor-pointer transition-colors duration-300 hover:bg-primary/20 hover:text-primary ${
                  isActive('/oncologico') ? 'bg-primary/15 text-primary' : 'bg-transparent'
                }`}
              >
                <Home className="w-4 h-4" />
                <span className="text-sm xl:text-base">Home</span>
              </div>
            </Link>

            <Link to="/oncologico/pazienti">
              <div 
                className={`flex items-center gap-2 px-3 xl:px-4 py-2 rounded-md cursor-pointer transition-colors duration-300 hover:bg-primary/20 hover:text-primary ${
                  isActive('/oncologico/pazienti') ? 'bg-primary/15 text-primary' : 'bg-transparent'
                }`}
              >
                <Users className="w-4 h-4" />
                <span className="text-sm xl:text-base">Pazienti</span>
              </div>
            </Link>
            
            <Link to="/oncologico/aggiungi-paziente">
              <div 
                className={`flex items-center gap-2 px-3 xl:px-4 py-2 rounded-md cursor-pointer transition-colors duration-300 hover:bg-primary/20 hover:text-primary ${
                  isActive('/oncologico/aggiungi-paziente') ? 'bg-primary/15 text-primary' : 'bg-transparent'
                }`}
              >
                <UserPlus className="w-4 h-4" />
                <span className="text-sm xl:text-base">Nuovo</span>
              </div>
            </Link>

            <Link to="/oncologico/dashboard">
              <div 
                className={`flex items-center gap-2 px-3 xl:px-4 py-2 rounded-md cursor-pointer transition-colors duration-300 hover:bg-primary/20 hover:text-primary ${
                  isActive('/oncologico/dashboard') ? 'bg-primary/15 text-primary' : 'bg-transparent'
                }`}
              >
                <BarChart3 className="w-4 h-4" />
                <span className="text-sm xl:text-base">Dashboard</span>
              </div>
            </Link>
          </nav>

          {/* Sezione login dottore */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 xl:gap-3 bg-card border rounded-lg px-3 xl:px-4 py-2 shadow-sm">
              <Avatar className="w-7 h-7 xl:w-8 xl:h-8">
                <AvatarFallback className="bg-primary/10 text-primary">
                  <User className="w-3 h-3 xl:w-4 xl:h-4" />
                </AvatarFallback>
              </Avatar>
              <span className="text-xs xl:text-sm font-medium whitespace-nowrap">Dr. Carlo Bianchi</span>
              <Button variant="ghost" size="sm" className="hover:bg-primary/10" onClick={() => window.location.href = '/oncologico-access'}>
                <LogOut className="w-3 h-3 xl:w-4 xl:h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="lg:hidden">
          {/* Top row - Logo and Login */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex flex-col">
              <h1 className="text-lg font-bold text-primary">Punto di Accoglienza Oncologico</h1>
              <p className="text-xs text-muted-foreground">Sistema PDTA oncologici</p>
            </div>
            
            <div className="flex items-center gap-2 bg-card border rounded-lg px-3 py-2 shadow-sm">
              <Avatar className="w-6 h-6">
                <AvatarFallback className="bg-primary/10 text-primary">
                  <User className="w-3 h-3" />
                </AvatarFallback>
              </Avatar>
              <span className="text-xs font-medium">Dr. Rossi</span>
            </div>
          </div>

          {/* Bottom row - Navigation */}
          <nav className="flex items-center justify-center gap-1">
            <Link to="/oncologico">
              <div 
                className={`flex flex-col items-center gap-1 px-3 py-2 rounded-md cursor-pointer transition-colors duration-300 hover:bg-primary/20 hover:text-primary ${
                  isActive('/oncologico') ? 'bg-primary/15 text-primary' : 'bg-transparent'
                }`}
              >
                <Home className="w-4 h-4" />
                <span className="text-xs">Home</span>
              </div>
            </Link>

            <Link to="/oncologico/pazienti">
              <div 
                className={`flex flex-col items-center gap-1 px-3 py-2 rounded-md cursor-pointer transition-colors duration-300 hover:bg-primary/20 hover:text-primary ${
                  isActive('/oncologico/pazienti') ? 'bg-primary/15 text-primary' : 'bg-transparent'
                }`}
              >
                <Users className="w-4 h-4" />
                <span className="text-xs">Pazienti</span>
              </div>
            </Link>
            
            <Link to="/oncologico/aggiungi-paziente">
              <div 
                className={`flex flex-col items-center gap-1 px-3 py-2 rounded-md cursor-pointer transition-colors duration-300 hover:bg-primary/20 hover:text-primary ${
                  isActive('/oncologico/aggiungi-paziente') ? 'bg-primary/15 text-primary' : 'bg-transparent'
                }`}
              >
                <UserPlus className="w-4 h-4" />
                <span className="text-xs">Nuovo</span>
              </div>
            </Link>

            <Link to="/oncologico/dashboard">
              <div 
                className={`flex flex-col items-center gap-1 px-3 py-2 rounded-md cursor-pointer transition-colors duration-300 hover:bg-primary/20 hover:text-primary ${
                  isActive('/oncologico/dashboard') ? 'bg-primary/15 text-primary' : 'bg-transparent'
                }`}
              >
                <BarChart3 className="w-4 h-4" />
                <span className="text-xs">Dashboard</span>
              </div>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

