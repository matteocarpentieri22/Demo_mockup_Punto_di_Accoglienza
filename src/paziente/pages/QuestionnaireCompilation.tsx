import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";
import { Progress } from "@/shared/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/shared/components/ui/radio-group";
import { Label } from "@/shared/components/ui/label";
import { Checkbox } from "@/shared/components/ui/checkbox";
import { Textarea } from "@/shared/components/ui/textarea";
import { ArrowLeft, ArrowRight, CheckCircle } from "lucide-react";
import PazienteNavbar from "@/paziente/components/PazienteNavbar";

// Mock data per le domande del questionario
const questionnaireQuestions = [
  {
    id: 1,
    tipo: "radio",
    domanda: "Hai difficoltà respiratorie?",
    opzioni: [
      { valore: "no", etichetta: "No" },
      { valore: "lieve", etichetta: "Sì, lieve" },
      { valore: "moderata", etichetta: "Sì, moderata" },
      { valore: "grave", etichetta: "Sì, grave" }
    ],
    punteggio: { no: 0, lieve: 1, moderata: 3, grave: 4 }
  },
  {
    id: 2,
    tipo: "radio",
    domanda: "Hai dolore al petto?",
    opzioni: [
      { valore: "no", etichetta: "No" },
      { valore: "lieve", etichetta: "Sì, lieve" },
      { valore: "moderato", etichetta: "Sì, moderato" },
      { valore: "grave", etichetta: "Sì, grave" }
    ],
    punteggio: { no: 0, lieve: 1, moderato: 2, grave: 4 }
  },
  {
    id: 3,
    tipo: "checkbox",
    domanda: "Quali di questi sintomi hai riscontrato? (Seleziona tutte le opzioni che ti riguardano)",
    opzioni: [
      { valore: "tosse", etichetta: "Tosse persistente" },
      { valore: "fatica", etichetta: "Stanchezza" },
      { valore: "perdita_peso", etichetta: "Perdita di peso" },
      { valore: "febbre", etichetta: "Febbre" },
      { valore: "sudorazione", etichetta: "Sudorazione notturna" }
    ],
    punteggio: { tosse: 3, fatica: 2, perdita_peso: 3, febbre: 2, sudorazione: 2 }
  },
  {
    id: 4,
    tipo: "radio",
    domanda: "Come valuti la tua qualità del sonno?",
    opzioni: [
      { valore: "ottima", etichetta: "Ottima" },
      { valore: "buona", etichetta: "Buona" },
      { valore: "discreta", etichetta: "Discreta" },
      { valore: "scarsa", etichetta: "Scarsa" }
    ],
    punteggio: { ottima: 0, buona: 1, discreta: 2, scarsa: 3 }
  },
  {
    id: 5,
    tipo: "textarea",
    domanda: "Descrivi eventuali altri sintomi o preoccupazioni che vorresti condividere con il tuo medico:",
    punteggio: null
  }
];

const QuestionnaireCompilation = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, any>>({});
  const [isCompleted, setIsCompleted] = useState(false);

  const currentQ = questionnaireQuestions[currentQuestion];
  const progress = ((currentQuestion + 1) / questionnaireQuestions.length) * 100;

  const handleAnswerChange = (questionId: number, value: any) => {
    const newAnswers = {
      ...answers,
      [questionId]: value
    };
    setAnswers(newAnswers);
    
    // Salvataggio automatico
    console.log("Salvataggio automatico:", newAnswers);
    // In una implementazione reale, qui faresti una chiamata API per salvare
  };

  const handleNext = () => {
    if (currentQuestion < questionnaireQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setIsCompleted(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSave = () => {
    // Qui implementeresti il salvataggio delle risposte
    console.log("Risposte salvate:", answers);
    alert("Questionario salvato con successo!");
  };

  const renderQuestion = () => {
    const currentAnswer = answers[currentQ.id];

    switch (currentQ.tipo) {
      case "radio":
        return (
          <RadioGroup
            value={currentAnswer || ""}
            onValueChange={(value) => handleAnswerChange(currentQ.id, value)}
            className="space-y-3"
          >
            {currentQ.opzioni?.map((opzione) => (
              <div key={opzione.valore} className="flex items-center space-x-2">
                <RadioGroupItem value={opzione.valore} id={opzione.valore} />
                <Label htmlFor={opzione.valore} className="text-base cursor-pointer">
                  {opzione.etichetta}
                </Label>
              </div>
            ))}
          </RadioGroup>
        );

      case "checkbox":
        return (
          <div className="space-y-3">
            {currentQ.opzioni?.map((opzione) => (
              <div key={opzione.valore} className="flex items-center space-x-2">
                <Checkbox
                  id={opzione.valore}
                  checked={currentAnswer?.includes(opzione.valore) || false}
                  onCheckedChange={(checked) => {
                    const currentValues = currentAnswer || [];
                    if (checked) {
                      handleAnswerChange(currentQ.id, [...currentValues, opzione.valore]);
                    } else {
                      handleAnswerChange(currentQ.id, currentValues.filter((v: string) => v !== opzione.valore));
                    }
                  }}
                />
                <Label htmlFor={opzione.valore} className="text-base cursor-pointer">
                  {opzione.etichetta}
                </Label>
              </div>
            ))}
          </div>
        );

      case "textarea":
        return (
          <Textarea
            value={currentAnswer || ""}
            onChange={(e) => handleAnswerChange(currentQ.id, e.target.value)}
            placeholder="Scrivi qui le tue considerazioni..."
            className="min-h-[120px]"
          />
        );

      default:
        return null;
    }
  };

  if (isCompleted) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <PazienteNavbar />
        
        <div className="container mx-auto px-4 py-8 flex-1 flex items-center justify-center">
          <Card className="max-w-md w-full text-center">
            <CardHeader>
              <div className="mx-auto mb-4 w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <CardTitle className="text-2xl text-green-800">Questionario Completato!</CardTitle>
              <CardDescription>
                Grazie per aver completato il questionario. Le tue risposte sono state salvate e saranno condivise con il tuo medico.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-sm text-muted-foreground">
                <p>Risposte fornite: {Object.keys(answers).length}</p>
                <p>Data completamento: {new Date().toLocaleDateString('it-IT')}</p>
              </div>
              <div className="flex gap-2">
                <Button onClick={handleSave} className="flex-1">
                  <Save className="w-4 h-4 mr-2" />
                  Salva Risultati
                </Button>
                <Button variant="outline" onClick={() => window.location.href = '/paziente'}>
                  Torna alla Home
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <PazienteNavbar />

      <div className="container mx-auto px-4 py-8 flex-1">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <Button variant="ghost" size="sm" onClick={() => window.location.href = '/paziente'}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Torna alla Home
            </Button>
          </div>
          
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold">Questionario Sintomi</h1>
              <p className="text-muted-foreground">
                Domanda {currentQuestion + 1} di {questionnaireQuestions.length}
              </p>
            </div>
            <div className="text-right">
              <div className="text-sm text-muted-foreground mb-1">Progresso</div>
              <div className="text-lg font-semibold">{Math.round(progress)}%</div>
            </div>
          </div>
          
          <Progress value={progress} className="h-2" />
        </div>

        {/* Question Card */}
        <Card className="max-w-3xl mx-auto">
          <CardHeader>
            <CardTitle className="text-xl">
              {currentQ.domanda}
            </CardTitle>
            {currentQ.tipo === "checkbox" && (
              <CardDescription>
                Seleziona tutte le opzioni che ti riguardano
              </CardDescription>
            )}
          </CardHeader>
          <CardContent className="space-y-6">
            {renderQuestion()}
            
            {/* Navigation */}
            <div className="flex justify-between pt-6 border-t">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentQuestion === 0}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Precedente
              </Button>
              
              <div className="flex gap-2">
                <Button onClick={handleNext}>
                  {currentQuestion === questionnaireQuestions.length - 1 ? (
                    <>
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Completa
                    </>
                  ) : (
                    <>
                      Successiva
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </>
                  )}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Footer */}
      <footer className="border-t bg-card">
        <div className="container mx-auto px-4 py-8 text-center text-sm text-muted-foreground">
          <p>© 2025 Istituto Oncologico Veneto - Tutti i diritti riservati</p>
          <p className="mt-2">Sistema demo per pazienti</p>
        </div>
      </footer>
    </div>
  );
};

export default QuestionnaireCompilation;
