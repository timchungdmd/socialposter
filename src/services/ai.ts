import OpenAI from 'openai';
import { AIPrompt } from '../types';
import { useLLMStore } from '../store/llmStore';

export async function generateContent(prompt: AIPrompt): Promise<string> {
  const { configs, activeConfigId } = useLLMStore.getState();
  const activeConfig = configs.find((config) => config.id === activeConfigId);

  if (!activeConfig?.apiKey) {
    throw new Error('No active LLM configuration found. Please set up your API credentials.');
  }

  try {
    const openai = new OpenAI({
      apiKey: activeConfig.apiKey,
      baseURL: activeConfig.apiEndpoint,
      dangerouslyAllowBrowser: true // For demo purposes only
    });

    const emojiInstruction = prompt.useEmojis
      ? "Use appropriate emojis to enhance engagement and visual appeal. Place emojis strategically throughout the content."
      : "Do not use emojis in the content.";

    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: `${prompt.systemPrompt}\n${emojiInstruction}\nTone: ${prompt.tone}`
        },
        {
          role: 'user',
          content: `Create a ${prompt.platform} post about: ${prompt.topic}`
        }
      ],
      model: 'gpt-3.5-turbo',
    });

    return completion.choices[0]?.message?.content || 'Unable to generate content';
  } catch (error) {
    console.error('Error generating content:', error);
    throw new Error('Failed to generate content');
  }
}