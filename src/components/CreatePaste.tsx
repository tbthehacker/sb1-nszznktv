import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, Copy, Check } from 'lucide-react';
import { supabase } from '../lib/supabase';

export function CreatePaste() {
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [pasteUrl, setPasteUrl] = useState('');
  const [copied, setCopied] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('pastes')
        .insert([{ content }])
        .select()
        .single();

      if (error) throw error;
      const url = `${window.location.origin}/${data.id}`;
      setPasteUrl(url);
    } catch (error) {
      console.error('Error creating paste:', error);
      alert('Failed to create paste. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(pasteUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy link:', err);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <FileText className="w-8 h-8 text-blue-600" />
        <h1 className="text-2xl font-bold text-gray-900">Create New Paste</h1>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full h-96 p-4 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Paste your text here..."
          required
        />
        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
        >
          {isLoading ? 'Creating...' : 'Create Paste'}
        </button>
      </form>

      {pasteUrl && (
        <div className="mt-6 p-4 bg-gray-50 border rounded-lg">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">Shareable Link:</span>
            <button
              onClick={copyToClipboard}
              className="flex items-center space-x-2 text-sm text-blue-600 hover:text-blue-700"
            >
              {copied ? (
                <Check className="w-4 h-4" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
              <span>{copied ? 'Copied!' : 'Copy Link'}</span>
            </button>
          </div>
          <a
            href={pasteUrl}
            className="mt-2 block text-blue-600 hover:text-blue-700 break-all"
            target="_blank"
            rel="noopener noreferrer"
          >
            {pasteUrl}
          </a>
        </div>
      )}
    </div>
  );
}