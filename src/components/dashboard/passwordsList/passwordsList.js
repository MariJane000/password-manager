import React from 'react';
import PasswordItem from './passwordItem/passwordItem';
import {DashboardConsumer} from '../DashboardContext';

const PasswordsList = () => {
  const getPasswordList = (usersPasswords, openModal, deletePassword) => {
    return usersPasswords.map((item, index) => (
      <PasswordItem
        item={item}
        key={item.id}
        remove={deletePassword.bind(this, index)}
        edit={openModal.bind(this, index)} />
    ));
  }

  return (
    <DashboardConsumer>
      {({usersPasswords, deletePassword, openModal}) => (
        <div className="l-grid__row">
          <div className="l-grid__content l-grid__content--no-scroll">
            <div className="table-list">
              <div className="table-list__head">
                <div className="table-list__row">
                  <div className="table-list__item">Site</div>
                  <div className="table-list__item">User name</div>
                  <div className="table-list__item">password</div>
                </div>
              </div>
              <div className="table-list__body">
                {getPasswordList(usersPasswords, openModal, deletePassword)}
              </div>
            </div>
          </div>
        </div>
      )}
    </DashboardConsumer>
  )
}

export default PasswordsList;