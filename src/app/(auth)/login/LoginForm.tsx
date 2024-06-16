'use client';

import React from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Input from "@/components/Inputs/Input";
import Button from "@/components/Buttons/Button";
import Checkbox from "@/components/Inputs/Checkbox";
import { LoginFormSchema, defaultValues } from "./schema";
import styles from './login.module.scss';
import Link from "next/link";

const LoginForm = ({ formClass }) => {
    const { handleSubmit, control, formState: { errors }, reset } = useForm({
        resolver: yupResolver(LoginFormSchema),
        defaultValues: defaultValues
    });

    const handleLogin = (values) => {
        console.log(values);
    }

    return (
        <form onSubmit={handleSubmit(handleLogin)} className={formClass}>
            <Controller
                name="email"
                control={control}
                render={({ field }) => <Input {...field} ref={null} fullWidth placeholder="Email *"/>}
            />
            <Controller
                name="password"
                control={control}
                render={({ field }) => <Input {...field} ref={null} fullWidth placeholder="Password *"/>}
            />
            <div className={styles.rememberMe}>
                <Controller
                    name="rememberMe"
                    control={control}
                    render={({ field }) => <Checkbox {...field} ref={null} />}
                />
                <p>Remember me</p>
            </div>

            <Button type="submit" fullWidth variant="contained">
                Sign In
            </Button>

            <div className={styles.links}>
                <Link href='/forgot-password'>Forgot password?</Link>
                <Link href='/register'>Don't have an account? Sign Up</Link>
            </div>
        </form>
    )
}

export default LoginForm;