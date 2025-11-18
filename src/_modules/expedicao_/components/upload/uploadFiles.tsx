import { CompactFileUpload } from "@/_shared/_components/expedicao/uploadFile";
import { useState } from "react";
import { FilesState } from "../../others/services/validation/validateInputs";

type UploadFilesProps = {
  itensUpload: FilesState;
  setItensUpload: (itensUpload: FilesState) => void;
}

export function UploadFiles({ itensUpload, setItensUpload }: UploadFilesProps) {

  const handleFileChange = (key: keyof FilesState) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const selected = e.target.files?.[0] || null;
      setItensUpload({
        ...itensUpload,
        [key]: selected,
      });
    };

  return (
    <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
      <CompactFileUpload
        id="shipments"
        title="Remessas"
        file={itensUpload.shipments}
        onChange={handleFileChange("shipments")}
      />
      <CompactFileUpload
        id="products"
        title="Produtos"
        file={itensUpload.products}
        onChange={handleFileChange("products")}
      />
      <CompactFileUpload
        id="routes"
        title="Rotas"
        file={itensUpload.routes || null}
        onChange={handleFileChange("routes")}
      />
    </div>
  )
}