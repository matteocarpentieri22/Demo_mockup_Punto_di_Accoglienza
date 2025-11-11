import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";
import { Badge } from "@/shared/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/shared/components/ui/dialog";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/components/ui/select";
import { Textarea } from "@/shared/components/ui/textarea";
import { ArrowLeft, Download, Eye, Clock, CheckCircle, AlertCircle, User, Calendar, Plus, Save, Edit, FileText } from "lucide-react";
import CaseManagerNavbar from "@/oncologico/components/layout/CaseManagerNavbar";
import { useNavigate, useParams } from "react-router-dom";

interface StoricoVisita {
  data: string;
  tipo: string;
  medico: string;
  esito: string;
}

interface StoricoScore {
  data: string;
  score: number;
  parametri: {
    tosse: number;
    dolore: number;
    comorbidita: number;
  };
}

interface FormOncologoData {
  ambulatorio: string;
  dataCompilazione: string;
  medicoCompilatore: string;
  // Dati comuni
  quesitoDiagnostico: string;
  // Dati per Cure Simultanee
  psKarnofsky?: string;
  sintomi?: string[];
  sopravvivenza?: string;
  trattamenti?: string;
  tossicita?: string;
  problemiSocio?: string;
  // Dati per Osteoncologia
  uoRiferimento?: string;
  sopravvivenzaOsteo?: string;
  quesitoTeam?: string;
  richiestaPer?: string[];
  psOsteo?: string;
  segniSintomi?: string;
  metastasiViscerali?: string;
  nMetastasiVertebrali?: string;
  sedeMalattiaPrimitiva?: string;
  compressioneMidollare?: boolean;
  fratturaPatologica?: boolean;
  // Dati per Oncogeriatria
  stadio?: string;
  finalitaTrattamento?: string;
  ecogPS?: string;
  punteggioG8?: string;
  esitoVGM?: string;
  propostaTerapeutica?: string;
  prognosiOncologica?: string;
  finalitaTerapiaOncologica?: string[];
  tossicitaEmatologica?: string;
  tossicitaExtraEmatologica?: string;
  quesitiGeriatra?: string[];
}

interface Patient {
  id: number;
  cognome: string;
  nome: string;
  cf: string;
  pdta: string;
  visitaRichiesta: string;
  medicoMittente: string;
  quesitoDiagnostico?: string;
  dataRichiesta?: string;
  score: number;
  slotPrenotato: boolean;
  dataPrenotazione: string | null;
  oraPrenotazione: string | null;
  ambulatorio: string | null;
  medicoPrenotazione?: string;
  comorbidita: string[];
  residenza?: string;
  cellulare?: string;
  email?: string;
  storicoVisite: StoricoVisita[];
  storicoScore: StoricoScore[];
  formOncologo?: FormOncologoData;
}

interface Verbale {
  id: number;
  patientId: number;
  data: string;
  tipo: string;
  medico: string;
  verbale: string;
  note: string;
  ambulatorio: string;
  ora: string;
  stato: string;
  dataCreazione: string;
}

// Lista dei 9 PDTA disponibili (stessa lista usata negli altri moduli)
const PDTA_LIST = [
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

const PazienteDetailPage = () => {
  const navigate = useNavigate();
  const { cf } = useParams<{ cf: string }>();
  const [showCupDialog, setShowCupDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showVerbaleDialog, setShowVerbaleDialog] = useState(false);
  const [cupData, setCupData] = useState({
    data: "",
    ora: "",
    ambulatorio: "",
    medico: "",
    note: ""
  });
  const [editData, setEditData] = useState({
    data: "",
    ora: "",
    ambulatorio: "",
    medico: "",
    note: ""
  });
  const [verbaleData, setVerbaleData] = useState({
    visitaId: "",
    verbale: "",
    note: ""
  });
  const [verbaliAggiunti, setVerbaliAggiunti] = useState<Verbale[]>([]);

  // Mock data pazienti (stesso del CaseManagerPage)
  const [patients] = useState<Patient[]>([
    {
      id: 1,
      cognome: "Rossi",
      nome: "Mario",
      cf: "RSSMRA80A01H501U",
      pdta: "Polmone",
      visitaRichiesta: "Oncologica",
      medicoMittente: "Dr. Bianchi",
      quesitoDiagnostico: "Valutazione per sospetta neoplasia polmonare con nodulo di 2.5 cm al lobo superiore destro. Richiesta stadiazione completa e valutazione per trattamento chirurgico.",
      dataRichiesta: "2024-01-10",
      score: 8,
      slotPrenotato: true,
      dataPrenotazione: "2024-01-20",
      oraPrenotazione: "09:30",
      ambulatorio: "Cure Simultanee",
      comorbidita: ["Diabete tipo 2", "Ipertensione"],
      residenza: "Via Roma 123, 35100 Padova",
      cellulare: "+39 333 1234567",
      email: "mario.rossi@email.com",
      storicoVisite: [
        { data: "2024-01-10", tipo: "Prima visita", medico: "Dr. Bianchi", esito: "Diagnosi confermata" },
        { data: "2023-12-15", tipo: "Visita controllo", medico: "Dr. Verdi", esito: "Stabile" }
      ],
      storicoScore: [
        { data: "2024-01-15", score: 8, parametri: { tosse: 3, dolore: 3, comorbidita: 2 } },
        { data: "2023-12-15", score: 6, parametri: { tosse: 2, dolore: 2, comorbidita: 2 } }
      ],
      formOncologo: {
        ambulatorio: "Cure Simultanee",
        dataCompilazione: "2024-01-15",
        medicoCompilatore: "Dr. Carlo Bianchi - Oncologo",
        quesitoDiagnostico: "Valutazione per sospetta neoplasia polmonare con nodulo di 2.5 cm al lobo superiore destro. Richiesta stadiazione completa e valutazione per trattamento chirurgico.",
        psKarnofsky: "50-60",
        sintomi: ["Dolore", "Dispnea", "Tosse persistente"],
        sopravvivenza: "6-12 mesi",
        trattamenti: "No",
        tossicita: "Lieve (anemia)",
        problemiSocio: "Rete famigliare scarsa"
      }
    },
    {
      id: 2,
      cognome: "Bianchi",
      nome: "Anna",
      cf: "BNCNNA75B02H501V",
      pdta: "Mammella",
      visitaRichiesta: "Radioterapia",
      medicoMittente: "Dr. Verdi",
      quesitoDiagnostico: "Paziente con carcinoma mammario infiltrante T2N1M0. Richiesta valutazione per radioterapia adiuvante post-chirurgica e follow-up oncologico.",
      dataRichiesta: "2024-01-18",
      score: 7,
      slotPrenotato: false,
      dataPrenotazione: null,
      oraPrenotazione: null,
      ambulatorio: null,
      comorbidita: ["Osteoporosi"],
      residenza: "Via Verdi 45, 35100 Padova",
      cellulare: "+39 340 9876543",
      email: "anna.bianchi@email.com",
      storicoVisite: [
        { data: "2024-01-12", tipo: "Visita oncologica", medico: "Dr. Verdi", esito: "Programmata radioterapia" }
      ],
      storicoScore: [
        { data: "2024-01-12", score: 7, parametri: { tosse: 1, dolore: 3, comorbidita: 3 } }
      ],
      formOncologo: {
        ambulatorio: "Cure Simultanee",
        dataCompilazione: "2024-01-12",
        medicoCompilatore: "Dr. Carlo Bianchi - Oncologo",
        quesitoDiagnostico: "Paziente con carcinoma mammario infiltrante T2N1M0. Richiesta valutazione per radioterapia adiuvante post-chirurgica e follow-up oncologico.",
        psKarnofsky: ">70",
        sintomi: ["Dolore"],
        sopravvivenza: "≥ 12 mesi",
        trattamenti: "Sì",
        tossicita: "Nessuna",
        problemiSocio: "Adeguato supporto"
      }
    },
    {
      id: 3,
      cognome: "Verdi",
      nome: "Giuseppe",
      cf: "VRDGPP70C03H501W",
      pdta: "Prostata",
      visitaRichiesta: "Oncogeriatrica",
      medicoMittente: "Dr. Rossi",
      quesitoDiagnostico: "Paziente anziano con carcinoma prostatico avanzato. Richiesta valutazione geriatrica per ottimizzazione del trattamento e gestione delle comorbidità.",
      dataRichiesta: "2024-01-22",
      score: 6,
      slotPrenotato: true,
      dataPrenotazione: "2024-01-18",
      oraPrenotazione: "14:00",
      ambulatorio: "Oncogeriatria",
      comorbidita: ["Cardiopatia ischemica", "Diabete tipo 2"],
      residenza: "Via Garibaldi 78, 35100 Padova",
      cellulare: "+39 347 5551234",
      email: "giuseppe.verdi@email.com",
      storicoVisite: [
        { data: "2024-01-08", tipo: "Visita geriatrica", medico: "Dr. Rossi", esito: "Valutazione completata" },
        { data: "2023-11-20", tipo: "Prima visita", medico: "Dr. Bianchi", esito: "Diagnosi iniziale" }
      ],
      storicoScore: [
        { data: "2024-01-08", score: 6, parametri: { tosse: 1, dolore: 2, comorbidita: 3 } },
        { data: "2023-11-20", score: 5, parametri: { tosse: 1, dolore: 1, comorbidita: 3 } }
      ],
      formOncologo: {
        ambulatorio: "Oncogeriatria",
        dataCompilazione: "2024-01-08",
        medicoCompilatore: "Dr. Carlo Bianchi - Oncologo",
        quesitoDiagnostico: "Paziente anziano con carcinoma prostatico avanzato. Richiesta valutazione geriatrica per ottimizzazione del trattamento e gestione delle comorbidità.",
        stadio: "avanzato/metastatico",
        finalitaTrattamento: "pallativo",
        ecogPS: "2",
        punteggioG8: "12",
        esitoVGM: "vulnerabile",
        propostaTerapeutica: "terapia standard - dosi ridotte (eventualmente da aumentare)",
        prognosiOncologica: "6-12 mesi",
        finalitaTerapiaOncologica: ["Miglioramento sintomi / qualità di vita"],
        tossicitaEmatologica: "Lieve",
        tossicitaExtraEmatologica: "Nessuna",
        quesitiGeriatra: ["Valutazione fragilità", "Gestione polifarmacoterapia"]
      }
    },
    {
      id: 4,
      cognome: "Neri",
      nome: "Francesca",
      cf: "NRIFNC85D04H501X",
      pdta: "Sistema nervoso centrale",
      visitaRichiesta: "Osteoncologica",
      medicoMittente: "Dr. Bianchi",
      quesitoDiagnostico: "Paziente con metastasi ossee da carcinoma mammario. Richiesta valutazione per terapia sistemica e gestione del dolore osseo.",
      dataRichiesta: "2024-01-12",
      score: 5,
      slotPrenotato: false,
      dataPrenotazione: null,
      oraPrenotazione: null,
      ambulatorio: null,
      comorbidita: ["Epilessia"],
      residenza: "Corso Milano 12, 35100 Padova",
      cellulare: "+39 339 8889999",
      email: "francesca.neri@email.com",
      storicoVisite: [
        { data: "2024-01-14", tipo: "Visita neurologica", medico: "Dr. Bianchi", esito: "In attesa di esami" }
      ],
      storicoScore: [
        { data: "2024-01-14", score: 5, parametri: { tosse: 2, dolore: 1, comorbidita: 2 } }
      ],
      formOncologo: {
        ambulatorio: "Osteoncologia",
        dataCompilazione: "2024-01-14",
        medicoCompilatore: "Dr. Carlo Bianchi - Oncologo",
        quesitoDiagnostico: "Paziente con metastasi ossee da carcinoma mammario. Richiesta valutazione per terapia sistemica e gestione del dolore osseo.",
        uoRiferimento: "UOC Oncologia 1",
        sopravvivenzaOsteo: "6-12 mesi",
        quesitoTeam: "Valutazione per terapia sistemica e gestione del dolore osseo. Discussione multidisciplinare per strategia terapeutica personalizzata.",
        richiestaPer: ["visita", "discussione"],
        psOsteo: "80",
        segniSintomi: "Dolore scheletrico",
        metastasiViscerali: "Sì",
        nMetastasiVertebrali: "3-5",
        sedeMalattiaPrimitiva: "Mammella",
        compressioneMidollare: false,
        fratturaPatologica: false
      }
    },
    {
      id: 5,
      cognome: "Ferrari",
      nome: "Luigi",
      cf: "FRRLGI65E05H501Y",
      pdta: "Colon",
      visitaRichiesta: "Visita",
      medicoMittente: "Dr. Verdi",
      quesitoDiagnostico: "Paziente con carcinoma del colon-retto operato. Richiesta follow-up oncologico e valutazione per terapia adiuvante.",
      dataRichiesta: "2024-01-25",
      score: 4,
      slotPrenotato: true,
      dataPrenotazione: "2024-01-22",
      oraPrenotazione: "10:00",
      ambulatorio: "Osteoncologia",
      comorbidita: ["Diverticolosi"],
      residenza: "Via Dante 34, 35100 Padova",
      cellulare: "+39 335 7778888",
      email: "luigi.ferrari@email.com",
      storicoVisite: [
        { data: "2024-01-16", tipo: "Visita gastroenterologica", medico: "Dr. Verdi", esito: "Follow-up programmato" }
      ],
      storicoScore: [
        { data: "2024-01-16", score: 4, parametri: { tosse: 1, dolore: 1, comorbidita: 2 } }
      ],
      formOncologo: {
        ambulatorio: "Osteoncologia",
        dataCompilazione: "2024-01-16",
        medicoCompilatore: "Dr. Carlo Bianchi - Oncologo",
        quesitoDiagnostico: "Paziente con carcinoma del colon-retto operato. Richiesta follow-up oncologico e valutazione per terapia adiuvante.",
        uoRiferimento: "UOC Oncologia 2",
        sopravvivenzaOsteo: "≥12 mesi",
        quesitoTeam: "Follow-up post-intervento. Valutazione per terapia adiuvante.",
        richiestaPer: ["visita"],
        psOsteo: "100-90",
        segniSintomi: "Nessuno",
        metastasiViscerali: "No",
        nMetastasiVertebrali: "0",
        sedeMalattiaPrimitiva: "Colon-retto",
        compressioneMidollare: false,
        fratturaPatologica: false
      }
    },
    {
      id: 6,
      cognome: "Romano",
      nome: "Maria",
      cf: "RSSMRA70F06H501Z",
      pdta: "Melanoma",
      visitaRichiesta: "Discussione",
      medicoMittente: "Dr. Bianchi",
      quesitoDiagnostico: "Paziente con melanoma cutaneo in stadio avanzato. Richiesta discussione multidisciplinare per strategia terapeutica personalizzata.",
      dataRichiesta: "2024-01-16",
      score: 3,
      slotPrenotato: false,
      dataPrenotazione: null,
      oraPrenotazione: null,
      ambulatorio: null,
      comorbidita: [],
      residenza: "Piazza Duomo 5, 35100 Padova",
      cellulare: "+39 366 4445555",
      email: "maria.romano@email.com",
      storicoVisite: [
        { data: "2024-01-18", tipo: "Visita dermatologica", medico: "Dr. Bianchi", esito: "Discussione caso" }
      ],
      storicoScore: [
        { data: "2024-01-18", score: 3, parametri: { tosse: 1, dolore: 1, comorbidita: 1 } }
      ],
      formOncologo: {
        ambulatorio: "Cure Simultanee",
        dataCompilazione: "2024-01-18",
        medicoCompilatore: "Dr. Carlo Bianchi - Oncologo",
        quesitoDiagnostico: "Paziente con melanoma cutaneo in stadio avanzato. Richiesta discussione multidisciplinare per strategia terapeutica personalizzata.",
        psKarnofsky: ">70",
        sintomi: ["Dolore"],
        sopravvivenza: "≥ 12 mesi",
        trattamenti: "Sì",
        tossicita: "Nessuna",
        problemiSocio: "Adeguato supporto"
      }
    }
  ]);

  // Mock data per esiti esami e verbali
  const getExamResults = (patientId: number) => {
    const examResults = {
      1: [ // Mario Rossi
        { id: 1, tipo: "TC Torace", data: "2024-01-12", esito: "Lesione polmonare destra confermata", stato: "Completato" },
        { id: 2, tipo: "Biopsia", data: "2024-01-14", esito: "Adenocarcinoma polmonare", stato: "Completato" },
        { id: 3, tipo: "PET-CT", data: "2024-01-20", esito: "In corso", stato: "Programmato" }
      ],
      2: [ // Anna Bianchi
        { id: 1, tipo: "Mammografia", data: "2024-01-10", esito: "Lesione sospetta confermata", stato: "Completato" },
        { id: 2, tipo: "Biopsia mammaria", data: "2024-01-12", esito: "Carcinoma duttale invasivo", stato: "Completato" },
        { id: 3, tipo: "RM Mammella", data: "2024-01-25", esito: "In corso", stato: "Programmato" }
      ],
      3: [ // Giuseppe Verdi
        { id: 1, tipo: "PSA", data: "2024-01-08", esito: "Valore elevato (8.5 ng/ml)", stato: "Completato" },
        { id: 2, tipo: "Biopsia prostatica", data: "2024-01-15", esito: "In corso", stato: "Programmato" }
      ],
      4: [ // Francesca Neri
        { id: 1, tipo: "RM Encefalo", data: "2024-01-14", esito: "Lesione cerebrale sospetta", stato: "Completato" },
        { id: 2, tipo: "Biopsia cerebrale", data: "2024-01-22", esito: "In corso", stato: "Programmato" }
      ],
      5: [ // Luigi Ferrari
        { id: 1, tipo: "Colonscopia", data: "2024-01-16", esito: "Polipo maligno confermato", stato: "Completato" },
        { id: 2, tipo: "TC Addome", data: "2024-01-20", esito: "In corso", stato: "Programmato" }
      ],
      6: [ // Maria Romano
        { id: 1, tipo: "Dermoscopia", data: "2024-01-18", esito: "Melanoma sospetto", stato: "Completato" },
        { id: 2, tipo: "Biopsia cutanea", data: "2024-01-25", esito: "In corso", stato: "Programmato" }
      ],
      999: [ // Paziente Demo
        { id: 1, tipo: "TC Torace", data: "2024-01-18", esito: "Lesione polmonare sospetta", stato: "Completato" },
        { id: 2, tipo: "Biopsia", data: "2024-01-22", esito: "In corso", stato: "Programmato" },
        { id: 3, tipo: "Esami ematochimici", data: "2024-01-20", esito: "Valori nella norma", stato: "Completato" }
      ]
    };
    return examResults[patientId as keyof typeof examResults] || [];
  };

  // Mock data per visite esistenti (per selezione verbali)
  const getExistingVisits = (patientId: number) => {
    const existingVisits = {
      1: [ // Mario Rossi
        { id: 1, data: "2024-01-10", ora: "09:00", tipo: "Prima visita oncologica", ambulatorio: "Cure Simultanee", medico: "Dr. Bianchi", stato: "Completata" },
        { id: 2, data: "2023-12-15", ora: "10:30", tipo: "Visita controllo", ambulatorio: "Oncogeriatria", medico: "Dr. Verdi", stato: "Completata" },
        { id: 3, data: "2024-02-15", ora: "14:00", tipo: "Visita follow-up", ambulatorio: "Cure Simultanee", medico: "Dr. Bianchi", stato: "Programmata" }
      ],
      2: [ // Anna Bianchi
        { id: 1, data: "2024-01-12", ora: "11:00", tipo: "Visita oncologica", ambulatorio: "Osteoncologia", medico: "Dr. Verdi", stato: "Completata" },
        { id: 2, data: "2024-02-20", ora: "15:30", tipo: "Controllo post-trattamento", ambulatorio: "Osteoncologia", medico: "Dr. Verdi", stato: "Programmata" }
      ],
      3: [ // Giuseppe Verdi
        { id: 1, data: "2024-01-08", ora: "08:30", tipo: "Visita geriatrica", ambulatorio: "Oncogeriatria", medico: "Dr. Rossi", stato: "Completata" },
        { id: 2, data: "2023-11-20", ora: "16:00", tipo: "Prima visita", ambulatorio: "Cure Simultanee", medico: "Dr. Bianchi", stato: "Completata" }
      ],
      4: [ // Francesca Neri
        { id: 1, data: "2024-01-14", ora: "13:00", tipo: "Visita neurologica", ambulatorio: "Cure Simultanee", medico: "Dr. Bianchi", stato: "Completata" }
      ],
      5: [ // Luigi Ferrari
        { id: 1, data: "2024-01-16", ora: "09:30", tipo: "Visita gastroenterologica", ambulatorio: "Osteoncologia", medico: "Dr. Verdi", stato: "Completata" }
      ],
      6: [ // Maria Romano
        { id: 1, data: "2024-01-18", ora: "12:00", tipo: "Visita dermatologica", ambulatorio: "Cure Simultanee", medico: "Dr. Bianchi", stato: "Completata" }
      ],
      999: [ // Paziente Demo
        { id: 1, data: "2024-01-20", ora: "10:00", tipo: "Prima visita oncologica", ambulatorio: "Cure Simultanee", medico: "Dr. Bianchi", stato: "Completata" },
        { id: 2, data: "2024-02-10", ora: "14:30", tipo: "Visita controllo", ambulatorio: "Oncogeriatria", medico: "Dr. Rossi", stato: "Programmata" }
      ]
    };
    return existingVisits[patientId as keyof typeof existingVisits] || [];
  };

  // Mock data per verbali visite
  const getVisitReports = (patientId: number) => {
    const visitReports = {
      1: [ // Mario Rossi
        { id: 1, data: "2024-01-10", tipo: "Prima visita oncologica", medico: "Dr. Bianchi", verbale: "Paziente presenta tosse persistente e dolore toracico. Programmati esami di stadiazione." },
        { id: 2, data: "2023-12-15", tipo: "Visita controllo", medico: "Dr. Verdi", verbale: "Paziente stabile, continuare follow-up trimestrale." }
      ],
      2: [ // Anna Bianchi
        { id: 1, data: "2024-01-12", tipo: "Visita oncologica", medico: "Dr. Verdi", verbale: "Diagnosi di carcinoma mammario confermata. Programmata valutazione per radioterapia." }
      ],
      3: [ // Giuseppe Verdi
        { id: 1, data: "2024-01-08", tipo: "Visita geriatrica", medico: "Dr. Rossi", verbale: "Paziente anziano con multiple comorbidità. Valutazione oncologica in corso." },
        { id: 2, data: "2023-11-20", tipo: "Prima visita", medico: "Dr. Bianchi", verbale: "Sospetto carcinoma prostatico. Richiesti esami diagnostici." }
      ],
      4: [ // Francesca Neri
        { id: 1, data: "2024-01-14", tipo: "Visita neurologica", medico: "Dr. Bianchi", verbale: "Paziente con storia di epilessia presenta nuovi sintomi neurologici. Richiesta RM encefalo." }
      ],
      5: [ // Luigi Ferrari
        { id: 1, data: "2024-01-16", tipo: "Visita gastroenterologica", medico: "Dr. Verdi", verbale: "Follow-up post-intervento. Controllo programmato." }
      ],
      6: [ // Maria Romano
        { id: 1, data: "2024-01-18", tipo: "Visita dermatologica", medico: "Dr. Bianchi", verbale: "Lesione cutanea sospetta. Richiesta biopsia per conferma diagnostica." }
      ],
      999: [ // Paziente Demo
        { id: 1, data: "2024-01-20", tipo: "Prima visita oncologica", medico: "Dr. Bianchi", verbale: "Paziente presenta sintomi respiratori. Programmati esami diagnostici per valutazione." },
        { id: 2, data: "2024-01-15", tipo: "Visita controllo", medico: "Dr. Verdi", verbale: "Follow-up post-diagnosi. Paziente collaborativo e motivato al trattamento." }
      ]
    };
    
    // Combina i verbali esistenti con quelli aggiunti dinamicamente
    const verbaliEsistenti = visitReports[patientId as keyof typeof visitReports] || [];
    const verbaliDinamici = verbaliAggiunti.filter(v => v.patientId === patientId);
    
    return [...verbaliEsistenti, ...verbaliDinamici];
  };

  // Trova il paziente o genera uno demo
  const findPatient = () => {
    if (!cf) return null;
    
    const patient = patients.find(p => p.cf.toLowerCase().includes(cf.toLowerCase()));
    if (patient) {
      return patient;
    } else {
      // Per la demo, generiamo un paziente mock se non trovato
      return {
        id: 999,
        cognome: "Demo",
        nome: "Paziente",
        cf: cf.toUpperCase(),
        pdta: "Polmone",
        visitaRichiesta: "Visita Oncologica",
        medicoMittente: "Dr. Bianchi",
        dataRichiesta: "2024-01-20",
        score: Math.floor(Math.random() * 6) + 3, // Score tra 3 e 8
        slotPrenotato: Math.random() > 0.5,
        dataPrenotazione: Math.random() > 0.5 ? "2024-01-25" : null,
        oraPrenotazione: Math.random() > 0.5 ? "10:30" : null,
        ambulatorio: Math.random() > 0.5 ? "Cure Simultanee" : null,
        comorbidita: ["Diabete tipo 2", "Ipertensione"],
        residenza: "Via Demo 99, 35100 Padova",
        cellulare: "+39 333 9998888",
        email: "paziente.demo@email.com",
        storicoVisite: [
          { data: "2024-01-20", tipo: "Prima visita", medico: "Dr. Bianchi", esito: "Diagnosi in corso" },
          { data: "2024-01-15", tipo: "Visita controllo", medico: "Dr. Verdi", esito: "Stabile" }
        ],
        storicoScore: [
          { data: "2024-01-20", score: Math.floor(Math.random() * 6) + 3, parametri: { tosse: Math.floor(Math.random() * 3) + 1, dolore: Math.floor(Math.random() * 3) + 1, comorbidita: Math.floor(Math.random() * 3) + 1 } },
          { data: "2024-01-15", score: Math.floor(Math.random() * 6) + 3, parametri: { tosse: Math.floor(Math.random() * 3) + 1, dolore: Math.floor(Math.random() * 3) + 1, comorbidita: Math.floor(Math.random() * 3) + 1 } }
        ],
        formOncologo: {
          ambulatorio: "Cure Simultanee",
          dataCompilazione: "2024-01-20",
          medicoCompilatore: "Dr. Carlo Bianchi - Oncologo",
          quesitoDiagnostico: "Paziente presenta sintomi respiratori persistenti. Richiesta valutazione per sospetta neoplasia polmonare e stadiazione completa.",
          psKarnofsky: ">70",
          sintomi: ["Tosse persistente", "Dispnea"],
          sopravvivenza: "≥ 12 mesi",
          trattamenti: "Sì",
          tossicita: "Nessuna",
          problemiSocio: "Adeguato supporto"
        }
      };
    }
  };

  const patient = findPatient();

  const getScoreColor = (score: number) => {
    if (score >= 7) return "bg-red-100 text-red-800";
    if (score >= 5) return "bg-yellow-100 text-yellow-800";
    return "bg-green-100 text-green-800";
  };

  // Storico visite per ambulatori (mock demo)
  type FormOncologoVisita = {
    // Dati comuni
    quesitoDiagnostico: string;
    // Dati per Cure Simultanee
    psKarnofsky?: string;
    sintomi?: string[];
    sopravvivenza?: string;
    trattamenti?: string;
    tossicita?: string;
    problemiSocio?: string;
    // Dati per Osteoncologia
    uoRiferimento?: string;
    altroUo?: string;
    sopravvivenzaOsteo?: string;
    quesitoTeam?: string;
    richiestaPer?: string[];
    psOsteo?: string;
    segniSintomi?: string;
    metastasiViscerali?: string;
    nMetastasiVertebrali?: string;
    sedeMalattiaPrimitiva?: string;
    compressioneMidollare?: boolean;
    fratturaPatologica?: boolean;
    // Dati per Oncogeriatria
    stadio?: string;
    finalitaTrattamento?: string;
    ecogPS?: string;
    punteggioG8?: string;
    esitoVGM?: string;
    propostaTerapeutica?: string;
    prognosiOncologica?: string;
    finalitaTerapiaOncologica?: string[];
    tossicitaEmatologica?: string;
    tossicitaExtraEmatologica?: string;
    quesitiGeriatra?: string[];
    altroQuesitoGeriatra?: string;
  };

  type VisitaAmbulatorio = {
    id: number;
    ambulatorio: string;
    tipo: string;
    codiceRicetta: string;
    dataRichiesta: string;
    dataVisita?: string;
    stato: "Disdetta" | "Completata" | "Prenotata" | "Da prenotare";
    score?: number;
    dettagliRichiesta?: string;
    dettagliRichiestaOncologo?: string;
    formOncologo?: FormOncologoVisita;
    note?: string;
    impegnativaPDF?: string;
  };

  const getAmbulatorioVisits = (patientId: number): VisitaAmbulatorio[] => {
    const visits: Record<number, VisitaAmbulatorio[]> = {
      1: [
        { 
          id: 1, 
          ambulatorio: "Cure Simultanee", 
          tipo: "visita", 
          codiceRicetta: "0123456789", 
          dataRichiesta: "2024-01-10", 
          dataVisita: "2024-01-10",
          stato: "Completata", 
          score: 8,
          dettagliRichiesta: "Richiesta di valutazione oncologica per paziente con sospetta neoplasia polmonare. Il paziente presenta nodulo di 2.5 cm al lobo superiore destro riscontrato durante TC torace di routine. Richiesta stadiazione completa e valutazione per trattamento chirurgico.",
          dettagliRichiestaOncologo: "Valutazione per sospetta neoplasia polmonare. Richiesta stadiazione completa e valutazione per trattamento chirurgico.",
          formOncologo: {
            quesitoDiagnostico: "Valutazione per sospetta neoplasia polmonare con nodulo di 2.5 cm al lobo superiore destro. Richiesta stadiazione completa e valutazione per trattamento chirurgico.",
            psKarnofsky: "50-60",
            sintomi: ["Dolore", "Dispnea", "Tosse persistente"],
            sopravvivenza: "6-12 mesi",
            trattamenti: "No",
            tossicita: "Lieve (anemia)",
            problemiSocio: "Rete famigliare scarsa"
          },
          note: "Follow-up tra 3 mesi",
          impegnativaPDF: "impegnativa_mario_rossi_2024-01-10.pdf"
        },
        { 
          id: 2, 
          ambulatorio: "Oncogeriatria", 
          tipo: "visita", 
          codiceRicetta: "9876543210", 
          dataRichiesta: "2024-01-18", 
          dataVisita: "2024-01-25",
          stato: "Prenotata", 
          score: 6,
          dettagliRichiesta: "Richiesta controllo post-trattamento per paziente anziano. Valutazione tollerabilità terapia oncologica in corso e gestione effetti collaterali. Necessaria valutazione geriatrica integrata.",
          dettagliRichiestaOncologo: "Controllo post-trattamento. Valutazione tollerabilità terapia e gestione effetti collaterali.",
          formOncologo: {
            quesitoDiagnostico: "Paziente anziano con carcinoma prostatico avanzato. Richiesta valutazione geriatrica per ottimizzazione del trattamento e gestione delle comorbidità.",
            stadio: "avanzato/metastatico",
            finalitaTrattamento: "pallativo",
            ecogPS: "2",
            punteggioG8: "12",
            esitoVGM: "vulnerabile",
            propostaTerapeutica: "terapia standard - dosi ridotte (eventualmente da aumentare)",
            prognosiOncologica: "6-12 mesi",
            finalitaTerapiaOncologica: ["Miglioramento sintomi / qualità di vita"],
            tossicitaEmatologica: "Lieve",
            tossicitaExtraEmatologica: "Nessuna",
            quesitiGeriatra: ["Valutazione fragilità", "Gestione polifarmacoterapia"]
          },
          note: "Portare esami recenti",
          impegnativaPDF: "impegnativa_mario_rossi_2024-01-18.pdf"
        },
        { 
          id: 3, 
          ambulatorio: "Osteoncologia", 
          tipo: "discussione", 
          codiceRicetta: "2233445566", 
          dataRichiesta: "2024-01-22", 
          stato: "Da prenotare",
          score: 7,
          dettagliRichiesta: "Richiesta discussione multidisciplinare per paziente con metastasi ossee multiple. Necessaria valutazione condivisa tra oncologo, radioterapista e ortopedico per definire strategia terapeutica personalizzata.",
          dettagliRichiestaOncologo: "Discussione multidisciplinare per strategia terapeutica personalizzata.",
          formOncologo: {
            quesitoDiagnostico: "Paziente con metastasi ossee da carcinoma mammario. Richiesta valutazione per terapia sistemica e gestione del dolore osseo.",
            uoRiferimento: "UOC Oncologia 1",
            sopravvivenzaOsteo: "6-12 mesi",
            quesitoTeam: "Valutazione per terapia sistemica e gestione del dolore osseo. Discussione multidisciplinare per strategia terapeutica personalizzata.",
            richiestaPer: ["visita", "discussione"],
            psOsteo: "80",
            segniSintomi: "Dolore scheletrico",
            metastasiViscerali: "Sì",
            nMetastasiVertebrali: "3-5",
            sedeMalattiaPrimitiva: "Mammella",
            compressioneMidollare: false,
            fratturaPatologica: false
          },
          impegnativaPDF: "impegnativa_mario_rossi_2024-01-22.pdf"
        }
      ],
      2: [
        { 
          id: 1, 
          ambulatorio: "Oncogeriatria", 
          tipo: "visita", 
          codiceRicetta: "1111222233", 
          dataRichiesta: "2024-01-12", 
          stato: "Disdetta", 
          score: 7,
          dettagliRichiesta: "Richiesta valutazione per radioterapia adiuvante post-chirurgica. Paziente operata per carcinoma mammario, necessaria valutazione geriatrica per ottimizzazione trattamento.",
          dettagliRichiestaOncologo: "Valutazione per radioterapia adiuvante post-chirurgica.",
          formOncologo: {
            quesitoDiagnostico: "Paziente operata per carcinoma mammario. Richiesta valutazione per radioterapia adiuvante post-chirurgica e valutazione geriatrica.",
            stadio: "radicalmente operato",
            finalitaTrattamento: "(neo) adiuvante",
            ecogPS: "1",
            punteggioG8: "14",
            esitoVGM: "fit",
            propostaTerapeutica: "terapia standard - dosi standard",
            prognosiOncologica: "≥ 12 mesi",
            finalitaTerapiaOncologica: ["Aumento OS / PFS"],
            tossicitaEmatologica: "Nessuna",
            tossicitaExtraEmatologica: "Nessuna",
            quesitiGeriatra: ["Valutazione fragilità"]
          },
          note: "Riprogrammare",
          impegnativaPDF: "impegnativa_anna_bianchi_2024-01-12.pdf"
        }
      ],
      3: [
        { 
          id: 1, 
          ambulatorio: "Cure Simultanee", 
          tipo: "visita", 
          codiceRicetta: "5566778899", 
          dataRichiesta: "2024-01-08", 
          dataVisita: "2024-01-08",
          stato: "Completata",
          score: 6,
          dettagliRichiesta: "Richiesta follow-up oncologico per paziente anziano con multiple comorbidità. Valutazione stato generale e adeguamento terapia.",
          dettagliRichiestaOncologo: "Follow-up oncologico per paziente anziano con multiple comorbidità.",
          formOncologo: {
            quesitoDiagnostico: "Follow-up oncologico per paziente anziano con multiple comorbidità. Valutazione stato generale e adeguamento terapia.",
            psKarnofsky: ">70",
            sintomi: ["Dolore"],
            sopravvivenza: "≥ 12 mesi",
            trattamenti: "Sì",
            tossicita: "Nessuna",
            problemiSocio: "Adeguato supporto"
          },
          impegnativaPDF: "impegnativa_giuseppe_verdi_2024-01-08.pdf"
        }
      ],
      4: [
        { 
          id: 1, 
          ambulatorio: "Osteoncologia", 
          tipo: "visita", 
          codiceRicetta: "0099887766", 
          dataRichiesta: "2024-01-14", 
          dataVisita: "2024-01-20",
          stato: "Prenotata",
          score: 5,
          dettagliRichiesta: "Richiesta valutazione per terapia sistemica e gestione del dolore osseo. Paziente con metastasi ossee da carcinoma mammario.",
          dettagliRichiestaOncologo: "Valutazione per terapia sistemica e gestione del dolore osseo.",
          formOncologo: {
            quesitoDiagnostico: "Paziente con metastasi ossee da carcinoma mammario. Richiesta valutazione per terapia sistemica e gestione del dolore osseo.",
            uoRiferimento: "UOC Oncologia 1",
            sopravvivenzaOsteo: "6-12 mesi",
            quesitoTeam: "Valutazione per terapia sistemica e gestione del dolore osseo.",
            richiestaPer: ["visita"],
            psOsteo: "80",
            segniSintomi: "Dolore scheletrico",
            metastasiViscerali: "Sì",
            nMetastasiVertebrali: "1-2",
            sedeMalattiaPrimitiva: "Mammella",
            compressioneMidollare: false,
            fratturaPatologica: false
          },
          impegnativaPDF: "impegnativa_francesca_neri_2024-01-14.pdf"
        },
        { 
          id: 2, 
          ambulatorio: "Osteoncologia", 
          tipo: "discussione", 
          codiceRicetta: "1122334455", 
          dataRichiesta: "2024-01-25", 
          stato: "Da prenotare",
          score: 6,
          dettagliRichiesta: "Richiesta discussione multidisciplinare per valutazione strategia terapeutica e gestione del dolore. Coinvolgimento team multidisciplinare.",
          dettagliRichiestaOncologo: "Discussione multidisciplinare per valutazione strategia terapeutica e gestione del dolore.",
          formOncologo: {
            quesitoDiagnostico: "Richiesta discussione multidisciplinare per valutazione strategia terapeutica e gestione del dolore.",
            uoRiferimento: "UOC Oncologia 2",
            sopravvivenzaOsteo: "≥12 mesi",
            quesitoTeam: "Discussione multidisciplinare per valutazione strategia terapeutica e gestione del dolore. Coinvolgimento team multidisciplinare.",
            richiestaPer: ["discussione"],
            psOsteo: "100-90",
            segniSintomi: "Nessuno",
            metastasiViscerali: "No",
            nMetastasiVertebrali: "0",
            sedeMalattiaPrimitiva: "Mammella",
            compressioneMidollare: false,
            fratturaPatologica: false
          },
          impegnativaPDF: "impegnativa_francesca_neri_2024-01-25.pdf"
        }
      ],
      5: [
        { 
          id: 1, 
          ambulatorio: "Osteoncologia", 
          tipo: "visita", 
          codiceRicetta: "3344556677", 
          dataRichiesta: "2024-01-16", 
          dataVisita: "2024-01-16",
          stato: "Completata",
          score: 4,
          dettagliRichiesta: "Richiesta follow-up post-intervento. Controllo programmato per valutazione esito chirurgico e programmazione eventuale terapia adiuvante.",
          dettagliRichiestaOncologo: "Follow-up post-intervento. Controllo programmato.",
          formOncologo: {
            quesitoDiagnostico: "Follow-up post-intervento. Controllo programmato per valutazione esito chirurgico e programmazione eventuale terapia adiuvante.",
            uoRiferimento: "UOC Oncologia 2",
            sopravvivenzaOsteo: "≥12 mesi",
            quesitoTeam: "Follow-up post-intervento. Controllo programmato.",
            richiestaPer: ["visita"],
            psOsteo: "100-90",
            segniSintomi: "Nessuno",
            metastasiViscerali: "No",
            nMetastasiVertebrali: "0",
            sedeMalattiaPrimitiva: "Colon-retto",
            compressioneMidollare: false,
            fratturaPatologica: false
          },
          impegnativaPDF: "impegnativa_luigi_ferrari_2024-01-16.pdf"
        }
      ],
      6: [
        { 
          id: 1, 
          ambulatorio: "Cure Simultanee", 
          tipo: "visita", 
          codiceRicetta: "7788990011", 
          dataRichiesta: "2024-01-18", 
          stato: "Da prenotare", 
          score: 3,
          dettagliRichiesta: "Richiesta valutazione per strategia terapeutica personalizzata. Paziente con melanoma cutaneo in stadio avanzato.",
          dettagliRichiestaOncologo: "Valutazione per strategia terapeutica personalizzata.",
          formOncologo: {
            quesitoDiagnostico: "Paziente con melanoma cutaneo in stadio avanzato. Richiesta discussione multidisciplinare per strategia terapeutica personalizzata.",
            psKarnofsky: ">70",
            sintomi: ["Dolore"],
            sopravvivenza: "≥ 12 mesi",
            trattamenti: "Sì",
            tossicita: "Nessuna",
            problemiSocio: "Adeguato supporto"
          },
          note: "In attesa di esito",
          impegnativaPDF: "impegnativa_maria_romano_2024-01-18.pdf"
        }
      ],
      999: [
        { 
          id: 1, 
          ambulatorio: "Cure Simultanee", 
          tipo: "visita", 
          codiceRicetta: "1234567890", 
          dataRichiesta: "2024-01-20", 
          dataVisita: "2024-01-20",
          stato: "Completata",
          score: 7,
          dettagliRichiesta: "Richiesta valutazione clinica per sintomi respiratori persistenti. Programmati esami diagnostici per approfondimento.",
          dettagliRichiestaOncologo: "Valutazione clinica per sintomi respiratori. Programmati esami diagnostici.",
          formOncologo: {
            quesitoDiagnostico: "Paziente presenta sintomi respiratori persistenti. Richiesta valutazione per sospetta neoplasia polmonare e stadiazione completa.",
            psKarnofsky: ">70",
            sintomi: ["Tosse persistente", "Dispnea"],
            sopravvivenza: "≥ 12 mesi",
            trattamenti: "Sì",
            tossicita: "Nessuna",
            problemiSocio: "Adeguato supporto"
          },
          impegnativaPDF: "impegnativa_paziente_demo_2024-01-20.pdf"
        },
        { 
          id: 2, 
          ambulatorio: "Oncogeriatria", 
          tipo: "visita", 
          codiceRicetta: "1357913579", 
          dataRichiesta: "2024-01-25", 
          dataVisita: "2024-01-30",
          stato: "Prenotata",
          score: 5,
          dettagliRichiesta: "Richiesta controllo follow-up. Valutazione tollerabilità terapia e gestione effetti collaterali in paziente anziano.",
          dettagliRichiestaOncologo: "Controllo follow-up. Valutazione tollerabilità terapia.",
          formOncologo: {
            quesitoDiagnostico: "Controllo follow-up. Valutazione tollerabilità terapia e gestione effetti collaterali in paziente anziano.",
            stadio: "localmente avanzato",
            finalitaTrattamento: "curativo",
            ecogPS: "1",
            punteggioG8: "13",
            esitoVGM: "fit",
            propostaTerapeutica: "terapia standard - dosi standard",
            prognosiOncologica: "≥ 12 mesi",
            finalitaTerapiaOncologica: ["Aumento OS / PFS", "Miglioramento sintomi / qualità di vita"],
            tossicitaEmatologica: "Nessuna",
            tossicitaExtraEmatologica: "Nessuna",
            quesitiGeriatra: ["Valutazione tollerabilità"]
          },
          impegnativaPDF: "impegnativa_paziente_demo_2024-01-25.pdf"
        },
        { 
          id: 3, 
          ambulatorio: "Osteoncologia", 
          tipo: "discussione", 
          codiceRicetta: "2468024680", 
          dataRichiesta: "2024-01-28", 
          stato: "Da prenotare", 
          score: 6,
          dettagliRichiesta: "Richiesta valutazione multidisciplinare per strategia terapeutica. Necessaria discussione condivisa tra specialisti.",
          dettagliRichiestaOncologo: "Richiesta valutazione multidisciplinare per strategia terapeutica.",
          formOncologo: {
            quesitoDiagnostico: "Richiesta valutazione multidisciplinare per strategia terapeutica. Necessaria discussione condivisa tra specialisti.",
            uoRiferimento: "UOC Oncologia 1",
            sopravvivenzaOsteo: "6-12 mesi",
            quesitoTeam: "Richiesta valutazione multidisciplinare per strategia terapeutica. Necessaria discussione condivisa tra specialisti.",
            richiestaPer: ["discussione"],
            psOsteo: "80",
            segniSintomi: "Dolore scheletrico",
            metastasiViscerali: "Sì",
            nMetastasiVertebrali: "3-5",
            sedeMalattiaPrimitiva: "Polmone",
            compressioneMidollare: false,
            fratturaPatologica: false
          },
          note: "Richiesta valutazione multidisciplinare",
          impegnativaPDF: "impegnativa_paziente_demo_2024-01-28.pdf"
        }
      ]
    };
    return visits[patientId] || [];
  };

  const getStatoBadgeColor = (stato: VisitaAmbulatorio["stato"]) => {
    switch (stato) {
      case "Completata":
        return "bg-green-100 text-green-800";
      case "Prenotata":
        return "bg-blue-100 text-blue-800";
      case "Disdetta":
        return "bg-red-100 text-red-800";
      default:
        return "bg-yellow-100 text-yellow-800"; // Da prenotare
    }
  };

  const handleCupAssociation = () => {
    // Simula l'associazione CUP
    console.log("Associazione CUP:", cupData);
    alert(`Slot CUP associato con successo!\nData: ${cupData.data}\nOra: ${cupData.ora}\nAmbulatorio: ${cupData.ambulatorio}`);
    setShowCupDialog(false);
    setCupData({ data: "", ora: "", ambulatorio: "", medico: "", note: "" });
  };

  const handleEditPrenotazione = () => {
    // Precompila i dati esistenti
    setEditData({
      data: patient?.dataPrenotazione || "",
      ora: patient?.oraPrenotazione || "",
      ambulatorio: patient?.ambulatorio || "",
      medico: patient?.medicoPrenotazione || patient?.medicoMittente || "Dr. Bianchi",
      note: ""
    });
    setShowEditDialog(true);
  };

  const handleSaveEdit = () => {
    // Simula il salvataggio della modifica
    console.log("Modifica prenotazione:", editData);
    alert(`Prenotazione modificata con successo!\nData: ${editData.data}\nOra: ${editData.ora}\nAmbulatorio: ${editData.ambulatorio}`);
    setShowEditDialog(false);
    setEditData({ data: "", ora: "", ambulatorio: "", medico: "", note: "" });
  };

  const handleNuovoVerbale = () => {
    setVerbaleData({ visitaId: "", verbale: "", note: "" });
    setShowVerbaleDialog(true);
  };

  const handleSaveVerbale = () => {
    if (!verbaleData.visitaId || !verbaleData.verbale.trim()) {
      alert("Seleziona una visita e compila il verbale");
      return;
    }
    
    // Trova i dettagli della visita selezionata
    const visitaSelezionata = getExistingVisits(patient.id).find(v => v.id.toString() === verbaleData.visitaId);
    
    if (!visitaSelezionata) {
      alert("Visita non trovata");
      return;
    }
    
    // Crea il nuovo verbale
    const nuovoVerbale = {
      id: Date.now(), // ID univoco basato su timestamp
      patientId: patient.id, // Associa il verbale al paziente corrente
      data: visitaSelezionata.data,
      tipo: visitaSelezionata.tipo,
      medico: visitaSelezionata.medico,
      verbale: verbaleData.verbale,
      note: verbaleData.note || "",
      ambulatorio: visitaSelezionata.ambulatorio,
      ora: visitaSelezionata.ora,
      stato: "Inviato all'oncologo/radioterapista",
      dataCreazione: new Date().toISOString().split('T')[0]
    };
    
    // Aggiungi il verbale alla lista
    setVerbaliAggiunti(prev => [...prev, nuovoVerbale]);
    
    // Simula l'invio all'oncologo/radioterapista
    console.log("Nuovo verbale creato:", nuovoVerbale);
    alert(`Verbale salvato con successo!\nIl verbale è stato inviato all'oncologo/radioterapista per la revisione.\n\nVisita: ${visitaSelezionata.tipo}\nData: ${visitaSelezionata.data} ${visitaSelezionata.ora}\nAmbulatorio: ${visitaSelezionata.ambulatorio}`);
    
    // Reset del form
    setShowVerbaleDialog(false);
    setVerbaleData({ visitaId: "", verbale: "", note: "" });
  };

  if (!patient) {
    return (
      <div className="min-h-screen bg-background">
        <CaseManagerNavbar />
        <div className="container mx-auto px-4 py-4">
          <div className="text-center py-8">
            <h1 className="text-2xl font-bold text-red-600 mb-4">Paziente Non Trovato</h1>
            <p className="text-muted-foreground mb-4">Il codice fiscale inserito non è valido.</p>
            <Button onClick={() => navigate('/oncologico/case-manager')}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Torna alla Lista Pazienti
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <CaseManagerNavbar />

      <div className="container mx-auto px-4 py-6 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" onClick={() => navigate('/oncologico/case-manager/pazienti')} className="hover:bg-muted">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Torna alla Lista
              </Button>
            </div>
            <Button variant="outline" className="shadow-sm">
              <Download className="w-4 h-4 mr-2" />
              Export Dati Paziente
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Colonna sinistra - Dati principali */}
          <div className="lg:col-span-2 space-y-6">
            {/* Dati Personali */}
            <Card className="shadow-md border-0">
              <CardHeader className="bg-gradient-to-r from-indigo-50 to-blue-50 border-b">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <User className="w-5 h-5 text-blue-600" />
                  </div>
                  Dati Personali
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">Nome Completo</p>
                      <p className="text-base font-semibold text-gray-900">{patient.nome} {patient.cognome}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">Codice Fiscale</p>
                      <p className="text-base font-mono text-gray-900">{patient.cf}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">Residenza</p>
                      <p className="text-base text-gray-900">{patient.residenza}</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">PDTA</p>
                      <Badge className="bg-indigo-100 text-indigo-800 border-indigo-200 text-sm px-3 py-1">
                        {patient.pdta}
                      </Badge>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">Cellulare</p>
                      <p className="text-base text-gray-900">{patient.cellulare}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">Email</p>
                      <p className="text-base text-gray-900">{patient.email}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Dettagli Richiesta */}
            <Card className="shadow-md border-0">
              <CardHeader className="bg-gradient-to-r from-indigo-50 to-blue-50 border-b">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center">
                    <FileText className="w-5 h-5 text-indigo-600" />
                  </div>
                  Dettagli Richiesta
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">Medico Richiedente</p>
                      <p className="text-base font-semibold text-gray-900">{patient.medicoMittente}</p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">Data Richiesta</p>
                      <p className="text-base font-semibold text-gray-900">{patient.dataRichiesta || "N/D"}</p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">Score Clinico</p>
                      <Badge className={getScoreColor(patient.score)}>{patient.score}</Badge>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">Impegnativa</p>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => window.open(`/pdf/impegnativa_${patient.cognome.toLowerCase()}_${patient.nome.toLowerCase()}.pdf`, '_blank')}
                      className="flex items-center gap-2 shadow-sm hover:shadow"
                    >
                      <FileText className="w-4 h-4" />
                      Visualizza PDF Impegnativa
                    </Button>
                  </div>

                  {patient.quesitoDiagnostico && (
                    <div className="p-5 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border-2 border-blue-200 shadow-sm">
                      <p className="text-xs font-semibold text-blue-900 uppercase tracking-wide mb-3">Quesito Diagnostico</p>
                      <p className="text-sm text-blue-900 leading-relaxed italic">"{patient.quesitoDiagnostico}"</p>
                    </div>
                  )}

                  <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">Form Compilato dall'Oncologo</p>
                  {patient.formOncologo ? (
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm" className="flex items-center gap-2">
                          <Eye className="w-4 h-4" />
                          Visualizza Form
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-3xl max-h-[85vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle>Form Compilato dall'Oncologo</DialogTitle>
                          <DialogDescription>
                            Dettagli del form compilato per {patient.nome} {patient.cognome}
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-6 mt-4">
                          {/* Dati comuni */}
                          <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                            <h4 className="font-semibold text-blue-900 mb-3">Dati Generali</h4>
                            <div className="grid md:grid-cols-2 gap-3 text-sm">
                              <div>
                                <p className="text-muted-foreground">Ambulatorio</p>
                                <p className="font-medium">{patient.formOncologo.ambulatorio}</p>
                              </div>
                              <div>
                                <p className="text-muted-foreground">Data Compilazione</p>
                                <p className="font-medium">{patient.formOncologo.dataCompilazione}</p>
                              </div>
                              <div>
                                <p className="text-muted-foreground">Medico Compilatore</p>
                                <p className="font-medium">{patient.formOncologo.medicoCompilatore}</p>
                              </div>
                              <div>
                                <p className="text-muted-foreground">Score Totale</p>
                                <Badge className={getScoreColor(patient.score)}>{patient.score}</Badge>
                              </div>
                            </div>
                            <div className="mt-3">
                              <p className="text-muted-foreground text-sm mb-1">Quesito Diagnostico</p>
                              <p className="text-sm italic">{patient.formOncologo.quesitoDiagnostico}</p>
                            </div>
                          </div>

                          {/* Dati specifici per Cure Simultanee */}
                          {patient.formOncologo.ambulatorio === "Cure Simultanee" && patient.formOncologo.psKarnofsky && (
                            <div className="p-4 bg-gray-50 rounded-lg border">
                              <h4 className="font-semibold mb-3">Valutazione Score Clinico - Cure Simultanee</h4>
                              <div className="grid md:grid-cols-2 gap-4 text-sm">
                                <div>
                                  <p className="text-muted-foreground">PS (Karnofsky)</p>
                                  <p className="font-medium">{patient.formOncologo.psKarnofsky}</p>
                                </div>
                                <div>
                                  <p className="text-muted-foreground">Sopravvivenza Stimata</p>
                                  <p className="font-medium">{patient.formOncologo.sopravvivenza}</p>
                                </div>
                                <div>
                                  <p className="text-muted-foreground">Sintomi</p>
                                  <p className="font-medium">{patient.formOncologo.sintomi?.join(", ") || "Nessuno"}</p>
                                </div>
                                <div>
                                  <p className="text-muted-foreground">Trattamenti Precedenti</p>
                                  <p className="font-medium">{patient.formOncologo.trattamenti || "N/A"}</p>
                                </div>
                                <div>
                                  <p className="text-muted-foreground">Tossicità</p>
                                  <p className="font-medium">{patient.formOncologo.tossicita || "Nessuna"}</p>
                                </div>
                                <div>
                                  <p className="text-muted-foreground">Problemi Socio-Assistenziali</p>
                                  <p className="font-medium">{patient.formOncologo.problemiSocio || "N/A"}</p>
                                </div>
                              </div>
                            </div>
                          )}

                          {/* Dati specifici per Osteoncologia */}
                          {patient.formOncologo.ambulatorio === "Osteoncologia" && patient.formOncologo.uoRiferimento && (
                            <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                              <h4 className="font-semibold mb-3">Dettagli Osteoncologia</h4>
                              <div className="grid md:grid-cols-2 gap-4 text-sm mb-3">
                                <div>
                                  <p className="text-muted-foreground">U.O. di Riferimento</p>
                                  <p className="font-medium">{patient.formOncologo.uoRiferimento}</p>
                                </div>
                                <div>
                                  <p className="text-muted-foreground">Sopravvivenza Stimata</p>
                                  <p className="font-medium">{patient.formOncologo.sopravvivenzaOsteo}</p>
                                </div>
                                <div>
                                  <p className="text-muted-foreground">Richiesta per</p>
                                  <p className="font-medium">{patient.formOncologo.richiestaPer?.join(", ") || "N/A"}</p>
                                </div>
                                <div>
                                  <p className="text-muted-foreground">PS (Karnofsky)</p>
                                  <p className="font-medium">{patient.formOncologo.psOsteo || "N/A"}</p>
                                </div>
                                <div>
                                  <p className="text-muted-foreground">Segni e Sintomi</p>
                                  <p className="font-medium">{patient.formOncologo.segniSintomi || "Nessuno"}</p>
                                </div>
                                <div>
                                  <p className="text-muted-foreground">Metastasi Viscerali</p>
                                  <p className="font-medium">{patient.formOncologo.metastasiViscerali || "N/A"}</p>
                                </div>
                                <div>
                                  <p className="text-muted-foreground">N. Metastasi Vertebrali</p>
                                  <p className="font-medium">{patient.formOncologo.nMetastasiVertebrali || "N/A"}</p>
                                </div>
                                <div>
                                  <p className="text-muted-foreground">Sede Malattia Primitiva</p>
                                  <p className="font-medium">{patient.formOncologo.sedeMalattiaPrimitiva || "N/A"}</p>
                                </div>
                                <div>
                                  <p className="text-muted-foreground">Compressione Midollare</p>
                                  <p className="font-medium">{patient.formOncologo.compressioneMidollare ? "Sì" : "No"}</p>
                                </div>
                                <div>
                                  <p className="text-muted-foreground">Frattura Patologica</p>
                                  <p className="font-medium">{patient.formOncologo.fratturaPatologica ? "Sì" : "No"}</p>
                                </div>
                              </div>
                              {patient.formOncologo.quesitoTeam && (
                                <div className="mt-3">
                                  <p className="text-muted-foreground text-sm mb-1">Quesito al Team Multidisciplinare</p>
                                  <p className="text-sm italic">{patient.formOncologo.quesitoTeam}</p>
                                </div>
                              )}
                            </div>
                          )}

                          {/* Dati specifici per Oncogeriatria */}
                          {patient.formOncologo.ambulatorio === "Oncogeriatria" && patient.formOncologo.stadio && (
                            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                              <h4 className="font-semibold mb-3">Dettagli Oncogeriatria</h4>
                              <div className="grid md:grid-cols-2 gap-4 text-sm mb-3">
                                <div>
                                  <p className="text-muted-foreground">Stadio</p>
                                  <p className="font-medium">{patient.formOncologo.stadio}</p>
                                </div>
                                <div>
                                  <p className="text-muted-foreground">Finalità del Trattamento</p>
                                  <p className="font-medium">{patient.formOncologo.finalitaTrattamento}</p>
                                </div>
                                <div>
                                  <p className="text-muted-foreground">ECOG PS</p>
                                  <p className="font-medium">{patient.formOncologo.ecogPS || "N/A"}</p>
                                </div>
                                <div>
                                  <p className="text-muted-foreground">Punteggio G8</p>
                                  <p className="font-medium">{patient.formOncologo.punteggioG8 || "N/A"}</p>
                                </div>
                                <div>
                                  <p className="text-muted-foreground">Esito VGM</p>
                                  <p className="font-medium">{patient.formOncologo.esitoVGM || "N/A"}</p>
                                </div>
                                <div>
                                  <p className="text-muted-foreground">Proposta Terapeutica</p>
                                  <p className="font-medium">{patient.formOncologo.propostaTerapeutica || "N/A"}</p>
                                </div>
                                <div>
                                  <p className="text-muted-foreground">Prognosi Oncologica</p>
                                  <p className="font-medium">{patient.formOncologo.prognosiOncologica || "N/A"}</p>
                                </div>
                                <div>
                                  <p className="text-muted-foreground">Finalità Terapia Oncologica</p>
                                  <p className="font-medium">{patient.formOncologo.finalitaTerapiaOncologica?.join(", ") || "N/A"}</p>
                                </div>
                                <div>
                                  <p className="text-muted-foreground">Tossicità Ematologica</p>
                                  <p className="font-medium">{patient.formOncologo.tossicitaEmatologica || "Nessuna"}</p>
                                </div>
                                <div>
                                  <p className="text-muted-foreground">Tossicità Extra-Ematologica</p>
                                  <p className="font-medium">{patient.formOncologo.tossicitaExtraEmatologica || "Nessuna"}</p>
                                </div>
                              </div>
                              {patient.formOncologo.quesitiGeriatra && patient.formOncologo.quesitiGeriatra.length > 0 && (
                                <div className="mt-3">
                                  <p className="text-muted-foreground text-sm mb-1">Quesiti al Geriatra</p>
                                  <ul className="list-disc list-inside text-sm">
                                    {patient.formOncologo.quesitiGeriatra.map((q, idx) => (
                                      <li key={idx}>{q}</li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      </DialogContent>
                    </Dialog>
                  ) : (
                    <p className="text-sm text-muted-foreground italic">Form non ancora compilato</p>
                  )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Colonna destra - Stato prenotazione */}
          <div className="space-y-6">
            {/* Stato della Prenotazione */}
            <Card className="shadow-md border-0 sticky top-6">
              <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 border-b">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-green-600" />
                  </div>
                  Stato della Prenotazione
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                {patient.slotPrenotato ? (
                  <div className="space-y-5">
                    <div className="p-5 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border-2 border-green-200 shadow-sm">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center shadow-md">
                          <CheckCircle className="w-6 h-6 text-white" />
                        </div>
                        <span className="font-bold text-lg text-green-900">Prenotazione Attiva</span>
                      </div>
                      <div className="space-y-3">
                        <div className="p-3 bg-white rounded-lg border border-green-100">
                          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">Data</p>
                          <p className="text-base font-semibold text-gray-900">{patient.dataPrenotazione}</p>
                        </div>
                        <div className="p-3 bg-white rounded-lg border border-green-100">
                          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">Ora</p>
                          <p className="text-base font-semibold text-gray-900">{patient.oraPrenotazione}</p>
                        </div>
                        <div className="p-3 bg-white rounded-lg border border-green-100">
                          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">Ambulatorio</p>
                          <Badge className="bg-indigo-100 text-indigo-800 border-indigo-200">
                            {patient.ambulatorio}
                          </Badge>
                        </div>
                        {patient.medicoPrenotazione && (
                          <div className="p-3 bg-white rounded-lg border border-green-100">
                            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">Medico</p>
                            <p className="text-base font-semibold text-gray-900">{patient.medicoPrenotazione}</p>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Button 
                        variant="outline" 
                        onClick={handleEditPrenotazione}
                        className="w-full bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100 hover:border-blue-300 shadow-sm"
                      >
                        <Edit className="w-4 h-4 mr-2" />
                        Modifica Slot
                      </Button>
                      <Button 
                        variant="outline" 
                        onClick={() => {
                          if (confirm('Eliminare la prenotazione per questo paziente?')) {
                            alert('Prenotazione eliminata con successo');
                          }
                        }}
                        className="w-full border-red-200 text-red-700 hover:bg-red-50 hover:border-red-300 shadow-sm"
                      >
                        Elimina Prenotazione
                      </Button>
                      <Button 
                        variant="outline" 
                        onClick={() => {
                          if (confirm('Rifiutare la richiesta e non prenotare questo paziente?')) {
                            alert('Richiesta rifiutata con successo');
                          }
                        }}
                        className="w-full border-orange-200 text-orange-700 hover:bg-orange-50 hover:border-orange-300 shadow-sm"
                      >
                        Rifiuta Richiesta
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="p-5 bg-gradient-to-br from-yellow-50 to-amber-50 rounded-xl border-2 border-yellow-200 shadow-sm">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center shadow-md">
                          <AlertCircle className="w-6 h-6 text-white" />
                        </div>
                        <span className="font-bold text-lg text-yellow-900">Da Prenotare</span>
                      </div>
                      <p className="text-sm text-yellow-800 leading-relaxed">
                        Il paziente non ha ancora uno slot prenotato. Utilizza il pulsante sottostante per prenotare.
                      </p>
                    </div>
                  
                    <Dialog open={showCupDialog} onOpenChange={setShowCupDialog}>
                      <DialogTrigger asChild>
                        <Button className="w-full shadow-md hover:shadow-lg bg-blue-600 hover:bg-blue-700">
                          <Plus className="w-4 h-4 mr-2" />
                          Prenota Slot
                        </Button>
                      </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                      <DialogHeader>
                        <DialogTitle>Prenota Slot</DialogTitle>
                        <DialogDescription>
                          Inserisci i dettagli della prenotazione per il paziente {patient.nome} {patient.cognome}
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="data">Data</Label>
                            <Input
                              id="data"
                              type="date"
                              value={cupData.data}
                              onChange={(e) => setCupData({...cupData, data: e.target.value})}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="ora">Ora</Label>
                            <Input
                              id="ora"
                              type="time"
                              value={cupData.ora}
                              onChange={(e) => setCupData({...cupData, ora: e.target.value})}
                            />
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="ambulatorio">Ambulatorio</Label>
                          <Select value={cupData.ambulatorio} onValueChange={(value) => setCupData({...cupData, ambulatorio: value})}>
                            <SelectTrigger>
                              <SelectValue placeholder="Seleziona ambulatorio" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Cure Simultanee">Cure Simultanee</SelectItem>
                              <SelectItem value="Oncogeriatria">Oncogeriatria</SelectItem>
                              <SelectItem value="Osteoncologia">Osteoncologia</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="medico">Medico</Label>
                          <Input
                            id="medico"
                            placeholder="Nome del medico"
                            value={cupData.medico}
                            onChange={(e) => setCupData({...cupData, medico: e.target.value})}
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="note">Note</Label>
                          <Input
                            id="note"
                            placeholder="Note aggiuntive (opzionale)"
                            value={cupData.note}
                            onChange={(e) => setCupData({...cupData, note: e.target.value})}
                          />
                        </div>
                        
                        <div className="flex gap-2 pt-4">
                          <Button onClick={handleCupAssociation} className="flex-1">
                            <Save className="w-4 h-4 mr-2" />
                            Conferma Prenotazione
                          </Button>
                          <Button variant="outline" onClick={() => setShowCupDialog(false)}>
                            Annulla
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              )}
            </CardContent>
          </Card>
          </div>
          </div>

        {/* Storico Visite - Full Width */}
        <div className="mt-6">
          {/* Storico Visite */}
          <Card className="shadow-md border-0">
            <CardHeader className="bg-gradient-to-r from-indigo-50 to-blue-50 border-b">
              <CardTitle className="flex items-center gap-2 text-lg">
                <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Clock className="w-5 h-5 text-purple-600" />
                </div>
                Storico Visite
              </CardTitle>
              <CardDescription className="mt-2">Visite nei 3 ambulatori con score, stato visita e dettagli richiesta oncologo</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4">
                {getAmbulatorioVisits(patient.id).map((v) => (
                  <div key={v.id} className="p-5 border-2 rounded-xl space-y-4 hover:shadow-md transition-shadow bg-white">
                    <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b">
                      <div className="flex items-center gap-3">
                        <span className="font-bold text-xl text-gray-900 capitalize">{v.tipo}</span>
                        <Badge className={getStatoBadgeColor(v.stato)}>{v.stato}</Badge>
                      </div>
                      {v.score !== undefined && (
                        <Badge className={getScoreColor(v.score)}>
                          Score: {v.score}
                        </Badge>
                      )}
                    </div>
                    
                    <div className="grid md:grid-cols-4 gap-4">
                      <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">Ambulatorio</p>
                        <Badge className="bg-indigo-100 text-indigo-800 border-indigo-200">
                          {v.ambulatorio}
                        </Badge>
                      </div>
                      <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">Codice Ricetta</p>
                        <p className="font-mono text-sm font-semibold text-gray-900">{v.codiceRicetta}</p>
                      </div>
                      <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">Data Richiesta</p>
                        <p className="font-semibold text-gray-900">{v.dataRichiesta}</p>
                      </div>
                      {v.dataVisita && (
                        <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">Data Visita</p>
                          <p className="font-semibold text-gray-900">{v.dataVisita}</p>
                        </div>
                      )}
                    </div>

                    {v.formOncologo?.quesitoDiagnostico && (
                      <div className="flex items-start gap-3 p-4 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl border-2 border-indigo-200 shadow-sm">
                        <div className="flex-1">
                          <p className="text-xs font-semibold text-indigo-900 uppercase tracking-wide mb-2">Quesito Diagnostico</p>
                          <p className="text-sm text-indigo-900 leading-relaxed italic">{v.formOncologo.quesitoDiagnostico}</p>
                        </div>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm" className="flex items-center gap-2 shrink-0">
                              <Eye className="w-4 h-4" />
                              Dettagli
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-3xl max-h-[85vh] overflow-y-auto">
                            <DialogHeader>
                              <DialogTitle>Dettagli della Visita</DialogTitle>
                              <DialogDescription>
                                Dettagli completi della visita per {v.tipo.charAt(0).toUpperCase() + v.tipo.slice(1)} - {v.ambulatorio}
                              </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4 mt-4">
                              {/* Informazioni Base */}
                              <div className="grid md:grid-cols-2 gap-4">
                                <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                                  <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1">Ambulatorio</p>
                                  <Badge className="bg-indigo-100 text-indigo-800 border-indigo-200">
                                    {v.ambulatorio}
                                  </Badge>
                                </div>
                                <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                                  <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1">Data Richiesta</p>
                                  <p className="text-sm font-semibold text-gray-900">{v.dataRichiesta}</p>
                                </div>
                                {v.dataVisita && (
                                  <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                                    <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1">Data Visita</p>
                                    <p className="text-sm font-semibold text-gray-900">{v.dataVisita}</p>
                                  </div>
                                )}
                                {v.impegnativaPDF && (
                                  <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                                    <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-2">PDF Impegnativa</p>
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      onClick={() => window.open(`/pdf/${v.impegnativaPDF}`, '_blank')}
                                      className="w-full"
                                    >
                                      <FileText className="w-4 h-4 mr-2" />
                                      Visualizza PDF
                                    </Button>
                                  </div>
                                )}
                              </div>

                              {/* Quesito Diagnostico */}
                              {v.formOncologo?.quesitoDiagnostico && (
                                <div className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg border-2 border-blue-200">
                                  <p className="text-xs font-semibold text-blue-900 uppercase tracking-wide mb-2">Quesito Diagnostico</p>
                                  <p className="text-sm text-blue-900 leading-relaxed italic">{v.formOncologo.quesitoDiagnostico}</p>
                                </div>
                              )}
                              
                              {/* Form Compilato dall'Oncologo */}
                              {v.formOncologo && (
                                <div className="p-5 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border-2 border-gray-300 shadow-sm">
                                  <h4 className="text-base font-bold text-gray-900 mb-4">Form Compilato dall'Oncologo</h4>

                                  {/* Dati per Cure Simultanee */}
                                  {v.ambulatorio === "Cure Simultanee" && v.formOncologo.psKarnofsky && (
                                    <div className="space-y-3">
                                      <h5 className="text-sm font-semibold text-gray-800 mb-2">Valutazione Score Clinico - Cure Simultanee</h5>
                                      <div className="grid md:grid-cols-2 gap-3 text-sm">
                                        <div>
                                          <p className="text-xs text-gray-600 mb-1">PS (Karnofsky)</p>
                                          <p className="font-medium text-gray-900">{v.formOncologo.psKarnofsky}</p>
                                        </div>
                                        <div>
                                          <p className="text-xs text-gray-600 mb-1">Sopravvivenza Stimata</p>
                                          <p className="font-medium text-gray-900">{v.formOncologo.sopravvivenza || "N/A"}</p>
                                        </div>
                                        <div>
                                          <p className="text-xs text-gray-600 mb-1">Sintomi</p>
                                          <p className="font-medium text-gray-900">{v.formOncologo.sintomi?.join(", ") || "Nessuno"}</p>
                                        </div>
                                        <div>
                                          <p className="text-xs text-gray-600 mb-1">Trattamenti Precedenti</p>
                                          <p className="font-medium text-gray-900">{v.formOncologo.trattamenti || "N/A"}</p>
                                        </div>
                                        <div>
                                          <p className="text-xs text-gray-600 mb-1">Tossicità</p>
                                          <p className="font-medium text-gray-900">{v.formOncologo.tossicita || "Nessuna"}</p>
                                        </div>
                                        <div>
                                          <p className="text-xs text-gray-600 mb-1">Problemi Socio-Assistenziali</p>
                                          <p className="font-medium text-gray-900">{v.formOncologo.problemiSocio || "N/A"}</p>
                                        </div>
                                      </div>
                                    </div>
                                  )}

                                  {/* Dati per Osteoncologia */}
                                  {v.ambulatorio === "Osteoncologia" && v.formOncologo.uoRiferimento && (
                                    <div className="space-y-3">
                                      <h5 className="text-sm font-semibold text-gray-800 mb-2">Dettagli Osteoncologia</h5>
                                      <div className="grid md:grid-cols-2 gap-3 text-sm">
                                        <div>
                                          <p className="text-xs text-gray-600 mb-1">U.O. di Riferimento</p>
                                          <p className="font-medium text-gray-900">{v.formOncologo.uoRiferimento}</p>
                                        </div>
                                        {v.formOncologo.altroUo && (
                                          <div>
                                            <p className="text-xs text-gray-600 mb-1">Altro U.O.</p>
                                            <p className="font-medium text-gray-900">{v.formOncologo.altroUo}</p>
                                          </div>
                                        )}
                                        <div>
                                          <p className="text-xs text-gray-600 mb-1">Sopravvivenza Stimata</p>
                                          <p className="font-medium text-gray-900">{v.formOncologo.sopravvivenzaOsteo || "N/A"}</p>
                                        </div>
                                        <div>
                                          <p className="text-xs text-gray-600 mb-1">Richiesta per</p>
                                          <p className="font-medium text-gray-900">{v.formOncologo.richiestaPer?.join(", ") || "N/A"}</p>
                                        </div>
                                        {v.formOncologo.quesitoTeam && (
                                          <div className="md:col-span-2">
                                            <p className="text-xs text-gray-600 mb-1">Quesito al Team Multidisciplinare</p>
                                            <p className="font-medium text-gray-900 italic">{v.formOncologo.quesitoTeam}</p>
                                          </div>
                                        )}
                                        <div>
                                          <p className="text-xs text-gray-600 mb-1">PS (Karnofsky)</p>
                                          <p className="font-medium text-gray-900">{v.formOncologo.psOsteo || "N/A"}</p>
                                        </div>
                                        <div>
                                          <p className="text-xs text-gray-600 mb-1">Segni e Sintomi</p>
                                          <p className="font-medium text-gray-900">{v.formOncologo.segniSintomi || "Nessuno"}</p>
                                        </div>
                                        <div>
                                          <p className="text-xs text-gray-600 mb-1">Metastasi Viscerali</p>
                                          <p className="font-medium text-gray-900">{v.formOncologo.metastasiViscerali || "N/A"}</p>
                                        </div>
                                        <div>
                                          <p className="text-xs text-gray-600 mb-1">N. Metastasi Vertebrali</p>
                                          <p className="font-medium text-gray-900">{v.formOncologo.nMetastasiVertebrali || "N/A"}</p>
                                        </div>
                                        <div>
                                          <p className="text-xs text-gray-600 mb-1">Sede Malattia Primitiva</p>
                                          <p className="font-medium text-gray-900">{v.formOncologo.sedeMalattiaPrimitiva || "N/A"}</p>
                                        </div>
                                        <div>
                                          <p className="text-xs text-gray-600 mb-1">Compressione Midollare</p>
                                          <p className="font-medium text-gray-900">{v.formOncologo.compressioneMidollare ? "Sì" : "No"}</p>
                                        </div>
                                        <div>
                                          <p className="text-xs text-gray-600 mb-1">Frattura Patologica</p>
                                          <p className="font-medium text-gray-900">{v.formOncologo.fratturaPatologica ? "Sì" : "No"}</p>
                                        </div>
                                      </div>
                                    </div>
                                  )}

                                  {/* Dati per Oncogeriatria */}
                                  {v.ambulatorio === "Oncogeriatria" && v.formOncologo.stadio && (
                                    <div className="space-y-3">
                                      <h5 className="text-sm font-semibold text-gray-800 mb-2">Dettagli Oncogeriatria</h5>
                                      <div className="grid md:grid-cols-2 gap-3 text-sm">
                                        <div>
                                          <p className="text-xs text-gray-600 mb-1">Stadio</p>
                                          <p className="font-medium text-gray-900">{v.formOncologo.stadio}</p>
                                        </div>
                                        <div>
                                          <p className="text-xs text-gray-600 mb-1">Finalità del Trattamento</p>
                                          <p className="font-medium text-gray-900">{v.formOncologo.finalitaTrattamento}</p>
                                        </div>
                                        <div>
                                          <p className="text-xs text-gray-600 mb-1">ECOG PS</p>
                                          <p className="font-medium text-gray-900">{v.formOncologo.ecogPS || "N/A"}</p>
                                        </div>
                                        <div>
                                          <p className="text-xs text-gray-600 mb-1">Punteggio G8</p>
                                          <p className="font-medium text-gray-900">{v.formOncologo.punteggioG8 || "N/A"}</p>
                                        </div>
                                        <div>
                                          <p className="text-xs text-gray-600 mb-1">Esito VGM</p>
                                          <p className="font-medium text-gray-900">{v.formOncologo.esitoVGM || "N/A"}</p>
                                        </div>
                                        <div>
                                          <p className="text-xs text-gray-600 mb-1">Proposta Terapeutica</p>
                                          <p className="font-medium text-gray-900">{v.formOncologo.propostaTerapeutica || "N/A"}</p>
                                        </div>
                                        <div>
                                          <p className="text-xs text-gray-600 mb-1">Prognosi Oncologica</p>
                                          <p className="font-medium text-gray-900">{v.formOncologo.prognosiOncologica || "N/A"}</p>
                                        </div>
                                        <div>
                                          <p className="text-xs text-gray-600 mb-1">Finalità Terapia Oncologica</p>
                                          <p className="font-medium text-gray-900">{v.formOncologo.finalitaTerapiaOncologica?.join(", ") || "N/A"}</p>
                                        </div>
                                        <div>
                                          <p className="text-xs text-gray-600 mb-1">Tossicità Ematologica</p>
                                          <p className="font-medium text-gray-900">{v.formOncologo.tossicitaEmatologica || "Nessuna"}</p>
                                        </div>
                                        <div>
                                          <p className="text-xs text-gray-600 mb-1">Tossicità Extra-Ematologica</p>
                                          <p className="font-medium text-gray-900">{v.formOncologo.tossicitaExtraEmatologica || "Nessuna"}</p>
                                        </div>
                                        {v.formOncologo.quesitiGeriatra && v.formOncologo.quesitiGeriatra.length > 0 && (
                                          <div className="md:col-span-2">
                                            <p className="text-xs text-gray-600 mb-1">Quesiti al Geriatra</p>
                                            <ul className="list-disc list-inside text-sm text-gray-900">
                                              {v.formOncologo.quesitiGeriatra.map((q, idx) => (
                                                <li key={idx}>{q}</li>
                                              ))}
                                            </ul>
                                          </div>
                                        )}
                                        {v.formOncologo.altroQuesitoGeriatra && (
                                          <div className="md:col-span-2">
                                            <p className="text-xs text-gray-600 mb-1">Altro Quesito Geriatra</p>
                                            <p className="font-medium text-gray-900">{v.formOncologo.altroQuesitoGeriatra}</p>
                                          </div>
                                        )}
                                      </div>
                                    </div>
                                  )}
                                </div>
                              )}
                            </div>
                          </DialogContent>
                        </Dialog>
                      </div>
                    )}

                    {v.dettagliRichiestaOncologo && !v.formOncologo?.quesitoDiagnostico && (
                      <div className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border-2 border-blue-200 shadow-sm">
                        <p className="text-xs font-semibold text-blue-900 uppercase tracking-wide mb-2">Dettagli Richiesta Oncologo</p>
                        <p className="text-sm text-blue-900 leading-relaxed">{v.dettagliRichiestaOncologo}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Dialog per modifica prenotazione */}
          <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Modifica Prenotazione</DialogTitle>
                <DialogDescription>
                  Modifica i dettagli della prenotazione per il paziente {patient.nome} {patient.cognome}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="edit-data">Data</Label>
                    <Input
                      id="edit-data"
                      type="date"
                      value={editData.data}
                      onChange={(e) => setEditData({...editData, data: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-ora">Ora</Label>
                    <Input
                      id="edit-ora"
                      type="time"
                      value={editData.ora}
                      onChange={(e) => setEditData({...editData, ora: e.target.value})}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="edit-ambulatorio">Ambulatorio</Label>
                  <Select value={editData.ambulatorio} onValueChange={(value) => setEditData({...editData, ambulatorio: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleziona ambulatorio" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Cure Simultanee">Cure Simultanee</SelectItem>
                      <SelectItem value="Oncogeriatria">Oncogeriatria</SelectItem>
                      <SelectItem value="Osteoncologia">Osteoncologia</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="edit-medico">Medico</Label>
                  <Input
                    id="edit-medico"
                    placeholder="Nome del medico"
                    value={editData.medico}
                    onChange={(e) => setEditData({...editData, medico: e.target.value})}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="edit-note">Note</Label>
                  <Input
                    id="edit-note"
                    placeholder="Note aggiuntive (opzionale)"
                    value={editData.note}
                    onChange={(e) => setEditData({...editData, note: e.target.value})}
                  />
                </div>
                
                <div className="flex gap-2 pt-4">
                  <Button onClick={handleSaveEdit} className="flex-1">
                    <Save className="w-4 h-4 mr-2" />
                    Salva Modifiche
                  </Button>
                  <Button variant="outline" onClick={() => setShowEditDialog(false)}>
                    Annulla
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          {/* Dialog per nuovo verbale */}
          <Dialog open={showVerbaleDialog} onOpenChange={setShowVerbaleDialog}>
            <DialogContent className="sm:max-w-2xl">
              <DialogHeader>
                <DialogTitle>Nuovo Verbale Visita</DialogTitle>
                <DialogDescription>
                  Seleziona una visita esistente e compila il verbale per inviarlo all'oncologo/radioterapista
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="visita-select">Seleziona Visita</Label>
                  <Select value={verbaleData.visitaId} onValueChange={(value) => setVerbaleData({...verbaleData, visitaId: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleziona una visita esistente" />
                    </SelectTrigger>
                    <SelectContent>
                      {getExistingVisits(patient.id).map((visita) => (
                        <SelectItem key={visita.id} value={visita.id.toString()}>
                          {visita.data} {visita.ora} - {visita.tipo} ({visita.ambulatorio}) - {visita.medico}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="verbale-text">Verbale della Visita</Label>
                  <Textarea
                    id="verbale-text"
                    placeholder="Descrivi dettagliatamente l'esito della visita, le osservazioni cliniche, i sintomi riscontrati, le raccomandazioni..."
                    value={verbaleData.verbale}
                    onChange={(e) => setVerbaleData({...verbaleData, verbale: e.target.value})}
                    rows={8}
                    className="resize-none"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="note-verbale">Note Aggiuntive (opzionale)</Label>
                  <Textarea
                    id="note-verbale"
                    placeholder="Note aggiuntive per l'oncologo/radioterapista..."
                    value={verbaleData.note}
                    onChange={(e) => setVerbaleData({...verbaleData, note: e.target.value})}
                    rows={3}
                    className="resize-none"
                  />
                </div>
                
                <div className="flex gap-2 pt-4">
                  <Button onClick={handleSaveVerbale} className="flex-1">
                    <FileText className="w-4 h-4 mr-2" />
                    Salva e Invia Verbale
                  </Button>
                  <Button variant="outline" onClick={() => setShowVerbaleDialog(false)}>
                    Annulla
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
      </div>
    </div>
  );
};

export default PazienteDetailPage;
