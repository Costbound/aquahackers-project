import { useState, useLayoutEffect, useRef, useEffect } from "react";
import WaterItem from "../WaterItem/WaterItem";
import css from "./WaterList.module.css";
import { useSelector, useDispatch } from "react-redux";
import { selectWaters } from "../../redux/water/selectors-water";
import { fetchWater } from "../../redux/water/ops-water";
import { changeDeleteWaterModalOpen, setSelectedWaterId } from "../../redux/water/slice-water";

const WaterList = () => {
  const dispatch = useDispatch();
  const waters = useSelector(selectWaters);
  const [scrollPosition, setScrollPosition] = useState(0);
  const containerRef = useRef(null);
  const [maxScroll, setMaxScroll] = useState(0);

  useEffect(() => {
    dispatch(fetchWater());
  }, [dispatch]);

  const handleOpenModal = (id) => {
    dispatch(setSelectedWaterId(id));
    dispatch(changeDeleteWaterModalOpen(true));
  };

  /* Логика скрола слайдера (ползунка) */
  const handleSliderChange = (event) => {
    const value = event.target.value;
    setScrollPosition(value);
    if (containerRef.current) {
      containerRef.current.scrollLeft = value;
    }
  };

  /* Логика скрола слайдера (ползунка) */
  const updateMaxScroll = () => {
    if (containerRef.current) {
      setMaxScroll(containerRef.current.scrollWidth - containerRef.current.clientWidth);
    }
  };

  /* Логика скрола слайдера (ползунка) */
  useLayoutEffect(() => {
    updateMaxScroll();
    window.addEventListener("resize", updateMaxScroll);
    return () => {
      window.removeEventListener("resize", updateMaxScroll);
    };
  }, [waters]);

  return (
    <div className={css.waterListContainer}>
      <div className={css.waterList} ref={containerRef}>
        {waters.map((item) => (
          <WaterItem
            key={item.id}
            id={item.id}
            amount={item.amount}
            date={item.time}
            onEdit={() => console.log("Edit item")}
            onDelete={() => console.log("Delete item")}
            handleOpenModal={handleOpenModal}
          />
        ))}
      </div>
      {waters.length > 2 && (
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
      )}
    </div>
  );
};

export default WaterList;
