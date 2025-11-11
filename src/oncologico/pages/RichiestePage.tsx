import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";
import { Badge } from "@/shared/components/ui/badge";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/shared/components/ui/table";
import { ArrowLeft, Search, Filter, FileText, Clock, CheckCircle, AlertCircle, Download, Eye, User, Calendar, Calculator } from "lucide-react";
import OncologoNavbar from "@/oncologico/components/layout/OncologoNavbar";
import { useNavigate } from "react-router-dom";

// Lista dei 9 PDTA disponibili
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

const RichiestePage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStato, setFilterStato] = useState("tutti");
  const [filterPDTA, setFilterPDTA] = useState("tutti");
  const [selectedDate, setSelectedDate] = useState(() => {
    // Data di default: oggi
    const today = new Date();
    return today.toISOString().split('T')[0]; // formato YYYY-MM-DD
  });

  // Mock data richieste
  const [richieste] = useState([
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
      codiceRicetta: "123456789",
      impegnativaPDF: "impegnativa_mario_rossi.pdf"
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
      codiceRicetta: "987654321",
      impegnativaPDF: "impegnativa_anna_bianchi.pdf"
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
      codiceRicetta: "456789123",
      impegnativaPDF: "impegnativa_giuseppe_verdi.pdf"
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
      codiceRicetta: "789123456",
      impegnativaPDF: "impegnativa_francesca_neri.pdf"
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
      codiceRicetta: "321654987",
      impegnativaPDF: "impegnativa_luigi_ferrari.pdf"
    },
    {
      id: 6,
      cf: "RSSGLI85A41H501U",
      paziente: "Giulia Rossi",
      pdta: "Mammella",
      ambulatorio: "Cure Simultanee",
      quesito: "Valutazione per carcinoma mammario",
      score: 6,
      scoreDetails: { tosse: 2, dolore: 2, comorbidita: 2 },
      dataRichiesta: new Date().toISOString().split('T')[0], // oggi
      oraRichiesta: "10:15",
      stato: "in_attesa",
      medico: "Dr. Carlo Bianchi",
      codiceRicetta: "111222333",
      impegnativaPDF: "impegnativa_giulia_rossi.pdf"
    },
    {
      id: 7,
      cf: "BNCMRC79B12H224W",
      paziente: "Marco Bianchi",
      pdta: "Prostata",
      ambulatorio: "Oncogeriatria",
      quesito: "Discussione caso carcinoma prostatico",
      score: 5,
      scoreDetails: { tosse: 1, dolore: 2, comorbidita: 2 },
      dataRichiesta: new Date().toISOString().split('T')[0], // oggi
      oraRichiesta: "16:45",
      stato: "approvata",
      medico: "Dr. Carlo Bianchi",
      codiceRicetta: "444555666",
      impegnativaPDF: "impegnativa_marco_bianchi.pdf"
    },
    {
      id: 8,
      cf: "VRDSRA92C60H224Z",
      paziente: "Sara Verdi",
      pdta: "Melanoma",
      ambulatorio: "Osteoncologia",
      quesito: "Valutazione lesione cutanea sospetta",
      score: 7,
      scoreDetails: { tosse: 2, dolore: 3, comorbidita: 2 },
      dataRichiesta: new Date().toISOString().split('T')[0], // oggi
      oraRichiesta: "09:30",
      stato: "in_attesa",
      medico: "Dr. Carlo Bianchi",
      codiceRicetta: "777888999",
      impegnativaPDF: "impegnativa_sara_verdi.pdf"
    },
    {
      id: 9,
      cf: "ESPFNC88D15H224A",
      paziente: "Francesca Esposito",
      pdta: "Sistema nervoso centrale",
      ambulatorio: "Cure Simultanee",
      quesito: "Valutazione per metastasi cerebrali",
      score: 9,
      scoreDetails: { tosse: 3, dolore: 3, comorbidita: 3 },
      dataRichiesta: new Date().toISOString().split('T')[0], // oggi
      oraRichiesta: "14:20",
      stato: "rifiutata",
      medico: "Dr. Carlo Bianchi",
      codiceRicetta: "000111222",
      impegnativaPDF: "impegnativa_francesca_esposito.pdf"
    },
    {
      id: 10,
      cf: "FRRLGI65E05H501Y",
      paziente: "Luigi Ferrari",
      pdta: "Colon",
      ambulatorio: "Oncogeriatria",
      quesito: "Follow-up post-chemioterapia",
      score: 4,
      scoreDetails: { tosse: 1, dolore: 1, comorbidita: 2 },
      dataRichiesta: new Date().toISOString().split('T')[0], // oggi
      oraRichiesta: "11:45",
      stato: "approvata",
      medico: "Dr. Carlo Bianchi",
      codiceRicetta: "333444555",
      impegnativaPDF: "impegnativa_luigi_ferrari_oggi.pdf"
    },
    {
      id: 11,
      cf: "GLLCHR90F25H224B",
      paziente: "Chiara Gallo",
      pdta: "Mammella",
      ambulatorio: "Osteoncologia",
      quesito: "Valutazione per carcinoma mammario triplo negativo",
      score: 8,
      scoreDetails: { tosse: 3, dolore: 3, comorbidita: 2 },
      dataRichiesta: new Date().toISOString().split('T')[0], // oggi
      oraRichiesta: "13:15",
      stato: "in_attesa",
      medico: "Dr. Carlo Bianchi",
      codiceRicetta: "666777888",
      impegnativaPDF: "impegnativa_chiara_gallo.pdf"
    },
    {
      id: 12,
      cf: "CSTDVE85G30H224C",
      paziente: "Davide Costa",
      pdta: "Sarcomi dei tessuti molli",
      ambulatorio: "Cure Simultanee",
      quesito: "Valutazione per sarcoma dei tessuti molli",
      score: 6,
      scoreDetails: { tosse: 2, dolore: 2, comorbidita: 2 },
      dataRichiesta: new Date().toISOString().split('T')[0], // oggi
      oraRichiesta: "15:30",
      stato: "approvata",
      medico: "Dr. Carlo Bianchi",
      codiceRicetta: "999000111",
      impegnativaPDF: "impegnativa_davide_costa.pdf"
    },
    {
      id: 13,
      cf: "FNTALX78H12H224D",
      paziente: "Alessandro Fontana",
      pdta: "Polmone",
      ambulatorio: "Oncogeriatria",
      quesito: "Valutazione per carcinoma polmonare a piccole cellule",
      score: 7,
      scoreDetails: { tosse: 3, dolore: 2, comorbidita: 2 },
      dataRichiesta: new Date().toISOString().split('T')[0], // oggi
      oraRichiesta: "08:45",
      stato: "rifiutata",
      medico: "Dr. Carlo Bianchi",
      codiceRicetta: "222333444",
      impegnativaPDF: "impegnativa_alessandro_fontana.pdf"
    },
    {
      id: 14,
      cf: "GRCMRT82I18H224E",
      paziente: "Martina Greco",
      pdta: "Retto",
      ambulatorio: "Osteoncologia",
      quesito: "Valutazione per carcinoma del retto",
      score: 5,
      scoreDetails: { tosse: 1, dolore: 2, comorbidita: 2 },
      dataRichiesta: new Date().toISOString().split('T')[0], // oggi
      oraRichiesta: "12:00",
      stato: "in_attesa",
      medico: "Dr. Carlo Bianchi",
      codiceRicetta: "555666777",
      impegnativaPDF: "impegnativa_martina_greco.pdf"
    }
  ]);

  const handleViewDetails = (richiesta: any) => {
    navigate(`/oncologico/oncologo/richieste/${richiesta.id}`);
  };

  // Logica di filtraggio
  const filteredRichieste = richieste.filter(richiesta => {
    const matchesSearch = !searchTerm ||
      richiesta.paziente.toLowerCase().includes(searchTerm.toLowerCase()) ||
      richiesta.cf.toLowerCase().includes(searchTerm.toLowerCase()) ||
      richiesta.quesito.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStato = filterStato === "tutti" ||
      richiesta.stato === filterStato;

    const matchesPDTA = filterPDTA === "tutti" ||
      richiesta.pdta === filterPDTA;

    const matchesDate = richiesta.dataRichiesta === selectedDate;

    return matchesSearch && matchesStato && matchesPDTA && matchesDate;
  });

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

  const handleExportData = () => {
    const csvContent = [
      ["ID", "Paziente", "CF", "PDTA", "Ambulatorio", "Quesito", "Score", "Stato", "Data Richiesta", "Ora Richiesta"],
      ...filteredRichieste.map(r => [
        r.id, r.paziente, r.cf, r.pdta, r.ambulatorio, r.quesito, 
        r.ambulatorio === "Oncogeriatria" ? "-" : r.score,
        getStatoLabel(r.stato), r.dataRichiesta, r.oraRichiesta
      ])
    ].map(e => e.join(",")).join("\n");

    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([csvContent], { type: "text/csv" }));
    a.download = "richieste_prenotazione.csv";
    a.click();
    window.URL.revokeObjectURL(a.href);
  };

  return (
    <div className="min-h-screen bg-background">
      <OncologoNavbar />

      <div className="container mx-auto px-4 py-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={() => navigate('/oncologico/oncologo')}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Indietro
            </Button>
            <div>
              <h1 className="text-2xl font-bold">Richieste Prenotazione</h1>
              <p className="text-muted-foreground">
                Gestione richieste di prenotazione esami e visite - {new Date(selectedDate).toLocaleDateString('it-IT')}
              </p>
            </div>
          </div>
          <Button onClick={handleExportData}>
            <Download className="w-4 h-4 mr-2" />
            Export Richieste
          </Button>
        </div>

        {/* Barra di ricerca e filtri */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex flex-wrap items-center gap-4">
              {/* Ricerca */}
              <div className="flex items-center gap-2 flex-1 min-w-[300px]">
                <Search className="w-4 h-4 text-gray-500" />
                <Input
                  placeholder="Cerca per paziente, CF o quesito..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="flex-1"
                />
              </div>

              {/* Filtro Stato */}
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-gray-500" />
                <Label className="text-sm font-medium">Stato:</Label>
                <Select value={filterStato} onValueChange={setFilterStato}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tutti">Tutti</SelectItem>
                    <SelectItem value="in_attesa">In Attesa</SelectItem>
                    <SelectItem value="approvata">Approvata</SelectItem>
                    <SelectItem value="rifiutata">Rifiutata</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Filtro PDTA */}
              <div className="flex items-center gap-2">
                <Label className="text-sm font-medium">PDTA:</Label>
                <Select value={filterPDTA} onValueChange={setFilterPDTA}>
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tutti">Tutti i PDTA</SelectItem>
                    {PDTA_LIST.map((pdta) => (
                      <SelectItem key={pdta} value={pdta}>{pdta}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Filtro Data */}
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-gray-500" />
                <Label className="text-sm font-medium">Data:</Label>
                <Input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-40"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Statistiche */}
        <div className="grid md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <FileText className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Totale Richieste</p>
                  <p className="text-xl font-bold">{filteredRichieste.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                  <Clock className="w-5 h-5 text-yellow-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">In Attesa</p>
                  <p className="text-xl font-bold">{filteredRichieste.filter(r => r.stato === "in_attesa").length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Approvate</p>
                  <p className="text-xl font-bold">{filteredRichieste.filter(r => r.stato === "approvata").length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                  <AlertCircle className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Rifiutate</p>
                  <p className="text-xl font-bold">{filteredRichieste.filter(r => r.stato === "rifiutata").length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabella Richieste */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Elenco Richieste
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead className="font-semibold text-gray-700">Paziente</TableHead>
                  <TableHead className="font-semibold text-gray-700">CF</TableHead>
                  <TableHead className="font-semibold text-gray-700">PDTA</TableHead>
                  <TableHead className="font-semibold text-gray-700">Ambulatorio</TableHead>
                  <TableHead className="font-semibold text-gray-700">Quesito</TableHead>
                  <TableHead className="font-semibold text-gray-700">Score</TableHead>
                  <TableHead className="font-semibold text-gray-700">Stato</TableHead>
                  <TableHead className="font-semibold text-gray-700">Data</TableHead>
                  <TableHead className="font-semibold text-gray-700">Azioni</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRichieste.map((richiesta) => (
                  <TableRow key={richiesta.id} className="hover:bg-gray-50 border-b border-gray-100">
                    <TableCell className="font-medium text-gray-900 py-4">{richiesta.paziente}</TableCell>
                    <TableCell className="font-mono text-sm text-gray-600 py-4">{richiesta.cf}</TableCell>
                    <TableCell className="py-4">
                      <Badge className="bg-blue-50 text-blue-700 border-blue-200 px-3 py-1 rounded-full text-sm font-medium">
                        {richiesta.pdta.toUpperCase()}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-gray-700 py-4">{richiesta.ambulatorio}</TableCell>
                    <TableCell className="text-gray-700 py-4 max-w-xs truncate" title={richiesta.quesito}>
                      {richiesta.quesito}
                    </TableCell>
                    <TableCell className="py-4">
                      {richiesta.ambulatorio === "Oncogeriatria" ? (
                        <span className="text-gray-400 text-sm italic">-</span>
                      ) : (
                        <Badge className="bg-purple-50 text-purple-700 border-purple-200 px-3 py-1 rounded-full text-sm font-medium">
                          {richiesta.score}
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell className="py-4">
                      <Badge className={`${getStatoColor(richiesta.stato)} px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1 w-fit`}>
                        {getStatoIcon(richiesta.stato)}
                        {getStatoLabel(richiesta.stato)}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-gray-700 py-4">
                      <div className="text-sm">
                        <div>{richiesta.dataRichiesta}</div>
                        <div className="text-gray-500">{richiesta.oraRichiesta}</div>
                      </div>
                    </TableCell>
                    <TableCell className="py-4">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleViewDetails(richiesta)}
                        className="border-gray-300 text-gray-700 hover:bg-gray-50"
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        Dettagli
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Messaggio se non ci sono richieste */}
        {filteredRichieste.length === 0 && (
          <Card>
            <CardContent className="p-8 text-center">
              <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Nessuna Richiesta Trovata</h3>
              <p className="text-gray-500">Non ci sono richieste che corrispondono ai filtri selezionati.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default RichiestePage;
