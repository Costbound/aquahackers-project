import css from './AddWaterBtn.module.css';
import icon from '../../img/icons.svg';
import Button from '../../components/Button/Button.jsx'

export default function AddWaterBtn() {
    return (
      
        <Button className={css.addButton }type='button' 
            styleType={"dark"}>
             <svg className={css.svgIconAdd}>
                <use href={`${icon}#icon-plus-1`} />
            </svg>Add water
        </Button >
    )
};

  // <button className={css.button}>
        //     <svg className={css.svgIconAdd}>
        //             <use href={`${icon}#icon-plus-1`}/>
        //         </svg> 
        //     Add water</button>