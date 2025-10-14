import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";
import { MessageSquare, ClipboardCheck } from "lucide-react";
import { ChatbotFullscreen } from "@/mmg/components/ChatbotFullscreen";
import { DirectSelectionDialog } from "@/mmg/components/DirectSelectionDialog";
import { Navbar } from "@/mmg/components/Navbar";

const Index = () => {
  const [chatbotOpen, setChatbotOpen] = useState(false);
  const [selectionOpen, setSelectionOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12 flex-1">

        {/* Main Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Chatbot Card */}
          <Card className="hover:shadow-lg transition-shadow cursor-pointer border-2 hover:border-primary/50" onClick={() => setChatbotOpen(true)}>
            <CardHeader className="text-center pb-4">
              <div className="mx-auto mb-4 w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                <MessageSquare className="w-8 h-8 text-primary" />
              </div>
              <CardTitle className="text-2xl">Autovalutazione AI</CardTitle>
              <CardDescription className="text-base">
                Scopri il PDTA più adatto al paziente
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-sm text-muted-foreground mb-6">
                Il chatbot ti guiderà attraverso domande mirate per identificare il percorso diagnostico-terapeutico appropriato per il tuo paziente.
              </p>
              <Button className="w-full" size="lg">
                Avvia Autovalutazione
              </Button>
            </CardContent>
          </Card>

          {/* Direct Selection Card */}
          <Card className="hover:shadow-lg transition-shadow cursor-pointer border-2 hover:border-primary/50" onClick={() => setSelectionOpen(true)}>
            <CardHeader className="text-center pb-4">
              <div className="mx-auto mb-4 w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center">
                <ClipboardCheck className="w-8 h-8 text-accent" />
              </div>
              <CardTitle className="text-2xl">Selezione Diretta PDTA</CardTitle>
              <CardDescription className="text-base">
                Verifica i requisiti per un PDTA specifico
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-sm text-muted-foreground mb-6">
                Se conosci già il PDTA appropriato, selezionalo direttamente e verifica che il paziente soddisfi tutti i criteri di accesso.
              </p>
              <Button className="w-full" variant="default" size="lg">
                Seleziona PDTA
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t bg-card">
        <div className="container mx-auto px-4 py-8 text-center text-sm text-muted-foreground">
          <p>© 2025 Istituto Oncologico Veneto - Tutti i diritti riservati</p>
          <p className="mt-2">Sistema demo per medici di medicina generale</p>
        </div>
      </footer>

      {/* Dialogs */}
      <ChatbotFullscreen open={chatbotOpen} onOpenChange={setChatbotOpen} />
      <DirectSelectionDialog open={selectionOpen} onOpenChange={setSelectionOpen} />
    </div>
  );
};

export default Index;
