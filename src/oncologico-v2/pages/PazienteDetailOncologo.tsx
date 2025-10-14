import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";
import { Badge } from "@/shared/components/ui/badge";
import { ArrowLeft, Download, Eye, Clock, CheckCircle, AlertCircle, User } from "lucide-react";
import OncologoNavbar from "@/oncologico-v2/components/OncologoNavbar";
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

  // Mock data per esiti esami e verbali
  const getExamResults = (patientId: number) => {
    const examResults = {
      1: [ // Mario Rossi
        { id: 1, tipo: "TC Torace", data: "2024-01-12", esito: "Lesione polmonare destra confermata", stato: "Completato" },
        { id: 2, tipo: "Biopsia", data: "2024-01-14", esito: "Adenocarcinoma polmonare", stato: "Completato" },
        { id: 3, tipo: "PET-CT", data: "2024-01-20", esito: "In corso", stato: "Programmato" }
      ],
      2: [ // Anna Bianchi
        { id: 1, tipo: "Mammografia", data: "2024-01-10", esito: "Lesione sospetta confermata", stato: "Completato" },
        { id: 2, tipo: "Biopsia mammaria", data: "2024-01-12", esito: "Carcinoma duttale invasivo", stato: "Completato" },
        { id: 3, tipo: "RM Mammella", data: "2024-01-25", esito: "In corso", stato: "Programmato" }
      ],
      3: [ // Giuseppe Verdi
        { id: 1, tipo: "PSA", data: "2024-01-08", esito: "Valore elevato (8.5 ng/ml)", stato: "Completato" },
        { id: 2, tipo: "Biopsia prostatica", data: "2024-01-15", esito: "In corso", stato: "Programmato" }
      ],
      4: [ // Francesca Neri
        { id: 1, tipo: "RM Encefalo", data: "2024-01-14", esito: "Lesione cerebrale sospetta", stato: "Completato" },
        { id: 2, tipo: "Biopsia cerebrale", data: "2024-01-22", esito: "In corso", stato: "Programmato" }
      ],
      5: [ // Luigi Ferrari
        { id: 1, tipo: "Colonscopia", data: "2024-01-16", esito: "Polipo maligno confermato", stato: "Completato" },
        { id: 2, tipo: "TC Addome", data: "2024-01-20", esito: "In corso", stato: "Programmato" }
      ],
      6: [ // Maria Romano
        { id: 1, tipo: "Dermoscopia", data: "2024-01-18", esito: "Melanoma sospetto", stato: "Completato" },
        { id: 2, tipo: "Biopsia cutanea", data: "2024-01-25", esito: "In corso", stato: "Programmato" }
      ],
      999: [ // Paziente Demo
        { id: 1, tipo: "TC Torace", data: "2024-01-18", esito: "Lesione polmonare sospetta", stato: "Completato" },
        { id: 2, tipo: "Biopsia", data: "2024-01-22", esito: "In corso", stato: "Programmato" },
        { id: 3, tipo: "Esami ematochimici", data: "2024-01-20", esito: "Valori nella norma", stato: "Completato" }
      ]
    };
    return examResults[patientId as keyof typeof examResults] || [];
  };

  // Mock data per verbali visite
  const getVisitReports = (patientId: number) => {
    const visitReports = {
      1: [ // Mario Rossi
        { id: 1, data: "2024-01-10", tipo: "Prima visita oncologica", medico: "Dr. Bianchi", verbale: "Paziente presenta tosse persistente e dolore toracico. Programmati esami di stadiazione." },
        { id: 2, data: "2023-12-15", tipo: "Visita controllo", medico: "Dr. Verdi", verbale: "Paziente stabile, continuare follow-up trimestrale." }
      ],
      2: [ // Anna Bianchi
        { id: 1, data: "2024-01-12", tipo: "Visita oncologica", medico: "Dr. Verdi", verbale: "Diagnosi di carcinoma mammario confermata. Programmata valutazione per radioterapia." }
      ],
      3: [ // Giuseppe Verdi
        { id: 1, data: "2024-01-08", tipo: "Visita geriatrica", medico: "Dr. Rossi", verbale: "Paziente anziano con multiple comorbidità. Valutazione oncologica in corso." },
        { id: 2, data: "2023-11-20", tipo: "Prima visita", medico: "Dr. Bianchi", verbale: "Sospetto carcinoma prostatico. Richiesti esami diagnostici." }
      ],
      4: [ // Francesca Neri
        { id: 1, data: "2024-01-14", tipo: "Visita neurologica", medico: "Dr. Bianchi", verbale: "Paziente con storia di epilessia presenta nuovi sintomi neurologici. Richiesta RM encefalo." }
      ],
      5: [ // Luigi Ferrari
        { id: 1, data: "2024-01-16", tipo: "Visita gastroenterologica", medico: "Dr. Verdi", verbale: "Follow-up post-intervento. Controllo programmato." }
      ],
      6: [ // Maria Romano
        { id: 1, data: "2024-01-18", tipo: "Visita dermatologica", medico: "Dr. Bianchi", verbale: "Lesione cutanea sospetta. Richiesta biopsia per conferma diagnostica." }
      ],
      999: [ // Paziente Demo
        { id: 1, data: "2024-01-20", tipo: "Prima visita oncologica", medico: "Dr. Bianchi", verbale: "Paziente presenta sintomi respiratori. Programmati esami diagnostici per valutazione." },
        { id: 2, data: "2024-01-15", tipo: "Visita controllo", medico: "Dr. Verdi", verbale: "Follow-up post-diagnosi. Paziente collaborativo e motivato al trattamento." }
      ]
    };
    return visitReports[patientId as keyof typeof visitReports] || [];
  };

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

  if (!patient) {
    return (
      <div className="min-h-screen bg-background">
        <OncologoNavbar />
        <div className="container mx-auto px-4 py-4">
          <div className="text-center py-8">
            <h1 className="text-2xl font-bold text-red-600 mb-4">Paziente Non Trovato</h1>
            <p className="text-muted-foreground mb-4">Il codice fiscale inserito non è valido.</p>
            <Button onClick={() => navigate('/oncologico-v2/oncologo')}>
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
            <Button variant="ghost" size="sm" onClick={() => navigate('/oncologico-v2/oncologo')}>
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

          {/* Storico Visite */}
          <Card>
            <CardHeader>
              <CardTitle>Storico Visite</CardTitle>
              <CardDescription>Cronologia delle visite effettuate</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {patient.storicoVisite.map((visita, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <span className="font-medium">{visita.tipo}</span>
                      <span className="text-sm text-muted-foreground">{visita.data}</span>
                    </div>
                    <div className="text-sm text-muted-foreground mb-2">
                      Medico: {visita.medico}
                    </div>
                    <div className="text-sm">
                      <strong>Esito:</strong> {visita.esito}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Esiti Esami */}
          <Card>
            <CardHeader>
              <CardTitle>Esiti Esami</CardTitle>
              <CardDescription>Risultati degli esami diagnostici</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {getExamResults(patient.id).map((esame) => (
                  <div key={esame.id} className="p-4 border rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <span className="font-medium">{esame.tipo}</span>
                      <Badge variant={esame.stato === "Completato" ? "default" : "secondary"}>
                        {esame.stato}
                      </Badge>
                    </div>
                    <div className="text-sm text-muted-foreground mb-2">
                      Data: {esame.data}
                    </div>
                    <div className="text-sm">
                      <strong>Esito:</strong> {esame.esito}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Verbali Visite */}
          <Card>
            <CardHeader>
              <CardTitle>Verbali Visite</CardTitle>
              <CardDescription>Documenti completi delle visite</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {getVisitReports(patient.id).map((verbale) => (
                  <div key={verbale.id} className="p-4 border rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <span className="font-medium">{verbale.tipo}</span>
                      <span className="text-sm text-muted-foreground">{verbale.data}</span>
                    </div>
                    <div className="text-sm text-muted-foreground mb-2">
                      Medico: {verbale.medico}
                    </div>
                    <div className="text-sm bg-muted p-3 rounded">
                      <strong>Verbale:</strong> {verbale.verbale}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PazienteDetailOncologo;
