import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Progress } from "@/shared/components/ui/progress";
import { Badge } from "@/shared/components/ui/badge";
import { Activity, CheckCircle, Clock } from "lucide-react";

interface WorkflowProgressProps {
  patientState: string;
  patientData: {
    id: number;
    nome: string;
    cognome: string;
    stato: string;
    azioneRichiesta: string;
  };
}

const getProgressPercentage = (patientState: string): number => {
  switch (patientState) {
    case 'attesa_esenzione':
      return 20;
    case 'attesa_prescrizione':
      return 40;
    case 'attesa_esami':
      return 60;
    case 'pronto_gom':
      return 80;
    case 'in_trattamento':
      return 100;
    default:
      return 0;
  }
};

const getStatusInfo = (patientState: string) => {
  switch (patientState) {
    case 'attesa_esenzione':
      return {
        color: 'from-yellow-400 to-orange-500',
        bgColor: 'bg-yellow-50',
        borderColor: 'border-yellow-200',
        textColor: 'text-yellow-800',
        icon: Clock,
        message: 'In attesa di esenzione'
      };
    case 'attesa_prescrizione':
      return {
        color: 'from-yellow-400 to-orange-500',
        bgColor: 'bg-yellow-50',
        borderColor: 'border-yellow-200',
        textColor: 'text-yellow-800',
        icon: Clock,
        message: 'In attesa di prescrizione'
      };
    case 'attesa_esami':
      return {
        color: 'from-yellow-400 to-orange-500',
        bgColor: 'bg-yellow-50',
        borderColor: 'border-yellow-200',
        textColor: 'text-yellow-800',
        icon: Clock,
        message: 'In attesa di esami'
      };
    case 'pronto_gom':
      return {
        color: 'from-green-400 to-emerald-500',
        bgColor: 'bg-green-50',
        borderColor: 'border-green-200',
        textColor: 'text-green-800',
        icon: CheckCircle,
        message: 'Pronto per GOM'
      };
    case 'in_trattamento':
      return {
        color: 'from-blue-400 to-cyan-500',
        bgColor: 'bg-blue-50',
        borderColor: 'border-blue-200',
        textColor: 'text-blue-800',
        icon: CheckCircle,
        message: 'In trattamento'
      };
    default:
      return {
        color: 'from-gray-400 to-gray-500',
        bgColor: 'bg-gray-50',
        borderColor: 'border-gray-200',
        textColor: 'text-gray-800',
        icon: Clock,
        message: 'Stato sconosciuto'
      };
  }
};

export function WorkflowProgress({ patientState, patientData }: WorkflowProgressProps) {
  const progressPercentage = getProgressPercentage(patientState);
  const statusInfo = getStatusInfo(patientState);
  const StatusIcon = statusInfo.icon;

  return (
    <Card className={`mb-6 ${statusInfo.bgColor} ${statusInfo.borderColor} border-2 shadow-lg`}>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <Activity className="w-5 h-5 text-primary" />
              Workflow Paziente
            </CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              Percorso diagnostico-terapeutico di {patientData.nome} {patientData.cognome}
            </p>
          </div>
          <Badge 
            variant="secondary"
            className={`text-sm ${statusInfo.textColor} ${statusInfo.bgColor} ${statusInfo.borderColor} border`}
          >
            <StatusIcon className="w-3 h-3 mr-1" />
            {patientData.azioneRichiesta}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Enhanced Progress Bar */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-muted-foreground">Progresso percorso</span>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-primary">{progressPercentage}%</span>
              <StatusIcon className={`w-5 h-5 ${statusInfo.textColor}`} />
            </div>
          </div>
          
          {/* Custom Progress Bar */}
          <div className="relative">
            <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden shadow-inner">
              <div 
                className={`h-full bg-gradient-to-r ${statusInfo.color} rounded-full transition-all duration-1000 ease-out relative overflow-hidden`}
                style={{ width: `${progressPercentage}%` }}
              >
                {/* Animated shimmer effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30 animate-pulse"></div>
                
                {/* Progress dots */}
                <div className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-1">
                  <div className={`w-2 h-2 bg-white rounded-full shadow-lg ${progressPercentage === 100 ? 'animate-bounce' : ''}`}></div>
                </div>
              </div>
            </div>
            
            {/* Progress milestones */}
            <div className="flex justify-between mt-2 text-xs text-muted-foreground">
              <span className={progressPercentage >= 20 ? 'text-green-600 font-semibold' : ''}>Esenzione</span>
              <span className={progressPercentage >= 40 ? 'text-green-600 font-semibold' : ''}>Prescrizione</span>
              <span className={progressPercentage >= 60 ? 'text-green-600 font-semibold' : ''}>Esami</span>
              <span className={progressPercentage >= 80 ? 'text-green-600 font-semibold' : ''}>GOM</span>
              <span className={progressPercentage >= 100 ? 'text-green-600 font-semibold' : ''}>Trattamento</span>
            </div>
          </div>
          
          {/* Status message */}
          <div className={`p-3 rounded-lg ${statusInfo.bgColor} ${statusInfo.borderColor} border`}>
            <div className="flex items-center gap-2">
              <StatusIcon className={`w-4 h-4 ${statusInfo.textColor}`} />
              <span className={`text-sm font-medium ${statusInfo.textColor}`}>
                {statusInfo.message}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
