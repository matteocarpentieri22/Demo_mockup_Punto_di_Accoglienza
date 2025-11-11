// ============================================================================
// Rotte per il Modulo Oncologico
// ============================================================================

import { Route } from "react-router-dom";
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
import PazienteTriageDetailPage from "@/oncologico/pages/PazienteTriageDetailPage";
import CaseManagerMammellaSarcomiMelanomi from "@/oncologico/pages/CaseManagerMammellaSarcomiMelanomi";
import TriageMammellaSarcomiMelanomi from "@/oncologico/pages/TriageMammellaSarcomiMelanomi";
import ElencoPazientiMammellaSarcomiMelanomi from "@/oncologico/pages/ElencoPazientiMammellaSarcomiMelanomi";
import CalendarioPage from "@/oncologico/pages/CalendarioPage";
import PazienteDetailPage from "@/oncologico/pages/PazienteDetailPage";
import CureSimultaneePage from "@/oncologico/pages/CureSimultaneePage";
import OncogeriatriaPage from "@/oncologico/pages/OncogeriatriaPage";
import OsteoncologiaPage from "@/oncologico/pages/OsteoncologiaPage";

export const OncologicoRoutes = () => (
  <>
    {/* Home Oncologico */}
    <Route path="/oncologico" element={<OncologicoHome />} />
    
    {/* Rotte Oncologo/Radioterapista */}
    <Route path="/oncologico/oncologo" element={<OncologoPage />} />
    <Route path="/oncologico/oncologo/notifiche" element={<NotifichePage />} />
    <Route path="/oncologico/oncologo/richieste" element={<RichiestePage />} />
    <Route path="/oncologico/oncologo/richieste/:id" element={<RichiestaDetailPage />} />
    <Route path="/oncologico/oncologo/paziente/:cf" element={<PazienteDetailOncologo />} />
    
    {/* Rotte Case Manager */}
    <Route path="/oncologico/case-manager" element={<CaseManagerHome />} />
    <Route path="/oncologico/case-manager/pazienti" element={<PazientiListPage />} />
    <Route path="/oncologico/case-manager/visite" element={<VisiteAmbulatoriPage />} />
    <Route path="/oncologico/case-manager/ricerca" element={<RicercaPazientePage />} />
    <Route path="/oncologico/case-manager/aggiunta-paziente" element={<AggiuntaPazientePage />} />
    <Route path="/oncologico/case-manager/dashboard" element={<CaseManagerDashboard />} />
    <Route path="/oncologico/case-manager/elenco-pazienti" element={<ElencoPazientiPage />} />
    <Route path="/oncologico/case-manager/elenco-pazienti/:id" element={<PazienteTriageDetailPage />} />
    <Route path="/oncologico/case-manager/mammella-sarcomi-melanomi" element={<CaseManagerMammellaSarcomiMelanomi />} />
    <Route path="/oncologico/case-manager/mammella-sarcomi-melanomi/triage" element={<TriageMammellaSarcomiMelanomi />} />
    <Route path="/oncologico/case-manager/mammella-sarcomi-melanomi/elenco-pazienti" element={<ElencoPazientiMammellaSarcomiMelanomi />} />
    <Route path="/oncologico/case-manager/mammella-sarcomi-melanomi/elenco-pazienti/:id" element={<PazienteTriageDetailPage />} />
    
    {/* Calendario */}
    <Route path="/oncologico/calendario" element={<CalendarioPage />} />
    
    {/* Dettaglio Paziente */}
    <Route path="/oncologico/paziente/:cf" element={<PazienteDetailPage />} />
    
    {/* Ambulatori */}
    <Route path="/oncologico/ambulatori/cure-simultanee" element={<CureSimultaneePage />} />
    <Route path="/oncologico/ambulatori/oncogeriatria" element={<OncogeriatriaPage />} />
    <Route path="/oncologico/ambulatori/osteoncologia" element={<OsteoncologiaPage />} />
  </>
);

