import "./App.module.css";
import { useDispatch, useSelector } from "react-redux";
import { selectIsRefreshing } from "../../redux/auth/selectors-auth.js";
import { Route, Routes } from "react-router";
import { Suspense, lazy } from "react";
import RestrictedRoute from "../RestrictedRoute/RestrictedRoute.jsx";
import PrivateRoute from "../PrivateRoute/PrivateRoute.jsx";
import Loader from "../Loader/Loader.jsx";
import { useEffect } from "react";
import { refresh } from "../../redux/auth/ops-auth.js";
import { ModalProvider } from "../Modal/ModalProvider.jsx";
import ChartComponent from "../Statistics/ChartComponent.jsx";

const HomePage = lazy(() => import("../../pages/HomePage/HomePage"));
const SignUpPage = lazy(() => import("../../pages/SignUpPage/SignUpPage.jsx"));
const SignInPage = lazy(() => import("../../pages/SignInPage/SignInPage.jsx"));
const AquaTrackerPage = lazy(() =>
  import("../../pages/AquaTrackerPage/AquaTrackerPage.jsx")
);
const NotFoundPage = lazy(() =>
  import("../../pages/NotFoundPage/NotFoundPage.jsx")
);

export default function App() {
  const dispatch = useDispatch();
  const isRefreshing = useSelector(selectIsRefreshing);

  useEffect(() => {
    dispatch(refresh());
  }, [dispatch]);

  return isRefreshing ? (
    <Loader type="global" width="100" height="100" />
  ) : (
    <Suspense fallback={<Loader type="global" width="100" height="100" />}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/signup"
          element={
            <RestrictedRoute component={<SignUpPage />} redirectTo="/tracker" />
          }
        />
        <Route
          path="/signin"
          element={
            <RestrictedRoute component={<SignInPage />} redirectTo="/tracker" />
          }
        />
        <Route
          path="/tracker"
          element={
            <PrivateRoute
              component={<AquaTrackerPage />}
              redirectTo="/signin"
            />
          }
        >
          <Route path="statistics" element={<ChartComponent />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
}
