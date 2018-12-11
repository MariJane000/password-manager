import React from 'react';
import {visibilityToggler} from '../../../../decorators';
import {ReactComponent as EditIcon} from '../../../../assets/icons/edit.svg';
import {ReactComponent as RemoveIcon} from '../../../../assets/icons/remove.svg';
import {ReactComponent as RevealIcon} from '../../../../assets/icons/reveal.svg';


const passwordItem = (props) => {
  const {username, password, site} = props.item;
  const {edit, remove, isShow, toggleVisibility} = props;
  return (
    <form className="table-list__row">
      <a className="table-list__item" target="_blank" rel="noopener noreferrer" href={site}>{site}</a>
      <div className="table-list__item">{username}</div>
      <input
        type={isShow ? 'text' : 'password'}
        readOnly
        className="table-list__item"
        value={password} />

      <div className="table-list__settings">
        <button
          className={`table-list__settings-btn ${isShow ? 'is-active' : ''}`}
          type="button"
          onClick={toggleVisibility}>
          <RevealIcon />
        </button>
        <button
          type="button"
          className="table-list__settings-btn"
          onClick={edit}>
          <EditIcon />
        </button>
        <button
          type="button"
          className="table-list__settings-btn icon"
          onClick={remove}>
          <RemoveIcon />
        </button>
      </div>
    </form>
  )
}
export default visibilityToggler(passwordItem);
