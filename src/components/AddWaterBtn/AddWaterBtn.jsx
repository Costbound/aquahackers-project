import styles from './AddWaterBtn.module.css';

const AddWaterBtn = () => {
    const handleClick = () => {
        // Open modal or do something
    };

    return (
        <button className={styles.addButton} onClick={handleClick}>
            Add Water
        </button>
    );
};

export default AddWaterBtn;
