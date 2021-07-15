'use strict';

import Config from '../../../defi.config';
import bigNumber from 'bignumber.js';

module.exports = utils;

function utils() {
	const chain = Config.chain;

	this.tronWeb = new TronWeb({
		fullHost: chain.fullHost
	});

	bigNumber.config({ EXPONENTIAL_AT: 1e9 });
	bigNumber.prototype._toFixed = function (...arg) {
		return new bigNumber(this).isNaN() ? '0' : new bigNumber(this.toFixed(...arg)).toString();
	};
	bigNumber.prototype._toFixedNew = function (...arg) {
		return new bigNumber(this.toFixed(...arg)).toString();
	};
	bigNumber.prototype._toBg = function () {
		return this;
	};
	bigNumber.prototype._toHex = function () {
		return `0x${this.toString(16)}`;
	};

	bigNumber.prototype._toIntegerDown = function () {
		return new bigNumber(this).isNaN() ? '0' : new bigNumber(this).integerValue(this.ROUND_DOWN);
	};

	this.BigNumber = bigNumber;

	this.toBigNumber = tronWeb.toBigNumber;
	this.toDecimal = tronWeb.toDecimal;
}
