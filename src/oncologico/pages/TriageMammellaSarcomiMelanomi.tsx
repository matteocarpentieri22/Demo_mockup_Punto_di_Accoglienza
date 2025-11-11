import { useState } from "react";
import CaseManagerNavbar from "@/oncologico/components/layout/CaseManagerNavbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/components/ui/select";
import { Checkbox } from "@/shared/components/ui/checkbox";
import { Badge } from "@/shared/components/ui/badge";
import { Separator } from "@/shared/components/ui/separator";
import { Textarea } from "@/shared/components/ui/textarea";
import { useToast } from "@/shared/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, CheckCircle, Search, User, Upload, FileText, Download } from "lucide-react";
import jsPDF from "jspdf";

type RegistryPatient = {
  id: string;
  firstName: string;
  lastName: string;
  fiscalCode: string;
  birthDate: string;
  gender: "M" | "F";
  phone?: string;
  email?: string;
  disability?: {
    active: boolean;
    degree?: "parziale" | "totale";
    notes?: string;
  };
};

const MOCK_REGISTRY: RegistryPatient[] = [
  {
    id: "1",
    firstName: "Giulia",
    lastName: "Rossi",
    fiscalCode: "RSSGLI85A41H501U",
    birthDate: "1985-01-01",
    gender: "F",
    phone: "+39 333 111 2222",
    email: "giulia.rossi@example.com",
    disability: { active: true, degree: "parziale", notes: "Esenzione 046" }
  },
  {
    id: "2",
    firstName: "Marco",
    lastName: "Bianchi",
    fiscalCode: "BNCMRC79B12H224W",
    birthDate: "1979-02-12",
    gender: "M",
    phone: "+39 320 555 6677",
    email: "marco.bianchi@example.com",
    disability: { active: false }
  },
  {
    id: "3",
    firstName: "Sara",
    lastName: "Verdi",
    fiscalCode: "VRDSRA92C60H224Z",
    birthDate: "1992-03-20",
    gender: "F",
    phone: "+39 340 123 4567",
    email: "sara.verdi@example.com",
    disability: { active: true, degree: "totale", notes: "Legge 104" }
  }
];

// PDTA disponibili solo per Mammella, Sarcomi e Melanomi
type PdtaKey = "mammella" | "melanoma" | "sarcoma";

const PDTA_LABEL: Record<PdtaKey, string> = {
  "mammella": "Mammella",
  "melanoma": "Melanoma",
  "sarcoma": "Sarcoma"
};

type ChecklistItem = {
  id: string;
  label: string;
  required?: boolean;
};

const PDTA_CHECKLIST: Record<PdtaKey, ChecklistItem[]> = {
  mammella: [
    { id: "mam-1", label: "Recettori ER/PgR/HER2", required: true },
    { id: "mam-2", label: "Ki-67" },
    { id: "mam-3", label: "Imaging bilaterale" }
  ],
  melanoma: [
    { id: "mel-1", label: "BRAF/NRAS", required: true },
    { id: "mel-2", label: "Dermatologico + stadiazione" }
  ],
  sarcoma: [
    { id: "sar-1", label: "Referto istologico centro sarcomi", required: true },
    { id: "sar-2", label: "Imaging distretto e polmoni" }
  ]
};

type EsameVisitaItem = {
  id: string;
  label: string;
};

const ESAMI_VISITE_RICHIESTI: Record<PdtaKey, EsameVisitaItem[]> = {
  melanoma: [
    { id: "melanoma-1", label: "Visita dermatologica per nevi con dermatoscopia o Visita Chirurgica per neoformazioni" },
    { id: "melanoma-2", label: "Biopsia escissionale ed esame istologico" }
  ],
  mammella: [
    { id: "mammella-1", label: "Visita senologica" },
    { id: "mammella-2", label: "Mammografia bilaterale (solo per donne con età > 40 anni)" },
    { id: "mammella-3", label: "Ecografia bilaterale" },
    { id: "mammella-4", label: "Biopsia ed esame istologico" }
  ],
  sarcoma: [
    { id: "sarcoma-1", label: "Visita chirurgica" },
    { id: "sarcoma-2", label: "Ecografia dei tessuti molli" },
    { id: "sarcoma-3", label: "Risonanza magnetica (eventualmente associata ad ecografia)" },
    { id: "sarcoma-4", label: "Biopsia ed esame istologico" }
  ]
};

const TriageMammellaSarcomiMelanomi = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const [currentStep, setCurrentStep] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [hasSearched, setHasSearched] = useState<boolean>(false);
  const [searchResults, setSearchResults] = useState<RegistryPatient[]>([]);
  const [selectedPatient, setSelectedPatient] = useState<RegistryPatient | null>(null);

  const [selectedPdta, setSelectedPdta] = useState<PdtaKey | "">("");
  const [impegnativaPDF, setImpegnativaPDF] = useState<File | null>(null);
  
  const [contactInfo] = useState({
    anagrafici: {
      nome: "Mario",
      cognome: "Rossi",
      cf: "RSSMRA80A01H501U",
      mail: "mario.rossi@example.com",
      telefono: "+39 333 123 4567",
      residenza: "Via Roma 15, 20100 Milano (MI)"
    },
    caregiver: {
      nome: "Laura",
      cognome: "Rossi",
      mail: "laura.rossi@example.com",
      telefono: "+39 340 987 6543"
    },
    mmg: {
      nome: "Giuseppe",
      cognome: "Bianchi",
      cellulare: "+39 335 555 1234",
      mail: "giuseppe.bianchi@mmg.it",
      comune: "Milano"
    }
  });

  const [esamiRichiesti, setEsamiRichiesti] = useState<Record<string, boolean>>({});
  const [noteEsami, setNoteEsami] = useState<Record<PdtaKey, string>>({} as Record<PdtaKey, string>);

  const handleSearch = () => {
    const cf = searchTerm.trim().toUpperCase();
    if (!cf) {
      setSearchResults([]);
      setHasSearched(true);
      return;
    }
    const random = MOCK_REGISTRY[Math.floor(Math.random() * MOCK_REGISTRY.length)];
    const result: RegistryPatient = { ...random, fiscalCode: cf };
    setSearchResults([result]);
    setHasSearched(true);
  };

  const handleSelectPatient = (p: RegistryPatient) => {
    setSelectedPatient(p);
    setCurrentStep(2);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      setImpegnativaPDF(file);
    } else {
      toast({
        title: "Errore",
        description: "Per favore seleziona un file PDF valido",
        variant: "destructive"
      });
    }
  };

  const handleSubmit = () => {
    if (!selectedPatient || !selectedPdta) return;
    toast({
      title: "Paziente inserito",
      description: `${selectedPatient.lastName} ${selectedPatient.firstName} nel PDTA ${PDTA_LABEL[selectedPdta]}`
    });
    setCurrentStep(3);
  };

  const handleDownloadEsamiMancanti = () => {
    if (!selectedPdta || !selectedPatient) return;

    const esamiCompleti = ESAMI_VISITE_RICHIESTI[selectedPdta] || [];
    const esamiMancanti = esamiCompleti.filter(
      (esame) => !esamiRichiesti[esame.id]
    );

    const doc = new jsPDF();
    
    doc.setFontSize(18);
    doc.text("Esami Mancanti", 20, 20);
    
    doc.setFontSize(12);
    doc.text(`Paziente: ${selectedPatient.lastName} ${selectedPatient.firstName}`, 20, 35);
    doc.text(`Codice Fiscale: ${selectedPatient.fiscalCode}`, 20, 42);
    doc.text(`PDTA: ${PDTA_LABEL[selectedPdta]}`, 20, 49);
    doc.text(`Data: ${new Date().toLocaleDateString('it-IT')}`, 20, 56);
    
    let yPosition = 70;
    doc.setFontSize(14);
    doc.text("Esami/Visite da completare:", 20, yPosition);
    
    yPosition += 10;
    doc.setFontSize(11);
    
    if (esamiMancanti.length === 0) {
      doc.text("Nessun esame mancante - Tutti gli esami sono stati completati", 20, yPosition);
    } else {
      esamiMancanti.forEach((esame, index) => {
        if (yPosition > 270) {
          doc.addPage();
          yPosition = 20;
        }
        doc.text(`${index + 1}. ${esame.label}`, 25, yPosition);
        yPosition += 8;
      });
    }
    
    const note = noteEsami[selectedPdta];
    if (note && note.trim()) {
      yPosition += 10;
      if (yPosition > 270) {
        doc.addPage();
        yPosition = 20;
      }
      doc.setFontSize(12);
      doc.text("Note aggiuntive:", 20, yPosition);
      yPosition += 8;
      doc.setFontSize(10);
      const splitNote = doc.splitTextToSize(note, 170);
      doc.text(splitNote, 20, yPosition);
    }
    
    const pageCount = doc.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(8);
      doc.text(
        `Pagina ${i} di ${pageCount} - Generato il ${new Date().toLocaleString('it-IT')}`,
        20,
        doc.internal.pageSize.height - 10
      );
    }
    
    const fileName = `Esami_Mancanti_${selectedPatient.lastName}_${selectedPatient.firstName}_${new Date().toISOString().split('T')[0]}.pdf`;
    doc.save(fileName);
    
    toast({
      title: "PDF generato",
      description: "Il documento con gli esami mancanti è stato scaricato"
    });
  };

  const renderStep1 = () => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Search className="w-5 h-5" />
          Step 1: Ricerca Paziente
        </CardTitle>
        <CardDescription>Inserisci il codice fiscale per cercare il paziente</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="cf">Codice Fiscale</Label>
          <div className="flex gap-2">
            <Input id="cf" placeholder="Inserisci il codice fiscale..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="flex-1" />
            <Button onClick={handleSearch}><Search className="w-4 h-4" /></Button>
          </div>
        </div>

        {hasSearched && (
          <div className="space-y-3">
            <h3 className="font-medium">Risultati della ricerca:</h3>
            {searchResults.length > 0 ? (
              searchResults.map(p => (
                <div key={p.id} className="p-4 border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors" onClick={() => handleSelectPatient(p)}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold">{p.firstName} {p.lastName}</h4>
                        <p className="text-sm text-muted-foreground">CF: {p.fiscalCode} • Nata/o {p.birthDate}</p>
                      </div>
                    </div>
                    {p.disability?.active ? <Badge variant="secondary">Invalidità attiva</Badge> : null}
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <User className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>Nessun paziente trovato</p>
                <p className="text-sm mt-2">Verifica il codice fiscale inserito</p>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );

  const renderStep2 = () => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="w-5 h-5" />
          Step 2: Conferma e Checklist PDTA
        </CardTitle>
        <CardDescription>Verifica anagrafica, invalidità e compila la checklist</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="p-5 bg-muted/50 rounded-lg border-2">
          <h3 className="font-semibold text-lg mb-4">Dati Paziente</h3>
          <div className="grid grid-cols-2 gap-x-8 gap-y-4">
            <div className="flex flex-col">
              <span className="text-muted-foreground text-xs font-medium mb-1">Nome</span>
              <span className="font-semibold">{selectedPatient?.firstName}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-muted-foreground text-xs font-medium mb-1">Cognome</span>
              <span className="font-semibold">{selectedPatient?.lastName}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-muted-foreground text-xs font-medium mb-1">Codice Fiscale</span>
              <span className="font-semibold font-mono text-sm">{selectedPatient?.fiscalCode}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-muted-foreground text-xs font-medium mb-1">Data di Nascita</span>
              <span className="font-semibold">{selectedPatient?.birthDate}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-muted-foreground text-xs font-medium mb-1">Email</span>
              <span className="font-semibold">{contactInfo.anagrafici.mail}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-muted-foreground text-xs font-medium mb-1">Telefono</span>
              <span className="font-semibold">{contactInfo.anagrafici.telefono}</span>
            </div>
            <div className="col-span-2 flex flex-col">
              <span className="text-muted-foreground text-xs font-medium mb-1">Residenza</span>
              <span className="font-semibold">{contactInfo.anagrafici.residenza}</span>
            </div>
          </div>
        </div>

        <div className="p-5 border-2 rounded-lg space-y-5 bg-white">
          <h3 className="font-semibold text-lg">Informazioni di contatto</h3>
          
          <div className="space-y-5">
            <div>
              <h4 className="font-semibold mb-3 text-base">Caregiver</h4>
              <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                <div className="flex flex-col">
                  <span className="text-muted-foreground text-xs font-medium mb-1">Nome</span>
                  <span className="font-semibold">{contactInfo.caregiver.nome}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-muted-foreground text-xs font-medium mb-1">Cognome</span>
                  <span className="font-semibold">{contactInfo.caregiver.cognome}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-muted-foreground text-xs font-medium mb-1">Email</span>
                  <span className="font-semibold">{contactInfo.caregiver.mail}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-muted-foreground text-xs font-medium mb-1">Telefono</span>
                  <span className="font-semibold">{contactInfo.caregiver.telefono}</span>
                </div>
              </div>
            </div>

            <Separator />

            <div>
              <h4 className="font-semibold mb-3 text-base">Contatto MMG</h4>
              <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                <div className="flex flex-col">
                  <span className="text-muted-foreground text-xs font-medium mb-1">Nome</span>
                  <span className="font-semibold">{contactInfo.mmg.nome}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-muted-foreground text-xs font-medium mb-1">Cognome</span>
                  <span className="font-semibold">{contactInfo.mmg.cognome}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-muted-foreground text-xs font-medium mb-1">Cellulare</span>
                  <span className="font-semibold">{contactInfo.mmg.cellulare}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-muted-foreground text-xs font-medium mb-1">Email</span>
                  <span className="font-semibold">{contactInfo.mmg.mail}</span>
                </div>
                <div className="col-span-2 flex flex-col">
                  <span className="text-muted-foreground text-xs font-medium mb-1">Comune riferimento</span>
                  <span className="font-semibold">{contactInfo.mmg.comune}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-5">
          <div className="space-y-2">
            <Label className="text-base font-semibold">PDTA</Label>
            <Select value={selectedPdta} onValueChange={(v) => setSelectedPdta(v as PdtaKey)}>
              <SelectTrigger>
                <SelectValue placeholder="Seleziona PDTA" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="mammella">Mammella</SelectItem>
                <SelectItem value="melanoma">Melanoma</SelectItem>
                <SelectItem value="sarcoma">Sarcoma</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {selectedPdta && ESAMI_VISITE_RICHIESTI[selectedPdta] && (
            <div className="p-5 border-2 rounded-lg space-y-4 bg-white">
              <h3 className="font-semibold text-lg">Esami/visite richiesti per prima visita oncologica</h3>
              
              <div className="space-y-3">
                {ESAMI_VISITE_RICHIESTI[selectedPdta].map((item) => (
                  <label 
                    key={item.id} 
                    className="flex items-center gap-3 cursor-pointer p-3 rounded-lg hover:bg-muted/50 transition-colors border border-transparent hover:border-border"
                  >
                    <Checkbox 
                      checked={esamiRichiesti[item.id] || false} 
                      onCheckedChange={(val) => setEsamiRichiesti(prev => ({ ...prev, [item.id]: Boolean(val) }))} 
                    />
                    <div className="font-medium">{item.label}</div>
                  </label>
                ))}
              </div>

              <div className="space-y-2 pt-2">
                <Label htmlFor="note-esami" className="text-base font-semibold">Note</Label>
                <Textarea
                  id="note-esami"
                  placeholder="Inserisci altri esami effettuati o note aggiuntive..."
                  value={noteEsami[selectedPdta] || ""}
                  onChange={(e) => setNoteEsami(prev => ({ ...prev, [selectedPdta]: e.target.value }))}
                  className="min-h-[100px]"
                />
              </div>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="impegnativa-pdf" className="text-base font-semibold">Allegare PDF Impegnativa</Label>
            <div className="space-y-2">
              <input
                type="file"
                id="impegnativa-pdf"
                accept=".pdf"
                onChange={handleFileUpload}
                className="hidden"
              />
              <div className="flex items-center gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => document.getElementById('impegnativa-pdf')?.click()}
                  className="flex items-center gap-2"
                >
                  <Upload className="w-4 h-4" />
                  Seleziona PDF
                </Button>
                {impegnativaPDF && (
                  <span className="text-sm text-green-600 font-semibold flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    {impegnativaPDF.name}
                  </span>
                )}
              </div>
              <p className="text-xs text-muted-foreground">
                Seleziona il file PDF dell'impegnativa del paziente
              </p>
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <Button variant="outline" onClick={() => setCurrentStep(1)}>Indietro</Button>
            <Button disabled={!selectedPatient || !selectedPdta} onClick={handleSubmit}>Conferma inserimento</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const renderStep3 = () => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CheckCircle className="w-5 h-5 text-green-600" />
          Step 3: Completato
        </CardTitle>
      </CardHeader>
      <CardContent className="text-center space-y-6">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
          <CheckCircle className="w-8 h-8 text-green-600" />
        </div>
        <div>
          <h3 className="text-lg font-semibold">Paziente censito con successo</h3>
          <p className="text-muted-foreground">Verrai reindirizzato alla lista pazienti</p>
        </div>
        <div className="flex gap-3 justify-center">
          <Button variant="outline" onClick={handleDownloadEsamiMancanti} className="flex items-center gap-2">
            <Download className="w-4 h-4" />
            Scarica PDF Esami Mancanti
          </Button>
          <Button onClick={() => navigate('/oncologico/case-manager/mammella-sarcomi-melanomi/elenco-pazienti')}>Vai alla Lista Pazienti</Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-background">
      <CaseManagerNavbar />
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={() => navigate('/oncologico/case-manager/mammella-sarcomi-melanomi')}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Indietro
            </Button>
          </div>
        </div>

        <div className="mb-8">
          <div className="flex items-center justify-center space-x-8">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step <= currentStep ? 'bg-primary text-white' : 'bg-muted text-muted-foreground'}`}>
                  {step < currentStep ? <CheckCircle className="w-4 h-4" /> : step}
                </div>
                {step < 3 && (
                  <div className={`w-16 h-1 mx-2 ${step < currentStep ? 'bg-primary' : 'bg-muted'}`} />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-center space-x-16 mt-2">
            <span className="text-sm text-muted-foreground">Ricerca</span>
            <span className="text-sm text-muted-foreground">Checklist</span>
            <span className="text-sm text-muted-foreground">Completato</span>
          </div>
        </div>

        <div className="max-w-3xl mx-auto">
          {currentStep === 1 && renderStep1()}
          {currentStep === 2 && renderStep2()}
          {currentStep === 3 && renderStep3()}
        </div>
      </div>
    </div>
  );
};

export default TriageMammellaSarcomiMelanomi;

