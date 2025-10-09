import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { CheckCircle2, XCircle } from "lucide-react";

interface DirectSelectionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

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

export function DirectSelectionDialog({ open, onOpenChange }: DirectSelectionDialogProps) {
  const [selectedPDTA, setSelectedPDTA] = useState<string>("");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [showResult, setShowResult] = useState(false);

  const questions = [
    {
      question: "Il paziente ha effettuato gli esami ematochimici preliminari?",
      options: ["Sì, completi", "Sì, parziali", "No"]
    },
    {
      question: "Il paziente ha eseguito esami di imaging diagnostico?",
      options: ["Sì, recenti (< 3 mesi)", "Sì, ma datati (> 3 mesi)", "No"]
    },
    {
      question: "Il paziente soddisfa i criteri di età per il PDTA selezionato?",
      options: ["Sì", "No", "Non sono sicuro"]
    }
  ];

  const handleStartQuestions = () => {
    if (selectedPDTA) {
      setCurrentQuestion(0);
      setAnswers({});
      setShowResult(false);
    }
  };

  const handleAnswer = (value: string) => {
    setAnswers({ ...answers, [currentQuestion]: value });
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResult(true);
    }
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const resetDialog = () => {
    setSelectedPDTA("");
    setCurrentQuestion(0);
    setAnswers({});
    setShowResult(false);
  };

  const allQuestionsAnswered = Object.keys(answers).length === questions.length;
  const patientQualifies = allQuestionsAnswered && 
    answers[0] === "Sì, completi" && 
    answers[1] === "Sì, recenti (< 3 mesi)" && 
    answers[2] === "Sì";

  return (
    <Dialog open={open} onOpenChange={(open) => {
      onOpenChange(open);
      if (!open) resetDialog();
    }}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Selezione Diretta PDTA</DialogTitle>
          <DialogDescription>
            Seleziona il PDTA e verifica i requisiti del paziente
          </DialogDescription>
        </DialogHeader>

        {!selectedPDTA ? (
          <div className="space-y-6 py-4">
            <div>
              <Label htmlFor="pdta-select" className="text-base font-semibold mb-3 block">
                Seleziona il PDTA
              </Label>
              <Select value={selectedPDTA} onValueChange={setSelectedPDTA}>
                <SelectTrigger id="pdta-select" className="w-full">
                  <SelectValue placeholder="Scegli un percorso..." />
                </SelectTrigger>
                <SelectContent>
                  {PDTA_LIST.map((pdta) => (
                    <SelectItem key={pdta} value={pdta}>
                      {pdta}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button 
              onClick={handleStartQuestions} 
              disabled={!selectedPDTA}
              className="w-full"
              size="lg"
            >
              Inizia Verifica
            </Button>
          </div>
        ) : !showResult ? (
          <div className="space-y-6 py-4">
            <div className="bg-primary/5 p-4 rounded-lg">
              <p className="text-sm font-semibold text-primary">PDTA Selezionato: {selectedPDTA}</p>
              <p className="text-xs text-muted-foreground mt-1">
                Domanda {currentQuestion + 1} di {questions.length}
              </p>
            </div>

            <div className="space-y-4">
              <Label className="text-base font-semibold">
                {questions[currentQuestion].question}
              </Label>
              <RadioGroup 
                value={answers[currentQuestion]} 
                onValueChange={handleAnswer}
              >
                {questions[currentQuestion].options.map((option) => (
                  <div key={option} className="flex items-center space-x-2">
                    <RadioGroupItem value={option} id={option} />
                    <Label htmlFor={option} className="cursor-pointer">
                      {option}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            <div className="flex gap-2">
              <Button 
                variant="outline" 
                onClick={handleBack}
                disabled={currentQuestion === 0}
                className="flex-1"
              >
                Indietro
              </Button>
              <Button 
                onClick={handleNext}
                disabled={!answers[currentQuestion]}
                className="flex-1"
              >
                {currentQuestion < questions.length - 1 ? "Avanti" : "Completa"}
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-6 py-4">
            <div className={`p-6 rounded-lg text-center ${
              patientQualifies ? "bg-green-50 border-2 border-green-200" : "bg-orange-50 border-2 border-orange-200"
            }`}>
              {patientQualifies ? (
                <>
                  <CheckCircle2 className="w-16 h-16 text-green-600 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-green-900 mb-2">
                    Paziente idoneo per il PDTA {selectedPDTA}
                  </h3>
                  <p className="text-green-800">
                    Il paziente soddisfa tutti i requisiti preliminari. Puoi procedere con la richiesta di accesso al percorso.
                  </p>
                </>
              ) : (
                <>
                  <XCircle className="w-16 h-16 text-orange-600 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-orange-900 mb-2">
                    Requisiti non completamente soddisfatti
                  </h3>
                  <p className="text-orange-800">
                    Alcuni prerequisiti potrebbero mancare. Verifica la documentazione necessaria nella sezione Documenti o contatta il Punto di Accoglienza IOV.
                  </p>
                </>
              )}
            </div>

            <div className="flex gap-2">
              <Button variant="outline" onClick={resetDialog} className="flex-1">
                Nuova Verifica
              </Button>
              <Button onClick={() => onOpenChange(false)} className="flex-1">
                Chiudi
              </Button>
            </div>
          </div>
        )}

        <p className="text-xs text-muted-foreground text-center">
          Demo - Questo è un flusso simulato per scopi dimostrativi
        </p>
      </DialogContent>
    </Dialog>
  );
}
