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
import CaseManagerNavbar from "@/oncologico/components/CaseManagerNavbar";
import { useNavigate, useParams } from "react-router-dom";

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
  const [verbaliAggiunti, setVerbaliAggiunti] = useState<any[]>([]);

  // Mock data pazienti (stesso del CaseManagerPage)
  const [patients] = useState([
    {
      id: 1,
      cognome: "Rossi",
      nome: "Mario",
      cf: "RSSMRA80A01H501U",
      pdta: "Polmone",
      visitaRichiesta: "Oncologica",
      medicoMittente: "Dr. Bianchi",
      quesitoDiagnostico: "Valutazione per sospetta neoplasia polmonare con nodulo di 2.5 cm al lobo superiore destro. Richiesta stadiazione completa e valutazione per trattamento chirurgico.",
      score: 8,
      slotPrenotato: true,
      dataPrenotazione: "2024-01-20",
      oraPrenotazione: "09:30",
      ambulatorio: "Cure Simultanee",
      comorbidita: ["Diabete tipo 2", "Ipertensione"],
      storicoVisite: [
        { data: "2024-01-10", tipo: "Prima visita", medico: "Dr. Bianchi", esito: "Diagnosi confermata" },
        { data: "2023-12-15", tipo: "Visita controllo", medico: "Dr. Verdi", esito: "Stabile" }
      ],
      storicoScore: [
        { data: "2024-01-15", score: 8, parametri: { tosse: 3, dolore: 3, comorbidita: 2 } },
        { data: "2023-12-15", score: 6, parametri: { tosse: 2, dolore: 2, comorbidita: 2 } }
      ]
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
      score: 7,
      slotPrenotato: false,
      dataPrenotazione: null,
      oraPrenotazione: null,
      ambulatorio: null,
      comorbidita: ["Osteoporosi"],
      storicoVisite: [
        { data: "2024-01-12", tipo: "Visita oncologica", medico: "Dr. Verdi", esito: "Programmata radioterapia" }
      ],
      storicoScore: [
        { data: "2024-01-12", score: 7, parametri: { tosse: 1, dolore: 3, comorbidita: 3 } }
      ]
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
      score: 6,
      slotPrenotato: true,
      dataPrenotazione: "2024-01-18",
      oraPrenotazione: "14:00",
      ambulatorio: "Oncogeriatria",
      comorbidita: ["Cardiopatia ischemica", "Diabete tipo 2"],
      storicoVisite: [
        { data: "2024-01-08", tipo: "Visita geriatrica", medico: "Dr. Rossi", esito: "Valutazione completata" },
        { data: "2023-11-20", tipo: "Prima visita", medico: "Dr. Bianchi", esito: "Diagnosi iniziale" }
      ],
      storicoScore: [
        { data: "2024-01-08", score: 6, parametri: { tosse: 1, dolore: 2, comorbidita: 3 } },
        { data: "2023-11-20", score: 5, parametri: { tosse: 1, dolore: 1, comorbidita: 3 } }
      ]
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
      score: 5,
      slotPrenotato: false,
      dataPrenotazione: null,
      oraPrenotazione: null,
      ambulatorio: null,
      comorbidita: ["Epilessia"],
      storicoVisite: [
        { data: "2024-01-14", tipo: "Visita neurologica", medico: "Dr. Bianchi", esito: "In attesa di esami" }
      ],
      storicoScore: [
        { data: "2024-01-14", score: 5, parametri: { tosse: 2, dolore: 1, comorbidita: 2 } }
      ]
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
      score: 4,
      slotPrenotato: true,
      dataPrenotazione: "2024-01-22",
      oraPrenotazione: "10:00",
      ambulatorio: "Osteoncologia",
      comorbidita: ["Diverticolosi"],
      storicoVisite: [
        { data: "2024-01-16", tipo: "Visita gastroenterologica", medico: "Dr. Verdi", esito: "Follow-up programmato" }
      ],
      storicoScore: [
        { data: "2024-01-16", score: 4, parametri: { tosse: 1, dolore: 1, comorbidita: 2 } }
      ]
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
      score: 3,
      slotPrenotato: false,
      dataPrenotazione: null,
      oraPrenotazione: null,
      ambulatorio: null,
      comorbidita: [],
      storicoVisite: [
        { data: "2024-01-18", tipo: "Visita dermatologica", medico: "Dr. Bianchi", esito: "Discussione caso" }
      ],
      storicoScore: [
        { data: "2024-01-18", score: 3, parametri: { tosse: 1, dolore: 1, comorbidita: 1 } }
      ]
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
        score: Math.floor(Math.random() * 6) + 3, // Score tra 3 e 8
        slotPrenotato: Math.random() > 0.5,
        dataPrenotazione: Math.random() > 0.5 ? "2024-01-25" : null,
        oraPrenotazione: Math.random() > 0.5 ? "10:30" : null,
        ambulatorio: Math.random() > 0.5 ? "Cure Simultanee" : null,
        comorbidita: ["Diabete tipo 2", "Ipertensione"],
        storicoVisite: [
          { data: "2024-01-20", tipo: "Prima visita", medico: "Dr. Bianchi", esito: "Diagnosi in corso" },
          { data: "2024-01-15", tipo: "Visita controllo", medico: "Dr. Verdi", esito: "Stabile" }
        ],
        storicoScore: [
          { data: "2024-01-20", score: Math.floor(Math.random() * 6) + 3, parametri: { tosse: Math.floor(Math.random() * 3) + 1, dolore: Math.floor(Math.random() * 3) + 1, comorbidita: Math.floor(Math.random() * 3) + 1 } },
          { data: "2024-01-15", score: Math.floor(Math.random() * 6) + 3, parametri: { tosse: Math.floor(Math.random() * 3) + 1, dolore: Math.floor(Math.random() * 3) + 1, comorbidita: Math.floor(Math.random() * 3) + 1 } }
        ]
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
  type VisitaAmbulatorio = {
    id: number;
    ambulatorio: string;
    tipo: string;
    codiceRicetta: string;
    dataRichiesta: string;
    stato: "Disdetta" | "Completata" | "Prenotata" | "Da prenotare";
    note?: string;
  };

  const getAmbulatorioVisits = (patientId: number): VisitaAmbulatorio[] => {
    const visits: Record<number, VisitaAmbulatorio[]> = {
      1: [
        { id: 1, ambulatorio: "Cure Simultanee", tipo: "Prima visita", codiceRicetta: "0123456789", dataRichiesta: "2024-01-10", stato: "Completata", note: "Follow-up tra 3 mesi" },
        { id: 2, ambulatorio: "Oncogeriatria", tipo: "Controllo", codiceRicetta: "9876543210", dataRichiesta: "2024-01-18", stato: "Prenotata", note: "Portare esami recenti" },
        { id: 3, ambulatorio: "Osteoncologia", tipo: "Discussione", codiceRicetta: "2233445566", dataRichiesta: "2024-01-22", stato: "Da prenotare" }
      ],
      2: [
        { id: 1, ambulatorio: "Oncogeriatria", tipo: "Radioterapia", codiceRicetta: "1111222233", dataRichiesta: "2024-01-12", stato: "Disdetta", note: "Riprogrammare" }
      ],
      3: [
        { id: 1, ambulatorio: "Cure Simultanee", tipo: "Follow-up", codiceRicetta: "5566778899", dataRichiesta: "2024-01-08", stato: "Completata" }
      ],
      4: [
        { id: 1, ambulatorio: "Osteoncologia", tipo: "Valutazione", codiceRicetta: "0099887766", dataRichiesta: "2024-01-14", stato: "Prenotata" }
      ],
      5: [
        { id: 1, ambulatorio: "Osteoncologia", tipo: "Controllo", codiceRicetta: "3344556677", dataRichiesta: "2024-01-16", stato: "Completata" }
      ],
      6: [
        { id: 1, ambulatorio: "Cure Simultanee", tipo: "Prima visita", codiceRicetta: "7788990011", dataRichiesta: "2024-01-18", stato: "Da prenotare", note: "In attesa di esito" }
      ],
      999: [
        { id: 1, ambulatorio: "Cure Simultanee", tipo: "Prima visita", codiceRicetta: "1234567890", dataRichiesta: "2024-01-20", stato: "Completata" },
        { id: 2, ambulatorio: "Oncogeriatria", tipo: "Controllo", codiceRicetta: "1357913579", dataRichiesta: "2024-01-25", stato: "Prenotata" },
        { id: 3, ambulatorio: "Osteoncologia", tipo: "Discussione", codiceRicetta: "2468024680", dataRichiesta: "2024-01-28", stato: "Da prenotare", note: "Richiesta valutazione multidisciplinare" }
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
      medico: patient?.medicoPrenotazione || "Dr. Bianchi",
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

      <div className="container mx-auto px-4 py-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={() => navigate('/oncologico/case-manager')}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Torna alla Lista
            </Button>
            <div>
              <h1 className="text-2xl font-bold flex items-center gap-2">
                Dettagli Paziente - {patient.cognome} {patient.nome}
                {patient.id === 999 && (
                  <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                    Demo
                  </Badge>
                )}
              </h1>
              <p className="text-muted-foreground">CF: {patient.cf}</p>
            </div>
          </div>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export Dati Paziente
          </Button>
        </div>

        <div className="space-y-6">
          {/* Informazioni generali */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                Informazioni Generali
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3">Dati Personali</h4>
                  <div className="space-y-2 text-sm">
                    <p><strong>Nome:</strong> {patient.nome} {patient.cognome}</p>
                    <p><strong>Codice Fiscale:</strong> {patient.cf}</p>
                    <p><strong>PDTA:</strong> {patient.pdta}</p>
                    <p><strong>Score Attuale:</strong> <Badge className={getScoreColor(patient.score)}>{patient.score}</Badge></p>
                    <p><strong>Comorbidità:</strong> {patient.comorbidita.length > 0 ? patient.comorbidita.join(", ") : "Nessuna"}</p>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-3">Stato Prenotazione</h4>
                  <div className="space-y-2 text-sm">
                    <p><strong>Visita Richiesta:</strong> {patient.visitaRichiesta}</p>
                    <p><strong>Medico Mittente:</strong> {patient.medicoMittente}</p>
                    <p><strong>Quesito Diagnostico:</strong></p>
                    <div className="mt-2 p-3 bg-blue-50 rounded-lg border border-blue-200">
                      <p className="text-sm text-blue-800 italic">"{patient.quesitoDiagnostico}"</p>
                    </div>
                    {patient.slotPrenotato ? (
                      <>
                        <p><strong>Stato:</strong> <Badge className="bg-green-100 text-green-800">Prenotato</Badge></p>
                        <p><strong>Data:</strong> {patient.dataPrenotazione}</p>
                        <p><strong>Ora:</strong> {patient.oraPrenotazione}</p>
                        <p><strong>Ambulatorio:</strong> {patient.ambulatorio}</p>
                      </>
                    ) : (
                      <p><strong>Stato:</strong> <Badge variant="secondary">Da Prenotare</Badge></p>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Associazione CUP */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Gestione Prenotazione CUP
              </CardTitle>
              <CardDescription>
                Associa uno slot prenotato tramite CUP al paziente
              </CardDescription>
            </CardHeader>
            <CardContent>
              {patient.slotPrenotato ? (
                <div className="space-y-4">
                  <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span className="font-medium text-green-800">Slot CUP Associato</span>
                    </div>
                    <div className="text-sm text-green-700">
                      <p><strong>Data:</strong> {patient.dataPrenotazione}</p>
                      <p><strong>Ora:</strong> {patient.oraPrenotazione}</p>
                      <p><strong>Ambulatorio:</strong> {patient.ambulatorio}</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      onClick={handleEditPrenotazione}
                      className="flex-1 bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100"
                    >
                      <Edit className="w-4 h-4 mr-2" />
                      Modifica Prenotazione
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={() => {
                        if (confirm('Eliminare la prenotazione CUP per questo paziente?')) {
                          alert('Prenotazione eliminata con successo');
                          // In una app reale aggiorneremmo lo stato del paziente lato server
                          // Demo: non persistiamo, solo feedback utente
                        }
                      }}
                      className="flex-1 border-red-200 text-red-700 hover:bg-red-50"
                    >
                      Elimina Prenotazione
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                    <div className="flex items-center gap-2 mb-2">
                      <AlertCircle className="w-5 h-5 text-yellow-600" />
                      <span className="font-medium text-yellow-800">Slot Non Prenotato</span>
                    </div>
                    <p className="text-sm text-yellow-700">
                      Il paziente non ha ancora uno slot prenotato. Utilizza il pulsante sottostante per associare una prenotazione CUP.
                    </p>
                  </div>
                  
                  <Dialog open={showCupDialog} onOpenChange={setShowCupDialog}>
                    <DialogTrigger asChild>
                      <Button className="w-full">
                        <Plus className="w-4 h-4 mr-2" />
                        Associa Slot CUP
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                      <DialogHeader>
                        <DialogTitle>Associazione Slot CUP</DialogTitle>
                        <DialogDescription>
                          Inserisci i dettagli della prenotazione CUP per il paziente {patient.nome} {patient.cognome}
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
                            Associa Slot
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

          {/* Storico Score */}
          <Card>
            <CardHeader>
              <CardTitle>Storico Score Clinico</CardTitle>
              <CardDescription>Cronologia delle valutazioni score nel tempo</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {patient.storicoScore.map((scoreEntry, index) => (
                  <div key={index} className="p-4 bg-muted rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">{scoreEntry.data}</span>
                      <Badge className={getScoreColor(scoreEntry.score)}>
                        Score: {scoreEntry.score}
                      </Badge>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Tosse: {scoreEntry.parametri.tosse} | Dolore: {scoreEntry.parametri.dolore} | Comorbidità: {scoreEntry.parametri.comorbidita}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Storico Visite per Ambulatori */}
          <Card>
            <CardHeader>
              <CardTitle>Storico Visite</CardTitle>
              <CardDescription>Visite relative agli ambulatori con stato e note</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {getAmbulatorioVisits(patient.id).map((v) => (
                  <div key={v.id} className="p-4 border rounded-lg">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{v.tipo}</span>
                        <Badge className={getStatoBadgeColor(v.stato)}>{v.stato}</Badge>
                      </div>
                      <span className="text-sm text-muted-foreground">{v.dataRichiesta}</span>
                    </div>
                    <div className="grid md:grid-cols-3 gap-3 text-sm text-muted-foreground mb-1">
                      <div><strong>Ambulatorio:</strong> {v.ambulatorio}</div>
                      <div><strong>Codice Ricetta:</strong> {v.codiceRicetta}</div>
                      <div><strong>Data richiesta:</strong> {v.dataRichiesta}</div>
                    </div>
                    {v.note && (
                      <div className="text-sm bg-muted p-3 rounded">
                        <strong>Note:</strong> {v.note}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Sezione Esiti Esami rimossa in vista semplificata */}

          {/* Verbali Visite rimossi in vista semplificata */}

        </div>
      </div>
    </div>
  );
};

export default PazienteDetailPage;
