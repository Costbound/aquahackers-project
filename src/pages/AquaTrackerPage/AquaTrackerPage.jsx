import WaterDetailedInfo from "../../components/WaterDetailedInfo/WaterDetailedInfo";
import WaterMainInfo from "../../components/WaterMainInfo/WaterMainInfo.jsx";
import css from "./AquaTrackerPage.module.css";
import Page from "../../components/Page/Page.jsx";
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
    <div>
      <Page>
        <div className={css.waterMainInfoContainer}>
          <WaterMainInfo />
        </div>

        <div className={css.waterDetailedInfoContainer}>
          <WaterDetailedInfo />
        </div>
      </Page>
    </div>
  );
};

export default AquaTrackerPage;
