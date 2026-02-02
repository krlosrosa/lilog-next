"use client";

import { CheckCircle, File, Upload, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/_shared/_components/ui/button";

const ACCEPT = ".csv,.xlsx,.xls";
const ACCEPT_LIST = [".csv", ".xlsx", ".xls"];

function isValidExtension(name: string): boolean {
  const lower = name.toLowerCase();
  return ACCEPT_LIST.some((ext) => lower.endsWith(ext));
}

export interface AccountingUploadProps {
  id?: string;
  file: File | null;
  onChange: (file: File | null) => void;
  required?: boolean;
  disabled?: boolean;
}

export function AccountingUpload({
  id = "accounting-upload",
  file,
  onChange,
  required = true,
  disabled = false,
}: AccountingUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFile = (newFile: File | null) => {
    setError(null);
    if (newFile && !isValidExtension(newFile.name)) {
      setError("Use arquivo CSV ou XLSX.");
      return;
    }
    onChange(newFile);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0] ?? null;
    handleFile(selected);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const dropped = e.dataTransfer.files[0];
    if (dropped && isValidExtension(dropped.name)) {
      handleFile(dropped);
    } else if (dropped) {
      setError("Use arquivo CSV ou XLSX.");
    }
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    handleFile(null);
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <File className="text-muted-foreground h-4 w-4" />
        <label htmlFor={id} className="text-sm font-medium">
          Arquivo contábil (Saldo do Sistema)
          {required && <span className="text-destructive ml-1">*</span>}
        </label>
      </div>

      <label
        htmlFor={id}
        className={`relative block cursor-pointer rounded-lg border-2 border-dashed p-4 text-center transition-all ${
          disabled ? "pointer-events-none opacity-60" : ""
        } ${
          isDragging
            ? "border-primary bg-primary/5"
            : file
              ? "border-green-300 bg-green-50/50 dark:border-green-700 dark:bg-green-950/30"
              : "border-muted-foreground/25 hover:border-muted-foreground/50"
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          id={id}
          type="file"
          accept={ACCEPT}
          onChange={handleChange}
          className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
          disabled={disabled}
        />

        {file ? (
          <div className="flex items-center justify-between">
            <div className="flex min-w-0 items-center gap-2">
              <CheckCircle className="h-4 w-4 flex-shrink-0 text-green-600" />
              <span className="truncate text-xs font-medium text-green-700 dark:text-green-400">
                {file.name}
              </span>
            </div>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={handleRemove}
              className="text-muted-foreground hover:text-destructive h-6 w-6 p-0"
            >
              <X className="h-3 w-3" />
            </Button>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center gap-2">
            <Upload className="text-muted-foreground h-4 w-4" />
            <span className="text-muted-foreground text-xs">
              Clique ou arraste arquivo CSV ou XLSX
            </span>
          </div>
        )}
      </label>

      {error && (
        <p className="text-destructive text-xs" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
