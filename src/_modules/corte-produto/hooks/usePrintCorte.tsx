import { useUser } from "@/_shared/providers/UserContext";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";

export default function usePrintCorte() {
  const { user } = useUser();

  const printRef = useRef<HTMLDivElement>(null);

    const print = useReactToPrint({
      contentRef: printRef,
      pageStyle: `
      @page {
       size: A4;
       margin-top: 10mm;
       margin-bottom: 20mm;
       margin-left: 5mm;
       margin-right: 5mm;
  
       /* Força o conteúdo das áreas de cabeçalho a ser vazio, removendo o padrão do navegador */
       @top-center { content: ""; }
       @top-left { 
         font-size: 8pt;
         font-family: Arial, sans-serif;
         color: #71717a; /* zinc-500 */
       }
       @top-right { content: ""; }
  
       @bottom-right {
         content: "Página " counter(page) " de " counter(pages);
         font-size: 8pt;
         font-family: Arial, sans-serif;
         color: #71717a; /* zinc-500 */
       }
       @bottom-left {
         content: "Impresso em: ${new Date().toLocaleString('pt-BR')} - impressão por ${user?.name || ''} ";
         font-size: 8pt;
         font-family: Arial, sans-serif;
         color: #71717a; /* zinc-500 */
       }
     }
  
     @media print {
       body {
         -webkit-print-color-adjust: exact;
         color-adjust: exact;
       }
       .no-print {
         display: none !important;
       }
       .print-page-break {
         page-break-before: always !important;
       }
     }
   `,
    });

  return {
    printRef,
    print,
  }
}