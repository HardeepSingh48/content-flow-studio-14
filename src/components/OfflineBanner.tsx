import { useState, useEffect } from 'react';
import { WifiOff, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';

export function OfflineBanner() {
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  const [isReconnecting, setIsReconnecting] = useState(false);

  useEffect(() => {
    const handleOnline = () => {
      setIsOffline(false);
      setIsReconnecting(false);
    };
    
    const handleOffline = () => {
      setIsOffline(true);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const handleRetry = () => {
    setIsReconnecting(true);
    // Check connection by trying to fetch
    fetch('/api/health', { method: 'HEAD' })
      .then(() => {
        setIsOffline(false);
        setIsReconnecting(false);
      })
      .catch(() => {
        setIsReconnecting(false);
      });
  };

  return (
    <AnimatePresence>
      {isOffline && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="bg-warning/10 border-b border-warning/30 overflow-hidden"
        >
          <div className="container mx-auto px-4 py-2 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <WifiOff className="w-4 h-4 text-warning" />
              <span className="text-sm text-warning">
                You're offline. Changes will sync when reconnected.
              </span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleRetry}
              disabled={isReconnecting}
              className="text-warning hover:text-warning hover:bg-warning/10"
            >
              <RefreshCw className={`w-4 h-4 mr-2 ${isReconnecting ? 'animate-spin' : ''}`} />
              Retry
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
