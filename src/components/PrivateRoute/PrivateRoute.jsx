import {selectIsLoggedIn} from "../../redux/auth/selectors-auth.js";
import {useSelector} from "react-redux";
import {Navigate} from "react-router";

function PrivateRoute({ component, redirectTo = '/' }) {
    const isLoggedIn = useSelector(selectIsLoggedIn);

    return isLoggedIn ? component : <Navigate to={redirectTo} />;
}

export default PrivateRoute;