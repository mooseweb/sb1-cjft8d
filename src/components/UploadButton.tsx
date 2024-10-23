import React from 'react';
import { Twitter } from 'lucide-react';

interface UploadButtonProps {
  onClick: () => void;
  disabled: boolean;
  isUploading: boolean;
}

export function UploadButton({ onClick, disabled, isUploading }: UploadButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`w-full py-3 px-6 rounded-lg flex items-center justify-center space-x-2 
        ${disabled ? 'bg-gray-600 cursor-not-allowed' : 'bg-purple-600 hover:bg-purple-500'}`}
    >
      <Twitter className="w-5 h-5" />
      <span>{isUploading ? 'Processing...' : 'Upload to Twitter'}</span>
    </button>
  );
}