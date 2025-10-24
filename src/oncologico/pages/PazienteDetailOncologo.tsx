import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";
import { Badge } from "@/shared/components/ui/badge";
import { ArrowLeft, Download, Eye, Clock, CheckCircle, AlertCircle, User } from "lucide-react";
import OncologoNavbar from "@/oncologico/components/OncologoNavbar";
import { useNavigate, useParams } from "react-router-dom";

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

const PazienteDetailOncologo = () => {
  const navigate = useNavigate();
  const { cf } = useParams<{ cf: string }>();

  // Mock data pazienti (stesso del CaseManagerPage)
  const [patients] = useState([
    {
      id: 1,
      cognome: "Rossi",
      nome: "Mario",
      cf: "RSSMRA80A01H501U",
      pdta: "Polmone",
      visitaRichiesta: "Oncologica",
      ambulatorio: "Cure Simultanee",
      medicoMittente: "Dr. Bianchi",
      score: 8,
      slotPrenotato: true,
      dataPrenotazione: "2024-01-20",
      oraPrenotazione: "09:30",
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
      ambulatorio: "Oncogeriatria",
      medicoMittente: "Dr. Verdi",
      score: 7,
      slotPrenotato: false,
      dataPrenotazione: null,
      oraPrenotazione: null,
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
      ambulatorio: "Oncogeriatria",
      medicoMittente: "Dr. Rossi",
      score: 6,
      slotPrenotato: true,
      dataPrenotazione: "2024-01-18",
      oraPrenotazione: "14:00",
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
      ambulatorio: "Osteoncologia",
      medicoMittente: "Dr. Bianchi",
      score: 5,
      slotPrenotato: false,
      dataPrenotazione: null,
      oraPrenotazione: null,
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
      ambulatorio: "Osteoncologia",
      medicoMittente: "Dr. Verdi",
      score: 4,
      slotPrenotato: true,
      dataPrenotazione: "2024-01-22",
      oraPrenotazione: "10:00",
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
      ambulatorio: "Cure Simultanee",
      medicoMittente: "Dr. Bianchi",
      score: 3,
      slotPrenotato: false,
      dataPrenotazione: null,
      oraPrenotazione: null,
      comorbidita: [],
      storicoVisite: [
        { data: "2024-01-18", tipo: "Visita dermatologica", medico: "Dr. Bianchi", esito: "Discussione caso" }
      ],
      storicoScore: [
        { data: "2024-01-18", score: 3, parametri: { tosse: 1, dolore: 1, comorbidita: 1 } }
      ]
    }
  ]);

  // Sezione esiti esami rimossa per profilo oncologo

  // Sezione verbali rimossa per profilo oncologo

  // Trova il paziente o genera uno demo
  const findPatient = () => {
    if (!cf) return null;
    
    const patient = patients.find(p => p.cf.toLowerCase().includes(cf.toLowerCase()));
    if (patient) {
      return patient;
    } else {
      // Per la demo, generiamo un paziente mock se non trovato
      return {
        id: 999,
        cognome: "Demo",
        nome: "Paziente",
        cf: cf.toUpperCase(),
        pdta: "Polmone",
        visitaRichiesta: "Visita Oncologica",
        ambulatorio: "Cure Simultanee",
        medicoMittente: "Dr. Bianchi",
        score: Math.floor(Math.random() * 6) + 3, // Score tra 3 e 8
        slotPrenotato: Math.random() > 0.5,
        dataPrenotazione: Math.random() > 0.5 ? "2024-01-25" : null,
        oraPrenotazione: Math.random() > 0.5 ? "10:30" : null,
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
    }
  };

  const patient = findPatient();

  const getScoreColor = (score: number) => {
    if (score >= 7) return "bg-red-100 text-red-800";
    if (score >= 5) return "bg-yellow-100 text-yellow-800";
    return "bg-green-100 text-green-800";
  };

  // Storico visite per ambulatori (mock demo)
  type VisitaAmbulatorio = {
    id: number;
    ambulatorio: string;
    tipo: string;
    codiceRicetta: string;
    dataRichiesta: string;
    stato: "Disdetta" | "Completata" | "Prenotata" | "Da prenotare";
    note?: string;
  };

  const getAmbulatorioVisits = (patientId: number): VisitaAmbulatorio[] => {
    const visits: Record<number, VisitaAmbulatorio[]> = {
      1: [
        { id: 1, ambulatorio: "Cure Simultanee", tipo: "Prima visita", codiceRicetta: "0123456789", dataRichiesta: "2024-01-10", stato: "Completata", note: "Follow-up tra 3 mesi" },
        { id: 2, ambulatorio: "Oncogeriatria", tipo: "Controllo", codiceRicetta: "9876543210", dataRichiesta: "2024-01-18", stato: "Prenotata", note: "Portare esami recenti" },
        { id: 3, ambulatorio: "Osteoncologia", tipo: "Discussione", codiceRicetta: "2233445566", dataRichiesta: "2024-01-22", stato: "Da prenotare" }
      ],
      2: [
        { id: 1, ambulatorio: "Oncogeriatria", tipo: "Radioterapia", codiceRicetta: "1111222233", dataRichiesta: "2024-01-12", stato: "Disdetta", note: "Riprogrammare" }
      ],
      3: [
        { id: 1, ambulatorio: "Cure Simultanee", tipo: "Follow-up", codiceRicetta: "5566778899", dataRichiesta: "2024-01-08", stato: "Completata" }
      ],
      4: [
        { id: 1, ambulatorio: "Osteoncologia", tipo: "Valutazione", codiceRicetta: "0099887766", dataRichiesta: "2024-01-14", stato: "Prenotata" }
      ],
      5: [
        { id: 1, ambulatorio: "Osteoncologia", tipo: "Controllo", codiceRicetta: "3344556677", dataRichiesta: "2024-01-16", stato: "Completata" }
      ],
      6: [
        { id: 1, ambulatorio: "Cure Simultanee", tipo: "Prima visita", codiceRicetta: "7788990011", dataRichiesta: "2024-01-18", stato: "Da prenotare", note: "In attesa di esito" }
      ],
      999: [
        { id: 1, ambulatorio: "Cure Simultanee", tipo: "Prima visita", codiceRicetta: "1234567890", dataRichiesta: "2024-01-20", stato: "Completata" },
        { id: 2, ambulatorio: "Oncogeriatria", tipo: "Controllo", codiceRicetta: "1357913579", dataRichiesta: "2024-01-25", stato: "Prenotata" },
        { id: 3, ambulatorio: "Osteoncologia", tipo: "Discussione", codiceRicetta: "2468024680", dataRichiesta: "2024-01-28", stato: "Da prenotare", note: "Richiesta valutazione multidisciplinare" }
      ]
    };
    return visits[patientId] || [];
  };

  const getStatoBadgeColor = (stato: VisitaAmbulatorio["stato"]) => {
    switch (stato) {
      case "Completata":
        return "bg-green-100 text-green-800";
      case "Prenotata":
        return "bg-blue-100 text-blue-800";
      case "Disdetta":
        return "bg-red-100 text-red-800";
      default:
        return "bg-yellow-100 text-yellow-800"; // Da prenotare
    }
  };

  if (!patient) {
    return (
      <div className="min-h-screen bg-background">
        <OncologoNavbar />
        <div className="container mx-auto px-4 py-4">
          <div className="text-center py-8">
            <h1 className="text-2xl font-bold text-red-600 mb-4">Paziente Non Trovato</h1>
            <p className="text-muted-foreground mb-4">Il codice fiscale inserito non è valido.</p>
            <Button onClick={() => navigate('/oncologico/oncologo')}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Torna al Profilo Oncologo
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <OncologoNavbar />

      <div className="container mx-auto px-4 py-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={() => navigate('/oncologico/oncologo')}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Torna al Profilo
            </Button>
            <div>
              <h1 className="text-2xl font-bold flex items-center gap-2">
                Dettagli Paziente - {patient.cognome} {patient.nome}
                {patient.id === 999 && (
                  <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                    Demo
                  </Badge>
                )}
              </h1>
              <p className="text-muted-foreground">CF: {patient.cf}</p>
            </div>
          </div>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export Dati Paziente
          </Button>
        </div>

        <div className="space-y-6">
          {/* Informazioni generali */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                Informazioni Generali
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3">Dati Personali</h4>
                  <div className="space-y-2 text-sm">
                    <p><strong>Nome:</strong> {patient.nome} {patient.cognome}</p>
                    <p><strong>Codice Fiscale:</strong> {patient.cf}</p>
                    <p><strong>PDTA:</strong> {patient.pdta}</p>
                    <p><strong>Score Attuale:</strong> <Badge className={getScoreColor(patient.score)}>{patient.score}</Badge></p>
                    <p><strong>Comorbidità:</strong> {patient.comorbidita.length > 0 ? patient.comorbidita.join(", ") : "Nessuna"}</p>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-3">Stato Prenotazione</h4>
                  <div className="space-y-2 text-sm">
                    <p><strong>Visita Richiesta:</strong> {patient.visitaRichiesta}</p>
                    <p><strong>Medico Mittente:</strong> {patient.medicoMittente}</p>
                    <p><strong>Ambulatorio:</strong> {patient.ambulatorio}</p>
                    {patient.slotPrenotato ? (
                      <>
                        <p><strong>Stato:</strong> <Badge className="bg-green-100 text-green-800">Prenotato</Badge></p>
                        <p><strong>Data:</strong> {patient.dataPrenotazione}</p>
                        <p><strong>Ora:</strong> {patient.oraPrenotazione}</p>
                      </>
                    ) : (
                      <p><strong>Stato:</strong> <Badge variant="secondary">Da Prenotare</Badge></p>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Storico Score */}
          <Card>
            <CardHeader>
              <CardTitle>Storico Score Clinico</CardTitle>
              <CardDescription>Cronologia delle valutazioni score nel tempo</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {patient.storicoScore.map((scoreEntry, index) => (
                  <div key={index} className="p-4 bg-muted rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">{scoreEntry.data}</span>
                      <Badge className={getScoreColor(scoreEntry.score)}>
                        Score: {scoreEntry.score}
                      </Badge>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Tosse: {scoreEntry.parametri.tosse} | Dolore: {scoreEntry.parametri.dolore} | Comorbidità: {scoreEntry.parametri.comorbidita}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Storico Visite per Ambulatori */}
          <Card>
            <CardHeader>
              <CardTitle>Storico Visite</CardTitle>
              <CardDescription>Visite relative agli ambulatori con stato e note</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {getAmbulatorioVisits(patient.id).map((v) => (
                  <div key={v.id} className="p-4 border rounded-lg">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{v.tipo}</span>
                        <Badge className={getStatoBadgeColor(v.stato)}>{v.stato}</Badge>
                      </div>
                      <span className="text-sm text-muted-foreground">{v.dataRichiesta}</span>
                    </div>
                    <div className="grid md:grid-cols-3 gap-3 text-sm text-muted-foreground mb-1">
                      <div><strong>Ambulatorio:</strong> {v.ambulatorio}</div>
                      <div><strong>Codice Ricetta:</strong> {v.codiceRicetta}</div>
                      <div><strong>Data richiesta:</strong> {v.dataRichiesta}</div>
                    </div>
                    {v.note && (
                      <div className="text-sm bg-muted p-3 rounded">
                        <strong>Note:</strong> {v.note}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Esiti Esami rimossi per profilo oncologo */}

          {/* Verbali Visite rimossi per profilo oncologo */}
        </div>
      </div>
    </div>
  );
};

export default PazienteDetailOncologo;
