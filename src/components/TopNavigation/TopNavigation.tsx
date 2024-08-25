import { useState } from "react";
import Avatar from "../Avatar/Avatar";
import styles from './TopNavigation.module.css';

const TopNavigation = () => {
    const [isTooltipOpened, setIsTooltipOpened] = useState(false);

    const username = localStorage.getItem('username');

    const handleTooltipOpen = () => {
        setIsTooltipOpened(!isTooltipOpened);
    }

    const handleLogout = () => {
        localStorage.removeItem('username');
        window.location.href = "/login";
    }

    return (
        <header className={styles.topNavigation}>
            <div className={styles.topNavigationInner}>
                <div className={styles.topNavigationTitle}>
                    <div className={styles.topNavigationTitleWrapper}>
                        CyberMan A100
                    </div>
                </div>
                <div className={styles.topNavigationMenu}>
                    <button className={styles.topNavigationMenuButton} onClick={handleTooltipOpen}>
                        <Avatar userName={username} />
                    </button>
                    {isTooltipOpened && (
                        <div className={styles.tooltip}>
                            <button onClick={handleLogout} className={styles.logoutButton}>
                                Log Out
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    )
}


export default TopNavigation;