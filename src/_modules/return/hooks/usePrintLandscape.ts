import React from 'react';
import { User, useUser } from '@/_shared/providers/UserContext';
import { useReactToPrint } from 'react-to-print';

type Props = {
  printRef: React.RefObject<HTMLDivElement | null>;
  handleBeforePrint?: () => Promise<void>;
};

export function usePrintLandscape({ printRef, handleBeforePrint }: Props) {
  const { user } = useUser();
  return useReactToPrint({
    contentRef: printRef,
    onBeforePrint: handleBeforePrint,
    pageStyle: `
    @page {
     size: A4 landscape;
     margin-top: 10mm;
     margin-bottom: 20mm;
     margin-left: 5mm;
     margin-right: 5mm;

     /* Força o conteúdo das áreas de cabeçalho a ser vazio, removendo o padrão do navegador */
     @top-center { content: ""; }
     @top-left { 
       content: "";
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
     * {
       -webkit-print-color-adjust: exact;
       color-adjust: exact;
     }
     body {
       margin: 0 !important;
       padding: 0 !important;
     }
     /* Força o checklist a caber em uma única A4 paisagem e ocupar toda a largura (287x180mm) */
     .print-fit-a4-landscape {
       position: relative !important;
       width: 287mm !important;
       max-width: 287mm !important;
       height: 180mm !important;
       overflow: hidden !important;
       margin: 0 !important;
       padding: 0 !important;
       box-sizing: border-box !important;
     }
     .print-fit-a4-landscape-inner {
       position: absolute !important;
       top: 0 !important;
       left: 0 !important;
       width: 297mm !important;
       height: 210mm !important;
       transform: scale(0.966, 0.857) !important; /* scaleX=287/297 (largura total), scaleY=180/210 (altura) */
       transform-origin: top left !important;
       box-sizing: border-box !important;
     }
     [data-slot="table-container"] {
       overflow: hidden !important;
       max-width: 100% !important;
     }
     .no-print {
       display: none !important;
     }
     .print-page-break {
       page-break-before: always !important;
     }
     [data-slot="tabs-content"] {
       margin-top: 0 !important;
       padding-top: 0 !important;
     }
     [data-slot="tabs"] {
       margin: 0 !important;
       padding: 0 !important;
     }
   }
 `,
  });
}
