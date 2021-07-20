import React from 'react';
import { Modal } from 'antd';

const NotLoginModal = props => {
  return loginModalStep === 1 ? (
    <div className="center">
      <div className="logo">
        <img src={logoSingle} alt="" />
      </div>
      <div className="mt20 fs12 c-5A5E89">{intl.get('wallet.use_justlend')}</div>
      <div className="wallet-list">
        <div
          className="wallet-item"
          onClick={e => {
            this.loginWallet(e, 1);
          }}
        >
          <span>
            <img src={tronlink} className="tronlink-logo" alt="" />
          </span>
          <div>
            <span className="wallet-txt">{intl.get('login_modal.tronlink')}</span>
            <img src={tronlinkRightArrow} className="tronlink-right-arrow-logo" alt="" />
          </div>
        </div>
      </div>

      <div className="tronlink-tips">
        <span>{intl.get('wallet.accept_tips')} </span>
        <a href="https://chrome.google.com/webstore/detail/tronlink%EF%BC%88%E6%B3%A2%E5%AE%9D%E9%92%B1%E5%8C%85%EF%BC%89/ibnejdfjmmkpcnlpebklmnkoeoihofec">
          {intl.get('wallet.service')}
        </a>
        &nbsp;
        <a href="https://chrome.google.com/webstore/detail/tronlink%EF%BC%88%E6%B3%A2%E5%AE%9D%E9%92%B1%E5%8C%85%EF%BC%89/ibnejdfjmmkpcnlpebklmnkoeoihofec">
          {intl.get('wallet.privacy')}
        </a>
      </div>
    </div>
  ) : (
    <div className="center">
      <div className="logo">
        <img src={logoSingle} alt="" />
      </div>
      <div className="mt20 fs12 c-5A5E89">{intl.get('wallet.authorize_justlend')}</div>
      <div className="wallet-list">
        <div className="wallet-item flex-justify-center">
          <div className="points">
            <span className="point"></span>
            <span className="point"></span>
            <span className="point"></span>
          </div>
        </div>
      </div>
      <div className="tronlink-tips">
        <span>{intl.get('wallet.no_wallet')} </span>
        <a href="https://chrome.google.com/webstore/detail/tronlink%EF%BC%88%E6%B3%A2%E5%AE%9D%E9%92%B1%E5%8C%85%EF%BC%89/ibnejdfjmmkpcnlpebklmnkoeoihofec">
          {intl.get('wallet.click_to_get')}
        </a>
      </div>
    </div>
  );
};
