import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { Badge } from "@/shared/components/ui/badge";
import { ArrowLeft, Search, AlertCircle } from "lucide-react";
import CaseManagerNavbar from "@/oncologico/components/layout/CaseManagerNavbar";
import { useNavigate } from "react-router-dom";

const RicercaPazientePage = () => {
  const navigate = useNavigate();
  const [searchCF, setSearchCF] = useState("");
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
    
    // Simula ricerca e naviga direttamente alla pagina di dettaglio completa
    setTimeout(() => {
      const patient = patients.find(p => p.cf.toLowerCase().includes(searchCF.toLowerCase()));
      if (patient) {
        // Naviga direttamente alla pagina di dettaglio completa
        navigate(`/oncologico/paziente/${patient.cf}`);
      } else {
        // Per la demo, naviga comunque alla pagina di dettaglio con il CF inserito
        // La pagina PazienteDetailPage gestirà il caso paziente non trovato
        navigate(`/oncologico/paziente/${searchCF.toUpperCase()}`);
      }
      setIsSearching(false);
    }, 500);
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
        <div className="max-w-3xl mx-auto">
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
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="cf">Codice Fiscale</Label>
                <div className="flex gap-2">
                  <Input
                    id="cf"
                    placeholder="Inserisci il codice fiscale..."
                    value={searchCF}
                    onChange={(e) => setSearchCF(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSearchPatient()}
                    className="flex-1"
                    disabled={isSearching}
                  />
                  <Button 
                    onClick={handleSearchPatient} 
                    disabled={isSearching}
                  >
                    {isSearching ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Ricerca...
                      </>
                    ) : (
                      <>
                        <Search className="w-4 h-4" />
                      </>
                    )}
                  </Button>
                </div>
              </div>
              
              {isSearching && (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
                  <p className="text-sm text-muted-foreground">Ricerca in corso...</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

      </div>
    </div>
  );
};

export default RicercaPazientePage;
