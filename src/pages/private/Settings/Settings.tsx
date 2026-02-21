import { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Sliders, Users, CreditCard, Upload, X, Link as LinkIcon, Loader2, Save, LogOut, ShieldCheck, Bell, Globe, Sparkles } from 'lucide-react';
import { api } from '@/services/api';
import { toast } from 'sonner';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { LinkedInPageSelectionModal } from '@/components/features/integrations/LinkedInPageSelectionModal';
import { Badge } from '@/components/ui/badge';
import { PageHeader } from '@/components/layout/PageHeader';
import { Card, CardHeader, CardTitle, CardBody } from '@/components/ui/card';
import { cn } from '@/lib/utils';

// Mock functions
const updatePassword = async (current: string, newPass: string) => {
  return new Promise(resolve => setTimeout(resolve, 1000));
};

const uploadAvatar = async (file: File) => {
  return new Promise(resolve => setTimeout(resolve, 1000));
};

const tabs = [
  { id: 'profile', label: 'General', icon: User, description: 'Manage your public profile and account details.' },
  { id: 'preferences', label: 'Preferences', icon: Sliders, description: 'Customize your default content generation settings.' },
  { id: 'integrations', label: 'Integrations', icon: LinkIcon, description: 'Connect and manage your social platforms.' },
  { id: 'team', label: 'Team', icon: Users, disabled: true, description: 'Manage team members and roles.' },
  { id: 'billing', label: 'Billing', icon: CreditCard, disabled: true, description: 'Manage subscriptions and payment methods.' },
];

const platforms = [
  { id: 'article', label: 'Medium Article', icon: '📝' },
  { id: 'twitter', label: 'Twitter / X Thread', icon: '🐦' },
  { id: 'linkedin', label: 'LinkedIn Post', icon: '💼' },
  { id: 'reel', label: 'Reel / Short Script', icon: '🎬' },
];

export default function Settings() {
  const [activeTab, setActiveTab] = useState('profile');
  const [passwords, setPasswords] = useState({ current: '', new: '', confirm: '' });

  const { data: profile, isLoading: profileLoading } = useQuery({
    queryKey: ['profile'],
    queryFn: () => api.getProfile(),
  });

  const { data: preferences, isLoading: preferencesLoading } = useQuery({
    queryKey: ['preferences'],
    queryFn: () => api.getPreferences(),
  });

  const { data: integrationStatus, isLoading: integrationsLoading } = useQuery({
    queryKey: ['integration-status'],
    queryFn: () => api.getIntegrationStatus(),
  });

  const [localProfile, setLocalProfile] = useState({ name: '' });
  const [localPrefs, setLocalPrefs] = useState<any>({
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

  useEffect(() => {
    if (profile) setLocalProfile({ name: profile.name });
    if (preferences) setLocalPrefs(preferences);
  }, [profile, preferences]);

  const profileMutation = useMutation({
    mutationFn: (data: any) => api.updateProfile(data),
    onSuccess: () => toast.success('Profile updated'),
    onError: () => toast.error('Failed to update profile'),
  });

  const prefsMutation = useMutation({
    mutationFn: (data: any) => api.updatePreferences(data),
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

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data?.type === 'oauth_success' && event.data?.provider === 'linkedin') {
        if (event.data.pages && event.data.pages.length > 0) {
          setLinkedInPages(event.data.pages);
          setMasterIntegrationId(event.data.integrationId);
          setIsLinkedInModalOpen(true);
        } else {
          toast.success('LinkedIn connected successfully');
        }
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  const activeTabData = tabs.find(t => t.id === activeTab);

  return (
    <div className="max-w-6xl mx-auto pb-20">
      <LinkedInPageSelectionModal
        isOpen={isLinkedInModalOpen}
        onClose={() => setIsLinkedInModalOpen(false)}
        pages={linkedInPages}
        masterIntegrationId={masterIntegrationId}
        onSuccess={() => { }}
      />

      <PageHeader
        title="Settings"
        subtitle="Manage your account, preferences, and integrations."
        actions={
          <Button variant="ghost" className="text-error-600 hover:bg-error-50" icon={<LogOut size={16} />}>
            Sign Out
          </Button>
        }
        className="py-0 mb-8 border-none"
      />

      <div className="flex flex-col lg:flex-row gap-10">
        {/* Sidebar Navigation */}
        <aside className="w-full lg:w-64 flex-shrink-0">
          <nav className="flex lg:flex-col gap-1 overflow-x-auto pb-4 lg:pb-0 scrollbar-hide">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => !tab.disabled && setActiveTab(tab.id)}
                disabled={tab.disabled}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all whitespace-nowrap",
                  activeTab === tab.id
                    ? "bg-primary text-white shadow-lg shadow-primary/20"
                    : tab.disabled
                      ? "text-white/30 cursor-not-allowed opacity-50"
                      : "text-white/50 hover:text-white hover:bg-white/10"
                )}
              >
                <tab.icon className={cn("size-4.5", activeTab === tab.id ? "text-white" : "text-white/40")} />
                {tab.label}
                {tab.disabled && (
                  <span className="text-[10px] bg-white/10 text-white/40 px-1.5 py-0.5 rounded-md ml-auto">Soon</span>
                )}
              </button>
            ))}
          </nav>
        </aside>

        {/* Content Area */}
        <div className="flex-1 min-w-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
              className="space-y-8"
            >
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-white">{activeTabData?.label} Settings</h2>
                <p className="text-white/50 mt-1">{activeTabData?.description}</p>
              </div>

              {activeTab === 'profile' && (
                <div className="space-y-8">
                  <Card className="border-white/10 bg-white/5 backdrop-blur-sm shadow-[0_0_15px_rgba(255,255,255,0.05)]">
                    <CardHeader>
                      <CardTitle className="text-lg font-bold flex items-center gap-2 text-white">
                        <User className="size-5 text-primary" />
                        Account Information
                      </CardTitle>
                    </CardHeader>
                    <CardBody className="space-y-8">
                      {/* Avatar Upload */}
                      <div className="flex items-center gap-8">
                        <div className="relative group">
                          <Avatar className="w-24 h-24 ring-4 ring-white/10 group-hover:ring-primary/50 transition-all">
                            <AvatarImage src={profile?.avatarUrl} />
                            <AvatarFallback className="text-2xl font-bold bg-primary/20 text-primary">
                              {profile?.name?.charAt(0) || 'U'}
                            </AvatarFallback>
                          </Avatar>
                          <label htmlFor="avatar-upload" className="absolute -bottom-1 -right-1 p-2 bg-white/10 border border-white/20 rounded-full shadow-lg cursor-pointer hover:bg-white/20 transition-colors">
                            <Upload className="size-4 text-white" />
                            <input id="avatar-upload" type="file" accept="image/*" className="hidden" onChange={handleAvatarUpload} />
                          </label>
                        </div>
                        <div className="space-y-1">
                          <h4 className="font-bold text-white">Profile Picture</h4>
                          <p className="text-sm text-white/50 max-w-xs">JPG, GIF or PNG. Max size of 800K.</p>
                          <div className="flex gap-4 mt-4">
                            <Button variant="ghost" size="sm" className="text-error-600 hover:bg-error-50 font-bold">
                              <X className="size-4 mr-2" />
                              Remove
                            </Button>
                          </div>
                        </div>
                      </div>

                      <Separator className="bg-white/10" />

                      <div className="grid gap-6 sm:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="name" className="text-xs font-bold text-white/40 uppercase tracking-wider">Full Name</Label>
                          <Input
                            id="name"
                            value={localProfile.name || profile?.name || ''}
                            onChange={(e) => setLocalProfile({ ...localProfile, name: e.target.value })}
                            className="bg-white/5 focus:bg-white/10 transition-colors h-11 border-white/10 text-white"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email" className="text-xs font-bold text-white/40 uppercase tracking-wider">Email Address</Label>
                          <Input id="email" value={profile?.email || ''} disabled className="bg-white/5 opacity-60 h-11 cursor-not-allowed border-white/10 text-white" />
                        </div>
                      </div>

                      <div className="flex justify-end pt-4">
                        <Button
                          onClick={() => profileMutation.mutate(localProfile)}
                          loading={profileMutation.isPending}
                          icon={<Save size={18} />}
                          className="px-8 shadow-lg shadow-primary-500/15"
                        >
                          Save Changes
                        </Button>
                      </div>
                    </CardBody>
                  </Card>

                  <Card className="border-white/10 bg-white/5 backdrop-blur-sm shadow-[0_0_15px_rgba(255,255,255,0.05)]">
                    <CardHeader>
                      <CardTitle className="text-lg font-bold flex items-center gap-2 text-white">
                        <ShieldCheck className="size-5 text-primary" />
                        Password & Security
                      </CardTitle>
                    </CardHeader>
                    <CardBody className="space-y-6">
                      <div className="grid gap-6 sm:grid-cols-3">
                        <div className="space-y-2">
                          <Label htmlFor="current-password" className="text-xs font-bold text-white/40 uppercase tracking-wider">Current Password</Label>
                          <Input
                            id="current-password"
                            type="password"
                            value={passwords.current}
                            onChange={(e) => setPasswords({ ...passwords, current: e.target.value })}
                            className="bg-white/5 focus:bg-white/10 h-11 border-white/10 text-white"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="new-password" className="text-xs font-bold text-white/40 uppercase tracking-wider">New Password</Label>
                          <Input
                            id="new-password"
                            type="password"
                            value={passwords.new}
                            onChange={(e) => setPasswords({ ...passwords, new: e.target.value })}
                            className="bg-white/5 focus:bg-white/10 h-11 border-white/10 text-white"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="confirm-password" className="text-xs font-bold text-white/40 uppercase tracking-wider">Confirm New Password</Label>
                          <Input
                            id="confirm-password"
                            type="password"
                            value={passwords.confirm}
                            onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })}
                            className="bg-white/5 focus:bg-white/10 h-11 border-white/10 text-white"
                          />
                        </div>
                      </div>
                      <div className="flex justify-end pt-2">
                        <Button
                          variant="secondary"
                          onClick={handlePasswordSubmit}
                          loading={passwordMutation.isPending}
                          className="font-bold border-white/10 bg-white/5 text-white hover:bg-white/10"
                        >
                          Update Password
                        </Button>
                      </div>
                    </CardBody>
                  </Card>
                </div>
              )}

              {activeTab === 'preferences' && (
                <div className="space-y-8">
                  <Card className="border-white/10 bg-white/5 backdrop-blur-sm shadow-[0_0_15px_rgba(255,255,255,0.05)]">
                    <CardHeader>
                      <CardTitle className="text-lg font-bold flex items-center gap-2 text-white">
                        <Sparkles className="size-5 text-primary" />
                        Content Generation
                      </CardTitle>
                    </CardHeader>
                    <CardBody className="space-y-8">
                      <div className="grid gap-8 sm:grid-cols-2">
                        <div className="space-y-2">
                          <Label className="text-xs font-bold text-white/40 uppercase tracking-wider">Default Tone</Label>
                          <Select
                            value={localPrefs.defaultTone}
                            onValueChange={(value: any) => setLocalPrefs({ ...localPrefs, defaultTone: value })}
                          >
                            <SelectTrigger className="h-11 border-white/10 bg-white/5 text-white">
                              <SelectValue placeholder="Select tone" />
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
                          <Label className="text-xs font-bold text-white/40 uppercase tracking-wider">Default Length</Label>
                          <Select
                            value={localPrefs.defaultLength}
                            onValueChange={(value: any) => setLocalPrefs({ ...localPrefs, defaultLength: value })}
                          >
                            <SelectTrigger className="h-11 border-white/10 bg-white/5 text-white">
                              <SelectValue placeholder="Select length" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="short">Short</SelectItem>
                              <SelectItem value="medium">Medium</SelectItem>
                              <SelectItem value="long">Long</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <Separator className="bg-white/10" />

                      <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10 italic">
                        <div className="space-y-0.5">
                          <Label className="font-bold text-white">Auto-fix Guardrails</Label>
                          <p className="text-xs text-white/50">Automatically fix content that violates system guidelines.</p>
                        </div>
                        <Switch
                          checked={localPrefs.autoFixGuardrails}
                          onCheckedChange={(checked) => setLocalPrefs({ ...localPrefs, autoFixGuardrails: checked })}
                        />
                      </div>

                      <div className="space-y-6">
                        <h4 className="text-xs font-bold text-white/40 uppercase tracking-wider">AI Model Settings</h4>
                        <div className="grid gap-8 lg:grid-cols-2">
                          <div className="space-y-3">
                            <Label className="text-sm font-bold text-white">Model: <span className="text-primary ml-1">{localPrefs.aiModel.toUpperCase()}</span></Label>
                            <Select
                              value={localPrefs.aiModel}
                              onValueChange={(value: any) => setLocalPrefs({ ...localPrefs, aiModel: value })}
                            >
                              <SelectTrigger className="h-11 border-white/10 bg-white/5 w-full text-white">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="gpt-4">GPT-4 Turbo</SelectItem>
                                <SelectItem value="gpt-3.5">GPT-3.5 Legacy</SelectItem>
                                <SelectItem value="claude">Claude 3 Opus</SelectItem>
                                <SelectItem value="gemini">Gemini 1.5 Pro</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-3">
                            <div className="flex justify-between">
                              <Label className="text-sm font-bold text-white">Temperature</Label>
                              <span className="text-sm font-bold text-primary bg-primary/20 px-2 rounded">{localPrefs.temperature}</span>
                            </div>
                            <Slider
                              value={[localPrefs.temperature]}
                              onValueChange={([value]) => setLocalPrefs({ ...localPrefs, temperature: value })}
                              min={0}
                              max={1}
                              step={0.1}
                              className="py-4"
                            />
                            <p className="text-[10px] text-white/40">Lower values are more focused, higher values more creative.</p>
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-end pt-4">
                        <Button onClick={() => prefsMutation.mutate(localPrefs)} loading={prefsMutation.isPending} icon={<Save size={18} />}>
                          Save Preferences
                        </Button>
                      </div>
                    </CardBody>
                  </Card>

                  <Card className="border-white/10 bg-white/5 backdrop-blur-sm shadow-[0_0_15px_rgba(255,255,255,0.05)]">
                    <CardHeader>
                      <CardTitle className="text-lg font-bold flex items-center gap-2 text-white">
                        <Bell className="size-5 text-primary" />
                        Notification Settings
                      </CardTitle>
                    </CardHeader>
                    <CardBody className="space-y-1">
                      {[
                        { key: 'contentPublished', label: 'Content Published', desc: 'Receive alerts when your content goes live successfully.' },
                        { key: 'publishingFailures', label: 'Publishing Failures', desc: 'Immediate notification if a post fails to publish.' },
                        { key: 'weeklySummary', label: 'Weekly Performance', desc: 'A summary of your weekly content engagement metrics.' },
                      ].map((item, idx) => (
                        <div key={item.key} className={cn(
                          "flex items-center justify-between py-4",
                          idx < 2 && "border-b border-white/10"
                        )}>
                          <div className="space-y-0.5">
                            <Label className="font-bold text-white">{item.label}</Label>
                            <p className="text-xs text-white/50">{item.desc}</p>
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
                    </CardBody>
                  </Card>
                </div>
              )}

              {activeTab === 'integrations' && (
                <div className="space-y-8">
                  <header className="bg-primary/20 p-6 rounded-2xl border border-primary/30 flex items-center gap-6 mb-8">
                    <div className="bg-primary p-3 rounded-xl shadow-lg shadow-primary/20">
                      <Globe className="size-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white">Connected Platforms</h3>
                      <p className="text-sm text-white/60">Sync your social accounts to automate multi-channel publishing.</p>
                    </div>
                  </header>

                  {integrationsLoading ? (
                    <Skeleton className="h-64 w-full rounded-xl" />
                  ) : (
                    <div className="space-y-10">
                      {(Object.entries(integrationStatus?.integrations || {}) as [string, any[]][]).map(([category, items]) => (
                        <div key={category} className="space-y-6">
                          <h4 className="text-xs font-bold text-white/40 uppercase tracking-widest pl-1">
                            {category === 'ai_generation' ? 'Intelligence Engines' :
                              category === 'publishing' ? 'Social Channels' :
                                'Creative Tools'}
                          </h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {items.map((integration: any) => {
                              const canConnect = integration.status === 'active' || (['ADMIN', 'ENTERPRISE'].includes(integrationStatus?.userRole) && integration.status === 'beta');

                              return (
                                <Card key={integration.id} className="border-white/10 bg-white/5 backdrop-blur-sm hover:border-primary/50 hover:bg-white/10 transition-all group overflow-hidden">
                                  <CardBody className="p-6">
                                    <div className="flex items-start justify-between mb-6">
                                      <div className="p-4 bg-black/20 rounded-xl group-hover:bg-primary/20 transition-colors">
                                        <img src={integration.icon} alt={integration.name} className="w-8 h-8 object-contain"
                                          onError={(e) => (e.currentTarget.src = 'https://placehold.co/32')} />
                                      </div>
                                      <div className="flex flex-col items-end gap-2">
                                        {integration.status === 'beta' && <Badge variant="warning" className="uppercase font-bold text-[9px] px-2 bg-warning-500/20 text-warning-400">Beta</Badge>}
                                        {integration.status === 'coming_soon' && <Badge variant="neutral" className="uppercase font-bold text-[9px] px-2 bg-white/10 text-white/40">Soon</Badge>}
                                        {integration.status === 'active' && <Badge variant="success" className="uppercase font-bold text-[9px] px-2 bg-success-500/20 text-success-400">Ready</Badge>}
                                      </div>
                                    </div>
                                    <div className="space-y-1">
                                      <h4 className="font-bold text-white text-lg">{integration.name}</h4>
                                      <p className="text-sm text-white/50 leading-relaxed min-h-[40px]">{integration.description}</p>
                                    </div>
                                    <div className="mt-6 pt-6 border-t border-white/10 flex justify-between items-center">
                                      <span className="text-[10px] font-bold text-white/40 uppercase tracking-tighter">API V2.4 Connected</span>
                                      <Button
                                        variant={canConnect ? "primary" : "secondary"}
                                        disabled={!canConnect}
                                        size="sm"
                                        className="font-bold rounded-lg px-6"
                                        onClick={() => {
                                          if (canConnect) {
                                            if (['openai', 'elevenlabs'].includes(integration.id)) {
                                              const key = prompt(`Enter API Key for ${integration.name}:`);
                                              if (key) toast.success(`API Key for ${integration.name} saved!`);
                                            } else {
                                              const width = 600, height = 700;
                                              const left = window.screen.width / 2 - width / 2, top = window.screen.height / 2 - height / 2;
                                              window.open(
                                                `${import.meta.env.VITE_API_URL || 'http://localhost:4000/api'}/auth/${integration.id}/connect?userId=current&token=${localStorage.getItem('token')}`,
                                                `Connect ${integration.name}`,
                                                `width=${width},height=${height},top=${top},left=${left}`
                                              );
                                            }
                                          }
                                        }}
                                      >
                                        {canConnect ? 'Connect' : 'Upgrade Plan'}
                                      </Button>
                                    </div>
                                  </CardBody>
                                </Card>
                              )
                            })}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
