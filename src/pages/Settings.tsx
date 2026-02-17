import { useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { User, Sliders, Users, CreditCard, Upload, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { getProfile, getPreferences, updateProfile, updatePreferences, uploadAvatar, updatePassword } from '@/services/settings';
import { toast } from 'sonner';
import { Skeleton } from '@/components/ui/skeleton';
import { LinkedInPageSelectionModal } from '@/components/integrations/LinkedInPageSelectionModal';
import { useEffect } from 'react';

const tabs = [
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'preferences', label: 'Preferences', icon: Sliders },
  { id: 'team', label: 'Team', icon: Users, disabled: true },
  { id: 'billing', label: 'Billing', icon: CreditCard, disabled: true },
];

const platforms = [
  { id: 'article', label: 'Article' },
  { id: 'twitter', label: 'Twitter' },
  { id: 'linkedin', label: 'LinkedIn' },
  { id: 'reel', label: 'Reel Script' },
];

export default function Settings() {
  const [activeTab, setActiveTab] = useState('profile');
  const [passwords, setPasswords] = useState({ current: '', new: '', confirm: '' });

  const { data: profile, isLoading: profileLoading } = useQuery({
    queryKey: ['profile'],
    queryFn: getProfile,
  });

  const { data: preferences, isLoading: preferencesLoading } = useQuery({
    queryKey: ['preferences'],
    queryFn: getPreferences,
  });

  const [localProfile, setLocalProfile] = useState({ name: '' });
  const [localPrefs, setLocalPrefs] = useState<{
    defaultTone: 'professional' | 'casual' | 'friendly' | 'formal';
    defaultLength: 'short' | 'medium' | 'long';
    autoFixGuardrails: boolean;
    notifications: {
      contentPublished: boolean;
      publishingFailures: boolean;
      weeklySummary: boolean;
    };
    defaultPlatforms: string[];
    aiModel: 'gpt-4' | 'gpt-3.5' | 'claude' | 'gemini';
    temperature: number;
    maxTokens: number;
  }>({
    defaultTone: 'professional',
    defaultLength: 'medium',
    autoFixGuardrails: true,
    notifications: {
      contentPublished: true,
      publishingFailures: true,
      weeklySummary: false,
    },
    defaultPlatforms: ['article', 'linkedin'],
    aiModel: 'gpt-4',
    temperature: 0.7,
    maxTokens: 2048,
  });

  // Initialize local state when data loads
  useState(() => {
    if (profile) setLocalProfile({ name: profile.name });
    if (preferences) setLocalPrefs(preferences);
  });

  const profileMutation = useMutation({
    mutationFn: updateProfile,
    onSuccess: () => toast.success('Profile updated'),
    onError: () => toast.error('Failed to update profile'),
  });

  const prefsMutation = useMutation({
    mutationFn: updatePreferences,
    onSuccess: () => toast.success('Preferences saved'),
    onError: () => toast.error('Failed to save preferences'),
  });

  const passwordMutation = useMutation({
    mutationFn: () => updatePassword(passwords.current, passwords.new),
    onSuccess: () => {
      toast.success('Password updated');
      setPasswords({ current: '', new: '', confirm: '' });
    },
    onError: () => toast.error('Failed to update password'),
  });

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      await uploadAvatar(file);
      toast.success('Avatar uploaded');
    } catch {
      toast.error('Failed to upload avatar');
    }
  };

  const handlePasswordSubmit = () => {
    if (passwords.new !== passwords.confirm) {
      toast.error('Passwords do not match');
      return;
    }
    if (passwords.new.length < 8) {
      toast.error('Password must be at least 8 characters');
      return;
    }
    passwordMutation.mutate();
  };

  const [isLinkedInModalOpen, setIsLinkedInModalOpen] = useState(false);
  const [linkedInPages, setLinkedInPages] = useState<any[]>([]);
  const [masterIntegrationId, setMasterIntegrationId] = useState('');

  // Listen for OAuth success messages from popup
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data?.type === 'oauth_success' && event.data?.provider === 'linkedin') {
        if (event.data.pages && event.data.pages.length > 0) {
          // Open modal for page selection
          setLinkedInPages(event.data.pages);
          setMasterIntegrationId(event.data.integrationId);
          setIsLinkedInModalOpen(true);
        } else {
          toast.success('LinkedIn connected successfully');
          // Refresh integrations list if needed (not implemented here, but good practice)
        }
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  return (
    <div className="flex gap-6 max-w-5xl">
      <LinkedInPageSelectionModal
        isOpen={isLinkedInModalOpen}
        onClose={() => setIsLinkedInModalOpen(false)}
        pages={linkedInPages}
        masterIntegrationId={masterIntegrationId}
        onSuccess={() => {
          // Refresh logic could go here
        }}
      />
      {/* Sidebar Navigation */}
      <div className="w-48 flex-shrink-0">
        <nav className="space-y-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => !tab.disabled && setActiveTab(tab.id)}
              disabled={tab.disabled}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${activeTab === tab.id
                ? 'bg-primary text-primary-foreground'
                : tab.disabled
                  ? 'text-muted-foreground/50 cursor-not-allowed'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
              {tab.disabled && (
                <span className="text-xs bg-muted px-1.5 py-0.5 rounded ml-auto">Soon</span>
              )}
            </button>
          ))}
        </nav>
      </div>

      {/* Content Area */}
      <div className="flex-1">
        {activeTab === 'profile' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div>
              <h2 className="text-xl font-semibold text-foreground">Profile Settings</h2>
              <p className="text-sm text-muted-foreground">Manage your account information</p>
            </div>

            {profileLoading ? (
              <Skeleton className="h-64 w-full rounded-xl" />
            ) : (
              <div className="glass rounded-xl p-6 space-y-6">
                {/* Avatar */}
                <div className="flex items-center gap-6">
                  <Avatar className="w-20 h-20">
                    <AvatarImage src={profile?.avatarUrl} />
                    <AvatarFallback className="text-xl">
                      {profile?.name?.charAt(0) || 'U'}
                    </AvatarFallback>
                  </Avatar>
                  <div className="space-y-2">
                    <Label htmlFor="avatar-upload" className="cursor-pointer">
                      <Button variant="outline" asChild>
                        <span>
                          <Upload className="w-4 h-4 mr-2" />
                          Change Photo
                        </span>
                      </Button>
                    </Label>
                    <input
                      id="avatar-upload"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleAvatarUpload}
                    />
                    {profile?.avatarUrl && (
                      <Button variant="ghost" size="sm" className="text-destructive">
                        <X className="w-4 h-4 mr-1" />
                        Remove
                      </Button>
                    )}
                  </div>
                </div>

                <Separator />

                {/* Profile Form */}
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      value={localProfile.name || profile?.name || ''}
                      onChange={(e) => setLocalProfile({ ...localProfile, name: e.target.value })}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" value={profile?.email || ''} disabled className="opacity-60" />
                    <p className="text-xs text-muted-foreground">Email cannot be changed</p>
                  </div>
                </div>

                <Button onClick={() => profileMutation.mutate(localProfile)}>
                  Update Profile
                </Button>

                <Separator />

                {/* Password Change */}
                <div className="space-y-4">
                  <h3 className="font-medium text-foreground">Change Password</h3>
                  <div className="grid gap-4 max-w-md">
                    <div className="grid gap-2">
                      <Label htmlFor="current-password">Current Password</Label>
                      <Input
                        id="current-password"
                        type="password"
                        value={passwords.current}
                        onChange={(e) => setPasswords({ ...passwords, current: e.target.value })}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="new-password">New Password</Label>
                      <Input
                        id="new-password"
                        type="password"
                        value={passwords.new}
                        onChange={(e) => setPasswords({ ...passwords, new: e.target.value })}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="confirm-password">Confirm Password</Label>
                      <Input
                        id="confirm-password"
                        type="password"
                        value={passwords.confirm}
                        onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })}
                      />
                    </div>
                    <Button variant="outline" onClick={handlePasswordSubmit}>
                      Change Password
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        )}

        {activeTab === 'preferences' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div>
              <h2 className="text-xl font-semibold text-foreground">Preferences</h2>
              <p className="text-sm text-muted-foreground">Customize your content generation</p>
            </div>

            {preferencesLoading ? (
              <Skeleton className="h-96 w-full rounded-xl" />
            ) : (
              <div className="space-y-6">
                {/* Content Generation */}
                <div className="glass rounded-xl p-6 space-y-6">
                  <h3 className="font-medium text-foreground">Content Generation</h3>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label>Default Tone</Label>
                      <Select
                        value={localPrefs.defaultTone}
                        onValueChange={(value: typeof localPrefs.defaultTone) =>
                          setLocalPrefs({ ...localPrefs, defaultTone: value })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="professional">Professional</SelectItem>
                          <SelectItem value="casual">Casual</SelectItem>
                          <SelectItem value="friendly">Friendly</SelectItem>
                          <SelectItem value="formal">Formal</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Default Length</Label>
                      <Select
                        value={localPrefs.defaultLength}
                        onValueChange={(value: typeof localPrefs.defaultLength) =>
                          setLocalPrefs({ ...localPrefs, defaultLength: value })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="short">Short</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="long">Long</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Auto-fix Guardrails</Label>
                      <p className="text-xs text-muted-foreground">
                        Automatically fix content that violates guidelines
                      </p>
                    </div>
                    <Switch
                      checked={localPrefs.autoFixGuardrails}
                      onCheckedChange={(checked) =>
                        setLocalPrefs({ ...localPrefs, autoFixGuardrails: checked })
                      }
                    />
                  </div>
                </div>

                {/* Notifications */}
                <div className="glass rounded-xl p-6 space-y-4">
                  <h3 className="font-medium text-foreground">Notifications</h3>

                  <div className="space-y-4">
                    {[
                      { key: 'contentPublished', label: 'Content published', desc: 'When your content is successfully published' },
                      { key: 'publishingFailures', label: 'Publishing failures', desc: 'When publishing fails' },
                      { key: 'weeklySummary', label: 'Weekly summary', desc: 'Weekly analytics digest' },
                    ].map((item) => (
                      <div key={item.key} className="flex items-center justify-between">
                        <div>
                          <Label>{item.label}</Label>
                          <p className="text-xs text-muted-foreground">{item.desc}</p>
                        </div>
                        <Switch
                          checked={localPrefs.notifications[item.key as keyof typeof localPrefs.notifications]}
                          onCheckedChange={(checked) =>
                            setLocalPrefs({
                              ...localPrefs,
                              notifications: { ...localPrefs.notifications, [item.key]: checked },
                            })
                          }
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Default Platforms */}
                <div className="glass rounded-xl p-6 space-y-4">
                  <h3 className="font-medium text-foreground">Default Platform Selection</h3>
                  <p className="text-sm text-muted-foreground">
                    Platforms auto-selected in content wizard
                  </p>

                  <div className="grid grid-cols-2 gap-3">
                    {platforms.map((platform) => (
                      <div key={platform.id} className="flex items-center gap-2">
                        <Checkbox
                          id={platform.id}
                          checked={localPrefs.defaultPlatforms.includes(platform.id)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setLocalPrefs({
                                ...localPrefs,
                                defaultPlatforms: [...localPrefs.defaultPlatforms, platform.id],
                              });
                            } else {
                              setLocalPrefs({
                                ...localPrefs,
                                defaultPlatforms: localPrefs.defaultPlatforms.filter(
                                  (p) => p !== platform.id
                                ),
                              });
                            }
                          }}
                        />
                        <Label htmlFor={platform.id}>{platform.label}</Label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* AI Model Settings */}
                <div className="glass rounded-xl p-6 space-y-6">
                  <h3 className="font-medium text-foreground">AI Model Preferences</h3>

                  <div className="space-y-2">
                    <Label>Preferred Model</Label>
                    <Select
                      value={localPrefs.aiModel}
                      onValueChange={(value: typeof localPrefs.aiModel) =>
                        setLocalPrefs({ ...localPrefs, aiModel: value })
                      }
                    >
                      <SelectTrigger className="w-full sm:w-64">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="gpt-4">GPT-4</SelectItem>
                        <SelectItem value="gpt-3.5">GPT-3.5</SelectItem>
                        <SelectItem value="claude">Claude</SelectItem>
                        <SelectItem value="gemini">Gemini</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Label>Temperature: {localPrefs.temperature}</Label>
                      <p className="text-xs text-muted-foreground mb-3">
                        Higher values make output more creative
                      </p>
                      <Slider
                        value={[localPrefs.temperature]}
                        onValueChange={([value]) =>
                          setLocalPrefs({ ...localPrefs, temperature: value })
                        }
                        min={0}
                        max={1}
                        step={0.1}
                        className="w-full sm:w-64"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="max-tokens">Max Tokens</Label>
                      <Input
                        id="max-tokens"
                        type="number"
                        value={localPrefs.maxTokens}
                        onChange={(e) =>
                          setLocalPrefs({ ...localPrefs, maxTokens: parseInt(e.target.value) || 0 })
                        }
                        className="w-full sm:w-64"
                      />
                    </div>
                  </div>
                </div>

                <Button onClick={() => prefsMutation.mutate(localPrefs)}>
                  Save Preferences
                </Button>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
}
