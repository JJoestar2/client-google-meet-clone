'use client';

import React from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Input from "@/components/Inputs/Input";
import Button from "@/components/Buttons/Button";
import { RegisterFormSchema, defaultValues } from "./schema";
import styles from './register.module.scss';
import Link from "next/link";

const RegisterForm = ({ formClass }) => {
    const { handleSubmit, control, formState: { errors }, reset } = useForm({
        resolver: yupResolver(RegisterFormSchema),
        defaultValues: defaultValues
    });

    const handleRegister = (values) => {
        console.log(values);
    }

    return (
        <form onSubmit={handleSubmit(handleRegister)} className={formClass}>
            <Controller
                name="name"
                control={control}
                render={({ field }) => <Input {...field} ref={null} fullWidth placeholder="Name *"/>}
            />
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

            <Button type="submit" fullWidth variant="contained">
                Register
            </Button>

            <div className={styles.links}>
                <Link href='/login'>Already have an account? Sign in</Link>
            </div>
        </form>
    )
}

export default RegisterForm;