import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";
import { UserPlus, List } from "lucide-react";
import CaseManagerNavbar from "@/oncologico/components/layout/CaseManagerNavbar";
import { useNavigate } from "react-router-dom";

const CaseManagerMammellaSarcomiMelanomi = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <CaseManagerNavbar />
      <div className="container mx-auto px-4 py-4">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-2">Case Manager - Mammella, Sarcomi e Melanomi</h1>
          <p className="text-muted-foreground">Gestione pazienti per PDTA: Mammella, Sarcomi dei tessuti molli, Melanoma</p>
        </div>

        {/* Main Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 max-w-4xl mx-auto">
          {/* Triage Paziente */}
          <Card 
            className="h-full flex flex-col hover:shadow-2xl transition-all duration-300 cursor-pointer border-0 shadow-lg hover:scale-105 bg-gradient-to-br from-blue-50 via-white to-blue-50/30 overflow-hidden hover:from-blue-100 hover:to-blue-50"
            onClick={() => navigate('/oncologico/case-manager/mammella-sarcomi-melanomi/triage')}
          >
            <CardHeader className="text-center pb-3">
              <div className="mx-auto mb-3 w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:from-blue-600 hover:to-blue-700">
                <UserPlus className="w-6 h-6 text-white" />
              </div>
              <CardTitle className="text-lg font-bold text-gray-800 hover:text-blue-700 transition-colors duration-300">Triage Paziente</CardTitle>
              <CardDescription className="text-gray-600 font-medium text-sm">
                Triage con checklist PDTA
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center flex flex-col grow">
              <p className="text-xs text-gray-500 mb-4 leading-relaxed">
                Cerca in anagrafica, aggiungi informazioni caregiver e compila la checklist per Mammella, Sarcomi e Melanomi.
              </p>
              <div className="mt-auto w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-2 px-3 rounded-lg font-semibold text-xs shadow-lg hover:shadow-xl transition-all duration-300 hover:from-blue-600 hover:to-blue-700">
                Avvia Triage
              </div>
            </CardContent>
          </Card>

          {/* Elenco Pazienti */}
          <Card 
            className="h-full flex flex-col hover:shadow-2xl transition-all duration-300 cursor-pointer border-0 shadow-lg hover:scale-105 bg-gradient-to-br from-blue-50 via-white to-blue-50/30 overflow-hidden hover:from-blue-100 hover:to-blue-50"
            onClick={() => navigate('/oncologico/case-manager/mammella-sarcomi-melanomi/elenco-pazienti')}
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
                Accedi alla lista completa dei pazienti con triage completato per Mammella, Sarcomi e Melanomi.
              </p>
              <div className="mt-auto w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-2 px-3 rounded-lg font-semibold text-xs shadow-lg hover:shadow-xl transition-all duration-300 hover:from-blue-600 hover:to-blue-700">
                Visualizza Pazienti
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CaseManagerMammellaSarcomiMelanomi;

