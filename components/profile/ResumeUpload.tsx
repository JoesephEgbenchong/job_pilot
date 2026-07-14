"use client";

import { useRef, useState } from "react";

export function ResumeUpload() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  function handleFiles(files: FileList | null) {
    const file = files?.[0];
    if (file && file.type === "application/pdf") {
      setSelectedFile(file);
    }
  }

  return (
    <div className="bg-surface border border-border rounded-2xl shadow p-6">
      <h2 className="text-base font-semibold text-text-primary">Resume</h2>
      <p className="text-sm text-text-secondary mt-1">
        Upload an existing resume to auto-fill the profile, or generate a new tailored one from
        your details below.
      </p>

      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setIsDragging(false);
          handleFiles(e.dataTransfer.files);
        }}
        className={`mt-6 w-full flex flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed py-12 transition-colors ${
          isDragging
            ? "border-accent bg-accent-muted"
            : "border-border-muted bg-surface-secondary hover:bg-surface-tertiary"
        }`}
      >
        <input
          ref={inputRef}
          type="file"
          accept="application/pdf"
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />
        <span className="w-10 h-10 rounded-full bg-surface border border-border flex items-center justify-center">
          <UploadIcon />
        </span>
        {selectedFile ? (
          <p className="text-sm font-semibold text-text-primary">{selectedFile.name}</p>
        ) : (
          <p className="text-sm font-semibold text-text-primary">
            Click to upload or drag and drop
          </p>
        )}
        <p className="text-xs text-text-muted">PDF formatting only. Maximum file size 5MB.</p>
        <span className="bg-surface border border-border text-text-primary text-sm font-medium px-4 py-2 rounded-md hover:bg-surface-secondary transition-colors">
          {selectedFile ? "Change Resume" : "Select Resume"}
        </span>
      </button>

      <hr className="border-border my-6" />

      <div className="flex items-center justify-between gap-4">
        <p className="text-sm text-text-secondary">
          Need a fresh document based on the fields below?
        </p>
        <button
          type="button"
          className="flex items-center gap-2 bg-accent text-accent-foreground text-sm font-medium px-4 py-2 rounded-md hover:bg-accent-dark transition-colors shrink-0"
        >
          <FileIcon />
          Generate Resume from Profile
        </button>
      </div>
    </div>
  );
}

function UploadIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-accent"
      aria-hidden="true"
    >
      <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" />
      <path d="M12 12v9" />
      <path d="m16 16-4-4-4 4" />
    </svg>
  );
}

function FileIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5z" />
      <path d="M14 2v6h6" />
    </svg>
  );
}
