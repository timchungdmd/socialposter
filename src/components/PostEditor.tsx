import React, { useState } from 'react';
import { Sparkles, Send } from 'lucide-react';
import { generateContent } from '../services/ai';
import { usePostStore } from '../store/postStore';
import { useSettingsStore } from '../store/settingsStore';
import toast from 'react-hot-toast';

export default function PostEditor() {
  const [content, setContent] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const addPost = usePostStore((state) => state.addPost);
  const platformSettings = useSettingsStore((state) => state.platformSettings);

  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      const enabledPlatforms = platformSettings.filter((p) => p.enabled);
      const results = await Promise.all(
        enabledPlatforms.map((settings) =>
          generateContent({
            topic: content,
            tone: settings.tone,
            platform: settings.platform,
            systemPrompt: settings.systemPrompt,
            useEmojis: settings.useEmojis,
          })
        )
      );

      results.forEach((result, index) => {
        const platform = enabledPlatforms[index];
        addPost({
          id: Date.now().toString() + index,
          content: result,
          platform: platform.platform,
          status: 'draft',
          createdAt: new Date(),
        });
      });

      toast.success('Content generated for all platforms!');
      setContent('');
    } catch (error) {
      toast.error('Failed to generate content');
    } finally {
      setIsGenerating(false);
    }
  };

  const enabledPlatformsCount = platformSettings.filter((p) => p.enabled).length;

  return (
    <div className="bg-neutral-800 rounded-lg shadow-lg p-6 border border-neutral-700">
      <div className="mb-4">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="What's on your mind? Type your topic or draft content here..."
          className="w-full h-32 p-3 bg-neutral-900 text-white border-neutral-700 rounded-lg resize-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent placeholder-neutral-500"
        />
      </div>
      
      <div className="flex gap-3">
        <button
          onClick={handleGenerate}
          disabled={isGenerating || !content || enabledPlatformsCount === 0}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-600 to-emerald-500 text-white rounded-lg hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isGenerating ? <Sparkles className="animate-spin" size={20} /> : <Send size={20} />}
          {isGenerating
            ? 'Generating...'
            : `Generate for ${enabledPlatformsCount} platform${
                enabledPlatformsCount !== 1 ? 's' : ''
              }`}
        </button>
      </div>
    </div>
  );
}