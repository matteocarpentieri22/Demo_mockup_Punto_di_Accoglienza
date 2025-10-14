import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";
import { Badge } from "@/shared/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/shared/components/ui/dialog";
import { ArrowLeft, Bell, CheckCircle, AlertCircle, Clock, User, Calendar, FileText } from "lucide-react";
import OncologoNavbar from "@/oncologico-v2/components/OncologoNavbar";
import { useNavigate } from "react-router-dom";

const NotifichePage = () => {
  const navigate = useNavigate();
  const [notifiche, setNotifiche] = useState([
    {
      id: 1,
      tipo: "esito_visita",
      titolo: "Esito Visita - Mario Rossi",
      descrizione: "Visita oncologica completata. Risultati disponibili per revisione.",
      data: "2024-01-20",
      ora: "14:30",
      paziente: "Mario Rossi",
      cf: "RSSMRA80A01H501U",
      ambulatorio: "Cure Simultanee",
      medico: "Dr. Bianchi",
      priorita: "alta",
      letto: false,
      esito: "La visita oncologica è stata completata con successo. Il paziente presenta una buona risposta al trattamento. Parametri vitali nella norma. Follow-up programmato tra 3 mesi."
    },
    {
      id: 2,
      tipo: "discussione_caso",
      titolo: "Discussione Caso - Anna Bianchi",
      descrizione: "Richiesta discussione caso per paziente con carcinoma mammario. Score clinico: 7.",
      data: "2024-01-19",
      ora: "16:45",
      paziente: "Anna Bianchi",
      cf: "BNCNNA75B02H501V",
      ambulatorio: "Oncogeriatria",
      medico: "Dr. Verdi",
      priorita: "media",
      letto: false,
      esito: "Discussione caso completata. Confermata diagnosi di carcinoma mammario T2N1M0. Piano terapeutico definito: chemioterapia neoadiuvante seguita da intervento chirurgico."
    },
    {
      id: 3,
      tipo: "esito_esame",
      titolo: "Esito Esame - Giuseppe Verdi",
      descrizione: "Risultati TC torace disponibili. Lesione polmonare confermata.",
      data: "2024-01-18",
      ora: "11:20",
      paziente: "Giuseppe Verdi",
      cf: "VRDGPP70C03H501W",
      ambulatorio: "Oncogeriatria",
      medico: "Dr. Rossi",
      priorita: "alta",
      letto: true,
      esito: "TC torace: confermata presenza di lesione polmonare sospetta di 2.5 cm nel lobo superiore destro. Nessuna metastasi a distanza evidenziata. Raccomandata biopsia per conferma istologica."
    },
    {
      id: 4,
      tipo: "esito_visita",
      titolo: "Esito Visita - Francesca Neri",
      descrizione: "Visita osteoncologica completata. Follow-up programmato.",
      data: "2024-01-17",
      ora: "09:15",
      paziente: "Francesca Neri",
      cf: "NRIFNC85D04H501X",
      ambulatorio: "Osteoncologia",
      medico: "Dr. Bianchi",
      priorita: "media",
      letto: true,
      esito: "Visita osteoncologica completata. Paziente in remissione completa. Follow-up programmato ogni 6 mesi con controllo radiologico e marker tumorali."
    },
    {
      id: 5,
      tipo: "discussione_caso",
      titolo: "Discussione Caso - Luigi Ferrari",
      descrizione: "Discussione caso completata. Piano terapeutico definito.",
      data: "2024-01-16",
      ora: "15:30",
      paziente: "Luigi Ferrari",
      cf: "FRRLGI65E05H501Y",
      ambulatorio: "Osteoncologia",
      medico: "Dr. Verdi",
      priorita: "media",
      letto: true,
      esito: "Discussione caso completata. Confermata diagnosi di osteosarcoma. Piano terapeutico multidisciplinare definito: chemioterapia preoperatoria, intervento chirurgico conservativo e chemioterapia postoperatoria."
    }
  ]);

  const [selectedNotifica, setSelectedNotifica] = useState<any>(null);
  const [showEsitoDialog, setShowEsitoDialog] = useState(false);

  // Inizializza il localStorage con il conteggio corretto
  useEffect(() => {
    const unreadCount = notifiche.filter(n => !n.letto).length;
    localStorage.setItem('unreadNotificationsCount', unreadCount.toString());
  }, []);

  const handleNotificaClick = (notifica: any) => {
    setSelectedNotifica(notifica);
    setShowEsitoDialog(true);
    
    // Se la notifica non è ancora stata letta, la marco come letta
    if (!notifica.letto) {
      setNotifiche(prevNotifiche => {
        const updatedNotifiche = prevNotifiche.map(n => 
          n.id === notifica.id ? { ...n, letto: true } : n
        );
        
        // Aggiorna il conteggio nel localStorage
        const unreadCount = updatedNotifiche.filter(n => !n.letto).length;
        localStorage.setItem('unreadNotificationsCount', unreadCount.toString());
        
        // Triggera un evento personalizzato per aggiornare la navbar
        window.dispatchEvent(new CustomEvent('notificationsUpdated', { 
          detail: { unreadCount } 
        }));
        
        return updatedNotifiche;
      });
    }
  };

  const closeEsitoDialog = () => {
    setShowEsitoDialog(false);
    setSelectedNotifica(null);
  };

  const getPrioritaColor = (priorita: string) => {
    switch (priorita) {
      case "alta":
        return "bg-red-100 text-red-800 border-red-200";
      case "media":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "bassa":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getTipoIcon = (tipo: string) => {
    switch (tipo) {
      case "esito_visita":
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case "discussione_caso":
        return <User className="w-5 h-5 text-blue-600" />;
      case "esito_esame":
        return <FileText className="w-5 h-5 text-purple-600" />;
      default:
        return <Bell className="w-5 h-5 text-gray-600" />;
    }
  };

  const getTipoLabel = (tipo: string) => {
    switch (tipo) {
      case "esito_visita":
        return "Esito Visita";
      case "discussione_caso":
        return "Discussione Caso";
      case "esito_esame":
        return "Esito Esame";
      default:
        return "Notifica";
    }
  };

  const notificheNonLette = notifiche.filter(n => !n.letto).length;

  return (
    <div className="min-h-screen bg-background">
      <OncologoNavbar />

      <div className="container mx-auto px-4 py-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={() => navigate('/oncologico-v2/oncologo')}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Indietro
            </Button>
            <div>
              <h1 className="text-2xl font-bold">Notifiche</h1>
              <p className="text-muted-foreground">Esiti visite e discussioni pazienti</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="bg-blue-50 text-blue-700">
              {notificheNonLette} non lette
            </Badge>
          </div>
        </div>

        {/* Statistiche */}
        <div className="grid md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <Bell className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Totale Notifiche</p>
                  <p className="text-xl font-bold">{notifiche.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                  <AlertCircle className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Non Lette</p>
                  <p className="text-xl font-bold">{notificheNonLette}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Lette</p>
                  <p className="text-xl font-bold">{notifiche.filter(n => n.letto).length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                  <Clock className="w-5 h-5 text-yellow-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Oggi</p>
                  <p className="text-xl font-bold">{notifiche.filter(n => n.data === "2024-01-20").length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Lista Notifiche */}
        <div className="space-y-4">
          {notifiche.map((notifica) => (
            <Card 
              key={notifica.id} 
              className={`${!notifica.letto ? 'border-l-4 border-l-blue-500 bg-blue-50/30' : ''} hover:shadow-md transition-shadow cursor-pointer`}
              onClick={() => handleNotificaClick(notifica)}
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 flex-1">
                    <div className="flex-shrink-0">
                      {getTipoIcon(notifica.tipo)}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2">
                        <Badge className={getPrioritaColor(notifica.priorita)}>
                          {notifica.priorita.toUpperCase()}
                        </Badge>
                        <h3 className="font-semibold text-gray-900">{notifica.titolo}</h3>
                        {!notifica.letto && (
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{notifica.descrizione}</p>
                      
                      <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4" />
                          <span>{notifica.paziente} ({notifica.cf})</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          <span>{notifica.ambulatorio}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <FileText className="w-4 h-4" />
                          <span>Medico: {notifica.medico}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          <span>{notifica.data} alle {notifica.ora}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex-shrink-0 ml-4">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => navigate(`/oncologico-v2/oncologo/paziente/${notifica.cf}`)}
                      className="whitespace-nowrap"
                    >
                      Visualizza Paziente
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Messaggio se non ci sono notifiche */}
        {notifiche.length === 0 && (
          <Card>
            <CardContent className="p-8 text-center">
              <Bell className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Nessuna Notifica</h3>
              <p className="text-gray-500">Non ci sono notifiche al momento.</p>
            </CardContent>
          </Card>
        )}

        {/* Dialog per visualizzare l'esito */}
        <Dialog open={showEsitoDialog} onOpenChange={setShowEsitoDialog}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-3">
                {selectedNotifica && getTipoIcon(selectedNotifica.tipo)}
                {selectedNotifica?.titolo}
              </DialogTitle>
              <DialogDescription>
                {selectedNotifica?.descrizione}
              </DialogDescription>
            </DialogHeader>
            
            {selectedNotifica && (
              <div className="space-y-4">
                {/* Informazioni paziente */}
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold text-gray-800 mb-2">Informazioni Paziente</h4>
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-gray-500" />
                      <span>{selectedNotifica.paziente} ({selectedNotifica.cf})</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-500" />
                      <span>{selectedNotifica.ambulatorio}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-gray-500" />
                      <span>Medico: {selectedNotifica.medico}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-gray-500" />
                      <span>{selectedNotifica.data} alle {selectedNotifica.ora}</span>
                    </div>
                  </div>
                </div>

                {/* Esito dettagliato */}
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <h4 className="font-semibold text-blue-800 mb-2">Esito Dettagliato</h4>
                  <p className="text-blue-700 leading-relaxed">{selectedNotifica.esito}</p>
                </div>

                {/* Azioni */}
                <div className="flex justify-end gap-3">
                  <Button variant="outline" onClick={closeEsitoDialog}>
                    Chiudi
                  </Button>
                  <Button 
                    onClick={() => {
                      navigate(`/oncologico-v2/oncologo/paziente/${selectedNotifica.cf}`);
                      closeEsitoDialog();
                    }}
                  >
                    Visualizza Paziente
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default NotifichePage;
