/**
 * Interpreta data no padrão DD/MM/YYYY, HH:mm e retorna em ISO UTC.
 * Evita que 12/02/2026 seja lido como 2 de dezembro (MM/DD) em vez de 12 de fevereiro (DD/MM).
 */
export function formatarDataUTC(date: string): string {
  if (!date?.trim()) return date ?? '';

  // Já está em ISO (tem Z ou formato YYYY-MM-DD), devolve como está
  if (date.endsWith('Z') || /^\d{4}-\d{2}-\d{2}/.test(date)) {
    return date.endsWith('Z') ? date : `${date}Z`;
  }

  // Padrão DD/MM/YYYY, HH:mm (ex: "12/02/2026, 17:08")
  const match = date.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4}),\s*(\d{1,2}):(\d{2})/);
  if (match) {
    const [, day, month, year, hour, minute] = match;
    const d = day.padStart(2, '0');
    const m = month.padStart(2, '0');
    const h = hour.padStart(2, '0');
    // ISO: YYYY-MM-DDTHH:mm:ss.000Z → dia 12, mês 02
    return `${year}-${m}-${d}T${h}:${minute}:00.000Z`;
  }

  return date;
}