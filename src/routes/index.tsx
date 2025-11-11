// ============================================================================
// Entry Point per tutte le rotte
// ============================================================================

import { Route } from "react-router-dom";
import SystemSelector from "@/mmg/pages/SystemSelector";
import Index from "@/mmg/pages/Index";
import Documenti from "@/mmg/pages/Documenti";
import LinkUtili from "@/mmg/pages/LinkUtili";
import NotFound from "@/mmg/pages/NotFound";
import PazienteHome from "@/paziente/pages/PazienteHome";
import QuestionnaireCompilation from "@/paziente/pages/QuestionnaireCompilation";
import InformazioniSupporto from "@/paziente/pages/InformazioniSupporto";
import EsamiProgrammati from "@/paziente/pages/EsamiProgrammati";
import QuestionariDettaglio from "@/paziente/pages/QuestionariDettaglio";
import { OncologicoRoutes } from "./oncologico";

export const AppRoutes = () => (
  <>
    {/* Rotte base */}
    <Route path="/" element={<SystemSelector />} />
    <Route path="/mmg" element={<Index />} />
    <Route path="/mmg/documenti" element={<Documenti />} />
    <Route path="/mmg/link-utili" element={<LinkUtili />} />
    
    {/* Rotte Oncologico */}
    <OncologicoRoutes />
    
    {/* Rotte Paziente */}
    <Route path="/paziente" element={<PazienteHome />} />
    <Route path="/paziente/questionario" element={<QuestionnaireCompilation />} />
    <Route path="/paziente/informazioni" element={<InformazioniSupporto />} />
    <Route path="/paziente/esami" element={<EsamiProgrammati />} />
    <Route path="/paziente/questionari" element={<QuestionariDettaglio />} />
    
    {/* 404 */}
    <Route path="*" element={<NotFound />} />
  </>
);

