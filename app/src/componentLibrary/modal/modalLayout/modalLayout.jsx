/*
 * Copyright 2022 EPAM Systems
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Scrollbars } from 'react-custom-scrollbars';
import { motion, AnimatePresence } from 'framer-motion';
import classNames from 'classnames/bind';
import { useOnClickOutside } from 'common/hooks';
import { ModalContent } from './modalContent';
import { ModalFooter } from './modalFooter';
import { ModalHeader } from './modalHeader';
import styles from './modalLayout.scss';

const ESC_KEYCODE = 27;
const cx = classNames.bind(styles);

export const ModalLayout = ({
  title,
  headerNode,
  children,
  footerNode,
  okButton,
  cancelButton,
  className,
  modalSize,
  onClose,
  overlay,
  allowCloseOutside,
}) => {
  const [isShown, setShown] = useState(false);
  const modalRef = useRef();

  const onKeydown = (e) => {
    if (e.keyCode === ESC_KEYCODE) {
      setShown(false);
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', onKeydown, false);
    setShown(true);
    if (modalRef && modalRef.current) {
      modalRef.current.focus();
    }

    return () => document.removeEventListener('keydown', onKeydown, false);
  }, []);

  const closeModal = () => {
    setShown(false);
  };

  useOnClickOutside(modalRef, allowCloseOutside && closeModal);

  return (
    <AnimatePresence onExitComplete={onClose}>
      {isShown && (
        <div
          className={cx('modal-layout', { [`overlay-${overlay}`]: overlay })}
          data-automation-id="modalWindow"
        >
          <div className={cx('scrolling-content')}>
            <Scrollbars>
              <motion.div
                className={cx('modal-window', { [`size-${modalSize}`]: modalSize }, className)}
                key="modal-window"
                ref={modalRef}
                tabIndex="0"
                initial={{ opacity: 0, marginTop: '-100px' }}
                animate={{ opacity: 1, marginTop: '80px' }}
                exit={{ opacity: 0, marginTop: '-100px' }}
                transition={{ duration: 0.3 }}
              >
                <ModalHeader title={title} headerNode={headerNode} onClose={closeModal} />
                <ModalContent>{children}</ModalContent>
                <ModalFooter
                  footerNode={footerNode}
                  okButton={okButton}
                  cancelButton={cancelButton}
                  closeHandler={closeModal}
                />
              </motion.div>
            </Scrollbars>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};
ModalLayout.propTypes = {
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  headerNode: PropTypes.node,
  children: PropTypes.node,
  footerNode: PropTypes.node,
  okButton: PropTypes.shape({
    text: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
    danger: PropTypes.bool,
    onClick: PropTypes.func,
    attributes: PropTypes.object,
  }),
  cancelButton: PropTypes.shape({
    text: PropTypes.string.isRequired,
  }),
  className: PropTypes.string,
  modalSize: PropTypes.oneOf(['default', 'small', 'large']),
  onClose: PropTypes.func,
  overlay: PropTypes.string,
  allowCloseOutside: PropTypes.bool,
};
ModalLayout.defaultProps = {
  title: '',
  headerNode: null,
  children: null,
  footerNode: null,
  okButton: null,
  cancelButton: null,
  className: '',
  modalSize: 'default',
  onClose: () => {},
  overlay: 'default',
  allowCloseOutside: true,
};
