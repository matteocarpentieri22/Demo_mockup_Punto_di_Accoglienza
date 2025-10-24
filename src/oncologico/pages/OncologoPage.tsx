import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { Textarea } from "@/shared/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/shared/components/ui/radio-group";
import { Badge } from "@/shared/components/ui/badge";
import { User, FileText, Bell, Calculator, Send, Calendar, Upload } from "lucide-react";
import OncologoNavbar from "@/oncologico/components/OncologoNavbar";
import { useNavigate } from "react-router-dom";

type DemoPatient = { nome: string; cognome: string; dataNascita: string };

const generateRandomPatient = (): DemoPatient => {
  const nomi = ["Mario", "Luca", "Giulia", "Anna", "Francesca", "Paolo", "Sara", "Alessandro", "Chiara", "Davide"];
  const cognomi = ["Rossi", "Bianchi", "Verdi", "Esposito", "Ferrari", "Russo", "Gallo", "Costa", "Fontana", "Greco"];
  const randomFrom = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)];
  const randomDate = () => {
    const start = new Date(1940, 0, 1).getTime();
    const end = new Date(2010, 11, 31).getTime();
    const d = new Date(start + Math.random() * (end - start));
    const dd = String(d.getDate()).padStart(2, '0');
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const yyyy = d.getFullYear();
    return `${dd}/${mm}/${yyyy}`;
  };
  return { nome: randomFrom(nomi), cognome: randomFrom(cognomi), dataNascita: randomDate() };
};

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

const OncologoPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    codiceFiscale: "",
    pdta: "",
    quesitoDiagnostico: "",
    ambulatorio: "",
    score: {
      tosse: "",
      dolore: "",
      comorbidita: ""
    }
  });
  const [impegnativaPDF, setImpegnativaPDF] = useState<File | null>(null);
  const [demoPatient, setDemoPatient] = useState<DemoPatient | null>(null);

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "esito_visita",
      title: "Esito Visita - Mario Rossi",
      message: "Visita oncologica completata. Risultati disponibili.",
      date: "2024-01-20",
      urgent: false,
      letto: false
    },
    {
      id: 2,
      type: "discussione_caso",
      title: "Discussione Caso - Anna Bianchi",
      message: "Paziente inviata all'ambulatorio Cure Simultanee per discussione caso.",
      date: "2024-01-19",
      urgent: true,
      letto: false
    }
  ]);

  // Sincronizza con il localStorage all'avvio
  useEffect(() => {
    const count = localStorage.getItem('unreadNotificationsCount');
    if (count) {
      const unreadCount = parseInt(count);
      // Aggiorna le notifiche per riflettere il conteggio corretto
      setNotifications(prev => {
        const updated = [...prev];
        let currentUnread = updated.filter(n => !n.letto).length;
        
        // Se il conteggio nel localStorage è diverso, aggiorna di conseguenza
        if (currentUnread !== unreadCount) {
          // Marca le notifiche come lette se necessario
          for (let i = 0; i < updated.length && currentUnread > unreadCount; i++) {
            if (!updated[i].letto) {
              updated[i].letto = true;
              currentUnread--;
            }
          }
        }
        
        return updated;
      });
    }
  }, []);

  const ambulatori = [
    "Cure Simultanee",
    "Oncogeriatria", 
    "Osteoncologia"
  ];

  const calculateScore = () => {
    const tosse = parseInt(formData.score.tosse) || 0;
    const dolore = parseInt(formData.score.dolore) || 0;
    const comorbidita = parseInt(formData.score.comorbidita) || 0;
    return tosse + dolore + comorbidita;
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      setImpegnativaPDF(file);
    } else {
      alert("Per favore seleziona un file PDF valido");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const totalScore = calculateScore();
    console.log("Form submitted:", { ...formData, totalScore });
    // Qui andrebbe la logica per inviare la richiesta
    alert(`Richiesta inviata con successo! Score totale: ${totalScore}`);
  };

  useEffect(() => {
    const cf = formData.codiceFiscale.trim();
    if (cf.length === 16) {
      setDemoPatient(generateRandomPatient());
    } else {
      setDemoPatient(null);
    }
  }, [formData.codiceFiscale]);

  return (
    <div className="min-h-screen bg-background">
      <OncologoNavbar />

      <div className="container mx-auto px-4 py-4">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Form di richiesta prenotazione */}
          <div className="lg:col-span-2">
            <Card className="shadow-lg border-0">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-100">
                <CardTitle className="flex items-center gap-3 text-xl">
                  <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                    <FileText className="w-5 h-5 text-white" />
                  </div>
                  Form di Richiesta Prenotazione
                </CardTitle>
                <CardDescription className="text-gray-600 mt-2">
                  Compila il form per richiedere la prenotazione di esami o visite
                </CardDescription>
              </CardHeader>
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Sezione Dati Paziente */}
                  <div className="space-y-6">
                    <div className="flex items-center gap-2 mb-4">
                      <User className="w-5 h-5 text-blue-600" />
                      <h3 className="text-lg font-semibold text-gray-800">Dati Paziente</h3>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <Label htmlFor="codiceFiscale" className="text-sm font-medium text-gray-700">
                          Codice Fiscale del Paziente *
                        </Label>
                        <Input
                          id="codiceFiscale"
                          placeholder="RSSMRA80A01H501U"
                          value={formData.codiceFiscale}
                          onChange={(e) => setFormData({...formData, codiceFiscale: e.target.value})}
                          className="h-11 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                          required
                        />
                        {demoPatient && (
                          <div className="p-4 rounded-lg border border-blue-200 bg-blue-50/50">
                            <div className="grid sm:grid-cols-3 gap-3 text-sm">
                              <div>
                                <div className="text-gray-500">Nome</div>
                                <div className="font-semibold text-gray-800">{demoPatient.nome}</div>
                              </div>
                              <div>
                                <div className="text-gray-500">Cognome</div>
                                <div className="font-semibold text-gray-800">{demoPatient.cognome}</div>
                              </div>
                              <div>
                                <div className="text-gray-500">Data di nascita</div>
                                <div className="font-semibold text-gray-800">{demoPatient.dataNascita}</div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="space-y-3">
                        <Label htmlFor="pdta" className="text-sm font-medium text-gray-700">
                          Patologia di Riferimento *
                        </Label>
                        <Select value={formData.pdta} onValueChange={(value) => setFormData({...formData, pdta: value})}>
                          <SelectTrigger className="h-11 border-gray-300 focus:border-blue-500 focus:ring-blue-500">
                            <SelectValue placeholder="Seleziona Patologia" />
                          </SelectTrigger>
                          <SelectContent>
                            {PDTA_LIST.map((pdta) => (
                              <SelectItem key={pdta} value={pdta}>{pdta}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <Label htmlFor="quesitoDiagnostico" className="text-sm font-medium text-gray-700">
                        Quesito Diagnostico *
                      </Label>
                      <Textarea
                        id="quesitoDiagnostico"
                        placeholder="Descrivi il quesito diagnostico..."
                        value={formData.quesitoDiagnostico}
                        onChange={(e) => setFormData({...formData, quesitoDiagnostico: e.target.value})}
                        className="border-gray-300 focus:border-blue-500 focus:ring-blue-500 resize-none"
                        rows={4}
                        required
                      />
                    </div>
                  </div>

                  {/* Sezione Prenotazione */}
                  <div className="space-y-6">
                    <div className="flex items-center gap-2 mb-4">
                      <Calendar className="w-5 h-5 text-green-600" />
                      <h3 className="text-lg font-semibold text-gray-800">Dettagli Prenotazione</h3>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <Label htmlFor="ambulatorio" className="text-sm font-medium text-gray-700">
                          Ambulatorio *
                        </Label>
                        <Select value={formData.ambulatorio} onValueChange={(value) => setFormData({...formData, ambulatorio: value})}>
                          <SelectTrigger className="h-11 border-gray-300 focus:border-blue-500 focus:ring-blue-500">
                            <SelectValue placeholder="Seleziona ambulatorio" />
                          </SelectTrigger>
                          <SelectContent>
                            {ambulatori.map((amb) => (
                              <SelectItem key={amb} value={amb}>{amb}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-3">
                        <Label htmlFor="impegnativa-pdf" className="text-sm font-medium text-gray-700">
                          Allegare PDF Impegnativa
                        </Label>
                        <div className="space-y-2">
                          <input
                            type="file"
                            id="impegnativa-pdf"
                            accept=".pdf"
                            onChange={handleFileUpload}
                            className="hidden"
                          />
                          <div className="flex items-center gap-2">
                            <Button
                              type="button"
                              variant="outline"
                              onClick={() => document.getElementById('impegnativa-pdf')?.click()}
                              className="flex items-center gap-2 h-11 border-gray-300 hover:border-blue-500 hover:ring-blue-500"
                            >
                              <Upload className="w-4 h-4" />
                              Seleziona PDF
                            </Button>
                            {impegnativaPDF && (
                              <span className="text-sm text-green-600 flex items-center gap-1">
                                <FileText className="w-4 h-4" />
                                {impegnativaPDF.name}
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-gray-500">
                            Seleziona il file PDF dell'impegnativa del paziente
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Medico richiedente - autocompilato */}
                  <div className="space-y-3">
                    <Label className="text-sm font-medium text-gray-700">
                      Medico Richiedente / Specialista Compilatore
                    </Label>
                    <div className="p-4 bg-gradient-to-r from-gray-50 to-blue-50 rounded-lg border border-gray-200">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                            <User className="w-4 h-4 text-blue-600" />
                          </div>
                          <span className="font-medium text-gray-800">Dr. Carlo Bianchi - Oncologo</span>
                        </div>
                        <Badge variant="secondary" className="bg-blue-100 text-blue-800 border-blue-200">
                          Autocompilato
                        </Badge>
                      </div>
                    </div>
                  </div>

                  {/* Valutazione score clinico */}
                  <div className="space-y-6">
                    <div className="flex items-center gap-2 mb-4">
                      <Calculator className="w-5 h-5 text-purple-600" />
                      <h3 className="text-lg font-semibold text-gray-800">Valutazione Score Clinico</h3>
                    </div>
                    
                    <div className="grid md:grid-cols-3 gap-6">
                      {/* Tosse */}
                      <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                        <Label className="text-sm font-medium text-gray-700">Tosse</Label>
                        <RadioGroup
                          value={formData.score.tosse}
                          onValueChange={(value) => setFormData({
                            ...formData, 
                            score: {...formData.score, tosse: value}
                          })}
                          className="space-y-3"
                        >
                          <div className="flex items-center space-x-3 p-2 hover:bg-white rounded-md transition-colors">
                            <RadioGroupItem value="3" id="tosse-3" className="text-blue-600" />
                            <Label htmlFor="tosse-3" className="text-sm font-medium cursor-pointer">3 - Grave</Label>
                          </div>
                          <div className="flex items-center space-x-3 p-2 hover:bg-white rounded-md transition-colors">
                            <RadioGroupItem value="2" id="tosse-2" className="text-blue-600" />
                            <Label htmlFor="tosse-2" className="text-sm font-medium cursor-pointer">2 - Moderata</Label>
                          </div>
                          <div className="flex items-center space-x-3 p-2 hover:bg-white rounded-md transition-colors">
                            <RadioGroupItem value="1" id="tosse-1" className="text-blue-600" />
                            <Label htmlFor="tosse-1" className="text-sm font-medium cursor-pointer">1 - Lieve</Label>
                          </div>
                        </RadioGroup>
                      </div>

                      {/* Dolore */}
                      <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                        <Label className="text-sm font-medium text-gray-700">Dolore</Label>
                        <RadioGroup
                          value={formData.score.dolore}
                          onValueChange={(value) => setFormData({
                            ...formData, 
                            score: {...formData.score, dolore: value}
                          })}
                          className="space-y-3"
                        >
                          <div className="flex items-center space-x-3 p-2 hover:bg-white rounded-md transition-colors">
                            <RadioGroupItem value="3" id="dolore-3" className="text-blue-600" />
                            <Label htmlFor="dolore-3" className="text-sm font-medium cursor-pointer">3 - Intenso</Label>
                          </div>
                          <div className="flex items-center space-x-3 p-2 hover:bg-white rounded-md transition-colors">
                            <RadioGroupItem value="2" id="dolore-2" className="text-blue-600" />
                            <Label htmlFor="dolore-2" className="text-sm font-medium cursor-pointer">2 - Moderato</Label>
                          </div>
                          <div className="flex items-center space-x-3 p-2 hover:bg-white rounded-md transition-colors">
                            <RadioGroupItem value="1" id="dolore-1" className="text-blue-600" />
                            <Label htmlFor="dolore-1" className="text-sm font-medium cursor-pointer">1 - Lieve</Label>
                          </div>
                        </RadioGroup>
                      </div>

                      {/* Comorbidità */}
                      <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                        <Label className="text-sm font-medium text-gray-700">Comorbidità</Label>
                        <RadioGroup
                          value={formData.score.comorbidita}
                          onValueChange={(value) => setFormData({
                            ...formData, 
                            score: {...formData.score, comorbidita: value}
                          })}
                          className="space-y-3"
                        >
                          <div className="flex items-center space-x-3 p-2 hover:bg-white rounded-md transition-colors">
                            <RadioGroupItem value="3" id="comorbidita-3" className="text-blue-600" />
                            <Label htmlFor="comorbidita-3" className="text-sm font-medium cursor-pointer">3 - Multiple</Label>
                          </div>
                          <div className="flex items-center space-x-3 p-2 hover:bg-white rounded-md transition-colors">
                            <RadioGroupItem value="2" id="comorbidita-2" className="text-blue-600" />
                            <Label htmlFor="comorbidita-2" className="text-sm font-medium cursor-pointer">2 - Moderate</Label>
                          </div>
                          <div className="flex items-center space-x-3 p-2 hover:bg-white rounded-md transition-colors">
                            <RadioGroupItem value="1" id="comorbidita-1" className="text-blue-600" />
                            <Label htmlFor="comorbidita-1" className="text-sm font-medium cursor-pointer">1 - Lieve</Label>
                          </div>
                        </RadioGroup>
                      </div>
                    </div>

                    {/* Score totale */}
                    <div className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                            <Calculator className="w-5 h-5 text-white" />
                          </div>
                          <span className="text-lg font-semibold text-gray-800">Punteggio Totale</span>
                        </div>
                        <Badge variant="outline" className="text-xl px-4 py-2 bg-white border-blue-300 text-blue-700 font-bold">
                          {calculateScore()}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4">
                    <Button type="submit" className="w-full h-12 text-lg font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg">
                      <Send className="w-5 h-5 mr-2" />
                      Invia Richiesta Prenotazione
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Notifiche */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="w-5 h-5" />
                  Notifiche non lette
                </CardTitle>
                <CardDescription>
                  Esiti visite e discussioni pazienti
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {notifications.filter(n => !n.letto).map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-3 rounded-lg border ${
                        notification.urgent ? 'border-red-200 bg-red-50' : 'border-gray-200 bg-white'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-medium text-sm">{notification.title}</h4>
                          <p className="text-xs text-muted-foreground mt-1">
                            {notification.message}
                          </p>
                          <p className="text-xs text-muted-foreground mt-2">
                            {notification.date}
                          </p>
                        </div>
                        {notification.urgent && (
                          <Badge variant="destructive" className="text-xs">
                            Urgente
                          </Badge>
                        )}
                      </div>
                    </div>
                  ))}
                  
                  {notifications.filter(n => !n.letto).length === 0 && (
                    <div className="text-center py-4">
                      <p className="text-sm text-muted-foreground">Nessuna notifica non letta</p>
                    </div>
                  )}
                </div>
                
                <Button 
                  variant="outline" 
                  className="w-full mt-4"
                  onClick={() => navigate('/oncologico/oncologo/notifiche')}
                >
                  Visualizza Tutte le Notifiche
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OncologoPage;
