import { useState, useRef, useEffect } from "react";
import { Button } from "@/shared/components/ui/button";
import { ScrollArea } from "@/shared/components/ui/scroll-area";
import { MessageSquare, Send, X, RotateCcw } from "lucide-react";
import { Input } from "@/shared/components/ui/input";
import { Avatar, AvatarFallback } from "@/shared/components/ui/avatar";

interface ChatbotFullscreenProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp?: Date;
}

export function ChatbotFullscreen({ open, onOpenChange }: ChatbotFullscreenProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Ciao! Sono il tuo assistente per i PDTA dell'IOV.\n\nPosso aiutarti a valutare casi clinici, identificare gli esami preliminari necessari e interpretare i Percorsi Diagnostico-Terapeutici.\n\nLe mie risposte si basano esclusivamente sui documenti PDTA caricati.\n\nDescrivi il caso clinico o fai una domanda per iniziare.",
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const demoResponses = [
    "Grazie. Il paziente ha sintomi specifici che ha notato? Ad esempio: tosse persistente, perdita di peso, dolore localizzato, cambiamenti nella pelle o nei nei?",
    "Capisco. Ha già effettuato degli esami diagnostici preliminari? (es. esami del sangue, radiografie, ecografie, TAC)?",
    "In base alle informazioni fornite, il paziente potrebbe rientrare in uno dei seguenti PDTA: Polmone, Melanoma, o Colon. Ti consiglio di procedere con esami preliminari specifici. Vuoi maggiori informazioni su uno di questi PDTA?",
    "Perfetto. Per il PDTA Polmone, i prerequisiti includono: TC torace, esami ematochimici completi, spirometria. Trovi tutti i dettagli nella sezione Documenti. Vuoi che ti mostri il modulo di richiesta?"
  ];

  const [responseIndex, setResponseIndex] = useState(0);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  }, [messages]);

  // Focus input when component opens
  useEffect(() => {
    if (open && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open]);

  const handleSend = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      role: "user",
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate typing delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (responseIndex < demoResponses.length) {
      const assistantMessage: Message = {
        role: "assistant",
        content: demoResponses[responseIndex],
        timestamp: new Date()
      };
      setMessages(prev => [...prev, assistantMessage]);
      setResponseIndex(responseIndex + 1);
    }

    setIsTyping(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const resetConversation = () => {
    setMessages([
      {
        role: "assistant",
        content: "Ciao! Sono il tuo assistente per i PDTA dell'IOV.\n\nPosso aiutarti a valutare casi clinici, identificare gli esami preliminari necessari e interpretare i Percorsi Diagnostico-Terapeutici.\n\nLe mie risposte si basano esclusivamente sui documenti PDTA caricati.\n\nDescrivi il caso clinico o fai una domanda per iniziare.",
        timestamp: new Date()
      }
    ]);
    setResponseIndex(0);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('it-IT', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-background flex flex-col">
      {/* Header */}
      <div className="border-b bg-card/50 backdrop-blur-sm">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
              <MessageSquare className="w-4 h-4 text-primary" />
            </div>
            <div>
              <h1 className="text-lg font-semibold">Autovalutazione AI - Chatbot PDTA</h1>
              <p className="text-sm text-muted-foreground">Assistente virtuale IOV</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={resetConversation}
              className="text-muted-foreground hover:text-foreground"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Nuova conversazione
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onOpenChange(false)}
              className="text-muted-foreground hover:text-foreground"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col min-h-0">
        <ScrollArea ref={scrollAreaRef} className="flex-1">
          <div className="max-w-4xl mx-auto px-6 py-6">
            <div className="space-y-6">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex gap-4 ${
                    message.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  {message.role === "assistant" && (
                    <Avatar className="w-8 h-8 shrink-0">
                      <AvatarFallback className="bg-primary/10 text-primary text-sm font-medium">
                        AI
                      </AvatarFallback>
                    </Avatar>
                  )}
                  
                  <div
                    className={`max-w-[80%] ${
                      message.role === "user" ? "order-first" : ""
                    }`}
                  >
                    <div
                      className={`rounded-2xl px-4 py-3 ${
                        message.role === "user"
                          ? "bg-primary text-primary-foreground ml-auto"
                          : "bg-muted text-foreground"
                      }`}
                    >
                      <p className="text-sm leading-relaxed whitespace-pre-wrap">
                        {message.content}
                      </p>
                    </div>
                    {message.timestamp && (
                      <p className="text-xs text-muted-foreground mt-1 px-2">
                        {formatTime(message.timestamp)}
                      </p>
                    )}
                  </div>

                  {message.role === "user" && (
                    <Avatar className="w-8 h-8 shrink-0">
                      <AvatarFallback className="bg-accent text-accent-foreground text-sm font-medium">
                        TU
                      </AvatarFallback>
                    </Avatar>
                  )}
                </div>
              ))}

              {/* Typing indicator */}
              {isTyping && (
                <div className="flex gap-4 justify-start">
                  <Avatar className="w-8 h-8 shrink-0">
                    <AvatarFallback className="bg-primary/10 text-primary text-sm font-medium">
                      AI
                    </AvatarFallback>
                  </Avatar>
                  <div className="bg-muted text-foreground rounded-2xl px-4 py-3">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </ScrollArea>

        {/* Input Area */}
        <div className="border-t bg-card/50 backdrop-blur-sm">
          <div className="max-w-4xl mx-auto px-6 py-4">
            <div className="flex gap-3">
              <div className="flex-1 relative">
                <Input
                  ref={inputRef}
                  placeholder="Scrivi la tua risposta..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="pr-12 h-12 rounded-full border-2 focus:border-primary/50"
                  disabled={isTyping}
                />
                <Button
                  onClick={handleSend}
                  size="sm"
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full w-8 h-8 p-0"
                  disabled={!inputValue.trim() || isTyping}
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
            <p className="text-xs text-muted-foreground text-center mt-3">
              Demo - Le risposte sono simulate per scopi dimostrativi
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
