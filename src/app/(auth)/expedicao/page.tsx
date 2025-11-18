import UploadArquivos from '@/_modules/expedicao/components/uploadArquivos';
import { ShipmentsProvider } from '@/_modules/expedicao/others/providers/shipments.provider';
import { GerarMapa } from '@/_modules/expedicao/views';
import { Expedicao } from '@/_modules/expedicao_/views';

export default function ExpedicaoPage() {
  return (
    <div className="p-2">
        <Expedicao />
    </div>
  );
}
