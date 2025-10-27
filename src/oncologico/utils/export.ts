// ============================================================================
// Utility per Export Excel e PDF
// ============================================================================

import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

// Interfaccia per i dati di export
interface VisitaData {
  ora: string;
  paziente: string;
  cf?: string;
  [key: string]: any; // Per campi dinamici
}

// ============================================================================
// Export Excel
// ============================================================================

export const exportToExcel = (
  data: VisitaData[],
  columns: { header: string; key: string }[],
  filename: string,
  title?: string
) => {
  // Crea un nuovo workbook
  const wb = XLSX.utils.book_new();

  // Converti i dati in formato worksheet
  const wsData = [
    // Header
    title ? [title] : [],
    [],
    // Colonne
    columns.map(col => col.header),
    // Dati
    ...data.map(row => columns.map(col => row[col.key] || ''))
  ].filter(row => row.length > 0);

  const ws = XLSX.utils.aoa_to_sheet(wsData);

  // Applica stili e larghezza colonne
  const colWidths = columns.map(col => ({
    wch: Math.max(col.header.length, 15)
  }));
  ws['!cols'] = colWidths;

  // Aggiungi il titolo se presente
  if (title) {
    XLSX.utils.sheet_add_aoa(ws, [[title]], { origin: 'A1' });
    
    // Unisci celle per il titolo
    if (!ws['!merges']) ws['!merges'] = [];
    ws['!merges'].push({
      s: { c: 0, r: 0 },
      e: { c: columns.length - 1, r: 0 }
    });
  }

  // Aggiungi il worksheet al workbook
  XLSX.utils.book_append_sheet(wb, ws, 'Visite');

  // Salva il file
  XLSX.writeFile(wb, `${filename}.xlsx`);
};

// ============================================================================
// Export PDF
// ============================================================================

export const exportToPDF = (
  data: VisitaData[],
  columns: { header: string; key: string; width?: number }[],
  filename: string,
  title?: string,
  subtitle?: string
) => {
  const doc = new jsPDF();
  
  // Colori
  const primaryColor = [59, 130, 246]; // blue-500
  const secondaryColor = [31, 41, 55]; // gray-800
  
  // Titolo
  if (title) {
    doc.setFontSize(18);
    doc.setTextColor(...secondaryColor);
    doc.setFont('helvetica', 'bold');
    doc.text(title, 14, 15);
  }

  // Sottotitolo
  if (subtitle) {
    doc.setFontSize(11);
    doc.setTextColor(100, 100, 100);
    doc.setFont('helvetica', 'normal');
    doc.text(subtitle, 14, 22);
  }

  // Offset Y
  let startY = subtitle ? 28 : 20;

  // Prepara i dati per la tabella
  const tableData = data.map(row => columns.map(col => {
    const value = row[col.key] || '';
    return value;
  }));

  // Calcola la larghezza delle colonne
  const pageWidth = doc.internal.pageSize.width;
  const marginLeft = 14;
  const marginRight = 14;
  const contentWidth = pageWidth - marginLeft - marginRight;
  
  // Larghezza colonne proporzionali
  const totalWidth = columns.reduce((sum, col) => sum + (col.width || 100), 0);
  const colWidths = columns.map(col => ((col.width || 100) / totalWidth) * contentWidth);

  // Crea la tabella
  autoTable(doc, {
    head: [columns.map(col => col.header)],
    body: tableData,
    startY: startY,
    margin: { left: marginLeft, right: marginRight },
    styles: {
      fontSize: 9,
      cellPadding: 3,
      font: 'helvetica',
    },
    headStyles: {
      fillColor: primaryColor,
      textColor: [255, 255, 255],
      fontStyle: 'bold',
      fontSize: 10,
      halign: 'left',
    },
    columnStyles: columns.reduce((acc, col, idx) => {
      acc[idx] = { cellWidth: colWidths[idx] };
      return acc;
    }, {} as Record<number, any>),
    alternateRowStyles: {
      fillColor: [249, 250, 251], // gray-50
    },
    didParseCell: function (hookData) {
      // Alterna colori per righe
      if (hookData.section === 'body' && hookData.row.index % 2 === 0) {
        hookData.cell.styles.fillColor = [255, 255, 255];
      }
    },
    theme: 'striped',
    tableLineColor: [229, 231, 235], // gray-200
    tableLineWidth: 0.2,
  });

  // Footer
  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(100, 100, 100);
    doc.text(
      `Pagina ${i} di ${pageCount} - ${filename}`,
      pageWidth / 2,
      doc.internal.pageSize.height - 10,
      { align: 'center' }
    );
  }

  // Salva il file
  doc.save(`${filename}.pdf`);
};

// ============================================================================
// Formato data per il nome del file
// ============================================================================

export const formatDateForFilename = (date: string | Date): string => {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toISOString().split('T')[0];
};

