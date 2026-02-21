import { useState } from 'react';
import { Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { api } from '@/services/api';
import { toast } from '@/hooks/use-toast';

const NICHE_OPTIONS = [
    'Technology & SaaS',
    'Marketing & Advertising',
    'Healthcare & Medicine',
    'Finance & Banking',
    'E-commerce & Retail',
    'Education & Training',
    'Real Estate & Property',
    'Food & Beverage',
    'Travel & Hospitality',
    'Fashion & Beauty',
    'Automotive & Transportation',
    'Marine & Shipping',
    'Aviation & Aerospace',
    'Manufacturing & Industrial',
    'Legal & Consulting',
    'Entertainment & Media',
    'Sports & Fitness',
    'Non-Profit & Social Impact',
    'Other',
];

interface Props {
    open: boolean;
    onClose: () => void;
    onSave: (niche: string) => void;
}

export default function NicheSelectionModal({ open, onClose, onSave }: Props) {
    const [selectedNiche, setSelectedNiche] = useState('');
    const [customNiche, setCustomNiche] = useState('');
    const [targetAudience, setTargetAudience] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSave = async () => {
        const niche = selectedNiche === 'Other' ? customNiche : selectedNiche;

        if (!niche) {
            toast({
                title: 'Niche Required',
                description: 'Please select or enter your industry niche',
                variant: 'destructive',
            });
            return;
        }

        setLoading(true);
        try {
            await api.updateUserNiche(niche, {
                targetAudience,
                customNiche: selectedNiche === 'Other' ? customNiche : undefined,
            });

            toast({
                title: 'Niche Saved!',
                description: `Your content will be personalized for ${niche}`,
            });

            onSave(niche);
            onClose();
        } catch (error) {
            console.error('Failed to save niche:', error);
            toast({
                title: 'Save Failed',
                description: 'Failed to save your niche. Please try again.',
                variant: 'destructive',
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <div className="flex items-center gap-2 mb-2">
                        <Target className="h-5 w-5 text-primary" />
                        <DialogTitle>Tell us about your niche</DialogTitle>
                    </div>
                    <DialogDescription>
                        Help us personalize your content for your industry
                    </DialogDescription>
                </DialogHeader>

                <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                        <Label htmlFor="niche">Select your industry/niche *</Label>
                        <Select value={selectedNiche} onValueChange={setSelectedNiche}>
                            <SelectTrigger id="niche">
                                <SelectValue placeholder="Choose your niche..." />
                            </SelectTrigger>
                            <SelectContent>
                                {NICHE_OPTIONS.map((option) => (
                                    <SelectItem key={option} value={option}>
                                        {option}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    {selectedNiche === 'Other' && (
                        <div className="grid gap-2">
                            <Label htmlFor="custom-niche">Enter your niche *</Label>
                            <Input
                                id="custom-niche"
                                placeholder="e.g., Quantum Computing, Biotechnology"
                                value={customNiche}
                                onChange={(e) => setCustomNiche(e.target.value)}
                            />
                        </div>
                    )}

                    <div className="grid gap-2">
                        <Label htmlFor="audience">Target audience (optional)</Label>
                        <Textarea
                            id="audience"
                            placeholder="Tell us more about your target audience..."
                            value={targetAudience}
                            onChange={(e) => setTargetAudience(e.target.value)}
                            rows={3}
                        />
                        <p className="text-xs text-muted-foreground">
                            e.g., "B2B decision makers in mid-sized companies"
                        </p>
                    </div>
                </div>

                <DialogFooter>
                    <Button variant="ghost" onClick={onClose} disabled={loading}>
                        Skip for now
                    </Button>
                    <Button onClick={handleSave} disabled={loading || !selectedNiche}>
                        {loading ? 'Saving...' : 'Continue'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
