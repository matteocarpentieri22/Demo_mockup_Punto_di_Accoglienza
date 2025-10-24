import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";
import { Badge } from "@/shared/components/ui/badge";
import { Label } from "@/shared/components/ui/label";
import { ArrowLeft, FileText, User, Calendar, Calculator, Clock, CheckCircle, AlertCircle, Eye, Download } from "lucide-react";
import OncologoNavbar from "@/oncologico/components/OncologoNavbar";
import { useNavigate, useParams } from "react-router-dom";

// Mock data richieste (stesso array della pagina principale)
const RICHIESTE_DATA = [
  {
    id: 1,
    cf: "RSSMRA80A01H501U",
    paziente: "Mario Rossi",
    pdta: "Polmone",
    ambulatorio: "Cure Simultanee",
    quesito: "Valutazione per stadiazione carcinoma polmonare non a piccole cellule. Paziente presenta nodulo polmonare destro di 3.5 cm con possibile coinvolgimento linfonodale ilare.",
    score: 8,
    scoreDetails: { tosse: 3, dolore: 3, comorbidita: 2 },
    dataRichiesta: "2024-01-20",
    oraRichiesta: "14:30",
    stato: "in_attesa",
    medico: "Dr. Carlo Bianchi",
    codiceRicetta: "123456789",
    impegnativaPDF: "impegnativa_mario_rossi.pdf"
  },
  {
    id: 2,
    cf: "BNCNNA75B02H501V",
    paziente: "Anna Bianchi",
    pdta: "Mammella",
    ambulatorio: "Oncogeriatria",
    quesito: "Discussione caso per carcinoma mammario triplo negativo. Paziente di 75 anni con massa mammaria sinistra di 2.8 cm, linfonodi ascellari sospetti.",
    score: 7,
    scoreDetails: { tosse: 2, dolore: 3, comorbidita: 2 },
    dataRichiesta: "2024-01-20",
    oraRichiesta: "16:45",
    stato: "approvata",
    medico: "Dr. Elena Verdi",
    codiceRicetta: "987654321",
    impegnativaPDF: "impegnativa_anna_bianchi.pdf"
  },
  {
    id: 3,
    cf: "VRDGPP70C03H501W",
    paziente: "Giuseppe Verdi",
    pdta: "Prostata",
    ambulatorio: "Oncogeriatria",
    quesito: "Valutazione oncogeriatrica per carcinoma prostatico ad alto rischio. PSA 15.2 ng/ml, Gleason score 8, T3aN0M0.",
    score: 6,
    scoreDetails: { tosse: 2, dolore: 2, comorbidita: 2 },
    dataRichiesta: "2024-01-19",
    oraRichiesta: "11:20",
    stato: "in_attesa",
    medico: "Dr. Marco Rossi",
    codiceRicetta: "456789123",
    impegnativaPDF: "impegnativa_giuseppe_verdi.pdf"
  },
  {
    id: 4,
    cf: "NRIFNC85D04H501X",
    paziente: "Francesca Neri",
    pdta: "Sistema nervoso centrale",
    ambulatorio: "Osteoncologia",
    quesito: "Valutazione per lesione cerebrale sospetta. RMN encefalo mostra lesione iperintensa di 1.8 cm nel lobo frontale sinistro con enhancement contrastografico.",
    score: 5,
    scoreDetails: { tosse: 1, dolore: 2, comorbidita: 2 },
    dataRichiesta: "2024-01-19",
    oraRichiesta: "09:15",
    stato: "rifiutata",
    medico: "Dr. Carlo Bianchi",
    codiceRicetta: "789123456",
    impegnativaPDF: "impegnativa_francesca_neri.pdf"
  },
  {
    id: 5,
    cf: "FRRLGI65E05H501Y",
    paziente: "Luigi Ferrari",
    pdta: "Colon",
    ambulatorio: "Osteoncologia",
    quesito: "Follow-up post-intervento chirurgico per adenocarcinoma del colon. Resezione anteriore bassa eseguita 6 mesi fa, stadio pT3N1M0.",
    score: 4,
    scoreDetails: { tosse: 1, dolore: 1, comorbidita: 2 },
    dataRichiesta: "2024-01-18",
    oraRichiesta: "15:30",
    stato: "approvata",
    medico: "Dr. Elena Verdi",
    codiceRicetta: "321654987",
    impegnativaPDF: "impegnativa_luigi_ferrari.pdf"
  },
  {
    id: 6,
    cf: "RMNLNE88F06H501Z",
    paziente: "Elena Romano",
    pdta: "Mammella",
    ambulatorio: "Cure Simultanee",
    quesito: "Valutazione per carcinoma mammario HER2 positivo. Paziente giovane con massa di 4.2 cm, metastasi linfonodali multiple.",
    score: 9,
    scoreDetails: { tosse: 3, dolore: 3, comorbidita: 3 },
    dataRichiesta: "2024-01-18",
    oraRichiesta: "13:45",
    stato: "in_attesa",
    medico: "Dr. Marco Rossi",
    codiceRicetta: "654321987",
    impegnativaPDF: "impegnativa_elena_romano.pdf"
  },
  {
    id: 7,
    cf: "CNTMRC72G07H501A",
    paziente: "Marco Conti",
    pdta: "Polmone",
    ambulatorio: "Oncogeriatria",
    quesito: "Valutazione per carcinoma polmonare a piccole cellule. Paziente di 72 anni con massa mediastinica estesa e coinvolgimento pleurico.",
    score: 7,
    scoreDetails: { tosse: 3, dolore: 2, comorbidita: 2 },
    dataRichiesta: "2024-01-17",
    oraRichiesta: "10:30",
    stato: "approvata",
    medico: "Dr. Carlo Bianchi",
    codiceRicetta: "147258369",
    impegnativaPDF: "impegnativa_marco_conti.pdf"
  },
  {
    id: 8,
    cf: "SNTLRA69H08H501B",
    paziente: "Laura Santini",
    pdta: "Ovaio",
    ambulatorio: "Cure Simultanee",
    quesito: "Discussione caso per carcinoma ovarico avanzato. Stadio FIGO IIIc con carcinosi peritoneale estesa, CA-125 850 U/ml.",
    score: 8,
    scoreDetails: { tosse: 2, dolore: 3, comorbidita: 3 },
    dataRichiesta: "2024-01-17",
    oraRichiesta: "14:20",
    stato: "in_attesa",
    medico: "Dr. Elena Verdi",
    codiceRicetta: "258369147",
    impegnativaPDF: "impegnativa_laura_santini.pdf"
  },
  {
    id: 9,
    cf: "GLLRRT75I09H501C",
    paziente: "Roberto Galli",
    pdta: "Sarcoma",
    ambulatorio: "Osteoncologia",
    quesito: "Valutazione per sarcoma dei tessuti molli della coscia. Lesione di 8.5 cm con possibile coinvolgimento vascolare e nervoso.",
    score: 6,
    scoreDetails: { tosse: 1, dolore: 3, comorbidita: 2 },
    dataRichiesta: "2024-01-16",
    oraRichiesta: "16:10",
    stato: "rifiutata",
    medico: "Dr. Marco Rossi",
    codiceRicetta: "369147258",
    impegnativaPDF: "impegnativa_roberto_galli.pdf"
  },
  {
    id: 10,
    cf: "MRTSLV81L10H501D",
    paziente: "Silvia Moretti",
    pdta: "Mammella",
    ambulatorio: "Oncogeriatria",
    quesito: "Follow-up per carcinoma mammario luminale A. Mastectomia radicale eseguita 2 anni fa, attualmente in terapia ormonale con tamoxifene.",
    score: 3,
    scoreDetails: { tosse: 1, dolore: 1, comorbidita: 1 },
    dataRichiesta: "2024-01-16",
    oraRichiesta: "11:45",
    stato: "approvata",
    medico: "Dr. Carlo Bianchi",
    codiceRicetta: "741852963",
    impegnativaPDF: "impegnativa_silvia_moretti.pdf"
  },
  {
    id: 11,
    cf: "RVALSX77M11H501E",
    paziente: "Alessandro Riva",
    pdta: "Sarcoma",
    ambulatorio: "Osteoncologia",
    quesito: "Valutazione per osteosarcoma del femore distale. Paziente giovane con lesione osteolitica di 6.2 cm e frattura patologica.",
    score: 7,
    scoreDetails: { tosse: 2, dolore: 3, comorbidita: 2 },
    dataRichiesta: "2024-01-15",
    oraRichiesta: "15:00",
    stato: "in_attesa",
    medico: "Dr. Elena Verdi",
    codiceRicetta: "852963741",
    impegnativaPDF: "impegnativa_alessandro_riva.pdf"
  },
  {
    id: 12,
    cf: "DLCCRA83N12H501F",
    paziente: "Chiara De Luca",
    pdta: "Pancreas",
    ambulatorio: "Cure Simultanee",
    quesito: "Valutazione per adenocarcinoma pancreatico. Massa cefalica di 3.8 cm con coinvolgimento vascolare e possibile metastasi epatiche.",
    score: 8,
    scoreDetails: { tosse: 2, dolore: 3, comorbidita: 3 },
    dataRichiesta: "2024-01-15",
    oraRichiesta: "09:30",
    stato: "approvata",
    medico: "Dr. Marco Rossi",
    codiceRicetta: "963741852",
    impegnativaPDF: "impegnativa_chiara_de_luca.pdf"
  },
  {
    id: 13,
    cf: "MRTPLO79O13H501G",
    paziente: "Paolo Martini",
    pdta: "Prostata",
    ambulatorio: "Oncogeriatria",
    quesito: "Follow-up per carcinoma prostatico localizzato. Prostatectomia radicale eseguita 18 mesi fa, PSA indosabile, continenza recuperata.",
    score: 2,
    scoreDetails: { tosse: 0, dolore: 1, comorbidita: 1 },
    dataRichiesta: "2024-01-14",
    oraRichiesta: "14:15",
    stato: "approvata",
    medico: "Dr. Carlo Bianchi",
    codiceRicetta: "159753486",
    impegnativaPDF: "impegnativa_paolo_martini.pdf"
  },
  {
    id: 14,
    cf: "CSTVLN85P14H501H",
    paziente: "Valentina Costa",
    pdta: "Ovaio",
    ambulatorio: "Cure Simultanee",
    quesito: "Valutazione per carcinoma ovarico borderline. Cisti ovarica bilaterale di 12 cm con aspetti sospetti all'ecografia.",
    score: 5,
    scoreDetails: { tosse: 1, dolore: 2, comorbidita: 2 },
    dataRichiesta: "2024-01-14",
    oraRichiesta: "16:30",
    stato: "in_attesa",
    medico: "Dr. Elena Verdi",
    codiceRicetta: "357159486",
    impegnativaPDF: "impegnativa_valentina_costa.pdf"
  },
  {
    id: 15,
    cf: "LNNFBA71Q15H501I",
    paziente: "Fabio Leone",
    pdta: "Sarcoma",
    ambulatorio: "Osteoncologia",
    quesito: "Valutazione per condrosarcoma della scapola. Lesione osteolitica di 4.5 cm con distruzione corticale e coinvolgimento dei tessuti molli.",
    score: 6,
    scoreDetails: { tosse: 1, dolore: 3, comorbidita: 2 },
    dataRichiesta: "2024-01-13",
    oraRichiesta: "12:00",
    stato: "rifiutata",
    medico: "Dr. Marco Rossi",
    codiceRicetta: "486357159",
    impegnativaPDF: "impegnativa_fabio_leone.pdf"
  },
  {
    id: 16,
    cf: "FNTALX78H12H224D",
    paziente: "Alessandro Fontana",
    pdta: "Polmone",
    ambulatorio: "Oncogeriatria",
    quesito: "Valutazione per carcinoma polmonare a piccole cellule esteso. Massa mediastinica di 7.2 cm con sindrome della vena cava superiore.",
    score: 9,
    scoreDetails: { tosse: 3, dolore: 3, comorbidita: 3 },
    dataRichiesta: "2024-01-13",
    oraRichiesta: "08:45",
    stato: "approvata",
    medico: "Dr. Carlo Bianchi",
    codiceRicetta: "222333444",
    impegnativaPDF: "impegnativa_alessandro_fontana.pdf"
  },
  {
    id: 17,
    cf: "GRCMRT82I18H224E",
    paziente: "Martina Greco",
    pdta: "Retto",
    ambulatorio: "Osteoncologia",
    quesito: "Valutazione per carcinoma del retto T3N1M0. Massa di 4.8 cm con coinvolgimento della fascia mesorettale e linfonodi sospetti.",
    score: 7,
    scoreDetails: { tosse: 2, dolore: 3, comorbidita: 2 },
    dataRichiesta: "2024-01-12",
    oraRichiesta: "12:00",
    stato: "in_attesa",
    medico: "Dr. Elena Verdi",
    codiceRicetta: "555666777",
    impegnativaPDF: "impegnativa_martina_greco.pdf"
  },
  {
    id: 18,
    cf: "RSSGPP73J25H224F",
    paziente: "Giuseppe Rossi",
    pdta: "Vescica",
    ambulatorio: "Oncogeriatria",
    quesito: "Valutazione per carcinoma vescicale muscolo-invasivo. Lesione di 3.2 cm con coinvolgimento del muscolo detrusore.",
    score: 6,
    scoreDetails: { tosse: 2, dolore: 2, comorbidita: 2 },
    dataRichiesta: "2024-01-12",
    oraRichiesta: "10:30",
    stato: "approvata",
    medico: "Dr. Marco Rossi",
    codiceRicetta: "888999000",
    impegnativaPDF: "impegnativa_giuseppe_rossi.pdf"
  },
  {
    id: 19,
    cf: "BNCMRT76K30H224G",
    paziente: "Martina Bianchi",
    pdta: "Mammella",
    ambulatorio: "Cure Simultanee",
    quesito: "Valutazione per carcinoma mammario triplo positivo. Massa di 2.5 cm con coinvolgimento linfonodale ascellare e possibile metastasi ossee.",
    score: 8,
    scoreDetails: { tosse: 2, dolore: 3, comorbidita: 3 },
    dataRichiesta: "2024-01-11",
    oraRichiesta: "15:45",
    stato: "in_attesa",
    medico: "Dr. Carlo Bianchi",
    codiceRicetta: "111222333",
    impegnativaPDF: "impegnativa_martina_bianchi.pdf"
  },
  {
    id: 20,
    cf: "VRDALX79L05H224H",
    paziente: "Alessandro Verdi",
    pdta: "Polmone",
    ambulatorio: "Osteoncologia",
    quesito: "Valutazione per carcinoma polmonare non a piccole cellule con mutazione EGFR. Nodulo di 2.8 cm nel lobo superiore destro.",
    score: 5,
    scoreDetails: { tosse: 2, dolore: 2, comorbidita: 1 },
    dataRichiesta: "2024-01-11",
    oraRichiesta: "11:20",
    stato: "rifiutata",
    medico: "Dr. Elena Verdi",
    codiceRicetta: "444555666",
    impegnativaPDF: "impegnativa_alessandro_verdi.pdf"
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

  const handleViewPDF = () => {
    // Simula l'apertura del PDF in una nuova finestra
    window.open(`/pdf/${richiesta.impegnativaPDF}`, '_blank');
  };

  const handleDownloadPDF = () => {
    // Simula il download del PDF
    const link = document.createElement('a');
    link.href = `/pdf/${richiesta.impegnativaPDF}`;
    link.download = richiesta.impegnativaPDF;
    link.click();
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
              <Button onClick={() => navigate('/oncologico/oncologo/richieste')}>
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
            <Button variant="ghost" size="sm" onClick={() => navigate('/oncologico/oncologo/richieste')}>
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
                  <Label className="text-sm font-medium text-gray-600">PDF Impegnativa</Label>
                  <div className="mt-2 space-y-2">
                    <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg border">
                      <FileText className="w-5 h-5 text-blue-600" />
                      <span className="text-sm font-medium text-gray-900">{richiesta.impegnativaPDF}</span>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleViewPDF}
                        className="flex items-center gap-2"
                      >
                        <Eye className="w-4 h-4" />
                        Visualizza PDF
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleDownloadPDF}
                        className="flex items-center gap-2"
                      >
                        <Download className="w-4 h-4" />
                        Scarica PDF
                      </Button>
                    </div>
                  </div>
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
                  onClick={() => navigate(`/oncologico/oncologo/paziente/${richiesta.cf}`)}
                >
                  <User className="w-4 h-4 mr-2" />
                  Visualizza Paziente
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => navigate('/oncologico/oncologo/richieste')}
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
