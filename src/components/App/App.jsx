import UserPanel from '../UserPanel/UserPanel';
import UserBar from '../UserBar/UserBar';
import DailyInfo from '../DailyInfo/DailyInfo';
import css from './App.module.css';

const App = () => {
    return (
        <div className={css.container}>
        <div className={css.app}>
             
            <UserPanel />
            <UserBar />
            <DailyInfo />
        </div>
        </div>
    );
};

export default App;
