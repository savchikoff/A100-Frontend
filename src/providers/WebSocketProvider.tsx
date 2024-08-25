import { useEffect, createContext, useRef, ReactNode, useContext } from 'react';

// Define the types for the WebSocket data and channels
type MessageData = {
    type: string;
    chat?: string;
    [key: string]: any;
};

type ChannelCallback = (data: any) => void;

type Channels = {
    [key: string]: ChannelCallback;
};

// Define the context types
type WebSocketContextType = {
    subscribe: (channel: string, callback: ChannelCallback) => void;
    unsubscribe: (channel: string) => void;
    sendMessage: (message: string) => Promise<void>;
};

const WebSocketContext = createContext<WebSocketContextType>({
    subscribe: () => { },
    unsubscribe: () => { },
    sendMessage: () => Promise.resolve(),
});

const useWebSocket = () => useContext(WebSocketContext);

interface WebSocketProviderProps {
    children: ReactNode;
    username: string;
}

function WebSocketProvider({ children, username }: WebSocketProviderProps) {
    const ws = useRef<WebSocket | null>(null);
    const channels = useRef<Channels>({});
    const currentChatId = useRef<string | null>(localStorage.getItem('currentChatId'));

    const subscribe = (channel: string, callback: ChannelCallback) => {
        channels.current[channel] = callback;
    };

    const unsubscribe = (channel: string) => {
        delete channels.current[channel];
    };

    const sendMessage = async (message: string) => {
        if (message && ws.current && ws.current.readyState === WebSocket.OPEN) {
            if (!currentChatId.current) {
                const response = await fetch(`http://localhost:8222/get_user_chats/${username}`);
                if (!response.ok) {
                    console.error('Failed to load user chats', response.statusText);
                    return;
                }

                const data = await response.json();
                if (data.chats.length > 0) {
                    currentChatId.current = data.chats[0].id;
                    if (currentChatId.current) {
                        localStorage.setItem('currentChatId', currentChatId.current);
                    }
                } else {
                    console.error('No chats available for user');
                    return;
                }
            }

            const data = {
                question_data: {
                    question: message,
                    session_id: currentChatId.current
                }
            };

            ws.current.send(JSON.stringify(data));
        }
    };

    useEffect(() => {
        const wsUrl = `ws://localhost:8222/ws/rag_chat/?email=savchik.official@gmail.com`;
        ws.current = new WebSocket(wsUrl);

        ws.current.onopen = () => {
            console.log('WS open');
        };
        ws.current.onclose = () => {
            console.log('WS close');
        };
        ws.current.onmessage = (message: MessageEvent) => {
            const { type, ...data }: MessageData = JSON.parse(message.data);
            const chatChannel = `${type}_${data.chat}`;

            if (channels.current[chatChannel]) {
                channels.current[chatChannel](data);
            } else if (channels.current[type]) {
                channels.current[type](data);
            }
        };

        return () => {
            ws.current?.close();
        };
    }, [username]);

    return (
        <WebSocketContext.Provider value={{ subscribe, unsubscribe, sendMessage }}>
            {children}
        </WebSocketContext.Provider>
    );
}

export { WebSocketContext, WebSocketProvider, useWebSocket };
