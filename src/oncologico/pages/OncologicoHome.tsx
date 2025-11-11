import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";
import { ArrowLeft, User, ClipboardList, Calendar, Bell, FileText, Building2, Heart, Stethoscope } from "lucide-react";
import { useNavigate } from "react-router-dom";

const OncologicoHome = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Header semplice senza navbar */}
      <div className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900">Sistema Oncologico</h1>
              <p className="text-xs text-gray-500">Seleziona il tuo profilo</p>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={() => navigate('/')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Torna al Menu
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-4">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Portale Personale IOV</h1>
          <p className="text-muted-foreground">Profili distinti per oncologi e case manager</p>
        </div>

        {/* Profili disponibili */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Profilo Oncologo/Radioterapista */}
          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate('/oncologico/oncologo')}>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <CardTitle className="text-xl">Oncologo / Radioterapista</CardTitle>
                  <CardDescription>Gestione richieste prenotazione e notifiche</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <FileText className="w-4 h-4" />
                  <span>Form di richiesta prenotazione esami/visite</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Bell className="w-4 h-4" />
                  <span>Notifiche su esiti visite e discussioni pazienti</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <ClipboardList className="w-4 h-4" />
                  <span>Valutazione score clinico</span>
                </div>
              </div>
              <Button className="w-full mt-4" onClick={() => navigate('/oncologico/oncologo')}>
                Accedi al Profilo Oncologo
              </Button>
            </CardContent>
          </Card>

          {/* Profilo Case Manager */}
          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate('/oncologico/case-manager')}>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <ClipboardList className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <CardTitle className="text-xl">Case Manager</CardTitle>
                  <CardDescription>Gestione pazienti e coordinamento visite</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <User className="w-4 h-4" />
                  <span>Elenco pazienti ordinato per score</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="w-4 h-4" />
                  <span>Gestione calendario ambulatori</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <FileText className="w-4 h-4" />
                  <span>Prenotazioni CUP e gestione slot</span>
                </div>
              </div>
              <Button className="w-full mt-4" onClick={() => navigate('/oncologico/case-manager')}>
                Accedi al Profilo Case Manager
              </Button>
            </CardContent>
          </Card>

          {/* Profilo Case Manager - Mammella, Sarcomi e Melanomi */}
          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate('/oncologico/case-manager/mammella-sarcomi-melanomi')}>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center">
                  <Heart className="w-6 h-6 text-pink-600" />
                </div>
                <div>
                  <CardTitle className="text-xl">Case Manager - Mammella, Sarcomi e Melanomi</CardTitle>
                  <CardDescription>Gestione pazienti per PDTA specifici</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <User className="w-4 h-4" />
                  <span>Elenco pazienti ordinato per score</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="w-4 h-4" />
                  <span>Gestione calendario ambulatori</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <FileText className="w-4 h-4" />
                  <span>Prenotazioni CUP e gestione slot</span>
                </div>
              </div>
              <Button className="w-full mt-4" onClick={() => navigate('/oncologico/case-manager/mammella-sarcomi-melanomi')}>
                Accedi al Profilo Case Manager
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Sezione Ambulatori */}
        <div className="mb-8">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-2">Ambulatori Specialistici</h2>
            <p className="text-muted-foreground">Accesso diretto alle pagine di gestione per ogni ambulatorio</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-4">
            {/* Cure Simultanee */}
            <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate('/oncologico/ambulatori/cure-simultanee')}>
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <Building2 className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">Cure Simultanee</CardTitle>
                    <CardDescription className="text-sm">Gestione cure oncologiche integrate</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-2 text-sm text-muted-foreground mb-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>Occupazione giornaliera</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    <span>Pianificazione settimanale</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    <span>Verbali visite</span>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="w-full">
                  Accedi all'Ambulatorio
                </Button>
              </CardContent>
            </Card>

            {/* Oncogeriatria */}
            <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate('/oncologico/ambulatori/oncogeriatria')}>
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <Heart className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">Oncogeriatria</CardTitle>
                    <CardDescription className="text-sm">Oncologia per pazienti anziani</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-2 text-sm text-muted-foreground mb-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>Occupazione giornaliera</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    <span>Pianificazione settimanale</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    <span>Verbali visite</span>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="w-full">
                  Accedi all'Ambulatorio
                </Button>
              </CardContent>
            </Card>

            {/* Osteoncologia */}
            <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate('/oncologico/ambulatori/osteoncologia')}>
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                    <Stethoscope className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">Osteoncologia</CardTitle>
                    <CardDescription className="text-sm">Oncologia ossea e tessuti molli</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-2 text-sm text-muted-foreground mb-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>Occupazione giornaliera</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    <span>Pianificazione settimanale</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    <span>Verbali visite</span>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="w-full">
                  Accedi all'Ambulatorio
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OncologicoHome;
