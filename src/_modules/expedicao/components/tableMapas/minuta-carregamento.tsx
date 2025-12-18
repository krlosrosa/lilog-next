import type {
  ImpressaoMapaItem,
} from '@/_modules/expedicao_/others/types/items';

interface MinutaCarregamentoProps {
  itens: ImpressaoMapaItem[];
}

export function MinutaCarregamento({ itens }: MinutaCarregamentoProps) {
  if (!itens || itens.length === 0) {
    return (
      <div className="w-full border border-gray-200 bg-gray-50 p-8 text-center print:border-black print:bg-white">
        <p className="text-gray-500 print:text-black">
          Nenhum item encontrado para separação
        </p>
      </div>
    );
  }

  return (
    <div className="w-full bg-white print:shadow-none">
      <div>
        {/* Seção de Informações Gerais com Destaque na Doca */}
        <div className="grid grid-cols-3 gap-x-6 gap-y-4 border border-gray-300 p-4 print:border-black">
          {/* Coluna 1 */}
          <div className="space-y-4">
            <div className="flex items-end">
              <span className="mr-2 text-sm font-semibold text-gray-700 print:text-black">
                Lacre 1:
              </span>
              <div className="grow border-b border-gray-400 print:border-black"></div>
            </div>
            <div className="flex items-end">
              <span className="mr-2 text-sm font-semibold text-gray-700 print:text-black">
                Início:
              </span>
              <div className="grow border-b border-gray-400 print:border-black"></div>
            </div>
          </div>

          {/* Coluna 2 */}
          <div className="space-y-4">
            <div className="flex items-end">
              <span className="mr-2 text-sm font-semibold text-gray-700 print:text-black">
                Temperatura:
              </span>
              <div className="grow border-b border-gray-400 print:border-black"></div>
            </div>
            <div className="flex items-end">
              <span className="mr-2 text-sm font-semibold text-gray-700 print:text-black">
                Fim:
              </span>
              <div className="grow border-b border-gray-400 print:border-black"></div>
            </div>
          </div>

          {/* Coluna 3 - Doca em Destaque */}
          <div className="flex flex-col items-center justify-center rounded-md border-2 border-gray-400 bg-gray-100 p-2 print:border-black print:bg-gray-200">
            <label className="pb-12 text-sm font-bold text-gray-800 print:text-black">
              DOCA
            </label>
          </div>
        </div>
      </div>
      {/* Seção de Checklists em duas colunas - CORRIGIDO */}
      <div className="grid grid-cols-2 gap-x-1.5 py-2">
        {/* Coluna do Check List do Veículo */}
        <div className="flex flex-col space-y-2 border border-gray-300 p-4 print:border-black">
          <h2 className="mb-2 border-b pb-1 text-base font-bold text-gray-800 print:border-black print:text-black">
            Checklist do Veículo
          </h2>
          <div className="space-y-3 text-sm">
            {/* Cada item agora é uma div com flexbox para alinhamento */}
            <div className="flex items-center justify-between">
              <span>Baú com odor?</span>
              <span className="whitespace-nowrap">
                <span className="font-mono">( &nbsp; )</span> Sim{' '}
                <span className="font-mono">( &nbsp; )</span> Não
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span>Porta/Divisória em boas condições?</span>
              <span className="whitespace-nowrap">
                <span className="font-mono">( &nbsp; )</span> Sim{' '}
                <span className="font-mono">( &nbsp; )</span> Não
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span>Condições externas do veículo?</span>
              <span className="whitespace-nowrap">
                <span className="font-mono">( &nbsp; )</span> Sim{' '}
                <span className="font-mono">( &nbsp; )</span> Não
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span>Condições internas do veículo?</span>
              <span className="whitespace-nowrap">
                <span className="font-mono">( &nbsp; )</span> Sim{' '}
                <span className="font-mono">( &nbsp; )</span> Não
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span>Assoalho em boas condições e sem furos?</span>
              <span className="whitespace-nowrap">
                <span className="font-mono">( &nbsp; )</span> Sim{' '}
                <span className="font-mono">( &nbsp; )</span> Não
              </span>
            </div>
            <div className="flex items-center pt-2">
              <span className="mr-2 font-semibold">OBS:</span>
              <div className="mt-2 grow border-b border-dotted border-gray-400 print:border-black"></div>
            </div>
          </div>
        </div>

        {/* Coluna de Informações do Palete */}
        <div className="flex flex-col space-y-2 border border-gray-300 p-4 print:border-black">
          <h2 className="mb-2 border-b pb-1 text-base font-bold text-gray-800 print:border-black print:text-black">
            Informações do Palete
          </h2>
          <div className="space-y-3 text-sm">
            <div className="flex items-end">
              <span className="mr-2">Quantidade troca de palete:</span>
              <div className="w-20 border-b-2 border-dotted border-gray-400 text-center print:border-black"></div>
            </div>
            <div className="flex items-center justify-between">
              <span>Termo Palete?</span>
              <span className="whitespace-nowrap">
                <span className="font-mono">( &nbsp; )</span> Sim{' '}
                <span className="font-mono">( &nbsp; )</span> Não
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span>Carga Estivada?</span>
              <span className="whitespace-nowrap">
                <span className="font-mono">( &nbsp; )</span> Sim{' '}
                <span className="font-mono">( &nbsp; )</span> Não
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span>Possui Carrinho?</span>
              <span className="whitespace-nowrap">
                <span className="font-mono">( &nbsp; )</span> Sim{' '}
                <span className="font-mono">( &nbsp; )</span> Não
              </span>
            </div>
            <div className="flex items-center pt-2">
              <span className="mr-2 font-semibold">OBS:</span>
              <div className="mt-2 grow border-b border-dotted border-gray-400 print:border-black"></div>
            </div>
          </div>
        </div>
      </div>
      <div className="overflow-hidden border border-gray-300 print:border-black">
        <table className="w-full text-xs print:text-xs">
          <thead>
            <tr className="bg-gray-100 print:bg-gray-200">
              <th className="border-r border-b border-gray-300 px-2 py-2 text-left font-semibold text-gray-700 print:border-black print:text-black">
                Empresa
              </th>
              <th className="border-r border-b border-gray-300 px-2 py-2 text-left font-semibold text-gray-700 print:border-black print:text-black">
                Seguimento
              </th>
              <th className="border-r border-b border-gray-300 px-2 py-2 text-center font-semibold text-gray-700 print:border-black print:text-black">
                Qtd. Caixas
              </th>
              <th className="border-r border-b border-gray-300 px-2 py-2 text-center font-semibold text-gray-700 print:border-black print:text-black">
                Unidades
              </th>
              <th className="border-r border-b border-gray-300 px-2 py-2 text-center font-semibold text-gray-700 print:border-black print:text-black">
                Qtd. Paletes
              </th>
            </tr>
          </thead>
          <tbody>
            {itens.map((item, index) => (
              <tr
                key={`${item.segmento}-${item.empresa}-${index}`}
                className="hover:bg-gray-50 print:hover:bg-transparent"
              >
                <td className="border-r border-b border-gray-300 px-2 py-2 text-left print:border-black">
                  {item.empresa}
                </td>
                <td className="border-r border-b border-gray-300 px-2 py-2 text-left print:border-black">
                  {item.segmento}
                </td>
                <td className="border-r border-b border-gray-300 px-2 py-2 text-center print:border-black">
                  {item.quantidadeCaixas}
                </td>
                <td className="border-r border-b border-gray-300 px-2 py-2 text-center print:border-black">
                  {item.quantidade}
                </td>
                <td className="border-r border-b border-gray-300 px-2 py-2 text-center print:border-black">
                  {item.quantidadePaletes}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Campos para preenchimento manual */}
      <div className="mt-6 space-y-4 border-t border-gray-300 pt-4 print:border-black">
        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-700 print:text-black">
            Assinatura:
          </label>
          <div className="h-12 border-b-2 border-dashed border-gray-400 print:border-black"></div>
        </div>
      </div>
    </div>
  );
}
