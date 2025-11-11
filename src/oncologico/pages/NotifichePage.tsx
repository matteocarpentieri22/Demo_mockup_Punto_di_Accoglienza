import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";
import { Badge } from "@/shared/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/components/ui/select";
import { Input } from "@/shared/components/ui/input";
import { ArrowLeft, Bell, CheckCircle, Clock, User, Calendar, FileText, Trash2, Filter, History } from "lucide-react";
import OncologoNavbar from "@/oncologico/components/layout/OncologoNavbar";
import { useNavigate } from "react-router-dom";

interface Notifica {
  id: number;
  tipo: string;
  titolo: string;
  descrizione: string;
  data: string;
  ora: string;
  paziente: string;
  cf: string;
  ambulatorio: string;
  medico: string;
  priorita: string;
  letto: boolean;
  archiviata: boolean;
}

const NotifichePage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("non-lette");
  const [filtroTipo, setFiltroTipo] = useState("tutti");
  const [filtroPriorita, setFiltroPriorita] = useState("tutti");
  const [filtroData, setFiltroData] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  
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
      archiviata: false
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
      letto: false,
      archiviata: false
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
      letto: false,
      archiviata: false
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
      letto: false,
      archiviata: false
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
      letto: false,
      archiviata: false
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
      letto: false,
      archiviata: false
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
      letto: false,
      archiviata: false
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
      letto: false,
      archiviata: false
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
      letto: false,
      archiviata: false
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
      letto: false,
      archiviata: false
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
      letto: false,
      archiviata: false
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
      letto: false,
      archiviata: false
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
      letto: false,
      archiviata: false
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
      letto: false,
      archiviata: false
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
      letto: false,
      archiviata: false
    }
  ]);

  // Inizializza il localStorage con il conteggio corretto
  useEffect(() => {
    const unreadCount = notifiche.filter(n => !n.letto).length;
    localStorage.setItem('unreadNotificationsCount', unreadCount.toString());
  }, [notifiche]);

  const handleNotificaClick = (notifica: Notifica) => {
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
      // Invece di eliminare, archivia la notifica
      const updatedNotifiche = prevNotifiche.map(n => 
        n.id === notificaId ? { ...n, archiviata: true, letto: true } : n
      );
      
      // Aggiorna il conteggio nel localStorage
      const unreadCount = updatedNotifiche.filter(n => !n.letto && !n.archiviata).length;
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

  const getTipoLabel = (tipo: string) => {
    switch (tipo) {
      case "esito_visita":
        return "Esito Visita";
      case "discussione_caso":
        return "Discussione Caso";
      case "esito_esame":
        return "Esito Esame";
      default:
        return tipo;
    }
  };

  // Filtra le notifiche in base a tutti i criteri
  const getFilteredNotifiche = () => {
    return notifiche.filter(n => {
      // Filtro per archiviate
      if (n.archiviata) return false;
      
      // Filtro per stato (non lette/lette/tutte)
      if (activeTab === "non-lette" && n.letto) return false;
      if (activeTab === "lette" && !n.letto) return false;
      
      // Filtro per tipo
      if (filtroTipo !== "tutti" && n.tipo !== filtroTipo) return false;
      
      // Filtro per priorità
      if (filtroPriorita !== "tutti" && n.priorita !== filtroPriorita) return false;
      
      // Filtro per data
      if (filtroData && n.data !== filtroData) return false;
      
      // Filtro per ricerca
      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase();
        return (
          n.titolo.toLowerCase().includes(searchLower) ||
          n.descrizione.toLowerCase().includes(searchLower) ||
          n.paziente.toLowerCase().includes(searchLower) ||
          n.cf.toLowerCase().includes(searchLower) ||
          n.ambulatorio.toLowerCase().includes(searchLower) ||
          n.medico.toLowerCase().includes(searchLower)
        );
      }
      
      return true;
    });
  };

  const filteredNotifiche = getFilteredNotifiche();
  const notificheNonLette = notifiche.filter(n => !n.letto && !n.archiviata);
  const notificheLette = notifiche.filter(n => n.letto && !n.archiviata);
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

        {/* Tabs per Stato */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <TabsList>
              <TabsTrigger value="non-lette">
                Non Lette ({notificheNonLette.length})
              </TabsTrigger>
              <TabsTrigger value="lette">
                <History className="w-4 h-4 mr-2" />
                Storico Lette ({notificheLette.length})
              </TabsTrigger>
              <TabsTrigger value="tutte">
                Tutte ({notifiche.filter(n => !n.archiviata).length})
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Filtri */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-sm">
                <Filter className="w-4 h-4" />
                Filtri
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Cerca</label>
                  <Input
                    placeholder="Cerca nelle notifiche..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Tipo</label>
                  <Select value={filtroTipo} onValueChange={setFiltroTipo}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="tutti">Tutti i tipi</SelectItem>
                      <SelectItem value="esito_visita">Esito Visita</SelectItem>
                      <SelectItem value="discussione_caso">Discussione Caso</SelectItem>
                      <SelectItem value="esito_esame">Esito Esame</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Priorità</label>
                  <Select value={filtroPriorita} onValueChange={setFiltroPriorita}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="tutti">Tutte le priorità</SelectItem>
                      <SelectItem value="alta">Alta</SelectItem>
                      <SelectItem value="media">Media</SelectItem>
                      <SelectItem value="bassa">Bassa</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Data</label>
                  <Input
                    type="date"
                    value={filtroData}
                    onChange={(e) => setFiltroData(e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <TabsContent value="non-lette">
            {/* Lista Notifiche Non Lette */}
        <div className="space-y-4">
              {filteredNotifiche.filter(n => !n.letto).map((notifica) => (
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

            {/* Messaggio se non ci sono notifiche non lette */}
            {filteredNotifiche.filter(n => !n.letto).length === 0 && (
          <Card>
            <CardContent className="p-8 text-center">
              <Bell className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Nessuna Notifica Non Letta</h3>
                  <p className="text-gray-500">Non ci sono notifiche non lette con i filtri selezionati.</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="lette">
            {/* Lista Notifiche Lette */}
            <div className="space-y-4">
              {filteredNotifiche.filter(n => n.letto).map((notifica) => (
                <Card 
                  key={notifica.id} 
                  className="border-l-4 border-l-gray-400 bg-gray-50/30 hover:shadow-md transition-shadow cursor-pointer opacity-75"
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
                            <Badge variant="outline" className="bg-gray-100 text-gray-700">
                              Letta
                            </Badge>
                            <Badge className={getPrioritaColor(notifica.priorita)}>
                              {notifica.priorita.toUpperCase()}
                            </Badge>
                            <h3 className="font-semibold text-gray-900">{notifica.titolo}</h3>
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

            {/* Messaggio se non ci sono notifiche lette */}
            {filteredNotifiche.filter(n => n.letto).length === 0 && (
              <Card>
                <CardContent className="p-8 text-center">
                  <History className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Nessuna Notifica Letta</h3>
                  <p className="text-gray-500">Non ci sono notifiche lette con i filtri selezionati.</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="tutte">
            {/* Lista Tutte le Notifiche */}
            <div className="space-y-4">
              {filteredNotifiche.map((notifica) => (
                <Card 
                  key={notifica.id} 
                  className={`border-l-4 hover:shadow-md transition-shadow cursor-pointer ${
                    notifica.letto 
                      ? 'border-l-gray-400 bg-gray-50/30 opacity-75' 
                      : 'border-l-blue-500 bg-blue-50/30'
                  }`}
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
                            {notifica.letto ? (
                              <Badge variant="outline" className="bg-gray-100 text-gray-700">
                                Letta
                              </Badge>
                            ) : (
                              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            )}
                            <Badge className={getPrioritaColor(notifica.priorita)}>
                              {notifica.priorita.toUpperCase()}
                            </Badge>
                            <h3 className="font-semibold text-gray-900">{notifica.titolo}</h3>
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
            {filteredNotifiche.length === 0 && (
              <Card>
                <CardContent className="p-8 text-center">
                  <Bell className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Nessuna Notifica</h3>
                  <p className="text-gray-500">Non ci sono notifiche con i filtri selezionati.</p>
            </CardContent>
          </Card>
        )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default NotifichePage;