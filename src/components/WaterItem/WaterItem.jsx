import styles from './WaterItem.module.css';

const WaterItem = ({ amount, time }) => {
    return (
        <li className={styles.waterItem}>
            <span>{amount}</span> - <span>{time}</span>
        </li>
    );
};

export default WaterItem;
