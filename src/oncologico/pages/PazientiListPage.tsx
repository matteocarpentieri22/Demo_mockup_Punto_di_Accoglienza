import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";
import { Badge } from "@/shared/components/ui/badge";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/shared/components/ui/table";
import { ArrowLeft, Download, Eye, Users, Search, Filter, FileText } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/components/ui/tabs";
import CaseManagerNavbar from "@/oncologico/components/layout/CaseManagerNavbar";
import { useNavigate } from "react-router-dom";

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

interface StoricoVisita {
  data: string;
  tipo: string;
  medico: string;
  esito: string;
}

interface StoricoScore {
  data: string;
  score: number;
  parametri: Record<string, number>;
}

interface Patient {
  id: number;
  cognome: string;
  nome: string;
  cf: string;
  pdta: string;
  visitaRichiesta: string;
  ambulatorio: string;
  medicoMittente: string;
  score: number | null;
  slotPrenotato: boolean;
  dataPrenotazione: string | null;
  oraPrenotazione: string | null;
  impegnativaPDF: string;
  comorbidita: string[];
  storicoVisite: StoricoVisita[];
  storicoScore: StoricoScore[];
  dataRichiesta?: string;
  tempoRimanente?: string;
}

const PazientiListPage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterAmbulatorio, setFilterAmbulatorio] = useState("tutti");
  const [filterPDTA, setFilterPDTA] = useState("tutti");
  const [filterSlot, setFilterSlot] = useState("tutti");

  // Mock data pazienti ordinati per score
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
      impegnativaPDF: "impegnativa_mario_rossi.pdf",
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
      score: null,
      slotPrenotato: false,
      dataPrenotazione: null,
      oraPrenotazione: null,
      impegnativaPDF: "impegnativa_anna_bianchi.pdf",
      comorbidita: ["Osteoporosi"],
      storicoVisite: [
        { data: "2024-01-12", tipo: "Visita oncologica", medico: "Dr. Verdi", esito: "Programmata radioterapia" }
      ],
      storicoScore: [],
      dataRichiesta: "2024-01-12"
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
      score: null,
      slotPrenotato: true,
      dataPrenotazione: "2024-01-18",
      oraPrenotazione: "14:00",
      impegnativaPDF: "impegnativa_giuseppe_verdi.pdf",
      comorbidita: ["Cardiopatia ischemica", "Diabete tipo 2"],
      storicoVisite: [
        { data: "2024-01-08", tipo: "Visita geriatrica", medico: "Dr. Rossi", esito: "Valutazione completata" },
        { data: "2023-11-20", tipo: "Prima visita", medico: "Dr. Bianchi", esito: "Diagnosi iniziale" }
      ],
      storicoScore: [],
      dataRichiesta: "2024-01-08"
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
      impegnativaPDF: "impegnativa_francesca_neri.pdf",
      comorbidita: ["Epilessia"],
      storicoVisite: [
        { data: "2024-01-14", tipo: "Visita neurologica", medico: "Dr. Bianchi", esito: "In attesa di esami" }
      ],
      storicoScore: [
        { data: "2024-01-14", score: 5, parametri: { tosse: 2, dolore: 1, comorbidita: 2 } }
      ],
      tempoRimanente: "5 giorni rimanenti"
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
      impegnativaPDF: "impegnativa_luigi_ferrari.pdf",
      comorbidita: ["Diverticolosi"],
      storicoVisite: [
        { data: "2024-01-16", tipo: "Visita gastroenterologica", medico: "Dr. Verdi", esito: "Follow-up programmato" }
      ],
      storicoScore: [
        { data: "2024-01-16", score: 4, parametri: { tosse: 1, dolore: 1, comorbidita: 2 } }
      ]
    },
    {
      id: 5.5,
      cognome: "Bianchi",
      nome: "Elena",
      cf: "BNCLNE78F12H501W",
      pdta: "Sarcoma",
      visitaRichiesta: "Discussione",
      ambulatorio: "Osteoncologia",
      medicoMittente: "Dr. Rossi",
      score: 6,
      slotPrenotato: true,
      dataPrenotazione: "2024-01-25",
      oraPrenotazione: null,
      impegnativaPDF: "impegnativa_elena_bianchi.pdf",
      comorbidita: [],
      storicoVisite: [
        { data: "2024-01-18", tipo: "Visita oncologica", medico: "Dr. Rossi", esito: "Discussione caso" }
      ],
      storicoScore: [
        { data: "2024-01-18", score: 6, parametri: { tosse: 2, dolore: 2, comorbidita: 2 } }
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
      impegnativaPDF: "impegnativa_maria_romano.pdf",
      comorbidita: [],
      storicoVisite: [
        { data: "2024-01-18", tipo: "Visita dermatologica", medico: "Dr. Bianchi", esito: "Discussione caso" }
      ],
      storicoScore: [
        { data: "2024-01-18", score: 3, parametri: { tosse: 1, dolore: 1, comorbidita: 1 } }
      ],
      tempoRimanente: "11 giorni rimanenti"
    },
    {
      id: 7,
      cognome: "Conti",
      nome: "Marco",
      cf: "CNTMRC72G07H501A",
      pdta: "Polmone",
      visitaRichiesta: "Oncologica",
      ambulatorio: "Cure Simultanee",
      medicoMittente: "Dr. Verdi",
      score: 10,
      slotPrenotato: false,
      dataPrenotazione: null,
      oraPrenotazione: null,
      impegnativaPDF: "impegnativa_marco_conti.pdf",
      comorbidita: ["BPCO", "Cardiopatia"],
      storicoVisite: [
        { data: "2024-01-19", tipo: "Prima visita", medico: "Dr. Verdi", esito: "Urgente" }
      ],
      storicoScore: [
        { data: "2024-01-19", score: 10, parametri: { tosse: 3, dolore: 3, comorbidita: 4 } }
      ],
      tempoRimanente: "2 giorni rimanenti"
    },
    {
      id: 8,
      cognome: "Santini",
      nome: "Laura",
      cf: "SNTLRA69H08H501B",
      pdta: "Ovaio",
      visitaRichiesta: "Discussione",
      ambulatorio: "Cure Simultanee",
      medicoMittente: "Dr. Rossi",
      score: 6,
      slotPrenotato: true,
      dataPrenotazione: "2024-01-21",
      oraPrenotazione: "11:00",
      impegnativaPDF: "impegnativa_laura_santini.pdf",
      comorbidita: ["Ipertensione"],
      storicoVisite: [
        { data: "2024-01-17", tipo: "Visita ginecologica", medico: "Dr. Rossi", esito: "Discussa" }
      ],
      storicoScore: [
        { data: "2024-01-17", score: 6, parametri: { tosse: 2, dolore: 2, comorbidita: 2 } }
      ]
    },
    {
      id: 9,
      cognome: "Galli",
      nome: "Roberto",
      cf: "GLLRRT75I09H501C",
      pdta: "Sarcoma",
      visitaRichiesta: "Osteoncologica",
      ambulatorio: "Osteoncologia",
      medicoMittente: "Dr. Bianchi",
      score: 7,
      slotPrenotato: false,
      dataPrenotazione: null,
      oraPrenotazione: null,
      impegnativaPDF: "impegnativa_roberto_galli.pdf",
      comorbidita: [],
      storicoVisite: [
        { data: "2024-01-16", tipo: "Visita oncologica", medico: "Dr. Bianchi", esito: "Valutazione" }
      ],
      storicoScore: [
        { data: "2024-01-16", score: 7, parametri: { tosse: 2, dolore: 3, comorbidita: 2 } }
      ],
      tempoRimanente: "1 giorno rimanente"
    },
    {
      id: 10,
      cognome: "Moretti",
      nome: "Silvia",
      cf: "MRTSLV81L10H501D",
      pdta: "Mammella",
      visitaRichiesta: "Oncogeriatrica",
      ambulatorio: "Oncogeriatria",
      medicoMittente: "Dr. Verdi",
      score: null,
      slotPrenotato: true,
      dataPrenotazione: "2024-01-22",
      oraPrenotazione: "15:30",
      impegnativaPDF: "impegnativa_silvia_moretti.pdf",
      comorbidita: ["Osteoporosi", "Ipertensione"],
      storicoVisite: [
        { data: "2024-01-15", tipo: "Visita geriatrica", medico: "Dr. Verdi", esito: "Completata" }
      ],
      storicoScore: [],
      dataRichiesta: "2024-01-15"
    },
    {
      id: 11,
      cognome: "Riva",
      nome: "Alessandro",
      cf: "RVALSX77M11H501E",
      pdta: "Sarcoma",
      visitaRichiesta: "Osteoncologica",
      ambulatorio: "Osteoncologia",
      medicoMittente: "Dr. Rossi",
      score: 9,
      slotPrenotato: false,
      dataPrenotazione: null,
      oraPrenotazione: null,
      impegnativaPDF: "impegnativa_alessandro_riva.pdf",
      comorbidita: [],
      storicoVisite: [
        { data: "2024-01-20", tipo: "Visita oncologica", medico: "Dr. Rossi", esito: "Urgente" }
      ],
      storicoScore: [
        { data: "2024-01-20", score: 9, parametri: { tosse: 3, dolore: 3, comorbidita: 3 } }
      ],
      tempoRimanente: "8 ore rimanenti"
    },
    {
      id: 12,
      cognome: "De Luca",
      nome: "Chiara",
      cf: "DLCCRA83N12H501F",
      pdta: "Pancreas",
      visitaRichiesta: "Oncologica",
      ambulatorio: "Cure Simultanee",
      medicoMittente: "Dr. Bianchi",
      score: 5,
      slotPrenotato: true,
      dataPrenotazione: "2024-01-25",
      oraPrenotazione: "09:00",
      impegnativaPDF: "impegnativa_chiara_de_luca.pdf",
      comorbidita: ["Diabete tipo 1"],
      storicoVisite: [
        { data: "2024-01-15", tipo: "Prima visita", medico: "Dr. Bianchi", esito: "Programmata" }
      ],
      storicoScore: [
        { data: "2024-01-15", score: 5, parametri: { tosse: 2, dolore: 1, comorbidita: 2 } }
      ]
    },
    {
      id: 13,
      cognome: "Martini",
      nome: "Paolo",
      cf: "MRTPLO79O13H501G",
      pdta: "Prostata",
      visitaRichiesta: "Oncogeriatrica",
      ambulatorio: "Oncogeriatria",
      medicoMittente: "Dr. Rossi",
      score: null,
      slotPrenotato: false,
      dataPrenotazione: null,
      oraPrenotazione: null,
      impegnativaPDF: "impegnativa_paolo_martini.pdf",
      comorbidita: ["Ipertensione", "Dislipidemia"],
      storicoVisite: [
        { data: "2024-01-14", tipo: "Visita urologica", medico: "Dr. Rossi", esito: "In attesa" }
      ],
      storicoScore: [],
      dataRichiesta: "2024-01-14"
    },
    {
      id: 14,
      cognome: "Costa",
      nome: "Valentina",
      cf: "CSTVLN85P14H501H",
      pdta: "Ovaio",
      visitaRichiesta: "Discussione",
      ambulatorio: "Cure Simultanee",
      medicoMittente: "Dr. Verdi",
      score: 4,
      slotPrenotato: false,
      dataPrenotazione: null,
      oraPrenotazione: null,
      impegnativaPDF: "impegnativa_valentina_costa.pdf",
      comorbidita: [],
      storicoVisite: [
        { data: "2024-01-14", tipo: "Visita ginecologica", medico: "Dr. Verdi", esito: "Discussione" }
      ],
      storicoScore: [
        { data: "2024-01-14", score: 4, parametri: { tosse: 1, dolore: 2, comorbidita: 1 } }
      ],
      tempoRimanente: "10 giorni rimanenti"
    },
    {
      id: 15,
      cognome: "Leone",
      nome: "Fabio",
      cf: "LNNFBA71Q15H501I",
      pdta: "Sarcoma",
      visitaRichiesta: "Osteoncologica",
      ambulatorio: "Osteoncologia",
      medicoMittente: "Dr. Bianchi",
      score: 8,
      slotPrenotato: true,
      dataPrenotazione: "2024-01-23",
      oraPrenotazione: "14:00",
      impegnativaPDF: "impegnativa_fabio_leone.pdf",
      comorbidita: [],
      storicoVisite: [
        { data: "2024-01-13", tipo: "Visita oncologica", medico: "Dr. Bianchi", esito: "Urgente" }
      ],
      storicoScore: [
        { data: "2024-01-13", score: 8, parametri: { tosse: 2, dolore: 3, comorbidita: 3 } }
      ]
    },
    {
      id: 16,
      cognome: "Fontana",
      nome: "Alessandro",
      cf: "FNTALX78H12H224D",
      pdta: "Polmone",
      visitaRichiesta: "Oncogeriatrica",
      ambulatorio: "Oncogeriatria",
      medicoMittente: "Dr. Bianchi",
      score: null,
      slotPrenotato: true,
      dataPrenotazione: "2024-01-24",
      oraPrenotazione: "10:30",
      impegnativaPDF: "impegnativa_alessandro_fontana.pdf",
      comorbidita: ["BPCO", "Cardiopatia ischemica"],
      storicoVisite: [
        { data: "2024-01-13", tipo: "Visita pneumologica", medico: "Dr. Bianchi", esito: "Completata" }
      ],
      storicoScore: [],
      dataRichiesta: "2024-01-13"
    },
    {
      id: 17,
      cognome: "Greco",
      nome: "Martina",
      cf: "GRCMRT82I18H224E",
      pdta: "Retto",
      visitaRichiesta: "Osteoncologica",
      ambulatorio: "Osteoncologia",
      medicoMittente: "Dr. Verdi",
      score: 6,
      slotPrenotato: false,
      dataPrenotazione: null,
      oraPrenotazione: null,
      impegnativaPDF: "impegnativa_martina_greco.pdf",
      comorbidita: ["Diverticolosi"],
      storicoVisite: [
        { data: "2024-01-12", tipo: "Visita gastroenterologica", medico: "Dr. Verdi", esito: "Valutazione" }
      ],
      storicoScore: [
        { data: "2024-01-12", score: 6, parametri: { tosse: 2, dolore: 2, comorbidita: 2 } }
      ],
      tempoRimanente: "4 giorni rimanenti"
    },
    {
      id: 17.5,
      cognome: "Marino",
      nome: "Giuseppe",
      cf: "MRNGSP76G20H224G",
      pdta: "Sarcoma",
      visitaRichiesta: "Discussione",
      ambulatorio: "Osteoncologia",
      medicoMittente: "Dr. Bianchi",
      score: 5,
      slotPrenotato: false,
      dataPrenotazione: null,
      oraPrenotazione: null,
      impegnativaPDF: "impegnativa_giuseppe_marino.pdf",
      comorbidita: ["Ipertensione"],
      storicoVisite: [
        { data: "2024-01-14", tipo: "Visita oncologica", medico: "Dr. Bianchi", esito: "In attesa discussione" }
      ],
      storicoScore: [
        { data: "2024-01-14", score: 5, parametri: { tosse: 1, dolore: 2, comorbidita: 2 } }
      ],
      tempoRimanente: "6 giorni rimanenti"
    },
    {
      id: 18,
      cognome: "Esposito",
      nome: "Francesco",
      cf: "ESPFNC88D15H224F",
      pdta: "Polmone",
      visitaRichiesta: "Oncologica",
      ambulatorio: "Cure Simultanee",
      medicoMittente: "Dr. Rossi",
      score: 7,
      slotPrenotato: true,
      dataPrenotazione: "2024-01-26",
      oraPrenotazione: "16:00",
      impegnativaPDF: "impegnativa_francesco_esposito.pdf",
      comorbidita: ["Asma"],
      storicoVisite: [
        { data: "2024-01-11", tipo: "Prima visita", medico: "Dr. Rossi", esito: "Programmata" }
      ],
      storicoScore: [
        { data: "2024-01-11", score: 7, parametri: { tosse: 3, dolore: 2, comorbidita: 2 } }
      ]
    },
    {
      id: 19,
      cognome: "Ricci",
      nome: "Sofia",
      cf: "RCCSFA90J25H224G",
      pdta: "Mammella",
      visitaRichiesta: "Oncogeriatrica",
      ambulatorio: "Oncogeriatria",
      medicoMittente: "Dr. Verdi",
      score: null,
      slotPrenotato: false,
      dataPrenotazione: null,
      oraPrenotazione: null,
      impegnativaPDF: "impegnativa_sofia_ricci.pdf",
      comorbidita: ["Ipotiroidismo"],
      storicoVisite: [
        { data: "2024-01-11", tipo: "Visita senologica", medico: "Dr. Verdi", esito: "In attesa" }
      ],
      storicoScore: [],
      dataRichiesta: "2024-01-11"
    },
    {
      id: 20,
      cognome: "Marino",
      nome: "Davide",
      cf: "MRNDVE76K05H224H",
      pdta: "Prostata",
      visitaRichiesta: "Osteoncologica",
      ambulatorio: "Osteoncologia",
      medicoMittente: "Dr. Bianchi",
      score: 3,
      slotPrenotato: true,
      dataPrenotazione: "2024-01-27",
      oraPrenotazione: "11:30",
      impegnativaPDF: "impegnativa_davide_marino.pdf",
      comorbidita: ["Ipertensione"],
      storicoVisite: [
        { data: "2024-01-10", tipo: "Visita urologica", medico: "Dr. Bianchi", esito: "Follow-up" }
      ],
      storicoScore: [
        { data: "2024-01-10", score: 3, parametri: { tosse: 1, dolore: 1, comorbidita: 1 } }
      ]
    }
  ]);

  // Funzione per filtrare pazienti
  const filterPatients = (ambulatorioFilter?: string) => {
    return patients.filter(patient => {
      const matchesSearch = !searchTerm || 
        patient.cognome.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.cf.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesAmbulatorio = ambulatorioFilter 
        ? patient.ambulatorio === ambulatorioFilter
        : (filterAmbulatorio === "tutti" || patient.ambulatorio === filterAmbulatorio);
      
      const matchesPDTA = filterPDTA === "tutti" || 
        patient.pdta === filterPDTA;
      
      const matchesSlot = filterSlot === "tutti" || 
        (filterSlot === "prenotato" && patient.slotPrenotato) ||
        (filterSlot === "da-prenotare" && !patient.slotPrenotato);
      
      return matchesSearch && matchesAmbulatorio && matchesPDTA && matchesSlot;
    });
  };

  // Funzione per ordinare pazienti in base all'ambulatorio
  const sortPatients = (patientsList: Patient[], ambulatorio: string): Patient[] => {
    return [...patientsList].sort((a, b) => {
      // Per Cure Simultanee e Osteoncologia: ordina per score decrescente
      if (ambulatorio !== "Oncogeriatria" && a.score !== null && b.score !== null) {
        return b.score - a.score;
      }
      
      // Per Oncogeriatria: ordina per data richiesta (più recente prima) o alfabeticamente
      if (ambulatorio === "Oncogeriatria") {
        const dateA = a.dataRichiesta || a.storicoVisite?.[0]?.data || "";
        const dateB = b.dataRichiesta || b.storicoVisite?.[0]?.data || "";
        if (dateA && dateB) {
          return new Date(dateB).getTime() - new Date(dateA).getTime();
        }
        return a.cognome.localeCompare(b.cognome);
      }
      
      // Fallback: ordina per score
      if (a.score !== null && b.score !== null) {
        return b.score - a.score;
      }
      return 0;
    });
  };

  // Pazienti filtrati per ambulatorio
  const cureSimultaneePatients = sortPatients(filterPatients("Cure Simultanee"), "Cure Simultanee");
  const oncogeriatriaPatients = sortPatients(filterPatients("Oncogeriatria"), "Oncogeriatria");
  const osteoncologiaPatients = sortPatients(filterPatients("Osteoncologia"), "Osteoncologia");
  
  // Per compatibilità con il resto del codice
  const filteredPatients = filterPatients();

  const handleExportData = () => {
    // Export elenco pazienti
    const csvContent = [
      ["Cognome", "Nome", "CF", "PDTA", "Visita Richiesta", "Medico Mittente", "Score", "Slot Prenotato", "Data Prenotazione", "Ora Prenotazione", "Ambulatorio"],
      ...patients.map(patient => [
        patient.cognome,
        patient.nome,
        patient.cf,
        patient.pdta,
        patient.visitaRichiesta,
        patient.medicoMittente,
        patient.ambulatorio === "Oncogeriatria" ? "-" : (patient.score ?? ""),
        patient.slotPrenotato ? "Sì" : "No",
        patient.dataPrenotazione || "",
        // Per le discussioni in Osteoncologia, non mostrare l'orario
        (patient.ambulatorio === "Osteoncologia" && patient.visitaRichiesta === "Discussione") ? "" : (patient.oraPrenotazione || ""),
        patient.ambulatorio || ""
      ])
    ].map(row => row.join(",")).join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `pazienti_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };


  const getScoreColor = (score: number | null) => {
    if (score === null) return "bg-gray-100 text-gray-600";
    if (score >= 7) return "bg-red-100 text-red-800";
    if (score >= 5) return "bg-yellow-100 text-yellow-800";
    return "bg-green-100 text-green-800";
  };

  // Logica demo: tempi attesi in base allo score
  // - Score 7-10: entro 3 giorni
  // - Score 5-6: entro 7 giorni
  // - Score 1-4: entro 14 giorni
  // - Oncogeriatria (null): non applicabile
  const getDeadlineDays = (score: number | null) => {
    if (score === null) return null; // Oncogeriatria non ha deadline basato su score
    if (score >= 7) return 3;
    if (score >= 5) return 7;
    return 14;
  };

  const isOnTime = (patient: Patient): boolean | null => {
    if (!patient.dataPrenotazione) return false; // non prenotato => non in tempo
    if (patient.ambulatorio === "Oncogeriatria") return null; // Oncogeriatria non ha score, quindi non applicabile
    
    // Per la demo, assumiamo che la richiesta sia la prima data dello storicoScore
    const firstScoreDate = patient.storicoScore?.[0]?.data || patient.dataRichiesta || "2024-01-01";
    const requestDate = new Date(firstScoreDate);
    const bookingDate = new Date(patient.dataPrenotazione);
    const diffDays = Math.ceil((bookingDate.getTime() - requestDate.getTime()) / (1000 * 60 * 60 * 24));
    const deadline = getDeadlineDays(patient.score);
    if (deadline === null) return null;
    return diffDays <= deadline;
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
              <h1 className="text-2xl font-bold">Lista Pazienti</h1>
              <p className="text-muted-foreground">Elenco pazienti ordinato per score clinico (Oncogeriatria senza score)</p>
            </div>
          </div>
          <Button onClick={handleExportData}>
            <Download className="w-4 h-4 mr-2" />
            Export Pazienti
          </Button>
        </div>

        {/* Barra di ricerca e filtri */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex flex-wrap items-center gap-4">
              {/* Ricerca */}
              <div className="flex items-center gap-2 flex-1 min-w-[300px]">
                <Search className="w-4 h-4 text-gray-500" />
                <Input
                  placeholder="Cerca per cognome, nome o codice fiscale..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="flex-1"
                />
              </div>
              
              {/* Il filtro ambulatorio verrà gestito tramite i Tabs */}
              
              {/* Filtro PDTA */}
              <div className="flex items-center gap-2">
                <Label className="text-sm font-medium">PDTA:</Label>
                <Select value={filterPDTA} onValueChange={setFilterPDTA}>
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tutti">Tutti i PDTA</SelectItem>
                    {PDTA_LIST.map((pdta) => (
                      <SelectItem key={pdta} value={pdta}>{pdta}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              {/* Filtro Slot */}
              <div className="flex items-center gap-2">
                <Label className="text-sm font-medium">Slot:</Label>
                <Select value={filterSlot} onValueChange={setFilterSlot}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tutti">Tutti</SelectItem>
                    <SelectItem value="prenotato">Prenotato</SelectItem>
                    <SelectItem value="da-prenotare">Da Prenotare</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Statistiche */}
        <div className="grid md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <Users className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Totale Pazienti</p>
                  <p className="text-xl font-bold">{filteredPatients.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <div className="w-5 h-5 bg-green-600 rounded-full"></div>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Prenotati</p>
                  <p className="text-xl font-bold">{filteredPatients.filter(p => p.slotPrenotato).length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                  <div className="w-5 h-5 bg-yellow-600 rounded-full"></div>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Da Prenotare</p>
                  <p className="text-xl font-bold">{filteredPatients.filter(p => !p.slotPrenotato).length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                  <div className="w-5 h-5 bg-red-600 rounded-full"></div>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Score Alto</p>
                  <p className="text-xl font-bold">{filteredPatients.filter(p => p.score !== null && p.score >= 7).length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs per Ambulatori */}
        <Tabs defaultValue="cure-simultanee" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 h-auto p-1 bg-gray-100 border-2 border-gray-200 rounded-lg">
            <TabsTrigger 
              value="cure-simultanee" 
              className="flex items-center justify-center gap-2 py-4 px-6 text-base font-semibold data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all rounded-md"
            >
              <Users className="w-5 h-5" />
              Cure Simultanee
              <Badge 
                variant="secondary" 
                className="ml-2 px-3 py-1 text-sm font-bold bg-white text-gray-700 border border-gray-300"
              >
                {cureSimultaneePatients.length}
              </Badge>
            </TabsTrigger>
            <TabsTrigger 
              value="oncogeriatria" 
              className="flex items-center justify-center gap-2 py-4 px-6 text-base font-semibold data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all rounded-md"
            >
              <Users className="w-5 h-5" />
              Oncogeriatria
              <Badge 
                variant="secondary" 
                className="ml-2 px-3 py-1 text-sm font-bold bg-white text-gray-700 border border-gray-300"
              >
                {oncogeriatriaPatients.length}
              </Badge>
            </TabsTrigger>
            <TabsTrigger 
              value="osteoncologia" 
              className="flex items-center justify-center gap-2 py-4 px-6 text-base font-semibold data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all rounded-md"
            >
              <Users className="w-5 h-5" />
              Osteoncologia
              <Badge 
                variant="secondary" 
                className="ml-2 px-3 py-1 text-sm font-bold bg-white text-gray-700 border border-gray-300"
              >
                {osteoncologiaPatients.length}
              </Badge>
            </TabsTrigger>
          </TabsList>

          {/* Tabella Cure Simultanee */}
          <TabsContent value="cure-simultanee">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-blue-600" />
                    Cure Simultanee - Elenco Pazienti
                  </CardTitle>
                  <div className="flex items-center gap-4">
                    <div className="text-sm text-muted-foreground">
                      <span className="font-semibold text-blue-600">{cureSimultaneePatients.filter(p => !p.slotPrenotato).length}</span> da prenotare
                    </div>
                    <div className="text-sm text-muted-foreground">
                      <span className="font-semibold text-red-600">{cureSimultaneePatients.filter(p => p.score !== null && p.score >= 7).length}</span> score alto
                    </div>
                  </div>
                </div>
                <CardDescription>
                  Pazienti ordinati per score clinico decrescente (score alto = priorità alta)
                </CardDescription>
              </CardHeader>
              <CardContent>
                {cureSimultaneePatients.length > 0 ? (
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-blue-50">
                        <TableHead className="font-semibold text-gray-700">Cognome</TableHead>
                        <TableHead className="font-semibold text-gray-700">Nome</TableHead>
                        <TableHead className="font-semibold text-gray-700">CF</TableHead>
                        <TableHead className="font-semibold text-gray-700">PDTA</TableHead>
                        <TableHead className="font-semibold text-gray-700 whitespace-nowrap">Medico Richiedente</TableHead>
                        <TableHead className="font-semibold text-gray-700">Score</TableHead>
                        <TableHead className="font-semibold text-gray-700">Slot</TableHead>
                        <TableHead className="font-semibold text-gray-700">Tempo Rimanente</TableHead>
                        <TableHead className="font-semibold text-gray-700">Impegnativa</TableHead>
                        <TableHead className="font-semibold text-gray-700">Azioni</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {cureSimultaneePatients.map((patient) => (
                        <TableRow key={patient.id} className="hover:bg-gray-50 border-b border-gray-100">
                          <TableCell className="font-medium text-gray-900 py-4">{patient.cognome}</TableCell>
                          <TableCell className="text-gray-700 py-4">{patient.nome}</TableCell>
                          <TableCell className="font-mono text-sm text-gray-600 py-4">{patient.cf}</TableCell>
                          <TableCell className="py-4">
                            <Badge className="bg-blue-50 text-blue-700 border-blue-200 px-3 py-1 rounded-full text-sm font-medium">
                              {patient.pdta.toUpperCase()}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-gray-700 py-4">{patient.medicoMittente}</TableCell>
                          <TableCell className="py-4">
                            <Badge className={getScoreColor(patient.score)}>
                              {patient.score}
                            </Badge>
                          </TableCell>
                          <TableCell className="py-4">
                            {patient.slotPrenotato ? (
                              <Badge className="bg-green-50 text-green-700 border-green-200 px-3 py-1 rounded-full text-sm font-medium">
                                Prenotato
                              </Badge>
                            ) : (
                              <Badge className="bg-yellow-50 text-yellow-700 border-yellow-200 px-3 py-1 rounded-full text-sm font-medium">
                                Da Prenotare
                              </Badge>
                            )}
                          </TableCell>
                          <TableCell className="py-4">
                            {patient.slotPrenotato ? (
                              isOnTime(patient) ? (
                                <Badge className="bg-green-100 text-green-800">In tempo</Badge>
                              ) : (
                                <Badge className="bg-red-100 text-red-800">Fuori tempo</Badge>
                              )
                            ) : (
                              <Badge className="bg-blue-100 text-blue-800">{patient.tempoRimanente || "N/D"}</Badge>
                            )}
                          </TableCell>
                          <TableCell className="py-4">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => window.open(`/pdf/${patient.impegnativaPDF}`, '_blank')}
                              className="border-blue-300 text-blue-700 hover:bg-blue-50"
                            >
                              <Eye className="w-3 h-3 mr-1" />
                              PDF
                            </Button>
                          </TableCell>
                          <TableCell className="py-4">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => navigate(`/oncologico/paziente/${patient.cf}`)}
                              className="border-gray-300 text-gray-700 hover:bg-gray-50"
                            >
                              <Eye className="w-4 h-4 mr-1" />
                              Dettagli
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                ) : (
                  <div className="text-center py-8">
                    <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">Nessun paziente trovato per Cure Simultanee</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tabella Oncogeriatria */}
          <TabsContent value="oncogeriatria">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-blue-600" />
                    Oncogeriatria - Elenco Pazienti
                  </CardTitle>
                  <div className="flex items-center gap-4">
                    <div className="text-sm text-muted-foreground">
                      <span className="font-semibold text-blue-600">{oncogeriatriaPatients.filter(p => !p.slotPrenotato).length}</span> da prenotare
                    </div>
                  </div>
                </div>
                <CardDescription>
                  Pazienti ordinati per data richiesta (più recente prima) - Nessun score applicabile
                </CardDescription>
              </CardHeader>
              <CardContent>
                {oncogeriatriaPatients.length > 0 ? (
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-blue-50">
                        <TableHead className="font-semibold text-gray-700">Cognome</TableHead>
                        <TableHead className="font-semibold text-gray-700">Nome</TableHead>
                        <TableHead className="font-semibold text-gray-700">CF</TableHead>
                        <TableHead className="font-semibold text-gray-700">PDTA</TableHead>
                        <TableHead className="font-semibold text-gray-700 whitespace-nowrap">Medico Richiedente</TableHead>
                        <TableHead className="font-semibold text-gray-700">Data Richiesta</TableHead>
                        <TableHead className="font-semibold text-gray-700">Slot</TableHead>
                        <TableHead className="font-semibold text-gray-700">Impegnativa</TableHead>
                        <TableHead className="font-semibold text-gray-700">Azioni</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {oncogeriatriaPatients.map((patient) => (
                        <TableRow key={patient.id} className="hover:bg-gray-50 border-b border-gray-100">
                          <TableCell className="font-medium text-gray-900 py-4">{patient.cognome}</TableCell>
                          <TableCell className="text-gray-700 py-4">{patient.nome}</TableCell>
                          <TableCell className="font-mono text-sm text-gray-600 py-4">{patient.cf}</TableCell>
                          <TableCell className="py-4">
                            <Badge className="bg-blue-50 text-blue-700 border-blue-200 px-3 py-1 rounded-full text-sm font-medium">
                              {patient.pdta.toUpperCase()}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-gray-700 py-4">{patient.medicoMittente}</TableCell>
                          <TableCell className="text-gray-700 py-4">
                            {patient.dataRichiesta || patient.storicoVisite?.[0]?.data || "-"}
                          </TableCell>
                          <TableCell className="py-4">
                            {patient.slotPrenotato ? (
                              <Badge className="bg-green-50 text-green-700 border-green-200 px-3 py-1 rounded-full text-sm font-medium">
                                Prenotato
                              </Badge>
                            ) : (
                              <Badge className="bg-yellow-50 text-yellow-700 border-yellow-200 px-3 py-1 rounded-full text-sm font-medium">
                                Da Prenotare
                              </Badge>
                            )}
                          </TableCell>
                          <TableCell className="py-4">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => window.open(`/pdf/${patient.impegnativaPDF}`, '_blank')}
                              className="border-blue-300 text-blue-700 hover:bg-blue-50"
                            >
                              <Eye className="w-3 h-3 mr-1" />
                              PDF
                            </Button>
                          </TableCell>
                          <TableCell className="py-4">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => navigate(`/oncologico/paziente/${patient.cf}`)}
                              className="border-gray-300 text-gray-700 hover:bg-gray-50"
                            >
                              <Eye className="w-4 h-4 mr-1" />
                              Dettagli
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                ) : (
                  <div className="text-center py-8">
                    <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">Nessun paziente trovato per Oncogeriatria</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tabella Osteoncologia */}
          <TabsContent value="osteoncologia">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-blue-600" />
                    Osteoncologia - Elenco Pazienti
                  </CardTitle>
                  <div className="flex items-center gap-4">
                    <div className="text-sm text-muted-foreground">
                      <span className="font-semibold text-blue-600">{osteoncologiaPatients.filter(p => !p.slotPrenotato).length}</span> da prenotare
                    </div>
                    <div className="text-sm text-muted-foreground">
                      <span className="font-semibold text-red-600">{osteoncologiaPatients.filter(p => p.score !== null && p.score >= 7).length}</span> score alto
                    </div>
                  </div>
                </div>
                <CardDescription>
                  Pazienti ordinati per score clinico decrescente (score alto = priorità alta)
                </CardDescription>
              </CardHeader>
              <CardContent>
                {osteoncologiaPatients.length > 0 ? (
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-blue-50">
                        <TableHead className="font-semibold text-gray-700">Cognome</TableHead>
                        <TableHead className="font-semibold text-gray-700">Nome</TableHead>
                        <TableHead className="font-semibold text-gray-700">CF</TableHead>
                        <TableHead className="font-semibold text-gray-700">PDTA</TableHead>
                        <TableHead className="font-semibold text-gray-700">Tipo</TableHead>
                        <TableHead className="font-semibold text-gray-700 whitespace-nowrap">Medico Richiedente</TableHead>
                        <TableHead className="font-semibold text-gray-700">Score</TableHead>
                        <TableHead className="font-semibold text-gray-700">Slot</TableHead>
                        <TableHead className="font-semibold text-gray-700">Tempo Rimanente</TableHead>
                        <TableHead className="font-semibold text-gray-700">Impegnativa</TableHead>
                        <TableHead className="font-semibold text-gray-700">Azioni</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {osteoncologiaPatients.map((patient) => (
                        <TableRow key={patient.id} className="hover:bg-gray-50 border-b border-gray-100">
                          <TableCell className="font-medium text-gray-900 py-4">{patient.cognome}</TableCell>
                          <TableCell className="text-gray-700 py-4">{patient.nome}</TableCell>
                          <TableCell className="font-mono text-sm text-gray-600 py-4">{patient.cf}</TableCell>
                          <TableCell className="py-4">
                            <Badge className="bg-blue-50 text-blue-700 border-blue-200 px-3 py-1 rounded-full text-sm font-medium">
                              {patient.pdta.toUpperCase()}
                            </Badge>
                          </TableCell>
                          <TableCell className="py-4">
                            {patient.visitaRichiesta === "Discussione" ? (
                              <Badge className="bg-purple-50 text-purple-700 border-purple-200 px-3 py-1 rounded-full text-sm font-medium">
                                Discussione
                              </Badge>
                            ) : (
                              <Badge className="bg-green-50 text-green-700 border-green-200 px-3 py-1 rounded-full text-sm font-medium">
                                Visita
                              </Badge>
                            )}
                          </TableCell>
                          <TableCell className="text-gray-700 py-4">{patient.medicoMittente}</TableCell>
                          <TableCell className="py-4">
                            <Badge className={getScoreColor(patient.score)}>
                              {patient.score}
                            </Badge>
                          </TableCell>
                          <TableCell className="py-4">
                            {patient.slotPrenotato ? (
                              <div className="flex flex-col gap-1">
                                <Badge className="bg-green-50 text-green-700 border-green-200 px-3 py-1 rounded-full text-sm font-medium">
                                  Prenotato
                                </Badge>
                                {patient.dataPrenotazione && (
                                  <span className="text-xs text-gray-600">
                                    {patient.visitaRichiesta === "Discussione" ? (
                                      new Date(patient.dataPrenotazione).toLocaleDateString("it-IT", {
                                        day: "2-digit",
                                        month: "2-digit",
                                        year: "numeric"
                                      })
                                    ) : (
                                      <>
                                        {new Date(patient.dataPrenotazione).toLocaleDateString("it-IT", {
                                          day: "2-digit",
                                          month: "2-digit",
                                          year: "numeric"
                                        })}
                                        {patient.oraPrenotazione && ` - ${patient.oraPrenotazione}`}
                                      </>
                                    )}
                                  </span>
                                )}
                              </div>
                            ) : (
                              <Badge className="bg-yellow-50 text-yellow-700 border-yellow-200 px-3 py-1 rounded-full text-sm font-medium">
                                Da Prenotare
                              </Badge>
                            )}
                          </TableCell>
                          <TableCell className="py-4">
                            {patient.slotPrenotato ? (
                              isOnTime(patient) ? (
                                <Badge className="bg-green-100 text-green-800">In tempo</Badge>
                              ) : (
                                <Badge className="bg-red-100 text-red-800">Fuori tempo</Badge>
                              )
                            ) : (
                              <Badge className="bg-blue-100 text-blue-800">{patient.tempoRimanente || "N/D"}</Badge>
                            )}
                          </TableCell>
                          <TableCell className="py-4">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => window.open(`/pdf/${patient.impegnativaPDF}`, '_blank')}
                              className="border-blue-300 text-blue-700 hover:bg-blue-50"
                            >
                              <Eye className="w-3 h-3 mr-1" />
                              PDF
                            </Button>
                          </TableCell>
                          <TableCell className="py-4">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => navigate(`/oncologico/paziente/${patient.cf}`)}
                              className="border-gray-300 text-gray-700 hover:bg-gray-50"
                            >
                              <Eye className="w-4 h-4 mr-1" />
                              Dettagli
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                ) : (
                  <div className="text-center py-8">
                    <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">Nessun paziente trovato per Osteoncologia</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default PazientiListPage;
