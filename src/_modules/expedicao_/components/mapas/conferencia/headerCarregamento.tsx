import { QRCodeSVG } from 'qrcode.react';
import { memo } from 'react';
import { ImpressaoMapaHeader } from '@/_modules/expedicao_/others/types/items';

interface HeaderCarregamentoProps {
  mapa: ImpressaoMapaHeader;
}

const InfoItem = ({
  label,
  value,
  className,
}: {
  label: string;
  value: React.ReactNode;
  className?: string;
}) => (
  <div className={className}>
    <p className="text-muted-foreground text-xs">{label}</p>
    <p className="text-xs font-semibold">{value}</p>
  </div>
);

export const HeaderCarregamento = memo(({ mapa }: HeaderCarregamentoProps) => {
  const pesoTotal =
    (mapa.pesoCaixa || 0) + (mapa.pesoPalete || 0) + (mapa.pesoUnidade || 0);

  // Função para formatar números no padrão brasileiro
  const formatNumber = (value: number, decimals: number = 0) => {
    return new Intl.NumberFormat('pt-BR', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }).format(value);
  };

  return (
    <div className="mb-0 w-full border border-slate-300 bg-white">
      {/* Cabeçalho Principal */}
      <div className="flex items-center justify-between bg-slate-50 px-3 py-1.5">
        <h1 className="text-xl font-bold tracking-wide text-black">
          MAPA DE CONFERENCIA
        </h1>
        <h1 className="text-xl font-bold tracking-wide text-black">
          {mapa.segmento}
        </h1>
      </div>

      {/* Corpo do Cabeçalho */}
      <div className="p-3">
        <div className="grid grid-cols-8 gap-2">
          {/* QR Code à esquerda */}
            <div className="col-span-1 flex flex-col items-center justify-center p-2 text-center">
              <QRCodeSVG value={mapa.paleteId} size={100} />
            </div>
          {/* Informações Principais */}
          <div className="col-span-7 ml-4 space-y-2">
            {/* Linha única com Placa, Transportadora, Transporte, Rota */}
            <div className="grid grid-cols-4 gap-x-2">
              <InfoItem label="PLACA" value={mapa.placa} />
              <InfoItem label="TRANSPORTADORA" value={mapa.transportadora} />
              <InfoItem label="TRANSPORTE" value={mapa.transportId} />
              <InfoItem label="ROTA" value={mapa.rota} />
            </div>

            {/* Resumo Quantitativo (onde antes ficava transporte/rota) */}
            <div className="flex flex-wrap justify-center border-t pt-2 text-center text-sm font-semibold">
              {(() => {
                const items = [];
                if (mapa.tipo === 'palete') {
                  items.push(
                    `${formatNumber(mapa.paletes || 0)} PLT`,
                    `${formatNumber(pesoTotal, 3)}kg PESO TOTAL`,
                  );
                } else if (mapa.tipo === 'unidade') {
                  items.push(
                    `${formatNumber(mapa.unidades || 0)} UN`,
                    `${formatNumber(pesoTotal, 3)}kg PESO TOTAL`,
                  );
                } else {
                  items.push(
                    `${formatNumber(mapa.caixas || 0)} CXS`,
                    `${formatNumber(mapa.unidades || 0)} UN`,
                    `${formatNumber(pesoTotal, 3)}kg PESO TOTAL`,
                  );
                }
                return items.map((item, index) => (
                  <span key={index}>
                    {index > 0 && (
                      <span className="text-muted-foreground mx-2">|</span>
                    )}
                    {item}
                  </span>
                ));
              })()}
            </div>

            {/* IDs secundários */}
            <div className="flex justify-between px-2">
              <p className="mt-1 text-[10px] tracking-wider">
                idPalete: {mapa.paleteId}
              </p>
              <p className="mt-1 text-[10px] tracking-wider">{mapa.id}</p>
            </div>
          </div>
        </div>

        {/* Informações Adicionais II */}
        {mapa.infoAdicionaisII && (
          <div className="mt-2 border-t pt-2 text-xs">
            <div>
              <span className="text-muted-foreground font-semibold">
                INFO II:
              </span>
              <span className="ml-2">{mapa.infoAdicionaisII}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
});
