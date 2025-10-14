import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";
import { Badge } from "@/shared/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/shared/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/components/ui/tabs";
import { ArrowLeft, Calendar, Users, FileText, Clock, CheckCircle, AlertCircle, Download, Plus, Eye, User, Trash2 } from "lucide-react";
import OsteoncologiaNavbar from "@/oncologico-v2/components/OsteoncologiaNavbar";
import { useNavigate } from "react-router-dom";

const OsteoncologiaPage = () => {
  const navigate = useNavigate();

  // Mock data per occupazione giornaliera
  const [occupazione] = useState([
    { ora: "08:00", paziente: "Francesca Neri", cf: "NRIFNC85D04H501X", tipo: "Visita osteoncologica", medico: "Dr. Bianchi", stato: "Completata" },
    { ora: "09:00", paziente: "Luigi Ferrari", cf: "FRRLGI65E05H501Y", tipo: "Follow-up post-chirurgia", medico: "Dr. Verdi", stato: "In corso" },
    { ora: "10:00", paziente: "Marco Rossi", cf: "RSSMRC70C03H501W", tipo: "Discussione caso", medico: "Dr. Rossi", stato: "Programmata" },
    { ora: "11:00", paziente: "Sofia Bianchi", cf: "BNCSFA80A01H501U", tipo: "Visita controllo", medico: "Dr. Bianchi", stato: "Programmata" },
    { ora: "14:00", paziente: "Alessandro Verdi", cf: "VRDLSR75B02H501V", tipo: "Prima visita", medico: "Dr. Verdi", stato: "Programmata" },
    { ora: "15:00", paziente: "Giulia Neri", cf: "NRIGLI60E05H501Y", tipo: "Follow-up", medico: "Dr. Rossi", stato: "Programmata" },
    { ora: "16:00", paziente: "Roberto Ferrari", cf: "FRRRBR55F06H501Z", tipo: "Valutazione pre-chirurgica", medico: "Dr. Bianchi", stato: "Programmata" }
  ]);

  // Mock data per pianificazione settimanale
  const [pianificazione] = useState([
    { giorno: "Lunedì", data: "2024-01-22", visite: 7, completate: 6, inCorso: 1, programmate: 0 },
    { giorno: "Martedì", data: "2024-01-23", visite: 6, completate: 4, inCorso: 0, programmate: 2 },
    { giorno: "Mercoledì", data: "2024-01-24", visite: 8, completate: 3, inCorso: 2, programmate: 3 },
    { giorno: "Giovedì", data: "2024-01-25", visite: 5, completate: 2, inCorso: 1, programmate: 2 },
    { giorno: "Venerdì", data: "2024-01-26", visite: 7, completate: 1, inCorso: 0, programmate: 6 }
  ]);

  // Mock data per verbali visite
  const [verbali] = useState([
    {
      id: 1,
      data: "2024-01-20",
      ora: "09:00",
      paziente: "Francesca Neri",
      cf: "NRIFNC85D04H501X",
      medico: "Dr. Bianchi",
      tipo: "Visita osteoncologica",
      verbale: "Paziente con osteosarcoma del femore destro. Valutazione imaging completa. Indicazione a chemioterapia neoadiuvante seguita da intervento chirurgico conservativo. Buona compliance del paziente.",
      esito: "Completata"
    },
    {
      id: 2,
      data: "2024-01-20",
      ora: "10:30",
      paziente: "Luigi Ferrari",
      cf: "FRRLGI65E05H501Y",
      medico: "Dr. Verdi",
      tipo: "Follow-up post-chirurgia",
      verbale: "Paziente in follow-up dopo intervento chirurgico per osteosarcoma. Buona guarigione della ferita chirurgica. Continuare fisioterapia e follow-up radiologico trimestrale.",
      esito: "Completata"
    },
    {
      id: 3,
      data: "2024-01-19",
      ora: "14:00",
      paziente: "Marco Rossi",
      cf: "RSSMRC70C03H501W",
      medico: "Dr. Rossi",
      tipo: "Discussione caso multidisciplinare",
      verbale: "Discussione caso sarcoma dei tessuti molli con coinvolgimento osseo. Confermata indicazione a trattamento multidisciplinare con chemioterapia e radioterapia.",
      esito: "Completata"
    },
    {
      id: 4,
      data: "2024-01-19",
      ora: "15:30",
      paziente: "Sofia Bianchi",
      cf: "BNCSFA80A01H501U",
      medico: "Dr. Bianchi",
      tipo: "Visita controllo",
      verbale: "Paziente stabile dopo trattamento per metastasi ossee. Dolore ben controllato. Continuare terapia di supporto e follow-up mensile.",
      esito: "Completata"
    }
  ]);

  const getStatoColor = (stato: string) => {
    switch (stato) {
      case "Completata":
        return "bg-green-100 text-green-800 border-green-200";
      case "In corso":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "Programmata":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatoIcon = (stato: string) => {
    switch (stato) {
      case "Completata":
        return <CheckCircle className="w-4 h-4" />;
      case "In corso":
        return <Clock className="w-4 h-4" />;
      case "Programmata":
        return <Calendar className="w-4 h-4" />;
      default:
        return <AlertCircle className="w-4 h-4" />;
    }
  };

  const handleExportOccupazione = () => {
    const csvContent = [
      ["Ora", "Paziente", "CF", "Tipo Visita", "Medico", "Stato"],
      ...occupazione.map(visita => [
        visita.ora, visita.paziente, visita.cf, visita.tipo, visita.medico, visita.stato
      ])
    ].map(e => e.join(",")).join("\n");

    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([csvContent], { type: "text/csv" }));
    a.download = "occupazione_osteoncologia.csv";
    a.click();
    window.URL.revokeObjectURL(a.href);
  };

  const handleExportVerbali = () => {
    const csvContent = [
      ["Data", "Ora", "Paziente", "CF", "Medico", "Tipo", "Verbale", "Esito"],
      ...verbali.map(verbale => [
        verbale.data, verbale.ora, verbale.paziente, verbale.cf, verbale.medico, verbale.tipo, verbale.verbale, verbale.esito
      ])
    ].map(e => e.join(",")).join("\n");

    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([csvContent], { type: "text/csv" }));
    a.download = "verbali_osteoncologia.csv";
    a.click();
    window.URL.revokeObjectURL(a.href);
  };

  return (
    <div className="min-h-screen bg-background">
      <OsteoncologiaNavbar />

      <div className="container mx-auto px-4 py-4">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Users className="w-4 h-4 text-white" />
            </div>
            Ambulatorio Osteoncologia
          </h1>
          <p className="text-muted-foreground">Gestione occupazione, pianificazione e verbali</p>
        </div>

        {/* Statistiche */}
        <div className="grid md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Visite Oggi</p>
                  <p className="text-xl font-bold">{occupazione.length}</p>
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
                  <p className="text-sm text-muted-foreground">Completate</p>
                  <p className="text-xl font-bold">{occupazione.filter(v => v.stato === "Completata").length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <Clock className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">In Corso</p>
                  <p className="text-xl font-bold">{occupazione.filter(v => v.stato === "In corso").length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-yellow-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Programmate</p>
                  <p className="text-xl font-bold">{occupazione.filter(v => v.stato === "Programmata").length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs per le diverse sezioni */}
        <Tabs defaultValue="occupazione" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="occupazione" className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Occupazione Giornaliera
            </TabsTrigger>
            <TabsTrigger value="pianificazione" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              Pianificazione Settimanale
            </TabsTrigger>
            <TabsTrigger value="verbali" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Verbali Visite
            </TabsTrigger>
          </TabsList>

          {/* Tab Occupazione Giornaliera */}
          <TabsContent value="occupazione">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Occupazione Giornaliera - {new Date().toLocaleDateString('it-IT')}
                </CardTitle>
                <CardDescription>
                  Visite programmate per oggi nell'ambulatorio Osteoncologia
                </CardDescription>
              </CardHeader>
              <CardContent>
                {/* Riepilogo statistico */}
                <div className="grid grid-cols-4 gap-4 mb-6">
                  <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl font-bold text-green-600 mb-1">
                        {occupazione.filter(v => v.stato === "Completata").length}
                      </div>
                      <div className="text-sm text-green-700 font-medium">Completate</div>
                    </CardContent>
                  </Card>
                  <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl font-bold text-blue-600 mb-1">
                        {occupazione.filter(v => v.stato === "In corso").length}
                      </div>
                      <div className="text-sm text-blue-700 font-medium">In Corso</div>
                    </CardContent>
                  </Card>
                  <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200">
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl font-bold text-yellow-600 mb-1">
                        {occupazione.filter(v => v.stato === "Programmata").length}
                      </div>
                      <div className="text-sm text-yellow-700 font-medium">Programmate</div>
                    </CardContent>
                  </Card>
                  <Card className="bg-gradient-to-br from-gray-50 to-gray-100 border-gray-200">
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl font-bold text-gray-600 mb-1">
                        {occupazione.length}
                      </div>
                      <div className="text-sm text-gray-700 font-medium">Totale</div>
                    </CardContent>
                  </Card>
                </div>

                {/* Visualizzazione Card per Occupazione */}
                <div className="space-y-4">
                  {occupazione.map((visita, index) => {
                    const getStatoColor = (stato: string) => {
                      switch (stato) {
                        case "Completata": return "bg-green-100 text-green-800 border-green-200";
                        case "In corso": return "bg-blue-100 text-blue-800 border-blue-200";
                        case "Programmata": return "bg-yellow-100 text-yellow-800 border-yellow-200";
                        default: return "bg-gray-100 text-gray-800 border-gray-200";
                      }
                    };

                    const getStatoIcon = (stato: string) => {
                      switch (stato) {
                        case "Completata": return <CheckCircle className="w-4 h-4" />;
                        case "In corso": return <Clock className="w-4 h-4" />;
                        case "Programmata": return <Calendar className="w-4 h-4" />;
                        default: return <Clock className="w-4 h-4" />;
                      }
                    };

                    return (
                      <Card key={index} className="hover:shadow-lg transition-all duration-200 border-l-4 border-l-purple-500">
                        <CardContent className="p-4">
                          <div className="flex items-center">
                            {/* Ora - Larghezza fissa */}
                            <div className="w-24 text-center">
                              <div className="text-2xl font-bold text-purple-600">{visita.ora}</div>
                              <div className="text-xs text-gray-500 uppercase tracking-wide">Ora</div>
                            </div>

                            {/* Separatore */}
                            <div className="w-6 flex justify-center">
                              <div className="w-px h-12 bg-gray-200"></div>
                            </div>

                            {/* Paziente - Larghezza fissa */}
                            <div className="w-64">
                              <h3 className="text-lg font-semibold text-gray-900 mb-1 truncate">{visita.paziente}</h3>
                              <p className="text-sm text-gray-600 font-mono truncate">{visita.cf}</p>
                            </div>

                            {/* Separatore */}
                            <div className="w-6 flex justify-center">
                              <div className="w-px h-12 bg-gray-200"></div>
                            </div>

                            {/* Tipo visita - Larghezza fissa */}
                            <div className="w-40 text-center">
                              <Badge variant="outline" className="text-sm px-3 py-1 bg-purple-50 text-purple-700 border-purple-200">
                                {visita.tipo}
                              </Badge>
                            </div>

                            {/* Separatore */}
                            <div className="w-6 flex justify-center">
                              <div className="w-px h-12 bg-gray-200"></div>
                            </div>

                            {/* Medico - Larghezza fissa */}
                            <div className="w-32 text-center">
                              <div className="text-sm font-medium text-gray-900 truncate">{visita.medico}</div>
                              <div className="text-xs text-gray-500">Medico</div>
                            </div>

                            {/* Separatore */}
                            <div className="w-6 flex justify-center">
                              <div className="w-px h-12 bg-gray-200"></div>
                            </div>

                            {/* Stato - Larghezza fissa */}
                            <div className="w-40 text-center">
                              <Badge className={`${getStatoColor(visita.stato)} px-3 py-1 text-sm font-medium flex items-center gap-1 justify-center`}>
                                {getStatoIcon(visita.stato)}
                                {visita.stato}
                              </Badge>
                            </div>

                            {/* Separatore */}
                            <div className="w-6 flex justify-center">
                              <div className="w-px h-12 bg-gray-200"></div>
                            </div>

                            {/* Azioni - Larghezza fissa */}
                            <div className="w-24 flex items-center gap-2">
                              <Button variant="outline" size="sm" className="hover:bg-purple-50 hover:border-purple-300">
                                <Eye className="w-4 h-4" />
                              </Button>
                              <Button variant="outline" size="sm" className="hover:bg-red-50 hover:border-red-300 hover:text-red-600">
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tab Pianificazione Settimanale */}
          <TabsContent value="pianificazione">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Pianificazione Settimanale
                </CardTitle>
                <CardDescription>
                  Panoramica delle visite programmate per la settimana corrente
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {pianificazione.map((giorno, index) => (
                    <div key={index} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h3 className="font-semibold text-lg text-gray-900">{giorno.giorno}</h3>
                          <p className="text-sm text-gray-600">{giorno.data}</p>
                        </div>
                        <Badge variant="outline" className="text-lg px-4 py-2">
                          {giorno.visite} visite
                        </Badge>
                      </div>
                      <div className="grid grid-cols-3 gap-4">
                        <div className="text-center p-3 bg-green-50 rounded-lg border border-green-200">
                          <div className="text-2xl font-bold text-green-600">{giorno.completate}</div>
                          <div className="text-sm text-green-700">Completate</div>
                        </div>
                        <div className="text-center p-3 bg-blue-50 rounded-lg border border-blue-200">
                          <div className="text-2xl font-bold text-blue-600">{giorno.inCorso}</div>
                          <div className="text-sm text-blue-700">In Corso</div>
                        </div>
                        <div className="text-center p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                          <div className="text-2xl font-bold text-yellow-600">{giorno.programmate}</div>
                          <div className="text-sm text-yellow-700">Programmate</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tab Verbali Visite */}
          <TabsContent value="verbali">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div>
                  <CardTitle className="text-lg font-semibold flex items-center gap-2">
                    <FileText className="w-5 h-5 text-purple-600" />
                    Verbali delle Visite
                  </CardTitle>
                  <CardDescription className="mt-1">
                    Documentazione completa delle visite effettuate
                  </CardDescription>
                </div>
                <Button variant="outline" size="sm" onClick={handleExportVerbali} className="bg-purple-50 border-purple-200 text-purple-700 hover:bg-purple-100">
                  <Download className="w-4 h-4 mr-2" />
                  Export CSV
                </Button>
              </CardHeader>
              <CardContent>
                {/* Riepilogo statistico verbali */}
                <div className="grid grid-cols-4 gap-4 mb-6">
                  <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl font-bold text-green-600 mb-1">
                        {verbali.filter(v => v.esito === "Completata").length}
                      </div>
                      <div className="text-sm text-green-700 font-medium">Completate</div>
                    </CardContent>
                  </Card>
                  <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl font-bold text-blue-600 mb-1">
                        {verbali.filter(v => v.esito === "In corso").length}
                      </div>
                      <div className="text-sm text-blue-700 font-medium">In Corso</div>
                    </CardContent>
                  </Card>
                  <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200">
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl font-bold text-yellow-600 mb-1">
                        {verbali.filter(v => v.esito === "Programmata").length}
                      </div>
                      <div className="text-sm text-yellow-700 font-medium">Programmate</div>
                    </CardContent>
                  </Card>
                  <Card className="bg-gradient-to-br from-gray-50 to-gray-100 border-gray-200">
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl font-bold text-gray-600 mb-1">
                        {verbali.length}
                      </div>
                      <div className="text-sm text-gray-700 font-medium">Totale</div>
                    </CardContent>
                  </Card>
                </div>

                {/* Lista verbali migliorata */}
                <div className="space-y-4">
                  {verbali.map((verbale) => {
                    const getEsitoColor = (esito: string) => {
                      switch (esito) {
                        case "Completata": return "bg-green-100 text-green-800 border-green-200";
                        case "In corso": return "bg-blue-100 text-blue-800 border-blue-200";
                        case "Programmata": return "bg-yellow-100 text-yellow-800 border-yellow-200";
                        default: return "bg-gray-100 text-gray-800 border-gray-200";
                      }
                    };

                    const getEsitoIcon = (esito: string) => {
                      switch (esito) {
                        case "Completata": return <CheckCircle className="w-4 h-4" />;
                        case "In corso": return <Clock className="w-4 h-4" />;
                        case "Programmata": return <Calendar className="w-4 h-4" />;
                        default: return <FileText className="w-4 h-4" />;
                      }
                    };

                    return (
                      <Card key={verbale.id} className="hover:shadow-lg transition-all duration-200 border-l-4 border-l-purple-500 bg-gradient-to-r from-white to-purple-50/30">
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between mb-4">
                            {/* Informazioni principali */}
                            <div className="flex items-center gap-6 flex-1">
                              {/* Paziente */}
                              <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                                  <User className="w-6 h-6 text-purple-600" />
                                </div>
                                <div>
                                  <h3 className="text-lg font-semibold text-gray-900 mb-1">{verbale.paziente}</h3>
                                  <p className="text-sm text-gray-600 font-mono">{verbale.cf}</p>
                                </div>
                              </div>

                              {/* Separatore */}
                              <div className="w-px h-16 bg-gray-200"></div>

                              {/* Medico e tipo */}
                              <div className="flex items-center gap-4">
                                <div className="text-center">
                                  <div className="text-sm font-medium text-gray-900">{verbale.medico}</div>
                                  <div className="text-xs text-gray-500">Medico</div>
                                </div>
                                <div className="text-center">
                                  <Badge variant="outline" className="text-sm px-3 py-1 bg-purple-50 text-purple-700 border-purple-200">
                                    {verbale.tipo}
                                  </Badge>
                                </div>
                              </div>

                              {/* Data e ora */}
                              <div className="text-center">
                                <div className="text-sm font-medium text-gray-900">{verbale.data}</div>
                                <div className="text-xs text-gray-500">{verbale.ora}</div>
                              </div>
                            </div>

                            {/* Stato e azioni */}
                            <div className="flex items-center gap-3">
                              {/* Stato */}
                              <Badge className={`${getEsitoColor(verbale.esito)} px-3 py-1 text-sm font-medium flex items-center gap-1`}>
                                {getEsitoIcon(verbale.esito)}
                                {verbale.esito}
                              </Badge>

                              {/* Pulsante visualizza */}
                              <Button 
                                variant="outline" 
                                size="sm" 
                                onClick={() => handleViewVerbale(verbale)}
                                className="bg-purple-50 border-purple-200 text-purple-700 hover:bg-purple-100 hover:border-purple-300"
                              >
                                <Eye className="w-4 h-4 mr-2" />
                                Visualizza
                              </Button>
                            </div>
                          </div>

                          {/* Verbale */}
                          <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-4 rounded-lg border border-purple-200">
                            <div className="flex items-center gap-2 mb-2">
                              <FileText className="w-4 h-4 text-purple-600" />
                              <span className="font-semibold text-purple-800">Verbale della Visita</span>
                            </div>
                            <p className="text-gray-700 leading-relaxed text-sm">
                              {verbale.verbale}
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default OsteoncologiaPage;
