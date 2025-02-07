import { FC } from 'react';
import styles from './Modal.module.css';
const Modal: FC = () => {
    return (
        <div className={styles.modal}>
            <span>Успешно!</span>
        </div>
    );
};

export default Modal;
