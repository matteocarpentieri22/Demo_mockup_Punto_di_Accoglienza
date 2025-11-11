import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";
import { Badge } from "@/shared/components/ui/badge";
import { 
  ArrowLeft, 
  FileText, 
  CheckCircle2, 
  XCircle,
  Download,
  User,
  Calendar,
  FileCheck
} from "lucide-react";
import CaseManagerNavbar from "@/oncologico/components/layout/CaseManagerNavbar";

// Definizione documentazione richiesta per ogni PDTA
const PDTA_DOCUMENTATION = {
  "Polmone": [
    "Rx torace",
    "TC torace",
    "Visita pneumologica",
    "Biopsia ed esame istologico"
  ],
  "Prostata": [
    "Visita urologica + ER + PSA",
    "RM prostatica multiparametrica",
    "Biopsia prostatica"
  ],
  "Colon": [
    "Visita specialistica (gastroenterologo o chirurgo)",
    "Pancolonscopia con biopsia",
    "Esame istologico"
  ],
  "Retto": [
    "Visita specialistica (gastroenterologo o chirurgo)",
    "Pancolonscopia con biopsia",
    "Esame istologico"
  ],
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
  "Stomaco": [
    "EGDS (Esofagogastroduodenoscopia) con biopsia",
    "Esame istologico"
  ],
  "Sarcomi dei tessuti molli": [
    "Visita chirurgica",
    "Ecografia dei tessuti molli",
    "Risonanza magnetica (eventualmente con ecografia)",
    "Biopsia ed esame istologico"
  ],
  "Sistema nervoso centrale": [
    "Visita neurologica",
    "Risonanza Magnetica (RMN) o Tomografia Computerizzata (TC)"
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

// Mock data per pazienti con triage completato (stesso di ElencoPazientiPage)
const mockPatientsTriage: PazienteTriage[] = [
  {
    id: 1,
    nome: "Mario",
    cognome: "Rossi",
    codiceFiscale: "RSSMRA65A01H501U",
    dataNascita: "1965-01-15",
    pdta: "Polmone",
    dataTriage: "2024-01-10",
    documentazione: [
      {
        id: "1",
        nome: "Rx torace",
        tipo: "Radiologia",
        dataCaricamento: "2024-01-08",
        fileUrl: "rx_torace_rossi.pdf",
        caricato: true
      },
      {
        id: "2",
        nome: "TC torace",
        tipo: "Radiologia",
        dataCaricamento: "2024-01-09",
        fileUrl: "tc_torace_rossi.pdf",
        caricato: true
      },
      {
        id: "3",
        nome: "Visita pneumologica",
        tipo: "Visita specialistica",
        dataCaricamento: "2024-01-09",
        fileUrl: "visita_pneumologica_rossi.pdf",
        caricato: true
      },
      {
        id: "4",
        nome: "Biopsia ed esame istologico",
        tipo: "Esame istologico",
        dataCaricamento: "",
        fileUrl: "",
        caricato: false
      }
    ]
  },
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
    id: 3,
    nome: "Antonio",
    cognome: "Verdi",
    codiceFiscale: "VRDNTN58C12H501W",
    dataNascita: "1958-03-25",
    pdta: "Prostata",
    dataTriage: "2024-01-14",
    documentazione: [
      {
        id: "1",
        nome: "Visita urologica + ER + PSA",
        tipo: "Visita specialistica",
        dataCaricamento: "2024-01-13",
        fileUrl: "visita_urologica_verdi.pdf",
        caricato: true
      },
      {
        id: "2",
        nome: "RM prostatica multiparametrica",
        tipo: "Risonanza magnetica",
        dataCaricamento: "2024-01-13",
        fileUrl: "rm_prostata_verdi.pdf",
        caricato: true
      },
      {
        id: "3",
        nome: "Biopsia prostatica",
        tipo: "Biopsia",
        dataCaricamento: "",
        fileUrl: "",
        caricato: false
      }
    ]
  },
  {
    id: 4,
    nome: "Elena",
    cognome: "Neri",
    codiceFiscale: "NRELNE80D25H501X",
    dataNascita: "1980-04-10",
    pdta: "Colon",
    dataTriage: "2024-01-15",
    documentazione: [
      {
        id: "1",
        nome: "Visita specialistica (gastroenterologo o chirurgo)",
        tipo: "Visita specialistica",
        dataCaricamento: "2024-01-14",
        fileUrl: "visita_gastroenterologica_neri.pdf",
        caricato: true
      },
      {
        id: "2",
        nome: "Pancolonscopia con biopsia",
        tipo: "Endoscopia",
        dataCaricamento: "2024-01-14",
        fileUrl: "pancolonscopia_neri.pdf",
        caricato: true
      },
      {
        id: "3",
        nome: "Esame istologico",
        tipo: "Esame istologico",
        dataCaricamento: "2024-01-15",
        fileUrl: "istologico_neri.pdf",
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
    id: 6,
    nome: "Sofia",
    cognome: "Marino",
    codiceFiscale: "MRNSFA75F20H501Z",
    dataNascita: "1975-06-22",
    pdta: "Retto",
    dataTriage: "2024-01-17",
    documentazione: [
      {
        id: "1",
        nome: "Visita specialistica (gastroenterologo o chirurgo)",
        tipo: "Visita specialistica",
        dataCaricamento: "2024-01-16",
        fileUrl: "visita_chirurgica_marino.pdf",
        caricato: true
      },
      {
        id: "2",
        nome: "Pancolonscopia con biopsia",
        tipo: "Endoscopia",
        dataCaricamento: "2024-01-16",
        fileUrl: "pancolonscopia_marino.pdf",
        caricato: true
      },
      {
        id: "3",
        nome: "Esame istologico",
        tipo: "Esame istologico",
        dataCaricamento: "",
        fileUrl: "",
        caricato: false
      }
    ]
  },
  {
    id: 7,
    nome: "Luca",
    cognome: "Ferrari",
    codiceFiscale: "FRRLCU68G15H501A",
    dataNascita: "1968-07-30",
    pdta: "Stomaco",
    dataTriage: "2024-01-18",
    documentazione: [
      {
        id: "1",
        nome: "EGDS (Esofagogastroduodenoscopia) con biopsia",
        tipo: "Endoscopia",
        dataCaricamento: "2024-01-17",
        fileUrl: "egds_ferrari.pdf",
        caricato: true
      },
      {
        id: "2",
        nome: "Esame istologico",
        tipo: "Esame istologico",
        dataCaricamento: "2024-01-17",
        fileUrl: "istologico_ferrari.pdf",
        caricato: true
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
  },
  {
    id: 9,
    nome: "Anna",
    cognome: "Conti",
    codiceFiscale: "CNTANN82I25H501C",
    dataNascita: "1982-09-05",
    pdta: "Sistema nervoso centrale",
    dataTriage: "2024-01-20",
    documentazione: [
      {
        id: "1",
        nome: "Visita neurologica",
        tipo: "Visita specialistica",
        dataCaricamento: "2024-01-19",
        fileUrl: "visita_neurologica_conti.pdf",
        caricato: true
      },
      {
        id: "2",
        nome: "Risonanza Magnetica (RMN) o Tomografia Computerizzata (TC)",
        tipo: "Risonanza magnetica",
        dataCaricamento: "2024-01-19",
        fileUrl: "rmn_conti.pdf",
        caricato: true
      }
    ]
  }
];

const PazienteTriageDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const patient = mockPatientsTriage.find(p => p.id.toString() === id);

  if (!patient) {
    return (
      <div className="min-h-screen bg-background">
        <CaseManagerNavbar />
        <div className="container mx-auto px-4 py-8">
          <Card>
            <CardContent className="p-8 text-center">
              <p className="text-muted-foreground mb-4">Paziente non trovato</p>
              <Button onClick={() => navigate('/oncologico/case-manager/elenco-pazienti')}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Torna all'elenco
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const getRequiredDocs = (pdta: keyof typeof PDTA_DOCUMENTATION): string[] => {
    return PDTA_DOCUMENTATION[pdta] || [];
  };

  const getDocumentStatus = () => {
    const requiredDocs = getRequiredDocs(patient.pdta);
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

  const docStatus = getDocumentStatus();

  return (
    <div className="min-h-screen bg-background">
      <CaseManagerNavbar />

      <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-6 lg:py-8">
        {/* Back Button */}
        <div className="mb-4 sm:mb-6">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => navigate('/oncologico/case-manager/elenco-pazienti')} 
            className="text-sm sm:text-base"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Torna all'elenco
          </Button>
        </div>

        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
              <User className="w-8 h-8 text-blue-600" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold">
                {patient.nome} {patient.cognome}
              </h1>
              <p className="text-muted-foreground text-sm sm:text-base">
                Documentazione Triage - PDTA: {patient.pdta}
              </p>
            </div>
          </div>
        </div>

        {/* Patient Info Card */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5" />
              Informazioni Paziente
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Codice Fiscale</p>
                <p className="font-medium font-mono">{patient.codiceFiscale}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Data di Nascita</p>
                <p className="font-medium">{formatDate(patient.dataNascita)}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">PDTA</p>
                <Badge variant="outline" className="text-sm">
                  {patient.pdta}
                </Badge>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Data Triage</p>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <p className="font-medium">{formatDate(patient.dataTriage)}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Document Status Summary */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileCheck className="w-5 h-5" />
              Stato Documentazione
            </CardTitle>
            <CardDescription>
              {docStatus.loaded} di {docStatus.total} documenti caricati
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <div className="w-full bg-gray-200 rounded-full h-4">
                  <div 
                    className={`h-4 rounded-full transition-all ${
                      docStatus.loaded === docStatus.total 
                        ? 'bg-green-500' 
                        : 'bg-yellow-500'
                    }`}
                    style={{ width: `${(docStatus.loaded / docStatus.total) * 100}%` }}
                  />
                </div>
              </div>
              <Badge 
                variant={docStatus.loaded === docStatus.total ? "default" : "secondary"}
                className={
                  docStatus.loaded === docStatus.total 
                    ? "bg-green-100 text-green-800 border-green-200" 
                    : "bg-yellow-100 text-yellow-800 border-yellow-200"
                }
              >
                {docStatus.loaded}/{docStatus.total}
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Documentation List */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Visite richieste per la visita oncologica
            </CardTitle>
            <CardDescription>
              Documentazione richiesta per il PDTA {patient.pdta}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {getRequiredDocs(patient.pdta).map((docName, index) => {
                const patientDoc = patient.documentazione.find(
                  d => d.nome === docName
                );
                const isLoaded = patientDoc?.caricato || false;
                
                return (
                  <div 
                    key={index} 
                    className={`flex items-center gap-4 p-4 rounded-lg border-2 transition-all ${
                      isLoaded 
                        ? 'bg-green-50 border-green-200' 
                        : 'bg-red-50 border-red-200'
                    }`}
                  >
                    <div className="flex-shrink-0">
                      {isLoaded ? (
                        <CheckCircle2 className="w-6 h-6 text-green-600" />
                      ) : (
                        <XCircle className="w-6 h-6 text-red-600" />
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className={`font-semibold mb-1 ${isLoaded ? 'text-gray-900' : 'text-gray-600'}`}>
                        {docName}
                      </h3>
                      {isLoaded && patientDoc && (
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <span>Tipo: {patientDoc.tipo}</span>
                          <span>•</span>
                          <span>Caricato il: {formatDate(patientDoc.dataCaricamento)}</span>
                        </div>
                      )}
                      {!isLoaded && (
                        <p className="text-sm text-red-600">Documento non ancora caricato</p>
                      )}
                    </div>
                    {isLoaded && patientDoc && (
                      <div className="flex-shrink-0">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            // Simula download/visualizzazione documento
                            window.open(`/pdf/${patientDoc.fileUrl}`, '_blank');
                          }}
                          className="flex items-center gap-2"
                        >
                          <Download className="w-4 h-4" />
                          Visualizza
                        </Button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PazienteTriageDetailPage;

