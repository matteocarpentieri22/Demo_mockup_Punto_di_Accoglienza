import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";
import { Badge } from "@/shared/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/shared/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/components/ui/tabs";
import { ArrowLeft, Calendar, Users, Clock, CheckCircle, AlertCircle, Download, Plus, Eye, User, Trash2, MessageSquare, Stethoscope } from "lucide-react";
import OncogeriatriaNavbar from "@/oncologico/components/OncogeriatriaNavbar";
import { useNavigate } from "react-router-dom";

const OncogeriatriaPage = () => {
  const navigate = useNavigate();

  // Mock data per occupazione giornaliera
  const [occupazione] = useState([
    { id: 1, ora: "08:30", paziente: "Giuseppe Verdi", cf: "VRDGPP70C03H501W", neoplasia: "Carcinoma prostatico", stadio: "T2N0M0", finalitaTrattamento: "Adiuvante", ecogPs: "1", punteggioG8: "15", esitoVgm: "Fragile", quesitoGeriatra: "Valutazione fragilità e adattamento terapia", medicoReferente: "Dr. Rossi", stato: "Completata", tipo: "visita" },
    { id: 2, ora: "09:30", paziente: "Maria Bianchi", cf: "BNCMRA65D02H501V", neoplasia: "Carcinoma mammario", stadio: "T3N1M0", finalitaTrattamento: "Palliativa", ecogPs: "2", punteggioG8: "12", esitoVgm: "Pre-fragile", quesitoGeriatra: "Gestione sintomi e qualità di vita", medicoReferente: "Dr. Verdi", stato: "In corso", tipo: "visita" },
    { id: 3, ora: "10:30", paziente: "Antonio Rossi", cf: "RSSANT80A01H501U", neoplasia: "Carcinoma polmonare", stadio: "T4N2M1", finalitaTrattamento: "Palliativa", ecogPs: "3", punteggioG8: "8", esitoVgm: "Fragile", quesitoGeriatra: "Valutazione supporto e assistenza", medicoReferente: "Dr. Bianchi", stato: "Programmata", tipo: "visita" },
    { id: 4, ora: "11:30", paziente: "Rosa Ferrari", cf: "FRRRSA75B02H501V", neoplasia: "Carcinoma del colon", stadio: "T2N0M0", finalitaTrattamento: "Adiuvante", ecogPs: "0", punteggioG8: "17", esitoVgm: "Robusto", quesitoGeriatra: "Monitoraggio tossicità chemioterapia", medicoReferente: "Dr. Rossi", stato: "Programmata", tipo: "visita" },
    { id: 5, ora: "14:30", paziente: "Luigi Neri", cf: "NRILGI70C03H501W", neoplasia: "Carcinoma gastrico", stadio: "T1N0M0", finalitaTrattamento: "Neoadiuvante", ecogPs: "1", punteggioG8: "14", esitoVgm: "Pre-fragile", quesitoGeriatra: "Valutazione pre-operatoria", medicoReferente: "Dr. Verdi", stato: "Programmata", tipo: "visita" },
    { id: 6, ora: "15:30", paziente: "Giovanna Romano", cf: "RSSGVN60E05H501Y", neoplasia: "Carcinoma ovarico", stadio: "T3N1M0", finalitaTrattamento: "Palliativa", ecogPs: "2", punteggioG8: "11", esitoVgm: "Fragile", quesitoGeriatra: "Gestione effetti collaterali", medicoReferente: "Dr. Bianchi", stato: "Programmata", tipo: "visita" },
    { id: 7, ora: "16:30", paziente: "Francesco Bianchi", cf: "BNCFRC55F06H501Z", neoplasia: "Sarcoma", stadio: "T2N0M0", finalitaTrattamento: "Adiuvante", ecogPs: "1", punteggioG8: "16", esitoVgm: "Robusto", quesitoGeriatra: "Valutazione cognitiva", medicoReferente: "Dr. Rossi", stato: "Programmata", tipo: "visita" }
  ]);

  // Mock data per pianificazione settimanale
  const [pianificazione] = useState([
    { giorno: "Lunedì", data: "2024-01-22", visite: 6, completate: 5, inCorso: 1, programmate: 0 },
    { giorno: "Martedì", data: "2024-01-23", visite: 7, completate: 4, inCorso: 0, programmate: 3 },
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
      ["Ora", "Paziente", "CF", "Neoplasia", "Stadio", "Finalità", "ECOG PS", "G8", "VGM", "Quesito Geriatra", "Medico Referente", "Stato"],
      ...occupazione.map(visita => [
        visita.ora,
        visita.paziente,
        visita.cf,
        visita.neoplasia,
        visita.stadio,
        visita.finalitaTrattamento,
        visita.ecogPs,
        visita.punteggioG8,
        visita.esitoVgm,
        visita.quesitoGeriatra,
        visita.medicoReferente,
        visita.stato
      ])
    ].map(row => row.join(",")).join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "occupazione_oncogeriatria.csv";
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-background">
      <OncogeriatriaNavbar />
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
              <h1 className="text-3xl font-bold text-gray-900">Oncogeriatria</h1>
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
                                          <span className="font-medium">Neoplasia:</span> {visita.neoplasia}
                                        </div>
                                        <div className="text-gray-700">
                                          <span className="font-medium">Stadio:</span> {visita.stadio}
                                        </div>
                                        <div className="text-gray-700">
                                          <span className="font-medium">Finalità:</span> {visita.finalitaTrattamento}
                                        </div>
                                        <div className="text-gray-700">
                                          <span className="font-medium">ECOG PS:</span> {visita.ecogPs}
                                        </div>
                                        <div className="text-gray-700">
                                          <span className="font-medium">G8:</span> {visita.punteggioG8}
                                        </div>
                                        <div className="text-gray-700">
                                          <span className="font-medium">VGM:</span> {visita.esitoVgm}
                                        </div>
                                        <div className="text-gray-700">
                                          <span className="font-medium">Quesito:</span> {visita.quesitoGeriatra}
                                        </div>
                                        <div className="text-gray-700">
                                          <span className="font-medium">Medico:</span> {visita.medicoReferente}
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
                                  Valutazione geriatrica paziente fragile
                                </h4>
                                <div className="space-y-2">
                                  <div className="text-sm text-gray-600">
                                    <span className="font-medium">Partecipanti:</span>
                                    <div className="flex items-center gap-2 mt-1">
                                      <div className="w-6 h-6 bg-blue-600 text-white text-xs rounded-full flex items-center justify-center">OG</div>
                                      <div className="w-6 h-6 bg-blue-600 text-white text-xs rounded-full flex items-center justify-center">ON</div>
                                      <div className="w-6 h-6 bg-blue-600 text-white text-xs rounded-full flex items-center justify-center">IN</div>
                                    </div>
                                    <div className="text-xs text-gray-500 mt-1">
                                      Dr. Geriatra, Dr. Oncologo, Dr. Infermiere
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
                                  Adattamento terapia per paziente anziano
                                </h4>
                                <div className="space-y-2">
                                  <div className="text-sm text-gray-600">
                                    <span className="font-medium">Partecipanti:</span>
                                    <div className="flex items-center gap-2 mt-1">
                                      <div className="w-6 h-6 bg-blue-600 text-white text-xs rounded-full flex items-center justify-center">OG</div>
                                      <div className="w-6 h-6 bg-blue-600 text-white text-xs rounded-full flex items-center justify-center">FA</div>
                                    </div>
                                    <div className="text-xs text-gray-500 mt-1">
                                      Dr. Geriatra, Dr. Farmacologo
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

export default OncogeriatriaPage;
