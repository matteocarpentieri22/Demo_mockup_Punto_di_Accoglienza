import { DocumentsSection } from "@/components/DocumentsSection";

const Documenti = () => {
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
              <h2 className="text-lg font-semibold text-foreground">Documenti PDTA</h2>
              <p className="text-sm text-muted-foreground">Documentazione per i Percorsi Diagnostico-Terapeutici</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <DocumentsSection />
      </main>

      {/* Footer */}
      <footer className="border-t bg-card mt-20">
        <div className="container mx-auto px-4 py-8 text-center text-sm text-muted-foreground">
          <p>© 2025 Istituto Oncologico Veneto - Tutti i diritti riservati</p>
          <p className="mt-2">Sistema demo per medici di medicina generale</p>
        </div>
      </footer>
    </div>
  );
};

export default Documenti;
