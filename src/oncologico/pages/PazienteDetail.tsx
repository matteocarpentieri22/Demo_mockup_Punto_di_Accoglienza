import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";
import { Checkbox } from "@/shared/components/ui/checkbox";
import { Badge } from "@/shared/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/shared/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/components/ui/select";
import { ArrowLeft, User, Calendar, FileText, Stethoscope, Clock, Eye, ClipboardList, Plus } from "lucide-react";
import { OncologicoNavbar } from "@/oncologico/components/OncologicoNavbar";
import { useNavigate, useParams } from "react-router-dom";

// Mock data per i pazienti
const mockPatients = [
  {
    id: 1,
    nome: "Mario",
    cognome: "Rossi",
    annoNascita: 1965,
    codiceFiscale: "RSSMRA65A01H501U",
    indirizzo: "Via Roma 123, 35100 Padova",
    telefono: "049 1234567",
    email: "mario.rossi@email.com",
    stato: "attesa_esenzione",
    azioneRichiesta: "Attesa esenzione"
  },
  {
    id: 2,
    nome: "Giulia",
    cognome: "Bianchi",
    annoNascita: 1978,
    codiceFiscale: "BNCGLA78B02L781P",
    indirizzo: "Via Milano 456, 35100 Padova",
    telefono: "049 2345678",
    email: "giulia.bianchi@email.com",
    stato: "attesa_prescrizione",
    azioneRichiesta: "Attesa prescrizione"
  },
  {
    id: 3,
    nome: "Antonio",
    cognome: "Verdi",
    annoNascita: 1950,
    codiceFiscale: "VRDNTN50C03F123Q",
    indirizzo: "Via Venezia 789, 35100 Padova",
    telefono: "049 3456789",
    email: "antonio.verdi@email.com",
    stato: "attesa_esami",
    azioneRichiesta: "Attesa esami"
  },
  {
    id: 4,
    nome: "Elena",
    cognome: "Neri",
    annoNascita: 1982,
    codiceFiscale: "NRELNA82D04G456R",
    indirizzo: "Via Firenze 321, 35100 Padova",
    telefono: "049 4567890",
    email: "elena.neri@email.com",
    stato: "in_trattamento",
    azioneRichiesta: "In trattamento"
  },
  {
    id: 5,
    nome: "Francesco",
    cognome: "Gialli",
    annoNascita: 1970,
    codiceFiscale: "GLLFRC70E05I789S",
    indirizzo: "Via Torino 654, 35100 Padova",
    telefono: "049 5678901",
    email: "francesco.gialli@email.com",
    stato: "pronto_gom",
    azioneRichiesta: "Pronto per GOM"
  }
];

// Mock data per i questionari disponibili
const availableQuestionnaires = [
  {
    id: 1,
    nome: "Questionario Sintomi",
    descrizione: "Valutazione dei sintomi attuali e impatto sulla qualità di vita",
    categoria: "Sintomatologia",
    durata: "5-10 minuti",
    domande: 15
  },
  {
    id: 2,
    nome: "Questionario Qualità di Vita",
    descrizione: "Valutazione della qualità di vita e benessere generale",
    categoria: "Qualità di Vita",
    durata: "10-15 minuti",
    domande: 25
  },
  {
    id: 3,
    nome: "Questionario Follow-up",
    descrizione: "Monitoraggio post-trattamento e effetti collaterali",
    categoria: "Follow-up",
    durata: "8-12 minuti",
    domande: 20
  },
  {
    id: 4,
    nome: "Questionario Ansia e Depressione",
    descrizione: "Screening per disturbi dell'umore e ansia",
    categoria: "Psicologico",
    durata: "5-8 minuti",
    domande: 12
  }
];

// Mock data per questionari assegnati
const getAssignedQuestionnaires = (patientId: number) => {
  return [
    {
      id: 1,
      questionarioId: 1,
      nome: "Questionario Sintomi",
      dataAssegnazione: "2024-01-20",
      scadenza: "2024-01-27",
      stato: "completato",
      dataCompletamento: "2024-01-22",
      risposte: 15
    },
    {
      id: 2,
      questionarioId: 2,
      nome: "Questionario Qualità di Vita",
      dataAssegnazione: "2024-01-25",
      scadenza: "2024-02-01",
      stato: "in_corso",
      dataCompletamento: null,
      risposte: 8
    }
  ];
};

// Mock data per i risultati dei questionari
const getQuestionnaireResults = (questionnaireId: number) => {
  switch (questionnaireId) {
    case 1: // Questionario Sintomi
      return {
        titolo: "Questionario Sintomi",
        dataCompletamento: "2024-01-22",
        durataCompilazione: "7 minuti",
        risposte: [
          { domanda: "Hai difficoltà respiratorie?", risposta: "Sì, moderata", punteggio: 3 },
          { domanda: "Hai dolore al petto?", risposta: "No", punteggio: 0 },
          { domanda: "Hai tosse persistente?", risposta: "Sì, grave", punteggio: 4 },
          { domanda: "Hai perdita di peso?", risposta: "Sì, 5-10 kg", punteggio: 3 },
          { domanda: "Hai stanchezza?", risposta: "Sì, moderata", punteggio: 2 },
          { domanda: "Hai difficoltà a dormire?", risposta: "Sì, grave", punteggio: 4 },
          { domanda: "Hai perdita di appetito?", risposta: "Sì, moderata", punteggio: 2 },
          { domanda: "Hai nausea?", risposta: "No", punteggio: 0 },
          { domanda: "Hai febbre?", risposta: "No", punteggio: 0 },
          { domanda: "Hai sudorazione notturna?", risposta: "Sì, moderata", punteggio: 2 },
          { domanda: "Hai difficoltà a concentrarti?", risposta: "Sì, moderata", punteggio: 2 },
          { domanda: "Hai cambiamenti nell'umore?", risposta: "Sì, moderati", punteggio: 2 },
          { domanda: "Hai difficoltà nelle attività quotidiane?", risposta: "Sì, moderata", punteggio: 3 },
          { domanda: "Hai bisogno di aiuto per vestirti?", risposta: "No", punteggio: 0 },
          { domanda: "Hai difficoltà a camminare?", risposta: "Sì, moderata", punteggio: 2 }
        ],
        punteggioTotale: 29,
        punteggioMassimo: 60,
        interpretazione: "Sintomatologia moderata. Il paziente presenta sintomi significativi che impattano sulla qualità di vita. Raccomandato follow-up clinico entro 1 settimana.",
        raccomandazioni: [
          "Monitoraggio stretto dei sintomi respiratori",
          "Valutazione per supporto nutrizionale",
          "Considerare supporto psicologico per disturbi del sonno",
          "Controllo clinico programmato"
        ]
      };
    case 2: // Questionario Qualità di Vita
      return {
        titolo: "Questionario Qualità di Vita",
        dataCompletamento: "2024-01-25",
        durataCompilazione: "12 minuti",
        risposte: [
          { domanda: "Come valuti la tua salute generale?", risposta: "Discreta", punteggio: 3 },
          { domanda: "Hai energia per le attività quotidiane?", risposta: "Poca energia", punteggio: 2 },
          { domanda: "Hai dolore fisico?", risposta: "Dolore moderato", punteggio: 3 },
          { domanda: "Il dolore interferisce con le tue attività?", risposta: "Sì, moderatamente", punteggio: 3 },
          { domanda: "Hai difficoltà emotive?", risposta: "Alcune difficoltà", punteggio: 2 },
          { domanda: "Ti senti ansioso?", risposta: "Moderatamente", punteggio: 3 },
          { domanda: "Ti senti depresso?", risposta: "Moderatamente", punteggio: 3 },
          { domanda: "Hai difficoltà sociali?", risposta: "Alcune difficoltà", punteggio: 2 },
          { domanda: "Hai supporto familiare?", risposta: "Supporto buono", punteggio: 4 },
          { domanda: "Hai supporto amicale?", risposta: "Supporto discreto", punteggio: 3 },
          { domanda: "Hai difficoltà lavorative?", risposta: "Alcune difficoltà", punteggio: 2 },
          { domanda: "Hai difficoltà nei rapporti?", risposta: "Poche difficoltà", punteggio: 3 },
          { domanda: "Hai difficoltà sessuali?", risposta: "Alcune difficoltà", punteggio: 2 },
          { domanda: "Hai difficoltà nel sonno?", risposta: "Difficoltà moderate", punteggio: 2 },
          { domanda: "Hai difficoltà nell'alimentazione?", risposta: "Alcune difficoltà", punteggio: 2 },
          { domanda: "Hai difficoltà nell'esercizio?", risposta: "Difficoltà moderate", punteggio: 2 },
          { domanda: "Hai difficoltà nel tempo libero?", risposta: "Alcune difficoltà", punteggio: 2 },
          { domanda: "Hai difficoltà finanziarie?", risposta: "Alcune difficoltà", punteggio: 2 },
          { domanda: "Hai difficoltà spirituali?", risposta: "Poche difficoltà", punteggio: 3 },
          { domanda: "Hai speranza per il futuro?", risposta: "Speranza moderata", punteggio: 3 },
          { domanda: "Hai controllo sulla tua vita?", risposta: "Controllo discreto", punteggio: 3 },
          { domanda: "Hai senso di scopo?", risposta: "Senso moderato", punteggio: 3 },
          { domanda: "Hai difficoltà nell'accettazione?", risposta: "Alcune difficoltà", punteggio: 2 },
          { domanda: "Hai difficoltà nella comunicazione?", risposta: "Poche difficoltà", punteggio: 3 },
          { domanda: "Hai difficoltà nell'autonomia?", risposta: "Alcune difficoltà", punteggio: 2 }
        ],
        punteggioTotale: 58,
        punteggioMassimo: 100,
        interpretazione: "Qualità di vita moderatamente compromessa. Il paziente presenta difficoltà significative in diverse aree della vita quotidiana. Raccomandato supporto multidisciplinare.",
        raccomandazioni: [
          "Valutazione psicologica per ansia e depressione",
          "Supporto nutrizionale per difficoltà alimentari",
          "Terapia del dolore per sintomi fisici",
          "Supporto sociale e familiare",
          "Programma di esercizio fisico adattato"
        ]
      };
    default:
      return null;
  }
};

const getExamsForPatient = (patientId: number) => {
  // Per Francesco Gialli (ID 5 - Pronto per GOM), tutti gli esami sono completati
  if (patientId === 5) {
    return [
      { 
        tipo: "TAC", 
        data: "2024-01-15", 
        completato: true,
        esito: "Presenza di lesione nodulare di 2.5 cm nel lobo superiore destro. Margini irregolari, sospetta per neoplasia."
      },
      { 
        tipo: "PET", 
        data: "2024-01-20", 
        completato: true,
        esito: "Ipercaptazione focale a livello della lesione polmonare (SUV max 8.2). Nessuna metastasi a distanza evidenziata."
      },
      { 
        tipo: "Biopsia", 
        data: "2024-01-25", 
        completato: true,
        esito: "Adenocarcinoma polmonare ben differenziato. Positività per TTF-1 e napsin A."
      }
    ];
  }
  
  // Per altri pazienti, esami standard con biopsia in attesa
  return [
    { 
      tipo: "TAC", 
      data: "2024-01-15", 
      completato: true,
      esito: "Presenza di lesione nodulare di 2.5 cm nel lobo superiore destro. Margini irregolari, sospetta per neoplasia."
    },
    { 
      tipo: "PET", 
      data: "2024-01-20", 
      completato: true,
      esito: "Ipercaptazione focale a livello della lesione polmonare (SUV max 8.2). Nessuna metastasi a distanza evidenziata."
    },
    { 
      tipo: "Biopsia", 
      data: "2024-01-25", 
      completato: false,
      esito: null
    }
  ];
};

const PazienteDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  
  // Trova il paziente basato sull'ID dalla URL
  const patient = mockPatients.find(p => p.id === parseInt(id || '0')) || mockPatients[0];
  
  // Ottieni gli esami per questo paziente
  const mockExams = getExamsForPatient(patient.id);
  
  // Ottieni i questionari assegnati per questo paziente
  const assignedQuestionnaires = getAssignedQuestionnaires(patient.id);
  
  // Se il paziente è "pronto_gom", tutte le checklist sono già spuntate
  const [percorsoState, setPercorsoState] = useState({
    esamiCompletati: patient.stato === "pronto_gom",
    documentiDisponibili: patient.stato === "pronto_gom",
    idoneoChirurgia: patient.stato === "pronto_gom",
    gomPrevisto: patient.stato === "pronto_gom"
  });

  // Stato per gestire i questionari
  const [questionnaireDialogOpen, setQuestionnaireDialogOpen] = useState(false);
  const [resultsDialogOpen, setResultsDialogOpen] = useState(false);
  const [selectedQuestionnaireId, setSelectedQuestionnaireId] = useState<number | null>(null);

  const handleCheckboxChange = (field: keyof typeof percorsoState) => {
    setPercorsoState(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const handleAssignQuestionnaire = (questionnaireId: number) => {
    // Qui implementeresti la logica per assegnare il questionario
    console.log(`Assegnando questionario ${questionnaireId} al paziente ${patient.id}`);
    setQuestionnaireDialogOpen(false);
    // In una implementazione reale, qui faresti una chiamata API
  };

  const handleViewResults = (questionnaireId: number) => {
    setSelectedQuestionnaireId(questionnaireId);
    setResultsDialogOpen(true);
  };

  const getQuestionnaireStatusBadge = (stato: string) => {
    switch (stato) {
      case "completato":
        return <Badge variant="default" className="bg-green-100 text-green-800">Completato</Badge>;
      case "in_corso":
        return <Badge variant="secondary" className="bg-blue-100 text-blue-800">In corso</Badge>;
      case "scaduto":
        return <Badge variant="destructive" className="bg-red-100 text-red-800">Scaduto</Badge>;
      default:
        return <Badge variant="secondary">Sconosciuto</Badge>;
    }
  };

  const getStatusBadge = (stato: string) => {
    switch (stato) {
      case "attesa_esenzione":
        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">Attesa Esenzione</Badge>;
      case "attesa_prescrizione":
        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">Attesa Prescrizione</Badge>;
      case "attesa_esami":
        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">Attesa Esami</Badge>;
      case "in_trattamento":
        return <Badge variant="secondary" className="bg-blue-100 text-blue-800">In Trattamento</Badge>;
      case "pronto_gom":
        return <Badge variant="secondary" className="bg-green-100 text-green-800">Pronto per GOM</Badge>;
      case "follow_up":
        return <Badge variant="secondary" className="bg-green-100 text-green-800">Follow-up</Badge>;
      default:
        return <Badge variant="secondary">Sconosciuto</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <OncologicoNavbar />

      <div className="container mx-auto px-4 py-8 flex-1">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Button variant="ghost" size="sm" onClick={() => navigate('/oncologico/pazienti')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Torna alla lista
          </Button>
          
          {/* Beautiful Workflow Progress */}
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground font-medium">Percorso:</span>
              
              {/* Workflow Steps */}
              <div className="flex items-center gap-2">
                {/* Step 1: Esenzione */}
                <div className="flex flex-col items-center gap-1">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold transition-all duration-300 ${
                    patient.stato === 'attesa_esenzione' 
                      ? 'bg-yellow-500 text-white shadow-lg animate-pulse' 
                      : ['attesa_prescrizione', 'attesa_esami', 'pronto_gom', 'in_trattamento'].includes(patient.stato)
                      ? 'bg-green-500 text-white shadow-md'
                      : 'bg-gray-300 text-gray-600'
                  }`}>
                    {['attesa_prescrizione', 'attesa_esami', 'pronto_gom', 'in_trattamento'].includes(patient.stato) ? '✓' : '1'}
                  </div>
                  <span className={`text-xs font-medium transition-colors ${
                    patient.stato === 'attesa_esenzione' 
                      ? 'text-yellow-600' 
                      : ['attesa_prescrizione', 'attesa_esami', 'pronto_gom', 'in_trattamento'].includes(patient.stato)
                      ? 'text-green-600'
                      : 'text-gray-500'
                  }`}>
                    Esenzione
                  </span>
                </div>

                {/* Connector Line */}
                <div className={`w-8 h-0.5 rounded-full transition-colors ${
                  ['attesa_prescrizione', 'attesa_esami', 'pronto_gom', 'in_trattamento'].includes(patient.stato)
                    ? 'bg-green-500'
                    : 'bg-gray-300'
                }`}></div>

                {/* Step 2: Prescrizione */}
                <div className="flex flex-col items-center gap-1">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold transition-all duration-300 ${
                    patient.stato === 'attesa_prescrizione' 
                      ? 'bg-yellow-500 text-white shadow-lg animate-pulse' 
                      : ['attesa_esami', 'pronto_gom', 'in_trattamento'].includes(patient.stato)
                      ? 'bg-green-500 text-white shadow-md'
                      : 'bg-gray-300 text-gray-600'
                  }`}>
                    {['attesa_esami', 'pronto_gom', 'in_trattamento'].includes(patient.stato) ? '✓' : '2'}
                  </div>
                  <span className={`text-xs font-medium transition-colors ${
                    patient.stato === 'attesa_prescrizione' 
                      ? 'text-yellow-600' 
                      : ['attesa_esami', 'pronto_gom', 'in_trattamento'].includes(patient.stato)
                      ? 'text-green-600'
                      : 'text-gray-500'
                  }`}>
                    Prescrizione
                  </span>
                </div>

                {/* Connector Line */}
                <div className={`w-8 h-0.5 rounded-full transition-colors ${
                  ['attesa_esami', 'pronto_gom', 'in_trattamento'].includes(patient.stato)
                    ? 'bg-green-500'
                    : 'bg-gray-300'
                }`}></div>

                {/* Step 3: Esami */}
                <div className="flex flex-col items-center gap-1">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold transition-all duration-300 ${
                    patient.stato === 'attesa_esami' 
                      ? 'bg-yellow-500 text-white shadow-lg animate-pulse' 
                      : ['pronto_gom', 'in_trattamento'].includes(patient.stato)
                      ? 'bg-green-500 text-white shadow-md'
                      : 'bg-gray-300 text-gray-600'
                  }`}>
                    {['pronto_gom', 'in_trattamento'].includes(patient.stato) ? '✓' : '3'}
                  </div>
                  <span className={`text-xs font-medium transition-colors ${
                    patient.stato === 'attesa_esami' 
                      ? 'text-yellow-600' 
                      : ['pronto_gom', 'in_trattamento'].includes(patient.stato)
                      ? 'text-green-600'
                      : 'text-gray-500'
                  }`}>
                    Esami
                  </span>
                </div>

                {/* Connector Line */}
                <div className={`w-8 h-0.5 rounded-full transition-colors ${
                  ['pronto_gom', 'in_trattamento'].includes(patient.stato)
                    ? 'bg-green-500'
                    : 'bg-gray-300'
                }`}></div>

                {/* Step 4: GOM */}
                <div className="flex flex-col items-center gap-1">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold transition-all duration-300 ${
                    patient.stato === 'pronto_gom' 
                      ? 'bg-green-500 text-white shadow-lg animate-pulse' 
                      : patient.stato === 'in_trattamento'
                      ? 'bg-green-500 text-white shadow-md'
                      : 'bg-gray-300 text-gray-600'
                  }`}>
                    {patient.stato === 'in_trattamento' ? '✓' : '4'}
                  </div>
                  <span className={`text-xs font-medium transition-colors ${
                    patient.stato === 'pronto_gom' 
                      ? 'text-green-600' 
                      : patient.stato === 'in_trattamento'
                      ? 'text-green-600'
                      : 'text-gray-500'
                  }`}>
                    GOM
                  </span>
                </div>

                {/* Connector Line */}
                <div className={`w-8 h-0.5 rounded-full transition-colors ${
                  patient.stato === 'in_trattamento'
                    ? 'bg-blue-500'
                    : 'bg-gray-300'
                }`}></div>

                {/* Step 5: Trattamento */}
                <div className="flex flex-col items-center gap-1">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold transition-all duration-300 ${
                    patient.stato === 'in_trattamento' 
                      ? 'bg-blue-500 text-white shadow-lg animate-pulse' 
                      : 'bg-gray-300 text-gray-600'
                  }`}>
                    {patient.stato === 'in_trattamento' ? '✓' : '5'}
                  </div>
                  <span className={`text-xs font-medium transition-colors ${
                    patient.stato === 'in_trattamento' 
                      ? 'text-blue-600' 
                      : 'text-gray-500'
                  }`}>
                    Trattamento
                  </span>
                </div>
              </div>
            </div>
            {getStatusBadge(patient.stato)}
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Anagrafica */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                Dati Anagrafici
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Nome</label>
                  <p className="text-lg">{patient.nome}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Cognome</label>
                  <p className="text-lg">{patient.cognome}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Anno di nascita</label>
                  <p className="text-lg">{patient.annoNascita}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Codice Fiscale</label>
                  <p className="text-lg font-mono">{patient.codiceFiscale}</p>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Indirizzo</label>
                <p className="text-lg">{patient.indirizzo}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Telefono</label>
                  <p className="text-lg">{patient.telefono}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Email</label>
                  <p className="text-lg">{patient.email}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Esami Pregressi */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Esami Pregressi
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockExams.map((exam, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${exam.completato ? 'bg-green-500' : 'bg-yellow-500'}`} />
                      <div>
                        <p className="font-medium">{exam.tipo}</p>
                        <p className="text-sm text-muted-foreground">{exam.data}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={exam.completato ? "default" : "secondary"}>
                        {exam.completato ? "Completato" : "In attesa"}
                      </Badge>
                      {exam.esito && (
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm">
                              <Eye className="w-4 h-4 mr-1" />
                              Esito
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle>Esito Sintetico - {exam.tipo}</DialogTitle>
                              <DialogDescription>
                                Data esame: {exam.data}
                              </DialogDescription>
                            </DialogHeader>
                            <div className="mt-4 p-4 bg-muted/50 rounded-lg">
                              <p className="text-sm leading-relaxed">{exam.esito}</p>
                            </div>
                          </DialogContent>
                        </Dialog>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Questionari */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <ClipboardList className="w-5 h-5" />
                    Questionari Digitali
                  </CardTitle>
                  <CardDescription>
                    Gestisci i questionari di autovalutazione e monitoraggio clinico
                  </CardDescription>
                </div>
                <Dialog open={questionnaireDialogOpen} onOpenChange={setQuestionnaireDialogOpen}>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="w-4 h-4 mr-2" />
                      Assegna Questionario
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Assegna Questionario</DialogTitle>
                      <DialogDescription>
                        Seleziona il tipo di questionario da assegnare al paziente {patient.nome} {patient.cognome}
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 mt-4">
                      {availableQuestionnaires.map((questionnaire) => (
                        <div key={questionnaire.id} className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              <h4 className="font-medium">{questionnaire.nome}</h4>
                              <p className="text-sm text-muted-foreground mt-1">{questionnaire.descrizione}</p>
                              <div className="flex gap-4 mt-2 text-xs text-muted-foreground">
                                <span>Categoria: {questionnaire.categoria}</span>
                                <span>Durata: {questionnaire.durata}</span>
                                <span>Domande: {questionnaire.domande}</span>
                              </div>
                            </div>
                            <Button 
                              size="sm" 
                              onClick={() => handleAssignQuestionnaire(questionnaire.id)}
                              className="ml-4"
                            >
                              Assegna
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {assignedQuestionnaires.length > 0 ? (
                  assignedQuestionnaires.map((questionnaire) => (
                    <div key={questionnaire.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full ${
                          questionnaire.stato === 'completato' ? 'bg-green-500' : 
                          questionnaire.stato === 'in_corso' ? 'bg-blue-500' : 'bg-yellow-500'
                        }`} />
                        <div>
                          <p className="font-medium">{questionnaire.nome}</p>
                          <p className="text-sm text-muted-foreground">
                            Assegnato il {questionnaire.dataAssegnazione} • Scadenza: {questionnaire.scadenza}
                          </p>
                          {questionnaire.stato === 'in_corso' && (
                            <p className="text-xs text-blue-600 mt-1">
                              {questionnaire.risposte} risposte completate
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {getQuestionnaireStatusBadge(questionnaire.stato)}
                        {questionnaire.stato === 'completato' && (
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleViewResults(questionnaire.questionarioId)}
                          >
                            <Eye className="w-4 h-4 mr-1" />
                            Visualizza Risultati
                          </Button>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <ClipboardList className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>Nessun questionario assegnato</p>
                    <p className="text-sm">Clicca su "Assegna Questionario" per iniziare</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Stato Percorso */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Stethoscope className="w-5 h-5" />
                Stato Percorso PDTA
              </CardTitle>
              <CardDescription>
                Checklist per monitorare l'avanzamento del percorso diagnostico-terapeutico
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="esami-completati"
                      checked={percorsoState.esamiCompletati}
                      onCheckedChange={() => handleCheckboxChange('esamiCompletati')}
                    />
                    <label htmlFor="esami-completati" className="text-sm font-medium">
                      Esami completati
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="documenti-disponibili"
                      checked={percorsoState.documentiDisponibili}
                      onCheckedChange={() => handleCheckboxChange('documentiDisponibili')}
                    />
                    <label htmlFor="documenti-disponibili" className="text-sm font-medium">
                      Documenti disponibili
                    </label>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="idoneo-chirurgia"
                      checked={percorsoState.idoneoChirurgia}
                      onCheckedChange={() => handleCheckboxChange('idoneoChirurgia')}
                    />
                    <label htmlFor="idoneo-chirurgia" className="text-sm font-medium">
                      Idoneo per chirurgia
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="gom-previsto"
                      checked={percorsoState.gomPrevisto}
                      onCheckedChange={() => handleCheckboxChange('gomPrevisto')}
                    />
                    <label htmlFor="gom-previsto" className="text-sm font-medium">
                      GOM previsto
                    </label>
                  </div>
                </div>
              </div>

              {/* Progress Summary */}
              <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="w-4 h-4 text-primary" />
                  <span className="font-medium">Avanzamento Percorso</span>
                </div>
                <div className="flex gap-2">
                  {Object.values(percorsoState).map((completed, index) => (
                    <div
                      key={index}
                      className={`w-8 h-2 rounded-full ${completed ? 'bg-primary' : 'bg-muted'}`}
                    />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  {Object.values(percorsoState).filter(Boolean).length} di {Object.keys(percorsoState).length} step completati
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t bg-card">
        <div className="container mx-auto px-4 py-8 text-center text-sm text-muted-foreground">
          <p>© 2025 Istituto Oncologico Veneto - Tutti i diritti riservati</p>
          <p className="mt-2">Sistema demo per medici di medicina generale</p>
        </div>
      </footer>

      {/* Dialog Risultati Questionario */}
      <Dialog open={resultsDialogOpen} onOpenChange={setResultsDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              Risultati Questionario - {selectedQuestionnaireId && getQuestionnaireResults(selectedQuestionnaireId)?.titolo}
            </DialogTitle>
            <DialogDescription>
              Paziente: {patient.nome} {patient.cognome} • 
              Data completamento: {selectedQuestionnaireId && getQuestionnaireResults(selectedQuestionnaireId)?.dataCompletamento} • 
              Durata: {selectedQuestionnaireId && getQuestionnaireResults(selectedQuestionnaireId)?.durataCompilazione}
            </DialogDescription>
          </DialogHeader>
          
          {selectedQuestionnaireId && (() => {
            const results = getQuestionnaireResults(selectedQuestionnaireId);
            if (!results) return null;
            
            return (
              <div className="space-y-6 mt-4">
                {/* Punteggio Totale */}
                <div className="bg-primary/10 p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-lg">Punteggio Totale</h3>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-primary">
                        {results.punteggioTotale}/{results.punteggioMassimo}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {Math.round((results.punteggioTotale / results.punteggioMassimo) * 100)}%
                      </div>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className="bg-primary h-3 rounded-full transition-all duration-300"
                      style={{ width: `${(results.punteggioTotale / results.punteggioMassimo) * 100}%` }}
                    />
                  </div>
                </div>

                {/* Interpretazione */}
                <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-400">
                  <h3 className="font-semibold text-blue-900 mb-2">Interpretazione Clinica</h3>
                  <p className="text-blue-800">{results.interpretazione}</p>
                </div>

                {/* Raccomandazioni */}
                <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-400">
                  <h3 className="font-semibold text-green-900 mb-3">Raccomandazioni</h3>
                  <ul className="space-y-2">
                    {results.raccomandazioni.map((raccomandazione, index) => (
                      <li key={index} className="flex items-start gap-2 text-green-800">
                        <span className="text-green-600 font-bold">•</span>
                        <span>{raccomandazione}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Dettaglio Risposte */}
                <div>
                  <h3 className="font-semibold mb-4">Dettaglio Risposte</h3>
                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {results.risposte.map((risposta, index) => (
                      <div key={index} className="border rounded-lg p-3 hover:bg-muted/50 transition-colors">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium text-sm">{risposta.domanda}</span>
                          <Badge variant={risposta.punteggio > 0 ? "destructive" : "secondary"} className="text-xs">
                            {risposta.punteggio} pt
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{risposta.risposta}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })()}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PazienteDetail;
