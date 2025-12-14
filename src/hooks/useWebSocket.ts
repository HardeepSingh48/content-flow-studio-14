import { useEffect, useRef, useState } from 'react';
import { useAuth } from './useAuth';

const WS_URL = import.meta.env.VITE_WS_URL || 'ws://localhost:4000';

export function useWebSocket() {
    const ws = useRef<WebSocket | null>(null);
    const { user } = useAuth();
    const [isConnected, setIsConnected] = useState(false);
    const listeners = useRef<Map<string, Set<Function>>>(new Map());

    useEffect(() => {
        if (!user) return;

        // Connect WebSocket
        ws.current = new WebSocket(WS_URL);

        ws.current.onopen = () => {
            console.log('WebSocket connected');
            setIsConnected(true);

            // Authenticate
            ws.current?.send(JSON.stringify({
                type: 'authenticate',
                userId: user.id
            }));
        };

        ws.current.onmessage = (event) => {
            try {
                const message = JSON.parse(event.data);

                // Call all listeners for this message type
                const typeListeners = listeners.current.get(message.type);
                if (typeListeners) {
                    typeListeners.forEach(callback => callback(message.data));
                }
            } catch (error) {
                console.error('WebSocket message parse error:', error);
            }
        };

        ws.current.onclose = () => {
            console.log('WebSocket disconnected');
            setIsConnected(false);
        };

        ws.current.onerror = (error) => {
            console.error('WebSocket error:', error);
        };

        // Cleanup
        return () => {
            ws.current?.close();
        };
    }, [user]);

    const subscribe = (type: string, callback: Function) => {
        if (!listeners.current.has(type)) {
            listeners.current.set(type, new Set());
        }
        listeners.current.get(type)!.add(callback);

        // Return unsubscribe function
        return () => {
            listeners.current.get(type)?.delete(callback);
        };
    };

    return {
        isConnected,
        subscribe
    };
}
