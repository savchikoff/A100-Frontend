interface ChatMessage {
    sender: string;
    messages: string[];
    sent_at: string;
}

const loadChatMessages = async (chatId: string): Promise<ChatMessage[]> => {
    try {
        const response = await fetch(`http://localhost:8222/get_chat_messages/${chatId}`);
        if (!response.ok) {
            throw new Error('Failed to load chat messages');
        }

        const data = await response.json();
        return data.messages;
    } catch (error) {
        console.error('Error loading chat messages:', error);
        throw error;
    }
}

export { loadChatMessages, type ChatMessage }