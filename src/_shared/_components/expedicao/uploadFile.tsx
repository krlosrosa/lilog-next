import { CheckCircle, File, Upload, X } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/_shared/_components/ui/button';

export const CompactFileUpload = ({
  id,
  title,
  file,
  onChange,
  required = false,
}: {
  id: string;
  title: string;
  file: File | null;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}) => {
  const [isDragging, setIsDragging] = useState(false);

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

    const droppedFile = e.dataTransfer.files[0];
    if (
      droppedFile &&
      (droppedFile.name.endsWith('.xlsx') || droppedFile.name.endsWith('.xls'))
    ) {
      const mockEvent = {
        target: { files: [droppedFile] },
        currentTarget: { files: [droppedFile] },
      } as unknown as React.ChangeEvent<HTMLInputElement>;
      onChange(mockEvent);
    }
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    const mockEvent = {
      target: { files: [] },
      currentTarget: { files: [] },
    } as unknown as React.ChangeEvent<HTMLInputElement>;
    onChange(mockEvent);
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <File className="text-muted-foreground h-4 w-4" />
        <label htmlFor={id} className="text-sm font-medium">
          {title}
          {required && <span className="text-destructive ml-1">*</span>}
        </label>
      </div>

      <label
        htmlFor={id}
        className={`relative block cursor-pointer rounded-lg border-2 border-dashed p-4 text-center transition-all ${
          isDragging
            ? 'border-primary bg-primary/5'
            : file
              ? 'border-green-300 bg-green-50/50'
              : 'border-muted-foreground/25 hover:border-muted-foreground/50'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          id={id}
          type="file"
          accept=".xlsx, .xls"
          onChange={onChange}
          className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
        />

        {file ? (
          <div className="flex items-center justify-between">
            <div className="flex min-w-0 items-center gap-2">
              <CheckCircle className="h-4 w-4 flex-shrink-0 text-green-600" />
              <span className="truncate text-xs font-medium text-green-700">
                {file.name}
              </span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleRemove}
              className="text-muted-foreground hover:text-destructive h-6 w-6 p-0"
            >
              <X className="h-3 w-3" />
            </Button>
          </div>
        ) : (
          <div className="flex items-center justify-center gap-2">
            <Upload className="text-muted-foreground h-4 w-4" />
            <span className="text-muted-foreground text-xs">
              Clique ou arraste arquivo
            </span>
          </div>
        )}
      </label>
    </div>
  );
};
