import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/shared/components/ui/dialog";
import { Button } from "@/shared/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/components/ui/select";
import { Label } from "@/shared/components/ui/label";

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

type ChecklistItem = {
  id: string;
  label: string;
};

const PDTA_CHECKLISTS: Record<string, ChecklistItem[]> = {
  "Polmone": [
    { id: "pol-1", label: "Rx torace" },
    { id: "pol-2", label: "TC torace" },
    { id: "pol-3", label: "Visita pneumologica" },
    { id: "pol-4", label: "Biopsia ed esame istologico" }
  ],
  "Prostata": [
    { id: "prost-1", label: "Visita urologica + ER + PSA" },
    { id: "prost-2", label: "RM prostatica multiparametrica" },
    { id: "prost-3", label: "Biopsia prostatica" }
  ],
  "Colon": [
    { id: "colon-1", label: "Visita specialistica (gastroenterologo o chirurgo)" },
    { id: "colon-2", label: "Pancolonscopia con biopsia" },
    { id: "colon-3", label: "Esame istologico" }
  ],
  "Retto": [
    { id: "retto-1", label: "Visita specialistica (gastroenterologo o chirurgo)" },
    { id: "retto-2", label: "Pancolonscopia con biopsia" },
    { id: "retto-3", label: "Esame istologico" }
  ],
  "Melanoma": [
    { id: "mel-1", label: "Visita dermatologica con dermatoscopia o chirurgica per neoformazioni" },
    { id: "mel-2", label: "Biopsia escissionale ed esame istologico" }
  ],
  "Mammella": [
    { id: "mam-1", label: "Visita senologica" },
    { id: "mam-2", label: "Mammografia bilaterale" },
    { id: "mam-3", label: "Ecografia bilaterale" },
    { id: "mam-4", label: "Biopsia ed esame istologico" }
  ],
  "Stomaco": [
    { id: "sto-1", label: "EGDS (Esofagogastroduodenoscopia) con biopsia" },
    { id: "sto-2", label: "Esame istologico" }
  ],
  "Sarcomi dei tessuti molli": [
    { id: "sar-1", label: "Visita chirurgica" },
    { id: "sar-2", label: "Ecografia dei tessuti molli" },
    { id: "sar-3", label: "Risonanza magnetica (eventualmente con ecografia)" },
    { id: "sar-4", label: "Biopsia ed esame istologico" }
  ],
  "Sistema nervoso centrale": [
    { id: "snc-1", label: "Visita neurologica" },
    { id: "snc-2", label: "Risonanza Magnetica (RMN) o Tomografia Computerizzata (TC)" }
  ]
};

export function DirectSelectionDialog({ open, onOpenChange }: DirectSelectionDialogProps) {
  const [selectedPDTA, setSelectedPDTA] = useState<string>("");

  const checklist = selectedPDTA ? PDTA_CHECKLISTS[selectedPDTA] || [] : [];

  const resetDialog = () => {
    setSelectedPDTA("");
  };

  return (
    <Dialog open={open} onOpenChange={(open) => {
      onOpenChange(open);
      if (!open) resetDialog();
    }}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Selezione Diretta PDTA</DialogTitle>
          <DialogDescription>
            Seleziona il PDTA per visualizzare gli esami necessari
          </DialogDescription>
        </DialogHeader>

        {!selectedPDTA ? (
          <div className="space-y-6 py-4">
            <div>
              <Label htmlFor="pdta-select" className="text-base font-semibold mb-3 block">
                Seleziona il PDTA
              </Label>
              <Select value={selectedPDTA} onValueChange={(value) => {
                setSelectedPDTA(value);
              }}>
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
          </div>
        ) : (
          <div className="space-y-6 py-4 max-h-[60vh] overflow-y-auto">
            <div className="bg-primary/5 p-4 rounded-lg">
              <p className="text-sm font-semibold text-primary">PDTA Selezionato: {selectedPDTA}</p>
            </div>

            <div className="space-y-4">
              <Label className="text-base font-semibold text-gray-800">
                Esami necessari per la visita oncologica:
              </Label>
              <div className="border rounded-xl p-6 bg-gradient-to-br from-blue-50/50 via-white to-blue-50/30 shadow-sm">
                <ul className="space-y-3">
                  {checklist.map((item, index) => (
                    <li 
                      key={item.id} 
                      className="flex items-center gap-3 p-3 rounded-lg bg-white/80 hover:bg-white transition-all duration-200 hover:shadow-md border border-gray-100"
                    >
                      <div className="flex-shrink-0">
                        <div className="w-3 h-3 rounded-full bg-blue-600"></div>
                      </div>
                      <span className="text-sm font-medium text-gray-800 leading-relaxed flex-1">
                        {item.label}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="flex gap-2">
              <Button 
                variant="outline" 
                onClick={resetDialog}
                className="flex-1"
              >
                Indietro
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
