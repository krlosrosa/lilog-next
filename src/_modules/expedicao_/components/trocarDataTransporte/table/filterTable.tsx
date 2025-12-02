import { Input } from "@/_shared/_components/ui/input";

interface FilterTableProps {
  globalFilter: string;
  setGlobalFilter: (globalFilter: string) => void;
}

export const FilterTable = ({ globalFilter, setGlobalFilter }: FilterTableProps) => {
  return (
    <div className="flex items-center my-2">
      <Input
        placeholder="Digite o filtro"
        value={globalFilter}
        onChange={(e) => setGlobalFilter(e.target.value)}
      />
    </div>
  );
};