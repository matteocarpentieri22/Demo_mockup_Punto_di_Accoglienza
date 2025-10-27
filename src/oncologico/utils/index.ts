// ============================================================================
// Utility Functions per il Modulo Oncologico
// ============================================================================

/**
 * Genera dati mock per un paziente demo
 */
export const generateRandomPatient = () => {
  const nomi = ["Mario", "Luca", "Giulia", "Anna", "Francesca", "Paolo", "Sara", "Alessandro", "Chiara", "Davide"];
  const cognomi = ["Rossi", "Bianchi", "Verdi", "Esposito", "Ferrari", "Russo", "Gallo", "Costa", "Fontana", "Greco"];
  
  const randomFrom = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)];
  
  const randomDate = () => {
    const start = new Date(1940, 0, 1).getTime();
    const end = new Date(2010, 11, 31).getTime();
    const d = new Date(start + Math.random() * (end - start));
    const dd = String(d.getDate()).padStart(2, '0');
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const yyyy = d.getFullYear();
    return `${dd}/${mm}/${yyyy}`;
  };
  
  return {
    nome: randomFrom(nomi),
    cognome: randomFrom(cognomi),
    dataNascita: randomDate()
  };
};

/**
 * Formatta una data in formato italiano
 */
export const formatDate = (date: Date | string): string => {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('it-IT', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
};

/**
 * Formatta data e ora in formato italiano
 */
export const formatDateTime = (date: Date | string): string => {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleString('it-IT', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

/**
 * Calcola lo score clinico totale
 */
export const calculateScore = (tosse: number, dolore: number, comorbidita: number): number => {
  return tosse + dolore + comorbidita;
};

/**
 * Valida un codice fiscale italiano (formato base)
 */
export const validateCF = (cf: string): boolean => {
  return cf.length === 16 && /^[A-Z0-9]{16}$/i.test(cf);
};

/**
 * Estrae l'età da una data di nascita
 */
export const getAge = (dataNascita: string): number => {
  const nascita = new Date(dataNascita.split('/').reverse().join('-'));
  const oggi = new Date();
  let anni = oggi.getFullYear() - nascita.getFullYear();
  const mese = oggi.getMonth() - nascita.getMonth();
  
  if (mese < 0 || (mese === 0 && oggi.getDate() < nascita.getDate())) {
    anni--;
  }
  
  return anni;
};
