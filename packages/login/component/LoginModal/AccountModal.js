import React from 'react';

import tronlinkBlue from '../assets/images/tronlinkBlue.svg';

const AccountModal = props => {
  const defaultAccount = props.defaultAccount;

  return (
    <div>
      <img className="mb16" src={tronlinkBlue} />
      <div className="address-con">
        <div className="tip-text mb16 fs12 c-5A5E89">"已登陆"</div>
        <div className="address-tex mb16">
          <div className="c-0F134F fs12">{defaultAccount}</div>
          <div
            className="pointer c-3D56D6 fs12"
            title={defaultAccount}
            id="copySpan"
            onClick={e => {
              copyToClipboard(e, '', 'copySpan');
            }}
          >
            {'复制'}
          </div>
        </div>
      </div>
    </div>
  );
};
