import React from 'react';
import { Upload } from 'lucide-react';

interface ImageUploaderProps {
  previewUrl: string | null;
  onImageSelect: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onRemoveImage: () => void;
}

export function ImageUploader({ previewUrl, onImageSelect, onRemoveImage }: ImageUploaderProps) {
  return (
    <div className="border-2 border-dashed border-purple-500/50 rounded-lg p-8 text-center">
      {previewUrl ? (
        <div className="space-y-4">
          <img 
            src={previewUrl} 
            alt="Preview" 
            className="max-h-96 mx-auto rounded-lg"
          />
          <button
            onClick={onRemoveImage}
            className="text-red-400 hover:text-red-300"
          >
            Remove
          </button>
        </div>
      ) : (
        <label className="cursor-pointer block">
          <Upload className="w-12 h-12 mx-auto mb-4 text-purple-400" />
          <span className="text-purple-300">
            Click to upload or drag and drop
          </span>
          <input
            type="file"
            className="hidden"
            onChange={onImageSelect}
            accept="image/*"
          />
        </label>
      )}
    </div>
  );
}