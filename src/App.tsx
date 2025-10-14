import { Toaster } from "@/shared/components/ui/toaster";
import { Toaster as Sonner } from "@/shared/components/ui/sonner";
import { TooltipProvider } from "@/shared/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SystemSelector from "./mmg/pages/SystemSelector";
import Index from "./mmg/pages/Index";
import Documenti from "./mmg/pages/Documenti";
import NotFound from "./mmg/pages/NotFound";
// Oncologico routes
import OncologicoHome from "./oncologico/pages/Home";
import PazientiList from "./oncologico/pages/PazientiList";
import PazienteDetail from "./oncologico/pages/PazienteDetail";
import AddPaziente from "./oncologico/pages/AddPaziente";
import Dashboard from "./oncologico/pages/Dashboard";
// Oncologico V2 routes
import OncologicoV2Home from "./oncologico-v2/pages/OncologicoV2Home";
import OncologoPage from "./oncologico-v2/pages/OncologoPage";
import NotifichePage from "./oncologico-v2/pages/NotifichePage";
import RichiestePage from "./oncologico-v2/pages/RichiestePage";
import RichiestaDetailPage from "./oncologico-v2/pages/RichiestaDetailPage";
import PazienteDetailOncologo from "./oncologico-v2/pages/PazienteDetailOncologo";
import CaseManagerHome from "./oncologico-v2/pages/CaseManagerHome";
import PazientiListPage from "./oncologico-v2/pages/PazientiListPage";
import VisiteAmbulatoriPage from "./oncologico-v2/pages/VisiteAmbulatoriPage";
import RicercaPazientePage from "./oncologico-v2/pages/RicercaPazientePage";
import CalendarioPage from "./oncologico-v2/pages/CalendarioPage";
import PazienteDetailPage from "./oncologico-v2/pages/PazienteDetailPage";
import CureSimultaneePage from "./oncologico-v2/pages/CureSimultaneePage";
import OncogeriatriaPage from "./oncologico-v2/pages/OncogeriatriaPage";
import OsteoncologiaPage from "./oncologico-v2/pages/OsteoncologiaPage";
// Paziente routes
import PazienteHome from "./paziente/pages/PazienteHome";
import QuestionnaireCompilation from "./paziente/pages/QuestionnaireCompilation";
import InformazioniSupporto from "./paziente/pages/InformazioniSupporto";
import EsamiProgrammati from "./paziente/pages/EsamiProgrammati";
import QuestionariDettaglio from "./paziente/pages/QuestionariDettaglio";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SystemSelector />} />
          <Route path="/mmg" element={<Index />} />
          <Route path="/mmg/documenti" element={<Documenti />} />
          {/* Oncologico routes */}
          <Route path="/oncologico" element={<OncologicoHome />} />
          <Route path="/oncologico/pazienti" element={<PazientiList />} />
          <Route path="/oncologico/paziente/:id" element={<PazienteDetail />} />
          <Route path="/oncologico/aggiungi-paziente" element={<AddPaziente />} />
          <Route path="/oncologico/dashboard" element={<Dashboard />} />
          {/* Oncologico V2 routes */}
          <Route path="/oncologico-v2" element={<OncologicoV2Home />} />
          <Route path="/oncologico-v2/oncologo" element={<OncologoPage />} />
          <Route path="/oncologico-v2/oncologo/notifiche" element={<NotifichePage />} />
          <Route path="/oncologico-v2/oncologo/richieste" element={<RichiestePage />} />
          <Route path="/oncologico-v2/oncologo/richieste/:id" element={<RichiestaDetailPage />} />
          <Route path="/oncologico-v2/oncologo/paziente/:cf" element={<PazienteDetailOncologo />} />
          <Route path="/oncologico-v2/case-manager" element={<CaseManagerHome />} />
          <Route path="/oncologico-v2/case-manager/pazienti" element={<PazientiListPage />} />
          <Route path="/oncologico-v2/case-manager/visite" element={<VisiteAmbulatoriPage />} />
          <Route path="/oncologico-v2/case-manager/ricerca" element={<RicercaPazientePage />} />
          <Route path="/oncologico-v2/calendario" element={<CalendarioPage />} />
          <Route path="/oncologico-v2/paziente/:cf" element={<PazienteDetailPage />} />
          {/* Ambulatori routes */}
          <Route path="/oncologico-v2/ambulatori/cure-simultanee" element={<CureSimultaneePage />} />
          <Route path="/oncologico-v2/ambulatori/oncogeriatria" element={<OncogeriatriaPage />} />
          <Route path="/oncologico-v2/ambulatori/osteoncologia" element={<OsteoncologiaPage />} />
          {/* Paziente routes */}
          <Route path="/paziente" element={<PazienteHome />} />
          <Route path="/paziente/questionario" element={<QuestionnaireCompilation />} />
          <Route path="/paziente/informazioni" element={<InformazioniSupporto />} />
          <Route path="/paziente/esami" element={<EsamiProgrammati />} />
          <Route path="/paziente/questionari" element={<QuestionariDettaglio />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
