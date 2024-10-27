import React, { useState } from 'react';
import { Plus, Trash2, Check, Key, Globe } from 'lucide-react';
import { useLLMStore } from '../store/llmStore';
import { LLMProvider } from '../types';

export default function LLMConfig() {
  const { configs, addConfig, updateConfig, deleteConfig, setActiveConfig } = useLLMStore();
  const [showNewForm, setShowNewForm] = useState(false);
  const [newConfig, setNewConfig] = useState({
    name: '',
    apiKey: '',
    apiEndpoint: '',
    provider: 'openai' as LLMProvider,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addConfig({
      name: newConfig.name,
      apiKey: newConfig.apiKey,
      apiEndpoint: newConfig.apiEndpoint,
      isActive: false,
    });
    setShowNewForm(false);
    setNewConfig({ name: '', apiKey: '', apiEndpoint: '', provider: 'openai' });
  };

  return (
    <div className="mt-8 bg-neutral-800 border border-neutral-700 rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-white">LLM Configuration</h2>
        <button
          onClick={() => setShowNewForm(!showNewForm)}
          className="flex items-center gap-2 px-3 py-2 text-sm bg-emerald-900/30 text-emerald-400 rounded-lg hover:bg-emerald-900/50"
        >
          <Plus size={16} />
          Add New Service
        </button>
      </div>

      {showNewForm && (
        <form onSubmit={handleSubmit} className="mb-6 p-4 bg-neutral-900 rounded-lg border border-neutral-700">
          <div className="grid gap-4">
            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-1">
                Service Name
              </label>
              <input
                type="text"
                value={newConfig.name}
                onChange={(e) =>
                  setNewConfig({ ...newConfig, name: e.target.value })
                }
                className="w-full p-2 bg-neutral-800 text-white border-neutral-700 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                placeholder="e.g., My OpenAI Config"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-1">
                API Key
              </label>
              <div className="relative">
                <input
                  type="password"
                  value={newConfig.apiKey}
                  onChange={(e) =>
                    setNewConfig({ ...newConfig, apiKey: e.target.value })
                  }
                  className="w-full p-2 pl-8 bg-neutral-800 text-white border-neutral-700 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  placeholder="Enter your API key"
                  required
                />
                <Key size={16} className="absolute left-2 top-3 text-neutral-500" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-1">
                API Endpoint (Optional)
              </label>
              <div className="relative">
                <input
                  type="url"
                  value={newConfig.apiEndpoint}
                  onChange={(e) =>
                    setNewConfig({ ...newConfig, apiEndpoint: e.target.value })
                  }
                  className="w-full p-2 pl-8 bg-neutral-800 text-white border-neutral-700 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  placeholder="https://api.example.com/v1"
                />
                <Globe size={16} className="absolute left-2 top-3 text-neutral-500" />
              </div>
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
              >
                Save Configuration
              </button>
            </div>
          </div>
        </form>
      )}

      <div className="space-y-4">
        {configs.map((config) => (
          <div
            key={config.id}
            className="flex items-center justify-between p-4 border border-neutral-700 rounded-lg hover:bg-neutral-700/50"
          >
            <div className="flex items-center gap-4">
              <input
                type="radio"
                checked={config.isActive}
                onChange={() => setActiveConfig(config.id)}
                className="w-4 h-4 text-emerald-500 bg-neutral-700 border-neutral-600 focus:ring-emerald-600"
              />
              <div>
                <h3 className="font-medium text-white">{config.name}</h3>
                <p className="text-sm text-neutral-400">
                  {config.apiEndpoint ? 'Custom Endpoint' : 'Default Endpoint'}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {config.isActive && (
                <span className="flex items-center gap-1 text-sm text-emerald-400">
                  <Check size={16} />
                  Active
                </span>
              )}
              <button
                onClick={() => deleteConfig(config.id)}
                className="p-2 text-red-400 hover:bg-neutral-700 rounded-lg"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}