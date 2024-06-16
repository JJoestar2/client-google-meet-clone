import React, { FC, PropsWithChildren } from "react";
import Image from 'next/image'
import styles from './layout.module.scss';

const layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <main className={styles.auth}>
      <div className={styles.auth_image}>
          <Image
            src="/images/auth-bg.jpg"
            alt="Picture of the author"
            className={styles.image}
            fill
          />
      </div>
      {children}
    </main>
    );
};

export default layout;
