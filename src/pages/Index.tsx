import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { MessageSquare, ClipboardCheck, FileText, ExternalLink } from "lucide-react";
import { ChatbotDialog } from "@/components/ChatbotDialog";
import { DirectSelectionDialog } from "@/components/DirectSelectionDialog";
import { DocumentsSection } from "@/components/DocumentsSection";

const Index = () => {
  const [chatbotOpen, setChatbotOpen] = useState(false);
  const [selectionOpen, setSelectionOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-primary">IOV</h1>
              <p className="text-sm text-muted-foreground">Istituto Oncologico Veneto</p>
            </div>
            <div className="text-right">
              <h2 className="text-lg font-semibold text-foreground">Portale Medici di Medicina Generale</h2>
              <p className="text-sm text-muted-foreground">Accesso ai Percorsi Diagnostico-Terapeutici Assistenziali</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Benvenuto al Sistema PDTA
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Strumento di supporto per l'accesso ai Percorsi Diagnostico-Terapeutici Assistenziali dell'IOV
          </p>
        </div>

        {/* Main Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-20">
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
              <Button className="w-full" variant="secondary" size="lg">
                Seleziona PDTA
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Documents Section */}
        <DocumentsSection />

        {/* CUP Link Section */}
        <div className="mt-16 text-center">
          <Card className="max-w-2xl mx-auto bg-primary/5 border-primary/20">
            <CardContent className="pt-6">
              <div className="flex items-center justify-center gap-3 mb-4">
                <ExternalLink className="w-6 h-6 text-primary" />
                <h3 className="text-xl font-semibold text-foreground">Prenotazione CUP</h3>
              </div>
              <p className="text-muted-foreground mb-6">
                Effettua la prenotazione per il paziente attraverso il sistema CUP regionale
              </p>
              <Button variant="outline" size="lg" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                Vai al CUP
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t bg-card mt-20">
        <div className="container mx-auto px-4 py-8 text-center text-sm text-muted-foreground">
          <p>© 2025 Istituto Oncologico Veneto - Tutti i diritti riservati</p>
          <p className="mt-2">Sistema demo per medici di medicina generale</p>
        </div>
      </footer>

      {/* Dialogs */}
      <ChatbotDialog open={chatbotOpen} onOpenChange={setChatbotOpen} />
      <DirectSelectionDialog open={selectionOpen} onOpenChange={setSelectionOpen} />
    </div>
  );
};

export default Index;
