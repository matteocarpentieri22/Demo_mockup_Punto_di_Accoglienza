import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/shared/components/ui/dialog";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { ExternalLink, Calendar, FileText, Stethoscope, Building2, AlertCircle } from "lucide-react";

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

interface LinkUtiliDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const LinkUtiliDialog = ({ open, onOpenChange }: LinkUtiliDialogProps) => {
  const handleLinkClick = (url: string) => {
    if (url !== "#") {
      window.open(url, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Link Utili</DialogTitle>
          <DialogDescription>
            Accesso rapido ai servizi e risorse più utilizzate per la pratica medica
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid md:grid-cols-2 gap-4 mt-6">
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
      </DialogContent>
    </Dialog>
  );
};

