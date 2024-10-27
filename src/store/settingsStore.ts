import { create } from 'zustand';
import { PlatformSettings } from '../types';

interface SettingsStore {
  platformSettings: PlatformSettings[];
  updateSettings: (id: string, settings: Partial<PlatformSettings>) => void;
  togglePlatform: (id: string) => void;
}

const defaultSettings: PlatformSettings[] = [
  {
    id: 'twitter',
    platform: 'twitter',
    systemPrompt: 'Create a concise, engaging tweet with relevant hashtags. Keep it under 280 characters.',
    tone: 'casual',
    maxLength: 280,
    enabled: true,
    useEmojis: true,
  },
  {
    id: 'facebook',
    platform: 'facebook',
    systemPrompt: 'Create an engaging Facebook post that encourages interaction and sharing. Include relevant hashtags when appropriate.',
    tone: 'casual',
    enabled: true,
    useEmojis: true,
  },
  {
    id: 'linkedin',
    platform: 'linkedin',
    systemPrompt: 'Write a professional post focusing on business value and industry insights. Include relevant hashtags.',
    tone: 'professional',
    enabled: true,
    useEmojis: false,
  },
  {
    id: 'instagram',
    platform: 'instagram',
    systemPrompt: 'Create an engaging caption with emojis and relevant hashtags. Focus on visual storytelling.',
    tone: 'casual',
    enabled: true,
    useEmojis: true,
  },
];

export const useSettingsStore = create<SettingsStore>((set) => ({
  platformSettings: defaultSettings,
  updateSettings: (id, newSettings) =>
    set((state) => ({
      platformSettings: state.platformSettings.map((settings) =>
        settings.id === id ? { ...settings, ...newSettings } : settings
      ),
    })),
  togglePlatform: (id) =>
    set((state) => ({
      platformSettings: state.platformSettings.map((settings) =>
        settings.id === id ? { ...settings, enabled: !settings.enabled } : settings
      ),
    })),
}));