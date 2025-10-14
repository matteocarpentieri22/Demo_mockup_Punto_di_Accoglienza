import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";
import { ArrowLeft, BarChart3, PieChart, TrendingUp, Users, Clock, AlertCircle, Maximize2, X } from "lucide-react";
import { OncologicoNavbar } from "@/oncologico/components/OncologicoNavbar";
import { useNavigate } from "react-router-dom";

// Mock data per i grafici
const mockBubbleData = [
  { x: 0.2, y: "Pronto per GOM", size: 15, label: "15 pazienti" },
  { x: 3.5, y: "Attesa prescrizione", size: 7, label: "7 pazienti" },
  { x: 5, y: "Attesa esami", size: 2, label: "2 pazienti" },
  { x: 9.8, y: "Attesa esenzione", size: 5, label: "5 pazienti" }
];

const mockBarData = [
  { 
    settimana: "Sett 1", 
    attesaEsenzione: 2, 
    attesaPrescrizione: 1, 
    attesaEsami: 3, 
    prontoGOM: 1, 
    inLavorazione: 1 
  },
  { 
    settimana: "Sett 2", 
    attesaEsenzione: 3, 
    attesaPrescrizione: 2, 
    attesaEsami: 2, 
    prontoGOM: 2, 
    inLavorazione: 2 
  },
  { 
    settimana: "Sett 3", 
    attesaEsenzione: 1, 
    attesaPrescrizione: 3, 
    attesaEsami: 4, 
    prontoGOM: 1, 
    inLavorazione: 1 
  },
  { 
    settimana: "Sett 4", 
    attesaEsenzione: 3, 
    attesaPrescrizione: 2, 
    attesaEsami: 4, 
    prontoGOM: 1, 
    inLavorazione: 2 
  }
];

// Tipo per i dati della settimana
type WeekData = {
  settimana: string;
  attesaEsenzione: number;
  attesaPrescrizione: number;
  attesaEsami: number;
  prontoGOM: number;
  inLavorazione: number;
};

const Dashboard = () => {
  const navigate = useNavigate();
  const [viewType, setViewType] = useState<"bubble" | "bar">("bubble");
  const [expandedChart, setExpandedChart] = useState<"bubble" | "bar" | null>(null);
  const [hoveredBar, setHoveredBar] = useState<{week: string, category: string, value: number, x: number, y: number} | null>(null);
  const [hoveredWeek, setHoveredWeek] = useState<{week: string, data: WeekData, x: number, y: number} | null>(null);

  const renderBubbleChart = () => (
    <div className="space-y-4">
       <div className="flex items-center justify-between mb-4">
         <div className="text-center flex-1">
           <p className="text-xs text-muted-foreground">
             X = Giorni alla scadenza • Y = Tipo azione • Dimensione = Numero pazienti
           </p>
         </div>
         <Button 
           variant="outline" 
           size="sm" 
           onClick={() => setExpandedChart("bubble")}
           className="ml-4"
         >
           <Maximize2 className="w-4 h-4" />
         </Button>
       </div>
      
       {/* Chart Container */}
       <div className="relative bg-white border rounded-lg p-3 pb-6 h-80">
        {/* Y-axis labels */}
        <div className="absolute left-0 top-6 bottom-6 w-20 sm:w-24 md:w-32 flex flex-col justify-between">
          <div className="text-xs sm:text-sm font-medium text-right pr-1 sm:pr-2">Pronto per GOM</div>
          <div className="text-xs sm:text-sm font-medium text-right pr-1 sm:pr-2">Attesa prescrizione</div>
          <div className="text-xs sm:text-sm font-medium text-right pr-1 sm:pr-2">Attesa esenzione</div>
          <div className="text-xs sm:text-sm font-medium text-right pr-1 sm:pr-2">Attesa esami</div>
        </div>
        
        {/* Chart Area */}
        <div className="ml-20 sm:ml-24 md:ml-32 mr-2 sm:mr-4 md:mr-8 h-full relative">
          {/* Grid lines */}
          <div className="absolute inset-0">
            {/* Vertical grid lines */}
            {[0, 2, 4, 6, 8, 10].map((x) => (
              <div
                key={x}
                className="absolute top-0 bottom-0 border-l border-gray-200"
                style={{ left: `${(x / 10) * 100}%` }}
              />
            ))}
            {/* Horizontal grid lines */}
            {[0, 1, 2, 3].map((y) => (
              <div
                key={y}
                className="absolute left-0 right-0 border-t border-gray-200"
                style={{ top: `${(y / 3) * 100}%` }}
              />
            ))}
          </div>
          
          {/* X-axis */}
          <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-gray-600">
            <span className="text-xs sm:text-sm">0</span>
            <span className="text-xs sm:text-sm">2</span>
            <span className="text-xs sm:text-sm">4</span>
            <span className="text-xs sm:text-sm">6</span>
            <span className="text-xs sm:text-sm">8</span>
            <span className="text-xs sm:text-sm">10</span>
          </div>
          
           {/* X-axis label */}
           <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-6 sm:translate-y-8 text-xs sm:text-sm font-medium text-gray-700">
             Giorni alla scadenza
           </div>
          
          {/* Bubbles */}
          {mockBubbleData.map((item, index) => {
            const yPositions = {
              "Pronto per GOM": 0,
              "Attesa prescrizione": 1,
              "Attesa esenzione": 2,
              "Attesa esami": 3
            };
            
            const bubbleSize = Math.max(20, item.size * 1.5);
            const xPos = (item.x / 10) * 100;
            const yPos = (yPositions[item.y as keyof typeof yPositions] / 3) * 100;
            
            return (
              <div
                key={index}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-xs sm:text-sm"
                style={{
                  left: `${xPos}%`,
                  top: `${yPos}%`,
                  width: `${bubbleSize}px`,
                  height: `${bubbleSize}px`
                }}
              >
                {item.size}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );

  const renderBarChart = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-6">
        <div className="text-center flex-1">
          <h3 className="text-lg font-semibold mb-2">Trend settimanale per categoria di azione richiesta</h3>
          <p className="text-sm text-muted-foreground">
            Andamento del numero di pazienti per categoria nel tempo
          </p>
        </div>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => setExpandedChart("bar")}
          className="ml-4"
        >
          <Maximize2 className="w-4 h-4" />
        </Button>
      </div>
      
       {/* Chart Container */}
       <div className="relative bg-white border rounded-lg p-3 pb-6 h-80">
        {/* Y-axis */}
        <div className="absolute left-0 top-6 bottom-12 w-6 sm:w-8 flex flex-col justify-between text-xs text-gray-600">
          <span className="text-xs sm:text-sm">4</span>
          <span className="text-xs sm:text-sm">3</span>
          <span className="text-xs sm:text-sm">2</span>
          <span className="text-xs sm:text-sm">1</span>
          <span className="text-xs sm:text-sm">0</span>
        </div>
        
        {/* Chart Area */}
        <div className="ml-6 sm:ml-8 mr-2 sm:mr-4 h-full relative">
          {/* Grid lines */}
          <div className="absolute inset-0">
            {/* Horizontal grid lines */}
            {[0, 1, 2, 3, 4].map((y) => (
              <div
                key={y}
                className="absolute left-0 right-0 border-t border-gray-200"
                style={{ top: `${100 - (y / 4) * 100}%` }}
              />
            ))}
          </div>
          
          {/* Bars for each week */}
          <div className="absolute bottom-0 left-0 right-0 h-full flex justify-between items-end px-2 sm:px-4 md:px-8">
            {mockBarData.map((week, weekIndex) => (
              <div key={weekIndex} className="flex flex-col items-center w-16 sm:w-20 md:w-28">
                {/* Bar group - horizontal bars side by side */}
                <div className="flex items-end justify-center h-full w-20 sm:w-32 md:w-40 gap-0.5 sm:gap-1">
                  {/* Attesa esenzione (light yellow) */}
                  <div
                    className="bg-yellow-200 rounded-t-sm w-4 sm:w-6 md:w-8 cursor-pointer transition-all duration-200 hover:bg-yellow-300 hover:shadow-md hover:scale-105"
                    style={{ 
                      height: `${Math.max(40, (week.attesaEsenzione / 4) * 200)}px`,
                      minHeight: '40px'
                    }}
                    onMouseEnter={(e) => {
                      const rect = e.currentTarget.getBoundingClientRect();
                      setHoveredBar({
                        week: week.settimana, 
                        category: 'Attesa Esenzione', 
                        value: week.attesaEsenzione,
                        x: rect.left + rect.width / 2,
                        y: rect.top
                      });
                    }}
                    onMouseLeave={() => setHoveredBar(null)}
                  />
                  {/* Attesa prescrizione (darker yellow/gold) */}
                  <div
                    className="bg-yellow-500 rounded-t-sm w-4 sm:w-6 md:w-8 cursor-pointer transition-all duration-200 hover:bg-yellow-600 hover:shadow-md hover:scale-105"
                    style={{ 
                      height: `${Math.max(40, (week.attesaPrescrizione / 4) * 200)}px`,
                      minHeight: '40px'
                    }}
                    onMouseEnter={(e) => {
                      const rect = e.currentTarget.getBoundingClientRect();
                      setHoveredBar({
                        week: week.settimana, 
                        category: 'Attesa Prescrizione', 
                        value: week.attesaPrescrizione,
                        x: rect.left + rect.width / 2,
                        y: rect.top
                      });
                    }}
                    onMouseLeave={() => setHoveredBar(null)}
                  />
                  {/* Attesa esami (orange/gold) */}
                  <div
                    className="bg-orange-500 rounded-t-sm w-4 sm:w-6 md:w-8 cursor-pointer transition-all duration-200 hover:bg-orange-600 hover:shadow-md hover:scale-105"
                    style={{ 
                      height: `${Math.max(40, (week.attesaEsami / 4) * 200)}px`,
                      minHeight: '40px'
                    }}
                    onMouseEnter={(e) => {
                      const rect = e.currentTarget.getBoundingClientRect();
                      setHoveredBar({
                        week: week.settimana, 
                        category: 'Attesa Esami', 
                        value: week.attesaEsami,
                        x: rect.left + rect.width / 2,
                        y: rect.top
                      });
                    }}
                    onMouseLeave={() => setHoveredBar(null)}
                  />
                  {/* Pronto GOM (green) */}
                  <div
                    className="bg-green-500 rounded-t-sm w-4 sm:w-6 md:w-8 cursor-pointer transition-all duration-200 hover:bg-green-600 hover:shadow-md hover:scale-105"
                    style={{ 
                      height: `${Math.max(40, (week.prontoGOM / 4) * 200)}px`,
                      minHeight: '40px'
                    }}
                    onMouseEnter={(e) => {
                      const rect = e.currentTarget.getBoundingClientRect();
                      setHoveredBar({
                        week: week.settimana, 
                        category: 'Pronto GOM', 
                        value: week.prontoGOM,
                        x: rect.left + rect.width / 2,
                        y: rect.top
                      });
                    }}
                    onMouseLeave={() => setHoveredBar(null)}
                  />
                  {/* In lavorazione (blue) */}
                  <div
                    className="bg-blue-500 rounded-t-sm w-4 sm:w-6 md:w-8 cursor-pointer transition-all duration-200 hover:bg-blue-600 hover:shadow-md hover:scale-105"
                    style={{ 
                      height: `${Math.max(40, (week.inLavorazione / 4) * 200)}px`,
                      minHeight: '40px'
                    }}
                    onMouseEnter={(e) => {
                      const rect = e.currentTarget.getBoundingClientRect();
                      setHoveredBar({
                        week: week.settimana, 
                        category: 'In Lavorazione', 
                        value: week.inLavorazione,
                        x: rect.left + rect.width / 2,
                        y: rect.top
                      });
                    }}
                    onMouseLeave={() => setHoveredBar(null)}
                  />
                </div>
                {/* Week label */}
                <div 
                  className="text-xs sm:text-sm text-gray-600 mt-1 sm:mt-2 font-medium cursor-pointer hover:text-gray-800 hover:bg-gray-100 px-1 sm:px-2 py-1 rounded transition-colors"
                  onMouseEnter={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    setHoveredWeek({
                      week: week.settimana, 
                      data: week,
                      x: rect.left + rect.width / 2,
                      y: rect.top
                    });
                  }}
                  onMouseLeave={() => setHoveredWeek(null)}
                >
                  {week.settimana}
                </div>
              </div>
            ))}
          </div>
          
          {/* Tooltip */}
          {hoveredBar && (
            <div 
              className="fixed bg-gray-900 text-white px-3 py-2 rounded-lg shadow-lg text-sm z-50 pointer-events-none"
              style={{
                left: `${hoveredBar.x}px`,
                top: `${hoveredBar.y - 10}px`,
                transform: 'translateX(-50%)'
              }}
            >
              <div className="font-semibold">{hoveredBar.week}</div>
              <div className="text-gray-300">{hoveredBar.category}</div>
              <div className="text-yellow-400 font-bold">{hoveredBar.value} pazienti</div>
            </div>
          )}
          
          {/* Week Recap Tooltip */}
          {hoveredWeek && (
            <div 
              className="fixed bg-blue-900 text-white px-4 py-3 rounded-lg shadow-lg text-sm z-50 pointer-events-none min-w-48"
              style={{
                left: `${hoveredWeek.x}px`,
                top: `${hoveredWeek.y - 200}px`,
                transform: 'translateX(-50%)'
              }}
            >
              <div className="font-semibold text-lg mb-2">{hoveredWeek.week}</div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-yellow-200 rounded"></div>
                  <span>Attesa esenzione: <span className="font-bold text-yellow-300">{hoveredWeek.data.attesaEsenzione}</span></span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-yellow-500 rounded"></div>
                  <span>Attesa prescrizione: <span className="font-bold text-yellow-300">{hoveredWeek.data.attesaPrescrizione}</span></span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-orange-500 rounded"></div>
                  <span>Attesa esami: <span className="font-bold text-orange-300">{hoveredWeek.data.attesaEsami}</span></span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded"></div>
                  <span>Pronto per GOM: <span className="font-bold text-green-300">{hoveredWeek.data.prontoGOM}</span></span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-500 rounded"></div>
                  <span>In lavorazione: <span className="font-bold text-blue-300">{hoveredWeek.data.inLavorazione}</span></span>
                </div>
              </div>
              <div className="mt-2 pt-2 border-t border-blue-700">
                <div className="text-blue-300 font-semibold">
                  Totale: {hoveredWeek.data.attesaEsenzione + hoveredWeek.data.attesaPrescrizione + hoveredWeek.data.attesaEsami + hoveredWeek.data.prontoGOM + hoveredWeek.data.inLavorazione} pazienti
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* Legend */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-6 sm:translate-y-8 flex flex-wrap justify-center gap-1 sm:gap-2 md:gap-3 text-xs">
          <div className="flex items-center gap-1 hover:bg-gray-100 px-1 sm:px-2 py-1 rounded transition-colors cursor-pointer">
            <div className="w-2 h-2 sm:w-3 sm:h-3 bg-yellow-200 rounded"></div>
            <span className="hidden sm:inline">Attesa esenzione</span>
            <span className="sm:hidden">Esenz.</span>
          </div>
          <div className="flex items-center gap-1 hover:bg-gray-100 px-1 sm:px-2 py-1 rounded transition-colors cursor-pointer">
            <div className="w-2 h-2 sm:w-3 sm:h-3 bg-yellow-500 rounded"></div>
            <span className="hidden sm:inline">Attesa prescrizione</span>
            <span className="sm:hidden">Prescr.</span>
          </div>
          <div className="flex items-center gap-1 hover:bg-gray-100 px-1 sm:px-2 py-1 rounded transition-colors cursor-pointer">
            <div className="w-2 h-2 sm:w-3 sm:h-3 bg-orange-500 rounded"></div>
            <span className="hidden sm:inline">Attesa esami</span>
            <span className="sm:hidden">Esami</span>
          </div>
          <div className="flex items-center gap-1 hover:bg-gray-100 px-1 sm:px-2 py-1 rounded transition-colors cursor-pointer">
            <div className="w-2 h-2 sm:w-3 sm:h-3 bg-green-500 rounded"></div>
            <span className="hidden sm:inline">Pronto GOM</span>
            <span className="sm:hidden">GOM</span>
          </div>
          <div className="flex items-center gap-1 hover:bg-gray-100 px-1 sm:px-2 py-1 rounded transition-colors cursor-pointer">
            <div className="w-2 h-2 sm:w-3 sm:h-3 bg-blue-500 rounded"></div>
            <span className="hidden sm:inline">In lavorazione</span>
            <span className="sm:hidden">Lavor.</span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <OncologicoNavbar />

      <div className="container mx-auto px-4 py-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={() => navigate('/oncologico')}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Indietro
            </Button>
          </div>
        </div>

        {/* Chart Toggle and Summary Cards */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-3 gap-3">
          {/* Chart Toggle */}
          <div className="flex bg-muted rounded-lg p-1">
            <Button
              variant={viewType === "bubble" ? "default" : "ghost"}
              onClick={() => setViewType("bubble")}
              className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm"
            >
              <PieChart className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">Grafico a Bolle</span>
              <span className="sm:hidden">Bolle</span>
            </Button>
            <Button
              variant={viewType === "bar" ? "default" : "ghost"}
              onClick={() => setViewType("bar")}
              className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm"
            >
              <BarChart3 className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">Trend Settimanale</span>
              <span className="sm:hidden">Trend</span>
            </Button>
          </div>

          {/* Summary Cards - Compact */}
          <div className="flex flex-wrap gap-1 sm:gap-2">
            <Card>
              <CardContent className="p-1 sm:p-2">
                <div className="flex items-center gap-1 sm:gap-2">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 bg-primary/10 rounded-full flex items-center justify-center">
                    <Users className="w-2 h-2 sm:w-3 sm:h-3 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Totale</p>
                    <p className="text-xs sm:text-sm font-bold">29</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-1 sm:p-2">
                <div className="flex items-center gap-1 sm:gap-2">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 bg-yellow-500/10 rounded-full flex items-center justify-center">
                    <Clock className="w-2 h-2 sm:w-3 sm:h-3 text-yellow-500" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Attesa</p>
                    <p className="text-xs sm:text-sm font-bold">14</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-1 sm:p-2">
                <div className="flex items-center gap-1 sm:gap-2">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 bg-green-500/10 rounded-full flex items-center justify-center">
                    <TrendingUp className="w-2 h-2 sm:w-3 sm:h-3 text-green-500" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">GOM</p>
                    <p className="text-xs sm:text-sm font-bold">15</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-1 sm:p-2">
                <div className="flex items-center gap-1 sm:gap-2">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 bg-red-500/10 rounded-full flex items-center justify-center">
                    <AlertCircle className="w-2 h-2 sm:w-3 sm:h-3 text-red-500" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Urgenti</p>
                    <p className="text-xs sm:text-sm font-bold">2</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Chart Display */}
        <Card>
          <CardContent className="p-3">
            {viewType === "bubble" ? renderBubbleChart() : renderBarChart()}
          </CardContent>
        </Card>

        {/* Expanded Chart Modal */}
        {expandedChart && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-2 sm:p-4">
            <div className="bg-white rounded-lg w-full h-full max-w-6xl lg:max-w-7xl max-h-[95vh] sm:max-h-[90vh] overflow-auto">
              <div className="sticky top-0 bg-white border-b p-2 sm:p-4 flex items-center justify-between">
                <h2 className="text-lg sm:text-xl font-semibold">
                  {expandedChart === "bubble" ? "Grafico a Bolle" : "Trend Settimanale"}
                </h2>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setExpandedChart(null)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
              <div className="p-2 sm:p-4 md:p-6">
                {expandedChart === "bubble" ? renderBubbleChart() : renderBarChart()}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
