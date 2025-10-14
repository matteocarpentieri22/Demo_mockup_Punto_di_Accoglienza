import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { Textarea } from "@/shared/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/components/ui/select";
import { ArrowLeft, Search, User, CheckCircle, Calendar, FileText } from "lucide-react";
import { OncologicoNavbar } from "@/oncologico/components/OncologicoNavbar";
import { useNavigate } from "react-router-dom";

// Tipo per il paziente
type Patient = {
  id: number;
  nome: string;
  cognome: string;
  annoNascita: number;
  codiceFiscale: string;
  indirizzo: string;
  telefono: string;
  email: string;
  esenzione: string;
};

// Mock API per ricerca pazienti
const mockSearchResults: Patient[] = [
  {
    id: 1,
    nome: "Giuseppe",
    cognome: "Verdi",
    annoNascita: 1970,
    codiceFiscale: "VRDGPP70A01H501Z",
    indirizzo: "Via Milano 456, 35100 Padova",
    telefono: "049 7654321",
    email: "giuseppe.verdi@email.com",
    esenzione: "Sì - Codice 048"
  },
  {
    id: 2,
    nome: "Anna",
    cognome: "Bianchi",
    annoNascita: 1985,
    codiceFiscale: "BNCNNA85B45H501A",
    indirizzo: "Via Venezia 789, 35100 Padova",
    telefono: "049 9876543",
    email: "anna.bianchi@email.com",
    esenzione: "No"
  }
];

const AddPaziente = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [searchResults, setSearchResults] = useState<Patient[]>([]);
  const [formData, setFormData] = useState({
    statoClinico: "",
    esenzionePresente: "",
    ultimoEsame: "",
    noteCliniche: ""
  });

  const handleSearch = () => {
    // Simula ricerca API - per demo, qualsiasi codice fiscale trova un paziente casuale
    console.log("Ricerca paziente:", searchTerm);
    
    if (searchTerm.trim()) {
      // Per demo: seleziona un paziente casuale dalla lista mock
      const randomIndex = Math.floor(Math.random() * mockSearchResults.length);
      const randomPatient = mockSearchResults[randomIndex];
      
      // Crea una copia del paziente con il codice fiscale inserito dall'utente
      const patientWithUserCF = {
        ...randomPatient,
        codiceFiscale: searchTerm.toUpperCase()
      };
      
      setSearchResults([patientWithUserCF]);
    } else {
      setSearchResults([]);
    }
    
    setHasSearched(true);
  };

  const handleSelectPatient = (patient: Patient) => {
    setSelectedPatient(patient);
    setCurrentStep(2);
  };

  const handleFormChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = () => {
    // Simula invio dati
    console.log("Dati paziente:", { selectedPatient, formData });
    setCurrentStep(3);
    
    // Redirect dopo 3 secondi
    setTimeout(() => {
      navigate('/oncologico/pazienti');
    }, 3000);
  };

  const renderStep1 = () => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Search className="w-5 h-5" />
          Step 1: Ricerca Paziente
        </CardTitle>
        <CardDescription>
          Inserisci il codice fiscale per cercare il paziente nel sistema
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="codice-fiscale">Codice Fiscale</Label>
          <div className="flex gap-2">
            <Input
              id="codice-fiscale"
              placeholder="Inserisci il codice fiscale..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1"
            />
            <Button onClick={handleSearch}>
              <Search className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Risultati ricerca */}
        {hasSearched && (
          <div className="space-y-3">
            <h3 className="font-medium">Risultati della ricerca:</h3>
            {searchResults.length > 0 ? (
              searchResults.map((patient) => (
                <div
                  key={patient.id}
                  className="p-4 border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors"
                  onClick={() => handleSelectPatient(patient)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold">{patient.nome} {patient.cognome}</h4>
                        <p className="text-sm text-muted-foreground">
                          CF: {patient.codiceFiscale} • Nato nel {patient.annoNascita}
                        </p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Seleziona
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <User className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>Nessun paziente trovato con questo codice fiscale</p>
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
          Step 2: Conferma Anagrafica
        </CardTitle>
        <CardDescription>
          Verifica i dati del paziente e compila la checklist clinica
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Dati paziente selezionato */}
        <div className="p-4 bg-muted/50 rounded-lg">
          <h3 className="font-semibold mb-3">Dati Paziente Selezionato</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">Nome:</span> {selectedPatient?.nome}
            </div>
            <div>
              <span className="text-muted-foreground">Cognome:</span> {selectedPatient?.cognome}
            </div>
            <div>
              <span className="text-muted-foreground">CF:</span> {selectedPatient?.codiceFiscale}
            </div>
            <div>
              <span className="text-muted-foreground">Esenzione:</span> {selectedPatient?.esenzione}
            </div>
          </div>
        </div>

        {/* Form checklist */}
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="stato-clinico">Stato Clinico</Label>
            <Input
              id="stato-clinico"
              placeholder="Descrivi lo stato clinico del paziente..."
              value={formData.statoClinico}
              onChange={(e) => handleFormChange('statoClinico', e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="esenzione">Esenzione Presente</Label>
            <Select value={formData.esenzionePresente} onValueChange={(value) => handleFormChange('esenzionePresente', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Seleziona..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="si">Sì</SelectItem>
                <SelectItem value="no">No</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="ultimo-esame">Ultimo Esame Eseguito</Label>
            <Input
              id="ultimo-esame"
              type="date"
              value={formData.ultimoEsame}
              onChange={(e) => handleFormChange('ultimoEsame', e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="note-cliniche">Note Cliniche</Label>
            <Textarea
              id="note-cliniche"
              placeholder="Inserisci eventuali note cliniche aggiuntive..."
              value={formData.noteCliniche}
              onChange={(e) => handleFormChange('noteCliniche', e.target.value)}
              rows={4}
            />
          </div>
        </div>

        <div className="flex gap-4">
          <Button variant="outline" onClick={() => setCurrentStep(1)}>
            Indietro
          </Button>
          <Button onClick={handleSubmit}>
            <CheckCircle className="w-4 h-4 mr-2" />
            Conferma e Aggiungi Paziente
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  const renderStep3 = () => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CheckCircle className="w-5 h-5 text-green-500" />
          Step 3: Completato
        </CardTitle>
        <CardDescription>
          Il paziente è stato aggiunto con successo al sistema
        </CardDescription>
      </CardHeader>
      <CardContent className="text-center space-y-6">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
          <CheckCircle className="w-8 h-8 text-green-500" />
        </div>
        
        <div>
          <h3 className="text-xl font-semibold mb-2">Paziente Aggiunto con Successo!</h3>
          <p className="text-muted-foreground">
            {selectedPatient?.nome} {selectedPatient?.cognome} è stato inserito nel sistema PDTA.
          </p>
        </div>

        <div className="p-4 bg-muted/50 rounded-lg">
          <p className="text-sm text-muted-foreground">
            Verrai reindirizzato automaticamente alla lista pazienti tra 3 secondi...
          </p>
        </div>

        <Button onClick={() => navigate('/oncologico/pazienti')}>
          Vai alla Lista Pazienti
        </Button>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-background">
      <OncologicoNavbar />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={() => navigate('/oncologico')}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Indietro
            </Button>
            
          </div>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-8">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step <= currentStep ? 'bg-primary text-white' : 'bg-muted text-muted-foreground'
                }`}>
                  {step < currentStep ? <CheckCircle className="w-4 h-4" /> : step}
                </div>
                {step < 3 && (
                  <div className={`w-16 h-1 mx-2 ${
                    step < currentStep ? 'bg-primary' : 'bg-muted'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-center space-x-16 mt-2">
            <span className="text-sm text-muted-foreground">Ricerca</span>
            <span className="text-sm text-muted-foreground">Conferma</span>
            <span className="text-sm text-muted-foreground">Completato</span>
          </div>
        </div>

        {/* Step Content */}
        <div className="max-w-2xl mx-auto">
          {currentStep === 1 && renderStep1()}
          {currentStep === 2 && renderStep2()}
          {currentStep === 3 && renderStep3()}
        </div>
      </div>
    </div>
  );
};

export default AddPaziente;
