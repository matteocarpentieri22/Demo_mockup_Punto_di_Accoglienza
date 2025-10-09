import { Link } from "react-router-dom";
import { FileText, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Navbar = () => {
  return (
    <header className="border-b bg-card sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div>
              <h1 className="text-2xl font-bold text-primary">IOV</h1>
              <p className="text-xs text-muted-foreground">Istituto Oncologico Veneto</p>
            </div>
          </Link>
          
          <nav className="flex items-center gap-4">
            <Link to="/documenti">
              <Button variant="ghost" className="gap-2">
                <FileText className="w-4 h-4" />
                Documenti PDTA
              </Button>
            </Link>
            
            <a 
              href="https://cup.sanita.veneto.it" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <Button variant="outline" className="gap-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                <ExternalLink className="w-4 h-4" />
                CUP Veneto
              </Button>
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
};
