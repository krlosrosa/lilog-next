'use client';
import { Button } from "@/_shared/_components/ui/button";
import { useState } from "react";

export default function Ressuprir() {

  const [grupos, setGrupos] = useState<string[][]>([]);
  
/* ---------- Exemplo usando suas datas ---------- */
const datas = [
  "10/11/2025",
  "20/11/2025",
  "12/11/2025",
  "28/11/2025",
  "21/11/2025"
];
const shelf = 30; // dias
const pct = 0.10; // 10% -> 3 dias


function handleGroupByShelfWindow() {
  const grupos = groupByShelfWindow(datas, shelf, pct);
  setGrupos(grupos);
}


  return (
    <div>
      <h1>Ressuprir</h1>
      <Button onClick={handleGroupByShelfWindow}>Agrupar</Button>
      <pre>{JSON.stringify(grupos, null, 2)}</pre>
    </div>
  )
}

// Agrupa datas em clusters usando "anchor window" (diferença da primeira data do grupo).
// Input: dates no formato "DD/MM/YYYY" ou objetos Date
// shelfDays: shelf life do produto em dias
// pct: porcentagem (ex: 0.1 para 10%)
//
// Retorna: Array de arrays com as datas agrupadas (strings "DD/MM/YYYY").

function parseDate(d: string | Date): Date {
  if (d instanceof Date) return new Date(d.getFullYear(), d.getMonth(), d.getDate());
  // assume formato "DD/MM/YYYY"
  const [dd, mm, yyyy] = d.split('/').map(s => parseInt(s, 10));
  return new Date(yyyy, mm - 1, dd);
}

function daysBetween(a: Date, b: Date): number {
  const msPerDay = 1000 * 60 * 60 * 24;
  // truncar para evitar problemas de fuso horário
  const aMid = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
  const bMid = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
  return Math.round((bMid - aMid) / msPerDay);
}

function formatDate(d: Date): string {
  const dd = String(d.getDate()).padStart(2, '0');
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const yyyy = d.getFullYear();
  return `${dd}/${mm}/${yyyy}`;
}

function groupByShelfWindow(
  inputDates: (string | Date)[],
  shelfDays: number,
  pct: number
): string[][] {
  if (inputDates.length === 0) return [];
  const windowDays = shelfDays * pct;

  // parse + ordenar
  const dates = inputDates.map(parseDate).sort((a, b) => a.getTime() - b.getTime());

  const groups: string[][] = [];
  let currentGroup: Date[] = [];
  let anchor: Date | null = null;

  for (const d of dates) {
    if (!anchor) {
      anchor = d;
      currentGroup = [d];
      continue;
    }

    const diffFromAnchor = daysBetween(anchor, d);
    if (diffFromAnchor <= windowDays) {
      currentGroup.push(d);
    } else {
      // fechar grupo atual e começar um novo
      groups.push(currentGroup.map(formatDate));
      anchor = d;
      currentGroup = [d];
    }
  }

  // push último grupo
  if (currentGroup.length) groups.push(currentGroup.map(formatDate));
  return groups;
}
