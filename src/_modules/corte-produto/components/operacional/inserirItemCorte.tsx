import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/_shared/_components/ui/dialog";
import { Button } from "@/_shared/_components/ui/button";
import { Plus, AlertTriangle } from "lucide-react";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/_shared/_components/ui/form";
import { Input } from "@/_shared/_components/ui/input";
import { AugmentedZodDto } from "@/_services/api/model";
import { useEffect, useState, memo } from "react";
import { useWatch, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { corteProdutoItemSchema } from "../../schemas/corte-produto-item.schema";
import { useCorte } from "../../context/corte.provider";
import { Alert, AlertDescription } from "@/_shared/_components/ui/alert";

interface InserirItemCorteProps {
  item: AugmentedZodDto;
}

const InserirItemCorte = memo(function InserirItemCorte({ item }: InserirItemCorteProps) {
  // Usar formulário local ao invés de compartilhar via hook
  const forms = useForm({
    resolver: zodResolver(corteProdutoItemSchema),
    defaultValues: {
      transporte: item.transporte || '',
      sku: item.sku || '',
      descricao: item.descricao || '',
      lote: item.lote || '',
      caixas: 0,
      quantidade: 0,
      segmento: item.segmento || '',
      tipo: item.tipo || '',
    }
  });

  const { handleInserirItemCorte } = useCorte();
  const [isOpen, setIsOpen] = useState(false);

  const quantidadeInputada = useWatch({ control: forms.control, name: 'quantidade' }) ?? 0;
  const caixasInputadas = useWatch({ control: forms.control, name: 'caixas' }) ?? 0;

  const quantidadeCortada = item.quantidadeCortada ?? 0;
  const caixasCortadas = item.caixasCortadas ?? 0;
  const quantidadeOriginal = item.quantidade ?? 0;
  const caixasOriginal = item.caixas ?? 0;
  const preenchido = (quantidadeInputada + caixasInputadas) === 0;

  const quantidadeExcedida = (quantidadeInputada + quantidadeCortada) > quantidadeOriginal;
  const caixasExcedidas = (caixasInputadas + caixasCortadas) > caixasOriginal;
  const temErro = quantidadeExcedida || caixasExcedidas;

  const handleSubmit = (data: any) => {
    const itemAtualizado = {
      ...item,
      caixas: data.caixas || 0,
      quantidade: data.quantidade || 0,
    };
    handleInserirItemCorte(itemAtualizado);
    setIsOpen(false);
    // Resetar formulário após fechar
    forms.reset({
      sku: item.sku || '',
      descricao: item.descricao || '',
      lote: item.lote || '',
      caixas: 0,
      quantidade: 0,
      segmento: item.segmento || '',
      tipo: item.tipo || '',
    });
  };

  // Atualizar formulário apenas quando o item mudar ou o modal abrir
  useEffect(() => {
    if (isOpen && item) {
      const { setValue } = forms;
      setValue('sku', item.sku || '');
      setValue('descricao', item.descricao || '');
      setValue('lote', item.lote || '');
      setValue('caixas', 0);
      setValue('quantidade', 0);
      setValue('segmento', item.segmento || '');
      setValue('tipo', item.tipo || '');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, item.sku, item.lote, item.transporte, item.descricao, item.segmento, item.tipo]);

  return (
    <div>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" size="icon">
            <Plus className="h-4 w-4" />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Plus className="h-5 w-5 text-primary" />
              Inserir Item de Corte
            </DialogTitle>
            <DialogDescription>
              Ajuste a quantidade e caixas do item.
            </DialogDescription>
          </DialogHeader>
          <Form {...forms}>
            <form onSubmit={forms.handleSubmit(handleSubmit)}>
              <div className="space-y-4 py-4">
                {/* Informações do Item (Somente Leitura) - Compacto */}
                <div className="rounded-lg border bg-muted/30 p-3 space-y-2">
                  <div className="text-xs font-semibold text-muted-foreground mb-2">Informações do Item</div>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-xs">
                    <div>
                      <span className="text-muted-foreground">Transporte:</span>
                      <span className="ml-1 font-medium">{item.transporte}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">SKU:</span>
                      <span className="ml-1 font-medium">{item.sku}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Lote:</span>
                      <span className="ml-1 font-medium">{item.lote}</span>
                    </div>
                    {item.segmento && (
                      <div>
                        <span className="text-muted-foreground">Segmento:</span>
                        <span className="ml-1 font-medium">{item.segmento}</span>
                      </div>
                    )}
                    <div>
                      <span className="text-muted-foreground">Caixas:</span>
                      <span className="ml-1 font-medium">{item.caixas}</span>
                    </div>
                    {item.quantidade !== undefined && (
                      <div>
                        <span className="text-muted-foreground">Unidade:</span>
                        <span className="ml-1 font-medium">{item.quantidade}</span>
                      </div>
                    )}
                    {item.caixasCortadas !== undefined && item.caixasCortadas > 0 && (
                      <div className="text-destructive">
                      <span className="">Caixas Cortadas:</span>
                        <span className="ml-1 font-medium">{item.caixasCortadas}</span>
                      </div>
                    )}
                    {item.quantidadeCortada !== undefined && item.quantidadeCortada > 0 && (
                      <div className="text-destructive">
                        <span className="">Unidades Cortadas:</span>
                        <span className="ml-1 font-medium">{item.quantidadeCortada}</span>
                      </div>
                    )}
                  </div>
                  {item.descricao && (
                    <div className="text-xs text-muted-foreground mt-2 pt-2 border-t">
                      <span className="font-medium">Descrição:</span>
                      <span className="ml-1">{item.descricao}</span>
                    </div>
                  )}
                </div>

                {/* Campos Editáveis */}
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <FormField
                      control={forms.control}
                      name="caixas"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium">Caixas</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              type="number"
                              placeholder="0"
                              value={field.value ?? ''}
                              onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : 0)}
                              className={`h-9 ${caixasExcedidas ? 'border-destructive' : ''}`}
                            />
                          </FormControl>
                          {caixasExcedidas && (
                            <p className="text-xs text-destructive mt-1">
                              Valor excede o máximo de {caixasOriginal} caixas
                            </p>
                          )}
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={forms.control}
                      name="quantidade"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium">Unidades</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              type="number"
                              placeholder="0"
                              value={field.value ?? ''}
                              onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : 0)}
                              className={`h-9 ${quantidadeExcedida ? 'border-destructive' : ''}`}
                            />
                          </FormControl>
                          {quantidadeExcedida && (
                            <p className="text-xs text-destructive mt-1">
                              Valor excede o máximo de {quantidadeOriginal} unidades
                            </p>
                          )}
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  {temErro && (
                    <Alert variant="destructive">
                      <AlertTriangle className="h-4 w-4" />
                      <AlertDescription className="text-xs">
                        {quantidadeExcedida && caixasExcedidas
                          ? 'Os valores de quantidade e caixas excedem os valores originais.'
                          : quantidadeExcedida
                            ? 'O valor de unidades excede o valor original ou as unidades cortadas.'
                            : 'O valor de caixas excede o valor original ou as caixas cortadas.'}
                      </AlertDescription>
                    </Alert>
                  )}
                </div>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
                  Cancelar
                </Button>
                <Button type="submit" disabled={temErro || preenchido}>
                  Confirmar
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  )
});

InserirItemCorte.displayName = 'InserirItemCorte';

export default InserirItemCorte;
