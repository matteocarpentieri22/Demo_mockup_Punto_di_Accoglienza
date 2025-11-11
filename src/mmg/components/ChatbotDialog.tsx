import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/shared/components/ui/dialog";
import { Button } from "@/shared/components/ui/button";
import { ScrollArea } from "@/shared/components/ui/scroll-area";
import { MessageSquare, Send } from "lucide-react";
import { Input } from "@/shared/components/ui/input";

interface ChatbotDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface Message {
  role: "user" | "assistant";
  content: string;
}

export function ChatbotDialog({ open, onOpenChange }: ChatbotDialogProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Ciao! Sono il tuo assistente per i PDTA dell'IOV.\n\nPosso aiutarti a valutare casi clinici, identificare gli esami preliminari necessari e interpretare i Percorsi Diagnostico-Terapeutici.\n\nLe mie risposte si basano esclusivamente sui documenti PDTA caricati.\n\nDescrivi il caso clinico o fai una domanda per iniziare."
    }
  ]);
  const [inputValue, setInputValue] = useState("");

  const demoResponses = [
    "Grazie. Il paziente ha sintomi specifici che ha notato? Ad esempio: tosse persistente, perdita di peso, dolore localizzato, cambiamenti nella pelle o nei nei?",
    "Capisco. Ha già effettuato degli esami diagnostici preliminari? (es. esami del sangue, radiografie, ecografie, TAC)?",
    "In base alle informazioni fornite, il paziente potrebbe rientrare in uno dei seguenti PDTA: Polmone, Melanoma, o Colon. Ti consiglio di procedere con esami preliminari specifici. Vuoi maggiori informazioni su uno di questi PDTA?",
    "Perfetto. Per il PDTA Polmone, i prerequisiti includono: TC torace, esami ematochimici completi, spirometria. Trovi tutti i dettagli nella sezione Documenti. Vuoi che ti mostri il modulo di richiesta?"
  ];

  const [responseIndex, setResponseIndex] = useState(0);

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const newMessages: Message[] = [
      ...messages,
      { role: "user", content: inputValue }
    ];

    if (responseIndex < demoResponses.length) {
      newMessages.push({
        role: "assistant",
        content: demoResponses[responseIndex]
      });
      setResponseIndex(responseIndex + 1);
    }

    setMessages(newMessages);
    setInputValue("");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl h-[600px] flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-primary" />
            Autovalutazione AI - Chatbot PDTA
          </DialogTitle>
          <DialogDescription>
            Rispondi alle domande per identificare il percorso più adatto
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="flex-1 pr-4">
          <div className="space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg px-4 py-3 ${
                    message.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-foreground"
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        <div className="flex gap-2 pt-4 border-t">
          <Input
            placeholder="Scrivi la tua risposta..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
          />
          <Button onClick={handleSend} size="icon">
            <Send className="w-4 h-4" />
          </Button>
        </div>

        <p className="text-xs text-muted-foreground text-center pt-2">
          Demo - Le risposte sono simulate per scopi dimostrativi
        </p>
      </DialogContent>
    </Dialog>
  );
}
