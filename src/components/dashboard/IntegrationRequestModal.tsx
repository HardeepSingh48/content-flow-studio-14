import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from '@/components/ui/dialog';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { api } from '@/services/api';
import { toast } from 'sonner';

const formSchema = z.object({
    platformName: z.string().min(2, { message: 'Platform name is too short' }),
    platformType: z.string({ required_error: 'Please select a platform type' }),
    useCase: z.string().min(50, { message: 'Use case must be at least 50 characters' }),
    priority: z.string({ required_error: 'Please select a priority' }),
    additionalDetails: z.string().optional(),
    userEmail: z.string().email({ message: 'Invalid email address' }),
});

interface IntegrationRequestModalProps {
    isOpen: boolean;
    onClose: () => void;
    userEmail?: string;
}

export const IntegrationRequestModal = ({
    isOpen,
    onClose,
    userEmail = '',
}: IntegrationRequestModalProps) => {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            platformName: '',
            platformType: '',
            useCase: '',
            priority: 'Medium',
            additionalDetails: '',
            userEmail: userEmail,
        },
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            setIsSubmitting(true);
            const response = await api.submitIntegrationRequest(values);

            if (response.success) {
                toast.success('Request submitted successfully!');
                form.reset();
                onClose();
            } else {
                toast.error('Failed to submit request: ' + (response.message || 'Unknown error'));
            }
        } catch (error) {
            console.error('Request submission error:', error);
            toast.error('Failed to submit request. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Request New Integration</DialogTitle>
                    <DialogDescription>
                        Suggest a new platform integration for our team to prioritize.
                    </DialogDescription>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="platformName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Platform Name *</FormLabel>
                                        <FormControl>
                                            <Input placeholder="e.g. Notion, Slack" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="platformType"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Platform Type *</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select type" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="AI Model">AI Model</SelectItem>
                                                <SelectItem value="Social Media">Social Media</SelectItem>
                                                <SelectItem value="Video Platform">Video Platform</SelectItem>
                                                <SelectItem value="Other">Other</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <FormField
                            control={form.control}
                            name="priority"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Priority Level *</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select priority" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="Low">Low</SelectItem>
                                            <SelectItem value="Medium">Medium</SelectItem>
                                            <SelectItem value="High">High</SelectItem>
                                            <SelectItem value="Critical">Critical</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="useCase"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Use Case / Reason *</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="How would this integration help your workflow? (Min 50 chars)"
                                            className="min-h-[100px]"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="additionalDetails"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Additional Details</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Any specific features or endpoints needed?"
                                            className="min-h-[80px]"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="userEmail"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Your Email *</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <DialogFooter className="mt-6">
                            <Button type="button" variant="outline" onClick={onClose} disabled={isSubmitting}>
                                Cancel
                            </Button>
                            <Button type="submit" disabled={isSubmitting || !form.formState.isValid}>
                                {isSubmitting ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Submitting...
                                    </>
                                ) : (
                                    'Submit Request'
                                )}
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};
