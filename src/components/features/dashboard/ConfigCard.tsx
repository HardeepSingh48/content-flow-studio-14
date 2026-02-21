import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Loader2, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

interface Field {
  name: string;
  label: string;
  type: 'text' | 'password' | 'select';
  placeholder?: string;
  options?: { value: string; label: string }[];
  required?: boolean;
}

interface ConfigCardProps {
  title: string;
  icon: string;
  fields: Field[];
  isConnected?: boolean;
  onSave: (values: Record<string, string>) => Promise<void>;
  onTest?: () => Promise<boolean>;
  onDisconnect?: () => Promise<void>;
  showOAuth?: boolean;
  onOAuthConnect?: () => void;
}

export const ConfigCard = ({
  title,
  icon,
  fields,
  isConnected = false,
  onSave,
  onTest,
  onDisconnect,
  showOAuth,
  onOAuthConnect,
}: ConfigCardProps) => {
  const [values, setValues] = useState<Record<string, string>>({});
  const [showPasswords, setShowPasswords] = useState<Record<string, boolean>>({});
  const [isSaving, setIsSaving] = useState(false);
  const [isTesting, setIsTesting] = useState(false);
  const [isDisconnecting, setIsDisconnecting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (name: string, value: string) => {
    setValues((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const togglePasswordVisibility = (name: string) => {
    setShowPasswords((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    fields.forEach((field) => {
      if (field.required && !values[field.name]?.trim()) {
        newErrors[field.name] = `${field.label} is required`;
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validate()) return;
    setIsSaving(true);
    try {
      await onSave(values);
    } finally {
      setIsSaving(false);
    }
  };

  const handleTest = async () => {
    if (!onTest) return;
    setIsTesting(true);
    try {
      await onTest();
    } finally {
      setIsTesting(false);
    }
  };

  const handleDisconnect = async () => {
    if (!onDisconnect) return;
    setIsDisconnecting(true);
    try {
      await onDisconnect();
    } finally {
      setIsDisconnecting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/5 border border-white/10 backdrop-blur-sm rounded-xl p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <span className="text-2xl">{icon}</span>
          <h3 className="text-lg font-semibold text-white">{title}</h3>
        </div>
        {isConnected && (
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-green-400 text-sm">
              <Check className="h-4 w-4" />
              Connected
            </div>
            {onDisconnect && (
              <Button
                variant="secondary"
                size="sm"
                onClick={handleDisconnect}
                disabled={isDisconnecting}
                className="text-error-400 border border-error-500/30 hover:bg-error-500 hover:text-white bg-transparent"
              >
                {isDisconnecting ? (
                  <>
                    <Loader2 className="h-3 w-3 mr-1 animate-spin" />
                    Disconnecting...
                  </>
                ) : (
                  'Disconnect'
                )}
              </Button>
            )}
          </div>
        )}
      </div>

      {showOAuth ? (
        <Button
          variant="secondary"
          className="w-full bg-white/5 border border-white/10 text-white hover:bg-white/10"
          onClick={onOAuthConnect}
        >
          Connect with OAuth
        </Button>
      ) : (
        <div className="space-y-4">
          {fields.map((field) => (
            <div key={field.name} className="space-y-2">
              <Label htmlFor={field.name} className="text-white/60 text-xs font-bold uppercase tracking-wider">
                {field.label}
                {field.required && <span className="text-error-500 ml-1">*</span>}
              </Label>
              {field.type === 'select' ? (
                <select
                  id={field.name}
                  value={values[field.name] || ''}
                  onChange={(e) => handleChange(field.name, e.target.value)}
                  className={cn(
                    'flex h-11 w-full rounded-md border border-white/10 bg-white/5 px-3 py-2',
                    'text-white transition-colors',
                    'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary focus-visible:bg-white/10',
                    errors[field.name] && 'border-error-500'
                  )}
                >
                  <option value="">Select...</option>
                  {field.options?.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              ) : (
                <div className="relative">
                  <Input
                    id={field.name}
                    type={
                      field.type === 'password' && !showPasswords[field.name]
                        ? 'password'
                        : 'text'
                    }
                    placeholder={field.placeholder}
                    value={values[field.name] || ''}
                    onChange={(e) => handleChange(field.name, e.target.value)}
                    className={cn(
                      'bg-white/5 focus:bg-white/10 h-11 border-white/10 text-white transition-colors',
                      errors[field.name] && 'border-error-500',
                      field.type === 'password' && 'pr-10'
                    )}
                  />
                  {field.type === 'password' && (
                    <button
                      type="button"
                      onClick={() => togglePasswordVisibility(field.name)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white"
                    >
                      {showPasswords[field.name] ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  )}
                </div>
              )}
              {errors[field.name] && (
                <p className="text-sm text-error-500">{errors[field.name]}</p>
              )}
            </div>
          ))}

          <div className="flex gap-3 pt-2">
            <Button onClick={handleSave} disabled={isSaving} className="flex-1">
              {isSaving ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                'Save'
              )}
            </Button>
            {onTest && (
              <Button
                variant="secondary"
                onClick={handleTest}
                disabled={isTesting}
                className="bg-white/5 border border-white/10 text-white hover:bg-white/10"
              >
                {isTesting ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Testing...
                  </>
                ) : (
                  'Test Connection'
                )}
              </Button>
            )}
          </div>
        </div>
      )}
    </motion.div>
  );
};
