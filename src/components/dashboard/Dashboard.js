import React from 'react';
import Modal from './modal';
import PasswordsList from './passwordsList';
import PasswordsListHeader from './passwordsList/passwordsListHeader/passwordListHeader';
import DashboardProvider, {DashboardConsumer} from './DashboardContext';

const Dashboard = () => {
  const getModal = (isOpenModal, closeModal) => {
    if (!isOpenModal) return null;
    return <Modal close={closeModal} />
  }

  return (
    <DashboardProvider>
      <DashboardConsumer>
        {({isOpenModal, closeModal, openModal}) => (
          <div className="l-grid__wrapper">
            <PasswordsListHeader
              openModal={openModal} />
            <PasswordsList />
            {getModal(isOpenModal, closeModal)}
          </div>
        )}
      </DashboardConsumer>
    </DashboardProvider>
  );
}

export default Dashboard;
