import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";
import { Badge } from "@/shared/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/shared/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/shared/components/ui/dialog";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/components/ui/select";
import { Textarea } from "@/shared/components/ui/textarea";
import { ArrowLeft, Calendar, Users, FileText, Clock, CheckCircle, AlertCircle, Download, Plus, Eye, Edit, Trash2, Lock, Unlock, Search, Filter, ChevronLeft, ChevronRight, User } from "lucide-react";
import CureSimultaneeNavbar from "@/oncologico-v2/components/CureSimultaneeNavbar";
import { useNavigate } from "react-router-dom";

const CureSimultaneePage = () => {
  const navigate = useNavigate();

  // Stati per funzionalità interattive
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStato, setFilterStato] = useState("tutti");
  const [showBlockSlotDialog, setShowBlockSlotDialog] = useState(false);
  const [showVerbaleDialog, setShowVerbaleDialog] = useState(false);
  const [selectedVerbale, setSelectedVerbale] = useState<any>(null);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedWeek, setSelectedWeek] = useState(() => {
    const today = new Date();
    const monday = new Date(today);
    monday.setDate(today.getDate() - today.getDay() + 1);
    return monday.toISOString().split('T')[0];
  });
  const [blockSlotData, setBlockSlotData] = useState({
    ora: "",
    paziente: "",
    cf: "",
    tipo: "",
    medico: "",
    note: ""
  });

  // Mock data per occupazione giornaliera (ora modificabile)
  const [occupazione, setOccupazione] = useState([
    { id: 1, ora: "08:00", paziente: "Mario Rossi", cf: "RSSMRA80A01H501U", tipo: "Prima visita", medico: "Dr. Bianchi", stato: "Completata" },
    { id: 2, ora: "09:00", paziente: "Anna Bianchi", cf: "BNCNNA75B02H501V", tipo: "Follow-up", medico: "Dr. Verdi", stato: "In corso" },
    { id: 3, ora: "10:00", paziente: "Giuseppe Verdi", cf: "VRDGPP70C03H501W", tipo: "Discussione caso", medico: "Dr. Rossi", stato: "Programmata" },
    { id: 4, ora: "11:00", paziente: "Francesca Neri", cf: "NRIFNC85D04H501X", tipo: "Visita controllo", medico: "Dr. Bianchi", stato: "Programmata" },
    { id: 5, ora: "14:00", paziente: "Luigi Ferrari", cf: "FRRLGI65E05H501Y", tipo: "Prima visita", medico: "Dr. Verdi", stato: "Programmata" },
    { id: 6, ora: "15:00", paziente: "Maria Romano", cf: "RSSMRA70F06H501Z", tipo: "Follow-up", medico: "Dr. Rossi", stato: "Programmata" },
    { id: 7, ora: "16:00", paziente: "Carlo Bianchi", cf: "BNCCRL60G07H501A", tipo: "Discussione caso", medico: "Dr. Bianchi", stato: "Programmata" },
    { id: 8, ora: "17:00", paziente: "Elena Rossi", cf: "RSSELN55H08H501B", tipo: "Visita controllo", medico: "Dr. Verdi", stato: "Programmata" }
  ]);

  // Mock data per pianificazione settimanale
  const [pianificazione] = useState([
    { giorno: "Lunedì", data: "2024-01-22", visite: 8, completate: 6, inCorso: 1, programmate: 1 },
    { giorno: "Martedì", data: "2024-01-23", visite: 7, completate: 5, inCorso: 0, programmate: 2 },
    { giorno: "Mercoledì", data: "2024-01-24", visite: 9, completate: 7, inCorso: 1, programmate: 1 },
    { giorno: "Giovedì", data: "2024-01-25", visite: 6, completate: 4, inCorso: 0, programmate: 2 },
    { giorno: "Venerdì", data: "2024-01-26", visite: 8, completate: 6, inCorso: 1, programmate: 1 }
  ]);

  // Mock data per verbali visite
  const [verbali] = useState([
    { id: 1, data: "2024-01-20", ora: "08:00", paziente: "Mario Rossi", cf: "RSSMRA80A01H501U", medico: "Dr. Bianchi", tipo: "Prima visita", verbale: "Paziente con diagnosi di carcinoma polmonare. Discussa strategia terapeutica con il team multidisciplinare. Programmata chemioterapia adiuvante.", esito: "Completata" },
    { id: 2, data: "2024-01-19", ora: "09:00", paziente: "Anna Bianchi", cf: "BNCNNA75B02H501V", medico: "Dr. Verdi", tipo: "Follow-up", verbale: "Controllo post-intervento chirurgico. Ferita chirurgica in buona evoluzione. Paziente collaborante e motivata.", esito: "Completata" },
    { id: 3, data: "2024-01-18", ora: "10:00", paziente: "Giuseppe Verdi", cf: "VRDGPP70C03H501W", medico: "Dr. Rossi", tipo: "Discussione caso", verbale: "Caso complesso di carcinoma prostatico metastatico. Valutata terapia di seconda linea. Paziente informato sulle opzioni terapeutiche.", esito: "In corso" },
    { id: 4, data: "2024-01-17", ora: "11:00", paziente: "Francesca Neri", cf: "NRIFNC85D04H501X", medico: "Dr. Bianchi", tipo: "Visita controllo", verbale: "Follow-up per carcinoma mammario. RMN di controllo programmata. Paziente in buone condizioni generali.", esito: "Programmata" },
    { id: 5, data: "2024-01-16", ora: "14:00", paziente: "Luigi Ferrari", cf: "FRRLGI65E05H501Y", medico: "Dr. Verdi", tipo: "Prima visita", verbale: "Nuova diagnosi di carcinoma del colon. Stadiazione completa in corso. Paziente e familiari informati sulla patologia.", esito: "Completata" }
  ]);

  const getStatoColor = (stato: string) => {
    switch (stato) {
      case "Completata": return "bg-green-100 text-green-800";
      case "In corso": return "bg-yellow-100 text-yellow-800";
      case "Programmata": return "bg-blue-100 text-blue-800";
      default: return "bg-gray-100 text-gray-800";
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

  const handleExportOccupazione = () => {
    const csvContent = [
      ["Ora", "Paziente", "CF", "Tipo Visita", "Medico", "Stato"],
      ...occupazione.map(o => [o.ora, o.paziente, o.cf, o.tipo, o.medico, o.stato])
    ].map(e => e.join(",")).join("\n");

    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([csvContent], { type: "text/csv" }));
    a.download = "occupazione_cure_simultanee.csv";
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
    a.download = "verbali_cure_simultanee.csv";
    a.click();
    window.URL.revokeObjectURL(a.href);
  };

  // Funzioni per gestione interattiva
  const handleBlockSlot = () => {
    const newSlot = {
      id: occupazione.length + 1,
      ora: blockSlotData.ora,
      paziente: blockSlotData.paziente,
      cf: blockSlotData.cf,
      tipo: blockSlotData.tipo,
      medico: blockSlotData.medico,
      stato: "Programmata"
    };
    setOccupazione([...occupazione, newSlot]);
    setShowBlockSlotDialog(false);
    setBlockSlotData({ ora: "", paziente: "", cf: "", tipo: "", medico: "", note: "" });
    alert("Slot bloccato con successo!");
  };

  const handleChangeStato = (id: number, nuovoStato: string) => {
    setOccupazione(occupazione.map(slot => 
      slot.id === id ? { ...slot, stato: nuovoStato } : slot
    ));
  };

  const handleViewVerbale = (verbale: any) => {
    setSelectedVerbale(verbale);
    setShowVerbaleDialog(true);
  };

  const handleDeleteSlot = (id: number) => {
    if (confirm("Sei sicuro di voler eliminare questo slot?")) {
      setOccupazione(occupazione.filter(slot => slot.id !== id));
    }
  };

  // Funzioni per gestione date e settimane
  const getWeekDates = (startDate: string) => {
    const start = new Date(startDate);
    const dates = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(start);
      date.setDate(start.getDate() + i);
      dates.push(date.toISOString().split('T')[0]);
    }
    return dates;
  };

  const getWeekRange = (startDate: string) => {
    const start = new Date(startDate);
    const end = new Date(start);
    end.setDate(start.getDate() + 6);
    return {
      start: start.toLocaleDateString('it-IT'),
      end: end.toLocaleDateString('it-IT')
    };
  };

  const navigateWeek = (direction: 'prev' | 'next') => {
    const currentWeek = new Date(selectedWeek);
    if (direction === 'prev') {
      currentWeek.setDate(currentWeek.getDate() - 7);
    } else {
      currentWeek.setDate(currentWeek.getDate() + 7);
    }
    setSelectedWeek(currentWeek.toISOString().split('T')[0]);
  };

  const navigateDate = (direction: 'prev' | 'next') => {
    const currentDate = new Date(selectedDate);
    if (direction === 'prev') {
      currentDate.setDate(currentDate.getDate() - 1);
    } else {
      currentDate.setDate(currentDate.getDate() + 1);
    }
    setSelectedDate(currentDate.toISOString().split('T')[0]);
  };

  // Filtri per occupazione
  const filteredOccupazione = occupazione.filter(slot => {
    const matchesSearch = !searchTerm ||
      slot.paziente.toLowerCase().includes(searchTerm.toLowerCase()) ||
      slot.cf.toLowerCase().includes(searchTerm.toLowerCase()) ||
      slot.medico.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStato = filterStato === "tutti" || slot.stato === filterStato;

    return matchesSearch && matchesStato;
  });

  return (
    <div className="min-h-screen bg-background">
      <CureSimultaneeNavbar />

      <div className="container mx-auto px-4 py-4">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
              <Users className="w-4 h-4 text-white" />
            </div>
            Ambulatorio Cure Simultanee
          </h1>
          <p className="text-muted-foreground">Gestione occupazione, pianificazione e verbali</p>
        </div>

        {/* Statistiche */}
        <div className="grid md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-blue-600" />
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
                <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                  <Clock className="w-5 h-5 text-yellow-600" />
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
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                  <AlertCircle className="w-5 h-5 text-purple-600" />
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
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="w-5 h-5" />
                      Occupazione Giornaliera
                    </CardTitle>
                    <CardDescription>
                      Visite programmate per la data selezionata nell'ambulatorio Cure Simultanee
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" onClick={() => navigateDate('prev')}>
                      <ChevronLeft className="w-4 h-4" />
                    </Button>
                    <Input
                      type="date"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      className="w-40"
                    />
                    <Button variant="outline" size="sm" onClick={() => navigateDate('next')}>
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => setSelectedDate(new Date().toISOString().split('T')[0])}>
                      Oggi
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {/* Barra di ricerca e filtri migliorata */}
                <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-xl border border-blue-200 mb-6">
                  <div className="flex flex-wrap items-center gap-4">
                    {/* Ricerca */}
                    <div className="flex items-center gap-3 flex-1 min-w-[300px]">
                      <div className="relative flex-1">
                        <Search className="w-5 h-5 text-blue-500 absolute left-3 top-1/2 transform -translate-y-1/2" />
                        <Input
                          placeholder="Cerca per paziente, CF o medico..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="pl-10 bg-white border-blue-200 focus:border-blue-400 focus:ring-blue-400"
                        />
                      </div>
                    </div>

                    {/* Filtro stato */}
                    <div className="flex items-center gap-3">
                      <Filter className="w-5 h-5 text-blue-500" />
                      <Label className="text-sm font-semibold text-blue-700">Filtra per stato:</Label>
                      <Select value={filterStato} onValueChange={setFilterStato}>
                        <SelectTrigger className="w-44 bg-white border-blue-200 focus:border-blue-400">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="tutti">Tutti gli stati</SelectItem>
                          <SelectItem value="Completata">✅ Completata</SelectItem>
                          <SelectItem value="In corso">🔄 In corso</SelectItem>
                          <SelectItem value="Programmata">📅 Programmata</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Pulsante aggiungi */}
                    <Dialog open={showBlockSlotDialog} onOpenChange={setShowBlockSlotDialog}>
                      <DialogTrigger asChild>
                        <Button className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg">
                          <Plus className="w-4 h-4 mr-2" />
                          Nuovo Slot
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                          <DialogTitle>Blocca Nuovo Slot</DialogTitle>
                          <DialogDescription>
                            Aggiungi un nuovo slot per l'ambulatorio Cure Simultanee
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="ora">Ora</Label>
                              <Input
                                id="ora"
                                type="time"
                                value={blockSlotData.ora}
                                onChange={(e) => setBlockSlotData({...blockSlotData, ora: e.target.value})}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="tipo">Tipo Visita</Label>
                              <Select value={blockSlotData.tipo} onValueChange={(value) => setBlockSlotData({...blockSlotData, tipo: value})}>
                                <SelectTrigger>
                                  <SelectValue placeholder="Seleziona tipo" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="Prima visita">Prima visita</SelectItem>
                                  <SelectItem value="Follow-up">Follow-up</SelectItem>
                                  <SelectItem value="Discussione caso">Discussione caso</SelectItem>
                                  <SelectItem value="Visita controllo">Visita controllo</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="paziente">Paziente</Label>
                            <Input
                              id="paziente"
                              placeholder="Nome e cognome"
                              value={blockSlotData.paziente}
                              onChange={(e) => setBlockSlotData({...blockSlotData, paziente: e.target.value})}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="cf">Codice Fiscale</Label>
                            <Input
                              id="cf"
                              placeholder="Codice fiscale"
                              value={blockSlotData.cf}
                              onChange={(e) => setBlockSlotData({...blockSlotData, cf: e.target.value})}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="medico">Medico</Label>
                            <Select value={blockSlotData.medico} onValueChange={(value) => setBlockSlotData({...blockSlotData, medico: value})}>
                              <SelectTrigger>
                                <SelectValue placeholder="Seleziona medico" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Dr. Bianchi">Dr. Bianchi</SelectItem>
                                <SelectItem value="Dr. Verdi">Dr. Verdi</SelectItem>
                                <SelectItem value="Dr. Rossi">Dr. Rossi</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="note">Note</Label>
                            <Textarea
                              id="note"
                              placeholder="Note aggiuntive (opzionale)"
                              value={blockSlotData.note}
                              onChange={(e) => setBlockSlotData({...blockSlotData, note: e.target.value})}
                            />
                          </div>
                          <div className="flex gap-2 pt-4">
                            <Button onClick={handleBlockSlot} className="flex-1">
                              <Lock className="w-4 h-4 mr-2" />
                              Blocca Slot
                            </Button>
                            <Button variant="outline" onClick={() => setShowBlockSlotDialog(false)}>
                              Annulla
                            </Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>

                {/* Riepilogo statistico */}
                <div className="grid grid-cols-4 gap-4 mb-6">
                  <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl font-bold text-green-600 mb-1">
                        {filteredOccupazione.filter(v => v.stato === "Completata").length}
                      </div>
                      <div className="text-sm text-green-700 font-medium">Completate</div>
                    </CardContent>
                  </Card>
                  <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl font-bold text-blue-600 mb-1">
                        {filteredOccupazione.filter(v => v.stato === "In corso").length}
                      </div>
                      <div className="text-sm text-blue-700 font-medium">In Corso</div>
                    </CardContent>
                  </Card>
                  <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200">
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl font-bold text-yellow-600 mb-1">
                        {filteredOccupazione.filter(v => v.stato === "Programmata").length}
                      </div>
                      <div className="text-sm text-yellow-700 font-medium">Programmate</div>
                    </CardContent>
                  </Card>
                  <Card className="bg-gradient-to-br from-gray-50 to-gray-100 border-gray-200">
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl font-bold text-gray-600 mb-1">
                        {filteredOccupazione.length}
                      </div>
                      <div className="text-sm text-gray-700 font-medium">Totale</div>
                    </CardContent>
                  </Card>
                </div>

                {/* Visualizzazione Card per Occupazione */}
                <div className="space-y-4">
                  {filteredOccupazione.length === 0 ? (
                    <div className="text-center py-12">
                      <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-gray-500 mb-2">Nessuna visita programmata</h3>
                      <p className="text-gray-400">Non ci sono visite per la data selezionata</p>
                    </div>
                  ) : (
                    filteredOccupazione.map((visita) => {
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
                        <Card key={visita.id} className="hover:shadow-lg transition-all duration-200 border-l-4 border-l-blue-500">
                          <CardContent className="p-4">
                            <div className="flex items-center">
                              {/* Ora - Larghezza fissa */}
                              <div className="w-24 text-center">
                                <div className="text-2xl font-bold text-blue-600">{visita.ora}</div>
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
                                <Badge variant="outline" className="text-sm px-3 py-1 bg-blue-50 text-blue-700 border-blue-200">
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
                              <div className="w-48 flex items-center gap-2">
                                <Select value={visita.stato} onValueChange={(value) => handleChangeStato(visita.id, value)}>
                                  <SelectTrigger className="w-32">
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="Completata">Completata</SelectItem>
                                    <SelectItem value="In corso">In corso</SelectItem>
                                    <SelectItem value="Programmata">Programmata</SelectItem>
                                  </SelectContent>
                                </Select>
                                <Button variant="outline" size="sm" className="hover:bg-blue-50 hover:border-blue-300">
                                  <Edit className="w-4 h-4" />
                                </Button>
                                <Button 
                                  variant="outline" 
                                  size="sm" 
                                  onClick={() => handleDeleteSlot(visita.id)}
                                  className="hover:bg-red-50 hover:border-red-300 hover:text-red-600"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tab Pianificazione Settimanale */}
          <TabsContent value="pianificazione">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="w-5 h-5" />
                      Pianificazione Settimanale
                    </CardTitle>
                    <CardDescription>
                      Panoramica delle visite programmate per la settimana selezionata
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" onClick={() => navigateWeek('prev')}>
                      <ChevronLeft className="w-4 h-4" />
                    </Button>
                    <Input
                      type="date"
                      value={selectedWeek}
                      onChange={(e) => setSelectedWeek(e.target.value)}
                      className="w-40"
                    />
                    <Button variant="outline" size="sm" onClick={() => navigateWeek('next')}>
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => {
                      const today = new Date();
                      const monday = new Date(today);
                      monday.setDate(today.getDate() - today.getDay() + 1);
                      setSelectedWeek(monday.toISOString().split('T')[0]);
                    }}>
                      Questa Settimana
                    </Button>
                  </div>
                </div>
                <div className="mt-2 text-sm text-gray-600">
                  Settimana: {getWeekRange(selectedWeek).start} - {getWeekRange(selectedWeek).end}
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {getWeekDates(selectedWeek).map((date, index) => {
                    const dayNames = ['Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì', 'Sabato', 'Domenica'];
                    const dayName = dayNames[index];
                    const isToday = date === new Date().toISOString().split('T')[0];
                    const isWeekend = index >= 5;
                    
                    // Mock data per ogni giorno (in una implementazione reale, questo verrebbe da un'API)
                    const dayData = {
                      visite: Math.floor(Math.random() * 8) + 1,
                      completate: Math.floor(Math.random() * 5),
                      inCorso: Math.floor(Math.random() * 2),
                      programmate: Math.floor(Math.random() * 6) + 1
                    };

                    return (
                      <div key={date} className={`p-4 border rounded-lg hover:shadow-md transition-shadow ${isToday ? 'ring-2 ring-blue-500 bg-blue-50' : ''} ${isWeekend ? 'bg-gray-50' : ''}`}>
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <h3 className={`font-semibold text-lg ${isToday ? 'text-blue-900' : 'text-gray-900'}`}>
                              {dayName}
                              {isToday && <span className="ml-2 text-sm bg-blue-200 text-blue-800 px-2 py-1 rounded">Oggi</span>}
                            </h3>
                            <p className="text-sm text-gray-600">{new Date(date).toLocaleDateString('it-IT')}</p>
                          </div>
                          <Badge variant="outline" className="text-lg px-4 py-2">
                            {dayData.visite} visite
                          </Badge>
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                          <div className="text-center p-3 bg-green-50 rounded-lg border border-green-200">
                            <div className="text-2xl font-bold text-green-600">{dayData.completate}</div>
                            <div className="text-sm text-green-700">Completate</div>
                          </div>
                          <div className="text-center p-3 bg-blue-50 rounded-lg border border-blue-200">
                            <div className="text-2xl font-bold text-blue-600">{dayData.inCorso}</div>
                            <div className="text-sm text-blue-700">In Corso</div>
                          </div>
                          <div className="text-center p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                            <div className="text-2xl font-bold text-yellow-600">{dayData.programmate}</div>
                            <div className="text-sm text-yellow-700">Programmate</div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
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
                    <FileText className="w-5 h-5 text-blue-600" />
                    Verbali delle Visite
                  </CardTitle>
                  <CardDescription className="mt-1">
                    Documentazione completa delle visite effettuate
                  </CardDescription>
                </div>
                <Button variant="outline" size="sm" onClick={handleExportVerbali} className="bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100">
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
                      <Card key={verbale.id} className="hover:shadow-lg transition-all duration-200 border-l-4 border-l-blue-500 bg-gradient-to-r from-white to-blue-50/30">
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between mb-4">
                            {/* Informazioni principali */}
                            <div className="flex items-center gap-6 flex-1">
                              {/* Paziente */}
                              <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                                  <User className="w-6 h-6 text-blue-600" />
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
                                  <Badge variant="outline" className="text-sm px-3 py-1 bg-blue-50 text-blue-700 border-blue-200">
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
                                className="bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100 hover:border-blue-300"
                              >
                                <Eye className="w-4 h-4 mr-2" />
                                Visualizza
                              </Button>
                            </div>
                          </div>

                          {/* Verbale */}
                          <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-lg border border-blue-200">
                            <div className="flex items-center gap-2 mb-2">
                              <FileText className="w-4 h-4 text-blue-600" />
                              <span className="font-semibold text-blue-800">Verbale della Visita</span>
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

      {/* Dialog per visualizzare verbale dettagliato */}
      <Dialog open={showVerbaleDialog} onOpenChange={setShowVerbaleDialog}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Verbale Dettagliato
            </DialogTitle>
            <DialogDescription>
              Documento completo della visita
            </DialogDescription>
          </DialogHeader>
          
          {selectedVerbale && (
            <div className="space-y-6">
              {/* Informazioni paziente */}
              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="font-semibold text-gray-800 mb-3">Informazioni Paziente</h4>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium">Paziente:</span> {selectedVerbale.paziente}
                  </div>
                  <div>
                    <span className="font-medium">CF:</span> {selectedVerbale.cf}
                  </div>
                  <div>
                    <span className="font-medium">Medico:</span> {selectedVerbale.medico}
                  </div>
                  <div>
                    <span className="font-medium">Data:</span> {selectedVerbale.data} alle {selectedVerbale.ora}
                  </div>
                  <div>
                    <span className="font-medium">Tipo:</span> {selectedVerbale.tipo}
                  </div>
                  <div>
                    <span className="font-medium">Esito:</span> 
                    <Badge className={`ml-2 ${getStatoColor(selectedVerbale.esito)} px-2 py-1 text-xs`}>
                      {selectedVerbale.esito}
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Verbale completo */}
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <h4 className="font-semibold text-blue-800 mb-3">Verbale Completo</h4>
                <div className="bg-white p-4 rounded-lg border">
                  <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                    {selectedVerbale.verbale}
                  </p>
                </div>
              </div>

              {/* Azioni */}
              <div className="flex justify-end gap-3">
                <Button variant="outline" onClick={() => setShowVerbaleDialog(false)}>
                  Chiudi
                </Button>
                <Button onClick={() => {
                  const content = `VERBALE VISITA\n\nPaziente: ${selectedVerbale.paziente}\nCF: ${selectedVerbale.cf}\nMedico: ${selectedVerbale.medico}\nData: ${selectedVerbale.data} alle ${selectedVerbale.ora}\nTipo: ${selectedVerbale.tipo}\n\nVERBALE:\n${selectedVerbale.verbale}`;
                  const blob = new Blob([content], { type: 'text/plain' });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = `verbale_${selectedVerbale.paziente.replace(' ', '_')}_${selectedVerbale.data}.txt`;
                  a.click();
                  URL.revokeObjectURL(url);
                }}>
                  <Download className="w-4 h-4 mr-2" />
                  Scarica Verbale
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CureSimultaneePage;