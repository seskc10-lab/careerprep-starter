'use client';

import { useState } from 'react';
import { FileDropzone } from '@/components/shared/FileDropzone';
import { parseDocx } from '@/lib/utils/parseDocx';

export function CvInputCard({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  const [mode, setMode] = useState<'paste' | 'upload'>('paste');
  const [filename, setFilename] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleFile(file: File) {
    setError(null);
    setFilename(file.name);
    try {
      if (file.name.toLowerCase().endsWith('.docx')) {
        onChange(await parseDocx(file));
      } else {
        onChange(await file.text());
      }
    } catch {
      setError('Could not read that file. Try .txt or paste the CV instead.');
    }
  }

  return (
    <div className="card">
      <div className="spaced" style={{ marginBottom: 12 }}>
        <strong>Your CV</strong>
        <div className="row">
          <button type="button" className={`pill ${mode === 'paste' ? 'on' : ''}`} onClick={() => setMode('paste')}>Paste</button>
          <button type="button" className={`pill ${mode === 'upload' ? 'on' : ''}`} onClick={() => setMode('upload')}>Upload</button>
        </div>
      </div>
      {mode === 'paste' ? <textarea value={value} onChange={(e) => onChange(e.target.value)} placeholder="Paste your full CV here…" /> : <FileDropzone onFile={handleFile} filename={filename} />}
      {error ? <div className="notice error" style={{ marginTop: 12 }}>{error}</div> : null}
    </div>
  );
}
