import React, { useState } from 'react';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import toast, { Toaster } from 'react-hot-toast';
import { ImageUploader } from './components/ImageUploader';
import { BurnRequirement } from './components/BurnRequirement';
import { UploadButton } from './components/UploadButton';
import { createBurnTransaction } from './services/solana';
import { uploadToTwitter } from './services/twitter';

function App() {
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = async () => {
    if (!selectedImage || !publicKey) {
      toast.error('Please connect your wallet and select an image!');
      return;
    }

    setIsUploading(true);
    
    try {
      // Step 1: Burn tokens
      toast.loading('Burning $SHIT tokens...');
      const transaction = await createBurnTransaction(publicKey);
      const signature = await sendTransaction(transaction, connection);
      await connection.confirmTransaction(signature);
      
      // Step 2: Upload to Twitter
      toast.loading('Uploading to Twitter...');
      await uploadToTwitter(selectedImage);

      toast.success('Successfully uploaded to Twitter!');
      setSelectedImage(null);
      setPreviewUrl(null);
    } catch (error) {
      console.error('Error in upload process:', error);
      toast.error('Upload process failed');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-black/30 backdrop-blur-lg rounded-xl p-8 shadow-2xl">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold">$SHIT Image Uploader</h1>
            <WalletMultiButton />
          </div>

          <div className="space-y-6">
            <ImageUploader
              previewUrl={previewUrl}
              onImageSelect={handleImageSelect}
              onRemoveImage={() => {
                setSelectedImage(null);
                setPreviewUrl(null);
              }}
            />

            <BurnRequirement />

            <UploadButton
              onClick={handleUpload}
              disabled={!selectedImage || isUploading || !publicKey}
              isUploading={isUploading}
            />
          </div>
        </div>
      </div>
      <Toaster position="bottom-right" />
    </div>
  );
}

export default App;