import { useMemo, useState } from "react";
import CaseManagerNavbar from "@/oncologico/components/layout/CaseManagerNavbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/components/ui/select";
import { Checkbox } from "@/shared/components/ui/checkbox";
import { Badge } from "@/shared/components/ui/badge";
import { useToast } from "@/shared/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, CheckCircle, Search, User, ClipboardCheck, Upload, FileText } from "lucide-react";

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

// PDTA v2 richiesti (9 voci con mock checklist)
type PdtaKey =
  | "colon"
  | "retto"
  | "mammella"
  | "snc"
  | "polmone"
  | "stomaco"
  | "melanoma"
  | "sarcoma"
  | "stomaco-2"; // duplicazione richiesta

const PDTA_LABEL: Record<PdtaKey, string> = {
  "colon": "Colon",
  "retto": "Retto",
  "mammella": "Mammella",
  "snc": "Sistema Nervoso Centrale",
  "polmone": "Polmone",
  "stomaco": "Stomaco",
  "melanoma": "Melanoma",
  "sarcoma": "Sarcoma",
  "stomaco-2": "Stomaco"
};

type ChecklistItem = {
  id: string;
  label: string;
  required?: boolean;
};

const PDTA_CHECKLIST: Record<PdtaKey, ChecklistItem[]> = {
  colon: [
    { id: "colon-1", label: "Istologico confermato", required: true },
    { id: "colon-2", label: "Stadiazione TNM aggiornata" },
    { id: "colon-3", label: "CEA baseline", required: true },
    { id: "colon-4", label: "TC TAP entro 60 gg" }
  ],
  retto: [
    { id: "retto-1", label: "RM pelvi eseguita", required: true },
    { id: "retto-2", label: "Valutazione CRM" },
    { id: "retto-3", label: "Discussione MDT", required: true }
  ],
  mammella: [
    { id: "mam-1", label: "Recettori ER/PgR/HER2", required: true },
    { id: "mam-2", label: "Ki-67" },
    { id: "mam-3", label: "Imaging bilaterale" }
  ],
  snc: [
    { id: "snc-1", label: "RM encefalo con e senza contrasto", required: true },
    { id: "snc-2", label: "Referto neurochirurgico" }
  ],
  polmone: [
    { id: "pol-1", label: "Istologia e PD-L1", required: true },
    { id: "pol-2", label: "NGS driver (EGFR/ALK/ROS1...)" },
    { id: "pol-3", label: "TC torace-addome" }
  ],
  stomaco: [
    { id: "sto-1", label: "HER2/IHC", required: true },
    { id: "sto-2", label: "Nutrizione (MUST)" }
  ],
  melanoma: [
    { id: "mel-1", label: "BRAF/NRAS", required: true },
    { id: "mel-2", label: "Dermatologico + stadiazione" }
  ],
  sarcoma: [
    { id: "sar-1", label: "Referto istologico centro sarcomi", required: true },
    { id: "sar-2", label: "Imaging distretto e polmoni" }
  ],
  "stomaco-2": [
    { id: "sto2-1", label: "HER2/IHC (ripetizione)", required: true },
    { id: "sto2-2", label: "Valutazione preabilitazione" }
  ]
};

const AggiuntaPazientePage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const [currentStep, setCurrentStep] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [hasSearched, setHasSearched] = useState<boolean>(false);
  const [searchResults, setSearchResults] = useState<RegistryPatient[]>([]);
  const [selectedPatient, setSelectedPatient] = useState<RegistryPatient | null>(null);

  const [selectedPdta, setSelectedPdta] = useState<PdtaKey | "">("");
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
  const [impegnativaPDF, setImpegnativaPDF] = useState<File | null>(null);

  const checklist = useMemo(() => (selectedPdta ? PDTA_CHECKLIST[selectedPdta] : []), [selectedPdta]);
  const allRequiredChecked = useMemo(() => {
    if (!selectedPdta) return false;
    return PDTA_CHECKLIST[selectedPdta].every(item => !item.required || checkedItems[item.id]);
  }, [checkedItems, selectedPdta]);

  const handleSearch = () => {
    const cf = searchTerm.trim().toUpperCase();
    if (!cf) {
      setSearchResults([]);
      setHasSearched(true);
      return;
    }
    // demo: restituisci un paziente mock con CF inserito
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
    if (!selectedPatient || !selectedPdta || !allRequiredChecked) return;
    toast({
      title: "Paziente inserito",
      description: `${selectedPatient.lastName} ${selectedPatient.firstName} nel PDTA ${PDTA_LABEL[selectedPdta]} (${Object.values(checkedItems).filter(Boolean).length}/${checklist.length})`
    });
    setCurrentStep(3);
    setTimeout(() => navigate('/oncologico/case-manager/pazienti'), 2500);
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
        <div className="p-4 bg-muted/50 rounded-lg">
          <h3 className="font-semibold mb-3">Dati Paziente</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div><span className="text-muted-foreground">Nome:</span> {selectedPatient?.firstName}</div>
            <div><span className="text-muted-foreground">Cognome:</span> {selectedPatient?.lastName}</div>
            <div><span className="text-muted-foreground">CF:</span> {selectedPatient?.fiscalCode}</div>
            <div><span className="text-muted-foreground">Nascita:</span> {selectedPatient?.birthDate}</div>
            <div className="col-span-2">
              {selectedPatient?.disability?.active ? (
                <div className="flex items-center gap-2">
                  <Badge className="bg-amber-100 text-amber-800">Invalidità attiva</Badge>
                  {selectedPatient?.disability?.degree ? <Badge variant="secondary">{selectedPatient?.disability?.degree}</Badge> : null}
                </div>
              ) : (
                <Badge variant="outline">Nessuna invalidità attiva</Badge>
              )}
              {selectedPatient?.disability?.notes ? (
                <div className="text-xs text-muted-foreground mt-1">Note: {selectedPatient?.disability?.notes}</div>
              ) : null}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <Label>PDTA</Label>
            <Select value={selectedPdta} onValueChange={(v) => setSelectedPdta(v as PdtaKey)}>
              <SelectTrigger>
                <SelectValue placeholder="Seleziona PDTA" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="colon">Colon</SelectItem>
                <SelectItem value="retto">Retto</SelectItem>
                <SelectItem value="mammella">Mammella</SelectItem>
                <SelectItem value="snc">Sistema Nervoso Centrale</SelectItem>
                <SelectItem value="polmone">Polmone</SelectItem>
                <SelectItem value="stomaco">Stomaco</SelectItem>
                <SelectItem value="melanoma">Melanoma</SelectItem>
                <SelectItem value="sarcoma">Sarcoma</SelectItem>
                <SelectItem value="stomaco-2">Stomaco</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="impegnativa-pdf">Allegare PDF Impegnativa</Label>
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
                  className="flex items-center gap-2"
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
              <p className="text-xs text-muted-foreground">
                Seleziona il file PDF dell'impegnativa del paziente
              </p>
            </div>
          </div>

          <div className="space-y-2">
            {selectedPdta ? (
              checklist.map(item => (
                <label key={item.id} className="flex items-start gap-3">
                  <Checkbox checked={!!checkedItems[item.id]} onCheckedChange={(val) => setCheckedItems(prev => ({ ...prev, [item.id]: Boolean(val) }))} />
                  <div className="text-sm font-medium">
                    {item.label} {item.required ? <span className="text-rose-600">(obbligatorio)</span> : null}
                  </div>
                </label>
              ))
            ) : (
              <div className="text-sm text-muted-foreground">Seleziona un PDTA per vedere la checklist</div>
            )}
          </div>

          <div className="flex gap-4">
            <Button variant="outline" onClick={() => setCurrentStep(1)}>Indietro</Button>
            <Button disabled={!selectedPatient || !selectedPdta || !allRequiredChecked} onClick={handleSubmit}>Conferma inserimento</Button>
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
        <CardDescription>Il paziente è stato aggiunto con successo</CardDescription>
      </CardHeader>
      <CardContent className="text-center space-y-6">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
          <CheckCircle className="w-8 h-8 text-green-600" />
        </div>
        <div>
          <h3 className="text-lg font-semibold">Paziente inserito nel PDTA</h3>
          <p className="text-muted-foreground">Verrai reindirizzato alla lista pazienti</p>
        </div>
        <Button onClick={() => navigate('/oncologico/case-manager/pazienti')}>Vai alla Lista Pazienti</Button>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-background">
      <CaseManagerNavbar />
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={() => navigate('/oncologico/case-manager')}>
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
            <span className="text-sm text-muted-foreground">Conferma + Checklist</span>
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

export default AggiuntaPazientePage;


