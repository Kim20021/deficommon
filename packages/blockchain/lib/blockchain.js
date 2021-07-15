'use strict';

import TronWeb from 'tronweb';
import Config from '../../../defi.config';

const { chain, trongrid, feeLimit } = Config;
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

module.exports = blockchain;

function blockchain() {

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

	this.sign = async transaction => {
		try {
			const tronweb = window.tronWeb;
			const signedTransaction = await tronweb.trx.sign(transaction.transaction);
			return signedTransaction;
		} catch (error) {
			console.log(error, 'signerr');
			throw new Error(error);
		}
	};

	this.sendRawTransaction = async signedTransaction => {
		try {
			const tronweb = window.tronWeb;
			const result = await tronweb.trx.sendRawTransaction(signedTransaction);
			return result;
		} catch (error) {
			throw new Error(error);
		}
	};
}
