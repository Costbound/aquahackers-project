//WaterList.jsx
import { useState, useLayoutEffect, useRef, useEffect } from "react";
import WaterItem from "../WaterItem/WaterItem";
import css from "./WaterList.module.css";
import { useSelector } from "react-redux";
import { selectedWater } from "../../redux/water/selectors-water";
import { selectWaters } from "../../redux/water/selectors-water";
import { useDispatch } from "react-redux";
import { fetchWater } from "../../redux/water/ops-water.js";
import {
  changeDeleteWaterModalOpen,
  setSelectedWaterId,
} from "../../redux/water/slice-water.js";

/*Типо данные с компонетна модалки addwater */
// const initialData = [
//   { id: 1, amount: 250, time: "7:00 AM" },
//   { id: 2, amount: 300, time: "11:00 AM" },
//   { id: 3, amount: 350, time: "13:00 PM" },
//   { id: 4, amount: 400, time: "15:00 PM" },
//   { id: 5, amount: 450, time: "17:00 PM" },
//   { id: 6, amount: 1000, time: "19:00 PM" },
// ];

const WaterList = () => {
  //   const waters = useSelector(selectedWater);
  //   console.log(waters);
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
  //   const data = initialData;

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
      {data.length > 2 && (
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
