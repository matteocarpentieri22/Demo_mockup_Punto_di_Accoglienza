import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { Badge } from "@/shared/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/shared/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/shared/components/ui/dropdown-menu";
import { ArrowLeft, Calendar, Clock, CheckCircle, AlertCircle, Download, Filter, Plus, Lock, Unlock, MessageSquare, Stethoscope, FileSpreadsheet, FileText, ChevronDown } from "lucide-react";
import CaseManagerNavbar from "@/oncologico/components/layout/CaseManagerNavbar";
import { useNavigate } from "react-router-dom";
import { exportToExcel, exportToPDF, formatDateForFilename } from "@/oncologico/utils/export";

type SlotData = {
  ora: string;
  paziente: string;
  tipo: string;
  medico: string;
  stato: string;
  cf?: string;
  // Campi per Cure Simultanee
  problemi?: string;
  // Campi per Oncogeriatria
  neoplasia?: string;
  stadio?: string;
  finalitaTrattamento?: string;
  ecogPS?: string;
  punteggioG8?: string;
  esitoVGM?: string;
  quesitoGeriatra?: string;
  // Campi per Osteoncologia
  quesito?: string;
};

const VisiteAmbulatoriPage = () => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState("2024-01-15");
  const [selectedAmbulatorio, setSelectedAmbulatorio] = useState("tutti");
  const [showBlockSlotDialog, setShowBlockSlotDialog] = useState(false);
  const [blockSlotData, setBlockSlotData] = useState({
    ambulatorio: "",
    ora: "",
    tipo: "visita",
    paziente: "",
    cf: "",
    medico: "",
    note: ""
  });

  // Mock data calendario ambulatori
  const [calendarData] = useState({
    "2024-01-15": {
      "Cure Simultanee": [
        { ora: "09:00", paziente: "Mario Rossi", tipo: "Visita", medico: "Dr. Bianchi", stato: "confermata", cf: "RSSMRA80A01H501U", problemi: "Dolore diffuso e dispnea" },
        { ora: "10:30", paziente: "Anna Bianchi", tipo: "Visita", medico: "Dr. Verdi", stato: "confermata", cf: "BNCNNA75B02H501V", problemi: "Discordia di opinione su trattamento" },
        { ora: "14:00", paziente: "", tipo: "Slot Libero", medico: "", stato: "libero", cf: "", problemi: "" },
        { ora: "15:30", paziente: "Giuseppe Verdi", tipo: "Visita", medico: "Dr. Rossi", stato: "confermata", cf: "VRDGPP70C03H501W", problemi: "Alterazioni elettrolitiche" }
      ],
      "Oncogeriatria": [
        { ora: "09:30", paziente: "Francesca Neri", tipo: "Visita", medico: "Dr. Bianchi", stato: "confermata", cf: "NRIFNC85D04H501X", neoplasia: "Adenocarcinoma mammario", stadio: "T2N1M0", finalitaTrattamento: "Paliativa", ecogPS: "2", punteggioG8: "12", esitoVGM: "Positivo", quesitoGeriatra: "Valutazione fragilità e tossicità" },
        { ora: "11:00", paziente: "", tipo: "Slot Libero", medico: "", stato: "libero", cf: "", neoplasia: "", stadio: "", finalitaTrattamento: "", ecogPS: "", punteggioG8: "", esitoVGM: "", quesitoGeriatra: "" },
        { ora: "14:30", paziente: "Luigi Bianchi", tipo: "Visita", medico: "Dr. Verdi", stato: "confermata", cf: "BNCLGI65E05H501Y", neoplasia: "Adenocarcinoma colon", stadio: "T3N2M1", finalitaTrattamento: "Paliativa", ecogPS: "1", punteggioG8: "14", esitoVGM: "Negativo", quesitoGeriatra: "Ottimizzazione terapeutica" }
      ],
      "Osteoncologia": [
        { ora: "09:00", paziente: "Maria Rossi", tipo: "Visita", medico: "Dr. Bianchi", stato: "confermata", cf: "RSSMRA70F06H501Z", problemi: "Frattura patologica", quesito: "Stabilità frammenti e indicazione chirurgica" },
        { ora: "10:30", paziente: "Giovanni Ferrari", tipo: "Discussione", medico: "Dr. Bianchi", stato: "confermata", cf: "FRRGNN75H08H501B", problemi: "Lesioni osteolitiche multiple", quesito: "Strategia terapeutica e indicazione intervento" },
        { ora: "11:30", paziente: "Luisa Conti", tipo: "Discussione", medico: "Dr. Rossi", stato: "confermata", cf: "CNTLSU80I09H501C", problemi: "Patologia ossea secondaria", quesito: "Valutazione rischio frattura e terapia preventiva" },
        { ora: "15:30", paziente: "", tipo: "Slot Libero", medico: "", stato: "libero", cf: "", problemi: "", quesito: "" },
        { ora: "16:30", paziente: "Paolo Verdi", tipo: "Visita", medico: "Dr. Rossi", stato: "confermata", cf: "VRDPLO80G07H501A", problemi: "Osteonecrosi mandibola", quesito: "Gestione osteonecrosi e sospensione bisphosphonati" }
      ]
    },
    "2024-01-16": {
      "Cure Simultanee": [
        { ora: "09:00", paziente: "", tipo: "Slot Libero", medico: "", stato: "libero", cf: "", problemi: "" },
        { ora: "10:30", paziente: "Sofia Bianchi", tipo: "Visita", medico: "Dr. Verdi", stato: "confermata", cf: "BNCSFI75H08H501B", problemi: "Effetti collaterali radioterapia" },
        { ora: "14:00", paziente: "", tipo: "Slot Libero", medico: "", stato: "libero", cf: "", problemi: "" }
      ],
      "Oncogeriatria": [
        { ora: "09:30", paziente: "", tipo: "Slot Libero", medico: "", stato: "libero", cf: "", neoplasia: "", stadio: "", finalitaTrattamento: "", ecogPS: "", punteggioG8: "", esitoVGM: "", quesitoGeriatra: "" },
        { ora: "11:00", paziente: "Antonio Neri", tipo: "Visita", medico: "Dr. Bianchi", stato: "confermata", cf: "NRINTN85I09H501C", neoplasia: "Mesotelioma pleurico", stadio: "T2N1M0", finalitaTrattamento: "Curativa", ecogPS: "1", punteggioG8: "15", esitoVGM: "Positivo", quesitoGeriatra: "Capacità tolleranza" }
      ],
      "Osteoncologia": [
        { ora: "09:00", paziente: "Andrea Martini", tipo: "Discussione", medico: "Dr. Bianchi", stato: "confermata", cf: "MRTNDR65K11H501E", problemi: "Frattura patologica omero", quesito: "Stabilizzazione chirurgica e radioterapia" },
        { ora: "10:00", paziente: "Elena Rossi", tipo: "Visita", medico: "Dr. Bianchi", stato: "confermata", cf: "RSSELN70J10H501D", problemi: "Metastasi vertebra D8", quesito: "Terapia antalgica e radioterapia" },
        { ora: "15:30", paziente: "", tipo: "Slot Libero", medico: "", stato: "libero", cf: "", problemi: "", quesito: "" },
        { ora: "16:00", paziente: "Roberto Galli", tipo: "Discussione", medico: "Dr. Rossi", stato: "confermata", cf: "GLLRRT72L12H501F", problemi: "Osteolisi cranio", quesito: "Monitoraggio e follow-up" }
      ]
    }
  });

  const ambulatori = ["Cure Simultanee", "Oncogeriatria", "Osteoncologia"];

  const getStatusIcon = (stato: string) => {
    switch (stato) {
      case "confermata":
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case "libero":
        return <Clock className="w-4 h-4 text-gray-400" />;
      default:
        return <AlertCircle className="w-4 h-4 text-yellow-600" />;
    }
  };

  const getStatusColor = (stato: string) => {
    switch (stato) {
      case "confermata":
        return "bg-green-50 border-green-200";
      case "libero":
        return "bg-gray-50 border-gray-200";
      default:
        return "bg-yellow-50 border-yellow-200";
    }
  };

  // Solo il colore del bordo (senza background) per evitare override sugli sfondi custom
  const getStatusBorderOnly = (stato: string) => {
    switch (stato) {
      case "confermata":
        return "border-green-200";
      case "libero":
        return "border-gray-200";
      default:
        return "border-yellow-200";
    }
  };


  const handleExportDay = () => {
    const dailyData = calendarData[selectedDate as keyof typeof calendarData] || {};
    const reportContent = [
      `Riepilogo Giornaliero Ambulatori - ${selectedDate}`,
      "",
      ...Object.entries(dailyData).map(([ambulatorio, slots]) => [
        `\n${ambulatorio}:`,
        ...(slots as Array<{ora: string; paziente?: string; tipo: string; medico?: string; stato: string; cf?: string}>).map(slot => `  ${slot.ora} - ${slot.paziente || "Slot Libero"} - ${slot.tipo} - ${slot.medico || "N/A"} - ${slot.stato}`)
      ]).flat()
    ].join("\n");

    const blob = new Blob([reportContent], { type: "text/plain" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `riepilogo_ambulatori_${selectedDate}.txt`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  // Ottieni i dati delle visite per l'export (opzionale filtro per ambulatorio specifico)
  const getVisitsData = (ambulatorioFiltro?: string) => {
    const dailyData = calendarData[selectedDate as keyof typeof calendarData] || {};
    const dataToUse = ambulatorioFiltro 
      ? { [ambulatorioFiltro]: dailyData[ambulatorioFiltro as keyof typeof dailyData] }
      : dailyData;
    
    return Object.entries(dataToUse).flatMap(([ambulatorio, slots]) =>
      (slots as Array<SlotData>).filter(slot => slot.paziente && slot.stato === "confermata").map(slot => ({
        ambulatorio,
        ora: slot.ora,
        paziente: slot.paziente || '',
        tipo: slot.tipo,
        medico: slot.medico || '',
        cf: slot.cf || '',
        stato: slot.stato
      }))
    );
  };

  const handleExportCSV = (ambulatorioSpecifico?: string) => {
    const visits = getVisitsData(ambulatorioSpecifico);
    const filename = ambulatorioSpecifico 
      ? `visite_${ambulatorioSpecifico.toLowerCase().replace(/ /g, '_')}_${formatDateForFilename(selectedDate)}`
      : `visite_ambulatori_${formatDateForFilename(selectedDate)}`;
    
    const csvContent = [
      ["Ambulatorio", "Ora", "Paziente", "Tipo", "Medico", "CF", "Stato"],
      ...visits.map(visit => [
        visit.ambulatorio,
        visit.ora,
        visit.paziente,
        visit.tipo,
        visit.medico,
        visit.cf,
        visit.stato
      ])
    ].map(row => row.join(",")).join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${filename}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const handleExportExcel = (ambulatorioSpecifico?: string) => {
    const visits = getVisitsData(ambulatorioSpecifico);
    const filename = ambulatorioSpecifico 
      ? `visite_${ambulatorioSpecifico.toLowerCase().replace(/ /g, '_')}_${formatDateForFilename(selectedDate)}`
      : `visite_ambulatori_${formatDateForFilename(selectedDate)}`;
    
    const title = ambulatorioSpecifico
      ? `Visite ${ambulatorioSpecifico} - ${selectedDate}`
      : `Visite Ambulatori - ${selectedDate}`;
    
    const columns = [
      { header: "Ambulatorio", key: "ambulatorio" },
      { header: "Ora", key: "ora" },
      { header: "Paziente", key: "paziente" },
      { header: "Tipo", key: "tipo" },
      { header: "Medico", key: "medico" },
      { header: "CF", key: "cf" },
      { header: "Stato", key: "stato" }
    ];

    exportToExcel(
      visits,
      columns,
      filename,
      title
    );
  };

  const handleExportPDF = (ambulatorioSpecifico?: string) => {
    const visits = getVisitsData(ambulatorioSpecifico);
    const filename = ambulatorioSpecifico 
      ? `visite_${ambulatorioSpecifico.toLowerCase().replace(/ /g, '_')}_${formatDateForFilename(selectedDate)}`
      : `visite_ambulatori_${formatDateForFilename(selectedDate)}`;
    
    const subtitle = ambulatorioSpecifico
      ? `${ambulatorioSpecifico} - Data: ${selectedDate}`
      : `Data: ${selectedDate}`;
    
    const columns = [
      { header: "Ambulatorio", key: "ambulatorio", width: 20 },
      { header: "Ora", key: "ora", width: 10 },
      { header: "Paziente", key: "paziente", width: 30 },
      { header: "Tipo", key: "tipo", width: 15 },
      { header: "Medico", key: "medico", width: 25 },
      { header: "CF", key: "cf", width: 20 },
      { header: "Stato", key: "stato", width: 15 }
    ];

    exportToPDF(
      visits,
      columns,
      filename,
      `Visite ${ambulatorioSpecifico || "Ambulatori"}`,
      subtitle
    );
  };

  const handleBlockSlot = () => {
    // Simula il blocco dello slot
    console.log("Blocco slot:", blockSlotData);
    
    // Mostra conferma con i dettagli
    const confirmMessage = `Slot bloccato con successo!\n\n` +
      `Ambulatorio: ${blockSlotData.ambulatorio}\n` +
      `Ora: ${blockSlotData.ora}\n` +
      `Tipo: ${blockSlotData.tipo}\n` +
      `Medico: ${blockSlotData.medico}\n` +
      (blockSlotData.paziente ? `Paziente: ${blockSlotData.paziente}\n` : '') +
      (blockSlotData.note ? `Note: ${blockSlotData.note}` : '');
    
    alert(confirmMessage);
    
    // Chiudi dialog e reset form
    setShowBlockSlotDialog(false);
    setBlockSlotData({
      ambulatorio: "",
      ora: "",
      tipo: "visita",
      paziente: "",
      cf: "",
      medico: "",
      note: ""
    });
  };

  // Determina le opzioni disponibili per il tipo in base all'ambulatorio
  const getAvailableTypes = () => {
    if (!blockSlotData.ambulatorio) {
      return [];
    }
    if (blockSlotData.ambulatorio === "Osteoncologia") {
      return [
        { value: "visita", label: "Visita" },
        { value: "discussione", label: "Discussione" }
      ];
    }
    // Per Cure Simultanee e Oncogeriatria, solo visita
    return [
      { value: "visita", label: "Visita" }
    ];
  };

  const filteredData = selectedAmbulatorio === "tutti" 
    ? calendarData[selectedDate as keyof typeof calendarData] || {}
    : { [selectedAmbulatorio]: calendarData[selectedDate as keyof typeof calendarData]?.[selectedAmbulatorio] || [] };

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
              <h1 className="text-2xl font-bold">Visite Ambulatori</h1>
              <p className="text-muted-foreground">Gestione calendario e coordinamento visite</p>
            </div>
          </div>
        </div>

        {/* Filtri */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <Label htmlFor="date">Data:</Label>
                <Input
                  id="date"
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-48"
                />
              </div>
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4" />
                <Label>Ambulatorio:</Label>
                <Select value={selectedAmbulatorio} onValueChange={setSelectedAmbulatorio}>
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tutti">Tutti gli Ambulatori</SelectItem>
                    {ambulatori.map((amb) => (
                      <SelectItem key={amb} value={amb}>{amb}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              {/* Pulsante Blocco Slot */}
              <div className="flex items-center gap-2">
                <Dialog open={showBlockSlotDialog} onOpenChange={setShowBlockSlotDialog}>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="flex items-center gap-2">
                      <Lock className="w-4 h-4" />
                      Blocca Slot
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle>Blocca Slot</DialogTitle>
                      <DialogDescription>
                        Blocca uno slot per una nuova visita o discussione
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="block-ambulatorio">Ambulatorio</Label>
                          <Select value={blockSlotData.ambulatorio} onValueChange={(value) => {
                            // Quando cambia l'ambulatorio, resetta il tipo se non è più valido
                            let newTipo = blockSlotData.tipo;
                            if (value === "Osteoncologia") {
                              // Osteoncologia supporta visita e discussione
                              if (!["visita", "discussione"].includes(blockSlotData.tipo)) {
                                newTipo = "visita";
                              }
                            } else {
                              // Cure Simultanee e Oncogeriatria supportano solo visita
                              newTipo = "visita";
                            }
                            setBlockSlotData({...blockSlotData, ambulatorio: value, tipo: newTipo});
                          }}>
                            <SelectTrigger>
                              <SelectValue placeholder="Seleziona ambulatorio" />
                            </SelectTrigger>
                            <SelectContent>
                              {ambulatori.map((amb) => (
                                <SelectItem key={amb} value={amb}>{amb}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="block-ora">Ora</Label>
                          <Input
                            id="block-ora"
                            type="time"
                            value={blockSlotData.ora}
                            onChange={(e) => setBlockSlotData({...blockSlotData, ora: e.target.value})}
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="block-tipo">Tipo</Label>
                        <Select value={blockSlotData.tipo} onValueChange={(value) => setBlockSlotData({...blockSlotData, tipo: value})}>
                          <SelectTrigger disabled={!blockSlotData.ambulatorio}>
                            <SelectValue placeholder={blockSlotData.ambulatorio ? "Seleziona tipo" : "Seleziona prima l'ambulatorio"} />
                          </SelectTrigger>
                          <SelectContent>
                            {getAvailableTypes().map((type) => (
                              <SelectItem key={type.value} value={type.value}>{type.label}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="block-paziente">Paziente (opzionale)</Label>
                        <Input
                          id="block-paziente"
                          placeholder="Nome del paziente"
                          value={blockSlotData.paziente}
                          onChange={(e) => setBlockSlotData({...blockSlotData, paziente: e.target.value})}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="block-cf">Codice Fiscale (opzionale)</Label>
                        <Input
                          id="block-cf"
                          placeholder="Codice fiscale"
                          value={blockSlotData.cf}
                          onChange={(e) => setBlockSlotData({...blockSlotData, cf: e.target.value})}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="block-medico">Medico</Label>
                        <Input
                          id="block-medico"
                          placeholder="Nome del medico"
                          value={blockSlotData.medico}
                          onChange={(e) => setBlockSlotData({...blockSlotData, medico: e.target.value})}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="block-note">Note (opzionale)</Label>
                        <Input
                          id="block-note"
                          placeholder="Note aggiuntive"
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
          </CardContent>
        </Card>

        {/* Calendario */}
        <div className="grid md:grid-cols-3 gap-6">
          {Object.entries(filteredData).map(([ambulatorio, slots]) => (
            <Card key={ambulatorio}>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>{ambulatorio}</span>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 px-2">
                        <Download className="w-4 h-4 mr-1" />
                        Esporta
                        <ChevronDown className="w-3 h-3 ml-1" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="min-w-[200px]">
                      <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground uppercase">
                        {ambulatorio}
                      </div>
                      <DropdownMenuItem onClick={() => handleExportCSV(ambulatorio)}>
                        <FileText className="w-4 h-4 mr-2" />
                        Esporta CSV
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleExportExcel(ambulatorio)}>
                        <FileSpreadsheet className="w-4 h-4 mr-2" />
                        Esporta Excel
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleExportPDF(ambulatorio)}>
                        <FileText className="w-4 h-4 mr-2" />
                        Esporta PDF
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </CardTitle>
                <CardDescription>
                  {ambulatorio === 'Osteoncologia' 
                    ? `Visite e discussioni del ${selectedDate}`
                    : `Visite del ${selectedDate}`
                  }
                </CardDescription>
              </CardHeader>
              <CardContent>
                {/* Separa Visite/Slot e Discussioni */}
                {(() => {
                  const visiteSlots = slots.filter(s => s.tipo !== 'Discussione');
                  const discussioniSlots = ambulatorio === 'Osteoncologia' ? slots.filter(s => s.tipo === 'Discussione') : [];
                  return (
                    <div className="space-y-6">
                      <div>
                        <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2"><Stethoscope className="w-4 h-4 text-green-600" />Visite</h4>
                        <div className="space-y-3">
                          {visiteSlots.map((slot, index) => (
                            <div key={`v-${index}`} className={`p-3 rounded-lg border ${getStatusColor(slot.stato)} bg-green-50 border-l-4 border-l-green-500`}>
                              <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-2">
                                  {getStatusIcon(slot.stato)}
                                  <span className="font-medium">{slot.ora}</span>
                                </div>
                                {slot.stato === 'libero' && (
                                  <Button 
                                    size="sm" 
                                    variant="outline"
                                    onClick={() => {
                                      setBlockSlotData({
                                        ...blockSlotData,
                                        ambulatorio: ambulatorio,
                                        ora: slot.ora
                                      });
                                      setShowBlockSlotDialog(true);
                                    }}
                                  >
                                    <Lock className="w-3 h-3 mr-1" />
                                    Blocca
                                  </Button>
                                )}
                              </div>
                              {slot.paziente ? (
                                <div className="space-y-1 text-sm">
                                  <p className="text-base font-bold text-gray-900 mb-2 border-b border-gray-200 pb-1">{slot.paziente}</p>
                                  {ambulatorio === "Cure Simultanee" && (slot as SlotData).problemi && (
                                    <p><strong>Problemi:</strong> {(slot as SlotData).problemi}</p>
                                  )}
                                  {ambulatorio === "Oncogeriatria" && (
                                    <>
                                      {(slot as SlotData).neoplasia && <p><strong>Neoplasia:</strong> {(slot as SlotData).neoplasia}</p>}
                                      {(slot as SlotData).stadio && <p><strong>Stadio:</strong> {(slot as SlotData).stadio}</p>}
                                      {(slot as SlotData).finalitaTrattamento && <p><strong>Finalità trattamento:</strong> {(slot as SlotData).finalitaTrattamento}</p>}
                                      {(slot as SlotData).ecogPS && <p><strong>ECOG PS:</strong> {(slot as SlotData).ecogPS}</p>}
                                      {(slot as SlotData).punteggioG8 && <p><strong>Punteggio G8:</strong> {(slot as SlotData).punteggioG8}</p>}
                                      {(slot as SlotData).esitoVGM && <p><strong>Esito VGM:</strong> {(slot as SlotData).esitoVGM}</p>}
                                      {(slot as SlotData).quesitoGeriatra && <p><strong>Quesito per geriatra:</strong> {(slot as SlotData).quesitoGeriatra}</p>}
                                    </>
                                  )}
                                  {ambulatorio === "Osteoncologia" && (
                                    <>
                                      {(slot as SlotData).problemi && <p><strong>Problemi:</strong> {(slot as SlotData).problemi}</p>}
                                      {(slot as SlotData).quesito && <p><strong>Quesito:</strong> {(slot as SlotData).quesito}</p>}
                                    </>
                                  )}
                                  <p><strong>Medico Referente:</strong> {slot.medico}</p>
                                </div>
                              ) : (
                                <div className="text-sm text-muted-foreground">Slot disponibile per nuova prenotazione</div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>

                      {discussioniSlots.length > 0 && (
                        <div>
                          <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2"><MessageSquare className="w-4 h-4 text-blue-600" />Discussioni</h4>
                          <div className="space-y-3">
                            {discussioniSlots.map((slot, index) => (
                              <div key={`d-${index}`} className={`p-3 rounded-lg border bg-blue-50 ${getStatusBorderOnly(slot.stato)} border-l-4 border-l-blue-500`}>
                                <div className="flex items-center justify-between mb-2">
                                  <div className="flex items-center gap-2">
                                    {getStatusIcon(slot.stato)}
                                    <Badge variant="outline" className="bg-blue-50 border-blue-200 text-blue-700">Discussione</Badge>
                                  </div>
                                </div>
                                <div className="space-y-1 text-sm">
                                  <p className="text-base font-bold text-blue-900 mb-2 border-b border-blue-200 pb-1">{slot.paziente}</p>
                                  {ambulatorio === "Cure Simultanee" && (slot as SlotData).problemi && (
                                    <p><strong>Problemi:</strong> {(slot as SlotData).problemi}</p>
                                  )}
                                  {ambulatorio === "Oncogeriatria" && (
                                    <>
                                      {(slot as SlotData).neoplasia && <p><strong>Neoplasia:</strong> {(slot as SlotData).neoplasia}</p>}
                                      {(slot as SlotData).stadio && <p><strong>Stadio:</strong> {(slot as SlotData).stadio}</p>}
                                      {(slot as SlotData).finalitaTrattamento && <p><strong>Finalità trattamento:</strong> {(slot as SlotData).finalitaTrattamento}</p>}
                                      {(slot as SlotData).ecogPS && <p><strong>ECOG PS:</strong> {(slot as SlotData).ecogPS}</p>}
                                      {(slot as SlotData).punteggioG8 && <p><strong>Punteggio G8:</strong> {(slot as SlotData).punteggioG8}</p>}
                                      {(slot as SlotData).esitoVGM && <p><strong>Esito VGM:</strong> {(slot as SlotData).esitoVGM}</p>}
                                      {(slot as SlotData).quesitoGeriatra && <p><strong>Quesito per geriatra:</strong> {(slot as SlotData).quesitoGeriatra}</p>}
                                    </>
                                  )}
                                  {ambulatorio === "Osteoncologia" && (
                                    <>
                                      {(slot as SlotData).problemi && <p><strong>Problemi:</strong> {(slot as SlotData).problemi}</p>}
                                      {(slot as SlotData).quesito && <p><strong>Quesito:</strong> {(slot as SlotData).quesito}</p>}
                                    </>
                                  )}
                                  <p><strong>Medico Referente:</strong> {slot.medico}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })()}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Riepilogo giornaliero */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Riepilogo Giornaliero</CardTitle>
            <CardDescription>
              Statistiche per il {selectedDate}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {Object.values(filteredData).flat().filter(slot => slot.stato === 'confermata').length}
                </div>
                <div className="text-sm text-muted-foreground">Visite Confermate</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-600">
                  {Object.values(filteredData).flat().filter(slot => slot.stato === 'libero').length}
                </div>
                <div className="text-sm text-muted-foreground">Slot Liberi</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {Object.values(filteredData).flat().filter(slot => slot.tipo === 'Discussione').length}
                </div>
                <div className="text-sm text-muted-foreground">Discussioni</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">
                  {Object.values(filteredData).flat().filter(slot => slot.tipo === 'Visita').length}
                </div>
                <div className="text-sm text-muted-foreground">Visite</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default VisiteAmbulatoriPage;
