import React from "react";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import RegisterForm from "./RegisterForm";

import styles from './register.module.scss';

const SignUpPage = () => {
    return (
        <div className={styles.authForm}>
            <div className={styles.authForm_inner}>
                <div className={styles.signLogo}>
                    <LockOutlinedIcon />
                </div>
                <h1>Sign Up</h1>
                <RegisterForm formClass={styles.form} />
            </div>
        </div>
    )
}

export default SignUpPage;