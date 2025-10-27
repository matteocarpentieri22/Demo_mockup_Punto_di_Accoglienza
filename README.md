# PDTA Navigator Demo

Sistema demo per la gestione dei Percorsi Diagnostico Terapeutici Assistenziali (PDTA) in ambito oncologico.

## 🏥 Panoramica del Sistema

Il PDTA Navigator è una piattaforma web che supporta la gestione integrata dei pazienti oncologici attraverso diversi moduli specializzati:

- **Modulo Oncologico**: Sistema avanzato con profili separati per oncologi/radioterapisti e case manager
- **Modulo Paziente**: Interfaccia dedicata ai pazienti per consultare informazioni e questionari

## 🚀 Avvio Rapido

### Prerequisiti
- Node.js (versione 18 o superiore)
- npm o yarn

### Installazione
```bash
# Clona il repository
git clone <repository-url>
cd pdta-navigator-demo

# Installa le dipendenze
npm install

# Avvia il server di sviluppo
npm run dev
```

### Build per Produzione
```bash
npm run build
```

## 📋 Moduli Disponibili

### 1. Modulo Oncologico
Sistema avanzato con architettura modulare:

#### 👨‍⚕️ Profilo Oncologo/Radioterapista
- **Richiesta Prenotazioni**: Form per richiedere esami e visite
- **Notifiche**: Sistema di notifiche per esiti visite/esami e discussioni
- **Gestione Richieste**: Visualizzazione e gestione delle richieste inviate

#### 👩‍💼 Profilo Case Manager
- **Lista Pazienti**: Visualizzazione pazienti ordinati per score clinico
- **Gestione Prenotazioni**: Associazione slot CUP e gestione prenotazioni
- **Verbali Visite**: Creazione e gestione verbali per oncologi/radioterapisti
- **Visite Ambulatori**: Gestione calendario e blocchi slot

#### 🏥 Ambulatori Specialistici
- **Cure Simultanee**: Gestione occupazione e pianificazione
- **Oncogeriatria**: Specializzazione per pazienti anziani
- **Osteoncologia**: Gestione patologie ossee oncologiche

### 2. Modulo Paziente
Interfaccia dedicata ai pazienti per:
- Consultazione informazioni personali
- Visualizzazione esami programmati
- Compilazione questionari
- Accesso a informazioni di supporto

## 🛠️ Tecnologie Utilizzate

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **UI Library**: shadcn/ui + Tailwind CSS
- **Routing**: React Router DOM
- **Icons**: Lucide React

## 📁 Struttura del Progetto

```
src/
├── oncologico/          # Modulo Oncologico (refactorizzato)
│   ├── components/
│   │   ├── layout/      # Navbar e componenti layout
│   │   └── features/    # Componenti per feature specifiche
│   ├── pages/           # Pagine del modulo
│   ├── hooks/           # Custom hooks
│   ├── types/           # TypeScript types centralizzati
│   └── utils/           # Utility functions e costanti
├── paziente/            # Modulo Paziente
├── mmg/                 # Modulo MMG
├── shared/              # Componenti e utilities condivise
├── routes/              # Sistema di routing modulare
└── main.tsx            # Entry point dell'applicazione
```

📖 Per dettagli completi sulla struttura, vedi [STRUCTURE.md](./STRUCTURE.md)

## 🎯 Funzionalità Principali

### Sistema di Notifiche
- Notifiche in tempo reale per oncologi/radioterapisti
- Badge dinamici per notifiche non lette
- Categorizzazione per tipo (esiti visite, discussioni, esami)

### Gestione PDTA
- 9 percorsi diagnostico-terapeutici predefiniti
- Score clinico per priorizzazione pazienti
- Integrazione con sistema CUP per prenotazioni

### Ambulatori Specialistici
- Gestione occupazione giornaliera e settimanale
- Blocco slot per nuove visite
- Export dati e reportistica
- Verbali dettagliati delle visite

### Sistema di Ricerca e Filtri
- Ricerca pazienti per codice fiscale
- Filtri per ambulatorio, PDTA, stato prenotazione
- Navigazione temporale per calendari

## 🔧 Configurazione

### Variabili d'Ambiente
Il progetto utilizza configurazioni di default per la demo. Per personalizzazioni, creare un file `.env.local`:

```env
VITE_APP_TITLE=PDTA Navigator Demo
VITE_API_BASE_URL=http://localhost:3000/api
```

## 📊 Dati Demo

Il sistema include dati mock completi per:
- Pazienti con diverse patologie oncologiche
- Visite e esami programmati
- Notifiche e richieste
- Calendari ambulatoriali
- Verbali e report

## 🤝 Contributi

Per contribuire al progetto:
1. Fork del repository
2. Creazione di un branch per la feature
3. Commit delle modifiche
4. Push al branch
5. Creazione di una Pull Request

## 📄 Licenza

Questo progetto è sviluppato per scopi dimostrativi e di ricerca.

## 📞 Supporto

Per domande o supporto tecnico, contattare il team di sviluppo.

---

**Versione**: 1.0.0  
**Ultimo aggiornamento**: Gennaio 2024