import styles from './Button.module.css';

interface ButtonProps extends React.ComponentPropsWithoutRef<"button"> {
    variant?: "primary" | "secondary";
}

function Button({ variant, children, ...props }: ButtonProps) {
    return (
        <button
            className={styles.button}
            {...props}
        >
            {children}
        </button>
    )
}

export default Button