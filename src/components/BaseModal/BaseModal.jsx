import PropTypes from 'prop-types';
import css from './BaseModal.module.css';
import { IconClose } from '../Icons/IconClose';
import Modal from 'react-modal';

export const BaseModal = ({ isOpen, onClose, children }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={() => onClose()}
      className={css.modalContent}
      ariaHideApp={false}
      overlayClassName={css.overlay}
    >
      <div onClick={() => onClose()}>
        <IconClose />
      </div>
      {children}
    </Modal>
  );
};
BaseModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node,
};