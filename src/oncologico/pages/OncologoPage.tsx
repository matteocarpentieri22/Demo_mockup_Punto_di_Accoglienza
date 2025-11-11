import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { Textarea } from "@/shared/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/shared/components/ui/radio-group";
import { Checkbox } from "@/shared/components/ui/checkbox";
import { Badge } from "@/shared/components/ui/badge";
import { User, FileText, Bell, Calculator, Send, Calendar, Upload } from "lucide-react";
import OncologoNavbar from "@/oncologico/components/layout/OncologoNavbar";
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
    // Campi specifici per Osteoncologia
    uoRiferimento: "",
    altroUo: "",
    sopravvivenzaOsteo: "",
    quesitoTeam: "",
    richiestaPer: [] as string[],
    // Campi specifici per Oncogeriatria
    stadio: "",
    finalitaTrattamento: "",
    ecogPS: "",
    punteggioG8: "",
    esitoVGM: "",
    propostaTerapeutica: "",
    prognosiOncologica: "",
    finalitaTerapiaOncologica: [] as string[],
    tossicitaEmatologica: "",
    tossicitaExtraEmatologica: "",
    quesitiGeriatra: [] as string[],
    altroQuesitoGeriatra: "",
    outputValutazioneGeriatrica: {
      programmaAttuabile: false,
      presaInCaricoGeriatrica: false,
      tempisticaGeriatrica: "",
      presaInCaricoAltroSpecialista: false,
      altroSpecialista: "",
      rischioCognitiveImpairment: "",
      demenzaAltro: "",
      revisionePolifarmacoterapia: false,
      tipoRevisione: "",
      serviziDomiciliari: false,
      altroOutput: ""
    },
    score: {
      // Campi per Cure Simultanee
      psKarnofsky: "",
      sintomi: [] as string[],
      sopravvivenza: "",
      trattamenti: "",
      tossicita: "" as string,
      problemiSocio: "" as string,
      // Campi per Osteoncologia
      psOsteo: "",
      segniSintomi: "",
      metastasiViscerali: "",
      nMetastasiVertebrali: "",
      sedeMalattiaPrimitiva: "",
      compressioneMidollare: false,
      fratturaPatologica: false,
      // Vecchi campi da rimuovere
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
      letto: false,
      archiviata: false
    },
    {
      id: 2,
      type: "discussione_caso",
      title: "Discussione Caso - Anna Bianchi",
      message: "Paziente inviata all'ambulatorio Cure Simultanee per discussione caso.",
      date: "2024-01-19",
      urgent: true,
      letto: false,
      archiviata: false
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
    if (formData.ambulatorio === "Cure Simultanee") {
      // Score per Cure Simultanee
      let total = 0;
      
      // PS (Karnofsky)
      const psValue = formData.score.psKarnofsky === "50-60" ? 4 : 0;
      total += psValue;
      
      // Sintomi (multi-select)
      total += formData.score.sintomi.length;
      if (formData.score.sintomi.includes("Dolore")) total += 1; // Dolore aggiunge 1 punto extra
      
      // Sopravvivenza stimata
      if (formData.score.sopravvivenza === "6-12 mesi") total += 1;
      if (formData.score.sopravvivenza === "≤ 6 mesi") total += 2;
      
      // Trattamenti
      if (formData.score.trattamenti === "No") total += 2;
      
      // Tossicità
      if (formData.score.tossicita !== "Nessuna" && formData.score.tossicita) total += 1;
      
      // Problemi socio-assistenziali
      if (formData.score.problemiSocio === "Inadeguato supporto") total += 2;
      if (formData.score.problemiSocio === "Rete famigliare scarsa") total += 1;
      if (formData.score.problemiSocio === "Limitazioni assistenziali") total += 1;
      
      return total;
    } else if (formData.ambulatorio === "Osteoncologia") {
      // Score per Osteoncologia
      let total = 0;
      
      // PS (Karnofsky)
      if (formData.score.psOsteo === "100-90") total += 0;
      else if (formData.score.psOsteo === "80") total += 1;
      else if (formData.score.psOsteo === "≤ 70") total += 2;
      
      // Segni e Sintomi
      if (formData.score.segniSintomi === "Nessuno") total += 0;
      else if (formData.score.segniSintomi === "Dolore scheletrico") total += 2;
      else if (formData.score.segniSintomi === "Sintomi da compressione") total += 3;
      
      // Presenza di metastasi viscerali
      if (formData.score.metastasiViscerali === "Nessuna viscerale") total += 0;
      else if (formData.score.metastasiViscerali === "Oligometastasi viscerali") total += 1;
      else if (formData.score.metastasiViscerali === "Multiple lesioni viscerali") total += 2;
      
      // N. metastasi vertebrali
      if (formData.score.nMetastasiVertebrali === "0-1") total += 0;
      else if (formData.score.nMetastasiVertebrali === "2") total += 1;
      else if (formData.score.nMetastasiVertebrali === "≥ 3") total += 2;
      
      // Sede malattia primitiva
      if (formData.score.sedeMalattiaPrimitiva === "Prostata, mammella, tiroide, ematologica") total += 1;
      else if (formData.score.sedeMalattiaPrimitiva === "Rene, colon, retto, ginecologici") total += 2;
      else if (formData.score.sedeMalattiaPrimitiva === "Altre sedi") total += 3;
      else if (formData.score.sedeMalattiaPrimitiva === "Vie biliari, fegato, polmone, stomaco, esofago, CUP") total += 4;
      
      return total;
    } else if (formData.ambulatorio === "Oncogeriatria") {
      // Oncogeriatria non ha score
      return 0;
    } else {
      // Vecchio calcolo per altri ambulatori
      const tosse = parseInt(formData.score.tosse) || 0;
      const dolore = parseInt(formData.score.dolore) || 0;
      const comorbidita = parseInt(formData.score.comorbidita) || 0;
      return tosse + dolore + comorbidita;
    }
  };

  const getUrgenzaLevel = () => {
    if (formData.ambulatorio !== "Osteoncologia") return null;
    
    // Situazioni urgenti
    if (formData.score.compressioneMidollare || formData.score.fratturaPatologica) {
      return { level: "URG", message: "Primo ambulatorio utile (intanto contattare ortopedico e/o RT per valutazione urgente del paziente)" };
    }
    
    const totalScore = calculateScore();
    if (totalScore >= 10) {
      return { level: "≥ 10", message: "Programmazione entro 10 giorni" };
    } else if (totalScore >= 6) {
      return { level: "6-9", message: "Programmazione entro 20 giorni" };
    } else if (totalScore >= 1) {
      return { level: "1-5", message: "Programmazione entro 30 giorni" };
    }
    return { level: "0", message: "Punteggio non valido" };
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
                    
                    {/* Ambulatorio - PRIMISSIMO CAMPO */}
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
                      <p className="text-xs text-gray-500">
                        Seleziona l'ambulatorio per visualizzare i campi specifici
                      </p>
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

                  {/* Campi specifici per Osteoncologia */}
                  {formData.ambulatorio === "Osteoncologia" && (
                    <div className="space-y-6">
                      <div className="flex items-center gap-2 mb-4">
                        <FileText className="w-5 h-5 text-orange-600" />
                        <h3 className="text-lg font-semibold text-gray-800">Dettagli Osteoncologia</h3>
                      </div>

                      <div className="space-y-3">
                        <Label htmlFor="uoRiferimento" className="text-sm font-medium text-gray-700">
                          U.O. di riferimento *
                        </Label>
                        <Select 
                          value={formData.uoRiferimento} 
                          onValueChange={(value) => setFormData({...formData, uoRiferimento: value})}
                        >
                          <SelectTrigger className="h-11 border-gray-300 focus:border-blue-500 focus:ring-blue-500">
                            <SelectValue placeholder="Seleziona U.O. di riferimento" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="UOC Oncologia 1">UOC Oncologia 1</SelectItem>
                            <SelectItem value="UOC Oncologia 2">UOC Oncologia 2</SelectItem>
                            <SelectItem value="UOC Oncologia 3">UOC Oncologia 3</SelectItem>
                            <SelectItem value="Radioterapia">Radioterapia</SelectItem>
                            <SelectItem value="Unità Tumori Ereditari">Unità Tumori Ereditari</SelectItem>
                            <SelectItem value="Altro">Altro</SelectItem>
                          </SelectContent>
                        </Select>
                        {formData.uoRiferimento === "Altro" && (
                          <Input
                            placeholder="Specifica altra U.O."
                            value={formData.altroUo}
                            onChange={(e) => setFormData({...formData, altroUo: e.target.value})}
                            className="h-11 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                          />
                        )}
                      </div>

                      <div className="space-y-3">
                        <Label className="text-sm font-medium text-gray-700">
                          Sopravvivenza stimata *
                        </Label>
                        <RadioGroup
                          value={formData.sopravvivenzaOsteo}
                          onValueChange={(value) => setFormData({...formData, sopravvivenzaOsteo: value})}
                          className="space-y-3"
                        >
                          <div className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-md transition-colors">
                            <RadioGroupItem value="≥12 mesi" id="surv-osteo1" className="text-blue-600" />
                            <Label htmlFor="surv-osteo1" className="text-sm font-medium cursor-pointer">≥12 mesi</Label>
                          </div>
                          <div className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-md transition-colors">
                            <RadioGroupItem value="6-12 mesi" id="surv-osteo2" className="text-blue-600" />
                            <Label htmlFor="surv-osteo2" className="text-sm font-medium cursor-pointer">6-12 mesi</Label>
                          </div>
                          <div className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-md transition-colors">
                            <RadioGroupItem value="< 6 mesi" id="surv-osteo3" className="text-blue-600" />
                            <Label htmlFor="surv-osteo3" className="text-sm font-medium cursor-pointer">&lt; 6 mesi</Label>
                          </div>
                        </RadioGroup>
                      </div>

                      <div className="space-y-3">
                        <Label htmlFor="quesitoTeam" className="text-sm font-medium text-gray-700">
                          Quesito al team multidisciplinare
                        </Label>
                        <Textarea
                          id="quesitoTeam"
                          placeholder="Inserisci il quesito al team multidisciplinare..."
                          value={formData.quesitoTeam}
                          onChange={(e) => setFormData({...formData, quesitoTeam: e.target.value})}
                          className="border-gray-300 focus:border-blue-500 focus:ring-blue-500 resize-none"
                          rows={4}
                        />
                      </div>

                      <div className="space-y-3">
                        <Label className="text-sm font-medium text-gray-700">
                          Richiesta per *
                        </Label>
                        <div className="space-y-2">
                          {["visita", "discussione"].map((tipo) => (
                            <div key={tipo} className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-md transition-colors">
                              <Checkbox
                                checked={formData.richiestaPer.includes(tipo)}
                                onCheckedChange={(checked) => {
                                  if (checked) {
                                    setFormData({
                                      ...formData,
                                      richiestaPer: [...formData.richiestaPer, tipo]
                                    });
                                  } else {
                                    setFormData({
                                      ...formData,
                                      richiestaPer: formData.richiestaPer.filter(r => r !== tipo)
                                    });
                                  }
                                }}
                                id={`richiesta-${tipo}`}
                              />
                              <Label htmlFor={`richiesta-${tipo}`} className="text-sm font-medium cursor-pointer capitalize">
                                {tipo}
                              </Label>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Campi specifici per Oncogeriatria */}
                  {formData.ambulatorio === "Oncogeriatria" && (
                    <div className="space-y-6">
                      <div className="flex items-center gap-2 mb-4">
                        <FileText className="w-5 h-5 text-green-600" />
                        <h3 className="text-lg font-semibold text-gray-800">Dettagli Oncogeriatria</h3>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                          <Label className="text-sm font-medium text-gray-700">Stadio *</Label>
                          <RadioGroup
                            value={formData.stadio}
                            onValueChange={(value) => setFormData({...formData, stadio: value})}
                            className="space-y-3"
                          >
                            <div className="flex items-center space-x-3 p-2 hover:bg-white rounded-md transition-colors">
                              <RadioGroupItem value="radicalmente operato" id="stadio1" className="text-blue-600" />
                              <Label htmlFor="stadio1" className="text-sm font-medium cursor-pointer">Radicalmente operato</Label>
                            </div>
                            <div className="flex items-center space-x-3 p-2 hover:bg-white rounded-md transition-colors">
                              <RadioGroupItem value="localmente avanzato" id="stadio2" className="text-blue-600" />
                              <Label htmlFor="stadio2" className="text-sm font-medium cursor-pointer">Localmente avanzato</Label>
                            </div>
                            <div className="flex items-center space-x-3 p-2 hover:bg-white rounded-md transition-colors">
                              <RadioGroupItem value="avanzato/metastatico" id="stadio3" className="text-blue-600" />
                              <Label htmlFor="stadio3" className="text-sm font-medium cursor-pointer">Avanzato/Metastatico</Label>
                            </div>
                          </RadioGroup>
                        </div>

                        <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                          <Label className="text-sm font-medium text-gray-700">Finalità del trattamento *</Label>
                          <RadioGroup
                            value={formData.finalitaTrattamento}
                            onValueChange={(value) => setFormData({...formData, finalitaTrattamento: value})}
                            className="space-y-3"
                          >
                            <div className="flex items-center space-x-3 p-2 hover:bg-white rounded-md transition-colors">
                              <RadioGroupItem value="(neo) adiuvante" id="finalita1" className="text-blue-600" />
                              <Label htmlFor="finalita1" className="text-sm font-medium cursor-pointer">(Neo) Adiuvante</Label>
                            </div>
                            <div className="flex items-center space-x-3 p-2 hover:bg-white rounded-md transition-colors">
                              <RadioGroupItem value="curativo" id="finalita2" className="text-blue-600" />
                              <Label htmlFor="finalita2" className="text-sm font-medium cursor-pointer">Curativo</Label>
                            </div>
                            <div className="flex items-center space-x-3 p-2 hover:bg-white rounded-md transition-colors">
                              <RadioGroupItem value="pallativo" id="finalita3" className="text-blue-600" />
                              <Label htmlFor="finalita3" className="text-sm font-medium cursor-pointer">Pallativo</Label>
                            </div>
                          </RadioGroup>
                        </div>

                        <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                          <Label htmlFor="ecogPS" className="text-sm font-medium text-gray-700">
                            ECOG PS *
                          </Label>
                          <Input
                            id="ecogPS"
                            type="number"
                            placeholder="Inserisci ECOG PS"
                            value={formData.ecogPS}
                            onChange={(e) => setFormData({...formData, ecogPS: e.target.value})}
                            className="h-11 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                          />
                        </div>

                        <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                          <Label htmlFor="punteggioG8" className="text-sm font-medium text-gray-700">
                            Punteggio G8 *
                          </Label>
                          <Input
                            id="punteggioG8"
                            type="number"
                            placeholder="Inserisci Punteggio G8"
                            value={formData.punteggioG8}
                            onChange={(e) => setFormData({...formData, punteggioG8: e.target.value})}
                            className="h-11 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                          />
                        </div>

                        <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                          <Label className="text-sm font-medium text-gray-700">Esito VGM *</Label>
                          <RadioGroup
                            value={formData.esitoVGM}
                            onValueChange={(value) => setFormData({...formData, esitoVGM: value})}
                            className="space-y-3"
                          >
                            <div className="flex items-center space-x-3 p-2 hover:bg-white rounded-md transition-colors">
                              <RadioGroupItem value="fragile" id="vgm1" className="text-blue-600" />
                              <Label htmlFor="vgm1" className="text-sm font-medium cursor-pointer">Fragile</Label>
                            </div>
                            <div className="flex items-center space-x-3 p-2 hover:bg-white rounded-md transition-colors">
                              <RadioGroupItem value="vulnerabile" id="vgm2" className="text-blue-600" />
                              <Label htmlFor="vgm2" className="text-sm font-medium cursor-pointer">Vulnerabile</Label>
                            </div>
                            <div className="flex items-center space-x-3 p-2 hover:bg-white rounded-md transition-colors">
                              <RadioGroupItem value="fit" id="vgm3" className="text-blue-600" />
                              <Label htmlFor="vgm3" className="text-sm font-medium cursor-pointer">Fit</Label>
                            </div>
                          </RadioGroup>
                        </div>

                        <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                          <Label className="text-sm font-medium text-gray-700">Proposta terapeutica *</Label>
                          <RadioGroup
                            value={formData.propostaTerapeutica}
                            onValueChange={(value) => setFormData({...formData, propostaTerapeutica: value})}
                            className="space-y-3"
                          >
                            <div className="flex items-center space-x-3 p-2 hover:bg-white rounded-md transition-colors">
                              <RadioGroupItem value="terapia standard - dosi standard" id="prop1" className="text-blue-600" />
                              <Label htmlFor="prop1" className="text-sm font-medium cursor-pointer">Terapia standard - dosi standard</Label>
                            </div>
                            <div className="flex items-center space-x-3 p-2 hover:bg-white rounded-md transition-colors">
                              <RadioGroupItem value="terapia standard - dosi ridotte (eventualmente da aumentare)" id="prop2" className="text-blue-600" />
                              <Label htmlFor="prop2" className="text-sm font-medium cursor-pointer">Terapia standard - dosi ridotte (eventualmente da aumentare)</Label>
                            </div>
                            <div className="flex items-center space-x-3 p-2 hover:bg-white rounded-md transition-colors">
                              <RadioGroupItem value="terapia standard - dosi ridotte (non previsto aumento dosi)" id="prop3" className="text-blue-600" />
                              <Label htmlFor="prop3" className="text-sm font-medium cursor-pointer">Terapia standard - dosi ridotte (non previsto aumento dosi)</Label>
                            </div>
                            <div className="flex items-center space-x-3 p-2 hover:bg-white rounded-md transition-colors">
                              <RadioGroupItem value="nessuna terapia" id="prop4" className="text-blue-600" />
                              <Label htmlFor="prop4" className="text-sm font-medium cursor-pointer">Nessuna terapia</Label>
                            </div>
                          </RadioGroup>
                        </div>

                        <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                          <Label className="text-sm font-medium text-gray-700">Prognosi oncologica *</Label>
                          <RadioGroup
                            value={formData.prognosiOncologica}
                            onValueChange={(value) => setFormData({...formData, prognosiOncologica: value})}
                            className="space-y-3"
                          >
                            <div className="flex items-center space-x-3 p-2 hover:bg-white rounded-md transition-colors">
                              <RadioGroupItem value="<12 mesi" id="prog1" className="text-blue-600" />
                              <Label htmlFor="prog1" className="text-sm font-medium cursor-pointer">&lt;12 mesi</Label>
                            </div>
                            <div className="flex items-center space-x-3 p-2 hover:bg-white rounded-md transition-colors">
                              <RadioGroupItem value="12-24 mesi" id="prog2" className="text-blue-600" />
                              <Label htmlFor="prog2" className="text-sm font-medium cursor-pointer">12-24 mesi</Label>
                            </div>
                            <div className="flex items-center space-x-3 p-2 hover:bg-white rounded-md transition-colors">
                              <RadioGroupItem value=">24 mesi" id="prog3" className="text-blue-600" />
                              <Label htmlFor="prog3" className="text-sm font-medium cursor-pointer">&gt;24 mesi</Label>
                            </div>
                          </RadioGroup>
                        </div>

                        <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                          <Label className="text-sm font-medium text-gray-700">Finalità della terapia oncologica *</Label>
                          <div className="space-y-2">
                            {["Aumento OS / PFS", "Miglioramento sintomi / qualità di vita"].map((finalita) => (
                              <div key={finalita} className="flex items-center space-x-3 p-2 hover:bg-white rounded-md transition-colors">
                                <Checkbox
                                  checked={formData.finalitaTerapiaOncologica.includes(finalita)}
                                  onCheckedChange={(checked) => {
                                    if (checked) {
                                      setFormData({
                                        ...formData,
                                        finalitaTerapiaOncologica: [...formData.finalitaTerapiaOncologica, finalita]
                                      });
                                    } else {
                                      setFormData({
                                        ...formData,
                                        finalitaTerapiaOncologica: formData.finalitaTerapiaOncologica.filter(f => f !== finalita)
                                      });
                                    }
                                  }}
                                  id={`finalita-terapia-${finalita}`}
                                />
                                <Label htmlFor={`finalita-terapia-${finalita}`} className="text-sm font-medium cursor-pointer">
                                  {finalita}
                                </Label>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="space-y-3 col-span-2 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                          <Label className="text-sm font-medium text-gray-700 mb-3 block">Rischio tossicità</Label>
                          <div className="grid md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="tossicitaEmatologica" className="text-sm font-medium text-gray-700">
                                % Tossicità ematologica G3/G4
                              </Label>
                              <Input
                                id="tossicitaEmatologica"
                                type="number"
                                placeholder="%"
                                value={formData.tossicitaEmatologica}
                                onChange={(e) => setFormData({...formData, tossicitaEmatologica: e.target.value})}
                                className="h-11 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="tossicitaExtraEmatologica" className="text-sm font-medium text-gray-700">
                                % Tossicità extra-ematologica G3/G4
                              </Label>
                              <Input
                                id="tossicitaExtraEmatologica"
                                type="number"
                                placeholder="%"
                                value={formData.tossicitaExtraEmatologica}
                                onChange={(e) => setFormData({...formData, tossicitaExtraEmatologica: e.target.value})}
                                className="h-11 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                              />
                            </div>
                          </div>
                        </div>

                        <div className="space-y-4 col-span-2 p-4 bg-gray-50 rounded-lg">
                          <Label className="text-sm font-medium text-gray-700">Quesiti per geriatra</Label>
                          <div className="space-y-2">
                            {[
                              "Attuabilità programma proposto",
                              "Necessità di presa in carico durante la terapia: Geriatrica",
                              "Necessità di presa in carico durante la terapia: Di altro specialista",
                              "Necessità di rivalutazione geriatrica al termine della terapia",
                              "Valutazione rischio cognitive impairment",
                              "Revisione polifarmacoterapia"
                            ].map((quesito) => (
                              <div key={quesito} className="flex items-center space-x-3 p-2 hover:bg-white rounded-md transition-colors">
                                <Checkbox
                                  checked={formData.quesitiGeriatra.includes(quesito)}
                                  onCheckedChange={(checked) => {
                                    if (checked) {
                                      setFormData({
                                        ...formData,
                                        quesitiGeriatra: [...formData.quesitiGeriatra, quesito]
                                      });
                                    } else {
                                      setFormData({
                                        ...formData,
                                        quesitiGeriatra: formData.quesitiGeriatra.filter(q => q !== quesito)
                                      });
                                    }
                                  }}
                                  id={`quesito-${quesito}`}
                                />
                                <Label htmlFor={`quesito-${quesito}`} className="text-sm font-medium cursor-pointer">
                                  {quesito}
                                </Label>
                              </div>
                            ))}
                            <div className="flex items-center space-x-3 p-2 hover:bg-white rounded-md transition-colors">
                              <Checkbox
                                checked={formData.quesitiGeriatra.includes("Altro")}
                                onCheckedChange={(checked) => {
                                  if (checked) {
                                    setFormData({
                                      ...formData,
                                      quesitiGeriatra: [...formData.quesitiGeriatra, "Altro"]
                                    });
                                  } else {
                                    setFormData({
                                      ...formData,
                                      quesitiGeriatra: formData.quesitiGeriatra.filter(q => q !== "Altro"),
                                      altroQuesitoGeriatra: ""
                                    });
                                  }
                                }}
                                id="quesito-altro"
                              />
                              <div className="flex-1">
                                <Label htmlFor="quesito-altro" className="text-sm font-medium cursor-pointer">
                                  Altro (Specificare)
                                </Label>
                                {formData.quesitiGeriatra.includes("Altro") && (
                                  <Input
                                    placeholder="Specifica altro quesito"
                                    value={formData.altroQuesitoGeriatra}
                                    onChange={(e) => setFormData({...formData, altroQuesitoGeriatra: e.target.value})}
                                    className="mt-2 h-11 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                                  />
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Output valutazione geriatrica */}
                      <div className="space-y-6 mt-6 p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200">
                        <div className="flex items-center gap-2 mb-4">
                          <FileText className="w-5 h-5 text-green-600" />
                          <h3 className="text-lg font-semibold text-gray-800">Output valutazione geriatrica</h3>
                        </div>

                        <div className="space-y-4">
                          <div className="flex items-center space-x-3 p-2 hover:bg-white rounded-md transition-colors">
                            <Checkbox
                              checked={formData.outputValutazioneGeriatrica.programmaAttuabile}
                              onCheckedChange={(checked) => setFormData({
                                ...formData,
                                outputValutazioneGeriatrica: {
                                  ...formData.outputValutazioneGeriatrica,
                                  programmaAttuabile: checked === true
                                }
                              })}
                              id="output-programma"
                            />
                            <Label htmlFor="output-programma" className="text-sm font-medium cursor-pointer">
                              Programma attuabile senza programmazione altre visite oncogeriatriche
                            </Label>
                          </div>

                          <div className="flex items-start space-x-3 p-2 hover:bg-white rounded-md transition-colors">
                            <Checkbox
                              checked={formData.outputValutazioneGeriatrica.presaInCaricoGeriatrica}
                              onCheckedChange={(checked) => setFormData({
                                ...formData,
                                outputValutazioneGeriatrica: {
                                  ...formData.outputValutazioneGeriatrica,
                                  presaInCaricoGeriatrica: checked === true
                                }
                              })}
                              id="output-presa-geriatrica"
                            />
                            <div className="flex-1">
                              <Label htmlFor="output-presa-geriatrica" className="text-sm font-medium cursor-pointer">
                                Necessità di presa in carico geriatrica durante la terapia con tempistica:
                              </Label>
                              {formData.outputValutazioneGeriatrica.presaInCaricoGeriatrica && (
                                <Input
                                  placeholder="Specifica tempistica"
                                  value={formData.outputValutazioneGeriatrica.tempisticaGeriatrica}
                                  onChange={(e) => setFormData({
                                    ...formData,
                                    outputValutazioneGeriatrica: {
                                      ...formData.outputValutazioneGeriatrica,
                                      tempisticaGeriatrica: e.target.value
                                    }
                                  })}
                                  className="mt-2 h-11 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                                />
                              )}
                            </div>
                          </div>

                          <div className="flex items-start space-x-3 p-2 hover:bg-white rounded-md transition-colors">
                            <Checkbox
                              checked={formData.outputValutazioneGeriatrica.presaInCaricoAltroSpecialista}
                              onCheckedChange={(checked) => setFormData({
                                ...formData,
                                outputValutazioneGeriatrica: {
                                  ...formData.outputValutazioneGeriatrica,
                                  presaInCaricoAltroSpecialista: checked === true
                                }
                              })}
                              id="output-presa-specialista"
                            />
                            <div className="flex-1">
                              <Label htmlFor="output-presa-specialista" className="text-sm font-medium cursor-pointer">
                                Necessità di presa in carico altro specialista (specificare)
                              </Label>
                              {formData.outputValutazioneGeriatrica.presaInCaricoAltroSpecialista && (
                                <Input
                                  placeholder="Specifica altro specialista"
                                  value={formData.outputValutazioneGeriatrica.altroSpecialista}
                                  onChange={(e) => setFormData({
                                    ...formData,
                                    outputValutazioneGeriatrica: {
                                      ...formData.outputValutazioneGeriatrica,
                                      altroSpecialista: e.target.value
                                    }
                                  })}
                                  className="mt-2 h-11 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                                />
                              )}
                            </div>
                          </div>

                          <div className="space-y-3">
                            <Label className="text-sm font-medium text-gray-700">Rischio cognitive impairment valutato come:</Label>
                            <RadioGroup
                              value={formData.outputValutazioneGeriatrica.rischioCognitiveImpairment}
                              onValueChange={(value) => setFormData({
                                ...formData,
                                outputValutazioneGeriatrica: {
                                  ...formData.outputValutazioneGeriatrica,
                                  rischioCognitiveImpairment: value,
                                  demenzaAltro: ""
                                }
                              })}
                              className="space-y-3"
                            >
                              <div className="flex items-center space-x-3 p-2 hover:bg-white rounded-md transition-colors">
                                <RadioGroupItem value="basso" id="rischio-basso" className="text-blue-600" />
                                <Label htmlFor="rischio-basso" className="text-sm font-medium cursor-pointer">Basso</Label>
                              </div>
                              <div className="flex items-center space-x-3 p-2 hover:bg-white rounded-md transition-colors">
                                <RadioGroupItem value="moderato" id="rischio-moderato" className="text-blue-600" />
                                <Label htmlFor="rischio-moderato" className="text-sm font-medium cursor-pointer">Moderato</Label>
                              </div>
                              <div className="flex items-center space-x-3 p-2 hover:bg-white rounded-md transition-colors">
                                <RadioGroupItem value="alto" id="rischio-alto" className="text-blue-600" />
                                <Label htmlFor="rischio-alto" className="text-sm font-medium cursor-pointer">Alto</Label>
                              </div>
                              <div className="flex items-start space-x-3 p-2 hover:bg-white rounded-md transition-colors">
                                <RadioGroupItem value="non valutabile" id="rischio-nv" className="text-blue-600 mt-1" />
                                <div className="flex-1">
                                  <Label htmlFor="rischio-nv" className="text-sm font-medium cursor-pointer">
                                    Non valutabile (demenza accertata / altro)
                                  </Label>
                                  {formData.outputValutazioneGeriatrica.rischioCognitiveImpairment === "non valutabile" && (
                                    <Input
                                      placeholder="Specifica"
                                      value={formData.outputValutazioneGeriatrica.demenzaAltro}
                                      onChange={(e) => setFormData({
                                        ...formData,
                                        outputValutazioneGeriatrica: {
                                          ...formData.outputValutazioneGeriatrica,
                                          demenzaAltro: e.target.value
                                        }
                                      })}
                                      className="mt-2 h-11 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                                    />
                                  )}
                                </div>
                              </div>
                            </RadioGroup>
                          </div>

                          <div className="space-y-3">
                            <div className="flex items-center space-x-3 p-2 hover:bg-white rounded-md transition-colors">
                              <Checkbox
                                checked={formData.outputValutazioneGeriatrica.revisionePolifarmacoterapia}
                                onCheckedChange={(checked) => setFormData({
                                  ...formData,
                                  outputValutazioneGeriatrica: {
                                    ...formData.outputValutazioneGeriatrica,
                                    revisionePolifarmacoterapia: checked === true
                                  }
                                })}
                                id="output-revisione"
                              />
                              <div className="flex-1">
                                <Label htmlFor="output-revisione" className="text-sm font-medium cursor-pointer">
                                  Revisione polifarmacoterapia effettuata, con:
                                </Label>
                                {formData.outputValutazioneGeriatrica.revisionePolifarmacoterapia && (
                                  <RadioGroup
                                    value={formData.outputValutazioneGeriatrica.tipoRevisione}
                                    onValueChange={(value) => setFormData({
                                      ...formData,
                                      outputValutazioneGeriatrica: {
                                        ...formData.outputValutazioneGeriatrica,
                                        tipoRevisione: value
                                      }
                                    })}
                                    className="space-y-2 mt-2"
                                  >
                                    <div className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-md transition-colors">
                                      <RadioGroupItem value="riduzione numero totale di farmaci" id="rev1" className="text-blue-600" />
                                      <Label htmlFor="rev1" className="text-sm font-medium cursor-pointer">Riduzione numero totale di farmaci</Label>
                                    </div>
                                    <div className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-md transition-colors">
                                      <RadioGroupItem value="aumento numero totale di farmaci" id="rev2" className="text-blue-600" />
                                      <Label htmlFor="rev2" className="text-sm font-medium cursor-pointer">Aumento numero totale di farmaci</Label>
                                    </div>
                                    <div className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-md transition-colors">
                                      <RadioGroupItem value="farmaci modificati, stesso numero totale" id="rev3" className="text-blue-600" />
                                      <Label htmlFor="rev3" className="text-sm font-medium cursor-pointer">Farmaci modificati, stesso numero totale</Label>
                                    </div>
                                  </RadioGroup>
                                )}
                              </div>
                            </div>
                          </div>

                          <div className="flex items-start space-x-3 p-2 hover:bg-white rounded-md transition-colors">
                            <Checkbox
                              checked={formData.outputValutazioneGeriatrica.serviziDomiciliari}
                              onCheckedChange={(checked) => setFormData({
                                ...formData,
                                outputValutazioneGeriatrica: {
                                  ...formData.outputValutazioneGeriatrica,
                                  serviziDomiciliari: checked === true
                                }
                              })}
                              id="output-servizi"
                            />
                            <div className="flex-1">
                              <Label htmlFor="output-servizi" className="text-sm font-medium cursor-pointer">
                                Necessità attivazione servizi domiciliari (ADI, NCP, servizi sociali, altro)
                              </Label>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="altroOutput" className="text-sm font-medium text-gray-700">
                              Altro (specificare)
                            </Label>
                            <Textarea
                              id="altroOutput"
                              placeholder="Specifica altro output..."
                              value={formData.outputValutazioneGeriatrica.altroOutput}
                              onChange={(e) => setFormData({
                                ...formData,
                                outputValutazioneGeriatrica: {
                                  ...formData.outputValutazioneGeriatrica,
                                  altroOutput: e.target.value
                                }
                              })}
                              className="border-gray-300 focus:border-blue-500 focus:ring-blue-500 resize-none"
                              rows={3}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Valutazione score clinico */}
                  {formData.ambulatorio && formData.ambulatorio !== "Oncogeriatria" && (
                    <>
                      <div className="flex items-center gap-2 mb-4">
                        <Calculator className="w-5 h-5 text-purple-600" />
                        <h3 className="text-lg font-semibold text-gray-800">Valutazione Score Clinico</h3>
                      </div>
                      
                      {formData.ambulatorio === "Cure Simultanee" && (
                        <div className="space-y-6">
                        {/* Score per Cure Simultanee */}
                        <div className="grid md:grid-cols-2 gap-6">
                          {/* PS Karnofsky */}
                          <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                            <Label className="text-sm font-medium text-gray-700">PS (Karnofsky)</Label>
                            <RadioGroup
                              value={formData.score.psKarnofsky}
                              onValueChange={(value) => setFormData({
                                ...formData, 
                                score: {...formData.score, psKarnofsky: value}
                              })}
                              className="space-y-3"
                            >
                              <div className="flex items-center space-x-3 p-2 hover:bg-white rounded-md transition-colors">
                                <RadioGroupItem value=">70" id="ps1" className="text-blue-600" />
                                <Label htmlFor="ps1" className="text-sm font-medium cursor-pointer">0 punti - &gt;70</Label>
                              </div>
                              <div className="flex items-center space-x-3 p-2 hover:bg-white rounded-md transition-colors">
                                <RadioGroupItem value="50-60" id="ps2" className="text-blue-600" />
                                <Label htmlFor="ps2" className="text-sm font-medium cursor-pointer">4 punti - 50-60</Label>
                              </div>
                            </RadioGroup>
                          </div>

                          {/* Sopravvivenza stimata */}
                          <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                            <Label className="text-sm font-medium text-gray-700">Sopravvivenza stimata</Label>
                            <RadioGroup
                              value={formData.score.sopravvivenza}
                              onValueChange={(value) => setFormData({
                                ...formData, 
                                score: {...formData.score, sopravvivenza: value}
                              })}
                              className="space-y-3"
                            >
                              <div className="flex items-center space-x-3 p-2 hover:bg-white rounded-md transition-colors">
                                <RadioGroupItem value="≥ 12 mesi" id="surv1" className="text-blue-600" />
                                <Label htmlFor="surv1" className="text-sm font-medium cursor-pointer">0 punti - ≥ 12 mesi</Label>
                              </div>
                              <div className="flex items-center space-x-3 p-2 hover:bg-white rounded-md transition-colors">
                                <RadioGroupItem value="6-12 mesi" id="surv2" className="text-blue-600" />
                                <Label htmlFor="surv2" className="text-sm font-medium cursor-pointer">1 punto - 6-12 mesi</Label>
                              </div>
                              <div className="flex items-center space-x-3 p-2 hover:bg-white rounded-md transition-colors">
                                <RadioGroupItem value="≤ 6 mesi" id="surv3" className="text-blue-600" />
                                <Label htmlFor="surv3" className="text-sm font-medium cursor-pointer">2 punti - ≤ 6 mesi</Label>
                              </div>
                            </RadioGroup>
                          </div>

                          {/* Sintomi (multi-select) */}
                          <div className="space-y-4 p-4 bg-gray-50 rounded-lg col-span-2">
                            <Label className="text-sm font-medium text-gray-700">Sintomi (anche associati)</Label>
                            <div className="space-y-2">
                              {["Dolore", "Dispnea", "Iporessia", "Calo Ponderale", "Ansia Depressione"].map((sintomo) => (
                                <div key={sintomo} className="flex items-center space-x-3 p-2 hover:bg-white rounded-md transition-colors">
                                  <input
                                    type="checkbox"
                                    checked={formData.score.sintomi.includes(sintomo)}
                                    onChange={(e) => {
                                      if (e.target.checked) {
                                        setFormData({
                                          ...formData,
                                          score: {...formData.score, sintomi: [...formData.score.sintomi, sintomo]}
                                        });
                                      } else {
                                        setFormData({
                                          ...formData,
                                          score: {...formData.score, sintomi: formData.score.sintomi.filter(s => s !== sintomo)}
                                        });
                                      }
                                    }}
                                    className="w-4 h-4 text-blue-600 rounded"
                                  />
                                  <Label className="text-sm font-medium cursor-pointer">
                                    {sintomo} {sintomo === "Dolore" ? "(2 punti)" : "(1 punto)"}
                                  </Label>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Trattamenti */}
                          <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                            <Label className="text-sm font-medium text-gray-700">Trattamenti con impatto sulla sopravvivenza</Label>
                            <RadioGroup
                              value={formData.score.trattamenti}
                              onValueChange={(value) => setFormData({
                                ...formData, 
                                score: {...formData.score, trattamenti: value}
                              })}
                              className="space-y-3"
                            >
                              <div className="flex items-center space-x-3 p-2 hover:bg-white rounded-md transition-colors">
                                <RadioGroupItem value="si" id="tratt1" className="text-blue-600" />
                                <Label htmlFor="tratt1" className="text-sm font-medium cursor-pointer">0 punti - Si</Label>
                              </div>
                              <div className="flex items-center space-x-3 p-2 hover:bg-white rounded-md transition-colors">
                                <RadioGroupItem value="No" id="tratt2" className="text-blue-600" />
                                <Label htmlFor="tratt2" className="text-sm font-medium cursor-pointer">2 punti - No</Label>
                              </div>
                            </RadioGroup>
                          </div>

                          {/* Tossicità attesa */}
                          <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                            <Label className="text-sm font-medium text-gray-700">Tossicità attesa (anche associate)</Label>
                            <RadioGroup
                              value={formData.score.tossicita}
                              onValueChange={(value) => setFormData({
                                ...formData, 
                                score: {...formData.score, tossicita: value}
                              })}
                              className="space-y-3"
                            >
                              <div className="flex items-center space-x-3 p-2 hover:bg-white rounded-md transition-colors">
                                <RadioGroupItem value="Nessuna" id="tox1" className="text-blue-600" />
                                <Label htmlFor="tox1" className="text-sm font-medium cursor-pointer">0 punti - Nessuna</Label>
                              </div>
                              <div className="flex items-center space-x-3 p-2 hover:bg-white rounded-md transition-colors">
                                <RadioGroupItem value="Ematologica" id="tox2" className="text-blue-600" />
                                <Label htmlFor="tox2" className="text-sm font-medium cursor-pointer">1 punto - Ematologica</Label>
                              </div>
                              <div className="flex items-center space-x-3 p-2 hover:bg-white rounded-md transition-colors">
                                <RadioGroupItem value="Mucosite" id="tox3" className="text-blue-600" />
                                <Label htmlFor="tox3" className="text-sm font-medium cursor-pointer">1 punto - Mucosite (cavo orale e/o G.I)</Label>
                              </div>
                              <div className="flex items-center space-x-3 p-2 hover:bg-white rounded-md transition-colors">
                                <RadioGroupItem value="Altro" id="tox4" className="text-blue-600" />
                                <Label htmlFor="tox4" className="text-sm font-medium cursor-pointer">1 punto - Altro</Label>
                              </div>
                            </RadioGroup>
                          </div>

                          {/* Problemi socio-assistenziali */}
                          <div className="space-y-4 p-4 bg-gray-50 rounded-lg col-span-2">
                            <Label className="text-sm font-medium text-gray-700">Problemi socio-assistenziali (anche associati)</Label>
                            <RadioGroup
                              value={formData.score.problemiSocio}
                              onValueChange={(value) => setFormData({
                                ...formData, 
                                score: {...formData.score, problemiSocio: value}
                              })}
                              className="space-y-3"
                            >
                              <div className="flex items-center space-x-3 p-2 hover:bg-white rounded-md transition-colors">
                                <RadioGroupItem value="Nessuno" id="soc1" className="text-blue-600" />
                                <Label htmlFor="soc1" className="text-sm font-medium cursor-pointer">0 punti - Nessuno</Label>
                              </div>
                              <div className="flex items-center space-x-3 p-2 hover:bg-white rounded-md transition-colors">
                                <RadioGroupItem value="Rete famigliare scarsa" id="soc2" className="text-blue-600" />
                                <Label htmlFor="soc2" className="text-sm font-medium cursor-pointer">1 punto - Rete familiare scarsa o assente</Label>
                              </div>
                              <div className="flex items-center space-x-3 p-2 hover:bg-white rounded-md transition-colors">
                                <RadioGroupItem value="Inadeguato supporto" id="soc3" className="text-blue-600" />
                                <Label htmlFor="soc3" className="text-sm font-medium cursor-pointer">2 punti - Inadeguato supporto da parte del caregiver</Label>
                              </div>
                              <div className="flex items-center space-x-3 p-2 hover:bg-white rounded-md transition-colors">
                                <RadioGroupItem value="Limitazioni assistenziali" id="soc4" className="text-blue-600" />
                                <Label htmlFor="soc4" className="text-sm font-medium cursor-pointer">1 punto - Presenza di limitazioni assistenziali</Label>
                              </div>
                            </RadioGroup>
                          </div>
                        </div>
                        </div>
                      )}
                      
                      {formData.ambulatorio === "Osteoncologia" && (
                        <div className="space-y-6">
                          {/* Score per Osteoncologia */}
                          <div className="grid md:grid-cols-2 gap-6">
                            {/* PS (Karnofsky) */}
                            <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                              <Label className="text-sm font-medium text-gray-700">PS (Karnofsky)</Label>
                              <RadioGroup
                                value={formData.score.psOsteo}
                                onValueChange={(value) => setFormData({
                                  ...formData, 
                                  score: {...formData.score, psOsteo: value}
                                })}
                                className="space-y-3"
                              >
                                <div className="flex items-center space-x-3 p-2 hover:bg-white rounded-md transition-colors">
                                  <RadioGroupItem value="100-90" id="ps-osteo1" className="text-blue-600" />
                                  <Label htmlFor="ps-osteo1" className="text-sm font-medium cursor-pointer">0 punti - 100-90</Label>
                                </div>
                                <div className="flex items-center space-x-3 p-2 hover:bg-white rounded-md transition-colors">
                                  <RadioGroupItem value="80" id="ps-osteo2" className="text-blue-600" />
                                  <Label htmlFor="ps-osteo2" className="text-sm font-medium cursor-pointer">1 punto - 80</Label>
                                </div>
                                <div className="flex items-center space-x-3 p-2 hover:bg-white rounded-md transition-colors">
                                  <RadioGroupItem value="≤ 70" id="ps-osteo3" className="text-blue-600" />
                                  <Label htmlFor="ps-osteo3" className="text-sm font-medium cursor-pointer">2 punti - ≤ 70</Label>
                                </div>
                              </RadioGroup>
                            </div>

                            {/* Segni e Sintomi */}
                            <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                              <Label className="text-sm font-medium text-gray-700">Segni e Sintomi (anche associati)</Label>
                              <RadioGroup
                                value={formData.score.segniSintomi}
                                onValueChange={(value) => setFormData({
                                  ...formData, 
                                  score: {...formData.score, segniSintomi: value}
                                })}
                                className="space-y-3"
                              >
                                <div className="flex items-center space-x-3 p-2 hover:bg-white rounded-md transition-colors">
                                  <RadioGroupItem value="Nessuno" id="segni1" className="text-blue-600" />
                                  <Label htmlFor="segni1" className="text-sm font-medium cursor-pointer">0 punti - Nessuno</Label>
                                </div>
                                <div className="flex items-center space-x-3 p-2 hover:bg-white rounded-md transition-colors">
                                  <RadioGroupItem value="Dolore scheletrico" id="segni2" className="text-blue-600" />
                                  <Label htmlFor="segni2" className="text-sm font-medium cursor-pointer">2 punti - Dolore scheletrico</Label>
                                </div>
                                <div className="flex items-center space-x-3 p-2 hover:bg-white rounded-md transition-colors">
                                  <RadioGroupItem value="Sintomi da compressione" id="segni3" className="text-blue-600" />
                                  <Label htmlFor="segni3" className="text-sm font-medium cursor-pointer">3 punti - Sintomi da compressione</Label>
                                </div>
                              </RadioGroup>
                            </div>

                            {/* Presenza di metastasi viscerali */}
                            <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                              <Label className="text-sm font-medium text-gray-700">Presenza di metastasi viscerali</Label>
                              <RadioGroup
                                value={formData.score.metastasiViscerali}
                                onValueChange={(value) => setFormData({
                                  ...formData, 
                                  score: {...formData.score, metastasiViscerali: value}
                                })}
                                className="space-y-3"
                              >
                                <div className="flex items-center space-x-3 p-2 hover:bg-white rounded-md transition-colors">
                                  <RadioGroupItem value="Nessuna viscerale" id="metastasi1" className="text-blue-600" />
                                  <Label htmlFor="metastasi1" className="text-sm font-medium cursor-pointer">0 punti - Nessuna viscerale (solo malattia ossea)</Label>
                                </div>
                                <div className="flex items-center space-x-3 p-2 hover:bg-white rounded-md transition-colors">
                                  <RadioGroupItem value="Oligometastasi viscerali" id="metastasi2" className="text-blue-600" />
                                  <Label htmlFor="metastasi2" className="text-sm font-medium cursor-pointer">1 punto - Oligometastasi viscerali (1-3 lesioni)</Label>
                                </div>
                                <div className="flex items-center space-x-3 p-2 hover:bg-white rounded-md transition-colors">
                                  <RadioGroupItem value="Multiple lesioni viscerali" id="metastasi3" className="text-blue-600" />
                                  <Label htmlFor="metastasi3" className="text-sm font-medium cursor-pointer">2 punti - Presenza di multiple lesioni viscerali</Label>
                                </div>
                              </RadioGroup>
                            </div>

                            {/* N. metastasi vertebrali */}
                            <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                              <Label className="text-sm font-medium text-gray-700">N. metastasi vertebrali</Label>
                              <RadioGroup
                                value={formData.score.nMetastasiVertebrali}
                                onValueChange={(value) => setFormData({
                                  ...formData, 
                                  score: {...formData.score, nMetastasiVertebrali: value}
                                })}
                                className="space-y-3"
                              >
                                <div className="flex items-center space-x-3 p-2 hover:bg-white rounded-md transition-colors">
                                  <RadioGroupItem value="0-1" id="vertebrali1" className="text-blue-600" />
                                  <Label htmlFor="vertebrali1" className="text-sm font-medium cursor-pointer">0 punti - 0-1</Label>
                                </div>
                                <div className="flex items-center space-x-3 p-2 hover:bg-white rounded-md transition-colors">
                                  <RadioGroupItem value="2" id="vertebrali2" className="text-blue-600" />
                                  <Label htmlFor="vertebrali2" className="text-sm font-medium cursor-pointer">1 punto - 2</Label>
                                </div>
                                <div className="flex items-center space-x-3 p-2 hover:bg-white rounded-md transition-colors">
                                  <RadioGroupItem value="≥ 3" id="vertebrali3" className="text-blue-600" />
                                  <Label htmlFor="vertebrali3" className="text-sm font-medium cursor-pointer">2 punti - ≥ 3</Label>
                                </div>
                              </RadioGroup>
                            </div>

                            {/* Sede malattia primitiva */}
                            <div className="space-y-4 p-4 bg-gray-50 rounded-lg col-span-2">
                              <Label className="text-sm font-medium text-gray-700">Sede malattia primitiva</Label>
                              <RadioGroup
                                value={formData.score.sedeMalattiaPrimitiva}
                                onValueChange={(value) => setFormData({
                                  ...formData, 
                                  score: {...formData.score, sedeMalattiaPrimitiva: value}
                                })}
                                className="space-y-3"
                              >
                                <div className="flex items-center space-x-3 p-2 hover:bg-white rounded-md transition-colors">
                                  <RadioGroupItem value="Prostata, mammella, tiroide, ematologica" id="sede1" className="text-blue-600" />
                                  <Label htmlFor="sede1" className="text-sm font-medium cursor-pointer">1 punto - Prostata, mammella, tiroide, ematologica</Label>
                                </div>
                                <div className="flex items-center space-x-3 p-2 hover:bg-white rounded-md transition-colors">
                                  <RadioGroupItem value="Rene, colon, retto, ginecologici" id="sede2" className="text-blue-600" />
                                  <Label htmlFor="sede2" className="text-sm font-medium cursor-pointer">2 punti - Rene, colon, retto, ginecologici</Label>
                                </div>
                                <div className="flex items-center space-x-3 p-2 hover:bg-white rounded-md transition-colors">
                                  <RadioGroupItem value="Altre sedi" id="sede3" className="text-blue-600" />
                                  <Label htmlFor="sede3" className="text-sm font-medium cursor-pointer">3 punti - Altre sedi (non elencate)</Label>
                                </div>
                                <div className="flex items-center space-x-3 p-2 hover:bg-white rounded-md transition-colors">
                                  <RadioGroupItem value="Vie biliari, fegato, polmone, stomaco, esofago, CUP" id="sede4" className="text-blue-600" />
                                  <Label htmlFor="sede4" className="text-sm font-medium cursor-pointer">4 punti - Vie biliari, fegato, polmone, stomaco, esofago, CUP</Label>
                                </div>
                              </RadioGroup>
                            </div>

                            {/* Situazioni urgenti */}
                            <div className="space-y-4 p-4 bg-gray-50 rounded-lg col-span-2 border-2 border-red-200">
                              <Label className="text-sm font-medium text-gray-700">Situazioni urgenti (radiologicamente accertate)</Label>
                              <div className="space-y-2">
                                <div className="flex items-center space-x-3 p-2 hover:bg-white rounded-md transition-colors">
                                  <Checkbox
                                    checked={formData.score.compressioneMidollare}
                                    onCheckedChange={(checked) => setFormData({
                                      ...formData,
                                      score: {...formData.score, compressioneMidollare: checked === true}
                                    })}
                                    id="compressione"
                                  />
                                  <Label htmlFor="compressione" className="text-sm font-medium cursor-pointer">
                                    Compressione midollare
                                  </Label>
                                </div>
                                <div className="flex items-center space-x-3 p-2 hover:bg-white rounded-md transition-colors">
                                  <Checkbox
                                    checked={formData.score.fratturaPatologica}
                                    onCheckedChange={(checked) => setFormData({
                                      ...formData,
                                      score: {...formData.score, fratturaPatologica: checked === true}
                                    })}
                                    id="frattura"
                                  />
                                  <Label htmlFor="frattura" className="text-sm font-medium cursor-pointer">
                                    Frattura patologica
                                  </Label>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {formData.ambulatorio !== "Cure Simultanee" && formData.ambulatorio !== "Osteoncologia" && (
                        /* Vecchio score per altri ambulatori */
                        <div className="grid md:grid-cols-3 gap-6">
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
                      )}

                      {/* Score totale */}
                      {formData.ambulatorio !== "Oncogeriatria" && (
                        <div className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
                          <div className="flex items-center justify-between mb-4">
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
                          {formData.ambulatorio === "Osteoncologia" && getUrgenzaLevel() && (
                            <div className="mt-4 p-4 bg-gradient-to-r from-orange-50 to-red-50 rounded-lg border border-orange-200">
                              <div className="flex items-center gap-2 mb-2">
                                <Badge 
                                  variant="outline" 
                                  className={`text-base px-3 py-1 font-bold ${
                                    getUrgenzaLevel()?.level === "URG" 
                                      ? "bg-red-100 text-red-800 border-red-300" 
                                      : "bg-orange-100 text-orange-800 border-orange-300"
                                  }`}
                                >
                                  {getUrgenzaLevel()?.level}
                                </Badge>
                                <span className="text-sm font-medium text-gray-700">Livello di urgenza</span>
                              </div>
                              <p className="text-sm text-gray-600">
                                {getUrgenzaLevel()?.message}
                              </p>
                            </div>
                          )}
                        </div>
                      )}
                    </>
                  )}

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
                  {notifications.filter(n => !n.letto && !n.archiviata).map((notification) => (
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
