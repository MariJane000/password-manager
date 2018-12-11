import React from 'react';
import {DashboardConsumer} from '../DashboardContext';
import ModalForm from './modalForm/modalForm';

const Modal = () => {
  return (
    <DashboardConsumer>
      {({
        handleFormSubmit,
        closeModal,
        currentPassword,
        handleInput,
        getErrors
      }) => (
          <div className="modal visible shown">
            <div className="modal__content">
              <div className="modal__inner">
                <div className="modal__header">
                  <div className="modal__title">Site</div>
                </div>
                <div className="modal__body">
                  <div className="modal__form">
                    <ModalForm
                      fields={currentPassword}
                      handleInput={handleInput}
                      getErrors={getErrors}
                    />
                  </div>
                  <div className="modal__btn-group">
                    <div className="modal__btn">
                      <button
                        className="c-btn"
                        onClick={handleFormSubmit}>
                        OK
                          <span className="c-btn__decor c-btn__decor--left" />
                        <span className="c-btn__decor c-btn__decor--right" />
                      </button>
                    </div>
                    <div className="modal__btn">
                      <button
                        className="c-btn c-btn--grey"
                        onClick={closeModal}>
                        {' '} Cancel
                          <span className="c-btn__decor c-btn__decor--left" />
                        <span className="c-btn__decor c-btn__decor--right" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
    </DashboardConsumer>
  );
}

export default Modal;
