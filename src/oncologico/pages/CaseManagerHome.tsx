import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";
import { Users, Calendar, Search, UserPlus, BarChart3, List } from "lucide-react";
import CaseManagerNavbar from "@/oncologico/components/CaseManagerNavbar";
import { useNavigate } from "react-router-dom";

const CaseManagerHome = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <CaseManagerNavbar />
      <div className="container mx-auto px-4 py-4">
        {/* Main Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-7xl mx-auto">
          {/* Lista Pazienti */}
          <Card
            className="hover:shadow-2xl transition-all duration-300 cursor-pointer border-0 shadow-lg hover:scale-105 bg-gradient-to-br from-blue-50 via-white to-blue-50/30 overflow-hidden hover:from-blue-100 hover:to-blue-50"
            onClick={() => navigate('/oncologico/case-manager/pazienti')}
          >
            <CardHeader className="text-center pb-3">
              <div className="mx-auto mb-3 w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:from-blue-600 hover:to-blue-700">
                <Users className="w-6 h-6 text-white" />
              </div>
              <CardTitle className="text-lg font-bold text-gray-800 hover:text-blue-700 transition-colors duration-300">Lista Pazienti</CardTitle>
              <CardDescription className="text-gray-600 font-medium text-sm">
                Gestione pazienti ordinati per score
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-xs text-gray-500 mb-4 leading-relaxed">
                Visualizza l'elenco completo dei pazienti ordinato per score clinico. 
                Gestisci prenotazioni e monitora lo stato delle visite.
              </p>
              <div className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-2 px-3 rounded-lg font-semibold text-xs shadow-lg hover:shadow-xl transition-all duration-300 hover:from-blue-600 hover:to-blue-700">
                Visualizza Lista Pazienti
              </div>
            </CardContent>
          </Card>

          {/* Aggiunta Paziente */}
          <Card 
            className="h-full flex flex-col hover:shadow-2xl transition-all duration-300 cursor-pointer border-0 shadow-lg hover:scale-105 bg-gradient-to-br from-blue-50 via-white to-blue-50/30 overflow-hidden hover:from-blue-100 hover:to-blue-50"
            onClick={() => navigate('/oncologico/case-manager/aggiunta-paziente')}
          >
            <CardHeader className="text-center pb-3">
              <div className="mx-auto mb-3 w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:from-blue-600 hover:to-blue-700">
                <UserPlus className="w-6 h-6 text-white" />
              </div>
              <CardTitle className="text-lg font-bold text-gray-800 hover:text-blue-700 transition-colors duration-300">Aggiunta Paziente</CardTitle>
              <CardDescription className="text-gray-600 font-medium text-sm">
                Censimento con checklist PDTA
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center flex flex-col grow">
              <p className="text-xs text-gray-500 mb-4 leading-relaxed">
                Cerca in anagrafica, verifica invalidità e compila la checklist specifica
                del PDTA di arruolamento.
              </p>
              <div className="mt-auto w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-2 px-3 rounded-lg font-semibold text-xs shadow-lg hover:shadow-xl transition-all duration-300 hover:from-blue-600 hover:to-blue-700">
                Avvia Censimento
              </div>
            </CardContent>
          </Card>

          {/* Dashboard */}
          <Card 
            className="h-full flex flex-col hover:shadow-2xl transition-all duration-300 cursor-pointer border-0 shadow-lg hover:scale-105 bg-gradient-to-br from-blue-50 via-white to-blue-50/30 overflow-hidden hover:from-blue-100 hover:to-blue-50"
            onClick={() => navigate('/oncologico/case-manager/dashboard')}
          >
            <CardHeader className="text-center pb-3">
              <div className="mx-auto mb-3 w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:from-blue-600 hover:to-blue-700">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <CardTitle className="text-lg font-bold text-gray-800 hover:text-blue-700 transition-colors duration-300">Dashboard</CardTitle>
              <CardDescription className="text-gray-600 font-medium text-sm">
                Monitora l'avanzamento dei percorsi
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center flex flex-col grow">
              <p className="text-xs text-gray-500 mb-4 leading-relaxed">
                Visualizza statistiche e trend dei pazienti attraverso grafici interattivi e reportistica.
              </p>
              <div className="mt-auto w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-2 px-3 rounded-lg font-semibold text-xs shadow-lg hover:shadow-xl transition-all duration-300 hover:from-blue-600 hover:to-blue-700">
                Visualizza Dashboard
              </div>
            </CardContent>
          </Card>

          {/* Elenco Pazienti */}
          <Card 
            className="h-full flex flex-col hover:shadow-2xl transition-all duration-300 cursor-pointer border-0 shadow-lg hover:scale-105 bg-gradient-to-br from-blue-50 via-white to-blue-50/30 overflow-hidden hover:from-blue-100 hover:to-blue-50"
            onClick={() => navigate('/oncologico/case-manager/elenco-pazienti')}
          >
            <CardHeader className="text-center pb-3">
              <div className="mx-auto mb-3 w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:from-blue-600 hover:to-blue-700">
                <List className="w-6 h-6 text-white" />
              </div>
              <CardTitle className="text-lg font-bold text-gray-800 hover:text-blue-700 transition-colors duration-300">Elenco Pazienti</CardTitle>
              <CardDescription className="text-gray-600 font-medium text-sm">
                Visualizza e gestisci i pazienti in trattamento
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center flex flex-col grow">
              <p className="text-xs text-gray-500 mb-4 leading-relaxed">
                Accedi alla lista completa dei pazienti con i loro stati di avanzamento nei percorsi PDTA.
              </p>
              <div className="mt-auto w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-2 px-3 rounded-lg font-semibold text-xs shadow-lg hover:shadow-xl transition-all duration-300 hover:from-blue-600 hover:to-blue-700">
                Visualizza Pazienti
              </div>
            </CardContent>
          </Card>

          {/* Visite Ambulatori */}
          <Card 
            className="hover:shadow-2xl transition-all duration-300 cursor-pointer border-0 shadow-lg hover:scale-105 bg-gradient-to-br from-blue-50 via-white to-blue-50/30 overflow-hidden hover:from-blue-100 hover:to-blue-50"
            onClick={() => navigate('/oncologico/case-manager/visite')}
          >
            <CardHeader className="text-center pb-3">
              <div className="mx-auto mb-3 w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:from-blue-600 hover:to-blue-700">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <CardTitle className="text-lg font-bold text-gray-800 hover:text-blue-700 transition-colors duration-300">Visite Ambulatori</CardTitle>
              <CardDescription className="text-gray-600 font-medium text-sm">
                Calendario e gestione visite
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-xs text-gray-500 mb-4 leading-relaxed">
                Gestisci il calendario degli ambulatori, visualizza le visite programmate 
                e coordina gli slot disponibili per le prenotazioni.
              </p>
              <div className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-2 px-3 rounded-lg font-semibold text-xs shadow-lg hover:shadow-xl transition-all duration-300 hover:from-blue-600 hover:to-blue-700">
                Gestisci Visite
              </div>
            </CardContent>
          </Card>

          {/* Visualizza Paziente */}
          <Card 
            className="hover:shadow-2xl transition-all duration-300 cursor-pointer border-0 shadow-lg hover:scale-105 bg-gradient-to-br from-blue-50 via-white to-blue-50/30 overflow-hidden hover:from-blue-100 hover:to-blue-50"
            onClick={() => navigate('/oncologico/case-manager/ricerca')}
          >
            <CardHeader className="text-center pb-3">
              <div className="mx-auto mb-3 w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:from-blue-600 hover:to-blue-700">
                <Search className="w-6 h-6 text-white" />
              </div>
              <CardTitle className="text-lg font-bold text-gray-800 hover:text-blue-700 transition-colors duration-300">Visualizza Paziente</CardTitle>
              <CardDescription className="text-gray-600 font-medium text-sm">
                Ricerca e dettagli paziente
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-xs text-gray-500 mb-4 leading-relaxed">
                Cerca un paziente specifico tramite codice fiscale per visualizzare 
                tutti i dettagli clinici, esiti esami e storico delle visite.
              </p>
              <div className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-2 px-3 rounded-lg font-semibold text-xs shadow-lg hover:shadow-xl transition-all duration-300 hover:from-blue-600 hover:to-blue-700">
                Cerca Paziente
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CaseManagerHome;
