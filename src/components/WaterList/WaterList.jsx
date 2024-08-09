//WaterList.jsx
import { useState, useLayoutEffect, useRef, useEffect } from "react";
import WaterItem from "../WaterItem/WaterItem";
import css from "./WaterList.module.css";
import { useSelector } from "react-redux";
import { selectWaters } from "../../redux/water/selectors-water";
import { useDispatch } from "react-redux";
import { fetchWater } from "../../redux/water/ops-water.js";
import {
  changeDeleteWaterModalOpen,
  setSelectedWaterId,
} from "../../redux/water/slice-water.js";
import useScreenWidth from "../../helpers/useScreenWidth"; // Импортируем хелпер

const WaterList = () => {
  const data = useSelector(selectWaters);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchWater());
  }, []);

  const handleOpenModal = (id) => {
    dispatch(setSelectedWaterId(id));
    dispatch(changeDeleteWaterModalOpen(true));
  };

  const [scrollPosition, setScrollPosition] = useState(0);
  const containerRef = useRef(null);
  const [maxScroll, setMaxScroll] = useState(0);
  const screenWidth = useScreenWidth(); // Получаем ширину экрана

  /*Логика скрола слайдера(ползунка) */
  const handleSliderChange = (event) => {
    const value = event.target.value;
    setScrollPosition(value);
    if (containerRef.current) {
      containerRef.current.scrollLeft = value;
    }
  };
  /*Логика скрола слайдера(ползунка) */
  const updateMaxScroll = () => {
    if (containerRef.current) {
      setMaxScroll(
        containerRef.current.scrollWidth - containerRef.current.clientWidth
      );
    }
  };
  /*Логика скрола слайдера(ползунка) */
  useLayoutEffect(() => {
    updateMaxScroll();
    window.addEventListener("resize", updateMaxScroll);
    return () => {
      window.removeEventListener("resize", updateMaxScroll);
    };
  }, [data]);

  const showSlider =
    (screenWidth < 768 && data.length > 2) || 
    (screenWidth >= 768 && screenWidth < 1440 && data.length > 3) || 
    (screenWidth >= 1440 && data.length > 3);

  return (
    <div className={css.waterListContainer}>
      <div className={css.waterList} ref={containerRef}>
        {data.map((item) => (
          <WaterItem
            key={item._id}
            id={item._id}
            amount={item.waterAmount}
            date={item.date}
            onEdit={() => console.log("Edit item")}
            onDelete={() => console.log("Delete item")}
            handleOpenModal={handleOpenModal}
          />
        ))}
      </div>
      {showSlider && (
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