import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";
import { Badge } from "@/shared/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/shared/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/components/ui/tabs";
import { ArrowLeft, Calendar, Users, Clock, CheckCircle, AlertCircle, Download, Plus, Eye, User, Trash2, MessageSquare, Stethoscope } from "lucide-react";
import OsteoncologiaNavbar from "@/oncologico/components/OsteoncologiaNavbar";
import { useNavigate } from "react-router-dom";

const OsteoncologiaPage = () => {
  const navigate = useNavigate();

  // Mock data per occupazione giornaliera
  const [occupazione] = useState([
    { id: 1, ora: "08:00", paziente: "Francesca Neri", cf: "NRIFNC85D04H501X", patologia: "Osteosarcoma", quesitoDiagnostico: "Visita osteoncologica", medicoRichiedente: "Dr. Bianchi", medico: "Dr. Bianchi", stato: "Completata", tipo: "visita" },
    { id: 2, ora: "09:00", paziente: "Luigi Ferrari", cf: "FRRLGI65E05H501Y", patologia: "Condrosarcoma", quesitoDiagnostico: "Follow-up post-chirurgia", medicoRichiedente: "Dr. Verdi", medico: "Dr. Verdi", stato: "In corso", tipo: "visita" },
    { id: 3, ora: "10:00", paziente: "Marco Rossi", cf: "RSSMRC70C03H501W", patologia: "Sarcoma dei tessuti molli", quesitoDiagnostico: "Discussione caso", medicoRichiedente: "Dr. Rossi", medico: "Dr. Rossi", stato: "Programmata", tipo: "visita" },
    { id: 4, ora: "11:00", paziente: "Sofia Bianchi", cf: "BNCSFA80A01H501U", patologia: "Metastasi ossee", quesitoDiagnostico: "Visita controllo", medicoRichiedente: "Dr. Bianchi", medico: "Dr. Bianchi", stato: "Programmata", tipo: "visita" },
    { id: 5, ora: "14:00", paziente: "Alessandro Verdi", cf: "VRDLSR75B02H501V", patologia: "Osteosarcoma", quesitoDiagnostico: "Prima visita", medicoRichiedente: "Dr. Verdi", medico: "Dr. Verdi", stato: "Programmata", tipo: "visita" },
    { id: 6, ora: "15:00", paziente: "Giulia Neri", cf: "NRIGLI60E05H501Y", patologia: "Condrosarcoma", quesitoDiagnostico: "Follow-up", medicoRichiedente: "Dr. Rossi", medico: "Dr. Rossi", stato: "Programmata", tipo: "visita" },
    { id: 7, ora: "16:00", paziente: "Roberto Ferrari", cf: "FRRRBR55F06H501Z", patologia: "Sarcoma", quesitoDiagnostico: "Valutazione pre-chirurgica", medicoRichiedente: "Dr. Bianchi", medico: "Dr. Bianchi", stato: "Programmata", tipo: "visita" }
  ]);

  // Mock data per pianificazione settimanale
  const [pianificazione] = useState([
    { giorno: "Lunedì", data: "2024-01-22", visite: 7, completate: 6, inCorso: 1, programmate: 0 },
    { giorno: "Martedì", data: "2024-01-23", visite: 6, completate: 4, inCorso: 0, programmate: 2 },
    { giorno: "Mercoledì", data: "2024-01-24", visite: 8, completate: 3, inCorso: 2, programmate: 3 },
    { giorno: "Giovedì", data: "2024-01-25", visite: 5, completate: 2, inCorso: 1, programmate: 2 },
    { giorno: "Venerdì", data: "2024-01-26", visite: 6, completate: 1, inCorso: 0, programmate: 5 }
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
        return <Clock className="w-4 h-4" />;
    }
  };

  const handleExportOccupazione = () => {
    const csvContent = [
      ["Ora", "Paziente", "CF", "Patologia", "Quesito Diagnostico", "Medico Richiedente", "Stato"],
      ...occupazione.map(visita => [
        visita.ora,
        visita.paziente,
        visita.cf,
        visita.patologia,
        visita.quesitoDiagnostico,
        visita.medicoRichiedente,
        visita.stato
      ])
    ].map(row => row.join(",")).join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "occupazione_osteoncologia.csv";
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-background">
      <OsteoncologiaNavbar />
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate(-1)}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Indietro
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Osteoncologia</h1>
              <p className="text-gray-600">Gestione occupazione e pianificazione</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="occupazione" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="occupazione">Occupazione Giornaliera</TabsTrigger>
            <TabsTrigger value="pianificazione">Pianificazione Settimanale</TabsTrigger>
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
                  <Button onClick={handleExportOccupazione} className="flex items-center gap-2">
                    <Download className="w-4 h-4" />
                    Esporta CSV
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {/* Layout a due colonne: Agenda e Discussioni */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Colonna Sinistra: AGENDA DEL GIORNO */}
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
                            const visita = occupazione.find(v => v.ora === orario);
                            
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
                                            <div className="font-semibold text-gray-900 text-sm">{visita.paziente}</div>
                                            <div className="text-xs text-gray-600">{orario} - {orario.split(':')[0]}:{parseInt(orario.split(':')[1]) + 30}</div>
                                          </div>
                                        </div>
                                        <Badge className={`${getStatoColor(visita.stato)} px-2 py-1 text-xs font-medium`}>
                                          {getStatoText(visita.stato)}
                                        </Badge>
                                      </div>
                                      <div className="space-y-1 text-xs">
                                        <div className="text-gray-700">
                                          <span className="font-medium">Patologia:</span> {visita.patologia}
                                        </div>
                                        <div className="text-gray-700">
                                          <span className="font-medium">Quesito:</span> {visita.quesitoDiagnostico}
                                        </div>
                                        <div className="text-gray-700">
                                          <span className="font-medium">Medico:</span> {visita.medicoRichiedente}
                                        </div>
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

                  {/* Colonna Destra: DISCUSSIONI MEDICHE */}
                  <div className="space-y-4">
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-4 rounded-t-lg">
                        <h3 className="text-lg font-bold uppercase tracking-wide">Discussioni Mediche</h3>
                      </div>
                      <div className="p-6">
                        <div className="space-y-4">
                          {/* Discussione 1 */}
                          <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                            <div className="flex items-start gap-3">
                              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                                <MessageSquare className="w-4 h-4 text-blue-600" />
                              </div>
                              <div className="flex-1">
                                <h4 className="font-semibold text-gray-900 mb-2">
                                  Valutazione chirurgica osteosarcoma
                                </h4>
                                <div className="space-y-2">
                                  <div className="text-sm text-gray-600">
                                    <span className="font-medium">Partecipanti:</span>
                                    <div className="flex items-center gap-2 mt-1">
                                      <div className="w-6 h-6 bg-blue-600 text-white text-xs rounded-full flex items-center justify-center">OS</div>
                                      <div className="w-6 h-6 bg-blue-600 text-white text-xs rounded-full flex items-center justify-center">OR</div>
                                      <div className="w-6 h-6 bg-blue-600 text-white text-xs rounded-full flex items-center justify-center">RA</div>
                                    </div>
                                    <div className="text-xs text-gray-500 mt-1">
                                      Dr. Osteoncologo, Dr. Ortopedico, Dr. Radioterapista
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Discussione 2 */}
                          <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                            <div className="flex items-start gap-3">
                              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                                <MessageSquare className="w-4 h-4 text-blue-600" />
                              </div>
                              <div className="flex-1">
                                <h4 className="font-semibold text-gray-900 mb-2">
                                  Pianificazione protesi oncologica
                                </h4>
                                <div className="space-y-2">
                                  <div className="text-sm text-gray-600">
                                    <span className="font-medium">Partecipanti:</span>
                                    <div className="flex items-center gap-2 mt-1">
                                      <div className="w-6 h-6 bg-blue-600 text-white text-xs rounded-full flex items-center justify-center">OS</div>
                                      <div className="w-6 h-6 bg-blue-600 text-white text-xs rounded-full flex items-center justify-center">PR</div>
                                    </div>
                                    <div className="text-xs text-gray-500 mt-1">
                                      Dr. Osteoncologo, Dr. Protesista
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Aggiungi discussione */}
                          <div className="p-4 border-2 border-dashed border-gray-300 rounded-lg text-center hover:border-blue-400 hover:bg-blue-50 transition-colors cursor-pointer">
                            <Plus className="w-6 h-6 text-gray-400 mx-auto mb-2" />
                            <p className="text-sm text-gray-500">Aggiungi nuova discussione</p>
                          </div>
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
        </Tabs>
      </div>
    </div>
  );
};

export default OsteoncologiaPage;