import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";
import { Users, Calendar, Search } from "lucide-react";
import CaseManagerNavbar from "@/oncologico-v2/components/CaseManagerNavbar";
import { useNavigate } from "react-router-dom";

const CaseManagerHome = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <CaseManagerNavbar />
      <div className="container mx-auto px-4 py-4">
        {/* Main Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-7xl mx-auto">
          {/* Lista Pazienti */}
          <Card
            className="hover:shadow-2xl transition-all duration-300 cursor-pointer border-0 shadow-lg hover:scale-105 bg-gradient-to-br from-blue-50 via-white to-blue-50/30 overflow-hidden hover:from-blue-100 hover:to-blue-50"
            onClick={() => navigate('/oncologico-v2/case-manager/pazienti')}
          >
            <CardHeader className="text-center pb-4">
              <div className="mx-auto mb-4 w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:from-blue-600 hover:to-blue-700">
                <Users className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-xl font-bold text-gray-800 hover:text-blue-700 transition-colors duration-300">Lista Pazienti</CardTitle>
              <CardDescription className="text-gray-600 font-medium">
                Gestione pazienti ordinati per score
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-sm text-gray-500 mb-6 leading-relaxed">
                Visualizza l'elenco completo dei pazienti ordinato per score clinico. 
                Gestisci prenotazioni e monitora lo stato delle visite.
              </p>
              <div className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 px-4 rounded-xl font-semibold text-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:from-blue-600 hover:to-blue-700">
                Visualizza Lista Pazienti
              </div>
            </CardContent>
          </Card>

          {/* Visite Ambulatori */}
          <Card 
            className="hover:shadow-2xl transition-all duration-300 cursor-pointer border-0 shadow-lg hover:scale-105 bg-gradient-to-br from-blue-50 via-white to-blue-50/30 overflow-hidden hover:from-blue-100 hover:to-blue-50"
            onClick={() => navigate('/oncologico-v2/case-manager/visite')}
          >
            <CardHeader className="text-center pb-4">
              <div className="mx-auto mb-4 w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:from-blue-600 hover:to-blue-700">
                <Calendar className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-xl font-bold text-gray-800 hover:text-blue-700 transition-colors duration-300">Visite Ambulatori</CardTitle>
              <CardDescription className="text-gray-600 font-medium">
                Calendario e gestione visite
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-sm text-gray-500 mb-6 leading-relaxed">
                Gestisci il calendario degli ambulatori, visualizza le visite programmate 
                e coordina gli slot disponibili per le prenotazioni.
              </p>
              <div className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 px-4 rounded-xl font-semibold text-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:from-blue-600 hover:to-blue-700">
                Gestisci Visite
              </div>
            </CardContent>
          </Card>

          {/* Visualizza Paziente */}
          <Card 
            className="hover:shadow-2xl transition-all duration-300 cursor-pointer border-0 shadow-lg hover:scale-105 bg-gradient-to-br from-blue-50 via-white to-blue-50/30 overflow-hidden hover:from-blue-100 hover:to-blue-50"
            onClick={() => navigate('/oncologico-v2/case-manager/ricerca')}
          >
            <CardHeader className="text-center pb-4">
              <div className="mx-auto mb-4 w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:from-blue-600 hover:to-blue-700">
                <Search className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-xl font-bold text-gray-800 hover:text-blue-700 transition-colors duration-300">Visualizza Paziente</CardTitle>
              <CardDescription className="text-gray-600 font-medium">
                Ricerca e dettagli paziente
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-sm text-gray-500 mb-6 leading-relaxed">
                Cerca un paziente specifico tramite codice fiscale per visualizzare 
                tutti i dettagli clinici, esiti esami e storico delle visite.
              </p>
              <div className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 px-4 rounded-xl font-semibold text-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:from-blue-600 hover:to-blue-700">
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
