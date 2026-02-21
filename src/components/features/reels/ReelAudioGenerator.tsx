import React, { useState, useEffect, useRef } from 'react';
import { api } from '@/services/api';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Play, Volume2, StopCircle } from 'lucide-react';
import { toast } from 'sonner';

interface Voice {
    voice_id: string;
    name: string;
    preview_url: string;
    category: string;
    labels?: Record<string, string>;
}

interface AudioGeneratorProps {
    scriptText: string;
    scriptId?: string; // Optional if not saved yet
    onAudioGenerated?: (audioUrl: string, audioId: string) => void;
}

export function ReelAudioGenerator({ scriptText, scriptId, onAudioGenerated }: AudioGeneratorProps) {
    const [voices, setVoices] = useState<Voice[]>([]);
    const [selectedVoice, setSelectedVoice] = useState<string>('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [generatedAudioUrl, setGeneratedAudioUrl] = useState<string | null>(null);
    const [isPlayingPreview, setIsPlayingPreview] = useState<string | null>(null);

    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        loadVoices();
    }, []);

    const loadVoices = async () => {
        try {
            const data = await api.getVoices();
            if (data && data.voices) {
                setVoices(data.voices);
                if (data.voices.length > 0) {
                    // Default to 'premade' or first available
                    const defaultVoice = data.voices.find((v: Voice) => v.category === 'premade') || data.voices[0];
                    setSelectedVoice(defaultVoice.voice_id);
                }
            }
        } catch (error) {
            console.error('Failed to load voices:', error);
            toast.error('Failed to load ElevenLabs voices. Check your API key.');
        }
    };

    const handlePreviewVoice = (previewUrl: string, voiceId: string) => {
        if (!audioRef.current) {
            audioRef.current = new Audio();
        }

        if (isPlayingPreview === voiceId) {
            audioRef.current.pause();
            setIsPlayingPreview(null);
            return;
        }

        audioRef.current.src = previewUrl;
        audioRef.current.play();
        setIsPlayingPreview(voiceId);

        audioRef.current.onended = () => setIsPlayingPreview(null);
        audioRef.current.onerror = () => {
            toast.error('Failed to play preview');
            setIsPlayingPreview(null);
        };
    };

    const handleGenerate = async () => {
        if (!selectedVoice) {
            toast.error('Please select a voice');
            return;
        }
        if (!scriptText) {
            toast.error('Script text is empty');
            return;
        }

        setIsGenerating(true);
        try {
            const response = await api.generateReelAudio(scriptText, selectedVoice, scriptId);

            if (response.success && response.audio) {
                // Construct full URL if relative
                let fullAudioUrl = response.audio.audioUrl;
                if (fullAudioUrl.startsWith('/')) {
                    const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:4000';
                    // Remove /api suffix if present to get base URL for static assets
                    // Assuming static assets are served from root, e.g. localhost:4000/generated-audio
                    const staticBase = baseUrl.replace(/\/api$/, '');
                    fullAudioUrl = `${staticBase}${fullAudioUrl}`;
                }

                setGeneratedAudioUrl(fullAudioUrl);
                toast.success('Audio generated successfully!');

                if (onAudioGenerated) {
                    onAudioGenerated(fullAudioUrl, response.audio.id);
                }
            } else {
                toast.error('Failed to generate audio');
            }
        } catch (error) {
            console.error('Generation failed:', error);
            toast.error('Failed to generate audio. Check console for details.');
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <Card className="w-full mt-4">
            <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                    <Volume2 className="h-5 w-5 text-primary" />
                    AI Voiceover Generator
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
                    <div className="flex-1 space-y-2">
                        <label className="text-sm font-medium">Select Voice</label>
                        <Select value={selectedVoice} onValueChange={setSelectedVoice}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select a voice" />
                            </SelectTrigger>
                            <SelectContent className="max-h-[300px]">
                                {voices.map((voice) => (
                                    <SelectItem key={voice.voice_id} value={voice.voice_id}>
                                        <div className="flex items-center justify-between w-full gap-2">
                                            <span>{voice.name}</span>
                                            <span className="text-xs text-muted-foreground opacity-70 ml-2 capitalize">
                                                {voice.labels?.accent || voice.category}
                                            </span>
                                        </div>
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="flex gap-2">
                        {selectedVoice && (
                            <Button
                                variant="outline"
                                size="icon"
                                onClick={() => {
                                    const voice = voices.find(v => v.voice_id === selectedVoice);
                                    if (voice?.preview_url) {
                                        handlePreviewVoice(voice.preview_url, voice.voice_id);
                                    }
                                }}
                                title={isPlayingPreview === selectedVoice ? "Stop Preview" : "Preview Voice"}
                                type="button"
                            >
                                {isPlayingPreview === selectedVoice ?
                                    <StopCircle className="h-4 w-4 text-red-500" /> :
                                    <Play className="h-4 w-4" />
                                }
                            </Button>
                        )}

                        <Button
                            onClick={handleGenerate}
                            disabled={isGenerating || !selectedVoice || !scriptText}
                            className="min-w-[140px]"
                        >
                            {isGenerating ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Generating...
                                </>
                            ) : (
                                'Generate Audio'
                            )}
                        </Button>
                    </div>
                </div>

                {generatedAudioUrl && (
                    <div className="mt-4 p-4 bg-muted/30 rounded-lg border">
                        <h4 className="text-sm font-medium mb-3">Generated Audio Preview</h4>
                        <audio controls src={generatedAudioUrl} className="w-full h-10" />
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
