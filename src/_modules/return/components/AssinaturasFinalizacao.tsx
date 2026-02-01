'use client';

export function AssinaturasFinalizacao() {
  return (
    <div className="mt-16 border-slate-300 pt-3 print:break-inside-avoid">
      <div className="flex gap-3">
        {/* Assinatura Motorista */}
        <div className="flex-1">
          <div className="border-t border-slate-400 pt-6">
            <div className="text-center">
              <div className="text-[12px] font-semibold text-slate-700 mb-0.5">
                Motorista
              </div>
              <div className="text-[10px] text-slate-500 mt-1">
                Assinatura
              </div>
            </div>
          </div>
        </div>

        {/* Separador Vertical */}
        <div className="w-px bg-slate-300"></div>

        {/* Documento Motorista */}
        <div className="flex-1">
          <div className="border-t border-slate-400 pt-6">
            <div className="text-center">
              <div className="text-[12px] font-semibold text-slate-700 mb-0.5">
                Documento
              </div>
              <div className="text-[10px] text-slate-500 mt-1">
                CPF/RG
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
