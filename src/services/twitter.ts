export async function uploadToTwitter(imageFile: File): Promise<boolean> {
  try {
    const formData = new FormData();
    formData.append('image', imageFile);
    
    // Replace with actual Zapier webhook URL in production
    const ZAPIER_WEBHOOK_URL = 'https://hooks.zapier.com/hooks/catch/your-webhook-id';
    
    const response = await fetch(ZAPIER_WEBHOOK_URL, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) throw new Error('Failed to upload to Twitter');
    
    return true;
  } catch (error) {
    console.error('Error uploading to Twitter:', error);
    throw error;
  }
}