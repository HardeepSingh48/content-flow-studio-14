import { CheckCircle, AlertTriangle, Wand2, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { GuardrailViolation } from '@/types/content';
import { cn } from '@/lib/utils';
import { useState } from 'react';

interface GuardrailCheckerProps {
  violations: GuardrailViolation[];
  onAutoFix: (violationId: string) => Promise<void>;
}

const GuardrailChecker = ({ violations, onAutoFix }: GuardrailCheckerProps) => {
  const [fixingId, setFixingId] = useState<string | null>(null);

  const handleFix = async (violationId: string) => {
    setFixingId(violationId);
    try {
      await onAutoFix(violationId);
    } finally {
      setFixingId(null);
    }
  };

  const allPassed = violations.length === 0;

  const defaultChecks = [
    { id: 'char_limit', label: 'Character limit OK', passed: true },
    { id: 'has_cta', label: 'Has CTA', passed: true },
    { id: 'has_hook', label: 'Strong opening hook', passed: true },
  ];

  const checks = violations.length > 0
    ? violations.map(v => ({
        id: v.id,
        label: v.message,
        passed: false,
        severity: v.severity,
        canAutoFix: v.canAutoFix,
      }))
    : defaultChecks;

  return (
    <div className="bg-card border border-border rounded-lg p-4">
      <h3 className="font-medium text-foreground mb-3">Content Guidelines</h3>
      
      <div className="space-y-2">
        {checks.map(check => (
          <div
            key={check.id}
            className={cn(
              'flex items-center justify-between p-2 rounded-lg',
              check.passed ? 'bg-green-500/10' : 'bg-amber-500/10'
            )}
          >
            <div className="flex items-center gap-2">
              {check.passed ? (
                <CheckCircle className="w-4 h-4 text-green-500" />
              ) : (
                <AlertTriangle className="w-4 h-4 text-amber-500" />
              )}
              <span className={cn(
                'text-sm',
                check.passed ? 'text-green-400' : 'text-amber-400'
              )}>
                {check.label}
              </span>
            </div>
            
            {!check.passed && 'canAutoFix' in check && check.canAutoFix && (
              <Button
                variant="ghost"
                size="sm"
                className="h-7 text-xs"
                onClick={() => handleFix(check.id)}
                disabled={fixingId === check.id}
              >
                {fixingId === check.id ? (
                  <Loader2 className="w-3 h-3 animate-spin mr-1" />
                ) : (
                  <Wand2 className="w-3 h-3 mr-1" />
                )}
                Auto-fix
              </Button>
            )}
          </div>
        ))}
      </div>
      
      {allPassed && (
        <p className="text-sm text-green-400 mt-3">
          ✓ All guidelines passed!
        </p>
      )}
    </div>
  );
};

export default GuardrailChecker;
