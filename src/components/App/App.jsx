import "./App.module.css";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router";
import { Suspense, lazy, useState } from "react";
import RestrictedRoute from "../RestrictedRoute/RestrictedRoute.jsx";
import PrivateRoute from "../PrivateRoute/PrivateRoute.jsx";
import Loader from "../Loader/Loader.jsx";
import { useEffect } from "react";
import { refresh } from "../../redux/auth/ops-auth.js";
import ChartComponent from "../Statistics/ChartComponent.jsx";
import SharedLayout from "../SharedLayout/SharedLayout.jsx";

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

  // Is refreshing is a local state to avoid Loader during auto refresh
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    const refreshUser = async () => {
      setIsRefreshing(true);
      await dispatch(refresh());
      setIsRefreshing(false);
    };

    refreshUser();
  }, [dispatch]);

  return isRefreshing ? (
    <Loader type="global" width="100" height="100" />
  ) : (
    <Suspense fallback={<Loader type="global" width="100" height="100" />}>
      <SharedLayout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/signup"
            element={
              <RestrictedRoute
                component={<SignUpPage />}
                redirectTo="/tracker"
              />
            }
          />
          <Route
            path="/signin"
            element={
              <RestrictedRoute
                component={<SignInPage />}
                redirectTo="/tracker"
              />
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
      </SharedLayout>
    </Suspense>
  );
}
