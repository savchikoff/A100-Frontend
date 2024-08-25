import styles from "./ChatBotMessage.module.css";

interface ChatBotMessageProps {
    text: string;
    isMe: boolean;
}

function ChatBotMessage({ text, isMe }: ChatBotMessageProps) {
    return (
        <div className={isMe ? styles.reqAi : styles.resAi}>
            <p>{text}</p>
        </div>
    )
}

export default ChatBotMessage;