import './App.module.css'
import {useSelector} from "react-redux";
import {selectIsRefreshing} from "../../redux/auth/selectors-auth.js";
import {Route, Routes} from "react-router";
// import HomePage from '../../pages/HomePage/HomePage'
// import SignInPage from "../../pages/SignInPage/SignInPage.jsx";
// import SignUpPage from "../../pages/SignUpPage/SignUpPage.jsx";
// import RestrictedRoute from "../RestrictedRoute/RestrictedRoute.jsx";
// import PrivateRoute from "../PrivateRoute/PrivateRoute.jsx";
import AquaTrackerPage from "../../pages/AquaTrackerPage/AquaTrackerPage.jsx";


export default function App() {
    const isRefreshing = useSelector(selectIsRefreshing);

    return isRefreshing ? (
        <p>Loading</p>
    ) : (
        <Routes>
            {/* <Route path='/' element={<HomePage />} />
            <Route path='/signup' element={<RestrictedRoute component={<SignUpPage />} redirectTo='/aqua-tracker' />} />
            <Route path='/signin' element={<RestrictedRoute component={<SignInPage />} redirectTo='/aqua-tracker' />} />
            <Route path='/aqua-tracker' element={<PrivateRoute component={<AquaTrackerPage />} redirectTo='/signin' />} />
            <Route path='*' element={<div>Not Found</div>} />
             */}
             <Route path='/aqua-tracker' element={<AquaTrackerPage />} />
        </Routes>
    )
}