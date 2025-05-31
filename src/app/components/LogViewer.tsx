import { useState } from 'react';

interface LogViewerProps {
  content: string;
  maxHeight?: string;
}

const LogViewer: React.FC<LogViewerProps> = ({ content, maxHeight = '400px' }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text:', err);
    }
  };

  return (
    <div className="relative bg-gray-800 rounded-lg my-4">
      <div className="absolute right-2 top-2">
        <button
          onClick={copyToClipboard}
          className="px-2 py-1 text-sm bg-gray-700 text-gray-200 rounded hover:bg-gray-600 transition-colors"
        >
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
      <pre 
        className="p-4 overflow-x-auto whitespace-pre-wrap break-all text-sm text-gray-200"
        style={{ 
          maxHeight,
          overflowY: 'auto',
          wordBreak: 'break-word'
        }}
      >
        <code>{content}</code>
      </pre>
    </div>
  );
};

export default LogViewer;