import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";
import { Badge } from "@/shared/components/ui/badge";
import { Label } from "@/shared/components/ui/label";
import { ArrowLeft, FileText, User, Calendar, Calculator, Clock, CheckCircle, AlertCircle, Eye, Download } from "lucide-react";
import OncologoNavbar from "@/oncologico/components/layout/OncologoNavbar";
import { useNavigate, useParams } from "react-router-dom";

interface ScoreDetails {
  psKarnofsky?: string;
  psOsteo?: string;
  sopravvivenza?: string;
  sintomi?: string[];
  segniSintomi?: string;
  metastasiViscerali?: string;
  nMetastasiVertebrali?: string;
  sedeMalattiaPrimitiva?: string;
  compressioneMidollare?: boolean;
  fratturaPatologica?: boolean;
  trattamenti?: string;
  tossicita?: string;
  problemiSocio?: string;
  tosse?: number;
  dolore?: number;
  comorbidita?: number;
}

interface CureSimultaneeData {
  psKarnofsky?: string;
  sintomi?: string[];
  sopravvivenza?: string;
  trattamenti?: string;
  tossicita?: string;
  problemiSocio?: string;
}

interface OsteoncologiaData {
  uoRiferimento?: string;
  altroUo?: string;
  sopravvivenzaOsteo?: string;
  quesitoTeam?: string;
  richiestaPer?: string[];
}

interface OutputValutazioneGeriatrica {
  programmaAttuabile?: boolean;
  presaInCaricoGeriatrica?: boolean;
  tempisticaGeriatrica?: string;
  presaInCaricoAltroSpecialista?: boolean;
  altroSpecialista?: string;
  rischioCognitiveImpairment?: string;
  demenzaAltro?: string;
  revisionePolifarmacoterapia?: boolean;
  tipoRevisione?: string;
  serviziDomiciliari?: boolean;
  altroOutput?: string;
}

interface OncogeriatriaData {
  stadio?: string;
  finalitaTrattamento?: string;
  ecogPS?: string;
  punteggioG8?: string;
  esitoVGM?: string;
  propostaTerapeutica?: string;
  prognosiOncologica?: string;
  finalitaTerapiaOncologica?: string[];
  tossicitaEmatologica?: string;
  tossicitaExtraEmatologica?: string;
  quesitiGeriatra?: string[];
  altroQuesitoGeriatra?: string;
  outputValutazioneGeriatrica?: OutputValutazioneGeriatrica;
}

interface Richiesta {
  id: number;
  cf: string;
  paziente: string;
  pdta: string;
  ambulatorio: string;
  quesito: string;
  score: number | null;
  scoreDetails?: ScoreDetails;
  cureSimultaneeData?: CureSimultaneeData;
  osteoncologiaData?: OsteoncologiaData;
  oncogeriatriaData?: OncogeriatriaData;
  dataRichiesta: string;
  oraRichiesta: string;
  stato: string;
  medico: string;
  codiceRicetta: string;
  impegnativaPDF: string;
  urgenzaLevel?: string;
  urgenzaMessage?: string;
}

// Mock data richieste (stesso array della pagina principale)
const RICHIESTE_DATA = [
  {
    id: 1,
    cf: "RSSMRA80A01H501U",
    paziente: "Mario Rossi",
    pdta: "Polmone",
    ambulatorio: "Cure Simultanee",
    quesito: "Valutazione per stadiazione carcinoma polmonare non a piccole cellule. Paziente presenta nodulo polmonare destro di 3.5 cm con possibile coinvolgimento linfonodale ilare.",
    score: 8,
    scoreDetails: { 
      psKarnofsky: "50-60",
      sintomi: ["Dispnea", "Calo Ponderale"],
      sopravvivenza: "6-12 mesi",
      trattamenti: "si",
      tossicita: "Mucosite",
      problemiSocio: "Rete famigliare scarsa"
    },
    cureSimultaneeData: {
      psKarnofsky: "50-60",
      sintomi: ["Dispnea", "Calo Ponderale"],
      sopravvivenza: "6-12 mesi",
      trattamenti: "si",
      tossicita: "Mucosite",
      problemiSocio: "Rete famigliare scarsa"
    },
    dataRichiesta: "2024-01-20",
    oraRichiesta: "14:30",
    stato: "in_attesa",
    medico: "Dr. Carlo Bianchi",
    codiceRicetta: "123456789",
    impegnativaPDF: "impegnativa_mario_rossi.pdf"
  },
  {
    id: 2,
    cf: "BNCNNA75B02H501V",
    paziente: "Anna Bianchi",
    pdta: "Mammella",
    ambulatorio: "Oncogeriatria",
    quesito: "Discussione caso per carcinoma mammario triplo negativo. Paziente di 75 anni con massa mammaria sinistra di 2.8 cm, linfonodi ascellari sospetti.",
    score: null,
    scoreDetails: {},
    oncogeriatriaData: {
      stadio: "localmente avanzato",
      finalitaTrattamento: "curativo",
      ecogPS: "1",
      punteggioG8: "14",
      esitoVGM: "vulnerabile",
      propostaTerapeutica: "terapia standard - dosi ridotte (eventualmente da aumentare)",
      prognosiOncologica: "12-24 mesi",
      finalitaTerapiaOncologica: ["Aumento OS / PFS", "Miglioramento sintomi / qualità di vita"],
      tossicitaEmatologica: "35",
      tossicitaExtraEmatologica: "20",
      quesitiGeriatra: [
        "Attuabilità programma proposto",
        "Necessità di presa in carico durante la terapia: Geriatrica",
        "Valutazione rischio cognitive impairment",
        "Revisione polifarmacoterapia"
      ],
      altroQuesitoGeriatra: "",
      outputValutazioneGeriatrica: {
        programmaAttuabile: true,
        presaInCaricoGeriatrica: true,
        tempisticaGeriatrica: "Ogni 2 settimane durante terapia",
        presaInCaricoAltroSpecialista: false,
        altroSpecialista: "",
        rischioCognitiveImpairment: "moderato",
        demenzaAltro: "",
        revisionePolifarmacoterapia: true,
        tipoRevisione: "farmaci modificati, stesso numero totale",
        serviziDomiciliari: false,
        altroOutput: ""
      }
    },
    dataRichiesta: "2024-01-20",
    oraRichiesta: "16:45",
    stato: "approvata",
    medico: "Dr. Elena Verdi",
    codiceRicetta: "987654321",
    impegnativaPDF: "impegnativa_anna_bianchi.pdf"
  },
  {
    id: 3,
    cf: "VRDGPP70C03H501W",
    paziente: "Giuseppe Verdi",
    pdta: "Prostata",
    ambulatorio: "Oncogeriatria",
    quesito: "Valutazione oncogeriatrica per carcinoma prostatico ad alto rischio. PSA 15.2 ng/ml, Gleason score 8, T3aN0M0.",
    score: 6,
    scoreDetails: { tosse: 2, dolore: 2, comorbidita: 2 },
    dataRichiesta: "2024-01-19",
    oraRichiesta: "11:20",
    stato: "in_attesa",
    medico: "Dr. Marco Rossi",
    codiceRicetta: "456789123",
    impegnativaPDF: "impegnativa_giuseppe_verdi.pdf"
  },
  {
    id: 4,
    cf: "NRIFNC85D04H501X",
    paziente: "Francesca Neri",
    pdta: "Sistema nervoso centrale",
    ambulatorio: "Osteoncologia",
    quesito: "Valutazione per lesione cerebrale sospetta. RMN encefalo mostra lesione iperintensa di 1.8 cm nel lobo frontale sinistro con enhancement contrastografico.",
    score: 5,
    scoreDetails: { 
      psOsteo: "80",
      segniSintomi: "Dolore scheletrico",
      metastasiViscerali: "Oligometastasi viscerali",
      nMetastasiVertebrali: "2",
      sedeMalattiaPrimitiva: "Rene, colon, retto, ginecologici",
      compressioneMidollare: false,
      fratturaPatologica: false
    },
    osteoncologiaData: {
      uoRiferimento: "UOC Oncologia 1",
      altroUo: "",
      sopravvivenzaOsteo: "6-12 mesi",
      quesitoTeam: "Valutazione necessaria per definire strategia terapeutica",
      richiestaPer: ["visita", "discussione"]
    },
    urgenzaLevel: "1-5",
    urgenzaMessage: "Programmazione entro 30 giorni",
    dataRichiesta: "2024-01-19",
    oraRichiesta: "09:15",
    stato: "rifiutata",
    medico: "Dr. Carlo Bianchi",
    codiceRicetta: "789123456",
    impegnativaPDF: "impegnativa_francesca_neri.pdf"
  },
  {
    id: 5,
    cf: "FRRLGI65E05H501Y",
    paziente: "Luigi Ferrari",
    pdta: "Colon",
    ambulatorio: "Osteoncologia",
    quesito: "Follow-up post-intervento chirurgico per adenocarcinoma del colon. Resezione anteriore bassa eseguita 6 mesi fa, stadio pT3N1M0.",
    score: 4,
    scoreDetails: { 
      psOsteo: "100-90",
      segniSintomi: "Nessuno",
      metastasiViscerali: "Oligometastasi viscerali",
      nMetastasiVertebrali: "0-1",
      sedeMalattiaPrimitiva: "Rene, colon, retto, ginecologici",
      compressioneMidollare: false,
      fratturaPatologica: false
    },
    osteoncologiaData: {
      uoRiferimento: "UOC Oncologia 2",
      altroUo: "",
      sopravvivenzaOsteo: ">24 mesi",
      quesitoTeam: "Follow-up post-chirurgico, valutazione necessaria",
      richiestaPer: ["visita"]
    },
    urgenzaLevel: "1-5",
    urgenzaMessage: "Programmazione entro 30 giorni",
    dataRichiesta: "2024-01-18",
    oraRichiesta: "15:30",
    stato: "approvata",
    medico: "Dr. Elena Verdi",
    codiceRicetta: "321654987",
    impegnativaPDF: "impegnativa_luigi_ferrari.pdf"
  },
  {
    id: 6,
    cf: "RMNLNE88F06H501Z",
    paziente: "Elena Romano",
    pdta: "Mammella",
    ambulatorio: "Cure Simultanee",
    quesito: "Valutazione per carcinoma mammario HER2 positivo. Paziente giovane con massa di 4.2 cm, metastasi linfonodali multiple.",
    score: 9,
    scoreDetails: { 
      psKarnofsky: "50-60",
      sintomi: ["Dolore", "Dispnea", "Ansia Depressione"],
      sopravvivenza: "≤ 6 mesi",
      trattamenti: "No",
      tossicita: "Ematologica",
      problemiSocio: "Inadeguato supporto"
    },
    cureSimultaneeData: {
      psKarnofsky: "50-60",
      sintomi: ["Dolore", "Dispnea", "Ansia Depressione"],
      sopravvivenza: "≤ 6 mesi",
      trattamenti: "No",
      tossicita: "Ematologica",
      problemiSocio: "Inadeguato supporto"
    },
    dataRichiesta: "2024-01-18",
    oraRichiesta: "13:45",
    stato: "in_attesa",
    medico: "Dr. Marco Rossi",
    codiceRicetta: "654321987",
    impegnativaPDF: "impegnativa_elena_romano.pdf"
  },
  {
    id: 7,
    cf: "CNTMRC72G07H501A",
    paziente: "Marco Conti",
    pdta: "Polmone",
    ambulatorio: "Oncogeriatria",
    quesito: "Valutazione per carcinoma polmonare a piccole cellule. Paziente di 72 anni con massa mediastinica estesa e coinvolgimento pleurico.",
    score: 7,
    scoreDetails: { tosse: 3, dolore: 2, comorbidita: 2 },
    dataRichiesta: "2024-01-17",
    oraRichiesta: "10:30",
    stato: "approvata",
    medico: "Dr. Carlo Bianchi",
    codiceRicetta: "147258369",
    impegnativaPDF: "impegnativa_marco_conti.pdf"
  },
  {
    id: 8,
    cf: "SNTLRA69H08H501B",
    paziente: "Laura Santini",
    pdta: "Ovaio",
    ambulatorio: "Cure Simultanee",
    quesito: "Discussione caso per carcinoma ovarico avanzato. Stadio FIGO IIIc con carcinosi peritoneale estesa, CA-125 850 U/ml.",
    score: 8,
    scoreDetails: { 
      psKarnofsky: ">70",
      sintomi: ["Dolore", "Iporessia"],
      sopravvivenza: "6-12 mesi",
      trattamenti: "No",
      tossicita: "Altro",
      problemiSocio: "Limitazioni assistenziali"
    },
    cureSimultaneeData: {
      psKarnofsky: ">70",
      sintomi: ["Dolore", "Iporessia"],
      sopravvivenza: "6-12 mesi",
      trattamenti: "No",
      tossicita: "Altro",
      problemiSocio: "Limitazioni assistenziali"
    },
    dataRichiesta: "2024-01-17",
    oraRichiesta: "14:20",
    stato: "in_attesa",
    medico: "Dr. Elena Verdi",
    codiceRicetta: "258369147",
    impegnativaPDF: "impegnativa_laura_santini.pdf"
  },
  {
    id: 9,
    cf: "GLLRRT75I09H501C",
    paziente: "Roberto Galli",
    pdta: "Sarcoma",
    ambulatorio: "Osteoncologia",
    quesito: "Valutazione per sarcoma dei tessuti molli della coscia. Lesione di 8.5 cm con possibile coinvolgimento vascolare e nervoso.",
    score: 6,
    scoreDetails: { 
      psOsteo: "≤ 70",
      segniSintomi: "Sintomi da compressione",
      metastasiViscerali: "Nessuna viscerale",
      nMetastasiVertebrali: "0-1",
      sedeMalattiaPrimitiva: "Altre sedi",
      compressioneMidollare: false,
      fratturaPatologica: true
    },
    osteoncologiaData: {
      uoRiferimento: "Radioterapia",
      altroUo: "",
      sopravvivenzaOsteo: "≥12 mesi",
      quesitoTeam: "Necessaria valutazione multidisciplinare per definire approccio terapeutico",
      richiestaPer: ["discussione"]
    },
    urgenzaLevel: "URG",
    urgenzaMessage: "Primo ambulatorio utile (intanto contattare ortopedico e/o RT per valutazione urgente del paziente)",
    dataRichiesta: "2024-01-16",
    oraRichiesta: "16:10",
    stato: "rifiutata",
    medico: "Dr. Marco Rossi",
    codiceRicetta: "369147258",
    impegnativaPDF: "impegnativa_roberto_galli.pdf"
  },
  {
    id: 10,
    cf: "MRTSLV81L10H501D",
    paziente: "Silvia Moretti",
    pdta: "Mammella",
    ambulatorio: "Oncogeriatria",
    quesito: "Follow-up per carcinoma mammario luminale A. Mastectomia radicale eseguita 2 anni fa, attualmente in terapia ormonale con tamoxifene.",
    score: 3,
    scoreDetails: { tosse: 1, dolore: 1, comorbidita: 1 },
    dataRichiesta: "2024-01-16",
    oraRichiesta: "11:45",
    stato: "approvata",
    medico: "Dr. Carlo Bianchi",
    codiceRicetta: "741852963",
    impegnativaPDF: "impegnativa_silvia_moretti.pdf"
  },
  {
    id: 11,
    cf: "RVALSX77M11H501E",
    paziente: "Alessandro Riva",
    pdta: "Sarcoma",
    ambulatorio: "Osteoncologia",
    quesito: "Valutazione per osteosarcoma del femore distale. Paziente giovane con lesione osteolitica di 6.2 cm e frattura patologica.",
    score: 7,
    scoreDetails: { tosse: 2, dolore: 3, comorbidita: 2 },
    dataRichiesta: "2024-01-15",
    oraRichiesta: "15:00",
    stato: "in_attesa",
    medico: "Dr. Elena Verdi",
    codiceRicetta: "852963741",
    impegnativaPDF: "impegnativa_alessandro_riva.pdf"
  },
  {
    id: 12,
    cf: "DLCCRA83N12H501F",
    paziente: "Chiara De Luca",
    pdta: "Pancreas",
    ambulatorio: "Cure Simultanee",
    quesito: "Valutazione per adenocarcinoma pancreatico. Massa cefalica di 3.8 cm con coinvolgimento vascolare e possibile metastasi epatiche.",
    score: 8,
    scoreDetails: { tosse: 2, dolore: 3, comorbidita: 3 },
    dataRichiesta: "2024-01-15",
    oraRichiesta: "09:30",
    stato: "approvata",
    medico: "Dr. Marco Rossi",
    codiceRicetta: "963741852",
    impegnativaPDF: "impegnativa_chiara_de_luca.pdf"
  },
  {
    id: 13,
    cf: "MRTPLO79O13H501G",
    paziente: "Paolo Martini",
    pdta: "Prostata",
    ambulatorio: "Oncogeriatria",
    quesito: "Follow-up per carcinoma prostatico localizzato. Prostatectomia radicale eseguita 18 mesi fa, PSA indosabile, continenza recuperata.",
    score: 2,
    scoreDetails: { tosse: 0, dolore: 1, comorbidita: 1 },
    dataRichiesta: "2024-01-14",
    oraRichiesta: "14:15",
    stato: "approvata",
    medico: "Dr. Carlo Bianchi",
    codiceRicetta: "159753486",
    impegnativaPDF: "impegnativa_paolo_martini.pdf"
  },
  {
    id: 14,
    cf: "CSTVLN85P14H501H",
    paziente: "Valentina Costa",
    pdta: "Ovaio",
    ambulatorio: "Cure Simultanee",
    quesito: "Valutazione per carcinoma ovarico borderline. Cisti ovarica bilaterale di 12 cm con aspetti sospetti all'ecografia.",
    score: 5,
    scoreDetails: { tosse: 1, dolore: 2, comorbidita: 2 },
    dataRichiesta: "2024-01-14",
    oraRichiesta: "16:30",
    stato: "in_attesa",
    medico: "Dr. Elena Verdi",
    codiceRicetta: "357159486",
    impegnativaPDF: "impegnativa_valentina_costa.pdf"
  },
  {
    id: 15,
    cf: "LNNFBA71Q15H501I",
    paziente: "Fabio Leone",
    pdta: "Sarcoma",
    ambulatorio: "Osteoncologia",
    quesito: "Valutazione per condrosarcoma della scapola. Lesione osteolitica di 4.5 cm con distruzione corticale e coinvolgimento dei tessuti molli.",
    score: 6,
    scoreDetails: { tosse: 1, dolore: 3, comorbidita: 2 },
    dataRichiesta: "2024-01-13",
    oraRichiesta: "12:00",
    stato: "rifiutata",
    medico: "Dr. Marco Rossi",
    codiceRicetta: "486357159",
    impegnativaPDF: "impegnativa_fabio_leone.pdf"
  },
  {
    id: 16,
    cf: "FNTALX78H12H224D",
    paziente: "Alessandro Fontana",
    pdta: "Polmone",
    ambulatorio: "Oncogeriatria",
    quesito: "Valutazione per carcinoma polmonare a piccole cellule esteso. Massa mediastinica di 7.2 cm con sindrome della vena cava superiore.",
    score: 9,
    scoreDetails: { tosse: 3, dolore: 3, comorbidita: 3 },
    dataRichiesta: "2024-01-13",
    oraRichiesta: "08:45",
    stato: "approvata",
    medico: "Dr. Carlo Bianchi",
    codiceRicetta: "222333444",
    impegnativaPDF: "impegnativa_alessandro_fontana.pdf"
  },
  {
    id: 17,
    cf: "GRCMRT82I18H224E",
    paziente: "Martina Greco",
    pdta: "Retto",
    ambulatorio: "Osteoncologia",
    quesito: "Valutazione per carcinoma del retto T3N1M0. Massa di 4.8 cm con coinvolgimento della fascia mesorettale e linfonodi sospetti.",
    score: 7,
    scoreDetails: { tosse: 2, dolore: 3, comorbidita: 2 },
    dataRichiesta: "2024-01-12",
    oraRichiesta: "12:00",
    stato: "in_attesa",
    medico: "Dr. Elena Verdi",
    codiceRicetta: "555666777",
    impegnativaPDF: "impegnativa_martina_greco.pdf"
  },
  {
    id: 18,
    cf: "RSSGPP73J25H224F",
    paziente: "Giuseppe Rossi",
    pdta: "Vescica",
    ambulatorio: "Oncogeriatria",
    quesito: "Valutazione per carcinoma vescicale muscolo-invasivo. Lesione di 3.2 cm con coinvolgimento del muscolo detrusore.",
    score: 6,
    scoreDetails: { tosse: 2, dolore: 2, comorbidita: 2 },
    dataRichiesta: "2024-01-12",
    oraRichiesta: "10:30",
    stato: "approvata",
    medico: "Dr. Marco Rossi",
    codiceRicetta: "888999000",
    impegnativaPDF: "impegnativa_giuseppe_rossi.pdf"
  },
  {
    id: 19,
    cf: "BNCMRT76K30H224G",
    paziente: "Martina Bianchi",
    pdta: "Mammella",
    ambulatorio: "Cure Simultanee",
    quesito: "Valutazione per carcinoma mammario triplo positivo. Massa di 2.5 cm con coinvolgimento linfonodale ascellare e possibile metastasi ossee.",
    score: 8,
    scoreDetails: { tosse: 2, dolore: 3, comorbidita: 3 },
    dataRichiesta: "2024-01-11",
    oraRichiesta: "15:45",
    stato: "in_attesa",
    medico: "Dr. Carlo Bianchi",
    codiceRicetta: "111222333",
    impegnativaPDF: "impegnativa_martina_bianchi.pdf"
  },
  {
    id: 20,
    cf: "VRDALX79L05H224H",
    paziente: "Alessandro Verdi",
    pdta: "Polmone",
    ambulatorio: "Osteoncologia",
    quesito: "Valutazione per carcinoma polmonare non a piccole cellule con mutazione EGFR. Nodulo di 2.8 cm nel lobo superiore destro.",
    score: 5,
    scoreDetails: { tosse: 2, dolore: 2, comorbidita: 1 },
    dataRichiesta: "2024-01-11",
    oraRichiesta: "11:20",
    stato: "rifiutata",
    medico: "Dr. Elena Verdi",
    codiceRicetta: "444555666",
    impegnativaPDF: "impegnativa_alessandro_verdi.pdf"
  }
];

const RichiestaDetailPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [richiesta, setRichiesta] = useState<Richiesta | null>(null);

  useEffect(() => {
    const richiestaId = parseInt(id || "0");
    const foundRichiesta = RICHIESTE_DATA.find(r => r.id === richiestaId);
    setRichiesta(foundRichiesta || null);
  }, [id]);

  const getStatoColor = (stato: string) => {
    switch (stato) {
      case "approvata":
        return "bg-green-100 text-green-800 border-green-200";
      case "in_attesa":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "rifiutata":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatoLabel = (stato: string) => {
    switch (stato) {
      case "approvata":
        return "Approvata";
      case "in_attesa":
        return "In Attesa";
      case "rifiutata":
        return "Rifiutata";
      default:
        return stato;
    }
  };

  const getStatoIcon = (stato: string) => {
    switch (stato) {
      case "approvata":
        return <CheckCircle className="w-4 h-4" />;
      case "in_attesa":
        return <Clock className="w-4 h-4" />;
      case "rifiutata":
        return <AlertCircle className="w-4 h-4" />;
      default:
        return <FileText className="w-4 h-4" />;
    }
  };

  const handleViewPDF = () => {
    // Simula l'apertura del PDF in una nuova finestra
    window.open(`/pdf/${richiesta.impegnativaPDF}`, '_blank');
  };

  const handleDownloadPDF = () => {
    // Simula il download del PDF
    const link = document.createElement('a');
    link.href = `/pdf/${richiesta.impegnativaPDF}`;
    link.download = richiesta.impegnativaPDF;
    link.click();
  };

  if (!richiesta) {
    return (
      <div className="min-h-screen bg-background">
        <OncologoNavbar />
        <div className="container mx-auto px-4 py-8">
          <Card>
            <CardContent className="p-8 text-center">
              <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Richiesta Non Trovata</h3>
              <p className="text-gray-500 mb-4">La richiesta con ID {id} non è stata trovata.</p>
              <Button onClick={() => navigate('/oncologico/oncologo/richieste')}>
                Torna alle Richieste
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <OncologoNavbar />

      <div className="container mx-auto px-4 py-6 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" onClick={() => navigate('/oncologico/oncologo/richieste')} className="hover:bg-muted">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Indietro
              </Button>
            </div>
            <Badge className={`${getStatoColor(richiesta.stato)} px-4 py-2 text-sm font-medium flex items-center gap-2 shadow-sm`}>
              {getStatoIcon(richiesta.stato)}
              {getStatoLabel(richiesta.stato)}
            </Badge>
          </div>
          <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl p-6 border border-indigo-100 shadow-sm">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center shadow-lg">
                  <FileText className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3 mb-1">
                    Richiesta #{richiesta.id}
                  </h1>
                  <p className="text-muted-foreground font-mono text-sm mb-2">Paziente: {richiesta.paziente}</p>
                  <div className="flex items-center gap-4 mt-2">
                    <Badge className="bg-indigo-100 text-indigo-800 border-indigo-200">
                      {richiesta.pdta}
                    </Badge>
                    <Badge className="bg-blue-100 text-blue-800 border-blue-200">
                      {richiesta.ambulatorio}
                    </Badge>
                    {richiesta.score !== null && (
                      <Badge className="bg-purple-100 text-purple-800 border-purple-200">
                        Score: {richiesta.score}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Informazioni Principali */}
          <div className="lg:col-span-2 space-y-6">
            {/* Informazioni Paziente */}
            <Card className="shadow-md border-0">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <User className="w-5 h-5 text-blue-600" />
                  </div>
                  Informazioni Paziente
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">Nome Completo</p>
                    <p className="text-base font-semibold text-gray-900">{richiesta.paziente}</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">Codice Fiscale</p>
                    <p className="text-base font-mono text-gray-900">{richiesta.cf}</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">PDTA di Riferimento</p>
                    <Badge className="bg-indigo-100 text-indigo-800 border-indigo-200 text-sm px-3 py-1">
                      {richiesta.pdta}
                    </Badge>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">Ambulatorio</p>
                    <Badge className="bg-blue-100 text-blue-800 border-blue-200 text-sm px-3 py-1">
                      {richiesta.ambulatorio}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quesito Diagnostico */}
            <Card className="shadow-md border-0">
              <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 border-b">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                    <FileText className="w-5 h-5 text-green-600" />
                  </div>
                  Quesito Diagnostico
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="p-5 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border-2 border-green-200 shadow-sm">
                  <p className="text-gray-900 leading-relaxed text-base italic">"{richiesta.quesito}"</p>
                </div>
              </CardContent>
            </Card>

            {/* Dettagli specifici per Cure Simultanee */}
            {richiesta.ambulatorio === "Cure Simultanee" && richiesta.cureSimultaneeData && (
              <Card className="shadow-md border-0">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50 border-b">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                      <FileText className="w-5 h-5 text-blue-600" />
                    </div>
                    Dettagli Cure Simultanee
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    {richiesta.cureSimultaneeData.psKarnofsky && (
                      <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">PS (Karnofsky)</p>
                        <p className="text-base font-semibold text-gray-900">{richiesta.cureSimultaneeData.psKarnofsky}</p>
                      </div>
                    )}
                    {richiesta.cureSimultaneeData.sopravvivenza && (
                      <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">Sopravvivenza stimata</p>
                        <p className="text-base font-semibold text-gray-900">{richiesta.cureSimultaneeData.sopravvivenza}</p>
                      </div>
                    )}
                    {richiesta.cureSimultaneeData.sintomi && richiesta.cureSimultaneeData.sintomi.length > 0 && (
                      <div className="col-span-2 p-3 bg-gray-50 rounded-lg border border-gray-200">
                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">Sintomi (anche associati)</p>
                        <div className="flex flex-wrap gap-2">
                          {richiesta.cureSimultaneeData.sintomi.map((s: string, idx: number) => (
                            <Badge key={idx} className="bg-blue-50 text-blue-700 border-blue-200">
                              {s}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                    {richiesta.cureSimultaneeData.trattamenti && (
                      <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">Trattamenti con impatto sulla sopravvivenza</p>
                        <p className="text-base font-semibold text-gray-900">{richiesta.cureSimultaneeData.trattamenti}</p>
                      </div>
                    )}
                    {richiesta.cureSimultaneeData.tossicita && (
                      <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">Tossicità attesa</p>
                        <p className="text-base font-semibold text-gray-900">{richiesta.cureSimultaneeData.tossicita}</p>
                      </div>
                    )}
                    {richiesta.cureSimultaneeData.problemiSocio && (
                      <div className="col-span-2 p-3 bg-gray-50 rounded-lg border border-gray-200">
                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">Problemi socio-assistenziali</p>
                        <p className="text-base font-semibold text-gray-900">{richiesta.cureSimultaneeData.problemiSocio}</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Dettagli specifici per Osteoncologia */}
            {richiesta.ambulatorio === "Osteoncologia" && richiesta.osteoncologiaData && (
              <Card className="shadow-md border-0">
                <CardHeader className="bg-gradient-to-r from-orange-50 to-amber-50 border-b">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                      <FileText className="w-5 h-5 text-orange-600" />
                    </div>
                    Dettagli Osteoncologia
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    {richiesta.osteoncologiaData.uoRiferimento && (
                      <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">U.O. di riferimento</p>
                        <p className="text-base font-semibold text-gray-900">
                          {richiesta.osteoncologiaData.uoRiferimento}
                          {richiesta.osteoncologiaData.uoRiferimento === "Altro" && richiesta.osteoncologiaData.altroUo && (
                            <span className="ml-2 text-gray-600">({richiesta.osteoncologiaData.altroUo})</span>
                          )}
                        </p>
                      </div>
                    )}
                    {richiesta.osteoncologiaData.sopravvivenzaOsteo && (
                      <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">Sopravvivenza stimata</p>
                        <p className="text-base font-semibold text-gray-900">{richiesta.osteoncologiaData.sopravvivenzaOsteo}</p>
                      </div>
                    )}
                    {richiesta.osteoncologiaData.quesitoTeam && (
                      <div className="col-span-2 p-4 bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl border-2 border-orange-200 shadow-sm">
                        <p className="text-xs font-semibold text-orange-900 uppercase tracking-wide mb-2">Quesito al team multidisciplinare</p>
                        <p className="text-sm text-orange-900 italic">{richiesta.osteoncologiaData.quesitoTeam}</p>
                      </div>
                    )}
                    {richiesta.osteoncologiaData.richiestaPer && richiesta.osteoncologiaData.richiestaPer.length > 0 && (
                      <div className="col-span-2 p-3 bg-gray-50 rounded-lg border border-gray-200">
                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">Richiesta per</p>
                        <div className="flex flex-wrap gap-2">
                          {richiesta.osteoncologiaData.richiestaPer.map((r: string, idx: number) => (
                            <Badge key={idx} className="bg-orange-50 text-orange-700 border-orange-200 capitalize">
                              {r}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Score Clinico - Solo per Cure Simultanee e Osteoncologia */}
            {richiesta.ambulatorio !== "Oncogeriatria" && (
              <Card className="shadow-md border-0">
                <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 border-b">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                      <Calculator className="w-5 h-5 text-purple-600" />
                    </div>
                    Valutazione Score Clinico
                  </CardTitle>
                  <CardDescription className="mt-2">
                    Punteggio basato sui parametri clinici valutati
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  {richiesta.ambulatorio === "Cure Simultanee" && (
                    <>
                      <div className="grid md:grid-cols-3 gap-4 mb-6">
                        {richiesta.scoreDetails?.psKarnofsky && (
                          <div className="text-center p-5 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl border-2 border-purple-200 shadow-sm hover:shadow-md transition-shadow">
                            <div className="text-5xl font-bold text-purple-700 mb-2">
                              {richiesta.scoreDetails.psKarnofsky === "50-60" ? "4" : "0"}
                            </div>
                            <div className="text-base font-semibold text-gray-800">PS (Karnofsky)</div>
                            <div className="text-xs text-gray-600 mt-1">
                              {richiesta.scoreDetails.psKarnofsky}
                            </div>
                          </div>
                        )}
                        {richiesta.scoreDetails?.sopravvivenza && (
                          <div className="text-center p-5 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl border-2 border-purple-200 shadow-sm hover:shadow-md transition-shadow">
                            <div className="text-5xl font-bold text-purple-700 mb-2">
                              {richiesta.scoreDetails.sopravvivenza === "≤ 6 mesi" ? "2" : 
                               richiesta.scoreDetails.sopravvivenza === "6-12 mesi" ? "1" : "0"}
                            </div>
                            <div className="text-base font-semibold text-gray-800">Sopravvivenza</div>
                            <div className="text-xs text-gray-600 mt-1">
                              {richiesta.scoreDetails.sopravvivenza}
                            </div>
                          </div>
                        )}
                        {richiesta.scoreDetails?.sintomi && richiesta.scoreDetails.sintomi.length > 0 && (
                          <div className="text-center p-5 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl border-2 border-purple-200 shadow-sm hover:shadow-md transition-shadow">
                            <div className="text-5xl font-bold text-purple-700 mb-2">
                              {richiesta.scoreDetails.sintomi.length}
                            </div>
                            <div className="text-base font-semibold text-gray-800">Sintomi</div>
                            <div className="text-xs text-gray-600 mt-1 line-clamp-2">
                              {richiesta.scoreDetails.sintomi.join(", ")}
                            </div>
                          </div>
                        )}
                        {richiesta.scoreDetails?.trattamenti && (
                          <div className="text-center p-5 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl border-2 border-purple-200 shadow-sm hover:shadow-md transition-shadow">
                            <div className="text-5xl font-bold text-purple-700 mb-2">
                              {richiesta.scoreDetails.trattamenti === "No" ? "2" : "0"}
                            </div>
                            <div className="text-base font-semibold text-gray-800">Trattamenti</div>
                            <div className="text-xs text-gray-600 mt-1">
                              {richiesta.scoreDetails.trattamenti}
                            </div>
                          </div>
                        )}
                        {richiesta.scoreDetails?.tossicita && richiesta.scoreDetails.tossicita !== "Nessuna" && (
                          <div className="text-center p-5 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl border-2 border-purple-200 shadow-sm hover:shadow-md transition-shadow">
                            <div className="text-5xl font-bold text-purple-700 mb-2">1</div>
                            <div className="text-base font-semibold text-gray-800">Tossicità</div>
                            <div className="text-xs text-gray-600 mt-1">
                              {richiesta.scoreDetails.tossicita}
                            </div>
                          </div>
                        )}
                        {richiesta.scoreDetails?.problemiSocio && richiesta.scoreDetails.problemiSocio !== "Nessuno" && (
                          <div className="text-center p-5 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl border-2 border-purple-200 shadow-sm hover:shadow-md transition-shadow">
                            <div className="text-5xl font-bold text-purple-700 mb-2">
                              {richiesta.scoreDetails.problemiSocio === "Inadeguato supporto" ? "2" : 
                               richiesta.scoreDetails.problemiSocio === "Rete famigliare scarsa" || richiesta.scoreDetails.problemiSocio === "Limitazioni assistenziali" ? "1" : "0"}
                            </div>
                            <div className="text-base font-semibold text-gray-800">Problemi socio-assistenziali</div>
                            <div className="text-xs text-gray-600 mt-1 line-clamp-2">
                              {richiesta.scoreDetails.problemiSocio}
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="text-center p-8 bg-gradient-to-r from-purple-100 via-purple-200 to-pink-200 rounded-xl border-2 border-purple-300 shadow-lg">
                        <div className="text-6xl font-bold text-purple-800 mb-3">Score Totale: {richiesta.score}</div>
                        <Badge className={`text-lg px-4 py-2 ${
                          richiesta.score >= 7 ? "bg-red-100 text-red-800 border-red-300" : 
                          richiesta.score >= 5 ? "bg-yellow-100 text-yellow-800 border-yellow-300" : 
                          "bg-green-100 text-green-800 border-green-300"
                        }`}>
                          {richiesta.score >= 7 ? "Priorità Alta" : 
                           richiesta.score >= 5 ? "Priorità Media" : "Priorità Bassa"}
                        </Badge>
                      </div>
                    </>
                  )}
                  
                  {richiesta.ambulatorio === "Osteoncologia" && (
                    <>
                      <div className="grid md:grid-cols-2 gap-4 mb-6">
                        {richiesta.scoreDetails?.psOsteo && (
                          <div className="text-center p-5 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl border-2 border-purple-200 shadow-sm hover:shadow-md transition-shadow">
                            <div className="text-5xl font-bold text-purple-700 mb-2">
                              {richiesta.scoreDetails.psOsteo === "≤ 70" ? "2" : 
                               richiesta.scoreDetails.psOsteo === "80" ? "1" : "0"}
                            </div>
                            <div className="text-base font-semibold text-gray-800">PS (Karnofsky)</div>
                            <div className="text-xs text-gray-600 mt-1">{richiesta.scoreDetails.psOsteo}</div>
                          </div>
                        )}
                        {richiesta.scoreDetails?.segniSintomi && (
                          <div className="text-center p-5 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl border-2 border-purple-200 shadow-sm hover:shadow-md transition-shadow">
                            <div className="text-5xl font-bold text-purple-700 mb-2">
                              {richiesta.scoreDetails.segniSintomi === "Sintomi da compressione" ? "3" : 
                               richiesta.scoreDetails.segniSintomi === "Dolore scheletrico" ? "2" : "0"}
                            </div>
                            <div className="text-base font-semibold text-gray-800">Segni e Sintomi</div>
                            <div className="text-xs text-gray-600 mt-1">{richiesta.scoreDetails.segniSintomi}</div>
                          </div>
                        )}
                        {richiesta.scoreDetails?.metastasiViscerali && (
                          <div className="text-center p-5 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl border-2 border-purple-200 shadow-sm hover:shadow-md transition-shadow">
                            <div className="text-5xl font-bold text-purple-700 mb-2">
                              {richiesta.scoreDetails.metastasiViscerali === "Multiple lesioni viscerali" ? "2" : 
                               richiesta.scoreDetails.metastasiViscerali === "Oligometastasi viscerali" ? "1" : "0"}
                            </div>
                            <div className="text-base font-semibold text-gray-800">Metastasi Viscerali</div>
                            <div className="text-xs text-gray-600 mt-1">{richiesta.scoreDetails.metastasiViscerali}</div>
                          </div>
                        )}
                        {richiesta.scoreDetails?.nMetastasiVertebrali && (
                          <div className="text-center p-5 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl border-2 border-purple-200 shadow-sm hover:shadow-md transition-shadow">
                            <div className="text-5xl font-bold text-purple-700 mb-2">
                              {richiesta.scoreDetails.nMetastasiVertebrali === "≥ 3" ? "2" : 
                               richiesta.scoreDetails.nMetastasiVertebrali === "2" ? "1" : "0"}
                            </div>
                            <div className="text-base font-semibold text-gray-800">N. Metastasi Vertebrali</div>
                            <div className="text-xs text-gray-600 mt-1">{richiesta.scoreDetails.nMetastasiVertebrali}</div>
                          </div>
                        )}
                        {richiesta.scoreDetails?.sedeMalattiaPrimitiva && (
                          <div className="text-center p-5 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl border-2 border-purple-200 shadow-sm hover:shadow-md transition-shadow col-span-2">
                            <div className="text-5xl font-bold text-purple-700 mb-2">
                              {richiesta.scoreDetails.sedeMalattiaPrimitiva === "Vie biliari, fegato, polmone, stomaco, esofago, CUP" ? "4" : 
                               richiesta.scoreDetails.sedeMalattiaPrimitiva === "Altre sedi" ? "3" : 
                               richiesta.scoreDetails.sedeMalattiaPrimitiva === "Rene, colon, retto, ginecologici" ? "2" : 
                               richiesta.scoreDetails.sedeMalattiaPrimitiva === "Prostata, mammella, tiroide, ematologica" ? "1" : "0"}
                            </div>
                            <div className="text-base font-semibold text-gray-800">Sede Malattia Primitiva</div>
                            <div className="text-xs text-gray-600 mt-1 line-clamp-2">{richiesta.scoreDetails.sedeMalattiaPrimitiva}</div>
                          </div>
                        )}
                        {(richiesta.scoreDetails?.compressioneMidollare || richiesta.scoreDetails?.fratturaPatologica) && (
                          <div className="col-span-2 p-5 bg-gradient-to-br from-red-50 to-orange-50 rounded-xl border-2 border-red-300 shadow-sm">
                            <p className="text-xs font-semibold text-red-900 uppercase tracking-wide mb-3">Situazioni urgenti (radiologicamente accertate)</p>
                            <div className="space-y-2">
                              {richiesta.scoreDetails.compressioneMidollare && (
                                <div className="flex items-center gap-2 p-2 bg-white rounded-lg border border-red-200">
                                  <CheckCircle className="w-4 h-4 text-red-600" />
                                  <span className="text-sm font-medium text-gray-700">Compressione midollare</span>
                                </div>
                              )}
                              {richiesta.scoreDetails.fratturaPatologica && (
                                <div className="flex items-center gap-2 p-2 bg-white rounded-lg border border-red-200">
                                  <CheckCircle className="w-4 h-4 text-red-600" />
                                  <span className="text-sm font-medium text-gray-700">Frattura patologica</span>
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="text-center p-8 bg-gradient-to-r from-purple-100 via-purple-200 to-pink-200 rounded-xl border-2 border-purple-300 shadow-lg mb-4">
                        <div className="text-6xl font-bold text-purple-800 mb-3">Score Totale: {richiesta.score}</div>
                      </div>
                      {richiesta.urgenzaLevel && (
                        <div className="p-6 bg-gradient-to-br from-orange-50 to-red-50 rounded-xl border-2 border-orange-300 shadow-sm">
                          <div className="flex items-center gap-3 mb-3">
                            <Badge 
                              variant="outline" 
                              className={`text-lg px-4 py-2 font-bold ${
                                richiesta.urgenzaLevel === "URG" 
                                  ? "bg-red-100 text-red-800 border-red-300 shadow-md" 
                                  : "bg-orange-100 text-orange-800 border-orange-300 shadow-md"
                              }`}
                            >
                              {richiesta.urgenzaLevel}
                            </Badge>
                            <span className="text-base font-semibold text-gray-800">Livello di urgenza</span>
                          </div>
                          <p className="text-sm text-gray-700 leading-relaxed">
                            {richiesta.urgenzaMessage}
                          </p>
                        </div>
                      )}
                    </>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Dettagli Oncogeriatria */}
            {richiesta.ambulatorio === "Oncogeriatria" && (
              <Card className="shadow-md border-0">
                <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 border-b">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                      <FileText className="w-5 h-5 text-green-600" />
                    </div>
                    Dettagli Oncogeriatria
                  </CardTitle>
                  <CardDescription className="mt-2">
                    Informazioni specifiche per valutazione oncogeriatrica
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    {richiesta.oncogeriatriaData?.stadio && (
                      <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">Stadio</p>
                        <p className="text-base font-semibold text-gray-900">{richiesta.oncogeriatriaData.stadio}</p>
                      </div>
                    )}
                    {richiesta.oncogeriatriaData?.finalitaTrattamento && (
                      <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">Finalità del trattamento</p>
                        <p className="text-base font-semibold text-gray-900">{richiesta.oncogeriatriaData.finalitaTrattamento}</p>
                      </div>
                    )}
                    {richiesta.oncogeriatriaData?.ecogPS && (
                      <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">ECOG PS</p>
                        <p className="text-base font-semibold text-gray-900">{richiesta.oncogeriatriaData.ecogPS}</p>
                      </div>
                    )}
                    {richiesta.oncogeriatriaData?.punteggioG8 && (
                      <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">Punteggio G8</p>
                        <p className="text-base font-semibold text-gray-900">{richiesta.oncogeriatriaData.punteggioG8}</p>
                      </div>
                    )}
                    {richiesta.oncogeriatriaData?.esitoVGM && (
                      <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">Esito VGM</p>
                        <Badge className="bg-blue-50 text-blue-700 border-blue-200">
                          {richiesta.oncogeriatriaData.esitoVGM}
                        </Badge>
                      </div>
                    )}
                    {richiesta.oncogeriatriaData?.propostaTerapeutica && (
                      <div className="col-span-2 p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border-2 border-green-200 shadow-sm">
                        <p className="text-xs font-semibold text-green-900 uppercase tracking-wide mb-2">Proposta terapeutica</p>
                        <p className="text-sm text-green-900">{richiesta.oncogeriatriaData.propostaTerapeutica}</p>
                      </div>
                    )}
                    {richiesta.oncogeriatriaData?.prognosiOncologica && (
                      <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">Prognosi oncologica</p>
                        <p className="text-base font-semibold text-gray-900">{richiesta.oncogeriatriaData.prognosiOncologica}</p>
                      </div>
                    )}
                    {richiesta.oncogeriatriaData?.finalitaTerapiaOncologica && richiesta.oncogeriatriaData.finalitaTerapiaOncologica.length > 0 && (
                      <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">Finalità della terapia oncologica</p>
                        <div className="flex flex-wrap gap-2">
                          {richiesta.oncogeriatriaData.finalitaTerapiaOncologica.map((f: string, idx: number) => (
                            <Badge key={idx} className="bg-green-50 text-green-700 border-green-200">
                              {f}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                    {(richiesta.oncogeriatriaData?.tossicitaEmatologica || richiesta.oncogeriatriaData?.tossicitaExtraEmatologica) && (
                      <div className="col-span-2 p-4 bg-gradient-to-br from-yellow-50 to-amber-50 rounded-xl border-2 border-yellow-200 shadow-sm">
                        <p className="text-xs font-semibold text-yellow-900 uppercase tracking-wide mb-3">Rischio tossicità</p>
                        <div className="grid md:grid-cols-2 gap-4">
                          {richiesta.oncogeriatriaData.tossicitaEmatologica && (
                            <div className="p-3 bg-white rounded-lg border border-yellow-100">
                              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">% Tossicità ematologica G3/G4</p>
                              <p className="text-base font-semibold text-gray-900">{richiesta.oncogeriatriaData.tossicitaEmatologica}%</p>
                            </div>
                          )}
                          {richiesta.oncogeriatriaData.tossicitaExtraEmatologica && (
                            <div className="p-3 bg-white rounded-lg border border-yellow-100">
                              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">% Tossicità extra-ematologica G3/G4</p>
                              <p className="text-base font-semibold text-gray-900">{richiesta.oncogeriatriaData.tossicitaExtraEmatologica}%</p>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                    {richiesta.oncogeriatriaData?.quesitiGeriatra && richiesta.oncogeriatriaData.quesitiGeriatra.length > 0 && (
                      <div className="col-span-2 p-4 bg-gray-50 rounded-lg border border-gray-200">
                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">Quesiti per geriatra</p>
                        <div className="space-y-2">
                          {richiesta.oncogeriatriaData.quesitiGeriatra.map((q: string, idx: number) => (
                            <div key={idx} className="flex items-center gap-2 p-3 bg-white rounded-lg border border-gray-200">
                              <CheckCircle className="w-4 h-4 text-green-600" />
                              <span className="text-sm text-gray-700">{q}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {richiesta.oncogeriatriaData?.outputValutazioneGeriatrica && (
                    <div className="mt-6 p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border-2 border-green-300 shadow-sm">
                      <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        Output valutazione geriatrica
                      </h4>
                      <div className="space-y-3">
                        {richiesta.oncogeriatriaData.outputValutazioneGeriatrica.programmaAttuabile && (
                          <div className="flex items-center gap-2 p-3 bg-white rounded-lg border border-green-200">
                            <CheckCircle className="w-4 h-4 text-green-600" />
                            <span className="text-sm font-medium text-gray-700">Programma attuabile senza programmazione altre visite oncogeriatriche</span>
                          </div>
                        )}
                        {richiesta.oncogeriatriaData.outputValutazioneGeriatrica.presaInCaricoGeriatrica && (
                          <div className="p-3 bg-white rounded-lg border border-green-200">
                            <span className="text-sm font-semibold text-gray-800 block mb-1">
                              Necessità di presa in carico geriatrica durante la terapia:
                            </span>
                            {richiesta.oncogeriatriaData.outputValutazioneGeriatrica.tempisticaGeriatrica && (
                              <p className="text-sm text-gray-700 ml-6 italic">
                                Tempistica: {richiesta.oncogeriatriaData.outputValutazioneGeriatrica.tempisticaGeriatrica}
                              </p>
                            )}
                          </div>
                        )}
                        {richiesta.oncogeriatriaData.outputValutazioneGeriatrica.rischioCognitiveImpairment && (
                          <div className="p-3 bg-white rounded-lg border border-green-200">
                            <span className="text-sm font-semibold text-gray-800 mr-2">Rischio cognitive impairment:</span>
                            <Badge className="bg-blue-50 text-blue-700 border-blue-200">
                              {richiesta.oncogeriatriaData.outputValutazioneGeriatrica.rischioCognitiveImpairment}
                            </Badge>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar Informazioni */}
          <div className="space-y-6">
            {/* Informazioni Richiesta */}
            <Card className="shadow-md border-0 sticky top-6">
              <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 border-b">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-green-600" />
                  </div>
                  Informazioni Richiesta
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6 space-y-5">
                <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">Medico Richiedente</p>
                  <p className="text-base font-semibold text-gray-900">{richiesta.medico}</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">PDF Impegnativa</p>
                  <div className="flex items-center gap-2 p-2 bg-white rounded-lg border border-gray-200 mb-2">
                    <FileText className="w-4 h-4 text-blue-600" />
                    <span className="text-sm font-medium text-gray-900 truncate">{richiesta.impegnativaPDF}</span>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleViewPDF}
                      className="flex items-center gap-2 w-full shadow-sm hover:shadow"
                    >
                      <Eye className="w-4 h-4" />
                      Visualizza PDF
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleDownloadPDF}
                      className="flex items-center gap-2 w-full shadow-sm hover:shadow"
                    >
                      <Download className="w-4 h-4" />
                      Scarica PDF
                    </Button>
                  </div>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">Data Richiesta</p>
                  <p className="text-base font-semibold text-gray-900">{richiesta.dataRichiesta}</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">Ora Richiesta</p>
                  <p className="text-base font-semibold text-gray-900">{richiesta.oraRichiesta}</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">Stato Attuale</p>
                  <Badge className={`${getStatoColor(richiesta.stato)} px-3 py-1 text-sm font-medium flex items-center gap-2 w-fit`}>
                    {getStatoIcon(richiesta.stato)}
                    {getStatoLabel(richiesta.stato)}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RichiestaDetailPage;
