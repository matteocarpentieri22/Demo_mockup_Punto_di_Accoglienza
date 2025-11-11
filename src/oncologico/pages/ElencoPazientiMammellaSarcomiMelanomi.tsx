import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Badge } from "@/shared/components/ui/badge";
import { 
  ArrowLeft, 
  Search, 
  Eye, 
  User,
  FileCheck,
  Calendar,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  Users
} from "lucide-react";
import CaseManagerNavbar from "@/oncologico/components/layout/CaseManagerNavbar";
import { useNavigate } from "react-router-dom";

// Definizione documentazione richiesta per ogni PDTA
const PDTA_DOCUMENTATION = {
  "Melanoma": [
    "Visita dermatologica con dermatoscopia o chirurgica per neoformazioni",
    "Biopsia escissionale ed esame istologico"
  ],
  "Mammella": [
    "Visita senologica",
    "Mammografia bilaterale",
    "Ecografia bilaterale",
    "Biopsia ed esame istologico"
  ],
  "Sarcomi dei tessuti molli": [
    "Visita chirurgica",
    "Ecografia dei tessuti molli",
    "Risonanza magnetica (eventualmente con ecografia)",
    "Biopsia ed esame istologico"
  ]
};

interface Documento {
  id: string;
  nome: string;
  tipo: string;
  dataCaricamento: string;
  fileUrl: string;
  caricato: boolean;
}

interface PazienteTriage {
  id: number;
  nome: string;
  cognome: string;
  codiceFiscale: string;
  dataNascita: string;
  pdta: keyof typeof PDTA_DOCUMENTATION;
  dataTriage: string;
  documentazione: Documento[];
}

// Mock data per pazienti con triage completato - solo Mammella, Sarcomi e Melanomi
const mockPatientsTriage: PazienteTriage[] = [
  {
    id: 2,
    nome: "Giulia",
    cognome: "Bianchi",
    codiceFiscale: "BNCGLA72B45H501V",
    dataNascita: "1972-02-20",
    pdta: "Mammella",
    dataTriage: "2024-01-12",
    documentazione: [
      {
        id: "1",
        nome: "Visita senologica",
        tipo: "Visita specialistica",
        dataCaricamento: "2024-01-11",
        fileUrl: "visita_senologica_bianchi.pdf",
        caricato: true
      },
      {
        id: "2",
        nome: "Mammografia bilaterale",
        tipo: "Radiologia",
        dataCaricamento: "2024-01-11",
        fileUrl: "mammografia_bianchi.pdf",
        caricato: true
      },
      {
        id: "3",
        nome: "Ecografia bilaterale",
        tipo: "Ecografia",
        dataCaricamento: "2024-01-11",
        fileUrl: "ecografia_bianchi.pdf",
        caricato: true
      },
      {
        id: "4",
        nome: "Biopsia ed esame istologico",
        tipo: "Esame istologico",
        dataCaricamento: "2024-01-12",
        fileUrl: "biopsia_bianchi.pdf",
        caricato: true
      }
    ]
  },
  {
    id: 5,
    nome: "Francesco",
    cognome: "Gialli",
    codiceFiscale: "GLLFRC69E08H501Y",
    dataNascita: "1969-05-18",
    pdta: "Melanoma",
    dataTriage: "2024-01-16",
    documentazione: [
      {
        id: "1",
        nome: "Visita dermatologica con dermatoscopia o chirurgica per neoformazioni",
        tipo: "Visita specialistica",
        dataCaricamento: "2024-01-15",
        fileUrl: "visita_dermatologica_gialli.pdf",
        caricato: true
      },
      {
        id: "2",
        nome: "Biopsia escissionale ed esame istologico",
        tipo: "Biopsia",
        dataCaricamento: "",
        fileUrl: "",
        caricato: false
      }
    ]
  },
  {
    id: 8,
    nome: "Marco",
    cognome: "Ricci",
    codiceFiscale: "RCCMRC70H08H501B",
    dataNascita: "1970-08-12",
    pdta: "Sarcomi dei tessuti molli",
    dataTriage: "2024-01-19",
    documentazione: [
      {
        id: "1",
        nome: "Visita chirurgica",
        tipo: "Visita specialistica",
        dataCaricamento: "2024-01-18",
        fileUrl: "visita_chirurgica_ricci.pdf",
        caricato: true
      },
      {
        id: "2",
        nome: "Ecografia dei tessuti molli",
        tipo: "Ecografia",
        dataCaricamento: "2024-01-18",
        fileUrl: "ecografia_ricci.pdf",
        caricato: true
      },
      {
        id: "3",
        nome: "Risonanza magnetica (eventualmente con ecografia)",
        tipo: "Risonanza magnetica",
        dataCaricamento: "",
        fileUrl: "",
        caricato: false
      },
      {
        id: "4",
        nome: "Biopsia ed esame istologico",
        tipo: "Biopsia",
        dataCaricamento: "",
        fileUrl: "",
        caricato: false
      }
    ]
  }
];

const ElencoPazientiMammellaSarcomiMelanomi = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredPatients = mockPatientsTriage.filter(patient =>
    patient.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.cognome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.codiceFiscale.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewDocumentation = (patient: PazienteTriage) => {
    navigate(`/oncologico/case-manager/mammella-sarcomi-melanomi/elenco-pazienti/${patient.id}`);
  };

  const getDocumentStatus = (patient: PazienteTriage) => {
    const requiredDocs = PDTA_DOCUMENTATION[patient.pdta] || [];
    const loadedDocs = patient.documentazione.filter(doc => doc.caricato).length;
    const totalDocs = requiredDocs.length;
    return { loaded: loadedDocs, total: totalDocs };
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("it-IT", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric"
    });
  };

  // Calcola statistiche
  const totalPatients = filteredPatients.length;
  const completePatients = filteredPatients.filter(p => {
    const status = getDocumentStatus(p);
    return status.loaded === status.total;
  }).length;
  const incompletePatients = totalPatients - completePatients;
  const completionRate = totalPatients > 0 ? Math.round((completePatients / totalPatients) * 100) : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-gray-50">
      <CaseManagerNavbar />

      <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-6 lg:py-8">
        {/* Back Button */}
        <div className="mb-6">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => navigate('/oncologico/case-manager/mammella-sarcomi-melanomi')} 
            className="text-sm sm:text-base hover:bg-blue-50"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Indietro
          </Button>
        </div>

        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
              <Users className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                Elenco Pazienti con Triage - Mammella, Sarcomi e Melanomi
              </h1>
              <p className="text-muted-foreground text-sm sm:text-base mt-1">
                Visualizza l'elenco dei pazienti che hanno completato il triage per Mammella, Sarcomi e Melanomi
              </p>
            </div>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm font-medium mb-1">Totale Pazienti</p>
                  <p className="text-3xl font-bold">{totalPatients}</p>
                </div>
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <Users className="w-6 h-6" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm font-medium mb-1">Documentazione Completa</p>
                  <p className="text-3xl font-bold">{completePatients}</p>
                </div>
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-yellow-500 to-yellow-600 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-yellow-100 text-sm font-medium mb-1">In Completamento</p>
                  <p className="text-3xl font-bold">{incompletePatients}</p>
                </div>
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <AlertCircle className="w-6 h-6" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-sm font-medium mb-1">Tasso Completamento</p>
                  <p className="text-3xl font-bold">{completionRate}%</p>
                </div>
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <TrendingUp className="w-6 h-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search */}
        <Card className="mb-6 border-2 shadow-md">
          <CardContent className="p-5">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <Input
                placeholder="Cerca per nome, cognome o codice fiscale..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 h-12 text-base border-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              />
            </div>
          </CardContent>
        </Card>

        {/* Patients List */}
        <Card className="border-2 shadow-lg">
          <CardHeader className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-b-2">
            <CardTitle className="flex items-center gap-3 text-xl sm:text-2xl">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <FileCheck className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="text-gray-800">Pazienti con Triage Completato</span>
                <Badge variant="secondary" className="ml-3 bg-blue-600 text-white">
                  {filteredPatients.length}
                </Badge>
              </div>
            </CardTitle>
            <CardDescription className="text-sm sm:text-base mt-2">
              Clicca su un paziente per visualizzare la documentazione caricata
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              {filteredPatients.map((patient) => {
                const docStatus = getDocumentStatus(patient);
                const isComplete = docStatus.loaded === docStatus.total;
                const progressPercentage = (docStatus.loaded / docStatus.total) * 100;
                
                return (
                  <div
                    key={patient.id}
                    className="group relative p-5 rounded-xl border-2 cursor-pointer transition-all duration-300 bg-white border-gray-200 hover:border-blue-400 hover:shadow-xl hover:scale-[1.02] overflow-hidden"
                    onClick={() => handleViewDocumentation(patient)}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-50/0 to-indigo-50/0 group-hover:from-blue-50/50 group-hover:to-indigo-50/50 transition-all duration-300 rounded-xl" />
                    
                    <div className="relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div className="flex items-start gap-4 flex-1">
                        <div className={`w-16 h-16 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg transition-transform duration-300 group-hover:scale-110 ${
                          isComplete 
                            ? 'bg-gradient-to-br from-green-400 to-green-600' 
                            : 'bg-gradient-to-br from-blue-400 to-blue-600'
                        }`}>
                          <User className="w-8 h-8 text-white" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-bold text-lg sm:text-xl text-gray-900 group-hover:text-blue-700 transition-colors">
                              {patient.nome} {patient.cognome}
                            </h3>
                            {isComplete && (
                              <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
                            )}
                          </div>
                          <div className="space-y-1">
                            <p className="text-sm text-gray-600 flex items-center gap-2">
                              <span className="font-mono text-xs bg-gray-100 px-2 py-0.5 rounded">
                                {patient.codiceFiscale}
                              </span>
                            </p>
                            <div className="flex items-center gap-3 flex-wrap">
                              <Badge 
                                variant="outline" 
                                className="text-xs font-semibold border-blue-300 text-blue-700 bg-blue-50"
                              >
                                {patient.pdta}
                              </Badge>
                              <div className="flex items-center gap-1 text-xs text-gray-500">
                                <Calendar className="w-3 h-3" />
                                <span>Triage: {formatDate(patient.dataTriage)}</span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="mt-3">
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-xs font-medium text-gray-600">Documentazione</span>
                              <span className="text-xs font-bold text-gray-700">
                                {docStatus.loaded}/{docStatus.total}
                              </span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                              <div 
                                className={`h-2 rounded-full transition-all duration-500 ${
                                  isComplete 
                                    ? 'bg-gradient-to-r from-green-500 to-green-600' 
                                    : 'bg-gradient-to-r from-yellow-400 to-yellow-500'
                                }`}
                                style={{ width: `${progressPercentage}%` }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 flex-shrink-0">
                        <div className="flex flex-col items-end gap-2">
                          <Badge 
                            variant={isComplete ? "default" : "secondary"}
                            className={`text-sm font-bold px-4 py-1.5 ${
                              isComplete 
                                ? 'bg-green-100 text-green-800 border-green-300 shadow-sm' 
                                : 'bg-yellow-100 text-yellow-800 border-yellow-300 shadow-sm'
                            }`}
                          >
                            {isComplete ? 'Completo' : 'In corso'}
                          </Badge>
                          <div className="text-xs text-gray-500 font-medium">
                            {Math.round(progressPercentage)}% completato
                          </div>
                        </div>
                        <Button 
                          variant="default" 
                          size="sm" 
                          className="flex-shrink-0 bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg transition-all"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleViewDocumentation(patient);
                          }}
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          Visualizza
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {filteredPatients.length === 0 && (
              <div className="text-center py-16">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="w-10 h-10 text-gray-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-700 mb-2">Nessun paziente trovato</h3>
                <p className="text-sm text-gray-500 max-w-md mx-auto">
                  {searchTerm 
                    ? "Prova a modificare i termini di ricerca o rimuovere i filtri applicati" 
                    : "Non ci sono pazienti con triage completato al momento"}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ElencoPazientiMammellaSarcomiMelanomi;

