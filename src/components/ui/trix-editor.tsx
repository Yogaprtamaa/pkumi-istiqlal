/**
 * Trix Editor Wrapper Component
 * Rich text editor untuk create/edit Khazanah dan Rubrik
 */

'use client';

import * as React from 'react';
import { useEffect, useRef } from 'react';
import 'trix/dist/trix.css';

// Type declaration for trix-editor custom element
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'trix-editor': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          input?: string;
          placeholder?: string;
          autofocus?: boolean;
          ref?: any;
        },
        HTMLElement
      >;
    }
  }
}

interface TrixEditorProps {
  value?: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export function TrixEditor({ value = '', onChange, placeholder = 'Mulai menulis...', className = '' }: TrixEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const trixEditorRef = useRef<any>(null);
  const isUpdatingFromProps = useRef(false);

  useEffect(() => {
    // Import Trix dynamically untuk menghindari SSR issues
    if (typeof window !== 'undefined') {
      // @ts-ignore - Trix doesn't have TypeScript types
      import('trix').then(() => {
        // Trix is loaded
      });
    }
  }, []);

  useEffect(() => {
    const handleTrixChange = (e: any) => {
      if (!isUpdatingFromProps.current) {
        onChange(e.target.value);
      }
    };

    const handleTrixAttachmentAdd = (e: any) => {
      const attachment = e.attachment;
      if (attachment.file) {
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
      {/* @ts-ignore - trix-editor is a custom element */}
      <trix-editor
        ref={(el: any) => {
          trixEditorRef.current = el;
          if (editorRef.current !== el) {
            editorRef.current = el as any;
          }
        }}
        input="trix-editor-input"
        placeholder={placeholder}
        className="trix-content min-h-[300px] prose max-w-none"
      />
      <style jsx global>{`
        .trix-editor-wrapper {
          border: 1px solid #e5e7eb;
          border-radius: 0.5rem;
          overflow: hidden;
        }

        trix-editor {
          border: none !important;
          padding: 1rem;
          outline: none;
        }

        trix-editor:focus {
          outline: none;
        }

        trix-toolbar {
          background: #f9fafb;
          border-bottom: 1px solid #e5e7eb;
          padding: 0.5rem;
        }

        trix-toolbar .trix-button-group {
          margin: 0 0.25rem;
        }

        trix-toolbar .trix-button {
          background: white;
          border: 1px solid #e5e7eb;
          border-radius: 0.25rem;
          padding: 0.25rem 0.5rem;
          margin: 0 0.125rem;
        }

        trix-toolbar .trix-button:hover {
          background: #f3f4f6;
        }

        trix-toolbar .trix-button.trix-active {
          background: #047857;
          color: white;
          border-color: #047857;
        }

        .trix-content {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }

        .trix-content h1 {
          font-size: 2em;
          font-weight: bold;
          margin-top: 0.5em;
          margin-bottom: 0.5em;
        }

        .trix-content blockquote {
          border-left: 4px solid #047857;
          padding-left: 1em;
          margin-left: 0;
          font-style: italic;
        }

        .trix-content ul, .trix-content ol {
          padding-left: 2em;
        }

        .trix-content pre {
          background: #f3f4f6;
          padding: 1em;
          border-radius: 0.25rem;
          overflow-x: auto;
        }
      `}</style>
    </div>
  );
}
