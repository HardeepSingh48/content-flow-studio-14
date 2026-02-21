import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, Building, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { api } from '@/services/api';
import { toast } from 'sonner';

interface LinkedInPage {
    id: string;
    name: string;
    picture?: string;
}

interface LinkedInPageSelectionModalProps {
    isOpen: boolean;
    onClose: () => void;
    pages: LinkedInPage[];
    masterIntegrationId: string;
    onSuccess: () => void;
}

export function LinkedInPageSelectionModal({
    isOpen,
    onClose,
    pages,
    masterIntegrationId,
    onSuccess
}: LinkedInPageSelectionModalProps) {
    const [selectedPageIds, setSelectedPageIds] = useState<string[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const togglePage = (pageId: string) => {
        setSelectedPageIds(prev =>
            prev.includes(pageId)
                ? prev.filter(id => id !== pageId)
                : [...prev, pageId]
        );
    };

    const toggleAll = () => {
        if (selectedPageIds.length === pages.length) {
            setSelectedPageIds([]);
        } else {
            setSelectedPageIds(pages.map(p => p.id));
        }
    };

    const handleConnect = async () => {
        if (selectedPageIds.length === 0) {
            toast.error('Please select at least one page to connect');
            return;
        }

        setIsSubmitting(true);
        try {
            const selectedPages = pages.filter(p => selectedPageIds.includes(p.id));

            await api.connectLinkedInPages(masterIntegrationId, selectedPages);

            toast.success(`Successfully connected ${selectedPages.length} user pages`);
            onSuccess();
            onClose();
        } catch (error) {
            console.error('Failed to connect pages:', error);
            toast.error('Failed to connect selected pages');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="w-full max-w-md bg-background border border-border/50 rounded-xl shadow-xl overflow-hidden"
                >
                    <div className="p-6 border-b border-white/5 flex justify-between items-center">
                        <div>
                            <h2 className="text-xl font-semibold text-foreground">Select Company Pages</h2>
                            <p className="text-sm text-muted-foreground mt-1">
                                Choose the LinkedIn pages you want to connect
                            </p>
                        </div>
                        <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
                            <X size={20} />
                        </button>
                    </div>

                    <div className="p-4 max-h-[60vh] overflow-y-auto custom-scrollbar">
                        <div className="flex justify-end mb-4">
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={toggleAll}
                                className="text-primary hover:text-primary/80"
                            >
                                {selectedPageIds.length === pages.length ? 'Deselect All' : 'Select All'}
                            </Button>
                        </div>

                        <div className="space-y-3">
                            {pages.map(page => (
                                <div
                                    key={page.id}
                                    onClick={() => togglePage(page.id)}
                                    className={`flex items-center p-3 rounded-lg border cursor-pointer transition-all ${selectedPageIds.includes(page.id)
                                        ? 'border-primary/50 bg-primary/5'
                                        : 'border-white/5 hover:border-white/10 bg-white/5'
                                        }`}
                                >
                                    <div className={`w-5 h-5 rounded-md border flex items-center justify-center mr-4 transition-colors ${selectedPageIds.includes(page.id)
                                        ? 'bg-primary border-primary text-primary-foreground'
                                        : 'border-muted-foreground/30'
                                        }`}>
                                        {selectedPageIds.includes(page.id) && <Check size={14} strokeWidth={3} />}
                                    </div>

                                    {page.picture ? (
                                        <img
                                            src={page.picture}
                                            alt={page.name}
                                            className="w-10 h-10 rounded-full object-cover mr-3 bg-white/10"
                                        />
                                    ) : (
                                        <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center mr-3 text-muted-foreground">
                                            <Building size={18} />
                                        </div>
                                    )}

                                    <div className="flex-1 min-w-0">
                                        <h3 className="font-medium text-foreground truncate">{page.name}</h3>
                                        <p className="text-xs text-muted-foreground truncate">{page.id}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="p-6 border-t border-white/5 flex justify-end gap-3 bg-white/5">
                        <Button variant="ghost" onClick={onClose} disabled={isSubmitting}>
                            Cancel
                        </Button>
                        <Button onClick={handleConnect} disabled={isSubmitting || selectedPageIds.length === 0}>
                            {isSubmitting ? 'Connecting...' : `Connect ${selectedPageIds.length} Page${selectedPageIds.length !== 1 ? 's' : ''}`}
                            {!isSubmitting && <ArrowRight className="ml-2 w-4 h-4" />}
                        </Button>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
