'use strict';

import Config from '../../../defi.config';

const { trongrid, chain } = Config;
class Login {
  constructor() {
    this.isConnected = false;
    this.defaultAccount = null;
    this.tronWeb = null;
  }

  test() {
    return 'hello world';
  }

  checkLogin() {
    if (!window.tronWeb || !window.tronWeb.defaultAddress.base58) {
      return false;
    }
    if (!this.defaultAccount) {
      return false;
    }
    return true;
  }

  async initTronLinkWallet(cb, cbn) {
    try {
      let timeCount = 0;
      const self = this;
      const tmpTimer1 = setInterval(() => {
        timeCount++;
        if (timeCount > 8) {
          self.isConnected = false;
          cbn && cbn();
          clearInterval(tmpTimer1);
        }
        if (window.tronWeb && window.tronWeb.ready) {
          if (process.env.REACT_APP_ENV === 'test') {
            window.tronWeb.setFullNode('https://api.nileex.io');
          }

          if (trongrid && window.tronWeb.setHeader && window.tronWeb.fullNode.host === trongrid.host) {
            window.tronWeb.setHeader({ 'TRON-PRO-API-KEY': trongrid.key });
          }
          self.tronWeb = window.tronWeb;
          self.defaultAccount = self.tronWeb.defaultAddress.base58;
          window.defaultAccount = self.defaultAccount;
          self.isConnected = true;
          cb && cb();
          clearInterval(tmpTimer1);
        }
      }, 1000);
    } catch (e) {
      console.log(e);
    }
  }

  listenTronLink() {
    window.addEventListener('message', res => {
      if (res.data.message && res.data.message.action == 'setAccount') {
        if (window.tronWeb) {
          if (res.data.message.data.address != this.defaultAccount) {
            window.location.reload();
          }
        } else {
          window.location.reload();
        }
      }
      if (res.data.message && res.data.message.action == 'setNode') {
        window.location.reload();
      }
    });
  }

  checkNodeEnvironment() {
    window.addEventListener('message', function (e) {
      if (e.data.message && e.data.message.action == 'tabReply') {
        if (e.data.message.data.data.node.fullNode !== chain.fullHost) {
          alert('node is not patch');
        }
      }
    });
  }
}

module.exports = Login;
