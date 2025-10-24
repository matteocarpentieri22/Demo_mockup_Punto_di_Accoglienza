import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { Badge } from "@/shared/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/shared/components/ui/dialog";
import { ArrowLeft, Calendar, Clock, CheckCircle, AlertCircle, Plus, Download, Filter } from "lucide-react";
import CaseManagerNavbar from "@/oncologico/components/CaseManagerNavbar";
import { useNavigate } from "react-router-dom";

const CalendarioPage = () => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState("2024-01-15");
  const [selectedAmbulatorio, setSelectedAmbulatorio] = useState("tutti");
  const [showBlockSlotDialog, setShowBlockSlotDialog] = useState(false);

  // Mock data calendario esteso
  const [calendarData] = useState({
    "2024-01-15": {
      "Cure Simultanee": [
        { ora: "09:00", paziente: "Mario Rossi", tipo: "Visita", medico: "Dr. Bianchi", stato: "confermata", cf: "RSSMRA80A01H501U" },
        { ora: "10:30", paziente: "Anna Bianchi", tipo: "Discussione", medico: "Dr. Verdi", stato: "confermata", cf: "BNCNNA75B02H501V" },
        { ora: "14:00", paziente: "", tipo: "Slot Libero", medico: "", stato: "libero", cf: "" },
        { ora: "15:30", paziente: "Giuseppe Verdi", tipo: "Visita", medico: "Dr. Rossi", stato: "confermata", cf: "VRDGPP70C03H501W" }
      ],
      "Oncogeriatria": [
        { ora: "09:30", paziente: "Francesca Neri", tipo: "Visita", medico: "Dr. Bianchi", stato: "confermata", cf: "NRIFNC85D04H501X" },
        { ora: "11:00", paziente: "", tipo: "Slot Libero", medico: "", stato: "libero", cf: "" },
        { ora: "14:30", paziente: "Luigi Bianchi", tipo: "Discussione", medico: "Dr. Verdi", stato: "confermata", cf: "BNCLGI65E05H501Y" }
      ],
      "Osteoncologia": [
        { ora: "10:00", paziente: "Maria Rossi", tipo: "Visita", medico: "Dr. Bianchi", stato: "confermata", cf: "RSSMRA70F06H501Z" },
        { ora: "15:30", paziente: "", tipo: "Slot Libero", medico: "", stato: "libero", cf: "" },
        { ora: "16:30", paziente: "Paolo Verdi", tipo: "Visita", medico: "Dr. Rossi", stato: "confermata", cf: "VRDPLO80G07H501A" }
      ]
    },
    "2024-01-16": {
      "Cure Simultanee": [
        { ora: "09:00", paziente: "", tipo: "Slot Libero", medico: "", stato: "libero", cf: "" },
        { ora: "10:30", paziente: "Sofia Bianchi", tipo: "Visita", medico: "Dr. Verdi", stato: "confermata", cf: "BNCSFI75H08H501B" },
        { ora: "14:00", paziente: "", tipo: "Slot Libero", medico: "", stato: "libero", cf: "" }
      ],
      "Oncogeriatria": [
        { ora: "09:30", paziente: "", tipo: "Slot Libero", medico: "", stato: "libero", cf: "" },
        { ora: "11:00", paziente: "Antonio Neri", tipo: "Visita", medico: "Dr. Bianchi", stato: "confermata", cf: "NRINTN85I09H501C" }
      ],
      "Osteoncologia": [
        { ora: "10:00", paziente: "Elena Rossi", tipo: "Visita", medico: "Dr. Bianchi", stato: "confermata", cf: "RSSELN70J10H501D" },
        { ora: "15:30", paziente: "", tipo: "Slot Libero", medico: "", stato: "libero", cf: "" }
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

  const handleBlockSlot = (ambulatorio: string, ora: string) => {
    console.log(`Blocking slot: ${ambulatorio} at ${ora}`);
    setShowBlockSlotDialog(false);
    alert(`Slot bloccato per ${ambulatorio} alle ${ora}`);
  };

  const handleExportDay = () => {
    const dailyData = calendarData[selectedDate as keyof typeof calendarData] || {};
    const reportContent = [
      `Riepilogo Giornaliero Ambulatori - ${selectedDate}`,
      "",
      ...Object.entries(dailyData).map(([ambulatorio, slots]) => [
        `\n${ambulatorio}:`,
        ...slots.map(slot => `  ${slot.ora} - ${slot.paziente || "Slot Libero"} - ${slot.tipo} - ${slot.medico || "N/A"} - ${slot.stato}`)
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

  const handleExportVisits = () => {
    const dailyData = calendarData[selectedDate as keyof typeof calendarData] || {};
    const visits = Object.entries(dailyData).flatMap(([ambulatorio, slots]) =>
      slots.filter(slot => slot.paziente).map(slot => ({
        ambulatorio,
        ora: slot.ora,
        paziente: slot.paziente,
        tipo: slot.tipo,
        medico: slot.medico,
        cf: slot.cf
      }))
    );

    const csvContent = [
      ["Ambulatorio", "Ora", "Paziente", "Tipo", "Medico", "CF"],
      ...visits.map(visit => [
        visit.ambulatorio,
        visit.ora,
        visit.paziente,
        visit.tipo,
        visit.medico,
        visit.cf
      ])
    ].map(row => row.join(",")).join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `visite_${selectedDate}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
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
            <Button variant="ghost" size="sm" onClick={() => navigate('/oncologico')}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Indietro
            </Button>
            <div>
              <h1 className="text-2xl font-bold">Calendario Ambulatori</h1>
              <p className="text-muted-foreground">Gestione visite e coordinamento ambulatori</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleExportDay}>
              <Download className="w-4 h-4 mr-2" />
              Export Giornaliero
            </Button>
            <Button variant="outline" onClick={handleExportVisits}>
              <Download className="w-4 h-4 mr-2" />
              Export Visite
            </Button>
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
                  <Badge variant="outline">
                    {slots.filter(slot => slot.stato === 'confermata').length} / {slots.length}
                  </Badge>
                </CardTitle>
                <CardDescription>
                  Visite e discussioni del {selectedDate}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {slots.map((slot, index) => (
                    <div
                      key={index}
                      className={`p-3 rounded-lg border ${getStatusColor(slot.stato)}`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          {getStatusIcon(slot.stato)}
                          <span className="font-medium">{slot.ora}</span>
                        </div>
                        {slot.stato === 'libero' && (
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button size="sm" variant="outline">
                                <Plus className="w-3 h-3 mr-1" />
                                Blocca
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Blocca Slot</DialogTitle>
                                <DialogDescription>
                                  Confermi di voler bloccare lo slot per {ambulatorio} alle {slot.ora}?
                                </DialogDescription>
                              </DialogHeader>
                              <div className="flex justify-end gap-2">
                                <Button variant="outline" onClick={() => setShowBlockSlotDialog(false)}>
                                  Annulla
                                </Button>
                                <Button onClick={() => handleBlockSlot(ambulatorio, slot.ora)}>
                                  Conferma Blocco
                                </Button>
                              </div>
                            </DialogContent>
                          </Dialog>
                        )}
                      </div>
                      
                      {slot.paziente ? (
                        <div className="space-y-1 text-sm">
                          <p><strong>Paziente:</strong> {slot.paziente}</p>
                          <p><strong>Tipo:</strong> {slot.tipo}</p>
                          <p><strong>Medico:</strong> {slot.medico}</p>
                          <p><strong>CF:</strong> <span className="font-mono text-xs">{slot.cf}</span></p>
                        </div>
                      ) : (
                        <div className="text-sm text-muted-foreground">
                          Slot disponibile per nuova prenotazione
                        </div>
                      )}
                    </div>
                  ))}
                </div>
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

export default CalendarioPage;
