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
          {/* Direct Selection Card */}
          <Card
            className="hover:shadow-2xl transition-all duration-300 cursor-pointer border-0 shadow-lg hover:scale-105 bg-gradient-to-br from-blue-50 via-white to-blue-50/30 overflow-hidden hover:from-blue-100 hover:to-blue-50"
            onClick={() => setSelectionOpen(true)}
          >
            <CardHeader className="text-center pb-4">
              <div className="mx-auto mb-4 w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:from-blue-600 hover:to-blue-700">
                <ClipboardCheck className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-2xl font-bold text-gray-800">Selezione PDTA</CardTitle>
              <CardDescription className="text-base text-gray-600">
                Verifica i requisiti per un PDTA specifico
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-sm text-gray-500 mb-6 leading-relaxed">
                Se conosci già il PDTA appropriato, selezionalo direttamente e verifica che il paziente soddisfi tutti i criteri di accesso.
              </p>
              <Button
                className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 px-4 rounded-xl font-semibold text-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:from-blue-600 hover:to-blue-700"
                variant="default"
                size="lg"
              >
                Seleziona PDTA
              </Button>
            </CardContent>
          </Card>

          {/* Chatbot Card */}
          <Card
            className="hover:shadow-2xl transition-all duration-300 cursor-pointer border-0 shadow-lg hover:scale-105 bg-gradient-to-br from-blue-50 via-white to-blue-50/30 overflow-hidden hover:from-blue-100 hover:to-blue-50"
            onClick={() => setChatbotOpen(true)}
          >
            <CardHeader className="text-center pb-4">
              <div className="mx-auto mb-4 w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:from-blue-600 hover:to-blue-700">
                <MessageSquare className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-2xl font-bold text-gray-800">Consulta PDTA</CardTitle>
              <CardDescription className="text-base text-gray-600">
                Consulta i PDTA regionali in base alle esigenze del tuo paziente
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-sm text-gray-500 mb-6 leading-relaxed">
                Il chatbot ti guiderà attraverso domande mirate per identificare il percorso diagnostico-terapeutico appropriato per il tuo paziente.
              </p>
              <Button
                className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 px-4 rounded-xl font-semibold text-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:from-blue-600 hover:to-blue-700"
                size="lg"
              >
                Avvia Autovalutazione
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
