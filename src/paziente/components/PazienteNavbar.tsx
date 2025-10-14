import { Link, useLocation } from "react-router-dom";
import { Button } from "@/shared/components/ui/button";
import { User, FileText, ClipboardList, LogOut } from "lucide-react";
import { useState, useEffect } from "react";

const PazienteNavbar = () => {
  const location = useLocation();
  const [activeSection, setActiveSection] = useState<string>('profilo');
  
  const isActive = (path: string) => location.pathname === path;
  
  // Aggiorna la sezione attiva quando cambia l'hash o la pagina
  useEffect(() => {
    if (location.pathname === '/paziente') {
      if (window.location.hash === '#questionnaires-section') {
        setActiveSection('questionari');
      } else if (window.location.hash === '#clinical-info') {
        setActiveSection('informazioni');
      } else {
        setActiveSection('profilo');
      }
    } else if (location.pathname === '/paziente/informazioni') {
      setActiveSection('informazioni');
    } else if (location.pathname === '/paziente/questionari') {
      setActiveSection('questionari');
    }
  }, [location.pathname, location.hash]);

  return (
    <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 py-3 sm:py-5">
        {/* Desktop Layout */}
        <div className="hidden lg:flex items-center justify-between">
          {/* Logo e titolo */}
          <div className="flex flex-col">
            <h1 className="text-xl xl:text-2xl font-bold text-primary">Punto di Accoglienza IOV</h1>
            <p className="text-xs xl:text-sm text-muted-foreground mt-0.5">Portale Pazienti</p>
          </div>
          
          {/* Navigazione principale - centrata */}
          <nav className="flex items-center gap-2 xl:gap-3">
            <Link to="/paziente">
              <div 
                className={`flex items-center gap-2 px-3 xl:px-4 py-2 rounded-md cursor-pointer transition-colors duration-300 hover:bg-primary/20 hover:text-primary ${
                  activeSection === 'profilo' ? 'bg-primary/15 text-primary' : 'bg-transparent'
                }`}
              >
                <User className="w-4 h-4" />
                <span className="text-sm xl:text-base">Profilo</span>
              </div>
            </Link>
            
            <Link to="/paziente/informazioni">
              <div 
                className={`flex items-center gap-2 px-3 xl:px-4 py-2 rounded-md cursor-pointer transition-colors duration-300 hover:bg-primary/20 hover:text-primary ${
                  activeSection === 'informazioni' ? 'bg-primary/15 text-primary' : 'bg-transparent'
                }`}
              >
                <FileText className="w-4 h-4" />
                <span className="text-sm xl:text-base">Informazioni</span>
              </div>
            </Link>
            
            <Link to="/paziente/questionari">
              <div 
                className={`flex items-center gap-2 px-3 xl:px-4 py-2 rounded-md cursor-pointer transition-colors duration-300 hover:bg-primary/20 hover:text-primary ${
                  activeSection === 'questionari' ? 'bg-primary/15 text-primary' : 'bg-transparent'
                }`}
              >
                <ClipboardList className="w-4 h-4" />
                <span className="text-sm xl:text-base">Questionari</span>
              </div>
            </Link>
          </nav>

          {/* Sezione login paziente */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 xl:gap-3 bg-card border rounded-lg px-3 xl:px-4 py-2 shadow-sm">
              <div className="w-7 h-7 xl:w-8 xl:h-8 bg-primary/10 rounded-full flex items-center justify-center">
                <User className="w-3 h-3 xl:w-4 xl:h-4 text-primary" />
              </div>
              <span className="text-xs xl:text-sm font-medium whitespace-nowrap">Davide Verdi</span>
              <Button variant="ghost" size="sm" className="hover:bg-primary/10">
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
              <h1 className="text-lg font-bold text-primary">Punto di Accoglienza IOV</h1>
              <p className="text-xs text-muted-foreground">Portale Pazienti</p>
            </div>

            <div className="flex items-center gap-2 bg-card border rounded-lg px-3 py-2 shadow-sm">
              <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center">
                <User className="w-3 h-3 text-primary" />
              </div>
              <span className="text-xs font-medium">Mario Rossi</span>
            </div>
          </div>

          {/* Bottom row - Navigation */}
          <nav className="flex items-center justify-center gap-1">
            <Link to="/paziente">
              <div 
                className={`flex flex-col items-center gap-1 px-3 py-2 rounded-md cursor-pointer transition-colors duration-300 hover:bg-primary/20 hover:text-primary ${
                  activeSection === 'profilo' ? 'bg-primary/15 text-primary' : 'bg-transparent'
                }`}
              >
                <User className="w-4 h-4" />
                <span className="text-xs">Profilo</span>
              </div>
            </Link>

            <Link to="/paziente/informazioni">
              <div 
                className={`flex flex-col items-center gap-1 px-3 py-2 rounded-md cursor-pointer transition-colors duration-300 hover:bg-primary/20 hover:text-primary ${
                  activeSection === 'informazioni' ? 'bg-primary/15 text-primary' : 'bg-transparent'
                }`}
              >
                <FileText className="w-4 h-4" />
                <span className="text-xs">Informazioni</span>
              </div>
            </Link>
            
            <Link to="/paziente/questionari">
              <div 
                className={`flex flex-col items-center gap-1 px-3 py-2 rounded-md cursor-pointer transition-colors duration-300 hover:bg-primary/20 hover:text-primary ${
                  activeSection === 'questionari' ? 'bg-primary/15 text-primary' : 'bg-transparent'
                }`}
              >
                <ClipboardList className="w-4 h-4" />
                <span className="text-xs">Questionari</span>
              </div>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default PazienteNavbar;
