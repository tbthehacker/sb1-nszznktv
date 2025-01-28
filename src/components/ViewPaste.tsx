import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FileText, Copy, Check } from 'lucide-react';
import { supabase } from '../lib/supabase';

export function ViewPaste() {
  const { id } = useParams();
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    async function fetchPaste() {
      try {
        const { data, error } = await supabase
          .from('pastes')
          .select('content')
          .eq('id', id)
          .single();

        if (error) throw error;
        setContent(data.content);
      } catch (error) {
        console.error('Error fetching paste:', error);
        setContent('Paste not found or error loading content.');
      } finally {
        setLoading(false);
      }
    }

    fetchPaste();
  }, [id]);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text:', err);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <FileText className="w-8 h-8 text-blue-600" />
          <h1 className="text-2xl font-bold text-gray-900">View Paste</h1>
        </div>
        <button
          onClick={copyToClipboard}
          className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-600 hover:text-gray-900"
        >
          {copied ? (
            <Check className="w-4 h-4" />
          ) : (
            <Copy className="w-4 h-4" />
          )}
          <span>{copied ? 'Copied!' : 'Copy'}</span>
        </button>
      </div>
      
      <div className="relative">
        <pre className="w-full min-h-[200px] p-4 bg-gray-50 border rounded-lg whitespace-pre-wrap break-words">
          {content}
        </pre>
      </div>
    </div>
  );
}