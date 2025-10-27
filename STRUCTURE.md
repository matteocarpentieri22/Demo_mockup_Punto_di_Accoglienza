# 🏗️ Struttura del Progetto PDTA Navigator

Documentazione aggiornata della struttura del repository.

## 📂 Panoramica Generale

```
src/
├── App.tsx                 # Entry point principale (semplificato)
├── main.tsx                # Bootstrap React
├── index.css               # Stili globali
├── mmg/                    # Modulo MMG
├── oncologico/             # Modulo Oncologico (refactorizzato)
├── paziente/               # Modulo Paziente
├── shared/                 # Componenti condivisi
└── routes/                 # Sistema di routing modulare (NUOVO)
```

## 🎯 Modulo Oncologico (Refactorizzato)

### Struttura Migliorata

```
src/oncologico/
├── components/
│   ├── layout/             # Navbar e componenti layout
│   │   ├── OncologoNavbar.tsx
│   │   ├── CaseManagerNavbar.tsx
│   │   ├── AmbulatorioNavbar.tsx
│   │   ├── CureSimultaneeNavbar.tsx
│   │   ├── OncogeriatriaNavbar.tsx
│   │   └── OsteoncologiaNavbar.tsx
│   └── features/           # Componenti per feature specifiche (futuro)
│
├── pages/                  # Pagine del modulo oncologico
│   ├── OncologicoHome.tsx
│   ├── OncologoPage.tsx
│   ├── NotifichePage.tsx
│   ├── RichiestePage.tsx
│   ├── CaseManagerHome.tsx
│   ├── PazientiListPage.tsx
│   ├── VisiteAmbulatoriPage.tsx
│   └── ... (altre pagine)
│
├── hooks/                  # Custom Hooks (da implementare)
│   └── .gitkeep
│
├── types/                  # TypeScript Types centralizzati (NUOVO)
│   └── index.ts            # Tipi condivisi (PDTA, Ambulatorio, Priorità, etc.)
│
└── utils/                  # Utility Functions (NUOVO)
    ├── constants.ts        # Costanti e configurazioni
    └── index.ts            # Funzioni utility (generateRandomPatient, etc.)
```

## 🔄 Sistema di Routing Modulare (NUOVO)

### File di Routing Separati

```
src/routes/
├── index.tsx               # Entry point - racchiude tutte le rotte
└── oncologico.tsx          # Rotte specifiche del modulo oncologico
```

**Vantaggi:**
- ✅ `App.tsx` semplificato (da 76 righe a 24 righe)
- ✅ Rotte organizzate per modulo
- ✅ Più facile da mantenere e scalare
- ✅ Possibilità di lazy loading dei moduli

## 📦 Struttura Moduli

### 1. Modulo MMG (`src/mmg/`)
```
mmg/
├── components/             # Componenti specifici MMG
├── hooks/                  # Custom hooks (vuota, pronta per uso futuro)
└── pages/                  # Pagine MMG
```

### 2. Modulo Paziente (`src/paziente/`)
```
paziente/
├── components/             # Componenti specifici paziente
├── hooks/                  # Custom hooks (vuota, pronta per uso futuro)
└── pages/                  # Pagine paziente
```

### 3. Modulo Shared (`src/shared/`)
```
shared/
├── components/ui/          # shadcn/ui componenti (70+ componenti)
├── hooks/                  # Hooks condivisi (useMobile, useToast)
├── lib/                    # Utilità (utils.ts)
└── types/                  # Tipi condivisi (vuota, da popolare)
```

## 🎨 Tipi TypeScript Centralizzati

### Nuovo File: `src/oncologico/types/index.ts`

Contiene tutti i tipi del modulo oncologico:
- `PDTA` - Lista delle 9 patologie
- `Ambulatorio` - Tipi di ambulatorio
- `Priorita` - Priorità delle notifiche
- `Notifica` - Struttura notifiche
- `Paziente` - Struttura paziente
- `SlotVisita` - Struttura slot visita
- `RichiestaPrenotazione` - Struttura richieste

## 🔧 Utility e Costanti

### Nuovo File: `src/oncologico/utils/constants.ts`

Contiene tutte le costanti:
- `PDTA_LIST` - Array con 9 PDTA
- `AMBULATORI` - Array con 3 ambulatori
- `MEDICI` - Lista medici
- `FASCE_ORARIE` - Orari disponibili
- `PRIORITA_CONFIG` - Configurazione priorità
- `TIPI_NOTIFICHE` - Configurazione notifiche

### Nuovo File: `src/oncologico/utils/index.ts`

Contiene funzioni utility:
- `generateRandomPatient()` - Genera paziente demo
- `formatDate()` - Formatta date in italiano
- `formatDateTime()` - Formatta data e ora
- `calculateScore()` - Calcola score clinico
- `validateCF()` - Valida codice fiscale
- `getAge()` - Calcola età

## ✨ Miglioramenti Implementati

### 1. ✅ Struttura Navbar Migliorata
- Le Navbar sono ora in `components/layout/` invece che in `components/`
- Migliore organizzazione e naming convention
- Tutti gli import aggiornati automaticamente

### 2. ✅ Sistema di Routing Modulare
- `App.tsx` semplificato (da 76 a 24 righe)
- Rotte organizzate in file separati per modulo
- Facile da mantenere e scalare

### 3. ✅ Tipi TypeScript Centralizzati
- Tutti i tipi in un unico file `types/index.ts`
- Facile da trovare e mantenere
- Evita duplicazione di tipi

### 4. ✅ Utility e Costanti
- Costanti separate dai componenti
- Funzioni utility riutilizzabili
- Facile da testare

### 5. ✅ Cartelle per il Futuro
- `hooks/` pronta per custom hooks
- `features/` pronta per componenti feature-specific
- `.gitkeep` per mantenere cartelle vuote nel repository

## 🚀 Prossimi Passi Consigliati

### 1. Implementare Custom Hooks
Creare hooks riutilizzabili in `src/oncologico/hooks/`:
```typescript
// useNotifications.ts
export const useNotifications = () => {
  // logica per gestire notifiche
};

// usePazienti.ts
export const usePazienti = () => {
  // logica per gestire pazienti
};
```

### 2. Organizzare Componenti Feature
Spostare componenti specifici in `src/oncologico/components/features/`:
```
features/
├── notifiche/
│   ├── NotificheList.tsx
│   └── NotificaCard.tsx
├── richieste/
│   ├── RichiesteList.tsx
│   └── RichiestaCard.tsx
```

### 3. Aggiungere Test
Creare struttra per test:
```
src/oncologico/
├── __tests__/
│   ├── hooks/
│   ├── utils/
│   └── components/
```

### 4. Aggiungere Stato Globale
Considerare React Context o Zustand per stato condiviso:
```
src/oncologico/
├── context/         # Se usi React Context
├── store/           # Se usi Zustand/Redux
```

## 📊 Confronto Prima/Dopo

| Aspetto | Prima | Dopo | Miglioramento |
|---------|-------|------|---------------|
| **App.tsx** | 76 righe, tutte le rotte | 24 righe, import di AppRoutes | -68% righe |
| **Navbar** | In `components/` | In `components/layout/` | ✓ Più organizzato |
| **Tipi** | Inline nei componenti | Centralizzati in `types/` | ✓ DRY principle |
| **Costanti** | Nel codice | In `utils/constants.ts` | ✓ Separazione preoccupazioni |
| **Routing** | Tutto in App.tsx | Modulare per modulo | ✓ Scalabile |
| **Cartelle vuote** | Molte cartelle vuote | `.gitkeep` con documentazione | ✓ Pronto per crescita |

## 🎯 Best Practices Seguite

1. ✅ **Separation of Concerns**: Componenti, logica e tipi separati
2. ✅ **DRY Principle**: Evitata duplicazione con utility centralizzate
3. ✅ **Modularity**: Routing e struttura organizzati per modulo
4. ✅ **Scalability**: Cartelle pronte per crescita futura
5. ✅ **TypeScript**: Tipi centralizzati e ben documentati
6. ✅ **Clean Code**: Codice più pulito e mantenibile

## 📝 Note per il Team

- Tutti gli import delle Navbar sono stati aggiornati automaticamente
- Nessun errore di linting introdotto
- La struttura è backward compatible (tutto funziona come prima)
- I nuovi file possono essere usati gradualmente
- La cartella `components/ui/` è stata rimossa (era duplicata)

---

**Ultimo aggiornamento**: Ottobre 2024  
**Versione struttura**: 2.0

