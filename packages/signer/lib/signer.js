'use strict';

import TronWeb from 'tronweb';
import Config from '../../../defi.config';
// import { BigNumber } from '../../utils';

const { chain, trongrid } = Config;
const DATA_LEN = 64;
export const MAX_UINT256 = '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff';
const privateKey = chain.privateKey;
const mainchain = new TronWeb({
	fullHost: chain.fullHost,
	privateKey
});
if (trongrid && mainchain.setHeader && mainchain.fullNode.host === trongrid.host) {
	mainchain.setHeader(trongrid.headers);
}

module.exports = signer;

function signer() {
	this.triggerSmartContract = async (address, functionSelector, options = {}, parameters = []) => {
		try {
			const tronweb = window.tronWeb;
			const transaction = await tronweb.transactionBuilder.triggerSmartContract(
				address,
				functionSelector,
				Object.assign({ feeLimit: Config.feeLimit }, options),
				parameters
			);

			if (!transaction.result || !transaction.result.result) {
				throw new Error('Unknown trigger error: ' + JSON.stringify(transaction.transaction));
			}
			return transaction;
		} catch (error) {
			throw new Error(error);
		}
	};

	this.view = async (address, functionSelector, parameters = [], isDappTronWeb = true) => {
		try {
			let tronweb = mainchain;
			if (!isDappTronWeb && window.tronWeb && window.tronWeb.ready) {
				tronweb = window.tronWeb;
			}
			const result = await tronweb.transactionBuilder.triggerSmartContract(
				address,
				functionSelector,
				{ _isConstant: true },
				parameters
			);
			return result && result.result ? result.constant_result : [];
		} catch (error) {
			console.log(`view error ${address} - ${functionSelector}`, error.message ? error.message : error);
			return [];
		}
	};
}
