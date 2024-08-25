// @ts-nocheck
import React, { useEffect, useState } from 'react';
import styles from './CyberManChat.module.css';
import Avatar from '../Avatar/Avatar';
import { MessageInput } from '../MessageInput/MessageInput';
import UpdatePlanSection from '../UpdatePlanSection/UpdatePlanSection';
import TopNavigation from '../TopNavigation/TopNavigation';
import { useLoadUserChats } from '../../utils/loadUserChats';
import { getNameForChatId } from '../../utils/getNameForChatId';
import { ChatMessage, loadChatMessages } from '../../utils/loadChatMessages';
import { useWebSocket, WebSocketProvider } from '../../providers/WebSocketProvider';
import ChatBotMessage from '../ChatBotMessage/ChatBotMessage';

interface ChatItem {
    id: string;
    text: string;
    avatar?: string;
}

interface ChatGroup {
    title: string;
    items: ChatItem[];
}

interface SuggestionItem {
    text: string;
}

const ChatItemComponent: React.FC<ChatItem> = ({ text, avatar }) => (
    <div className={styles.chatItem}>
        <div className={styles.avatarWrapper}>
            {avatar ? (
                <img src={avatar} alt="Avatar" className={styles.chatItemAvatar} />
            ) : (
                <div className={styles.avatarBackground}>
                    <img src="default-avatar.png" alt="Default Avatar" className={styles.avatarImage} />
                    <div className={styles.avatarShadow} />
                </div>
            )}
        </div>
        <div className={styles.chatItemText}>{text}</div>
    </div>
);

const ChatGroupComponent: React.FC<ChatGroup> = ({ title, items }) => (
    <div className={styles.chatItemsGroup}>
        <div className={styles.chatGroupHeader}>
            <div className={styles.chatGroupHeaderInner}>
                <div className={styles.chatGroupHeaderText}>{title}</div>
            </div>
        </div>
        <div className={styles.chatList}>
            {items.map((item) => (
                <div key={item.id} className={styles.chatListItem}>
                    <div className={styles.chatListItemLink}>
                        <div className={styles.chatListItemText}>{item.text}</div>
                        <button className={styles.iconButton}>
                            <img src="./assets/icons/cross.svg" alt="Menu" className={styles.iconImage} />
                        </button>
                    </div>
                </div>
            ))}
        </div>
    </div>
);

const SuggestionButton: React.FC<SuggestionItem> = ({ text }) => (
    <button className={styles.suggestionButton}>
        <div className={styles.suggestionText}>{text}</div>
    </button>
);

const CyberManChat: React.FC = () => {
    const [username, setUsername] = useState<string | null>(localStorage.getItem('username'));
    const [isWriting, setIsWriting] = useState(false);
    const [currentChatId, setCurrentChatId] = useState<string | null>(localStorage.getItem('currentChatId'));
    const [chatMessages, setChatMessages] = useState<ChatMessage[]>([{ sender: "", messages: [], sent_at: "" }]);

    const { subscribe, unsubscribe } = useWebSocket();


    useEffect(() => {
        const fetchChatMessages = async () => {
            if (currentChatId) {
                try {
                    const chatMessages = await loadChatMessages(currentChatId);
                    setChatMessages(chatMessages);

                    const handleNewMessage = (newMessage: ChatMessage) => {
                        console.log(newMessage);
                        setChatMessages(prevMessages => [...prevMessages, newMessage]);
                    };

                    subscribe(`message_${currentChatId}`, handleNewMessage);
                } catch (error) {
                    console.error('Failed to load chat messages:', error);
                }
            }
        };

        fetchChatMessages();

        return () => {
            if (currentChatId) {
                unsubscribe(`message_${currentChatId}`);
            }
        };
    }, [currentChatId, subscribe, unsubscribe]);

    const chatGroups: ChatGroup[] = [
        {
            title: 'Today',
            items: [
                { id: '1', text: 'Режим дискавери дорожная карта' },
            ],
        },
        {
            title: 'Previous 7 days',
            items: [
                { id: '2', text: 'Новые офисные стулья' },
                { id: '3', text: 'Translate English to French' },
                { id: '4', text: 'Новый чат' },
            ],
        },
    ];

    const suggestions: SuggestionItem[] = [
        { text: 'Рассказ о супергерое-акуле' },
        { text: 'Рецепт из того, что есть у меня на кухне' },
        { text: 'Узнать Сеул как местный житель' }
    ];

    return (
        <WebSocketProvider username={username}>
            <div className={styles.chatContainer}>
                <section className={styles.mainSection}>
                    <div className={styles.contentWrapper}>
                        <aside className={styles.sidebar}>
                            <nav className={styles.chatLog}>
                                <div className={styles.topBar}>
                                    <button className={styles.iconButton}>
                                        <img src="./assets/icons/navIcon.svg" alt="Menu" className={styles.iconImage} />
                                    </button>
                                    <button className={styles.iconButton}>
                                        <img src="./assets/icons/newChat.svg" alt="New Chat" className={styles.iconImage} />
                                    </button>
                                </div>
                                <div className={styles.chatItems}>
                                    <div className={styles.chatItemsWrapper}>
                                        <div className={styles.chatItemsBackground}>
                                            <ChatItemComponent text="CyberMan A100" avatar="./assets/icons/cyberMan.svg" />
                                            <ChatItemComponent text="Translater" avatar="./assets/icons/translator.svg" />
                                            <ChatItemComponent text="Обзор CyberMan's" avatar='./assets/icons/overview.svg' />
                                        </div>
                                        {chatGroups.map((group, index) => (
                                            <ChatGroupComponent key={index} title={group.title} items={group.items} />
                                        ))}
                                    </div>
                                </div>
                            </nav>
                            <UpdatePlanSection />
                        </aside>
                        <main className={styles.mainContent}>
                            <TopNavigation />
                            <div className={styles.mainContentInner}>
                                {chatMessages.length < 1 ?
                                    <div className={styles.welcomeSection}>
                                        <img src="./assets/a100.svg" alt="CyberMan Logo" className={styles.welcomeLogo} />
                                        <div className={styles.suggestionsSection}>
                                            <div className={styles.suggestionsWrapper}>
                                                <div className={styles.suggestionGroup}>
                                                    {suggestions.map((suggestion, index) => (
                                                        <SuggestionButton key={index} text={suggestion.text} />
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    :
                                    <div className={styles.messagesSection}>
                                        {chatMessages.map(({ sender, messages, sent_at }) => <ChatBotMessage text={messages} isMe={sender === "human"} key={sent_at} />)}
                                    </div>
                                }
                                <div className={styles.chatInputSection}>
                                    <MessageInput />
                                    <span className={styles.chatInputWarning}>CyberMan A100 может допускать ошибки. Рекомендуем проверять важную информацию.</span>
                                </div>
                            </div>
                        </main>
                    </div>
                </section>
            </div>
        </WebSocketProvider>

    );
};

export default CyberManChat;