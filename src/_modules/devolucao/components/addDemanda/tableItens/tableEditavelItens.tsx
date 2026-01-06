import { ReturnInfoGeralRavexNotasItemItensItem } from "@/_services/api/model";
import { Input } from "@/_shared/_components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/_shared/_components/ui/table";

type TableEditavelItensProps = {
  data: ReturnInfoGeralRavexNotasItemItensItem[];
  onChange: (item: ReturnInfoGeralRavexNotasItemItensItem) => void;
}

export default function TableEditavelItens({ data, onChange }: TableEditavelItensProps) {

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>SKU</TableHead>
            <TableHead>Descrição</TableHead>
            <TableHead>Peso Líquido</TableHead>
            <TableHead>Quantidade Ravex</TableHead>
            <TableHead>Quantidade Caixas</TableHead>
            <TableHead>Quantidade Unidades</TableHead>
            <TableHead>Fator de Conversão</TableHead>
            <TableHead>Unidades por Caixa</TableHead>
            <TableHead>Decimal</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item) => (
            <TableRow key={item.sku}>
              <TableCell>{item.sku}</TableCell>
              <TableCell>{item.descricao}</TableCell>
              <TableCell>{item.pesoLiquido}</TableCell>
              <TableCell>{item.quantidadeRavex}</TableCell>
              <TableCell>
                <Input type="number" value={item.quantidadeCaixas} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  onChange({ ...item, quantidadeCaixas: parseInt(e.target.value) });
                }} />
              </TableCell>
              <TableCell>
                <Input type="number" value={item.quantidadeUnidades} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  onChange({ ...item, quantidadeUnidades: parseInt(e.target.value) });
                }} />
              </TableCell>
              <TableCell>{item.fatorConversao}</TableCell>
              <TableCell>{item.unPorCaixa}</TableCell>
              <TableCell>{item.decimal}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}