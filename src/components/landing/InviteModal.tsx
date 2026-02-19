import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Loader2, Mail, Phone, Building, FileText, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { api } from '@/services/api';
import { toast } from 'sonner';

interface InviteModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const InviteModal = ({ isOpen, onClose }: InviteModalProps) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        company: '',
        details: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            await api.sendInviteRequest(formData);
            toast.success('Invite request sent successfully!', {
                description: 'We will be in touch with you shortly.'
            });
            onClose();
            setFormData({ name: '', email: '', phone: '', company: '', details: '' });
        } catch (error) {
            console.error('Failed to send invite request:', error);
            toast.error('Failed to send request', {
                description: 'Please try again later or contact support.'
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return createPortal(
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
                    />
                    <div className="fixed inset-0 z-[100] overflow-y-auto pointer-events-none">
                        <div className="flex min-h-full items-center justify-center p-4">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                                className="w-full max-w-lg pointer-events-auto"
                            >
                                <div className="bg-card border border-border shadow-2xl rounded-2xl overflow-hidden">
                                    <div className="p-6 border-b border-border flex justify-between items-center bg-muted/30">
                                        <div>
                                            <h2 className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
                                                Get an Invite
                                            </h2>
                                            <p className="text-sm text-muted-foreground mt-1">
                                                Join our exclusive platform for content creators
                                            </p>
                                        </div>
                                        <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full hover:bg-background/80">
                                            <X className="w-5 h-5 text-muted-foreground" />
                                        </Button>
                                    </div>

                                    <form onSubmit={handleSubmit} className="p-6 space-y-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="name" className="flex items-center gap-2">
                                                <User className="w-4 h-4 text-primary" /> Full Name <span className="text-red-500">*</span>
                                            </Label>
                                            <Input
                                                id="name"
                                                name="name"
                                                placeholder="John Doe"
                                                value={formData.name}
                                                onChange={handleChange}
                                                required
                                                className="bg-background/50 focus:bg-background transition-colors"
                                            />
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="email" className="flex items-center gap-2">
                                                    <Mail className="w-4 h-4 text-primary" /> Email <span className="text-red-500">*</span>
                                                </Label>
                                                <Input
                                                    id="email"
                                                    name="email"
                                                    type="email"
                                                    placeholder="john@example.com"
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                    required
                                                    className="bg-background/50 focus:bg-background transition-colors"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="phone" className="flex items-center gap-2">
                                                    <Phone className="w-4 h-4 text-primary" /> Phone
                                                </Label>
                                                <Input
                                                    id="phone"
                                                    name="phone"
                                                    placeholder="+1 (555) 000-0000"
                                                    value={formData.phone}
                                                    onChange={handleChange}
                                                    className="bg-background/50 focus:bg-background transition-colors"
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="company" className="flex items-center gap-2">
                                                <Building className="w-4 h-4 text-primary" /> Company / Organization
                                            </Label>
                                            <Input
                                                id="company"
                                                name="company"
                                                placeholder="Acme Inc."
                                                value={formData.company}
                                                onChange={handleChange}
                                                className="bg-background/50 focus:bg-background transition-colors"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="details" className="flex items-center gap-2">
                                                <FileText className="w-4 h-4 text-primary" /> Tell us about your needs
                                            </Label>
                                            <Textarea
                                                id="details"
                                                name="details"
                                                placeholder="I'm interested in..."
                                                value={formData.details}
                                                onChange={handleChange}
                                                rows={3}
                                                className="bg-background/50 focus:bg-background transition-colors resize-none"
                                            />
                                        </div>

                                        <div className="pt-4 flex justify-end gap-3">
                                            <Button type="button" variant="outline" onClick={onClose} disabled={isSubmitting}>
                                                Cancel
                                            </Button>
                                            <Button
                                                type="submit"
                                                disabled={isSubmitting || !formData.name || !formData.email}
                                                className="bg-gradient-to-r from-primary to-primary/80 hover:to-primary text-primary-foreground shadow-lg hover:shadow-primary/25 transition-all duration-300"
                                            >
                                                {isSubmitting ? (
                                                    <>
                                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                        Sending...
                                                    </>
                                                ) : (
                                                    <>
                                                        Request Invite
                                                        <Send className="ml-2 h-4 w-4" />
                                                    </>
                                                )}
                                            </Button>
                                        </div>
                                    </form>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </>
            )}
        </AnimatePresence>,
        document.body
    );
};

export default InviteModal;
