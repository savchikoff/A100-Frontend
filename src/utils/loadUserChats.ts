import { useEffect, useState } from "react";

const useLoadUserChats = (email: string) => {
    const [chats, setChats] = useState([]);

    useEffect(() => {
        async function loadChats() {
            try {
                const response = await fetch(`/get_user_chats/${email}`);
                if (!response.ok) {
                    throw new Error('Failed to load user chats');
                }

                const data = await response.json();
                setChats(data.chats);
            } catch (error) {
                console.error('Error loading user chats:', error);
                setChats([]);
            }
        }

        loadChats();
    }, [email]);

    return chats;
}

export { useLoadUserChats };