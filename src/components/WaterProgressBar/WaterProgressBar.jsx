import css from './WaterProgressBar.module.css';

export default function WaterProgressBar() {
//      const progress = useSelector((state) => state.progressBar.progress);
//   const dispatch = useDispatch();

//   const fetchProgressData = async () => {
//     // Це приклад запиту до API для отримання прогресу з бази даних
//     const response = await fetch('https://api.example.com/progress');
//     const data = await response.json();
//     dispatch(setProgress(data.progress));
//   };

//   useEffect(() => {
//     fetchProgressData();
//   }, []);

//   const updateProgress = (newProgress) => {
//     dispatch(setProgress(newProgress));
//   };

    return (
        <div className={css.container}>
            <div className={css.containerToday}>
                <h2 className={css.text}>Today</h2>
       <div>
        <div className={css.progressContainer}>
        <div className={css.progressBar}
          style={{width: '60%'}}
        ></div>
        <div className={css.spanProgress}>
          <span>0%</span>
          <span>50%</span>
          <span>100%</span>
        </div>
        <div className={css.elipce} style={{ left: `60%` }}>
              <span className={css.interest}>{ '60%' }</span>                 
        </div>
      </div>
     
    </div>
           </div> 
        </div>
    )
}