import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { ExternalLink, Calendar, FileText, Stethoscope, Building2, AlertCircle, ArrowLeft } from "lucide-react";
import { Navbar } from "@/mmg/components/Navbar";
import { Button } from "@/shared/components/ui/button";
import { useNavigate } from "react-router-dom";

interface LinkUtile {
  id: string;
  title: string;
  description: string;
  url: string;
  icon: React.ReactNode;
  category?: string;
}

const linkUtiliMock: LinkUtile[] = [
  {
    id: "cup",
    title: "CUP - Centro Unico di Prenotazione",
    description: "Prenotazioni, referti e disdette del Servizio Sanitario Nazionale",
    url: "https://www.ioveneto.it/prenotazioni-referti-e-disdette/servizio-sanitario-nazionale/",
    icon: <Calendar className="w-6 h-6" />,
    category: "Prenotazioni"
  },
  {
    id: "linee-guida",
    title: "Linee Guida Regionali",
    description: "Consulta le linee guida regionali per i percorsi diagnostico-terapeutici",
    url: "#",
    icon: <FileText className="w-6 h-6" />,
    category: "Documentazione"
  },
  {
    id: "farmaci",
    title: "Registro Farmaci",
    description: "Accesso al registro dei farmaci e terapie disponibili",
    url: "#",
    icon: <Stethoscope className="w-6 h-6" />,
    category: "Risorse Cliniche"
  },
  {
    id: "contatti",
    title: "Contatti Specialistici",
    description: "Elenco dei contatti utili dei reparti specialistici",
    url: "#",
    icon: <Building2 className="w-6 h-6" />,
    category: "Contatti"
  },
  {
    id: "emergenze",
    title: "Gestione Emergenze",
    description: "Procedure e contatti per la gestione delle emergenze sanitarie",
    url: "#",
    icon: <AlertCircle className="w-6 h-6" />,
    category: "Urgenze"
  },
  {
    id: "formazione",
    title: "Area Formazione",
    description: "Corsi e aggiornamenti professionali per medici di medicina generale",
    url: "#",
    icon: <FileText className="w-6 h-6" />,
    category: "Formazione"
  }
];

const LinkUtili = () => {
  const navigate = useNavigate();

  const handleLinkClick = (url: string) => {
    if (url !== "#") {
      window.open(url, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-6 sm:py-8">
        {/* Back Button */}
        <div className="mb-6">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => navigate('/mmg')} 
            className="hover:bg-primary/10"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Indietro
          </Button>
        </div>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold mb-2">Link Utili</h1>
          <p className="text-muted-foreground text-base sm:text-lg">
            Accesso rapido ai servizi e risorse più utilizzate per la pratica medica
          </p>
        </div>
        
        {/* Links Grid */}
        <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
          {linkUtiliMock.map((link) => (
            <Card
              key={link.id}
              className="hover:shadow-lg transition-all duration-300 cursor-pointer border hover:border-primary/50 group overflow-hidden"
              onClick={() => handleLinkClick(link.url)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors duration-300">
                      {link.icon}
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-lg font-semibold group-hover:text-primary transition-colors duration-300">
                        {link.title}
                      </CardTitle>
                      {link.category && (
                        <span className="text-xs text-muted-foreground mt-1 inline-block">
                          {link.category}
                        </span>
                      )}
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors duration-300 flex-shrink-0" />
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm leading-relaxed">
                  {link.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LinkUtili;

