import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";
import { Stethoscope, User, Building2, Heart, ArrowRight, Sparkles, Shield, Users } from "lucide-react";

const SystemSelector = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-200/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-100/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 flex items-center justify-center p-4 min-h-screen">
        <div className="w-full max-w-6xl">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="mx-auto mb-8 w-24 h-24 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl flex items-center justify-center shadow-2xl animate-pulse">
              <Building2 className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent mb-6">
              Istituto Oncologico Veneto
            </h1>
            <p className="text-xl text-slate-600 mb-2">Seleziona il sistema di accesso</p>
            <div className="flex items-center justify-center gap-2 text-sm text-slate-500">
              <Sparkles className="w-4 h-4" />
              <span>Tre sistemi distinti per stakeholder diversi</span>
            </div>
          </div>

          {/* System Cards */}
          <div className="grid md:grid-cols-3 gap-8 mb-16 items-stretch">
            {/* MMG System */}
            <Card className="group hover:shadow-2xl transition-all duration-500 cursor-pointer border-0 shadow-xl hover:scale-105 bg-gradient-to-br from-blue-50 via-white to-blue-50/50 overflow-hidden relative flex flex-col h-full">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <CardHeader className="text-center pb-6 relative z-10">
                <div className="mx-auto mb-6 w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-700 rounded-3xl flex items-center justify-center shadow-xl group-hover:shadow-2xl transition-all duration-500 group-hover:scale-110">
                  <User className="w-10 h-10 text-white" />
                </div>
                <CardTitle className="text-2xl font-bold text-slate-800 mb-2">Portale MMG</CardTitle>
                <CardDescription className="text-base text-slate-600 font-medium">
                  Medici di Medicina Generale
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center space-y-6 relative z-10 flex-1 flex flex-col justify-between">
                <div>
                  <p className="text-sm text-slate-500 leading-relaxed mb-6">
                    Sistema di autovalutazione PDTA per medici di medicina generale. 
                    Accedi alle funzionalità di valutazione e selezione dei percorsi diagnostico-terapeutici appropriati.
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-sm">
                      <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"></div>
                      <span className="text-slate-600">Autovalutazione AI per PDTA</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"></div>
                      <span className="text-slate-600">Selezione diretta PDTA</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"></div>
                      <span className="text-slate-600">Documentazione e risorse</span>
                    </div>
                  </div>
                </div>
                <Button 
                  className="w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white py-4 px-6 rounded-2xl font-semibold text-sm shadow-xl hover:shadow-2xl transition-all duration-300 hover:from-blue-600 hover:to-blue-800 group-hover:scale-105" 
                  size="lg"
                  onClick={() => window.location.href = '/mmg'}
                >
                  <span>Accedi al Portale MMG</span>
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                </Button>
              </CardContent>
            </Card>

            {/* Sistema Oncologico */}
            <Card className="group hover:shadow-2xl transition-all duration-500 cursor-pointer border-0 shadow-xl hover:scale-105 bg-gradient-to-br from-emerald-50 via-white to-emerald-50/50 overflow-hidden relative flex flex-col h-full">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <CardHeader className="text-center pb-6 relative z-10">
                <div className="mx-auto mb-6 w-20 h-20 bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-3xl flex items-center justify-center shadow-xl group-hover:shadow-2xl transition-all duration-500 group-hover:scale-110">
                  <Stethoscope className="w-10 h-10 text-white" />
                </div>
                <CardTitle className="text-2xl font-bold text-slate-800 mb-2">Sistema Oncologico</CardTitle>
                <CardDescription className="text-base text-slate-600 font-medium">
                  Personale IOV
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center space-y-6 relative z-10 flex-1 flex flex-col justify-between">
                <div>
                  <p className="text-sm text-slate-500 leading-relaxed mb-6">
                    Sistema avanzato con profili distinti per oncologi e case manager. 
                    Gestione completa dei pazienti e delle attività cliniche.
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-sm">
                      <div className="w-2 h-2 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full"></div>
                      <span className="text-slate-600">Profilo Oncologo/Radioterapista</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <div className="w-2 h-2 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full"></div>
                      <span className="text-slate-600">Profilo Case Manager</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <div className="w-2 h-2 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full"></div>
                      <span className="text-slate-600">Ambulatori specialistici</span>
                    </div>
                  </div>
                </div>
                <Button 
                  className="w-full bg-gradient-to-r from-emerald-500 to-emerald-700 text-white py-4 px-6 rounded-2xl font-semibold text-sm shadow-xl hover:shadow-2xl transition-all duration-300 hover:from-emerald-600 hover:to-emerald-800 group-hover:scale-105" 
                  size="lg"
                  onClick={() => window.location.href = '/oncologico'}
                >
                  <span>Accedi al Sistema Oncologico</span>
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                </Button>
              </CardContent>
            </Card>

            {/* Paziente System */}
            <Card className="group hover:shadow-2xl transition-all duration-500 cursor-pointer border-0 shadow-xl hover:scale-105 bg-gradient-to-br from-rose-50 via-white to-rose-50/50 overflow-hidden relative flex flex-col h-full">
              <div className="absolute inset-0 bg-gradient-to-br from-rose-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <CardHeader className="text-center pb-6 relative z-10">
                <div className="mx-auto mb-6 w-20 h-20 bg-gradient-to-br from-rose-500 to-rose-700 rounded-3xl flex items-center justify-center shadow-xl group-hover:shadow-2xl transition-all duration-500 group-hover:scale-110">
                  <Heart className="w-10 h-10 text-white" />
                </div>
                <CardTitle className="text-2xl font-bold text-slate-800 mb-2">Portale Paziente</CardTitle>
                <CardDescription className="text-base text-slate-600 font-medium">
                  Accesso Pazienti
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center space-y-6 relative z-10 flex-1 flex flex-col justify-between">
                <div>
                  <p className="text-sm text-slate-500 leading-relaxed mb-6">
                    Portale dedicato ai pazienti per accedere alle proprie informazioni cliniche, 
                    monitorare il percorso di cura e compilare questionari di autovalutazione.
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-sm">
                      <div className="w-2 h-2 bg-gradient-to-r from-rose-500 to-rose-600 rounded-full"></div>
                      <span className="text-slate-600">Informazioni personali e esenzioni</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <div className="w-2 h-2 bg-gradient-to-r from-rose-500 to-rose-600 rounded-full"></div>
                      <span className="text-slate-600">Percorso clinico e appuntamenti</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <div className="w-2 h-2 bg-gradient-to-r from-rose-500 to-rose-600 rounded-full"></div>
                      <span className="text-slate-600">Questionari di autovalutazione</span>
                    </div>
                  </div>
                </div>
                <Button 
                  className="w-full bg-gradient-to-r from-rose-500 to-rose-700 text-white py-4 px-6 rounded-2xl font-semibold text-sm shadow-xl hover:shadow-2xl transition-all duration-300 hover:from-rose-600 hover:to-rose-800 group-hover:scale-105" 
                  size="lg"
                  onClick={() => window.location.href = '/paziente'}
                >
                  <span>Accedi al Portale Paziente</span>
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Footer Info */}
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 text-sm text-slate-500 mb-4">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4" />
                <span>Sicuro e Protetto</span>
              </div>
              <div className="w-1 h-1 bg-slate-300 rounded-full"></div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                <span>Multi-utente</span>
              </div>
              <div className="w-1 h-1 bg-slate-300 rounded-full"></div>
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4" />
                <span>Istituto Oncologico Veneto - IRCCS</span>
              </div>
            </div>
            <p className="text-xs text-slate-400">
              Tre sistemi distinti per stakeholder diversi con accessi diversificati e sicuri
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemSelector;