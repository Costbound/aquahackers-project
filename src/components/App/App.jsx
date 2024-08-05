import "./App.module.css";
import { useDispatch, useSelector } from "react-redux";
import { selectIsRefreshing } from "../../redux/auth/selectors-auth.js";
import { Route, Routes } from "react-router";
import HomePage from "../../pages/HomePage/HomePage";
import SignInPage from "../../pages/SignInPage/SignInPage.jsx";
import SignUpPage from "../../pages/SignUpPage/SignUpPage.jsx";
import RestrictedRoute from "../RestrictedRoute/RestrictedRoute.jsx";
import PrivateRoute from "../PrivateRoute/PrivateRoute.jsx";
import AquaTrackerPage from "../../pages/AquaTrackerPage/AquaTrackerPage.jsx";
import Loader from "../Loader/Loader.jsx";
import { useEffect } from "react";
import { refresh } from "../../redux/auth/ops-auth.js";
// import { selectIsModalOpen, selectModalContent } from "../../redux/modal/selectors-modal.js";
// import Modal from "../Modal/Modal.jsx";

export default function App() {
  const dispatch = useDispatch();
  const isRefreshing = useSelector(selectIsRefreshing);
  // const isModalOpen = useSelector(selectIsModalOpen);
  // const modalContent = useSelector(selectModalContent);
  // console.log(modalContent);
  // console.log(isModalOpen);

  useEffect(() => {
    dispatch(refresh());
  }, [dispatch]);

  return isRefreshing ? (
    <Loader type="global" width="100" height="100" />
  ) : (
      <>
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
          <PrivateRoute component={<AquaTrackerPage />} redirectTo="/signin" />
        }
      />
          <Route path="*" element={<div>Not Found</div>} />
        </Routes>

        {/* {isModalOpen && <Modal isOpen={isModalOpen}>
          {modalContent}
        </Modal>} */}
        </>
  );
}
