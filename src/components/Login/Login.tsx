import { useForm, SubmitHandler } from "react-hook-form"
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "../../utils/useLocalStorage"
import styles from "./Login.module.css";
import Button from "../ui/Button/Button";
import { useState } from "react";

type Inputs = {
    example: string
    exampleRequired: string
}

function Login() {

    const [isLogin, setIsLogin] = useState(false);

    const navigate = useNavigate()

    const {
        handleSubmit,
        formState: { errors },
        register,
    } = useForm();

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        localStorage.setItem("username", data.example);
        navigate('/');
    }

    const handleLogInActive = () => {
        setIsLogin(!isLogin);
    }


    return (<div className={styles.formWrapper}>
        <h1>{isLogin ? "Log In" : "Sign Up"}</h1>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            {/* register your input into the hook by invoking the "register" function */}
            <input readOnly value={"testuser@utlik.co"} {...register("email", { required: true })} />

            {/* include validation with required or other standard HTML validation rules */}
            <input readOnly value={"123456"} type="password" {...register("password", { required: true })} />
            {/* errors will return when field validation fails  */}
            {errors.exampleRequired && <span>This field is required</span>}
            <span>
                {isLogin ? "Don't have an account? " : "Already have an account? "}
                <a onClick={handleLogInActive}>{isLogin ? "Sign Up" : "Log In"}</a>
            </span>

            <Button type="submit">Submit</Button>
        </form>
    </div>)
}

export default Login;