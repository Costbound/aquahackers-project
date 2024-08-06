import css from './AddWaterBtn.module.css';
import icon from '../../img/icons.svg';
import Button from '../../components/Button/Button.jsx'

export default function AddWaterBtn() {
    return (
      
        <Button type='button' width={'140px'} 
        height={'46px'}
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