import { DocumentsSection } from "@/mmg/components/DocumentsSection";
import { Navbar } from "@/mmg/components/Navbar";

const Documenti = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

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
