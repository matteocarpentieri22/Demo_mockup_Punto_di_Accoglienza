# Modulo Oncologico - Profili Distinti

Questa è la versione alternativa del modulo oncologico che presenta profili distinti per diverse figure professionali del personale IOV.

## Struttura

### Cartelle
- `src/oncologico/components/` - Componenti specifici del sistema oncologico
- `src/oncologico/pages/` - Pagine del modulo oncologico

### Pagine Principali

#### 1. Home (`OncologicoHome.tsx`)
- Pagina di selezione del profilo
- Presenta le due opzioni: Oncologo/Radioterapista e Case Manager
- Informazioni sui profili disponibili

#### 2. Profilo Oncologo (`OncologoPage.tsx`)
**Funzionalità:**
- Form di richiesta prenotazione esami/visite
- Valutazione score clinico (tosse, dolore, comorbidità)
- Accesso alle notifiche

**Campi del Form:**
- Codice fiscale del paziente
- PDTA di riferimento (selezione tra i 9 PDTA disponibili)
- Quesito diagnostico
- Ambulatorio (Cure Simultanee, Oncogeriatria, Osteoncologia)
- Medico richiedente (autocompilato)
- Codice ricetta/impegnativa
- Score clinico (parametri: tosse, dolore, comorbidità)

**Design e UX:**
- **Header gradiente** con icona e titolo prominente
- **Sezioni organizzate** con icone e titoli descrittivi
- **Campi stilizzati** con focus states e colori coerenti
- **Score clinico interattivo** con card separate e hover effects
- **Pulsante CTA** con gradiente e ombra per maggiore visibilità
- **Layout responsive** ottimizzato per desktop e mobile

**PDTA Disponibili:**
1. Prostata
2. Polmone
3. Colon
4. Retto
5. Stomaco
6. Sarcomi dei tessuti molli
7. Melanoma
8. Mammella
9. Sistema nervoso centrale

#### 3. Notifiche Oncologo (`NotifichePage.tsx`)
**Funzionalità:**
- Visualizzazione notifiche su esiti visite e discussioni pazienti
- Gestione notifiche lette/non lette
- Filtri per tipo e priorità
- Accesso diretto ai dettagli paziente

**Tipi di Notifiche:**
- **Esito Visita:** Risultati visite completate
- **Discussione Caso:** Richieste di discussione casi
- **Esito Esame:** Risultati esami diagnostici
- **Richiesta Prenotazione:** Nuove richieste di prenotazione
- **Follow-up:** Promemoria per controlli programmati

**Caratteristiche:**
- Dashboard con statistiche notifiche
- Indicatori visivi per notifiche non lette
- Priorità (Alta, Media, Bassa) con colori distintivi
- Informazioni complete paziente per ogni notifica
- Navigazione diretta ai dettagli paziente

#### 4. Richieste Prenotazione (`RichiestePage.tsx`)
**Funzionalità:**
- Visualizzazione elenco richieste di prenotazione inviate
- Gestione stati richieste (In Attesa, Approvata, Rifiutata)
- Filtri avanzati per ricerca e categorizzazione
- Export dati richieste

**Caratteristiche:**
- **Dashboard statistiche** con contatori per stato
- **Filtri multipli** (ricerca testuale, stato, PDTA)
- **Tabella dettagliata** con informazioni complete
- **Stati visivi** con colori e icone distintive
- **Export CSV** per analisi dati
- **Navigazione diretta** ai dettagli paziente

**Stati Richieste:**
- **In Attesa** - Richiesta inviata, in attesa di approvazione
- **Approvata** - Richiesta approvata dal sistema
- **Rifiutata** - Richiesta rifiutata con motivazione

#### 5. Dettagli Paziente Oncologo (`PazienteDetailOncologo.tsx`)
**Funzionalità:**
- Visualizzazione completa dettagli paziente per oncologi
- Accesso separato e indipendente dal Case Manager
- Informazioni cliniche e storico paziente

**Sezioni Disponibili:**
- **Informazioni Generali:** Dati personali e stato prenotazione
- **Storico Score Clinico:** Cronologia valutazioni score nel tempo
- **Storico Visite:** Cronologia visite effettuate
- **Esiti Esami:** Risultati esami diagnostici
- **Verbali Visite:** Documenti completi delle visite

**Caratteristiche:**
- Navbar dedicata oncologo (non Case Manager)
- Generazione paziente demo per CF casuali
- Export dati paziente
- **Associazione slot CUP** per prenotazioni esterne
- Design coerente con profilo oncologo

**Funzionalità CUP:**
- **Dialog dedicato** per inserimento dettagli prenotazione CUP
- **Campi completi** (data, ora, ambulatorio, medico, note)
- **Stati visivi** per slot prenotati vs da prenotare
- **Conferma associazione** con feedback utente

#### 5. Visite Ambulatori (`VisiteAmbulatoriPage.tsx`)
**Funzionalità:**
- Visualizzazione calendario ambulatori per data
- Gestione slot disponibili e prenotati
- **Blocco slot** per nuove visite/discussioni
- Export dati visite e riepilogo giornaliero

**Caratteristiche:**
- **Calendario interattivo** con 3 ambulatori (Cure Simultanee, Oncogeriatria, Osteoncologia)
- **Filtri per data e ambulatorio** per visualizzazione mirata
- **Blocco slot individuale** con form dedicato
- **Stati visivi** per slot (prenotato, libero, bloccato)
- **Export multipli** (CSV visite, TXT riepilogo)

**Funzionalità Blocco Slot:**
- **Pulsante "Blocca"** su ogni slot disponibile
- **Dialog completo** per inserimento dettagli
- **Campi obbligatori** (ambulatorio, ora, tipo, medico)
- **Campi opzionali** (paziente, CF, note)
- **Conferma blocco** con feedback dettagliato

#### 6. Profilo Case Manager (`CaseManagerPage.tsx`)
**Funzionalità:**
- Elenco pazienti ordinato per score
- Visualizzazione dettagli paziente tramite CF
- Gestione prenotazioni tramite CUP
- Calendario ambulatori
- Export dati completi

**Sezioni:**
- **Elenco Pazienti:** Tabella con cognome, nome, CF, PDTA, visita richiesta, medico mittente, score, stato prenotazione
- **Calendario Ambulatori:** Overview giornaliera per specialità
- **Ricerca Paziente:** Ricerca per codice fiscale

**Visualizzazione Paziente Completa:**
- **Informazioni Generali:** CF, PDTA, score attuale, comorbidità
- **Storico Score Clinico:** Cronologia score con parametri dettagliati
- **Storico Visite:** Cronologia visite con esiti e medici
- **Esiti Esami:** Lista esami completati e programmati con risultati
- **Verbali Visite:** Documenti completi delle visite effettuate
- **Gestione Prenotazioni:** Prenotazione CUP e blocco slot interni

**Export Dati:**
- Export elenco pazienti (CSV)
- Export riepilogo giornaliero (TXT)
- Export visite per data (CSV)

#### 2. Case Manager Home (`CaseManagerHome.tsx`)
**Funzionalità:**
- Home page dedicata per case manager
- Navigazione tramite card (stile oncologico v1)
- Tre sezioni principali: Lista Pazienti, Visite Ambulatori, Visualizza Paziente

**Card Disponibili:**
- **Lista Pazienti:** Accesso diretto alla gestione pazienti ordinati per score
- **Visite Ambulatori:** Calendario e coordinamento visite per ambulatorio
- **Visualizza Paziente:** Ricerca paziente specifico per codice fiscale

#### 3. Lista Pazienti (`PazientiListPage.tsx`)
**Funzionalità:**
- Elenco completo pazienti ordinato per score clinico
- Statistiche dashboard (totale, prenotati, da prenotare, score alto)
- Tabella dettagliata con tutte le informazioni paziente
- Export dati pazienti in CSV
- Navigazione diretta ai dettagli paziente

**Informazioni Visualizzate:**
- Cognome, Nome, CF, PDTA
- Visita richiesta, Medico mittente
- Score clinico con colori (alto=rosso, medio=giallo, basso=verde)
- Stato prenotazione (Sì/No)
- Azioni: Visualizza dettagli completi

#### 4. Visite Ambulatori (`VisiteAmbulatoriPage.tsx`)
**Funzionalità:**
- Calendario per data e ambulatorio specifico
- Gestione slot liberi e bloccati
- Filtri per data e ambulatorio
- Blocco slot interni per nuove prenotazioni
- Export riepilogo giornaliero e visite

**Ambulatori Supportati:**
- Cure Simultanee
- Oncogeriatria  
- Osteoncologia

**Gestione Slot:**
- Visualizzazione slot confermati, liberi e bloccati
- Possibilità di bloccare slot per prenotazioni interne
- Riepilogo giornaliero con statistiche

#### 5. Ricerca Paziente (`RicercaPazientePage.tsx`)
**Funzionalità:**
- Ricerca paziente tramite codice fiscale
- Generazione paziente demo per CF non trovati
- Visualizzazione anteprima informazioni paziente
- Navigazione ai dettagli completi

#### 6. Calendario (`CalendarioPage.tsx`)
**Funzionalità:**
- Visualizzazione calendario per data
- Filtri per ambulatorio
- Gestione slot liberi e bloccati
- Riepilogo giornaliero completo
- Export dati giornalieri multipli

**Export Disponibili:**
- Export riepilogo giornaliero ambulatori (TXT)
- Export elenco visite per data (CSV)
- Statistiche giornaliere (visite confermate, slot liberi, discussioni)

#### 7. Dettaglio Paziente (`PazienteDetailPage.tsx`)
**Funzionalità:**
- Pagina dedicata per visualizzazione completa paziente
- Navigazione diretta dalla lista pazienti
- Tutte le informazioni del paziente in formato pagina
- Export dati paziente specifico

**Sezioni Complete:**
- **Informazioni Generali:** Dati personali e stato prenotazione
- **Storico Score Clinico:** Cronologia completa con parametri
- **Storico Visite:** Cronologia visite con esiti
- **Esiti Esami:** Risultati esami diagnostici
- **Verbali Visite:** Documenti completi delle visite
- **Gestione Prenotazione:** Azioni per prenotazioni CUP e slot interni

## Ambulatori Supportati

1. **Cure Simultanee**
2. **Oncogeriatria**
3. **Osteoncologia**

## Navigazione

### Rotte Disponibili
- `/oncologico` - Home con selezione profilo
- `/oncologico/oncologo` - Profilo oncologo/radioterapista
- `/oncologico/oncologo/notifiche` - Notifiche oncologo/radioterapista
- `/oncologico/oncologo/richieste` - Richieste prenotazione oncologo
- `/oncologico/case-manager` - Home case manager con card
- `/oncologico/case-manager/pazienti` - Lista pazienti ordinata per score
- `/oncologico/case-manager/visite` - Visite ambulatori e calendario
- `/oncologico/case-manager/ricerca` - Ricerca paziente per CF
- `/oncologico/calendario` - Calendario ambulatori (legacy)
- `/oncologico/paziente/:cf` - Pagina dettaglio paziente (per codice fiscale)

### Navbar Separate per Profilo

#### Navbar Oncologo (`OncologoNavbar.tsx`)
- **Profilo:** Dr. Marco Rossi - Oncologo Radioterapista
- **Colore:** Blu (bg-blue-600)
- **Navigazione:**
  - Home
  - Richieste
  - Notifiche
- **Badge:** "Radioterapista"

#### Navbar Case Manager (`CaseManagerNavbar.tsx`)
- **Profilo:** Dr. Carlo Bianchi - Case Manager
- **Colore:** Verde (bg-green-600)
- **Navigazione:**
  - Home
  - Pazienti
  - Visite
  - Ricerca
- **Badge:** "Coordinatore"

## Differenze dalla Versione 1

### Versione 1 (Originale)
- Sistema unificato per tutto il personale IOV
- Pagina singola con dashboard e gestione pazienti
- Approccio generale senza distinzioni di ruolo

### Versione Attuale
- **Profili distinti:** Oncologo/Radioterapista vs Case Manager
- **Funzionalità specializzate:** Form prenotazione vs Gestione pazienti
- **Workflow specifici:** Ogni profilo ha strumenti dedicati
- **Separazione responsabilità:** Chiare distinzioni tra ruoli

## Tecnologie Utilizzate

- **React** con TypeScript
- **Tailwind CSS** per styling
- **shadcn/ui** per componenti UI
- **React Router** per navigazione
- **Lucide React** per icone

## Stile e Design

Mantiene la coerenza stilistica con gli altri moduli:
- Palette colori consistente
- Layout responsive
- Componenti UI standardizzati
- Navigazione intuitiva
- Feedback visivo appropriato

## Mock Data

Il sistema utilizza dati mock per la demo:
- Pazienti con score clinici
- Calendario ambulatori
- Notifiche e esiti visite
- Prenotazioni e slot

## Note per lo Sviluppo

- Tutti i componenti sono completamente funzionali come demo
- I dati sono mock e andranno sostituiti con API reali
- Il sistema è pronto per l'integrazione backend
- Mantiene la stessa struttura di routing dell'applicazione principale
