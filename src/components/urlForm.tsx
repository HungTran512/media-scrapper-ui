'use client';
import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { uploadUrl } from '@/api/actions';

interface UrlFormData {
  url: string;
}

interface UrlFormProps {
  refetch: () => void;
}

const UrlForm = ({ refetch }: UrlFormProps) => {
  const [url, setUrl] = useState<string>('');

  const mutation = useMutation({
    mutationFn: (data: UrlFormData) => uploadUrl(data),
    onSuccess: () => {
      setUrl('');
      refetch();
    },
    onError: (error) => {
      console.error('Error uploading URL:', error);
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!url.trim()) return;

    try {
      mutation.mutate({ url });
    } catch (error) {
      console.error('Form submission error:', error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col sm:flex-row gap-2 mb-5"
    >
      <input
        type="url"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Enter URL to scrape"
        required
        className="flex-1 text-black border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        disabled={mutation.isPending}
      />
      <button
        type="submit"
        className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
        disabled={mutation.isPending || !url.trim()}
      >
        {mutation.isPending ? 'Uploading...' : 'Upload URL'}
      </button>
    </form>
  );
};

export default UrlForm;
