import css from './Loader.module.css'
import {Oval} from "react-loader-spinner";
import clsx from "clsx";

function Loader({type = "local", width = '40', height = '40', color = '#9BE1A0'}) {
    return (
        <div className={clsx(css[type], css.container)}>
            <Oval width={width} height={height} color={color} secondaryColor={color}/>
        </div>
    );
}

export default Loader;