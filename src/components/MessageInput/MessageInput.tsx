import { useContext, useRef, useState } from 'react';
import styles from './MessageInput.module.css';
import { useWebSocket, WebSocketContext } from '../../providers/WebSocketProvider';

const MessageInput = () => {

    const [message, setMessage] = useState("");
    const inpTextRef = useRef<HTMLDivElement>(null);

    const { sendMessage } = useWebSocket();

    const sendMessageToBot = () => {
        sendMessage(message);
        location.reload();
    };

    const handleInput = () => {
        const text = inpTextRef.current!.innerText;
        setMessage(text);
    }

    const handleKeyDown = (e: KeyboardEvent) => {
        if (true && (e.key === 'Enter') && !e.shiftKey) {
            e.preventDefault();
            sendMessage(message);
            location.reload();
        }
    }

    return (
        <div className={styles.inpForm}>
            <div className={styles.inpText}
                contentEditable
                placeholder="Введите свое сообщение"
                role="textbox"
                onKeyDown={handleKeyDown}
                onInput={handleInput}
                ref={inpTextRef} />
            <div className={styles.btnsWrapper}>
                <button disabled={false} className={styles.inpSubmit} type="submit" value="" onClick={sendMessageToBot} />
            </div>
        </div>
    )
}

export { MessageInput };