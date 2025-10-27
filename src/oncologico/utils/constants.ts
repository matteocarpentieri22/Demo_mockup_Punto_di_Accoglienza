// ============================================================================
// Costanti per il Modulo Oncologico
// ============================================================================

import { PDTA, Ambulatorio } from "@/oncologico/types";

// Lista dei 9 PDTA disponibili
export const PDTA_LIST: PDTA[] = [
  "Prostata",
  "Polmone",
  "Colon",
  "Retto",
  "Stomaco",
  "Sarcomi dei tessuti molli",
  "Melanoma",
  "Mammella",
  "Sistema nervoso centrale"
];

// Lista degli ambulatori disponibili
export const AMBULATORI: Ambulatorio[] = [
  "Cure Simultanee",
  "Oncogeriatria", 
  "Osteoncologia"
];

// Medici disponibili
export const MEDICI = [
  "Dr. Bianchi",
  "Dr. Verdi",
  "Dr. Rossi",
  "Dr. Neri",
  "Dr. Bianco"
];

// Fasce orarie disponibili
export const FASCE_ORARIE = [
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30"
];

// Configurazione priorità
export const PRIORITA_CONFIG = {
  alta: { label: "Alta", color: "bg-red-100 text-red-800 border-red-200" },
  media: { label: "Media", color: "bg-yellow-100 text-yellow-800 border-yellow-200" },
  bassa: { label: "Bassa", color: "bg-green-100 text-green-800 border-green-200" }
};

// Configurazione tipi notifiche
export const TIPI_NOTIFICHE = {
  esito_visita: { label: "Esito Visita", icon: "CheckCircle", color: "text-green-600" },
  discussione_caso: { label: "Discussione Caso", icon: "User", color: "text-blue-600" },
  esito_esame: { label: "Esito Esame", icon: "FileText", color: "text-purple-600" }
};

