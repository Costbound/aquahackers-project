import { useState } from 'react';
import WaterItem from '../WaterItem/WaterItem';
import css from './WaterList.module.css';

const initialData = [
    { id: 1, amount: 250, time: '7:00 AM' },
    { id: 2, amount: 250, time: '11:00 AM' },
    // Добавьте другие элементы, если необходимо
];

const WaterList = () => {
    const [waterData, setWaterData] = useState(initialData);

    const handleEdit = (id) => {
        // Реализуйте логику для открытия модального окна редактирования
        console.log(`Edit item with id: ${id}`);
    };

    const handleDelete = (id) => {
        setWaterData(waterData.filter(item => item.id !== id));
    };

    return (
        <div className={css.waterList}>
            {waterData.map(item => (
                <WaterItem 
                    key={item.id} 
                    amount={item.amount} 
                    time={item.time}
                    onEdit={() => handleEdit(item.id)}
                    onDelete={() => handleDelete(item.id)}
                />
            ))}
        </div>
    );
};

export default WaterList;
