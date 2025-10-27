import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { Badge } from "@/shared/components/ui/badge";
import { ArrowLeft, Search, User, AlertCircle, CheckCircle } from "lucide-react";
import CaseManagerNavbar from "@/oncologico/components/layout/CaseManagerNavbar";
import { useNavigate } from "react-router-dom";

const RicercaPazientePage = () => {
  const navigate = useNavigate();
  const [searchCF, setSearchCF] = useState("");
  const [searchResult, setSearchResult] = useState<any>(null);
  const [isSearching, setIsSearching] = useState(false);

  // Mock data pazienti (stesso del CaseManagerPage)
  const [patients] = useState([
    {
      id: 1,
      cognome: "Rossi",
      nome: "Mario",
      cf: "RSSMRA80A01H501U",
      pdta: "Polmone",
      visitaRichiesta: "Oncologica",
      medicoMittente: "Dr. Bianchi",
      score: 8,
      slotPrenotato: true,
      dataPrenotazione: "2024-01-20",
      oraPrenotazione: "09:30",
      ambulatorio: "Cure Simultanee",
      comorbidita: ["Diabete tipo 2", "Ipertensione"],
      storicoVisite: [
        { data: "2024-01-10", tipo: "Prima visita", medico: "Dr. Bianchi", esito: "Diagnosi confermata" },
        { data: "2023-12-15", tipo: "Visita controllo", medico: "Dr. Verdi", esito: "Stabile" }
      ],
      storicoScore: [
        { data: "2024-01-15", score: 8, parametri: { tosse: 3, dolore: 3, comorbidita: 2 } },
        { data: "2023-12-15", score: 6, parametri: { tosse: 2, dolore: 2, comorbidita: 2 } }
      ]
    },
    {
      id: 2,
      cognome: "Bianchi",
      nome: "Anna",
      cf: "BNCNNA75B02H501V",
      pdta: "Mammella",
      visitaRichiesta: "Radioterapia",
      medicoMittente: "Dr. Verdi",
      score: 7,
      slotPrenotato: false,
      dataPrenotazione: null,
      oraPrenotazione: null,
      ambulatorio: null,
      comorbidita: ["Osteoporosi"],
      storicoVisite: [
        { data: "2024-01-12", tipo: "Visita oncologica", medico: "Dr. Verdi", esito: "Programmata radioterapia" }
      ],
      storicoScore: [
        { data: "2024-01-12", score: 7, parametri: { tosse: 1, dolore: 3, comorbidita: 3 } }
      ]
    },
    {
      id: 3,
      cognome: "Verdi",
      nome: "Giuseppe",
      cf: "VRDGPP70C03H501W",
      pdta: "Prostata",
      visitaRichiesta: "Oncogeriatrica",
      medicoMittente: "Dr. Rossi",
      score: 6,
      slotPrenotato: true,
      dataPrenotazione: "2024-01-18",
      oraPrenotazione: "14:00",
      ambulatorio: "Oncogeriatria",
      comorbidita: ["Cardiopatia ischemica", "Diabete tipo 2"],
      storicoVisite: [
        { data: "2024-01-08", tipo: "Visita geriatrica", medico: "Dr. Rossi", esito: "Valutazione completata" },
        { data: "2023-11-20", tipo: "Prima visita", medico: "Dr. Bianchi", esito: "Diagnosi iniziale" }
      ],
      storicoScore: [
        { data: "2024-01-08", score: 6, parametri: { tosse: 1, dolore: 2, comorbidita: 3 } },
        { data: "2023-11-20", score: 5, parametri: { tosse: 1, dolore: 1, comorbidita: 3 } }
      ]
    },
    {
      id: 4,
      cognome: "Neri",
      nome: "Francesca",
      cf: "NRIFNC85D04H501X",
      pdta: "Sistema nervoso centrale",
      visitaRichiesta: "Osteoncologica",
      medicoMittente: "Dr. Bianchi",
      score: 5,
      slotPrenotato: false,
      dataPrenotazione: null,
      oraPrenotazione: null,
      ambulatorio: null,
      comorbidita: ["Epilessia"],
      storicoVisite: [
        { data: "2024-01-14", tipo: "Visita neurologica", medico: "Dr. Bianchi", esito: "In attesa di esami" }
      ],
      storicoScore: [
        { data: "2024-01-14", score: 5, parametri: { tosse: 2, dolore: 1, comorbidita: 2 } }
      ]
    },
    {
      id: 5,
      cognome: "Ferrari",
      nome: "Luigi",
      cf: "FRRLGI65E05H501Y",
      pdta: "Colon",
      visitaRichiesta: "Visita",
      medicoMittente: "Dr. Verdi",
      score: 4,
      slotPrenotato: true,
      dataPrenotazione: "2024-01-22",
      oraPrenotazione: "10:00",
      ambulatorio: "Osteoncologia",
      comorbidita: ["Diverticolosi"],
      storicoVisite: [
        { data: "2024-01-16", tipo: "Visita gastroenterologica", medico: "Dr. Verdi", esito: "Follow-up programmato" }
      ],
      storicoScore: [
        { data: "2024-01-16", score: 4, parametri: { tosse: 1, dolore: 1, comorbidita: 2 } }
      ]
    },
    {
      id: 6,
      cognome: "Romano",
      nome: "Maria",
      cf: "RSSMRA70F06H501Z",
      pdta: "Melanoma",
      visitaRichiesta: "Discussione",
      medicoMittente: "Dr. Bianchi",
      score: 3,
      slotPrenotato: false,
      dataPrenotazione: null,
      oraPrenotazione: null,
      ambulatorio: null,
      comorbidita: [],
      storicoVisite: [
        { data: "2024-01-18", tipo: "Visita dermatologica", medico: "Dr. Bianchi", esito: "Discussione caso" }
      ],
      storicoScore: [
        { data: "2024-01-18", score: 3, parametri: { tosse: 1, dolore: 1, comorbidita: 1 } }
      ]
    }
  ]);

  const handleSearchPatient = () => {
    if (!searchCF.trim()) {
      alert("Inserisci un codice fiscale");
      return;
    }

    setIsSearching(true);
    
    // Simula ricerca
    setTimeout(() => {
      const patient = patients.find(p => p.cf.toLowerCase().includes(searchCF.toLowerCase()));
      if (patient) {
        setSearchResult(patient);
      } else {
        // Per la demo, generiamo un paziente mock se non trovato
        const mockPatient = {
          id: 999,
          cognome: "Demo",
          nome: "Paziente",
          cf: searchCF.toUpperCase(),
          pdta: "Polmone",
          visitaRichiesta: "Visita Oncologica",
          medicoMittente: "Dr. Bianchi",
          score: Math.floor(Math.random() * 6) + 3, // Score tra 3 e 8
          slotPrenotato: Math.random() > 0.5,
          dataPrenotazione: Math.random() > 0.5 ? "2024-01-25" : null,
          oraPrenotazione: Math.random() > 0.5 ? "10:30" : null,
          ambulatorio: Math.random() > 0.5 ? "Cure Simultanee" : null,
          comorbidita: ["Diabete tipo 2", "Ipertensione"],
          storicoVisite: [
            { data: "2024-01-20", tipo: "Prima visita", medico: "Dr. Bianchi", esito: "Diagnosi in corso" },
            { data: "2024-01-15", tipo: "Visita controllo", medico: "Dr. Verdi", esito: "Stabile" }
          ],
          storicoScore: [
            { data: "2024-01-20", score: Math.floor(Math.random() * 6) + 3, parametri: { tosse: Math.floor(Math.random() * 3) + 1, dolore: Math.floor(Math.random() * 3) + 1, comorbidita: Math.floor(Math.random() * 3) + 1 } },
            { data: "2024-01-15", score: Math.floor(Math.random() * 6) + 3, parametri: { tosse: Math.floor(Math.random() * 3) + 1, dolore: Math.floor(Math.random() * 3) + 1, comorbidita: Math.floor(Math.random() * 3) + 1 } }
          ]
        };
        setSearchResult(mockPatient);
      }
      setIsSearching(false);
    }, 1000);
  };

  const getScoreColor = (score: number) => {
    if (score >= 7) return "bg-red-100 text-red-800";
    if (score >= 5) return "bg-yellow-100 text-yellow-800";
    return "bg-green-100 text-green-800";
  };

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
              <h1 className="text-2xl font-bold">Visualizza Paziente</h1>
              <p className="text-muted-foreground">Ricerca paziente per codice fiscale</p>
            </div>
          </div>
        </div>

        {/* Ricerca */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="w-5 h-5" />
              Ricerca Paziente
            </CardTitle>
            <CardDescription>
              Inserisci il codice fiscale del paziente per visualizzare tutti i dettagli
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <div className="flex-1">
                <Label htmlFor="cf">Codice Fiscale</Label>
                <Input
                  id="cf"
                  placeholder="Es. RSSMRA80A01H501U"
                  value={searchCF}
                  onChange={(e) => setSearchCF(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearchPatient()}
                />
              </div>
              <div className="flex items-end">
                <Button 
                  onClick={handleSearchPatient} 
                  disabled={isSearching}
                  className="min-w-[120px]"
                >
                  {isSearching ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Ricerca...
                    </>
                  ) : (
                    <>
                      <Search className="w-4 h-4 mr-2" />
                      Cerca
                    </>
                  )}
                </Button>
              </div>
            </div>
            
            {/* Messaggio demo */}
            <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-center gap-2 text-blue-800">
                <AlertCircle className="w-4 h-4" />
                <span className="text-sm font-medium">Demo Mode</span>
              </div>
              <p className="text-sm text-blue-700 mt-1">
                Inserisci qualsiasi codice fiscale per testare la funzionalità. Se il paziente non esiste, verrà generato un paziente demo.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Risultato Ricerca */}
        {searchResult && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                Risultato Ricerca
                {searchResult.id === 999 && (
                  <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                    Demo
                  </Badge>
                )}
              </CardTitle>
              <CardDescription>
                Dettagli completi del paziente trovato
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                {/* Informazioni principali */}
                <div>
                  <h4 className="font-semibold mb-3">Informazioni Generali</h4>
                  <div className="space-y-2 text-sm">
                    <p><strong>Nome:</strong> {searchResult.nome} {searchResult.cognome}</p>
                    <p><strong>Codice Fiscale:</strong> <span className="font-mono">{searchResult.cf}</span></p>
                    <p><strong>PDTA:</strong> {searchResult.pdta}</p>
                    <p><strong>Score Attuale:</strong> <Badge className={getScoreColor(searchResult.score)}>{searchResult.score}</Badge></p>
                    <p><strong>Comorbidità:</strong> {searchResult.comorbidita.length > 0 ? searchResult.comorbidita.join(", ") : "Nessuna"}</p>
                  </div>
                </div>

                {/* Stato prenotazione */}
                <div>
                  <h4 className="font-semibold mb-3">Stato Prenotazione</h4>
                  <div className="space-y-2 text-sm">
                    <p><strong>Visita Richiesta:</strong> {searchResult.visitaRichiesta}</p>
                    <p><strong>Medico Mittente:</strong> {searchResult.medicoMittente}</p>
                    {searchResult.slotPrenotato ? (
                      <>
                        <p><strong>Stato:</strong> <Badge className="bg-green-100 text-green-800">Prenotato</Badge></p>
                        <p><strong>Data:</strong> {searchResult.dataPrenotazione}</p>
                        <p><strong>Ora:</strong> {searchResult.oraPrenotazione}</p>
                        <p><strong>Ambulatorio:</strong> {searchResult.ambulatorio}</p>
                      </>
                    ) : (
                      <p><strong>Stato:</strong> <Badge variant="secondary">Da Prenotare</Badge></p>
                    )}
                  </div>
                </div>
              </div>

              {/* Storico Score */}
              <div className="mt-6">
                <h4 className="font-semibold mb-3">Storico Score Clinico</h4>
                <div className="space-y-2">
                  {searchResult.storicoScore.map((scoreEntry: any, index: number) => (
                    <div key={index} className="p-3 bg-muted rounded-lg">
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-medium">{scoreEntry.data}</span>
                        <Badge className={getScoreColor(scoreEntry.score)}>
                          Score: {scoreEntry.score}
                        </Badge>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Tosse: {scoreEntry.parametri.tosse} | Dolore: {scoreEntry.parametri.dolore} | Comorbidità: {scoreEntry.parametri.comorbidita}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Storico Visite */}
              <div className="mt-6">
                <h4 className="font-semibold mb-3">Storico Visite</h4>
                <div className="space-y-2">
                  {searchResult.storicoVisite.map((visita: any, index: number) => (
                    <div key={index} className="p-3 border rounded-lg">
                      <div className="flex justify-between items-start mb-1">
                        <span className="font-medium">{visita.tipo}</span>
                        <span className="text-sm text-muted-foreground">{visita.data}</span>
                      </div>
                      <div className="text-sm text-muted-foreground mb-1">
                        Medico: {visita.medico}
                      </div>
                      <div className="text-sm">
                        <strong>Esito:</strong> {visita.esito}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Azioni */}
              <div className="mt-6 flex gap-2">
                <Button onClick={() => navigate(`/oncologico/paziente/${searchResult.cf}`)}>
                  <User className="w-4 h-4 mr-2" />
                  Visualizza Dettagli Completi
                </Button>
                {!searchResult.slotPrenotato && (
                  <Button variant="outline">
                    Prenota Visita
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default RicercaPazientePage;
