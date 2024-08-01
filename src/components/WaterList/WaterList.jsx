import WaterItem from '../WaterItem/WaterItem';
import styles from './WaterList.module.css';

const WaterList = () => {
    // Dummy data
    const waterRecords = [
        { id: 1, amount: '500ml', time: '08:00 AM' },
        { id: 2, amount: '300ml', time: '12:00 PM' },
    ];

    return (
        <ul className={styles.waterList}>
            {waterRecords.map(record => (
                <WaterItem key={record.id} amount={record.amount} time={record.time} />
            ))}
        </ul>
    );
};

export default WaterList;
