import { useState, useEffect, useRef } from 'react';
import WaterItem from '../WaterItem/WaterItem';
import css from './WaterList.module.css';

const initialData = [
    { id: 1, amount: 250, time: '7:00 AM' },
    { id: 2, amount: 250, time: '11:00 AM' },
    { id: 3, amount: 300, time: '17:00 PM' },
    { id: 4, amount: 300, time: '17:00 PM' },
    { id: 5, amount: 300, time: '17:00 PM' },
    { id: 6, amount: 300, time: '17:00 PM' },
    // Добавьте другие элементы, если необходимо
];

const WaterList = () => {
    const [scrollPosition, setScrollPosition] = useState(0);
    const containerRef = useRef(null);
    const [maxScroll, setMaxScroll] = useState(0);

    const handleSliderChange = (event) => {
        const value = event.target.value;
        setScrollPosition(value);
        if (containerRef.current) {
            containerRef.current.scrollLeft = value;
        }
    };

    useEffect(() => {
        // Установите максимальное значение ползунка при монтировании компонента
        if (containerRef.current) {
            setMaxScroll(containerRef.current.scrollWidth - containerRef.current.clientWidth);
        }
    }, [containerRef.current]);

    return (
        <div className={css.waterListContainer}>
            <div className={css.waterList} ref={containerRef}>
                {initialData.map(item => (
                    <WaterItem 
                        key={item.id} 
                        amount={item.amount} 
                        time={item.time}
                        onEdit={() => console.log(`Edit item with id: ${item.id}`)}
                        onDelete={() => console.log(`Delete item with id: ${item.id}`)}
                    />
                ))}
            </div>
            <div className={css.sliderContainer}>
                <input
                    type="range"
                    min="0"
                    max={maxScroll || 100}
                    value={scrollPosition}
                    className={css.slider}
                    onChange={handleSliderChange}
                />
            </div>
        </div>
    );
};

export default WaterList;
