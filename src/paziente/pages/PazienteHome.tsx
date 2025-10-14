import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";
import { Badge } from "@/shared/components/ui/badge";
import { Progress } from "@/shared/components/ui/progress";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/shared/components/ui/dialog";
import { 
  User, 
  FileText, 
  ClipboardList, 
  Calendar, 
  Shield, 
  Heart, 
  Stethoscope,
  Clock,
  CheckCircle,
  AlertCircle,
  Info,
  ArrowRight,
  Activity,
  Calendar as CalendarIcon,
  Pill,
  TestTube,
  TrendingUp,
  Phone,
  Mail,
  CalendarDays,
  UserCheck,
  Percent
} from "lucide-react";
import PazienteNavbar from "@/paziente/components/PazienteNavbar";

// Mock data per il paziente
const patientData = {
  nome: "Davide",
  cognome: "Verdi",
  codiceFiscale: "RSSMRA65A01H501U",
  dataNascita: "15/01/1965",
  telefono: "049 1234567",
  email: "davide.verdi@email.com",
  indirizzo: "Via Roma 123, 35100 Padova",
  esenzione: "Tumore Polmone",
  invalidita: "67%",
  statoPercorso: "in_trattamento",
  prossimoAppuntamento: "15/02/2025",
  medicoResponsabile: "Dr. Bianchi"
};

// Mock data per le informazioni cliniche
const clinicalInfo = {
  diagnosi: "Adenocarcinoma polmonare T2N1M0",
  stadio: "IIIA",
  dataDiagnosi: "15/01/2024",
  trattamento: "Chemioterapia + Radioterapia",
  prossimiEsami: [
    { tipo: "TAC", data: "20/02/2025", scopo: "Valutazione risposta" },
    { tipo: "PET", data: "25/02/2025", scopo: "Staging completo" }
  ],
  effettiCollaterali: [
    "Nausea moderata",
    "Stanchezza",
    "Perdita di capelli"
  ]
};

// Mock data per i questionari assegnati
const assignedQuestionnaires = [
  {
    id: 1,
    nome: "Questionario Sintomi",
    descrizione: "Valutazione dei sintomi attuali",
    scadenza: "2025-02-15",
    stato: "da_compilare",
    progresso: 0,
    domandeTotali: 15,
    domandeCompletate: 0
  },
  {
    id: 2,
    nome: "Questionario Qualità di Vita",
    descrizione: "Valutazione della qualità di vita",
    scadenza: "2025-02-20",
    stato: "in_corso",
    progresso: 40,
    domandeTotali: 25,
    domandeCompletate: 10
  }
];

// Mock data per le domande del questionario
const questionnaireQuestions = {
  1: [ // Questionario Sintomi
    {
      id: 1,
      domanda: "Hai difficoltà respiratorie?",
      tipo: "radio",
      opzioni: ["No", "Sì, lieve", "Sì, moderata", "Sì, grave"]
    },
    {
      id: 2,
      domanda: "Hai dolore al petto?",
      tipo: "radio",
      opzioni: ["No", "Sì, lieve", "Sì, moderato", "Sì, grave"]
    },
    {
      id: 3,
      domanda: "Quali di questi sintomi hai riscontrato?",
      tipo: "checkbox",
      opzioni: ["Tosse persistente", "Stanchezza", "Perdita di peso", "Febbre", "Sudorazione notturna"]
    },
    {
      id: 4,
      domanda: "Come valuti la tua qualità del sonno?",
      tipo: "radio",
      opzioni: ["Ottima", "Buona", "Discreta", "Scarsa"]
    },
    {
      id: 5,
      domanda: "Descrivi eventuali altri sintomi o preoccupazioni:",
      tipo: "textarea"
    }
  ],
  2: [ // Questionario Qualità di Vita
    {
      id: 1,
      domanda: "Come valuti la tua salute generale?",
      tipo: "radio",
      opzioni: ["Eccellente", "Buona", "Discreta", "Scarsa"]
    },
    {
      id: 2,
      domanda: "Hai energia per le attività quotidiane?",
      tipo: "radio",
      opzioni: ["Molta energia", "Energia normale", "Poca energia", "Nessuna energia"]
    },
    {
      id: 3,
      domanda: "Hai dolore fisico?",
      tipo: "radio",
      opzioni: ["Nessun dolore", "Dolore lieve", "Dolore moderato", "Dolore grave"]
    },
    {
      id: 4,
      domanda: "Ti senti ansioso o depresso?",
      tipo: "radio",
      opzioni: ["Mai", "Raramente", "Spesso", "Sempre"]
    },
    {
      id: 5,
      domanda: "Hai difficoltà nelle attività sociali?",
      tipo: "radio",
      opzioni: ["Nessuna difficoltà", "Poche difficoltà", "Alcune difficoltà", "Molte difficoltà"]
    }
  ]
};

const PazienteHome = () => {
  const [selectedQuestionnaire, setSelectedQuestionnaire] = useState<number | null>(null);
  const [previewDialogOpen, setPreviewDialogOpen] = useState(false);
  const [previewQuestionnaireId, setPreviewQuestionnaireId] = useState<number | null>(null);

  const getStatusBadge = (stato: string) => {
    switch (stato) {
      case "da_compilare":
        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">Da compilare</Badge>;
      case "in_corso":
        return <Badge variant="secondary" className="bg-blue-100 text-blue-800">In corso</Badge>;
      case "completato":
        return <Badge variant="default" className="bg-green-100 text-green-800">Completato</Badge>;
      case "scaduto":
        return <Badge variant="destructive" className="bg-red-100 text-red-800">Scaduto</Badge>;
      default:
        return <Badge variant="secondary">Sconosciuto</Badge>;
    }
  };

  const getPercorsoStatusBadge = (stato: string) => {
    switch (stato) {
      case "in_trattamento":
        return <Badge variant="secondary" className="bg-blue-100 text-blue-800">In Trattamento</Badge>;
      case "follow_up":
        return <Badge variant="secondary" className="bg-green-100 text-green-800">Follow-up</Badge>;
      case "guarigione":
        return <Badge variant="default" className="bg-green-100 text-green-800">Guarigione</Badge>;
      default:
        return <Badge variant="secondary">Sconosciuto</Badge>;
    }
  };

  const handlePreviewQuestionnaire = (questionnaireId: number) => {
    setPreviewQuestionnaireId(questionnaireId);
    setPreviewDialogOpen(true);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <PazienteNavbar />

      <div className="container mx-auto px-4 py-8 flex-1">
        {/* Header Benvenuto */}

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Informazioni Personali */}
          <Card className="border-2 border-primary/20 bg-gradient-to-br from-gray-50/50 to-slate-50/50 shadow-lg">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <User className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-xl sm:text-2xl font-bold text-primary">
                    Informazioni Personali
                  </CardTitle>
                  <CardDescription className="text-sm sm:text-base">
                    I tuoi dati personali e di contatto
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0 space-y-2">
              <div className="p-1.5 sm:p-2 bg-white/70 rounded-md border border-primary/10 shadow-sm">
                <div className="flex items-center gap-1.5 mb-1">
                  <div className="p-0.5 sm:p-1 bg-blue-100 rounded-sm">
                    <User className="w-3 h-3 text-blue-600" />
                  </div>
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Nome Completo</label>
                </div>
                <p className="text-sm sm:text-base font-bold text-gray-900">{patientData.nome} {patientData.cognome}</p>
              </div>

              <div className="p-1.5 sm:p-2 bg-white/70 rounded-md border border-primary/10 shadow-sm">
                <div className="flex items-center gap-1.5 mb-1">
                  <div className="p-0.5 sm:p-1 bg-green-100 rounded-sm">
                    <CalendarDays className="w-3 h-3 text-green-600" />
                  </div>
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Data di Nascita</label>
                </div>
                <p className="text-sm font-semibold text-gray-900">{patientData.dataNascita}</p>
              </div>

              <div className="p-1.5 sm:p-2 bg-white/70 rounded-md border border-primary/10 shadow-sm">
                <div className="flex items-center gap-1.5 mb-1">
                  <div className="p-0.5 sm:p-1 bg-purple-100 rounded-sm">
                    <FileText className="w-3 h-3 text-purple-600" />
                  </div>
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Codice Fiscale</label>
                </div>
                <p className="text-sm font-mono font-semibold text-gray-900">{patientData.codiceFiscale}</p>
              </div>

              <div className="p-1.5 sm:p-2 bg-white/70 rounded-md border border-primary/10 shadow-sm">
                <div className="flex items-center gap-1.5 mb-1">
                  <div className="p-0.5 sm:p-1 bg-orange-100 rounded-sm">
                    <Phone className="w-3 h-3 text-orange-600" />
                  </div>
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Telefono</label>
                </div>
                <p className="text-sm font-semibold text-gray-900">{patientData.telefono}</p>
              </div>

              <div className="p-1.5 sm:p-2 bg-white/70 rounded-md border border-primary/10 shadow-sm">
                <div className="flex items-center gap-1.5 mb-1">
                  <div className="p-0.5 sm:p-1 bg-red-100 rounded-sm">
                    <Mail className="w-3 h-3 text-red-600" />
                  </div>
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Email</label>
                </div>
                <p className="text-sm font-semibold text-gray-900">{patientData.email}</p>
              </div>
            </CardContent>
          </Card>

          {/* Esenzioni e Invalidità */}
          <Card className="border-2 border-primary/20 bg-gradient-to-br from-gray-50/50 to-slate-50/50 shadow-lg">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-xl sm:text-2xl font-bold text-primary">
                    Esenzioni e Invalidità
                  </CardTitle>
                  <CardDescription className="text-sm sm:text-base">
                    I tuoi benefici e riconoscimenti sanitari
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-4">
                {/* Esenzione */}
                <div className="flex items-center justify-between p-3 bg-white/70 rounded-lg border border-primary/10 shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <label className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Esenzione</label>
                      <p className="text-lg font-bold text-gray-900 mt-1">{patientData.esenzione}</p>
                    </div>
                  </div>
                  <Badge variant="outline" className="bg-green-50 border-green-200 text-green-800 font-bold">
                    Attiva
                  </Badge>
                </div>

                {/* Invalidità */}
                <div className="flex items-center justify-between p-3 bg-white/70 rounded-lg border border-primary/10 shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Percent className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <label className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Invalidità</label>
                      <p className="text-lg font-bold text-gray-900 mt-1">{patientData.invalidita}</p>
                    </div>
                  </div>
                  <Badge variant="outline" className="bg-blue-50 border-blue-200 text-blue-800 font-bold">
                    Riconosciuta
                  </Badge>
                </div>

                {/* Medico Responsabile */}
                <div className="flex items-center justify-between p-3 bg-white/70 rounded-lg border border-primary/10 shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-purple-100 rounded-lg">
                      <UserCheck className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <label className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Medico Responsabile</label>
                      <p className="text-lg font-bold text-gray-900 mt-1">{patientData.medicoResponsabile}</p>
                    </div>
                  </div>
                  <Badge variant="outline" className="bg-purple-50 border-purple-200 text-purple-800 font-bold">
                    Oncologo
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Prossimo Appuntamento */}
          <Card className="border-2 border-primary/20 bg-gradient-to-br from-gray-50/50 to-slate-50/50 shadow-lg">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-xl sm:text-2xl font-bold text-primary">
                    Prossimo Appuntamento
                  </CardTitle>
                  <CardDescription className="text-sm sm:text-base">
                    Il tuo prossimo incontro con il medico
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-4">
                {/* Data Appuntamento */}
                <div className="p-4 bg-white/70 rounded-lg border border-primary/10 shadow-sm text-center">
                  <div className="text-3xl font-bold text-primary mb-2">
                    {patientData.prossimoAppuntamento}
                  </div>
                  <p className="text-lg text-muted-foreground mb-3">Visita di controllo</p>
                  <div className="flex justify-center">
                    {getPercorsoStatusBadge(patientData.statoPercorso)}
                  </div>
                </div>

                {/* Dettagli Appuntamento */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-100">
                    <Clock className="w-5 h-5 text-purple-600" />
                    <div>
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Orario</p>
                      <p className="text-sm font-bold text-gray-900">Ore 10:30</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-100">
                    <User className="w-5 h-5 text-purple-600" />
                    <div>
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Medico</p>
                      <p className="text-sm font-bold text-gray-900">{patientData.medicoResponsabile}</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Informazioni Cliniche */}
          <Card id="clinical-info" className="lg:col-span-3 border-2 border-primary/20 bg-gradient-to-br from-gray-50/50 to-slate-50/50 shadow-lg">
            <CardHeader className="pb-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Activity className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-xl sm:text-2xl font-bold text-primary">
                      Informazioni Cliniche
                    </CardTitle>
                    <CardDescription className="text-sm sm:text-base">
                      Dettagli sulla tua diagnosi e percorso di cura
                    </CardDescription>
                  </div>
                </div>
                <Button 
                  variant="default" 
                  size="sm"
                  onClick={() => window.location.href = '/paziente/informazioni'}
                  className="flex items-center gap-2 bg-primary hover:bg-primary/90 shadow-md w-full sm:w-auto"
                >
                  Maggiori Dettagli
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                {/* Colonna Sinistra - Informazioni Principali */}
                <div className="space-y-4">
                  {/* Diagnosi */}
                  <div className="p-2 sm:p-3 bg-white/70 rounded-lg border border-primary/10 shadow-sm">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="p-1 sm:p-1.5 bg-red-100 rounded-md">
                        <AlertCircle className="w-3 h-3 sm:w-4 sm:h-4 text-red-600" />
                      </div>
                      <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Diagnosi</label>
                    </div>
                    <p className="text-base sm:text-lg font-bold text-gray-900 leading-tight">{clinicalInfo.diagnosi}</p>
                  </div>

                  {/* Stadio */}
                  <div className="p-2 sm:p-3 bg-white/70 rounded-lg border border-primary/10 shadow-sm">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="p-1 sm:p-1.5 bg-orange-100 rounded-md">
                        <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 text-orange-600" />
                      </div>
                      <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Stadio</label>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge variant="outline" className="text-sm px-2 sm:px-3 py-1 bg-orange-50 border-orange-200 text-orange-800 font-bold">
                        {clinicalInfo.stadio}
                      </Badge>
                    </div>
                  </div>

                  {/* Data Diagnosi */}
                  <div className="p-2 sm:p-3 bg-white/70 rounded-lg border border-primary/10 shadow-sm">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="p-1 sm:p-1.5 bg-blue-100 rounded-md">
                        <CalendarIcon className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600" />
                      </div>
                      <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Data Diagnosi</label>
                    </div>
                    <p className="text-sm sm:text-base font-semibold text-gray-900">{clinicalInfo.dataDiagnosi}</p>
                  </div>

                  {/* Trattamento Attuale */}
                  <div className="p-2 sm:p-3 bg-white/70 rounded-lg border border-primary/10 shadow-sm">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="p-1 sm:p-1.5 bg-green-100 rounded-md">
                        <Pill className="w-3 h-3 sm:w-4 sm:h-4 text-green-600" />
                      </div>
                      <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Trattamento Attuale</label>
                    </div>
                    <p className="text-sm sm:text-base font-semibold text-gray-900">{clinicalInfo.trattamento}</p>
                  </div>
                </div>
                
                {/* Colonna Destra - Esami e Effetti Collaterali */}
                <div className="space-y-4">
                  {/* Prossimi Esami */}
                  <div className="p-2 sm:p-3 bg-white/70 rounded-lg border border-primary/10 shadow-sm">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="p-1 sm:p-1.5 bg-purple-100 rounded-md">
                        <TestTube className="w-3 h-3 sm:w-4 sm:h-4 text-purple-600" />
                      </div>
                      <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Prossimi Esami</label>
                    </div>
                    <div className="space-y-2">
                      {clinicalInfo.prossimiEsami.map((esame, index) => (
                        <div key={index} className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-2 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-md border border-purple-100 gap-1">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-3 h-3 text-purple-600" />
                            <div>
                              <span className="font-semibold text-gray-900 text-xs sm:text-sm">{esame.tipo}</span>
                              <p className="text-xs text-gray-600">{esame.scopo}</p>
                            </div>
                          </div>
                          <Badge variant="secondary" className="bg-purple-100 text-purple-800 font-medium text-xs w-fit">
                            {esame.data}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Effetti Collaterali */}
                  <div className="p-2 sm:p-3 bg-white/70 rounded-lg border border-primary/10 shadow-sm">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="p-1 sm:p-1.5 bg-yellow-100 rounded-md">
                        <Info className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-600" />
                      </div>
                      <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Effetti Collaterali</label>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {clinicalInfo.effettiCollaterali.map((effetto, index) => (
                        <Badge key={index} variant="secondary" className="bg-gradient-to-r from-yellow-100 to-orange-100 text-orange-800 hover:from-yellow-200 hover:to-orange-200 font-medium px-2 py-0.5 text-xs">
                          {effetto}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Questionari */}
          <Card id="questionnaires-section" className="lg:col-span-3 border-2 border-primary/20 bg-gradient-to-br from-gray-50/50 to-slate-50/50 shadow-lg">
            <CardHeader className="pb-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <ClipboardList className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-xl sm:text-2xl font-bold text-primary">
                      Questionari da Compilare
                    </CardTitle>
                    <CardDescription className="text-sm sm:text-base">
                      Monitora il tuo stato di salute con i questionari assegnati
                    </CardDescription>
                  </div>
                </div>
                <Button 
                  variant="default" 
                  size="sm"
                  onClick={() => window.location.href = '/paziente/questionari'}
                  className="flex items-center gap-2 bg-primary hover:bg-primary/90 shadow-md w-full sm:w-auto"
                >
                  Maggiori Dettagli
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                {/* Riepilogo Statistiche */}
                <div className="space-y-3">
                  <div className="p-2 sm:p-3 bg-white/70 rounded-lg border border-primary/10 shadow-sm">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="p-1 sm:p-1.5 bg-blue-100 rounded-md">
                        <ClipboardList className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600" />
                      </div>
                      <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Questionari Totali</label>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge variant="outline" className="text-base sm:text-lg px-3 sm:px-4 py-1.5 sm:py-2 bg-blue-50 border-blue-200 text-blue-800 font-bold">
                        {assignedQuestionnaires.length}
                      </Badge>
                    </div>
                  </div>

                  <div className="p-2 sm:p-3 bg-white/70 rounded-lg border border-primary/10 shadow-sm">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="p-1 sm:p-1.5 bg-green-100 rounded-md">
                        <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-green-600" />
                      </div>
                      <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Completati</label>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge variant="outline" className="text-base sm:text-lg px-3 sm:px-4 py-1.5 sm:py-2 bg-green-50 border-green-200 text-green-800 font-bold">
                        {assignedQuestionnaires.filter(q => q.stato === 'completato').length}
                      </Badge>
                    </div>
                  </div>

                  <div className="p-2 sm:p-3 bg-white/70 rounded-lg border border-primary/10 shadow-sm">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="p-1 sm:p-1.5 bg-orange-100 rounded-md">
                        <Clock className="w-3 h-3 sm:w-4 sm:h-4 text-orange-600" />
                      </div>
                      <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">In Corso</label>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge variant="outline" className="text-base sm:text-lg px-3 sm:px-4 py-1.5 sm:py-2 bg-orange-50 border-orange-200 text-orange-800 font-bold">
                        {assignedQuestionnaires.filter(q => q.stato === 'in_corso').length}
                      </Badge>
                    </div>
                  </div>
                </div>

                {/* Anteprima Questionari */}
                <div className="space-y-3">
                  <div className="p-2 sm:p-3 bg-white/70 rounded-lg border border-primary/10 shadow-sm">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="p-1 sm:p-1.5 bg-purple-100 rounded-md">
                        <FileText className="w-3 h-3 sm:w-4 sm:h-4 text-purple-600" />
                      </div>
                      <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Prossimi da Completare</label>
                    </div>
                    <div className="space-y-2">
                      {assignedQuestionnaires.filter(q => q.stato !== 'completato').slice(0, 2).map((questionnaire) => (
                        <div key={questionnaire.id} className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-2 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-md border border-purple-100 gap-1">
                          <div className="flex items-center gap-2">
                            <ClipboardList className="w-3 h-3 text-purple-600" />
                            <div>
                              <span className="font-semibold text-gray-900 text-xs sm:text-sm">{questionnaire.nome}</span>
                              <p className="text-xs text-gray-600">{questionnaire.domandeCompletate}/{questionnaire.domandeTotali} domande</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-1">
                            {getStatusBadge(questionnaire.stato)}
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => window.location.href = '/paziente/questionario'}
                              className="text-xs px-1 py-0.5"
                            >
                              Continua
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                    {assignedQuestionnaires.filter(q => q.stato !== 'completato').length > 2 && (
                      <div className="mt-2 text-center">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => window.location.href = '/paziente/questionari'}
                          className="text-xs text-muted-foreground hover:text-primary"
                        >
                          Vedi tutti i questionari ({assignedQuestionnaires.filter(q => q.stato !== 'completato').length})
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t bg-card">
        <div className="container mx-auto px-4 py-8 text-center text-sm text-muted-foreground">
          <p>© 2025 Istituto Oncologico Veneto - Tutti i diritti riservati</p>
          <p className="mt-2">Sistema demo per pazienti</p>
        </div>
      </footer>

      {/* Dialog Anteprima Questionario */}
      <Dialog open={previewDialogOpen} onOpenChange={setPreviewDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              Anteprima - {previewQuestionnaireId && assignedQuestionnaires.find(q => q.id === previewQuestionnaireId)?.nome}
            </DialogTitle>
            <DialogDescription>
              Questa è un'anteprima delle domande del questionario. Per compilare il questionario, clicca su "Inizia" o "Continua".
            </DialogDescription>
          </DialogHeader>
          
          {previewQuestionnaireId && (() => {
            const questionnaire = assignedQuestionnaires.find(q => q.id === previewQuestionnaireId);
            const questions = questionnaireQuestions[previewQuestionnaireId as keyof typeof questionnaireQuestions];
            
            if (!questionnaire || !questions) return null;
            
            return (
              <div className="space-y-6 mt-4">
                {/* Info Questionario */}
                <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-400">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-blue-900">{questionnaire.nome}</h3>
                    <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                      {questions.length} domande
                    </Badge>
                  </div>
                  <p className="text-blue-800 text-sm">{questionnaire.descrizione}</p>
                  <p className="text-blue-600 text-xs mt-2">
                    Scadenza: {questionnaire.scadenza}
                  </p>
                </div>

                {/* Domande */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">Domande del Questionario</h3>
                  {questions.map((question, index) => (
                    <div key={question.id} className="border rounded-lg p-4 bg-muted/30">
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-sm font-medium">
                          {index + 1}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium mb-3">{question.domanda}</h4>
                          
                          {question.tipo === "radio" && (
                            <div className="space-y-2">
                              {question.opzioni?.map((opzione, optIndex) => (
                                <div key={optIndex} className="flex items-center gap-2 text-sm text-muted-foreground">
                                  <div className="w-3 h-3 border border-gray-300 rounded-full"></div>
                                  <span>{opzione}</span>
                                </div>
                              ))}
                            </div>
                          )}
                          
                          {question.tipo === "checkbox" && (
                            <div className="space-y-2">
                              {question.opzioni?.map((opzione, optIndex) => (
                                <div key={optIndex} className="flex items-center gap-2 text-sm text-muted-foreground">
                                  <div className="w-3 h-3 border border-gray-300 rounded"></div>
                                  <span>{opzione}</span>
                                </div>
                              ))}
                            </div>
                          )}
                          
                          {question.tipo === "textarea" && (
                            <div className="bg-gray-100 p-3 rounded text-sm text-muted-foreground">
                              Area di testo per risposta libera...
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Azioni */}
                <div className="flex gap-2 pt-4 border-t">
                  <Button 
                    onClick={() => window.location.href = '/paziente/questionario'}
                    className="flex-1"
                  >
                    Inizia Questionario
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => setPreviewDialogOpen(false)}
                  >
                    Chiudi
                  </Button>
                </div>
              </div>
            );
          })()}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PazienteHome;
