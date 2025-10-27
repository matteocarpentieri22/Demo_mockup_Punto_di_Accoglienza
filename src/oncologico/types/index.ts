// ============================================================================
// Tipi per il Modulo Oncologico
// ============================================================================

export type PDTA = 
  | "Prostata"
  | "Polmone"
  | "Colon"
  | "Retto"
  | "Stomaco"
  | "Sarcomi dei tessuti molli"
  | "Melanoma"
  | "Mammella"
  | "Sistema nervoso centrale";

export type Ambulatorio = "Cure Simultanee" | "Oncogeriatria" | "Osteoncologia";

export type Priorita = "alta" | "media" | "bassa";

export type TipoNotifica = "esito_visita" | "discussione_caso" | "esito_esame";

export type TipoVisita = "visita" | "discussione" | "controllo";

// ============================================================================
// Tipi per Notifiche
// ============================================================================

export interface Notifica {
  id: number;
  tipo: TipoNotifica;
  titolo: string;
  descrizione: string;
  data: string;
  ora: string;
  paziente: string;
  cf: string;
  ambulatorio: Ambulatorio;
  medico: string;
  priorita: Priorita;
  letto: boolean;
  archiviata: boolean;
}

// ============================================================================
// Tipi per Paziente
// ============================================================================

export interface Paziente {
  cf: string;
  nome: string;
  cognome: string;
  dataNascita: string;
  pdta: PDTA;
  medicoMittente: string;
  visitaRichiesta: string;
  score: number;
  statoPrenotazione: "Sì" | "No";
}

export interface ScoreClinico {
  tosse: string;
  dolore: string;
  comorbidita: string;
}

// ============================================================================
// Tipi per Visite
// ============================================================================

export interface SlotVisita {
  ora: string;
  paziente: string;
  tipo: string;
  medico: string;
  stato: "confermata" | "libero" | "bloccata";
  cf: string;
}

export interface DatiCalendario {
  [data: string]: {
    [ambulatorio in Ambulatorio]: SlotVisita[];
  };
}

// ============================================================================
// Tipi per Richieste
// ============================================================================

export interface RichiestaPrenotazione {
  id: number;
  data: string;
  paziente: string;
  cf: string;
  pdta: PDTA;
  ambulatorio: Ambulatorio;
  quesitoDiagnostico: string;
  score: number;
  medico: string;
  stato: "pending" | "in_elaborazione" | "completata" | "rifiutata";
  impegnativaPDF?: File | null;
}

// ============================================================================
// Tipi per Form di Richiesta Prenotazione
// ============================================================================

export interface FormDataRichiesta {
  codiceFiscale: string;
  pdta: string;
  quesitoDiagnostico: string;
  ambulatorio: string;
  score: ScoreClinico;
}

// ============================================================================
// Tipi per Blocco Slot
// ============================================================================

export interface BlockSlotData {
  ambulatorio: string;
  ora: string;
  tipo: string;
  paziente: string;
  cf: string;
  medico: string;
  note: string;
}

