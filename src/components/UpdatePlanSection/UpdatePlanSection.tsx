import styles from './UpdatePlanSection.module.css';

const UpdatePlanSection = () => {
    return (
        <div className={styles.updatePlanSection}>
            <a href="#" className={styles.updatePlanLink}>
                <div className={styles.updatePlanContent}>
                    <div className={styles.updatePlanInner}>
                        <div className={styles.updatePlanIcon}>
                            <img src="./assets/icons/upgradeIcon.svg" alt="Update" className={styles.updatePlanIconImage} />
                        </div>
                        <div className={styles.updatePlanText}>
                            <div className={styles.updatePlanTitle}>Обновить план</div>
                            <div className={styles.updatePlanSubtitle}>Получите CyberMan Plus</div>
                        </div>
                    </div>
                </div>
            </a>
        </div>
    )
}

export default UpdatePlanSection;