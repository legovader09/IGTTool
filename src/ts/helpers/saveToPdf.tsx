import { jsPDF } from 'jspdf';

export const saveToPdf = (element: string) => {
  const el = document.getElementById(element);
  if (!el) return;
  // eslint-disable-next-line new-cap
  const pdf = new jsPDF('p', 'pt', 'A4');
  pdf.text('IGT Results', 18, 32);
  pdf.html(el, {
    callback: (doc) => doc.save('results.pdf'),
    margin: [32, 16, 16, 16],
    filename: 'results.pdf',
    html2canvas: { scale: 0.6125 },
  });
};
