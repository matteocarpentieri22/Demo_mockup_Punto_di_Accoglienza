import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

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

export function DocumentsSection() {
  return (
    <section className="max-w-6xl mx-auto">
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 mb-4">
          <FileText className="w-6 h-6 text-primary" />
          <h2 className="text-3xl font-bold text-foreground">Documenti PDTA</h2>
        </div>
        <p className="text-muted-foreground">
          Criteri di accesso, prerequisiti, esami preliminari e moduli per ciascun percorso
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        {PDTA_LIST.map((pdta) => (
          <Card key={pdta} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">{pdta}</CardTitle>
              <CardDescription className="text-xs">
                Documentazione completa del PDTA
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full justify-start text-xs"
                >
                  <Download className="w-3 h-3 mr-2" />
                  Criteri di accesso
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full justify-start text-xs"
                >
                  <Download className="w-3 h-3 mr-2" />
                  Scheda sintetica
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full justify-start text-xs"
                >
                  <Download className="w-3 h-3 mr-2" />
                  Modulo richiesta
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-8 text-center">
        <p className="text-sm text-muted-foreground">
          Demo - I documenti saranno disponibili dopo l'integrazione con il sistema documentale IOV
        </p>
      </div>
    </section>
  );
}
