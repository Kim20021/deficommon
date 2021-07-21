import React from 'react';
import { Modal } from 'antd';
import AccountModal from './AccountModal';
import NotLoginModal from './NotLoginModal';

const LoginModal = props => {
  return (
    <Modal
      title={
        network.loginModalStep === 1 ? (
          <div className="common-modal-title left">{intl.get('header.connect_wallet')}</div>
        ) : null
      }
      visible={network.loginModalVisible}
      onCancel={handleCancel}
      footer={null}
      className="common-modal common-bg"
      width={540}
    >
      {isConnected ? <AccountModal /> : <NotLoginModal />}
    </Modal>
  );
};

export default LoginModal;
