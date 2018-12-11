import React from 'react';

const PasswordsListHeader = ({openModal}) => {
  return (
    <div className="l-grid__head">
      <div className="c-heading">List of sites</div>
      <div className="l-grid__btn sites__btn-group">
        <div className="sites__btn">
          <button className="c-btn" onClick={openModal.bind(this, null)}> Create
          <span className="c-btn__decor c-btn__decor--left"></span>
            <span className="c-btn__decor c-btn__decor--right"></span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default PasswordsListHeader;