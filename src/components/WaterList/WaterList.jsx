import { useState, useLayoutEffect, useRef, useEffect } from "react";
import WaterItem from "../WaterItem/WaterItem";
import css from "./WaterList.module.css";
import { useSelector } from "react-redux";
import { selectIsWatersLoading, selectSelectedDate, selectWaters } from "../../redux/water/selectors-water";
import { useDispatch } from "react-redux";
import { fetchWater } from "../../redux/water/ops-water.js";
import {
  changeDeleteWaterModalOpen,
  setSelectedWaterId,
} from "../../redux/water/slice-water.js";
import useScreenWidth from "../../helpers/useScreenWidth";
import Loader from "../Loader/Loader.jsx"; 

const WaterList = () => {
  const data = useSelector(selectWaters);
  const dispatch = useDispatch();
  const selectedDate = useSelector(selectSelectedDate);
  const isLoading = useSelector(selectIsWatersLoading);

  useEffect(() => {
    dispatch(fetchWater(selectedDate));
  }, [dispatch, selectedDate]);

  const handleOpenModal = (id) => {
    dispatch(setSelectedWaterId(id));
    dispatch(changeDeleteWaterModalOpen(true));
  };

  const [scrollPosition, setScrollPosition] = useState(0);
  const containerRef = useRef(null);
  const [maxScroll, setMaxScroll] = useState(0);
  const screenWidth = useScreenWidth();

  const handleSliderChange = (event) => {
    const value = event.target.value;
    setScrollPosition(value);
    if (containerRef.current) {
      containerRef.current.scrollLeft = value;
    }
  };

  const updateMaxScroll = () => {
    if (containerRef.current) {
      setMaxScroll(
        containerRef.current.scrollWidth - containerRef.current.clientWidth
      );
    }
  };

  useLayoutEffect(() => {
    updateMaxScroll();
    window.addEventListener("resize", updateMaxScroll);
    return () => {
      window.removeEventListener("resize", updateMaxScroll);
    };
  }, [data]);

  const showSlider =
    !isLoading && 
    ((screenWidth < 768 && data.length > 2) || 
    (screenWidth >= 768 && screenWidth < 1440 && data.length > 3) || 
    (screenWidth >= 1440 && data.length > 3));

  return (
    <div className={css.waterListContainer}>
      {data.length === 0 ? (
        <div className={css.emptyMessage}>
          <div className={css.waterTitle}>No water item available!</div>
          <div className={css.waterDescription}>
            You can add a new entry using the &quot;Add water&quot; button.
          </div>
        </div>
      ) : (
        <>
          {isLoading ? (
            <Loader />
          ) : (
            <div className={css.waterList} ref={containerRef}>
              {data.map((item) => (
                <WaterItem
                  key={item._id}
                  id={item._id}
                  amount={item.waterAmount}
                  dateTime={item.date}
                  handleOpenModal={handleOpenModal}
                />
              ))}
            </div>
          )}
          {showSlider && (
            <input
              type="range"
              min="0"
              max={maxScroll || 100}
              value={scrollPosition}
              className={css.slider}
              onChange={handleSliderChange}
            />
          )}
        </>
      )}
    </div>
  );
};

export default WaterList;
