import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";
import { Stethoscope, User, Building2, Heart } from "lucide-react";

const SystemSelector = () => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="mx-auto mb-6 w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
            <Building2 className="w-10 h-10 text-primary" />
          </div>
          <h1 className="text-4xl font-bold text-primary mb-4">Istituto Oncologico Veneto</h1>
          <p className="text-xl text-muted-foreground">Seleziona il sistema di accesso</p>
        </div>

        {/* System Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* MMG System */}
          <Card className="hover:shadow-lg transition-shadow cursor-pointer border-2 hover:border-primary/50" onClick={() => window.location.href = '/mmg'}>
            <CardHeader className="text-center pb-4">
              <div className="mx-auto mb-4 w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                <User className="w-8 h-8 text-primary" />
              </div>
              <CardTitle className="text-2xl">Portale MMG</CardTitle>
              <CardDescription className="text-base">
                Medici di Medicina Generale
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <p className="text-sm text-muted-foreground">
                Sistema di autovalutazione PDTA per medici di medicina generale. 
                Accedi alle funzionalità di valutazione e selezione dei percorsi diagnostico-terapeutici appropriati.
              </p>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span>Autovalutazione AI per PDTA</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span>Selezione diretta PDTA</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span>Documentazione e risorse</span>
                </div>
              </div>
              <Button className="w-full" size="lg">
                Accedi al Portale MMG
              </Button>
            </CardContent>
          </Card>

          {/* Oncologico System */}
          <Card className="hover:shadow-lg transition-shadow cursor-pointer border-2 hover:border-primary/50" onClick={() => window.location.href = '/oncologico'}>
            <CardHeader className="text-center pb-4">
              <div className="mx-auto mb-4 w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center">
                <Stethoscope className="w-8 h-8 text-green-500" />
              </div>
              <CardTitle className="text-xl">Sistema Oncologico</CardTitle>
              <CardDescription className="text-sm">
                Personale IOV - V1
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <p className="text-xs text-muted-foreground">
                Sistema unificato per il personale del Punto di Accoglienza Oncologico.
              </p>
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Gestione pazienti</span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Dashboard monitoraggio</span>
                </div>
              </div>
              <Button className="w-full" size="sm" variant="default">
                Versione 1
              </Button>
            </CardContent>
          </Card>

          {/* Oncologico V2 System */}
          <Card className="hover:shadow-lg transition-shadow cursor-pointer border-2 hover:border-primary/50" onClick={() => window.location.href = '/oncologico-v2'}>
            <CardHeader className="text-center pb-4">
              <div className="mx-auto mb-4 w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center">
                <Stethoscope className="w-8 h-8 text-blue-500" />
              </div>
              <CardTitle className="text-xl">Sistema Oncologico</CardTitle>
              <CardDescription className="text-sm">
                Personale IOV - V2
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <p className="text-xs text-muted-foreground">
                Sistema con profili distinti per oncologi e case manager.
              </p>
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>Profilo Oncologo</span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>Profilo Case Manager</span>
                </div>
              </div>
              <Button className="w-full" size="sm" variant="default">
                Versione 2
              </Button>
            </CardContent>
          </Card>

          {/* Paziente System */}
          <Card className="hover:shadow-lg transition-shadow cursor-pointer border-2 hover:border-primary/50" onClick={() => window.location.href = '/paziente'}>
            <CardHeader className="text-center pb-4">
              <div className="mx-auto mb-4 w-16 h-16 bg-pink-500/10 rounded-full flex items-center justify-center">
                <Heart className="w-8 h-8 text-pink-500" />
              </div>
              <CardTitle className="text-2xl">Portale Paziente</CardTitle>
              <CardDescription className="text-base">
                Accesso Pazienti
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <p className="text-sm text-muted-foreground">
                Portale dedicato ai pazienti per accedere alle proprie informazioni cliniche, 
                monitorare il percorso di cura e compilare questionari di autovalutazione.
              </p>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                  <span>Informazioni personali e esenzioni</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                  <span>Percorso clinico e appuntamenti</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                  <span>Questionari di autovalutazione</span>
                </div>
              </div>
              <Button className="w-full" size="lg" variant="default">
                Accedi al Portale Paziente
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Footer Info */}
        <div className="mt-12 text-center">
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <Building2 className="w-4 h-4" />
            <span>Istituto Oncologico Veneto - IRCCS</span>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            Quattro sistemi distinti per stakeholder diversi con accessi diversificati
          </p>
        </div>
      </div>
    </div>
  );
};

export default SystemSelector;
