import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Badge } from "@/shared/components/ui/badge";
import { Separator } from "@/shared/components/ui/separator";
import { Button } from "@/shared/components/ui/button";
import { FileText, Download, Info, CheckCircle2, Clock, Mail, Phone } from "lucide-react";

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
          <Card
            key={pdta}
            className="hover:shadow-2xl transition-all duration-300 cursor-pointer border-0 shadow-lg hover:scale-105 bg-gradient-to-br from-blue-50 via-white to-blue-50/30 overflow-hidden hover:from-blue-100 hover:to-blue-50"
          >
            <CardHeader className="pb-3 text-center">
              <CardTitle className="text-lg font-bold text-gray-800">{pdta}</CardTitle>
              <CardDescription className="text-xs text-gray-600">
                Documentazione completa del PDTA
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full justify-start text-xs hover:bg-blue-50 hover:border-blue-300"
                >
                  <Download className="w-3 h-3 mr-2" />
                  Criteri di accesso
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full justify-start text-xs hover:bg-blue-50 hover:border-blue-300"
                >
                  <Download className="w-3 h-3 mr-2" />
                  Scheda sintetica
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full justify-start text-xs hover:bg-blue-50 hover:border-blue-300"
                >
                  <Download className="w-3 h-3 mr-2" />
                  Modulo richiesta
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Informazioni generali di accesso allo IOV (mock) - versione migliorata spostata sotto */}
      <div className="mt-12 rounded-2xl border bg-gradient-to-br from-blue-50 via-white to-blue-50/50 shadow-lg">
        <div className="grid md:grid-cols-2 gap-0">
          {/* Colonna contenuti */}
          <div className="p-6 md:p-8">
            <div className="flex items-center gap-2 mb-2">
              <Info className="w-5 h-5 text-blue-700" />
              <span className="text-sm text-blue-700">Orientamento MMG</span>
            </div>
            <h3 className="text-2xl font-semibold text-foreground">Accesso allo IOV</h3>
            <p className="text-muted-foreground mt-2">
              Indicazioni sintetiche sui percorsi di presa in carico e prima valutazione. Contenuti
              dimostrativi in attesa di validazione definitiva.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Badge variant="secondary" className="bg-blue-100 text-blue-800 border-blue-200">PDTA</Badge>
              <Badge variant="secondary" className="bg-blue-100 text-blue-800 border-blue-200">Accoglienza</Badge>
              <Badge variant="secondary" className="bg-blue-100 text-blue-800 border-blue-200">Triage</Badge>
            </div>

            <Separator className="my-6" />

            {/* Timeline semplice */}
            <div className="space-y-5">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 rounded-full bg-blue-600/10 p-1">
                  <CheckCircle2 className="w-4 h-4 text-blue-700" />
                </div>
                <div>
                  <p className="font-medium text-foreground">Invio richiesta</p>
                  <p className="text-sm text-muted-foreground">Impegnativa MMG o segnalazione con referti disponibili (imaging, istologia, lab).</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="mt-0.5 rounded-full bg-blue-600/10 p-1">
                  <CheckCircle2 className="w-4 h-4 text-blue-700" />
                </div>
                <div>
                  <p className="font-medium text-foreground">Accoglienza e triage</p>
                  <p className="text-sm text-muted-foreground">Verifica requisiti minimi e indirizzamento al PDTA più appropriato.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="mt-0.5 rounded-full bg-blue-600/10 p-1">
                  <CheckCircle2 className="w-4 h-4 text-blue-700" />
                </div>
                <div>
                  <p className="font-medium text-foreground">Prima valutazione</p>
                  <p className="text-sm text-muted-foreground">Visita con referente di percorso ed eventuali approfondimenti preliminari.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="mt-0.5 rounded-full bg-blue-600/10 p-1">
                  <CheckCircle2 className="w-4 h-4 text-blue-700" />
                </div>
                <div>
                  <p className="font-medium text-foreground">Presa in carico</p>
                  <p className="text-sm text-muted-foreground">Definizione del PDTA e comunicazione strutturata al MMG.</p>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="mt-6 flex flex-wrap gap-3">
              <Button variant="default" size="sm" className="bg-blue-600 hover:bg-blue-700">
                <Download className="w-4 h-4 mr-2" />
                Scarica guida PDF (mock)
              </Button>
              <Button variant="outline" size="sm">
                Contatta Accoglienza (mock)
              </Button>
            </div>

            <p className="mt-3 text-xs text-muted-foreground">Nota: contenuti mock a solo scopo dimostrativo.</p>
          </div>

          {/* Colonna visual */}
          <div className="relative overflow-hidden rounded-b-2xl md:rounded-l-none md:rounded-r-2xl">
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-100/60 via-transparent to-blue-200/40" />
            <img
              src="/placeholder.svg"
              alt="IOV accesso illustrativo"
              className="h-full w-full object-cover min-h-[260px]"
            />
            {/* Card contatti */}
            <div className="absolute bottom-4 right-4 left-4 md:left-auto md:w-[320px] rounded-xl border bg-white/90 backdrop-blur p-4 shadow">
              <p className="text-sm font-medium text-foreground mb-2">Contatti Accoglienza (mock)</p>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="w-4 h-4" />
                <span>accoglienza@iov.example.it</span>
              </div>
              <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="w-4 h-4" />
                <span>049 123 4567</span>
              </div>
              <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
                <Clock className="w-3.5 h-3.5" />
                <span>Triage 3-5 gg, prima visita 10-15 gg</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 text-center">
        <p className="text-sm text-muted-foreground">
          Demo - I documenti saranno disponibili dopo l'integrazione con il sistema documentale IOV
        </p>
      </div>
    </section>
  );
}
