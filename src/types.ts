export interface PlatformSettings {
  id: string;
  platform: 'twitter' | 'linkedin' | 'instagram' | 'facebook';
  systemPrompt: string;
  tone: 'professional' | 'casual' | 'humorous';
  maxLength?: number;
  enabled: boolean;
  useEmojis: boolean;
}

export interface Post {
  id: string;
  content: string;
  platform: 'twitter' | 'linkedin' | 'instagram' | 'facebook';
  status: 'draft' | 'published';
  createdAt: Date;
}

export interface AIPrompt {
  topic: string;
  tone: 'professional' | 'casual' | 'humorous';
  platform: 'twitter' | 'linkedin' | 'instagram' | 'facebook';
  systemPrompt: string;
  useEmojis: boolean;
}

export interface LLMConfig {
  id: string;
  name: string;
  apiKey: string;
  apiEndpoint?: string;
  isActive: boolean;
}

export type LLMProvider = 'openai' | 'anthropic' | 'custom';