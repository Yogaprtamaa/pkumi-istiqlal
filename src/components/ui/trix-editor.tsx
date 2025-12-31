/**
 * Trix Editor Wrapper Component
 * Rich text editor untuk create/edit Khazanah dan Rubrik
 */

'use client';

import * as React from 'react';
import { useEffect, useRef } from 'react';
import 'trix/dist/trix.css';

// Type declaration for trix-editor custom element
interface TrixEditorElement extends HTMLElement {
  input?: string;
  placeholder?: string;
  autofocus?: boolean;
}

declare global {
  interface HTMLElementTagNameMap {
    'trix-editor': TrixEditorElement;
  }
}

interface TrixEditorProps {
  value?: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export function TrixEditor({ value = '', onChange, placeholder = 'Mulai menulis...', className = '' }: TrixEditorProps) {
  const editorRef = useRef<HTMLElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const trixEditorRef = useRef<TrixEditorElement | null>(null);
  const isUpdatingFromProps = useRef(false);

  useEffect(() => {
    // Import Trix dynamically untuk menghindari SSR issues
    if (typeof window !== 'undefined') {
      // @ts-expect-error - Trix doesn't have TypeScript types
      import('trix').then(() => {
        // Trix is loaded
      });
    }
  }, []);

  useEffect(() => {
    const handleTrixChange = (e: Event) => {
      const target = e.target as TrixEditorElement;
      if (!isUpdatingFromProps.current && target.value) {
        onChange(target.value);
      }
    };

    const handleTrixAttachmentAdd = (e: Event) => {
      const customEvent = e as any; // Trix custom event
      const attachment = customEvent.attachment;
      if (attachment?.file) {
        // Handle file upload
        // For now, we'll prevent the upload and show a message
        e.preventDefault();
        alert('Upload gambar dalam editor akan segera tersedia. Untuk saat ini, gunakan thumbnail upload.');
      }
    };

    const editor = editorRef.current;
    if (editor) {
      editor.addEventListener('trix-change', handleTrixChange);
      editor.addEventListener('trix-attachment-add', handleTrixAttachmentAdd);

      return () => {
        editor.removeEventListener('trix-change', handleTrixChange);
        editor.removeEventListener('trix-attachment-add', handleTrixAttachmentAdd);
      };
    }
  }, [onChange]);

  // Update editor content when value prop changes
  useEffect(() => {
    const editor = trixEditorRef.current;
    if (editor && editor.editor && value !== editor.value) {
      isUpdatingFromProps.current = true;
      editor.editor.loadHTML(value);
      isUpdatingFromProps.current = false;
    }
  }, [value]);

  return (
    <div className={`trix-editor-wrapper ${className}`}>
      <input
        ref={inputRef}
        id="trix-editor-input"
        type="hidden"
        value={value}
      />
      {/* @ts-expect-error - trix-editor is a custom element */}
      <trix-editor
        ref={(el: TrixEditorElement | null) => {
          trixEditorRef.current = el;
          if (editorRef.current !== el) {
            editorRef.current = el;
          }
        }}
        input="trix-editor-input"
        placeholder={placeholder}
        className="trix-content min-h-150 prose max-w-none"
      />
      
      <style jsx global>{`
        /* WRAPPER UTAMA: Border Tebal & Shadow */
        .trix-editor-wrapper {
          border: 2px solid #cbd5e1; /* Warna abu-abu medium agar terlihat jelas */
          border-radius: 0.5rem;
          overflow: hidden;
          background-color: white;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05); /* Efek timbul halus */
          transition: all 0.2s ease-in-out;
        }

        /* EFEK FOCUS: Saat user klik di dalam, border jadi hijau */
        .trix-editor-wrapper:focus-within {
          border-color: #047857;
          box-shadow: 0 0 0 4px rgba(4, 120, 87, 0.1); /* Ring hijau transparan */
        }

        /* EDITOR AREA */
        trix-editor {
          border: none !important;
          padding: 1.5rem; /* Padding lebih besar agar lega */
          outline: none;
          min-height: 400px;
        }

        trix-editor:focus {
          outline: none;
        }

        /* TOOLBAR */
        trix-toolbar {
          background: #f8fafc; /* Warna latar sedikit abu untuk membedakan header */
          border-bottom: 2px solid #e2e8f0;
          padding: 0.75rem;
          position: sticky;
          top: 0;
          z-index: 10;
        }

        trix-toolbar .trix-button-group {
          margin: 0 0.25rem;
          background: white;
          border: 1px solid #e2e8f0;
          border-radius: 0.375rem;
        }

        trix-toolbar .trix-button {
          background: white;
          border: none;
          border-right: 1px solid #e2e8f0;
          border-radius: 0;
          padding: 0.4rem 0.6rem;
          margin: 0;
        }
        
        trix-toolbar .trix-button:last-child {
           border-right: none;
        }

        trix-toolbar .trix-button:hover {
          background: #f1f5f9;
        }

        trix-toolbar .trix-button.trix-active {
          background: #047857;
          color: white;
        }

        /* KONTEN TEXT */
        .trix-content {
          font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
          font-size: 1.05rem;
          line-height: 1.75;
          color: #334155;
        }

        .trix-content h1 {
          font-size: 2em;
          font-weight: 700;
          margin-top: 1em;
          margin-bottom: 0.5em;
          line-height: 1.2;
        }

        .trix-content blockquote {
          border-left: 4px solid #047857;
          padding-left: 1em;
          margin-left: 0;
          font-style: italic;
          background: #f0fdf4;
          padding: 1rem;
          border-radius: 0 0.5rem 0.5rem 0;
          color: #166534;
        }

        .trix-content ul, .trix-content ol {
          padding-left: 1.5em;
          margin-bottom: 1em;
        }
        
        .trix-content a {
          color: #047857;
          text-decoration: underline;
        }

        .trix-content pre {
          background: #1e293b;
          color: #f8fafc;
          padding: 1em;
          border-radius: 0.5rem;
          overflow-x: auto;
          margin: 1em 0;
        }
      `}</style>
    </div>
  );
}