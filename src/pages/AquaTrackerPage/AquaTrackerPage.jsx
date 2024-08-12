import WaterDetailedInfo from "../../components/WaterDetailedInfo/WaterDetailedInfo";
import WaterMainInfo from "../../components/WaterMainInfo/WaterMainInfo.jsx";
import {useDispatch} from "react-redux";
import {getUserData} from "../../redux/userData/ops-userData.js";
import {useEffect} from "react";

const AquaTrackerPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUserData = async () => {
      await dispatch(getUserData())
    }

    fetchUserData();
  }, [dispatch])

  return (
      <>
          <WaterMainInfo />
          <WaterDetailedInfo />
      </>
  );
};

export default AquaTrackerPage;
