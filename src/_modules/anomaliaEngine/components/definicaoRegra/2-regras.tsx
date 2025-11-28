'use client'
import QueryBuilder from "react-querybuilder";
import { fieldsProdutividade } from "../../fields/produtividade.field";
import { useEngineAnomaliaStore } from "../../stores/engineAnomalia.store";
import { fieldsTransporte } from "../../fields/transporte.field";
import { useEffect } from "react";

export default function DefinicaoRegra2Regras() {
  const { query, setQuery, processo, setFields, fields } = useEngineAnomaliaStore();

  useEffect(() => {
    setFields(processo.processo === 'PRODUTIVIDADE' ? fieldsProdutividade : fieldsTransporte);
  }, [processo.processo]);

  return (
    <div>
      <QueryBuilder
        fields={fields}
        query={query}
        onQueryChange={setQuery}
        controlClassnames={{ queryBuilder: 'queryBuilder-branches' }}
      />
    </div>
  )
}