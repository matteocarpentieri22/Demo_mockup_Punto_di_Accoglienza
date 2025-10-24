import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";
import { Badge } from "@/shared/components/ui/badge";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/shared/components/ui/table";
import { ArrowLeft, Download, Eye, Users, Search, Filter, FileText } from "lucide-react";
import CaseManagerNavbar from "@/oncologico/components/CaseManagerNavbar";
import { useNavigate } from "react-router-dom";

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

const PazientiListPage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterAmbulatorio, setFilterAmbulatorio] = useState("tutti");
  const [filterPDTA, setFilterPDTA] = useState("tutti");
  const [filterSlot, setFilterSlot] = useState("tutti");

  // Mock data pazienti ordinati per score
  const [patients] = useState([
    {
      id: 1,
      cognome: "Rossi",
      nome: "Mario",
      cf: "RSSMRA80A01H501U",
      pdta: "Polmone",
      visitaRichiesta: "Oncologica",
      ambulatorio: "Cure Simultanee",
      medicoMittente: "Dr. Bianchi",
      score: 8,
      slotPrenotato: true,
      dataPrenotazione: "2024-01-20",
      oraPrenotazione: "09:30",
      impegnativaPDF: "impegnativa_mario_rossi.pdf",
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
      ambulatorio: "Oncogeriatria",
      medicoMittente: "Dr. Verdi",
      score: 7,
      slotPrenotato: false,
      dataPrenotazione: null,
      oraPrenotazione: null,
      impegnativaPDF: "impegnativa_anna_bianchi.pdf",
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
      ambulatorio: "Oncogeriatria",
      medicoMittente: "Dr. Rossi",
      score: 6,
      slotPrenotato: true,
      dataPrenotazione: "2024-01-18",
      oraPrenotazione: "14:00",
      impegnativaPDF: "impegnativa_giuseppe_verdi.pdf",
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
      ambulatorio: "Osteoncologia",
      medicoMittente: "Dr. Bianchi",
      score: 5,
      slotPrenotato: false,
      dataPrenotazione: null,
      oraPrenotazione: null,
      impegnativaPDF: "impegnativa_francesca_neri.pdf",
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
      ambulatorio: "Osteoncologia",
      medicoMittente: "Dr. Verdi",
      score: 4,
      slotPrenotato: true,
      dataPrenotazione: "2024-01-22",
      oraPrenotazione: "10:00",
      impegnativaPDF: "impegnativa_luigi_ferrari.pdf",
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
      ambulatorio: "Cure Simultanee",
      medicoMittente: "Dr. Bianchi",
      score: 3,
      slotPrenotato: false,
      dataPrenotazione: null,
      oraPrenotazione: null,
      impegnativaPDF: "impegnativa_maria_romano.pdf",
      comorbidita: [],
      storicoVisite: [
        { data: "2024-01-18", tipo: "Visita dermatologica", medico: "Dr. Bianchi", esito: "Discussione caso" }
      ],
      storicoScore: [
        { data: "2024-01-18", score: 3, parametri: { tosse: 1, dolore: 1, comorbidita: 1 } }
      ]
    }
  ]);

  // Logica di filtraggio
  const filteredPatients = patients.filter(patient => {
    const matchesSearch = !searchTerm || 
      patient.cognome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.cf.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesAmbulatorio = filterAmbulatorio === "tutti" || 
      patient.ambulatorio === filterAmbulatorio;
    
    const matchesPDTA = filterPDTA === "tutti" || 
      patient.pdta === filterPDTA;
    
    const matchesSlot = filterSlot === "tutti" || 
      (filterSlot === "prenotato" && patient.slotPrenotato) ||
      (filterSlot === "da-prenotare" && !patient.slotPrenotato);
    
    return matchesSearch && matchesAmbulatorio && matchesPDTA && matchesSlot;
  });

  const handleExportData = () => {
    // Export elenco pazienti
    const csvContent = [
      ["Cognome", "Nome", "CF", "PDTA", "Visita Richiesta", "Medico Mittente", "Score", "Slot Prenotato", "Data Prenotazione", "Ora Prenotazione", "Ambulatorio"],
      ...patients.map(patient => [
        patient.cognome,
        patient.nome,
        patient.cf,
        patient.pdta,
        patient.visitaRichiesta,
        patient.medicoMittente,
        patient.score,
        patient.slotPrenotato ? "Sì" : "No",
        patient.dataPrenotazione || "",
        patient.oraPrenotazione || "",
        patient.ambulatorio || ""
      ])
    ].map(row => row.join(",")).join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `pazienti_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };


  const getScoreColor = (score: number) => {
    if (score >= 7) return "bg-red-100 text-red-800";
    if (score >= 5) return "bg-yellow-100 text-yellow-800";
    return "bg-green-100 text-green-800";
  };

  // Logica demo: tempi attesi in base allo score
  // - Score 7-10: entro 3 giorni
  // - Score 5-6: entro 7 giorni
  // - Score 1-4: entro 14 giorni
  const getDeadlineDays = (score: number) => {
    if (score >= 7) return 3;
    if (score >= 5) return 7;
    return 14;
  };

  const isOnTime = (patient: any) => {
    if (!patient.dataPrenotazione) return false; // non prenotato => non in tempo
    // Per la demo, assumiamo che la richiesta sia la prima data dello storicoScore
    const firstScoreDate = patient.storicoScore?.[0]?.data || "2024-01-01";
    const requestDate = new Date(firstScoreDate);
    const bookingDate = new Date(patient.dataPrenotazione);
    const diffDays = Math.ceil((bookingDate.getTime() - requestDate.getTime()) / (1000 * 60 * 60 * 24));
    const deadline = getDeadlineDays(patient.score);
    return diffDays <= deadline;
  };

  return (
    <div className="min-h-screen bg-background">
      <CaseManagerNavbar />

      <div className="container mx-auto px-4 py-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={() => navigate('/oncologico/case-manager')}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Indietro
            </Button>
            <div>
              <h1 className="text-2xl font-bold">Lista Pazienti</h1>
              <p className="text-muted-foreground">Elenco pazienti ordinato per score clinico</p>
            </div>
          </div>
          <Button onClick={handleExportData}>
            <Download className="w-4 h-4 mr-2" />
            Export Pazienti
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
                  placeholder="Cerca per cognome, nome o codice fiscale..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="flex-1"
                />
              </div>
              
              {/* Filtro Ambulatorio */}
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-gray-500" />
                <Label className="text-sm font-medium">Ambulatorio:</Label>
                <Select value={filterAmbulatorio} onValueChange={setFilterAmbulatorio}>
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tutti">Tutti gli Ambulatori</SelectItem>
                    <SelectItem value="Cure Simultanee">Cure Simultanee</SelectItem>
                    <SelectItem value="Oncogeriatria">Oncogeriatria</SelectItem>
                    <SelectItem value="Osteoncologia">Osteoncologia</SelectItem>
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
              
              {/* Filtro Slot */}
              <div className="flex items-center gap-2">
                <Label className="text-sm font-medium">Slot:</Label>
                <Select value={filterSlot} onValueChange={setFilterSlot}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tutti">Tutti</SelectItem>
                    <SelectItem value="prenotato">Prenotato</SelectItem>
                    <SelectItem value="da-prenotare">Da Prenotare</SelectItem>
                  </SelectContent>
                </Select>
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
                  <Users className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Totale Pazienti</p>
                  <p className="text-xl font-bold">{filteredPatients.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <div className="w-5 h-5 bg-green-600 rounded-full"></div>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Prenotati</p>
                  <p className="text-xl font-bold">{filteredPatients.filter(p => p.slotPrenotato).length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                  <div className="w-5 h-5 bg-yellow-600 rounded-full"></div>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Da Prenotare</p>
                  <p className="text-xl font-bold">{filteredPatients.filter(p => !p.slotPrenotato).length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                  <div className="w-5 h-5 bg-red-600 rounded-full"></div>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Score Alto</p>
                  <p className="text-xl font-bold">{filteredPatients.filter(p => p.score >= 7).length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabella Pazienti */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              Elenco Pazienti
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead className="font-semibold text-gray-700">Cognome</TableHead>
                  <TableHead className="font-semibold text-gray-700">Nome</TableHead>
                  <TableHead className="font-semibold text-gray-700">CF</TableHead>
                  <TableHead className="font-semibold text-gray-700">PDTA</TableHead>
                  <TableHead className="font-semibold text-gray-700">Ambulatorio</TableHead>
                  <TableHead className="font-semibold text-gray-700">Medico Mittente</TableHead>
                  <TableHead className="font-semibold text-gray-700">Score</TableHead>
                  <TableHead className="font-semibold text-gray-700">Slot</TableHead>
                  <TableHead className="font-semibold text-gray-700">In Tempo</TableHead>
                  <TableHead className="font-semibold text-gray-700">PDF Impegnativa</TableHead>
                  <TableHead className="font-semibold text-gray-700">Azioni</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPatients.map((patient) => (
                  <TableRow key={patient.id} className="hover:bg-gray-50 border-b border-gray-100">
                    <TableCell className="font-medium text-gray-900 py-4">{patient.cognome}</TableCell>
                    <TableCell className="text-gray-700 py-4">{patient.nome}</TableCell>
                    <TableCell className="font-mono text-sm text-gray-600 py-4">{patient.cf}</TableCell>
                    <TableCell className="py-4">
                      <Badge className="bg-blue-50 text-blue-700 border-blue-200 px-3 py-1 rounded-full text-sm font-medium">
                        {patient.pdta.toUpperCase()}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-gray-700 py-4">{patient.ambulatorio}</TableCell>
                    <TableCell className="text-gray-700 py-4">{patient.medicoMittente}</TableCell>
                    <TableCell className="py-4">
                      <Badge className={getScoreColor(patient.score)}>
                        {patient.score}
                      </Badge>
                    </TableCell>
                    <TableCell className="py-4">
                      {patient.slotPrenotato ? (
                        <Badge className="bg-green-50 text-green-700 border-green-200 px-3 py-1 rounded-full text-sm font-medium">
                          Prenotato
                        </Badge>
                      ) : (
                        <Badge className="bg-yellow-50 text-yellow-700 border-yellow-200 px-3 py-1 rounded-full text-sm font-medium">
                          Da Prenotare
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell className="py-4">
                      {patient.slotPrenotato ? (
                        isOnTime(patient) ? (
                          <Badge className="bg-green-100 text-green-800">In tempo</Badge>
                        ) : (
                          <Badge className="bg-red-100 text-red-800">Fuori tempo</Badge>
                        )
                      ) : (
                        <Badge className="bg-gray-100 text-gray-700">N/D</Badge>
                      )}
                    </TableCell>
                    <TableCell className="py-4">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => window.open(`/pdf/${patient.impegnativaPDF}`, '_blank')}
                        className="border-blue-300 text-blue-700 hover:bg-blue-50"
                      >
                        <Eye className="w-3 h-3 mr-1" />
                        Visualizza
                      </Button>
                    </TableCell>
                    <TableCell className="py-4">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => navigate(`/oncologico/paziente/${patient.cf}`)}
                        className="border-gray-300 text-gray-700 hover:bg-gray-50"
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        Scheda Paziente
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PazientiListPage;
