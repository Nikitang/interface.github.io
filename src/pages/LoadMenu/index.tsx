import React from 'react';
import styles from './LoadMenu.module.css';
import { Link } from 'react-router-dom';

import back from '../../assets/svg/ArrowBack.svg';

const LoadMenu = () => {
    return (
        <div className={styles.menu}>
            <div className={styles.header}>
                <Link className={styles.link} to={'/'}>
                    <img src={back} alt="" />
                </Link>
            </div>
            <div className={styles.body}>
                <div className={styles.txt}>
                    <h1>Запрос в обработке...</h1>
                </div>
                <div className={styles.desc}>
                    <span>
                        После завершения обработки, результаты сканирования будут находиться в
                        архиве
                    </span>
                </div>
                <Link to={'/'} className={styles.btn}>
                    <span>Вернуться на главную</span>
                </Link>
            </div>
        </div>
    );
};

export default LoadMenu;
