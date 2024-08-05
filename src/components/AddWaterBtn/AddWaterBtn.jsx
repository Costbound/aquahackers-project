import css from './AddWaterBtn.module.css';
import icon from '../../img/icons.svg';


export default function AddWaterBtn() {
    return (
        <button className={css.button}>
            <svg className={css.svgIconAdd}>
                    <use href={`${icon}#icon-plus-1`}/>
                </svg> 
            Add water</button>
        
    )
};