import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";
import { Badge } from "@/shared/components/ui/badge";
import { Progress } from "@/shared/components/ui/progress";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/shared/components/ui/dialog";
import { 
  ClipboardList, 
  Clock,
  CheckCircle,
  AlertCircle,
  Info,
  ArrowRight,
  Calendar,
  FileText,
  Play,
  Eye
} from "lucide-react";
import PazienteNavbar from "@/paziente/components/PazienteNavbar";

// Mock data per i questionari assegnati
const assignedQuestionnaires = [
  {
    id: 1,
    nome: "Questionario di Qualità della Vita",
    descrizione: "Valuta il tuo benessere generale e la qualità della vita",
    stato: "in_corso",
    scadenza: "28/02/2025",
    domandeCompletate: 8,
    domandeTotali: 15,
    progresso: 53,
    assegnatoDa: "Dr. Bianchi",
    dataAssegnazione: "15/01/2025"
  },
  {
    id: 2,
    nome: "Questionario sui Sintomi",
    descrizione: "Monitora i sintomi e gli effetti collaterali del trattamento",
    stato: "da_compilare",
    scadenza: "05/03/2025",
    domandeCompletate: 0,
    domandeTotali: 12,
    progresso: 0,
    assegnatoDa: "Dr. Rossi",
    dataAssegnazione: "20/01/2025"
  },
  {
    id: 3,
    nome: "Questionario Psicologico",
    descrizione: "Valuta lo stato emotivo e psicologico",
    stato: "completato",
    scadenza: "10/01/2025",
    domandeCompletate: 20,
    domandeTotali: 20,
    progresso: 100,
    assegnatoDa: "Dr. Verdi",
    dataAssegnazione: "05/01/2025"
  },
  {
    id: 4,
    nome: "Questionario Nutrizionale",
    descrizione: "Monitora l'alimentazione e l'apporto nutrizionale",
    stato: "in_corso",
    scadenza: "15/03/2025",
    domandeCompletate: 5,
    domandeTotali: 18,
    progresso: 28,
    assegnatoDa: "Dr. Bianchi",
    dataAssegnazione: "25/01/2025"
  }
];

const QuestionariDettaglio = () => {
  const [previewDialogOpen, setPreviewDialogOpen] = useState(false);
  const [previewQuestionnaireId, setPreviewQuestionnaireId] = useState<number | null>(null);

  const getStatusBadge = (stato: string) => {
    switch (stato) {
      case 'completato':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Completato</Badge>;
      case 'in_corso':
        return <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-200">In Corso</Badge>;
      case 'da_compilare':
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">Da Compilare</Badge>;
      default:
        return <Badge variant="secondary">Sconosciuto</Badge>;
    }
  };

  const handlePreviewQuestionnaire = (questionnaireId: number) => {
    setPreviewQuestionnaireId(questionnaireId);
    setPreviewDialogOpen(true);
  };

  const getQuestionnaireActions = (questionnaire: any) => {
    switch (questionnaire.stato) {
      case 'completato':
        return (
          <div className="flex gap-2">
            <Button variant="outline" size="sm" disabled>
              <CheckCircle className="w-4 h-4 mr-2" />
              Completato
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => handlePreviewQuestionnaire(questionnaire.id)}
            >
              <Eye className="w-4 h-4 mr-2" />
              Visualizza
            </Button>
          </div>
        );
      case 'in_corso':
        return (
          <div className="flex gap-2">
            <Button 
              size="sm" 
              onClick={() => window.location.href = '/paziente/questionario'}
            >
              <Play className="w-4 h-4 mr-2" />
              Continua
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => handlePreviewQuestionnaire(questionnaire.id)}
            >
              <Eye className="w-4 h-4 mr-2" />
              Anteprima
            </Button>
          </div>
        );
      case 'da_compilare':
        return (
          <div className="flex gap-2">
            <Button 
              size="sm" 
              onClick={() => window.location.href = '/paziente/questionario'}
            >
              <Play className="w-4 h-4 mr-2" />
              Inizia
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => handlePreviewQuestionnaire(questionnaire.id)}
            >
              <Eye className="w-4 h-4 mr-2" />
              Anteprima
            </Button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <PazienteNavbar />

      <div className="container mx-auto px-4 py-8 flex-1">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-primary/10 rounded-lg">
              <ClipboardList className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-primary">Questionari da Compilare</h1>
              <p className="text-muted-foreground">Gestisci e completa i questionari assegnati dal tuo medico</p>
            </div>
          </div>
          
          {/* Statistiche Riepilogative */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Card className="border-2 border-blue-200 bg-blue-50/50">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <ClipboardList className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-blue-800">Totali</p>
                    <p className="text-2xl font-bold text-blue-900">{assignedQuestionnaires.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-2 border-green-200 bg-green-50/50">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-green-800">Completati</p>
                    <p className="text-2xl font-bold text-green-900">
                      {assignedQuestionnaires.filter(q => q.stato === 'completato').length}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-2 border-orange-200 bg-orange-50/50">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-orange-100 rounded-lg">
                    <Clock className="w-5 h-5 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-orange-800">In Corso</p>
                    <p className="text-2xl font-bold text-orange-900">
                      {assignedQuestionnaires.filter(q => q.stato === 'in_corso').length}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Lista Questionari */}
        <div className="space-y-6">
          {assignedQuestionnaires.map((questionnaire) => (
            <Card key={questionnaire.id} className="border-2 border-primary/20 bg-gradient-to-r from-white to-gray-50/50 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="flex-1">
                    <CardTitle className="text-xl font-bold text-primary mb-2">
                      {questionnaire.nome}
                    </CardTitle>
                    <CardDescription className="text-base mb-3">
                      {questionnaire.descrizione}
                    </CardDescription>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4" />
                        <span>Assegnato da: {questionnaire.assegnatoDa}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>Scadenza: {questionnaire.scadenza}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {getStatusBadge(questionnaire.stato)}
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                {/* Progresso */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Progresso</span>
                    <span className="text-sm text-muted-foreground">
                      {questionnaire.domandeCompletate}/{questionnaire.domandeTotali} domande
                    </span>
                  </div>
                  <Progress value={questionnaire.progresso} className="h-3" />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>0%</span>
                    <span className="font-medium">{questionnaire.progresso}%</span>
                    <span>100%</span>
                  </div>
                </div>

                {/* Azioni */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="flex flex-wrap gap-2">
                    {getQuestionnaireActions(questionnaire)}
                  </div>
                  
                  <div className="text-xs text-muted-foreground">
                    Assegnato il {questionnaire.dataAssegnazione}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t bg-card">
        <div className="container mx-auto px-4 py-8 text-center text-sm text-muted-foreground">
          <p>© 2025 Istituto Oncologico Veneto - Tutti i diritti riservati</p>
          <p className="mt-2">Sistema demo per medici di medicina generale</p>
        </div>
      </footer>

      {/* Dialog Anteprima Questionario */}
      <Dialog open={previewDialogOpen} onOpenChange={setPreviewDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              Anteprima - {previewQuestionnaireId && assignedQuestionnaires.find(q => q.id === previewQuestionnaireId)?.nome}
            </DialogTitle>
            <DialogDescription>
              Questa è un'anteprima delle domande del questionario. Per compilare il questionario, clicca su "Inizia" o "Continua".
            </DialogDescription>
          </DialogHeader>
          {previewQuestionnaireId && (() => {
            const questionnaire = assignedQuestionnaires.find(q => q.id === previewQuestionnaireId);
            if (!questionnaire) return null;
            return (
              <div className="space-y-6 mt-4">
                <div className="p-4 bg-muted/50 rounded-lg">
                  <h3 className="font-semibold mb-2">Informazioni Questionario</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium">Stato:</span> {questionnaire.stato}
                    </div>
                    <div>
                      <span className="font-medium">Progresso:</span> {questionnaire.progresso}%
                    </div>
                    <div>
                      <span className="font-medium">Domande:</span> {questionnaire.domandeCompletate}/{questionnaire.domandeTotali}
                    </div>
                    <div>
                      <span className="font-medium">Scadenza:</span> {questionnaire.scadenza}
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="font-semibold">Esempio di Domande</h3>
                  <div className="space-y-3">
                    <div className="p-3 border rounded-lg">
                      <p className="font-medium mb-2">1. Come valuti il tuo livello di energia oggi?</p>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <input type="radio" disabled className="opacity-50" />
                          <span className="text-sm text-muted-foreground">Molto basso</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <input type="radio" disabled className="opacity-50" />
                          <span className="text-sm text-muted-foreground">Basso</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <input type="radio" disabled className="opacity-50" />
                          <span className="text-sm text-muted-foreground">Normale</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <input type="radio" disabled className="opacity-50" />
                          <span className="text-sm text-muted-foreground">Alto</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-3 border rounded-lg">
                      <p className="font-medium mb-2">2. Hai avuto difficoltà a dormire questa settimana?</p>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <input type="radio" disabled className="opacity-50" />
                          <span className="text-sm text-muted-foreground">Mai</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <input type="radio" disabled className="opacity-50" />
                          <span className="text-sm text-muted-foreground">Qualche volta</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <input type="radio" disabled className="opacity-50" />
                          <span className="text-sm text-muted-foreground">Spesso</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <input type="radio" disabled className="opacity-50" />
                          <span className="text-sm text-muted-foreground">Sempre</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-2 pt-4 border-t">
                  <Button 
                    onClick={() => window.location.href = '/paziente/questionario'}
                    className="flex-1"
                  >
                    {questionnaire.stato === 'da_compilare' ? 'Inizia Questionario' : 'Continua Questionario'}
                  </Button>
                  <Button variant="outline" onClick={() => setPreviewDialogOpen(false)}>
                    Chiudi
                  </Button>
                </div>
              </div>
            );
          })()}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default QuestionariDettaglio;
