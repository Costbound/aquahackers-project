import {useSelector} from "react-redux";
import {selectIsLoggedIn} from "../../redux/auth/selectors-auth.js";
import {Navigate} from "react-router";

function RestrictedRoute({component, redirectTo = '/'}) {
    const isLoggedIn = useSelector(selectIsLoggedIn)

    return !isLoggedIn ? component : <Navigate to={redirectTo} />
}

export default RestrictedRoute;