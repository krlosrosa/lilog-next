import { memo } from "react";
import { QRCodeSVG } from "qrcode.react";
import { ImpressaoMapaHeader } from "@/_modules/expedicao_/others/types/items";

interface HeaderSeparacaoProps {
  mapa: ImpressaoMapaHeader;
  tipo?: "CLIENTE" | "TRANSPORTE";
  exibirCliente?: "PRIMEIRO" | "TODOS" | "NENHUM";
  segregados?: string[];
  indice?: number;
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

export const HeaderSeparacaoMapa = memo(
  ({ mapa, tipo, exibirCliente, segregados, indice }: HeaderSeparacaoProps) => {
    const typeLabel =
      {
        picking: "PICKING",
        unidade: "UNIDADE",
        palete: "PALETE",
        fifo: "FIFO",
      }[mapa.tipo] ?? mapa.tipo.toUpperCase();

    const pesoTotal =
      (mapa.pesoCaixa || 0) +
      (mapa.pesoPalete || 0) +
      (mapa.pesoUnidade || 0);

    const idSeg = mapa.id.match(/\[(.*?)\]/)?.[1];
    const firstClient = `${mapa.nomeClientes[0]}(${mapa.codClientes[0]})`;

    const showCliente =
      tipo === "CLIENTE" ||
      (tipo === "TRANSPORTE" &&
        exibirCliente === "PRIMEIRO") ||
      (tipo === "TRANSPORTE" &&
        segregados?.includes(mapa.codClientes[0]));

    // Função para formatar números no padrão brasileiro
    const formatNumber = (value: number, decimals: number = 0) => {
      return new Intl.NumberFormat('pt-BR', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      }).format(value);
    };

    const resumo =
      {
        palete: [
          `${formatNumber(mapa.paletes || 0)} PLT`,
          `${formatNumber(pesoTotal, 3)}kg PESO TOTAL`,
        ],
        unidade: [
          `${formatNumber(mapa.unidades || 0)} UN`,
          `${formatNumber(pesoTotal, 3)}kg PESO TOTAL`,
        ],
        picking: [
          `${formatNumber(mapa.caixas || 0)} CXS`,
          `${formatNumber(mapa.paletes || 0)} PLT`,
          `${formatNumber(mapa.unidades || 0)} UN`,
          `${formatNumber(mapa.linhasVisitadas || 0)} LINHAS`,
          `${formatNumber(pesoTotal, 3)}kg PESO TOTAL`,
        ],
        fifo: [
          `${formatNumber(mapa.caixas || 0)} CXS`,
          `${formatNumber(mapa.paletes || 0)} PLT`,
          `${formatNumber(mapa.unidades || 0)} UN`,
          `${formatNumber(mapa.linhasVisitadas || 0)} LINHAS`,
          `${formatNumber(pesoTotal, 3)}kg PESO TOTAL`,
        ],
      }[mapa.tipo] ?? [];

    return (
      <div className="mb-0 w-full border border-slate-300 bg-white">
        {/* Header Superior */}
        <div className="flex items-center justify-between bg-gray-800 px-3 py-1.5 text-xl text-white print:bg-black">
          <h1 className="font-bold tracking-wide">
            MAPA DE SEPARAÇÃO - {mapa.transportId}
            {idSeg && ` [${idSeg}]`} | {mapa.segmento}
          </h1>
          <h1 className="font-bold tracking-wide">{typeLabel}</h1>
        </div>

        {/* Corpo */}
        <div className="p-3">
          <div className="grid grid-cols-8 gap-2">
            <div className="col-span-7 space-y-2">
              {/* Linha 1 */}
              <div className="grid grid-cols-4 gap-x-2">
                <InfoItem label="PLACA" value={mapa.placa} />
                <InfoItem
                  label="TRANSPORTADORA"
                  value={mapa.transportadora}
                  className="col-span-2"
                />
                <InfoItem label="SEQ" value={mapa.sequencia} />
              </div>

              {/* Linha 2 */}
              <div className="grid grid-cols-4 gap-x-4">
                <InfoItem label="TRANSPORTE" value={mapa.transportId} />
                <InfoItem label="EMPRESA" value={mapa.empresa} />
                <InfoItem label="ROTA" value={mapa.rota} />
              </div>

              {/* Cliente (condicional) */}
              {showCliente && (
                <div className="grid grid-cols-4 gap-x-4">
                  <InfoItem label="CLIENTE" value={mapa.codClientes[0]} />
                  <InfoItem
                    label="NOME"
                    className="col-span-2"
                    value={mapa.nomeClientes[0]}
                  />
                  <InfoItem label="LOCAL" value={mapa.local} />
                </div>
              )}

              <div className="flex justify-between px-2 text-[10px]">
                <p>idPalete: {mapa.paleteId}</p>
                <p>{mapa.id}</p>
              </div>
            </div>

            {/* QR CODE */}
              <div className="col-span-1 flex items-center justify-center">
                <QRCodeSVG value={mapa.paleteId} size={100} />
              </div>
          </div>

          {/* Lista de Clientes */}
          {mapa.nomeClientes.length > 0 &&
            tipo === "TRANSPORTE" &&
            exibirCliente !== "NENHUM" && (
              <div className="mt-2 border-t pt-2 text-[11px] space-y-1">
                {exibirCliente === "TODOS" && (
                  <div>
                    <span className="font-semibold text-muted-foreground">
                      CLIENTES:
                    </span>
                    <span className="ml-2 text-[9px]">
                      {mapa.nomeClientes
                        .map((n, i) => `${n}(${mapa.codClientes[i]})`)
                        .join(" | ")}
                    </span>
                  </div>
                )}

                {exibirCliente === "PRIMEIRO" && (
                  <div>
                    <span className="font-semibold text-muted-foreground">
                      CLIENTES:
                    </span>
                    <span className="ml-2 text-[9px]">{firstClient}</span>
                  </div>
                )}
              </div>
            )}

          {/* INFO I */}
          {mapa.infoAdicionaisI && (
            <div className="mt-2 border-t pt-2 text-[11px]">
              <span className="font-semibold text-muted-foreground">INFO:</span>
              <span className="ml-2">{mapa.infoAdicionaisI}</span>
            </div>
          )}

          {/* Resumo Quantitativo */}
          <div className="mt-3 flex flex-wrap justify-center border-t pt-3 text-sm font-semibold">
            {resumo.map((item, i) => (
              <span key={i}>
                {i > 0 && (
                  <span className="mx-2 text-muted-foreground">|</span>
                )}
                {item}
              </span>
            ))}
          </div>

          {/* INFO II */}
          {mapa.infoAdicionaisII && (
            <div className="mt-2 border-t pt-2 text-xs">
              <span className="font-semibold text-muted-foreground">
                INFO II:
              </span>
              <span className="ml-2">{mapa.infoAdicionaisII}</span>
            </div>
          )}
        </div>
      </div>
    );
  }
);
