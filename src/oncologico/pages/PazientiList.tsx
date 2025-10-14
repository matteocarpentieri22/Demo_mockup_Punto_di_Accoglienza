import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Badge } from "@/shared/components/ui/badge";
import { ArrowLeft, Search, Eye, Calendar, User } from "lucide-react";
import { OncologicoNavbar } from "@/oncologico/components/OncologicoNavbar";
import { useNavigate } from "react-router-dom";

// Mock data per i pazienti
const mockPatients = [
  {
    id: 1,
    nome: "Mario",
    cognome: "Rossi",
    annoNascita: 1965,
    codiceFiscale: "RSSMRA65A01H501U",
    azioneRichiesta: "Attesa esenzione",
    stato: "attesa_esenzione"
  },
  {
    id: 2,
    nome: "Giulia",
    cognome: "Bianchi",
    annoNascita: 1972,
    codiceFiscale: "BNCGLA72B45H501V",
    azioneRichiesta: "Attesa prescrizione",
    stato: "attesa_prescrizione"
  },
  {
    id: 3,
    nome: "Antonio",
    cognome: "Verdi",
    annoNascita: 1958,
    codiceFiscale: "VRDNTN58C12H501W",
    azioneRichiesta: "Attesa esami",
    stato: "attesa_esami"
  },
  {
    id: 4,
    nome: "Elena",
    cognome: "Neri",
    annoNascita: 1980,
    codiceFiscale: "NRELNE80D25H501X",
    azioneRichiesta: "In trattamento",
    stato: "in_trattamento"
  },
  {
    id: 5,
    nome: "Francesco",
    cognome: "Gialli",
    annoNascita: 1969,
    codiceFiscale: "GLLFRC69E08H501Y",
    azioneRichiesta: "Pronto per GOM",
    stato: "pronto_gom"
  }
];

type PatientStatus = "attesa_esenzione" | "attesa_prescrizione" | "attesa_esami" | "in_trattamento" | "pronto_gom" | "sconosciuto";

const getStatusColor = (stato: string) => {
  switch (stato) {
    case "attesa_esenzione":
    case "attesa_prescrizione":
    case "attesa_esami":
      return "bg-yellow-50 border-yellow-200";
    case "in_trattamento":
      return "bg-blue-50 border-blue-200";
    case "pronto_gom":
      return "bg-green-50 border-green-200";
    default:
      return "bg-gray-50 border-gray-200";
  }
};

const getStatusBadge = (stato: string) => {
  switch (stato) {
    case "attesa_esenzione":
      return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">Attesa Esenzione</Badge>;
    case "attesa_prescrizione":
      return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">Attesa Prescrizione</Badge>;
    case "attesa_esami":
      return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">Attesa Esami</Badge>;
    case "in_trattamento":
      return <Badge variant="secondary" className="bg-blue-100 text-blue-800">In Trattamento</Badge>;
    case "pronto_gom":
      return <Badge variant="secondary" className="bg-green-100 text-green-800">Pronto per GOM</Badge>;
    default:
      return <Badge variant="secondary">Sconosciuto</Badge>;
  }
};

const PazientiList = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredPatients, setFilteredPatients] = useState(mockPatients);

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    const filtered = mockPatients.filter(patient =>
      patient.nome.toLowerCase().includes(value.toLowerCase()) ||
      patient.cognome.toLowerCase().includes(value.toLowerCase()) ||
      patient.codiceFiscale.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredPatients(filtered);
  };

  const handleViewPatient = (patientId: number) => {
    navigate(`/oncologico/paziente/${patientId}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <OncologicoNavbar />

      <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-6 lg:py-8">
        {/* Back Button */}
        <div className="mb-4 sm:mb-6">
          <Button variant="ghost" size="sm" onClick={() => navigate('/oncologico')} className="text-sm sm:text-base">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Indietro
          </Button>
        </div>

        {/* Search */}
        <Card className="mb-4 sm:mb-6">
          <CardContent className="p-4 sm:p-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Cerca per nome, cognome o codice fiscale..."
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                className="pl-10 text-sm sm:text-base"
              />
            </div>
          </CardContent>
        </Card>

        {/* Patients Table */}
        <Card>
          <CardHeader className="p-4 sm:p-6">
            <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
              <User className="w-4 h-4 sm:w-5 sm:h-5" />
              Pazienti ({filteredPatients.length})
            </CardTitle>
            <CardDescription className="text-sm sm:text-base">
              Lista completa dei pazienti con i loro stati di avanzamento
            </CardDescription>
          </CardHeader>
          <CardContent className="p-4 sm:p-6">
            <div className="space-y-3 sm:space-y-4">
              {filteredPatients.map((patient) => (
                <div
                  key={patient.id}
                  className={`p-3 sm:p-4 rounded-lg border-2 cursor-pointer transition-all hover:shadow-md ${getStatusColor(patient.stato)}`}
                  onClick={() => handleViewPatient(patient.id)}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
                    <div className="flex items-center gap-3 sm:gap-4">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <User className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="font-semibold text-base sm:text-lg truncate">
                          {patient.nome} {patient.cognome}
                        </h3>
                        <p className="text-xs sm:text-sm text-muted-foreground">
                          Nato nel {patient.annoNascita} • CF: {patient.codiceFiscale}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between sm:justify-end gap-2 sm:gap-4">
                      <div className="text-right">
                        {getStatusBadge(patient.stato)}
                      </div>
                      <Button variant="ghost" size="sm" className="flex-shrink-0">
                        <Eye className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredPatients.length === 0 && (
              <div className="text-center py-8 sm:py-12">
                <User className="w-10 h-10 sm:w-12 sm:h-12 text-muted-foreground mx-auto mb-3 sm:mb-4" />
                <h3 className="text-base sm:text-lg font-semibold mb-2">Nessun paziente trovato</h3>
                <p className="text-sm sm:text-base text-muted-foreground">
                  {searchTerm ? "Prova a modificare i termini di ricerca" : "Non ci sono pazienti nel sistema"}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PazientiList;

