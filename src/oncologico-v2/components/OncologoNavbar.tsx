import { Link, useLocation } from "react-router-dom";
import { Button } from "@/shared/components/ui/button";
import { Badge } from "@/shared/components/ui/badge";
import { User, Home, Stethoscope, Bell, FileText } from "lucide-react";
import { useState, useEffect } from "react";

const OncologoNavbar = () => {
  const location = useLocation();
  const [unreadNotificationsCount, setUnreadNotificationsCount] = useState(2);

  // Aggiorna il conteggio delle notifiche non lette
  useEffect(() => {
    const handleStorageChange = () => {
      const count = localStorage.getItem('unreadNotificationsCount');
      if (count) {
        setUnreadNotificationsCount(parseInt(count));
      }
    };

    const handleNotificationsUpdate = (event: CustomEvent) => {
      setUnreadNotificationsCount(event.detail.unreadCount);
    };

    // Ascolta i cambiamenti nel localStorage
    window.addEventListener('storage', handleStorageChange);
    
    // Ascolta l'evento personalizzato per aggiornamenti in tempo reale
    window.addEventListener('notificationsUpdated', handleNotificationsUpdate as EventListener);
    
    // Controlla il valore iniziale
    const count = localStorage.getItem('unreadNotificationsCount');
    if (count) {
      setUnreadNotificationsCount(parseInt(count));
    }

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('notificationsUpdated', handleNotificationsUpdate as EventListener);
    };
  }, []);

  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(path + "/");
  };

  return (
    <nav className="bg-white border-b border-gray-200 px-4 py-3">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo e titolo */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <Stethoscope className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-gray-900">Profilo Oncologo</h1>
            <Badge variant="secondary" className="text-xs bg-blue-100 text-blue-800">
              Radioterapista
            </Badge>
          </div>
        </div>

        {/* Navigazione */}
        <div className="flex items-center gap-1">
          <Link to="/oncologico-v2/oncologo">
            <Button 
              variant={isActive("/oncologico-v2/oncologo") ? "default" : "ghost"}
              size="sm"
              className="flex items-center gap-2"
            >
              <Home className="w-4 h-4" />
              Home
            </Button>
          </Link>
          
          <Link to="/oncologico-v2/oncologo/richieste">
            <Button 
              variant={isActive("/oncologico-v2/oncologo/richieste") ? "default" : "ghost"}
              size="sm"
              className="flex items-center gap-2"
            >
              <FileText className="w-4 h-4" />
              Richieste
            </Button>
          </Link>
          
          <Link to="/oncologico-v2/oncologo/notifiche" className="relative">
            <Button 
              variant={isActive("/oncologico-v2/oncologo/notifiche") ? "default" : "ghost"}
              size="sm"
              className="flex items-center gap-2"
            >
              <Bell className="w-4 h-4" />
              Notifiche
            </Button>
            {unreadNotificationsCount > 0 && (
              <Badge 
                variant="destructive" 
                className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs font-bold"
              >
                {unreadNotificationsCount}
              </Badge>
            )}
          </Link>
        </div>

        {/* Profilo utente */}
        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-sm font-medium text-gray-900">Dr. Marco Rossi</p>
            <p className="text-xs text-gray-500">Oncologo Radioterapista</p>
          </div>
          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
            <User className="w-4 h-4 text-blue-600" />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default OncologoNavbar;
