import useModal from "./useModal";
import {createContext} from "react";
import GlobalModal from "./GlobalModal.jsx";

const ModalContext = createContext();
let { Provider } = ModalContext

const ModalProvider = ({children}) => {
    const {isModalOpen, openModal, closeModal, modalContent} = useModal();
    return (
        <Provider value={{isModalOpen, openModal, closeModal, modalContent}}>
            <GlobalModal />
            {children}
        </Provider>
    );
};

export { ModalContext, ModalProvider };