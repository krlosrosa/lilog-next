import { Definicoes } from '../components/definicoes';
import { Segregar } from '../components/segregar';

export function ConfiguracoesImpressao({
  setValueTab,
}: {
  setValueTab: (value: string) => void;
}) {
  return (
    <div>
      <Definicoes setValueTab={setValueTab} />
      <Segregar />
    </div>
  );
}
