import React from 'react';
import { Twitter, Linkedin, Instagram, Settings2, Facebook } from 'lucide-react';
import { useSettingsStore } from '../store/settingsStore';

const platformIcons = {
  twitter: Twitter,
  linkedin: Linkedin,
  instagram: Instagram,
  facebook: Facebook,
};

export default function Sidebar() {
  const { platformSettings, updateSettings, togglePlatform } = useSettingsStore();

  return (
    <div className="w-80 bg-neutral-800 border-r border-neutral-700 h-screen overflow-y-auto p-4">
      <div className="flex items-center gap-2 mb-6">
        <Settings2 className="text-emerald-500" size={24} />
        <h2 className="text-lg font-semibold text-white">Platform Settings</h2>
      </div>

      <div className="space-y-6">
        {platformSettings.map((settings) => {
          const Icon = platformIcons[settings.platform];
          return (
            <div key={settings.id} className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Icon size={20} className={settings.enabled ? 'text-emerald-500' : 'text-neutral-500'} />
                  <span className="font-medium text-white capitalize">{settings.platform}</span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.enabled}
                    onChange={() => togglePlatform(settings.id)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-neutral-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                </label>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-neutral-300">System Prompt</label>
                <textarea
                  value={settings.systemPrompt}
                  onChange={(e) =>
                    updateSettings(settings.id, { systemPrompt: e.target.value })
                  }
                  className="w-full h-24 text-sm p-2 bg-neutral-900 text-white border-neutral-700 rounded-lg resize-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />

                <div className="flex items-center justify-between">
                  <label className="block text-sm font-medium text-neutral-300">Use Emojis</label>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.useEmojis}
                      onChange={(e) =>
                        updateSettings(settings.id, { useEmojis: e.target.checked })
                      }
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-neutral-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                  </label>
                </div>

                <label className="block text-sm font-medium text-neutral-300">Tone</label>
                <select
                  value={settings.tone}
                  onChange={(e) =>
                    updateSettings(settings.id, { tone: e.target.value as any })
                  }
                  className="w-full p-2 text-sm bg-neutral-900 text-white border-neutral-700 rounded-lg"
                >
                  <option value="professional">Professional</option>
                  <option value="casual">Casual</option>
                  <option value="humorous">Humorous</option>
                </select>

                {settings.maxLength && (
                  <div>
                    <label className="block text-sm font-medium text-neutral-300">
                      Maximum Length
                    </label>
                    <input
                      type="number"
                      value={settings.maxLength}
                      onChange={(e) =>
                        updateSettings(settings.id, {
                          maxLength: parseInt(e.target.value),
                        })
                      }
                      className="w-full p-2 text-sm bg-neutral-900 text-white border-neutral-700 rounded-lg"
                    />
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}