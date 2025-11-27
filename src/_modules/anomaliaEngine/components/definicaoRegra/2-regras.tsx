import QueryBuilder from "react-querybuilder";
import { fieldsProdutividade } from "../../fields/produtividade.field";
import { useEngineAnomaliaStore } from "../../stores/engineAnomalia.store";

export default function DefinicaoRegra2Regras() {
  const { query, setQuery } = useEngineAnomaliaStore();

  return (
    <div>
      <QueryBuilder
        fields={fieldsProdutividade}
        query={query}
        onQueryChange={setQuery}
        controlClassnames={{ queryBuilder: 'queryBuilder-branches' }}
      />
    </div>
  )
}