import { Toaster } from "@/shared/components/ui/toaster";
import { Toaster as Sonner } from "@/shared/components/ui/sonner";
import { TooltipProvider } from "@/shared/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Rotte base
import SystemSelector from "@/mmg/pages/SystemSelector";
import Index from "@/mmg/pages/Index";
import Documenti from "@/mmg/pages/Documenti";
import NotFound from "@/mmg/pages/NotFound";

// Rotte Oncologico
import OncologicoHome from "@/oncologico/pages/OncologicoHome";
import OncologoPage from "@/oncologico/pages/OncologoPage";
import NotifichePage from "@/oncologico/pages/NotifichePage";
import RichiestePage from "@/oncologico/pages/RichiestePage";
import RichiestaDetailPage from "@/oncologico/pages/RichiestaDetailPage";
import PazienteDetailOncologo from "@/oncologico/pages/PazienteDetailOncologo";
import CaseManagerHome from "@/oncologico/pages/CaseManagerHome";
import PazientiListPage from "@/oncologico/pages/PazientiListPage";
import VisiteAmbulatoriPage from "@/oncologico/pages/VisiteAmbulatoriPage";
import RicercaPazientePage from "@/oncologico/pages/RicercaPazientePage";
import AggiuntaPazientePage from "@/oncologico/pages/AggiuntaPazientePage";
import CaseManagerDashboard from "@/oncologico/pages/CaseManagerDashboard";
import ElencoPazientiPage from "@/oncologico/pages/ElencoPazientiPage";
import CalendarioPage from "@/oncologico/pages/CalendarioPage";
import PazienteDetailPage from "@/oncologico/pages/PazienteDetailPage";
import CureSimultaneePage from "@/oncologico/pages/CureSimultaneePage";
import OncogeriatriaPage from "@/oncologico/pages/OncogeriatriaPage";
import OsteoncologiaPage from "@/oncologico/pages/OsteoncologiaPage";

// Rotte Paziente
import PazienteHome from "@/paziente/pages/PazienteHome";
import QuestionnaireCompilation from "@/paziente/pages/QuestionnaireCompilation";
import InformazioniSupporto from "@/paziente/pages/InformazioniSupporto";
import EsamiProgrammati from "@/paziente/pages/EsamiProgrammati";
import QuestionariDettaglio from "@/paziente/pages/QuestionariDettaglio";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Rotte base */}
          <Route path="/" element={<SystemSelector />} />
          <Route path="/mmg" element={<Index />} />
          <Route path="/mmg/documenti" element={<Documenti />} />
          
          {/* Rotte Oncologico */}
          <Route path="/oncologico" element={<OncologicoHome />} />
          <Route path="/oncologico/oncologo" element={<OncologoPage />} />
          <Route path="/oncologico/oncologo/notifiche" element={<NotifichePage />} />
          <Route path="/oncologico/oncologo/richieste" element={<RichiestePage />} />
          <Route path="/oncologico/oncologo/richieste/:id" element={<RichiestaDetailPage />} />
          <Route path="/oncologico/oncologo/paziente/:cf" element={<PazienteDetailOncologo />} />
          <Route path="/oncologico/case-manager" element={<CaseManagerHome />} />
          <Route path="/oncologico/case-manager/pazienti" element={<PazientiListPage />} />
          <Route path="/oncologico/case-manager/visite" element={<VisiteAmbulatoriPage />} />
          <Route path="/oncologico/case-manager/ricerca" element={<RicercaPazientePage />} />
          <Route path="/oncologico/case-manager/aggiunta-paziente" element={<AggiuntaPazientePage />} />
          <Route path="/oncologico/case-manager/dashboard" element={<CaseManagerDashboard />} />
          <Route path="/oncologico/case-manager/elenco-pazienti" element={<ElencoPazientiPage />} />
          <Route path="/oncologico/calendario" element={<CalendarioPage />} />
          <Route path="/oncologico/paziente/:cf" element={<PazienteDetailPage />} />
          <Route path="/oncologico/ambulatori/cure-simultanee" element={<CureSimultaneePage />} />
          <Route path="/oncologico/ambulatori/oncogeriatria" element={<OncogeriatriaPage />} />
          <Route path="/oncologico/ambulatori/osteoncologia" element={<OsteoncologiaPage />} />
          
          {/* Rotte Paziente */}
          <Route path="/paziente" element={<PazienteHome />} />
          <Route path="/paziente/questionario" element={<QuestionnaireCompilation />} />
          <Route path="/paziente/informazioni" element={<InformazioniSupporto />} />
          <Route path="/paziente/esami" element={<EsamiProgrammati />} />
          <Route path="/paziente/questionari" element={<QuestionariDettaglio />} />
          
          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
