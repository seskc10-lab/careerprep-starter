'use client';

import { useRef } from 'react';

export function FileDropzone({ onFile, filename }: { onFile: (file: File) => void; filename?: string | null }) {
  const ref = useRef<HTMLInputElement>(null);

  return (
    <>
      <div
        className="dropzone"
        onClick={() => ref.current?.click()}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          const file = e.dataTransfer.files?.[0];
          if (file) onFile(file);
        }}
      >
        <div style={{ fontSize: 28, marginBottom: 8 }}>{filename ? '✅' : '📄'}</div>
        <div>{filename ? filename : 'Click or drop a .docx or .txt file here'}</div>
      </div>
      <input
        ref={ref}
        type="file"
        accept=".docx,.txt"
        hidden
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) onFile(file);
        }}
      />
    </>
  );
}
