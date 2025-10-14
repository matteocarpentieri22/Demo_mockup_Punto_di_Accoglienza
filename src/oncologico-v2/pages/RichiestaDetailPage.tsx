import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";
import { Badge } from "@/shared/components/ui/badge";
import { Label } from "@/shared/components/ui/label";
import { ArrowLeft, FileText, User, Calendar, Calculator, Clock, CheckCircle, AlertCircle } from "lucide-react";
import OncologoNavbar from "@/oncologico-v2/components/OncologoNavbar";
import { useNavigate, useParams } from "react-router-dom";

// Mock data richieste (stesso array della pagina principale)
const RICHIESTE_DATA = [
  {
    id: 1,
    cf: "RSSMRA80A01H501U",
    paziente: "Mario Rossi",
    pdta: "Polmone",
    ambulatorio: "Cure Simultanee",
    quesito: "Valutazione per stadiazione carcinoma polmonare",
    score: 8,
    scoreDetails: { tosse: 3, dolore: 3, comorbidita: 2 },
    dataRichiesta: "2024-01-20",
    oraRichiesta: "14:30",
    stato: "in_attesa",
    medico: "Dr. Carlo Bianchi",
    codiceRicetta: "123456789"
  },
  {
    id: 2,
    cf: "BNCNNA75B02H501V",
    paziente: "Anna Bianchi",
    pdta: "Mammella",
    ambulatorio: "Oncogeriatria",
    quesito: "Discussione caso per carcinoma mammario",
    score: 7,
    scoreDetails: { tosse: 2, dolore: 3, comorbidita: 2 },
    dataRichiesta: "2024-01-19",
    oraRichiesta: "16:45",
    stato: "approvata",
    medico: "Dr. Carlo Bianchi",
    codiceRicetta: "987654321"
  },
  {
    id: 3,
    cf: "VRDGPP70C03H501W",
    paziente: "Giuseppe Verdi",
    pdta: "Prostata",
    ambulatorio: "Oncogeriatria",
    quesito: "Valutazione oncogeriatrica per carcinoma prostatico",
    score: 6,
    scoreDetails: { tosse: 2, dolore: 2, comorbidita: 2 },
    dataRichiesta: "2024-01-18",
    oraRichiesta: "11:20",
    stato: "in_attesa",
    medico: "Dr. Carlo Bianchi",
    codiceRicetta: "456789123"
  },
  {
    id: 4,
    cf: "NRIFNC85D04H501X",
    paziente: "Francesca Neri",
    pdta: "Sistema nervoso centrale",
    ambulatorio: "Osteoncologia",
    quesito: "Valutazione per lesione cerebrale sospetta",
    score: 5,
    scoreDetails: { tosse: 1, dolore: 2, comorbidita: 2 },
    dataRichiesta: "2024-01-17",
    oraRichiesta: "09:15",
    stato: "rifiutata",
    medico: "Dr. Carlo Bianchi",
    codiceRicetta: "789123456"
  },
  {
    id: 5,
    cf: "FRRLGI65E05H501Y",
    paziente: "Luigi Ferrari",
    pdta: "Colon",
    ambulatorio: "Osteoncologia",
    quesito: "Follow-up post-intervento chirurgico",
    score: 4,
    scoreDetails: { tosse: 1, dolore: 1, comorbidita: 2 },
    dataRichiesta: "2024-01-16",
    oraRichiesta: "15:30",
    stato: "approvata",
    medico: "Dr. Carlo Bianchi",
    codiceRicetta: "321654987"
  }
];

const RichiestaDetailPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [richiesta, setRichiesta] = useState<any>(null);

  useEffect(() => {
    const richiestaId = parseInt(id || "0");
    const foundRichiesta = RICHIESTE_DATA.find(r => r.id === richiestaId);
    setRichiesta(foundRichiesta || null);
  }, [id]);

  const getStatoColor = (stato: string) => {
    switch (stato) {
      case "approvata":
        return "bg-green-100 text-green-800 border-green-200";
      case "in_attesa":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "rifiutata":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatoLabel = (stato: string) => {
    switch (stato) {
      case "approvata":
        return "Approvata";
      case "in_attesa":
        return "In Attesa";
      case "rifiutata":
        return "Rifiutata";
      default:
        return stato;
    }
  };

  const getStatoIcon = (stato: string) => {
    switch (stato) {
      case "approvata":
        return <CheckCircle className="w-4 h-4" />;
      case "in_attesa":
        return <Clock className="w-4 h-4" />;
      case "rifiutata":
        return <AlertCircle className="w-4 h-4" />;
      default:
        return <FileText className="w-4 h-4" />;
    }
  };

  if (!richiesta) {
    return (
      <div className="min-h-screen bg-background">
        <OncologoNavbar />
        <div className="container mx-auto px-4 py-8">
          <Card>
            <CardContent className="p-8 text-center">
              <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Richiesta Non Trovata</h3>
              <p className="text-gray-500 mb-4">La richiesta con ID {id} non è stata trovata.</p>
              <Button onClick={() => navigate('/oncologico-v2/oncologo/richieste')}>
                Torna alle Richieste
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <OncologoNavbar />

      <div className="container mx-auto px-4 py-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={() => navigate('/oncologico-v2/oncologo/richieste')}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Indietro
            </Button>
            <div>
              <h1 className="text-2xl font-bold">Dettagli Richiesta Prenotazione</h1>
              <p className="text-muted-foreground">Richiesta #{richiesta.id} - {richiesta.paziente}</p>
            </div>
          </div>
          <Badge className={`${getStatoColor(richiesta.stato)} px-4 py-2 text-sm font-medium flex items-center gap-2`}>
            {getStatoIcon(richiesta.stato)}
            {getStatoLabel(richiesta.stato)}
          </Badge>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Informazioni Principali */}
          <div className="lg:col-span-2 space-y-6">
            {/* Informazioni Paziente */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5 text-blue-600" />
                  Informazioni Paziente
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-600">Nome Completo</Label>
                    <p className="text-lg font-semibold text-gray-900">{richiesta.paziente}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-600">Codice Fiscale</Label>
                    <p className="text-lg font-mono text-gray-900">{richiesta.cf}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-600">PDTA di Riferimento</Label>
                    <Badge className="mt-1 bg-blue-50 text-blue-700 border-blue-200 text-base px-3 py-1">
                      {richiesta.pdta}
                    </Badge>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-600">Ambulatorio</Label>
                    <p className="text-lg text-gray-900">{richiesta.ambulatorio}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quesito Diagnostico */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-green-600" />
                  Quesito Diagnostico
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed text-lg">{richiesta.quesito}</p>
              </CardContent>
            </Card>

            {/* Score Clinico */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="w-5 h-5 text-purple-600" />
                  Valutazione Score Clinico
                </CardTitle>
                <CardDescription>
                  Punteggio basato sui parametri clinici valutati
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6 mb-6">
                  <div className="text-center p-6 bg-purple-50 rounded-lg border border-purple-200">
                    <div className="text-4xl font-bold text-purple-600 mb-2">{richiesta.scoreDetails.tosse}</div>
                    <div className="text-lg font-medium text-gray-700">Tosse</div>
                    <div className="text-sm text-gray-500 mt-1">
                      {richiesta.scoreDetails.tosse === 3 ? "Grave" : 
                       richiesta.scoreDetails.tosse === 2 ? "Moderata" : "Lieve"}
                    </div>
                  </div>
                  <div className="text-center p-6 bg-purple-50 rounded-lg border border-purple-200">
                    <div className="text-4xl font-bold text-purple-600 mb-2">{richiesta.scoreDetails.dolore}</div>
                    <div className="text-lg font-medium text-gray-700">Dolore</div>
                    <div className="text-sm text-gray-500 mt-1">
                      {richiesta.scoreDetails.dolore === 3 ? "Intenso" : 
                       richiesta.scoreDetails.dolore === 2 ? "Moderato" : "Lieve"}
                    </div>
                  </div>
                  <div className="text-center p-6 bg-purple-50 rounded-lg border border-purple-200">
                    <div className="text-4xl font-bold text-purple-600 mb-2">{richiesta.scoreDetails.comorbidita}</div>
                    <div className="text-lg font-medium text-gray-700">Comorbidità</div>
                    <div className="text-sm text-gray-500 mt-1">
                      {richiesta.scoreDetails.comorbidita === 3 ? "Multiple" : 
                       richiesta.scoreDetails.comorbidita === 2 ? "Moderate" : "Lieve"}
                    </div>
                  </div>
                </div>
                <div className="text-center p-6 bg-gradient-to-r from-purple-100 to-purple-200 rounded-lg border-2 border-purple-300">
                  <div className="text-5xl font-bold text-purple-700 mb-2">Score Totale: {richiesta.score}</div>
                  <div className="text-lg text-purple-600">
                    {richiesta.score >= 7 ? "Priorità Alta" : 
                     richiesta.score >= 5 ? "Priorità Media" : "Priorità Bassa"}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar Informazioni */}
          <div className="space-y-6">
            {/* Informazioni Richiesta */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-green-600" />
                  Informazioni Richiesta
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-sm font-medium text-gray-600">Medico Richiedente</Label>
                  <p className="text-lg font-semibold text-gray-900">{richiesta.medico}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-600">Codice Ricetta</Label>
                  <p className="text-lg font-mono text-gray-900">{richiesta.codiceRicetta}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-600">Data Richiesta</Label>
                  <p className="text-lg text-gray-900">{richiesta.dataRichiesta}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-600">Ora Richiesta</Label>
                  <p className="text-lg text-gray-900">{richiesta.oraRichiesta}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-600">Stato Attuale</Label>
                  <div className="mt-2">
                    <Badge className={`${getStatoColor(richiesta.stato)} px-4 py-2 text-sm font-medium flex items-center gap-2 w-fit`}>
                      {getStatoIcon(richiesta.stato)}
                      {getStatoLabel(richiesta.stato)}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Azioni */}
            <Card>
              <CardHeader>
                <CardTitle>Azioni</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  className="w-full"
                  onClick={() => navigate(`/oncologico-v2/oncologo/paziente/${richiesta.cf}`)}
                >
                  <User className="w-4 h-4 mr-2" />
                  Visualizza Paziente
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => navigate('/oncologico-v2/oncologo/richieste')}
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Torna alle Richieste
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RichiestaDetailPage;
