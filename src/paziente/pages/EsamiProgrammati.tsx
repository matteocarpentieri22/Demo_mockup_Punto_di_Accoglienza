import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";
import { Badge } from "@/shared/components/ui/badge";
import { ArrowLeft, Calendar, Clock, MapPin, Phone, Mail, AlertCircle, CheckCircle, Info, Download } from "lucide-react";
import PazienteNavbar from "@/paziente/components/PazienteNavbar";

// Mock data per esami programmati dettagliati
const detailedExams = [
  {
    id: 1,
    tipo: "TAC Torace con Contrasto",
    data: "20/02/2025",
    ora: "10:30",
    durata: "30 minuti",
    luogo: "IOV - Radiologia",
    indirizzo: "Via Gattamelata 64, 35128 Padova",
    piano: "Piano Terra",
    stanza: "Sala TAC 1",
    preparazione: [
      "Digiuno da 6 ore prima dell'esame",
      "Sospendere farmaci diabetici se prescritti",
      "Portare esami precedenti",
      "Arrivare 15 minuti prima dell'orario"
    ],
    controindicazioni: [
      "Allergia al mezzo di contrasto iodato",
      "Insufficienza renale grave",
      "Gravidanza"
    ],
    note: "Portare esami precedenti e lista farmaci",
    stato: "confermato",
    confermatoIl: "15/01/2025",
    medicoPrescrittore: "Dr. Bianchi",
    tecnicoResponsabile: "Sig.ra Rossi",
    telefono: "049 8211111",
    email: "radiologia@iov.veneto.it"
  },
  {
    id: 2,
    tipo: "PET-CT Total Body",
    data: "25/02/2025",
    ora: "14:00",
    durata: "2 ore",
    luogo: "IOV - Medicina Nucleare",
    indirizzo: "Via Gattamelata 64, 35128 Padova",
    piano: "Piano Interrato",
    stanza: "Sala PET-CT",
    preparazione: [
      "Digiuno da 12 ore prima dell'esame",
      "Dieta povera di carboidrati per 24 ore",
      "Evitare attività fisica intensa",
      "Arrivare 30 minuti prima dell'orario",
      "Portare documenti di identità"
    ],
    controindicazioni: [
      "Gravidanza",
      "Allattamento",
      "Diabete non controllato"
    ],
    note: "L'esame richiede iniezione di tracciante radioattivo",
    stato: "confermato",
    confermatoIl: "15/01/2025",
    medicoPrescrittore: "Dr. Bianchi",
    tecnicoResponsabile: "Dr. Verdi",
    telefono: "049 8212222",
    email: "medicinanucleare@iov.veneto.it"
  },
  {
    id: 3,
    tipo: "Visita Oncologica di Controllo",
    data: "28/02/2025",
    ora: "09:15",
    durata: "45 minuti",
    luogo: "IOV - Ambulatorio Oncologico",
    indirizzo: "Via Gattamelata 64, 35128 Padova",
    piano: "Primo Piano",
    stanza: "Ambulatorio 15",
    preparazione: [
      "Portare tutti gli esami recenti",
      "Lista aggiornata dei farmaci",
      "Arrivare 10 minuti prima dell'orario"
    ],
    controindicazioni: [],
    note: "Visita di controllo post-trattamento",
    stato: "confermato",
    confermatoIl: "15/01/2025",
    medicoPrescrittore: "Dr. Bianchi",
    tecnicoResponsabile: "Dr.ssa Neri",
    telefono: "049 8213333",
    email: "oncologia@iov.veneto.it"
  }
];

const EsamiProgrammati = () => {
  const getStatusBadge = (stato: string) => {
    switch (stato) {
      case "confermato":
        return <Badge variant="default" className="bg-green-100 text-green-800">Confermato</Badge>;
      case "da_confermare":
        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">Da Confermare</Badge>;
      case "cancellato":
        return <Badge variant="destructive" className="bg-red-100 text-red-800">Cancellato</Badge>;
      default:
        return <Badge variant="secondary">Sconosciuto</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <PazienteNavbar />

      <div className="container mx-auto px-4 py-8 flex-1">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <Button variant="ghost" size="sm" onClick={() => window.location.href = '/paziente/informazioni'}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Torna alle Informazioni
            </Button>
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Esami Programmati
          </h1>
          <p className="text-gray-600">
            Dettagli completi sui tuoi prossimi esami e appuntamenti
          </p>
        </div>

        <div className="space-y-6">
          {detailedExams.map((exam) => (
            <Card key={exam.id} className="overflow-hidden">
              <CardHeader className="bg-muted/50">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-xl">{exam.tipo}</CardTitle>
                    <CardDescription>
                      {exam.luogo} • {exam.data} alle {exam.ora}
                    </CardDescription>
                  </div>
                  <div className="text-right">
                    {getStatusBadge(exam.stato)}
                    <p className="text-sm text-muted-foreground mt-1">
                      Confermato il {exam.confermatoIl}
                    </p>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="p-6">
                <div className="grid lg:grid-cols-2 gap-6">
                  {/* Informazioni Generali */}
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold mb-3 flex items-center gap-2">
                        <Calendar className="w-5 h-5" />
                        Informazioni Generali
                      </h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-muted-foreground" />
                          <span><strong>Durata:</strong> {exam.durata}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-muted-foreground" />
                          <span><strong>Indirizzo:</strong> {exam.indirizzo}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-muted-foreground" />
                          <span><strong>Posizione:</strong> {exam.piano} - {exam.stanza}</span>
                        </div>
                      </div>
                    </div>

                    {/* Preparazione */}
                    <div>
                      <h3 className="font-semibold mb-3 flex items-center gap-2">
                        <AlertCircle className="w-5 h-5" />
                        Preparazione
                      </h3>
                      <ul className="space-y-1 text-sm">
                        {exam.preparazione.map((prep, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                            <span>{prep}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Controindicazioni */}
                    {exam.controindicazioni.length > 0 && (
                      <div>
                        <h3 className="font-semibold mb-3 flex items-center gap-2">
                          <AlertCircle className="w-5 h-5 text-red-600" />
                          Controindicazioni
                        </h3>
                        <ul className="space-y-1 text-sm">
                          {exam.controindicazioni.map((contraind, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <AlertCircle className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                              <span>{contraind}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  {/* Contatti e Note */}
                  <div className="space-y-4">
                    {/* Contatti */}
                    <div>
                      <h3 className="font-semibold mb-3 flex items-center gap-2">
                        <Phone className="w-5 h-5" />
                        Contatti
                      </h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                          <Phone className="w-4 h-4 text-muted-foreground" />
                          <span><strong>Telefono:</strong> {exam.telefono}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Mail className="w-4 h-4 text-muted-foreground" />
                          <span><strong>Email:</strong> {exam.email}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Info className="w-4 h-4 text-muted-foreground" />
                          <span><strong>Medico:</strong> {exam.medicoPrescrittore}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Info className="w-4 h-4 text-muted-foreground" />
                          <span><strong>Responsabile:</strong> {exam.tecnicoResponsabile}</span>
                        </div>
                      </div>
                    </div>

                    {/* Note */}
                    {exam.note && (
                      <div>
                        <h3 className="font-semibold mb-3 flex items-center gap-2">
                          <Info className="w-5 h-5" />
                          Note Importanti
                        </h3>
                        <div className="p-3 bg-blue-50 rounded-lg border-l-4 border-blue-400">
                          <p className="text-sm text-blue-800">{exam.note}</p>
                        </div>
                      </div>
                    )}

                    {/* Azioni */}
                    <div className="space-y-2">
                      <Button className="w-full" variant="outline">
                        <Phone className="w-4 h-4 mr-2" />
                        Chiama per Informazioni
                      </Button>
                      <Button className="w-full" variant="outline">
                        <Download className="w-4 h-4 mr-2" />
                        Scarica Promemoria
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Informazioni Generali */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Info className="w-5 h-5" />
              Informazioni Generali
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-2">Come Arrivare all'IOV</h4>
                <div className="space-y-1 text-sm text-muted-foreground">
                  <p><strong>Indirizzo:</strong> Via Gattamelata 64, 35128 Padova</p>
                  <p><strong>Parcheggio:</strong> Disponibile nel parcheggio interno</p>
                  <p><strong>Trasporti:</strong> Autobus linea 3, 5, 8, 12</p>
                  <p><strong>Metro:</strong> Fermata "IOV" (linea M1)</p>
                </div>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Contatti Generali</h4>
                <div className="space-y-1 text-sm text-muted-foreground">
                  <p><strong>Centralino:</strong> 049 8211111</p>
                  <p><strong>Informazioni Pazienti:</strong> 049 8212222</p>
                  <p><strong>Email:</strong> info@iov.veneto.it</p>
                  <p><strong>Orari:</strong> Lun-Ven 8:00-18:00</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Footer */}
      <footer className="border-t bg-card">
        <div className="container mx-auto px-4 py-8 text-center text-sm text-muted-foreground">
          <p>© 2025 Istituto Oncologico Veneto - Tutti i diritti riservati</p>
          <p className="mt-2">Sistema demo per pazienti</p>
        </div>
      </footer>
    </div>
  );
};

export default EsamiProgrammati;
