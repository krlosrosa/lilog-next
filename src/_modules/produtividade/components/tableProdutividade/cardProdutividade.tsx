import { ProdutividadeGetDataDto } from '@/_services/api/model';
import { Card, CardContent } from '@/_shared/_components/ui/card';
import { formatName } from '../../utils/formatName';
import { formatDate } from '../../utils/formatDate';
import { Badge } from '@/_shared/_components/ui/badge';
import { formatTime } from '../../utils/formatTime';
import { getStatusColor } from '../../utils/getSatusColor';
import CardStatusDemanda from '../cardStatusDemanda';

type CardProdutividadeProps = {
  produtividade: ProdutividadeGetDataDto;
};

export function CardProdutividade({ produtividade }: CardProdutividadeProps) {
  return (
    <CardStatusDemanda demandaId={produtividade.idDemanda}>

      <Card className="mb-2 p-1 transition-shadow duration-200 hover:shadow-sm">
        <CardContent className="px-3 py-1">
          <div className="flex items-center justify-between">
            {/* ID e Info Principal */}
            <div className="flex min-w-0 flex-1 items-center gap-4">
              <div className="flex flex-col">
                <span className="font-mono text-sm font-semibold text-gray-900">
                  #{produtividade.idDemanda}
                </span>
                <span className="text-xs text-gray-500">
                  {produtividade.centerId}
                </span>
              </div>

              <div className="flex min-w-0 flex-col">
                <span className="truncate font-medium text-gray-900">
                  {formatName(produtividade.nomeFuncionario)}
                </span>
                <span className="text-xs text-gray-500">
                  {formatDate(produtividade.inicio)}
                </span>
              </div>

              <div className="flex flex-col">
                <span className="text-sm font-medium text-gray-900">
                  {produtividade.empresa}
                </span>
                <span className="text-xs text-gray-500">
                  {produtividade.processo}
                </span>
              </div>
            </div>

            {/* Métricas Principais */}
            <div className="flex items-center gap-6">
              {/* Caixas */}
              <div className="text-right">
                <div className="text-sm font-semibold text-gray-900">
                  {produtividade.paletes.toLocaleString()}
                </div>
                <div className="text-xs text-gray-500">Paletes</div>
              </div>
              {/* Caixas */}
              <div className="text-right">
                <div className="text-sm font-semibold text-gray-900">
                  {produtividade.caixas.toLocaleString()}
                </div>
                <div className="text-xs text-gray-500">Caixas</div>
              </div>

              {/* Unidades */}
              <div className="text-right">
                <div className="text-sm font-semibold text-gray-900">
                  {produtividade.unidades.toLocaleString()}
                </div>
                <div className="text-xs text-gray-500">Unid.</div>
              </div>

              {/* Visitas */}
              <div className="text-right">
                <div className="text-sm font-semibold text-gray-900">
                  {produtividade.visitas}
                </div>
                <div className="text-xs text-gray-500">Vis.</div>
              </div>

              {/* Produtividade */}
              <div className="text-right">
                <div className="text-sm font-semibold text-green-700">
                  {produtividade.produtividade.toFixed(1)}/h
                </div>
                <div className="text-xs text-gray-500">Produt.</div>
              </div>

              {/* Status */}
              <div className="flex flex-col items-end gap-1">
                <Badge
                  className={`${getStatusColor(produtividade.statusDemanda)} px-2 py-1 text-xs`}
                >
                  {produtividade.statusDemanda}
                </Badge>
                <span className="text-xs text-gray-500">
                  {produtividade.turno}
                </span>
              </div>
            </div>
          </div>

          {/* Linha inferior com tempos */}
          <div className="mt-2 flex items-center justify-between border-t border-gray-100 pt-2">
            <div className="flex items-center gap-4 text-xs text-gray-600">
              <span className="text-gray-600 dark:text-gray-400">
                {formatDate(produtividade.inicio)}
                {produtividade.fim &&
                  formatDate(produtividade.fim) &&
                  ` → ${formatDate(produtividade.fim)}`}
              </span>
              <span>Total: {formatTime(produtividade.tempoTotal)}</span>
              <span>Trabalhado: {formatTime(produtividade.tempoTrabalhado)}</span>
              <span>
                Pausas: {formatTime(produtividade.tempoPausas)} (
                {produtividade.pausas}x)
              </span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 text-xs text-gray-500">
                <span>Segmento: {produtividade.segmento}</span>
                <span>ID: {produtividade.funcionarioId}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </CardStatusDemanda>
  );
}
