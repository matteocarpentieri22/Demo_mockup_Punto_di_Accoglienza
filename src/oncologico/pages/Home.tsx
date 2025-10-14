import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Users, UserPlus, BarChart3 } from "lucide-react";
import { OncologicoNavbar } from "@/oncologico/components/OncologicoNavbar";

const OncologicoHome = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <OncologicoNavbar />

      {/* Header */}
      <div className="container mx-auto px-4 py-8 flex-1">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-lg text-lg font-semibold">
            PDTA: Tumore Polmone
          </div>
        </div>

        {/* Main Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-6xl mx-auto">
          {/* Lista Pazienti */}
          <Card 
            className="hover:shadow-lg transition-shadow cursor-pointer border-2 hover:border-primary/50"
            onClick={() => window.location.href = '/oncologico/pazienti'}
          >
            <CardHeader className="text-center pb-3 sm:pb-4">
              <div className="mx-auto mb-3 sm:mb-4 w-12 h-12 sm:w-16 sm:h-16 bg-primary/10 rounded-full flex items-center justify-center">
                <Users className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
              </div>
              <CardTitle className="text-lg sm:text-xl lg:text-2xl">Lista Pazienti</CardTitle>
              <CardDescription className="text-sm sm:text-base">
                Visualizza e gestisci i pazienti in trattamento
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-xs sm:text-sm text-muted-foreground mb-4 sm:mb-6">
                Accedi alla lista completa dei pazienti con i loro stati di avanzamento nei percorsi PDTA.
              </p>
              <div className="w-full bg-primary text-white py-2 sm:py-3 px-3 sm:px-4 rounded-lg font-semibold text-sm sm:text-base">
                Visualizza Pazienti
              </div>
            </CardContent>
          </Card>

          {/* Aggiungi Paziente */}
          <Card 
            className="hover:shadow-lg transition-shadow cursor-pointer border-2 hover:border-primary/50"
            onClick={() => window.location.href = '/oncologico/aggiungi-paziente'}
          >
            <CardHeader className="text-center pb-3 sm:pb-4">
              <div className="mx-auto mb-3 sm:mb-4 w-12 h-12 sm:w-16 sm:h-16 bg-primary/10 rounded-full flex items-center justify-center">
                <UserPlus className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
              </div>
              <CardTitle className="text-lg sm:text-xl lg:text-2xl">Aggiungi Paziente</CardTitle>
              <CardDescription className="text-sm sm:text-base">
                Inserisci un nuovo paziente nel sistema
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-xs sm:text-sm text-muted-foreground mb-4 sm:mb-6">
                Avvia il processo di inserimento di un nuovo paziente con verifica anagrafica e checklist clinica.
              </p>
              <div className="w-full bg-primary text-white py-2 sm:py-3 px-3 sm:px-4 rounded-lg font-semibold text-sm sm:text-base">
                Nuovo Paziente
              </div>
            </CardContent>
          </Card>

          {/* Dashboard */}
          <Card 
            className="hover:shadow-lg transition-shadow cursor-pointer border-2 hover:border-primary/50"
            onClick={() => window.location.href = '/oncologico/dashboard'}
          >
            <CardHeader className="text-center pb-3 sm:pb-4">
              <div className="mx-auto mb-3 sm:mb-4 w-12 h-12 sm:w-16 sm:h-16 bg-blue-500/10 rounded-full flex items-center justify-center">
                <BarChart3 className="w-6 h-6 sm:w-8 sm:h-8 text-blue-500" />
              </div>
              <CardTitle className="text-lg sm:text-xl lg:text-2xl">Dashboard</CardTitle>
              <CardDescription className="text-sm sm:text-base">
                Monitora l'avanzamento dei percorsi
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-xs sm:text-sm text-muted-foreground mb-4 sm:mb-6">
                Visualizza statistiche e trend dei pazienti attraverso grafici interattivi e reportistica.
              </p>
              <div className="w-full bg-primary text-white py-2 sm:py-3 px-3 sm:px-4 rounded-lg font-semibold text-sm sm:text-base">
                Visualizza Dashboard
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t bg-card">
        <div className="container mx-auto px-4 py-8 text-center text-sm text-muted-foreground">
          <p>© 2025 Istituto Oncologico Veneto - Tutti i diritti riservati</p>
          <p className="mt-2">Sistema demo per medici di medicina generale</p>
        </div>
      </footer>
    </div>
  );
};

export default OncologicoHome;
