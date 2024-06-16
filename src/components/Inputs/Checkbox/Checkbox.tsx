import React, { FC } from 'react';
import { Checkbox as MUICheckbox, CheckboxProps } from "@mui/material";
import classNames from 'classnames';

import styles from './Checkbox.module.scss';

type BaseCheckboxProps = CheckboxProps & {
    inputClassNames?: string;
    containerClassNames?: string;
};

const Checkbox: FC<BaseCheckboxProps> = ({
    inputClassNames,
    containerClassNames,
    inputProps,
    ...props
}) => {
    return (
        <MUICheckbox
            className={containerClassNames}
            {...props}
        />
    )
}

export default Checkbox;