'use client';
import CreateRules from '@/_modules/center/components/rules/createRules';
import { TableRules } from '@/_modules/center/components/rules/tableRules';

export default function RulesPage() {
  return (
    <div className="p-2">
      <CreateRules />
      <TableRules />
    </div>
  );
}
