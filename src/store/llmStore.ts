import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { LLMConfig, LLMProvider } from '../types';

interface LLMStore {
  configs: LLMConfig[];
  activeConfigId: string | null;
  addConfig: (config: Omit<LLMConfig, 'id'>) => void;
  updateConfig: (id: string, config: Partial<LLMConfig>) => void;
  deleteConfig: (id: string) => void;
  setActiveConfig: (id: string) => void;
}

const defaultConfigs: LLMConfig[] = [
  {
    id: 'openai-default',
    name: 'OpenAI',
    apiKey: '',
    isActive: true,
  },
  {
    id: 'anthropic-default',
    name: 'Anthropic',
    apiKey: '',
    isActive: false,
  },
];

export const useLLMStore = create<LLMStore>()(
  persist(
    (set) => ({
      configs: defaultConfigs,
      activeConfigId: 'openai-default',
      addConfig: (config) =>
        set((state) => ({
          configs: [...state.configs, { ...config, id: Date.now().toString() }],
        })),
      updateConfig: (id, newConfig) =>
        set((state) => ({
          configs: state.configs.map((config) =>
            config.id === id ? { ...config, ...newConfig } : config
          ),
        })),
      deleteConfig: (id) =>
        set((state) => ({
          configs: state.configs.filter((config) => config.id !== id),
          activeConfigId:
            state.activeConfigId === id ? null : state.activeConfigId,
        })),
      setActiveConfig: (id) =>
        set((state) => ({
          configs: state.configs.map((config) => ({
            ...config,
            isActive: config.id === id,
          })),
          activeConfigId: id,
        })),
    }),
    {
      name: 'llm-config-storage',
    }
  )
);