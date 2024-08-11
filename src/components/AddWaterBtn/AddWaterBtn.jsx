import css from './AddWaterBtn.module.css';
import icon from '../../img/icons.svg';
import Button from '../../components/Button/Button.jsx'
import {useContext} from 'react';
import {ModalContext} from "../Modal/ModalProvider.jsx";
import WaterModal from "../WaterModal/WaterModal.jsx";
import {useSelector} from "react-redux";
import {selectTodayDate} from "../../redux/water/selectors-water.js";

export default function AddWaterBtn() {
    const {openModal} = useContext(ModalContext)
    const todayDate = useSelector(selectTodayDate)

    const handleModalOpen = () => {
        openModal(<WaterModal type='add' date={todayDate}/>)
    }

    return (
       < >
       <Button
            className={css.addButton}
            type='button' 
            styleType={"dark"}
            onClick={handleModalOpen}>
             <svg className={css.svgIconAdd}>
                    <use href={`${icon}#icon-plus-1`} />
            </svg>Add water
        </Button >
       </>
    )
};

