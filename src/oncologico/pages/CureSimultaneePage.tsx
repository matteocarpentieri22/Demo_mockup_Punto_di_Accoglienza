import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";
import { Badge } from "@/shared/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/shared/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/shared/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/shared/components/ui/dropdown-menu";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/components/ui/select";
import { Textarea } from "@/shared/components/ui/textarea";
import { ArrowLeft, Calendar, Users, Clock, CheckCircle, AlertCircle, Download, Plus, Eye, Edit, Trash2, Lock, Unlock, Search, Filter, ChevronLeft, ChevronRight, User, MessageSquare, Stethoscope, FileSpreadsheet, FileText, ChevronDown } from "lucide-react";
import { exportToExcel, exportToPDF, formatDateForFilename } from "@/oncologico/utils/export";
import CureSimultaneeNavbar from "@/oncologico/components/layout/CureSimultaneeNavbar";
import { useNavigate } from "react-router-dom";

const CureSimultaneePage = () => {
  const navigate = useNavigate();

  // Stati per funzionalità interattive
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStato, setFilterStato] = useState("tutti");
  const [showBlockSlotDialog, setShowBlockSlotDialog] = useState(false);
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
    problemi: "",
    medicoReferente: "",
    note: ""
  });

  // Mock data per occupazione giornaliera (ora modificabile)
  const [occupazione, setOccupazione] = useState([
    { id: 1, ora: "08:00", paziente: "Mario Rossi", cf: "RSSMRA80A01H501U", problemi: "Tossicità gastrointestinale, neutropenia, astenia", medicoReferente: "Dr. Bianchi", stato: "Completata", tipo: "visita" },
    { id: 2, ora: "09:00", paziente: "Anna Bianchi", cf: "BNCNNA75B02H501V", problemi: "Dermatite da radioterapia, nausea persistente", medicoReferente: "Dr. Verdi", stato: "In corso", tipo: "visita" },
    { id: 3, ora: "10:00", paziente: "Giuseppe Verdi", cf: "VRDGPP70C03H501W", problemi: "Cardiotossicità, neuropatia periferica", medicoReferente: "Dr. Rossi", stato: "Programmata", tipo: "visita" },
    { id: 4, ora: "11:00", paziente: "Francesca Neri", cf: "NRIFNC85D04H501X", problemi: "Mucosite orale, disfagia", medicoReferente: "Dr. Bianchi", stato: "Programmata", tipo: "visita" },
    { id: 5, ora: "14:00", paziente: "Luigi Ferrari", cf: "FRRLGI65E05H501Y", problemi: "Epatotossicità, alterazioni ematologiche", medicoReferente: "Dr. Verdi", stato: "Programmata", tipo: "visita" },
    { id: 6, ora: "15:00", paziente: "Maria Romano", cf: "RSSMRA70F06H501Z", problemi: "Nefrotossicità, ipertensione", medicoReferente: "Dr. Rossi", stato: "Programmata", tipo: "visita" },
    { id: 7, ora: "16:00", paziente: "Carlo Bianchi", cf: "BNCCRL60G07H501A", problemi: "Pneumotossicità, fibrosi polmonare", medicoReferente: "Dr. Bianchi", stato: "Programmata", tipo: "visita" },
    { id: 8, ora: "17:00", paziente: "Elena Rossi", cf: "RSSELN55H08H501B", problemi: "Alopecia, alterazioni endocrine", medicoReferente: "Dr. Verdi", stato: "Programmata", tipo: "visita" }
  ]);

  // Mock data per pianificazione settimanale
  const [pianificazione] = useState([
    { giorno: "Lunedì", data: "2024-01-22", visite: 8, completate: 6, inCorso: 1, programmate: 1 },
    { giorno: "Martedì", data: "2024-01-23", visite: 7, completate: 5, inCorso: 0, programmate: 2 },
    { giorno: "Mercoledì", data: "2024-01-24", visite: 9, completate: 7, inCorso: 1, programmate: 1 },
    { giorno: "Giovedì", data: "2024-01-25", visite: 6, completate: 4, inCorso: 0, programmate: 2 },
    { giorno: "Venerdì", data: "2024-01-26", visite: 8, completate: 6, inCorso: 1, programmate: 1 }
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

  const handleExportCSV = () => {
    const csvContent = [
      ["Ora", "Paziente", "CF", "Problemi", "Medico Referente", "Stato"],
      ...occupazione.map(o => [o.ora, o.paziente, o.cf, o.problemi, o.medicoReferente, o.stato])
    ].map(e => e.join(",")).join("\n");

    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([csvContent], { type: "text/csv" }));
    a.download = `cure_simultanee_${formatDateForFilename(selectedDate)}.csv`;
    a.click();
    window.URL.revokeObjectURL(a.href);
  };

  const handleExportExcel = () => {
    const columns = [
      { header: "Ora", key: "ora" },
      { header: "Paziente", key: "paziente" },
      { header: "CF", key: "cf" },
      { header: "Problemi", key: "problemi" },
      { header: "Medico Referente", key: "medicoReferente" },
      { header: "Stato", key: "stato" }
    ];

    exportToExcel(
      occupazione,
      columns,
      `cure_simultanee_${formatDateForFilename(selectedDate)}`,
      `Occupazione Ambulatorio Cure Simultanee - ${selectedDate}`
    );
  };

  const handleExportPDF = () => {
    const columns = [
      { header: "Ora", key: "ora", width: 10 },
      { header: "Paziente", key: "paziente", width: 25 },
      { header: "CF", key: "cf", width: 20 },
      { header: "Problemi", key: "problemi", width: 40 },
      { header: "Medico Referente", key: "medicoReferente", width: 20 },
      { header: "Stato", key: "stato", width: 15 }
    ];

    exportToPDF(
      occupazione,
      columns,
      `cure_simultanee_${formatDateForFilename(selectedDate)}`,
      `Occupazione Ambulatorio Cure Simultanee`,
      `Data: ${selectedDate}`
    );
  };


  // Funzioni per gestione interattiva
  const handleBlockSlot = () => {
    const newSlot = {
      id: occupazione.length + 1,
      ora: blockSlotData.ora,
      paziente: blockSlotData.paziente,
      cf: blockSlotData.cf,
      problemi: blockSlotData.problemi,
      medicoReferente: blockSlotData.medicoReferente,
      stato: "Programmata",
      tipo: "visita"
    };
    setOccupazione([...occupazione, newSlot]);
    setShowBlockSlotDialog(false);
    setBlockSlotData({ ora: "", paziente: "", cf: "", problemi: "", medicoReferente: "", note: "" });
    alert("Slot bloccato con successo!");
  };

  const handleChangeStato = (id: number, nuovoStato: string) => {
    setOccupazione(occupazione.map(slot => 
      slot.id === id ? { ...slot, stato: nuovoStato } : slot
    ));
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
      slot.medicoReferente.toLowerCase().includes(searchTerm.toLowerCase());

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
          <p className="text-muted-foreground">Gestione occupazione e pianificazione</p>
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
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="occupazione" className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Occupazione Giornaliera
            </TabsTrigger>
            <TabsTrigger value="pianificazione" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              Pianificazione Settimanale
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
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button size="sm" className="flex items-center gap-2">
                          <Download className="w-4 h-4" />
                          Esporta
                          <ChevronDown className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={handleExportCSV}>
                          <FileText className="w-4 h-4 mr-2" />
                          Esporta CSV
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={handleExportExcel}>
                          <FileSpreadsheet className="w-4 h-4 mr-2" />
                          Esporta Excel
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={handleExportPDF}>
                          <FileText className="w-4 h-4 mr-2" />
                          Esporta PDF
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {/* Layout a una colonna: Agenda */}
                <div>
                  {/* AGENDA DEL GIORNO */}
                  <div className="space-y-4">
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-4 rounded-t-lg">
                        <h3 className="text-lg font-bold uppercase tracking-wide">AGENDA DEL GIORNO</h3>
                      </div>
                      <div className="p-6">
                        <div className="space-y-2">
                          {/* Orari del calendario giornaliero */}
                          {[
                            "08:00", "08:30", "09:00", "09:30", "10:00", "10:30", 
                            "11:00", "11:30", "12:00", "12:30", "13:00", "13:30",
                            "14:00", "14:30", "15:00", "15:30", "16:00", "16:30",
                            "17:00", "17:30", "18:00"
                          ].map((orario) => {
                            // Trova se c'è una visita per questo orario
                            const visita = filteredOccupazione.find(v => v.ora === orario);
                            
                            const getStatoColor = (stato: string) => {
                              switch (stato) {
                                case "Completata": return "bg-green-100 text-green-800 border-green-200";
                                case "In corso": return "bg-blue-100 text-blue-800 border-blue-200";
                                case "Programmata": return "bg-yellow-100 text-yellow-800 border-yellow-200";
                                default: return "bg-gray-100 text-gray-800 border-gray-200";
                              }
                            };

                            const getStatoText = (stato: string) => {
                              switch (stato) {
                                case "Completata": return "Completata";
                                case "In corso": return "In corso";
                                case "Programmata": return "Programmata";
                                default: return "Programmata";
                              }
                            };

                            return (
                              <div key={orario} className="flex items-center min-h-[60px] border-b border-gray-100 last:border-b-0">
                                {/* Orario */}
                                <div className="w-20 text-sm font-medium text-gray-600 flex-shrink-0">
                                  {orario}
                                </div>
                                
                                {/* Contenuto slot */}
                                <div className="flex-1 ml-4">
                                  {visita ? (
                                    <div className={`p-3 rounded-lg border-l-4 ${
                                      visita.stato === "Completata" ? "bg-green-50 border-l-green-500" :
                                      visita.stato === "In corso" ? "bg-blue-50 border-l-blue-500" :
                                      "bg-yellow-50 border-l-yellow-500"
                                    }`}>
                                      <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center gap-2">
                                          <User className="w-4 h-4 text-gray-600" />
                                          <div>
                                            <div className="font-bold text-gray-900 text-base mb-1">{visita.paziente}</div>
                                            <div className="text-sm text-gray-600">{orario} - {orario.split(':')[0]}:{parseInt(orario.split(':')[1]) + 30}</div>
                                          </div>
                                        </div>
                                        <Badge className={`${getStatoColor(visita.stato)} px-2 py-1 text-xs font-medium`}>
                                          {getStatoText(visita.stato)}
                                        </Badge>
                                      </div>
                                      <div className="space-y-2 text-sm">
                                        <div className="text-gray-700">
                                          <span className="font-semibold">Problemi:</span> {visita.problemi}
                                        </div>
                                        <div className="text-gray-700">
                                          <span className="font-semibold">Medico:</span> {visita.medicoReferente}
                                        </div>
                                      </div>
                                      <div className="flex items-center gap-1 mt-2">
                                        <Select value={visita.stato} onValueChange={(value) => handleChangeStato(visita.id, value)}>
                                          <SelectTrigger className="w-24 h-6 text-xs">
                                            <SelectValue />
                                          </SelectTrigger>
                                          <SelectContent>
                                            <SelectItem value="Completata">Completata</SelectItem>
                                            <SelectItem value="In corso">In corso</SelectItem>
                                            <SelectItem value="Programmata">Programmata</SelectItem>
                                          </SelectContent>
                                        </Select>
                                        <Button variant="outline" size="sm" className="h-6 px-1 hover:bg-blue-50">
                                          <Edit className="w-3 h-3" />
                                        </Button>
                                        <Button variant="outline" size="sm" className="h-6 px-1 hover:bg-red-50 text-red-600">
                                          <Trash2 className="w-3 h-3" />
                                        </Button>
                                      </div>
                                    </div>
                                  ) : (
                                    <div className="text-gray-400 text-sm py-2">
                                      Nessun appuntamento
                                    </div>
                                  )}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
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

        </Tabs>
      </div>

    </div>
  );
};

export default CureSimultaneePage;