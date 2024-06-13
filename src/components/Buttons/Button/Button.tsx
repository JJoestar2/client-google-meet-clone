import React, { FC } from 'react';
import { Button as MUIButton, ButtonProps as MUIButtonProps } from '@mui/material';
import classNames from 'classnames';

import styles from './button.module.scss';

type Severity = 'warning' | 'danger';

type Variants = 'text' | 'contained' | 'outlined';

type ButtonProps = MUIButtonProps & {
    severity?: Severity;
    variant?: Variants;
};

const Button: FC<ButtonProps> = ({
    className,
    severity,
    variant = 'text',
    ...props
}) => {
    return (
        <MUIButton
            variant={variant}
            className={classNames(styles.button, severity && styles[severity], styles[variant], className)}
            {...props}
        />
    )
};

export default Button;