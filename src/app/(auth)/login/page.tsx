import React from "react";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import LoginForm from "./LoginForm";
import styles from './login.module.scss';

const LoginPage = () => {

    return (
        <div className={styles.authForm}>
            <div className={styles.authForm_inner}>
                <div className={styles.signLogo}>
                    <LockOutlinedIcon />
                </div>
                <h1>Sign in</h1>
                <LoginForm formClass={styles.form} />
            </div>
        </div>
    );
}

export default LoginPage;