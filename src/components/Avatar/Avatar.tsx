import styles from './Avatar.module.css';

interface AvatarProps {
    userName: string | null;
}

function Avatar({ userName }: AvatarProps) {
    const initial = userName ? userName.charAt(0).toUpperCase() : '';

    return (
        <div className={styles.avatar}>
            {initial}
        </div>
    );
}

export default Avatar;
