import React from 'react';
import { Toaster } from 'react-hot-toast';
import { PenTool } from 'lucide-react';
import PostEditor from './components/PostEditor';
import PostList from './components/PostList';
import Sidebar from './components/Sidebar';
import LLMConfig from './components/LLMConfig';

function App() {
  return (
    <div className="flex min-h-screen bg-neutral-900">
      <Sidebar />
      <div className="flex-1">
        <Toaster 
          position="top-right"
          toastOptions={{
            style: {
              background: '#262626',
              color: '#fff',
            },
          }}
        />
        
        <header className="bg-neutral-800 border-b border-neutral-700">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex items-center gap-2">
              <PenTool className="text-emerald-500" size={24} />
              <h1 className="text-xl font-bold text-white">Social Media AI Assistant</h1>
            </div>
          </div>
        </header>

        <main className="max-w-4xl mx-auto px-4 py-8">
          <PostEditor />
          <PostList />
          <LLMConfig />
        </main>
      </div>
    </div>
  );
}

export default App;