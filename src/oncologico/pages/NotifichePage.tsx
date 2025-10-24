import { useState, useEffect } from "react";
import { Card, CardContent } from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";
import { Badge } from "@/shared/components/ui/badge";
import { ArrowLeft, Bell, CheckCircle, AlertCircle, Clock, User, Calendar, FileText, Trash2 } from "lucide-react";
import OncologoNavbar from "@/oncologico/components/OncologoNavbar";
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
      letto: false
    },
    {
      id: 2,
      tipo: "discussione_caso",
      titolo: "Discussione Caso - Anna Bianchi",
      descrizione: "Richiesta discussione caso per paziente con carcinoma mammario. Score clinico: 7.",
      data: "2024-01-20",
      ora: "16:45",
      paziente: "Anna Bianchi",
      cf: "BNCNNA75B02H501V",
      ambulatorio: "Oncogeriatria",
      medico: "Dr. Verdi",
      priorita: "media",
      letto: false
    },
    {
      id: 3,
      tipo: "esito_esame",
      titolo: "Esito Esame - Giuseppe Verdi",
      descrizione: "Risultati TC torace disponibili. Lesione polmonare confermata.",
      data: "2024-01-20",
      ora: "11:20",
      paziente: "Giuseppe Verdi",
      cf: "VRDGPP70C03H501W",
      ambulatorio: "Oncogeriatria",
      medico: "Dr. Rossi",
      priorita: "alta",
      letto: false
    },
    {
      id: 4,
      tipo: "esito_visita",
      titolo: "Esito Visita - Francesca Neri",
      descrizione: "Visita osteoncologica completata. Follow-up programmato.",
      data: "2024-01-19",
      ora: "09:15",
      paziente: "Francesca Neri",
      cf: "NRIFNC85D04H501X",
      ambulatorio: "Osteoncologia",
      medico: "Dr. Bianchi",
      priorita: "media",
      letto: false
    },
    {
      id: 5,
      tipo: "discussione_caso",
      titolo: "Discussione Caso - Luigi Ferrari",
      descrizione: "Discussione caso completata. Piano terapeutico definito.",
      data: "2024-01-19",
      ora: "15:30",
      paziente: "Luigi Ferrari",
      cf: "FRRLGI65E05H501Y",
      ambulatorio: "Osteoncologia",
      medico: "Dr. Verdi",
      priorita: "media",
      letto: false
    },
    {
      id: 6,
      tipo: "esito_esame",
      titolo: "Esito Esame - Elena Romano",
      descrizione: "Risultati RMN encefalo disponibili. Nessuna metastasi cerebrale.",
      data: "2024-01-19",
      ora: "13:45",
      paziente: "Elena Romano",
      cf: "RMNLNE88F06H501Z",
      ambulatorio: "Cure Simultanee",
      medico: "Dr. Bianchi",
      priorita: "alta",
      letto: false
    },
    {
      id: 7,
      tipo: "esito_visita",
      titolo: "Esito Visita - Marco Conti",
      descrizione: "Visita di controllo oncologico completata. Parametri nella norma.",
      data: "2024-01-18",
      ora: "10:30",
      paziente: "Marco Conti",
      cf: "CNTMRC72G07H501A",
      ambulatorio: "Oncogeriatria",
      medico: "Dr. Rossi",
      priorita: "bassa",
      letto: false
    },
    {
      id: 8,
      tipo: "discussione_caso",
      titolo: "Discussione Caso - Laura Santini",
      descrizione: "Richiesta discussione multidisciplinare per paziente con metastasi epatiche.",
      data: "2024-01-18",
      ora: "14:20",
      paziente: "Laura Santini",
      cf: "SNTLRA69H08H501B",
      ambulatorio: "Cure Simultanee",
      medico: "Dr. Verdi",
      priorita: "alta",
      letto: false
    },
    {
      id: 9,
      tipo: "esito_esame",
      titolo: "Esito Esame - Roberto Galli",
      descrizione: "Risultati PET-CT disponibili. Attività metabolica residua.",
      data: "2024-01-17",
      ora: "16:10",
      paziente: "Roberto Galli",
      cf: "GLLRRT75I09H501C",
      ambulatorio: "Osteoncologia",
      medico: "Dr. Bianchi",
      priorita: "media",
      letto: false
    },
    {
      id: 10,
      tipo: "esito_visita",
      titolo: "Esito Visita - Silvia Moretti",
      descrizione: "Visita oncologica di follow-up completata. Buona risposta al trattamento.",
      data: "2024-01-17",
      ora: "11:45",
      paziente: "Silvia Moretti",
      cf: "MRTSLV81L10H501D",
      ambulatorio: "Oncogeriatria",
      medico: "Dr. Rossi",
      priorita: "media",
      letto: false
    },
    {
      id: 11,
      tipo: "discussione_caso",
      titolo: "Discussione Caso - Alessandro Riva",
      descrizione: "Discussione caso per paziente con sarcoma dei tessuti molli.",
      data: "2024-01-16",
      ora: "15:00",
      paziente: "Alessandro Riva",
      cf: "RVALSX77M11H501E",
      ambulatorio: "Osteoncologia",
      medico: "Dr. Verdi",
      priorita: "alta",
      letto: false
    },
    {
      id: 12,
      tipo: "esito_esame",
      titolo: "Esito Esame - Chiara De Luca",
      descrizione: "Risultati ecografia addome disponibili. Lesioni epatiche multiple.",
      data: "2024-01-16",
      ora: "09:30",
      paziente: "Chiara De Luca",
      cf: "DLCCRA83N12H501F",
      ambulatorio: "Cure Simultanee",
      medico: "Dr. Bianchi",
      priorita: "alta",
      letto: false
    },
    {
      id: 13,
      tipo: "esito_visita",
      titolo: "Esito Visita - Paolo Martini",
      descrizione: "Visita oncologica di controllo completata. Stabilità della malattia.",
      data: "2024-01-15",
      ora: "14:15",
      paziente: "Paolo Martini",
      cf: "MRTPLO79O13H501G",
      ambulatorio: "Oncogeriatria",
      medico: "Dr. Rossi",
      priorita: "bassa",
      letto: false
    },
    {
      id: 14,
      tipo: "discussione_caso",
      titolo: "Discussione Caso - Valentina Costa",
      descrizione: "Richiesta discussione per paziente con carcinoma ovarico avanzato.",
      data: "2024-01-15",
      ora: "16:30",
      paziente: "Valentina Costa",
      cf: "CSTVLN85P14H501H",
      ambulatorio: "Cure Simultanee",
      medico: "Dr. Verdi",
      priorita: "alta",
      letto: false
    },
    {
      id: 15,
      tipo: "esito_esame",
      titolo: "Esito Esame - Fabio Leone",
      descrizione: "Risultati biopsia ossea disponibili. Conferma metastasi osteolitiche.",
      data: "2024-01-14",
      ora: "12:00",
      paziente: "Fabio Leone",
      cf: "LNNFBA71Q15H501I",
      ambulatorio: "Osteoncologia",
      medico: "Dr. Bianchi",
      priorita: "media",
      letto: false
    }
  ]);

  // Inizializza il localStorage con il conteggio corretto
  useEffect(() => {
    const unreadCount = notifiche.filter(n => !n.letto).length;
    localStorage.setItem('unreadNotificationsCount', unreadCount.toString());
  }, []);

  const handleNotificaClick = (notifica: any) => {
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

  const handleEliminaNotifica = (notificaId: number, event: React.MouseEvent) => {
    event.stopPropagation(); // Previene il click sulla card
    
    setNotifiche(prevNotifiche => {
      const updatedNotifiche = prevNotifiche.filter(n => n.id !== notificaId);
      
      // Aggiorna il conteggio nel localStorage
      const unreadCount = updatedNotifiche.filter(n => !n.letto).length;
      localStorage.setItem('unreadNotificationsCount', unreadCount.toString());
      
      // Triggera un evento personalizzato per aggiornare la navbar
      window.dispatchEvent(new CustomEvent('notificationsUpdated', { 
        detail: { unreadCount } 
      }));
      
      return updatedNotifiche;
    });
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

  const notificheNonLette = notifiche.filter(n => !n.letto);
  const notificheNonLetteCount = notificheNonLette.length;

  return (
    <div className="min-h-screen bg-background">
      <OncologoNavbar />

      <div className="container mx-auto px-4 py-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={() => navigate('/oncologico/oncologo')}>
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
              {notificheNonLetteCount} non lette
            </Badge>
          </div>
        </div>

        {/* Statistiche */}
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <Bell className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Notifiche Non Lette</p>
                  <p className="text-xl font-bold">{notificheNonLetteCount}</p>
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
                  <p className="text-sm text-muted-foreground">Priorità Alta</p>
                  <p className="text-xl font-bold">{notificheNonLette.filter(n => n.priorita === "alta").length}</p>
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
                  <p className="text-xl font-bold">{notificheNonLette.filter(n => n.data === "2024-01-20").length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Lista Notifiche */}
        <div className="space-y-4">
          {notificheNonLette.map((notifica) => (
            <Card 
              key={notifica.id} 
              className="border-l-4 border-l-blue-500 bg-blue-50/30 hover:shadow-md transition-shadow cursor-pointer"
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
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
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
                  
                  <div className="flex-shrink-0 ml-4 flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => navigate(`/oncologico/oncologo/paziente/${notifica.cf}`)}
                      className="whitespace-nowrap"
                    >
                      Visualizza Paziente
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={(e) => handleEliminaNotifica(notifica.id, e)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Messaggio se non ci sono notifiche */}
        {notificheNonLetteCount === 0 && (
          <Card>
            <CardContent className="p-8 text-center">
              <Bell className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Nessuna Notifica Non Letta</h3>
              <p className="text-gray-500">Tutte le notifiche sono state lette o eliminate.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default NotifichePage;