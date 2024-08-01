import UserPanel from '../UserPanel/UserPanel';
import UserBar from '../UserBar/UserBar';
import DailyInfo from '../DailyInfo/DailyInfo';
import styles from './App.module.css';

const App = () => {
    return (
        <div className={styles.container}>
        <div className={styles.app}>
             
            <UserPanel />
            <UserBar />
            <DailyInfo />
        </div>
        </div>
    );
};

export default App;
