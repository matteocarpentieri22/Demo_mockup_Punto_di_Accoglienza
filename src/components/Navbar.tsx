import { Link } from "react-router-dom";
import { FileText, ExternalLink, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Navbar = () => {
  return (
    <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-6 py-5">
        <div className="flex items-center justify-between gap-8">
          <div className="flex flex-col">
            <h1 className="text-2xl font-bold text-primary">Punto di Accoglienza IOV</h1>
            <p className="text-sm text-muted-foreground mt-0.5">Portale Medici di Medicina Generale</p>
          </div>
          
          <nav className="flex items-center gap-3">
            <Link to="/">
              <Button variant="ghost" className="gap-2 hover:bg-primary/10">
                <Home className="w-4 h-4" />
                <span>Home</span>
              </Button>
            </Link>

            <Link to="/documenti">
              <Button variant="ghost" className="gap-2 hover:bg-primary/10">
                <FileText className="w-4 h-4" />
                <span>Documenti</span>
              </Button>
            </Link>
            
            <a 
              href="https://www.ioveneto.it/prenotazioni-referti-e-disdette/servizio-sanitario-nazionale/" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <Button variant="default" className="gap-2">
                <ExternalLink className="w-4 h-4" />
                <span>CUP</span>
              </Button>
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
};
