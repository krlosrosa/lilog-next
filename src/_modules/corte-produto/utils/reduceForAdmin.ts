import { AugmentedZodDto } from "@/_services/api/model";

export function reduceForAdmin(array: AugmentedZodDto[]): AugmentedZodDto[] {
  const groupedMap = new Map<string, AugmentedZodDto>();

  array.forEach((item) => {
    const key = `${item.sku}-${item.lote}-${item.remessa}`;
    
    if (groupedMap.has(key)) {
      const existing = groupedMap.get(key)!;
      
      // Soma os valores numéricos
      existing.caixas = (existing.caixas || 0) + (item.caixas || 0);
      existing.quantidade = (existing.quantidade || 0) + (item.quantidade || 0);
    } else {
      // Cria uma cópia do item para não modificar o original
      groupedMap.set(key, {
        ...item,
        caixas: item.caixas || 0,
        quantidade: item.quantidade || 0,
      });
    }
  });

  return Array.from(groupedMap.values());
}