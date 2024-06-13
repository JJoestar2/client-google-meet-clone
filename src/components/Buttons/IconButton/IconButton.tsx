import React, { FC } from 'react';
import { IconButton as MUIIconButton, IconButtonProps as MUIButtonProps } from '@mui/material';
import classNames from 'classnames';

import styles from './IconButton.module.scss';

type Severity = 'default' | 'secondary' | 'danger';

type IconButtonProps = MUIButtonProps & {
    severity?: Severity;
};

const IconButton: FC<IconButtonProps> = ({
    className,
    severity = 'secondary',
    ...props
}) => {
    return (
        <MUIIconButton
            className={classNames(styles.iconButton, severity && styles[severity], className)}
            {...props}
        />
    )
};

export default IconButton;