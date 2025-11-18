'use client';

import { ReactNode } from 'react';
import { subject } from '@casl/ability';
import { Can } from './caslProvider'; // O seu <Can> original

// Tipagem das props do nosso novo componente
type CanWithCenterProps = {
  /** A ação que você quer verificar (ex: 'ver', 'criar', 'deletar') */
  acao: string;

  /** O nome do recurso (ex: 'estoque', 'Relatorio') */
  recurso: string;

  /** O centro (opcional) para checagem condicional */
  centro?: string | null;

  /** Os componentes filhos que serão renderizados se houver permissão */
  children: ReactNode;

  /** Permite passar outras props, como 'passThrough' */
  [key: string]: any;
};

/**
 * Componente wrapper para o <Can> do CASL que injeta
 * automaticamente a condição de 'centro' no subject.
 */
export function CanWithCenter({
  acao,
  recurso,
  centro,
  children,
  ...rest
}: CanWithCenterProps) {
  // 1. Constrói o 'subject' que será testado.
  // Se a prop 'centro' for fornecida, ele cria um subject condicional.
  // Se 'centro' for nulo ou undefined, ele usa apenas o nome do recurso.
  const subjectToTest = centro ? subject(recurso, { centro: centro }) : recurso;

  // 2. Renderiza o <Can> original com o subject montado na prop 'a'
  return (
    <Can I={acao} a={subjectToTest} {...rest}>
      {children}
    </Can>
  );
}
