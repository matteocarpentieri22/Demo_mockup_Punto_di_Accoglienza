import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";
import { Badge } from "@/shared/components/ui/badge";
import { ExternalLink, FileText, Shield, Heart, Calendar, Phone, Mail, MapPin, Clock, CheckCircle, AlertCircle, Info, Percent } from "lucide-react";
import PazienteNavbar from "@/paziente/components/PazienteNavbar";

// Mock data per le informazioni del paziente
const patientInfo = {
  nome: "Mario",
  cognome: "Rossi",
  codiceFiscale: "RSSMRA65A01H501U",
  dataNascita: "15/01/1965",
  telefono: "049 1234567",
  email: "mario.rossi@email.com",
  indirizzo: "Via Roma 123, 35100 Padova",
  medicoCurante: "Dr. Bianchi",
  telefonoMedico: "049 9876543"
};

// Mock data per esenzioni e invalidità
const administrativeInfo = {
  esenzioni: [
    {
      id: 1,
      codice: "048",
      descrizione: "Tumore Polmone",
      dataInizio: "15/01/2024",
      dataScadenza: "15/01/2025",
      stato: "attiva",
      distretto: "Distretto Sanitario Padova Centro",
      indirizzo: "Via Venezia 15, 35100 Padova",
      telefono: "049 8765432",
      orari: "Lun-Ven 8:00-18:00"
    }
  ],
  invalidita: {
    percentuale: "67%",
    dataRiconoscimento: "20/02/2024",
    scadenza: "20/02/2027",
    tipo: "Invalidità Civile",
    stato: "attiva"
  }
};

// Mock data per esami programmati
const scheduledExams = [
  {
    id: 1,
    tipo: "TAC Torace",
    data: "20/02/2025",
    ora: "10:30",
    luogo: "IOV - Radiologia",
    indirizzo: "Via Gattamelata 64, 35128 Padova",
    preparazione: "Digiuno da 6 ore",
    note: "Portare esami precedenti",
    stato: "confermato"
  },
  {
    id: 2,
    tipo: "PET-CT",
    data: "25/02/2025",
    ora: "14:00",
    luogo: "IOV - Medicina Nucleare",
    indirizzo: "Via Gattamelata 64, 35128 Padova",
    preparazione: "Digiuno da 12 ore, dieta povera di carboidrati",
    note: "Arrivare 30 minuti prima",
    stato: "confermato"
  },
  {
    id: 3,
    tipo: "Visita Oncologica",
    data: "28/02/2025",
    ora: "09:15",
    luogo: "IOV - Ambulatorio Oncologico",
    indirizzo: "Via Gattamelata 64, 35128 Padova",
    preparazione: "Nessuna preparazione particolare",
    note: "Portare tutti gli esami",
    stato: "confermato"
  }
];

// Mock data per collegamenti utili
const usefulLinks = [
  {
    id: 1,
    titolo: "Distretto Sanitario Padova Centro",
    descrizione: "Per rinnovo esenzioni e certificazioni",
    url: "https://www.aulss6.veneto.it/distretto-padova-centro",
    categoria: "Esenzioni"
  },
  {
    id: 2,
    titolo: "INPS - Invalidità Civile",
    descrizione: "Informazioni su invalidità e prestazioni",
    url: "https://www.inps.it/invalidita-civile",
    categoria: "Invalidità"
  },
  {
    id: 3,
    titolo: "IOV - Informazioni Pazienti",
    descrizione: "Guida completa per i pazienti IOV",
    url: "https://www.iov.veneto.it/pazienti",
    categoria: "Informazioni Generali"
  },
  {
    id: 4,
    titolo: "Regione Veneto - Salute",
    descrizione: "Servizi sanitari regionali",
    url: "https://www.regione.veneto.it/salute",
    categoria: "Servizi Regionali"
  },
  {
    id: 5,
    titolo: "Fondazione ANT - Supporto Oncologico",
    descrizione: "Assistenza domiciliare per malati oncologici",
    url: "https://www.ant.it",
    categoria: "Supporto"
  }
];

const InformazioniSupporto = () => {
  const [selectedExam, setSelectedExam] = useState<number | null>(null);

  const getStatusBadge = (stato: string) => {
    switch (stato) {
      case "attiva":
        return <Badge variant="default" className="bg-green-100 text-green-800">Attiva</Badge>;
      case "confermato":
        return <Badge variant="default" className="bg-blue-100 text-blue-800">Confermato</Badge>;
      case "scaduta":
        return <Badge variant="destructive" className="bg-red-100 text-red-800">Scaduta</Badge>;
      default:
        return <Badge variant="secondary">Sconosciuto</Badge>;
    }
  };

  const handleExternalLink = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <PazienteNavbar />

      <div className="container mx-auto px-4 py-8 flex-1">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Informazioni sul Percorso e Supporto Amministrativo
          </h1>
          <p className="text-gray-600">
            Tutte le informazioni utili per il tuo percorso di cura e i servizi di supporto disponibili
          </p>
        </div>

         <div className="space-y-6">
           {/* Prima riga - 3 card */}
           <div className="grid lg:grid-cols-3 gap-6">
             {/* Informazioni Personali */}
             <Card className="border-2 border-primary/20 bg-gradient-to-br from-gray-50/50 to-slate-50/50 shadow-lg">
               <CardHeader className="pb-4">
                 <div className="flex items-center gap-3">
                   <div className="p-2 bg-primary/10 rounded-lg">
                     <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                   </div>
                   <div>
                     <CardTitle className="text-xl sm:text-2xl font-bold text-primary">
                       Dati Personali
                     </CardTitle>
                     <CardDescription className="text-sm sm:text-base">
                       Le tue informazioni personali e di contatto
                     </CardDescription>
                   </div>
                 </div>
               </CardHeader>
               <CardContent className="pt-0">
                 <div className="space-y-3">
                   <div className="flex items-center justify-between p-3 bg-white/70 rounded-lg border border-primary/10 shadow-sm">
                     <div className="flex items-center gap-3">
                       <div className="p-2 bg-blue-100 rounded-lg">
                         <FileText className="w-4 h-4 text-blue-600" />
                       </div>
                       <div>
                         <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Nome Completo</label>
                         <p className="text-sm font-bold text-gray-900 mt-1">{patientInfo.nome} {patientInfo.cognome}</p>
                       </div>
                     </div>
                   </div>

                   <div className="flex items-center justify-between p-3 bg-white/70 rounded-lg border border-primary/10 shadow-sm">
                     <div className="flex items-center gap-3">
                       <div className="p-2 bg-green-100 rounded-lg">
                         <FileText className="w-4 h-4 text-green-600" />
                       </div>
                       <div>
                         <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Codice Fiscale</label>
                         <p className="text-sm font-bold text-gray-900 mt-1 font-mono">{patientInfo.codiceFiscale}</p>
                       </div>
                     </div>
                   </div>

                   <div className="flex items-center justify-between p-3 bg-white/70 rounded-lg border border-primary/10 shadow-sm">
                     <div className="flex items-center gap-3">
                       <div className="p-2 bg-purple-100 rounded-lg">
                         <Calendar className="w-4 h-4 text-purple-600" />
                       </div>
                       <div>
                         <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Data di Nascita</label>
                         <p className="text-sm font-bold text-gray-900 mt-1">{patientInfo.dataNascita}</p>
                       </div>
                     </div>
                   </div>

                   <div className="flex items-center justify-between p-3 bg-white/70 rounded-lg border border-primary/10 shadow-sm">
                     <div className="flex items-center gap-3">
                       <div className="p-2 bg-orange-100 rounded-lg">
                         <MapPin className="w-4 h-4 text-orange-600" />
                       </div>
                       <div>
                         <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Indirizzo</label>
                         <p className="text-sm font-bold text-gray-900 mt-1">{patientInfo.indirizzo}</p>
                       </div>
                     </div>
                   </div>

                   <div className="flex items-center justify-between p-3 bg-white/70 rounded-lg border border-primary/10 shadow-sm">
                     <div className="flex items-center gap-3">
                       <div className="p-2 bg-teal-100 rounded-lg">
                         <Heart className="w-4 h-4 text-teal-600" />
                       </div>
                       <div>
                         <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Medico Curante</label>
                         <p className="text-sm font-bold text-gray-900 mt-1">{patientInfo.medicoCurante}</p>
                         <p className="text-xs text-muted-foreground">{patientInfo.telefonoMedico}</p>
                       </div>
                     </div>
                   </div>
                 </div>
               </CardContent>
             </Card>

             {/* Esenzioni */}
             <Card className="border-2 border-primary/20 bg-gradient-to-br from-gray-50/50 to-slate-50/50 shadow-lg">
               <CardHeader className="pb-4">
                 <div className="flex items-center gap-3">
                   <div className="p-2 bg-primary/10 rounded-lg">
                     <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                   </div>
                   <div>
                     <CardTitle className="text-xl sm:text-2xl font-bold text-primary">
                       Esenzioni Attive
                     </CardTitle>
                     <CardDescription className="text-sm sm:text-base">
                       I tuoi benefici sanitari attivi
                     </CardDescription>
                   </div>
                 </div>
               </CardHeader>
               <CardContent className="pt-0">
                 <div className="space-y-3">
                   {administrativeInfo.esenzioni.map((esenzione) => (
                     <div key={esenzione.id} className="p-3 bg-white/70 rounded-lg border border-primary/10 shadow-sm">
                       <div className="flex items-center justify-between mb-3">
                         <div className="flex items-center gap-3">
                           <div className="p-2 bg-green-100 rounded-lg">
                             <CheckCircle className="w-4 h-4 text-green-600" />
                           </div>
                           <div>
                             <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Esenzione</label>
                             <p className="text-sm font-bold text-gray-900 mt-1">{esenzione.descrizione}</p>
                           </div>
                         </div>
                         {getStatusBadge(esenzione.stato)}
                       </div>
                       
                       <div className="grid grid-cols-2 gap-2 text-xs">
                         <div className="flex items-center gap-2">
                           <div className="p-1 bg-blue-100 rounded-sm">
                             <FileText className="w-3 h-3 text-blue-600" />
                           </div>
                           <span className="font-semibold text-muted-foreground">Codice:</span>
                           <span className="font-bold text-gray-900">{esenzione.codice}</span>
                         </div>
                         <div className="flex items-center gap-2">
                           <div className="p-1 bg-purple-100 rounded-sm">
                             <Calendar className="w-3 h-3 text-purple-600" />
                           </div>
                           <span className="font-semibold text-muted-foreground">Scadenza:</span>
                           <span className="font-bold text-gray-900">{esenzione.dataScadenza}</span>
                         </div>
                       </div>
                       
                       <div className="mt-3 p-2 bg-gradient-to-r from-green-50 to-emerald-50 rounded border border-green-100">
                         <div className="flex items-center gap-2 mb-2">
                           <MapPin className="w-3 h-3 text-green-600" />
                           <span className="text-xs font-semibold text-green-800 uppercase tracking-wide">Distretto di Riferimento</span>
                         </div>
                         <div className="space-y-1 text-xs">
                           <p className="font-semibold text-green-900">{esenzione.distretto}</p>
                           <p className="text-green-800">{esenzione.indirizzo}</p>
                           <div className="flex items-center gap-4">
                             <div className="flex items-center gap-1">
                               <Phone className="w-3 h-3 text-green-600" />
                               <span className="text-green-800">{esenzione.telefono}</span>
                             </div>
                             <div className="flex items-center gap-1">
                               <Clock className="w-3 h-3 text-green-600" />
                               <span className="text-green-800">{esenzione.orari}</span>
                             </div>
                           </div>
                         </div>
                       </div>
                     </div>
                   ))}
                 </div>
               </CardContent>
             </Card>

             {/* Invalidità */}
             <Card className="border-2 border-primary/20 bg-gradient-to-br from-gray-50/50 to-slate-50/50 shadow-lg">
               <CardHeader className="pb-4">
                 <div className="flex items-center gap-3">
                   <div className="p-2 bg-primary/10 rounded-lg">
                     <Heart className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                   </div>
                   <div>
                     <CardTitle className="text-xl sm:text-2xl font-bold text-primary">
                       Invalidità Civile
                     </CardTitle>
                     <CardDescription className="text-sm sm:text-base">
                       Il tuo riconoscimento di invalidità
                     </CardDescription>
                   </div>
                 </div>
               </CardHeader>
               <CardContent className="pt-0">
                 <div className="space-y-3">
                   <div className="p-3 bg-white/70 rounded-lg border border-primary/10 shadow-sm">
                     <div className="flex items-center justify-between mb-3">
                       <div className="flex items-center gap-3">
                         <div className="p-2 bg-blue-100 rounded-lg">
                           <Percent className="w-4 h-4 text-blue-600" />
                         </div>
                         <div>
                           <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Invalidità</label>
                           <p className="text-sm font-bold text-gray-900 mt-1">{administrativeInfo.invalidita.tipo}</p>
                         </div>
                       </div>
                       {getStatusBadge(administrativeInfo.invalidita.stato)}
                     </div>
                     
                     <div className="grid grid-cols-2 gap-2 text-xs">
                       <div className="flex items-center gap-2">
                         <div className="p-1 bg-green-100 rounded-sm">
                           <Percent className="w-3 h-3 text-green-600" />
                         </div>
                         <span className="font-semibold text-muted-foreground">Percentuale:</span>
                         <span className="font-bold text-gray-900">{administrativeInfo.invalidita.percentuale}</span>
                       </div>
                       <div className="flex items-center gap-2">
                         <div className="p-1 bg-purple-100 rounded-sm">
                           <Calendar className="w-3 h-3 text-purple-600" />
                         </div>
                         <span className="font-semibold text-muted-foreground">Scadenza:</span>
                         <span className="font-bold text-gray-900">{administrativeInfo.invalidita.scadenza}</span>
                       </div>
                     </div>
                   </div>
                   
                   <div className="p-3 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg border border-yellow-200">
                     <div className="flex items-start gap-2">
                       <div className="p-1 bg-yellow-100 rounded-sm">
                         <Info className="w-3 h-3 text-yellow-600" />
                       </div>
                       <div className="text-xs">
                         <p className="font-semibold text-yellow-900 mb-1">Informazioni Importanti</p>
                         <p className="text-yellow-800">L'invalidità civile ti dà diritto a prestazioni economiche e agevolazioni fiscali. Per maggiori informazioni contatta l'INPS.</p>
                       </div>
                     </div>
                   </div>
                 </div>
               </CardContent>
             </Card>
           </div>

           {/* Seconda riga - Esami Programmati */}
           <Card className="border-2 border-primary/20 bg-gradient-to-br from-gray-50/50 to-slate-50/50 shadow-lg">
            <CardHeader className="pb-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-xl sm:text-2xl font-bold text-primary">
                      Esami Programmati
                    </CardTitle>
                    <CardDescription className="text-sm sm:text-base">
                      I tuoi prossimi appuntamenti e esami diagnostici
                    </CardDescription>
                  </div>
                </div>
                <Button 
                  variant="default" 
                  size="sm"
                  onClick={() => window.location.href = '/paziente/esami'}
                  className="flex items-center gap-2 bg-primary hover:bg-primary/90 shadow-md w-full sm:w-auto"
                >
                  Dettagli Completi
                  <Calendar className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-3">
                {scheduledExams.map((exam) => (
                  <div key={exam.id} className="p-3 bg-white/70 rounded-lg border border-primary/10 shadow-sm">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-indigo-100 rounded-lg">
                          <Calendar className="w-4 h-4 text-indigo-600" />
                        </div>
                        <div>
                          <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Esame</label>
                          <p className="text-sm font-bold text-gray-900 mt-1">{exam.tipo}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        {getStatusBadge(exam.stato)}
                        <p className="text-xs font-semibold text-gray-900 mt-1">{exam.data} alle {exam.ora}</p>
                      </div>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-3 text-xs">
                      <div className="flex items-center gap-2">
                        <div className="p-1 bg-orange-100 rounded-sm">
                          <MapPin className="w-3 h-3 text-orange-600" />
                        </div>
                        <div>
                          <span className="font-semibold text-muted-foreground">Luogo:</span>
                          <p className="font-bold text-gray-900">{exam.luogo}</p>
                          <p className="text-muted-foreground">{exam.indirizzo}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <div className="p-1 bg-red-100 rounded-sm">
                          <AlertCircle className="w-3 h-3 text-red-600" />
                        </div>
                        <div>
                          <span className="font-semibold text-muted-foreground">Preparazione:</span>
                          <p className="font-bold text-gray-900">{exam.preparazione}</p>
                        </div>
                      </div>
                    </div>
                    
                    {exam.note && (
                      <div className="mt-3 p-2 bg-gradient-to-r from-blue-50 to-indigo-50 rounded border border-blue-100">
                        <div className="flex items-center gap-2">
                          <Info className="w-3 h-3 text-blue-600" />
                          <span className="text-xs font-semibold text-blue-900 uppercase tracking-wide">Note</span>
                        </div>
                        <p className="text-xs text-blue-800 mt-1">{exam.note}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Collegamenti Utili */}
          <Card className="lg:col-span-3 border-2 border-primary/20 bg-gradient-to-br from-gray-50/50 to-slate-50/50 shadow-lg">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <ExternalLink className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-xl sm:text-2xl font-bold text-primary">
                    Collegamenti Utili
                  </CardTitle>
                  <CardDescription className="text-sm sm:text-base">
                    Siti web e risorse utili per il tuo percorso di cura
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                {usefulLinks.map((link) => (
                  <div key={link.id} className="p-3 bg-white/70 rounded-lg border border-primary/10 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="p-1 bg-amber-100 rounded-sm">
                          <ExternalLink className="w-3 h-3 text-amber-600" />
                        </div>
                        <h4 className="text-sm font-bold text-gray-900">{link.titolo}</h4>
                      </div>
                      <Badge variant="secondary" className="text-xs bg-amber-100 text-amber-800">
                        {link.categoria}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mb-3">{link.descrizione}</p>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => handleExternalLink(link.url)}
                      className="w-full text-xs"
                    >
                      <ExternalLink className="w-3 h-3 mr-1" />
                      Visita Sito
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t bg-card">
        <div className="container mx-auto px-4 py-8 text-center text-sm text-muted-foreground">
          <p>© 2025 Istituto Oncologico Veneto - Tutti i diritti riservati</p>
          <p className="mt-2">Sistema demo per pazienti</p>
        </div>
      </footer>
    </div>
  );
};

export default InformazioniSupporto;
