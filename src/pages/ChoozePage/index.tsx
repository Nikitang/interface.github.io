import { FC } from 'react';
import ChoozeHand from '../../components/ChoozeHand';
import Wave from '../../components/Wave';
import styles from './ChoozePage.module.scss';

const ChoozePage: FC = () => {
    return (
        <div className={styles.choozeDiv}>
            {/* <Wave /> */}
            <div className={styles.header}>
                <h1>Выбор руки</h1>
            </div>

            <div className={styles.body}>
                <ChoozeHand />
            </div>
        </div>
    );
};

export default ChoozePage;
