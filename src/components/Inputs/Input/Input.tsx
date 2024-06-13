import React, { FC } from 'react';
import { Input as MUIInput, InputProps } from "@mui/material";
import classNames from 'classnames';

import styles from './Input.module.scss';

type BaseInputProps = InputProps & {
    inputClassNames?: string;
    containerClassNames?: string;
};

const Input: FC<BaseInputProps> = ({
    inputClassNames,
    containerClassNames,
    inputProps,
    ...props
}) => {
    return (
        <MUIInput
            className={containerClassNames}
            disableUnderline
            inputProps={{
                className: classNames(inputClassNames, styles.baseInput),
                ...inputProps
            }}
            {...props}
        />
    )
}

export default Input;