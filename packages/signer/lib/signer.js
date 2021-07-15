'use strict';

import Config from '../../../defi.config';
import { triggerSmartContract, sign, sendRawTransaction, MAX_UINT256 } from '../../utils/blockchain';
// import { setTransactionsData } from '../../utils';

module.exports = signer;

function signer() {
	trigger = async (address, functionSelector, parameters = [], options = {}, intlObj = {}, callbacks = false) => {
		try {
			// console.log(callbacks);
			if (!this.rootStore.network.defaultAccount) return; // 如果没登录，禁止所有交易操作触发
			this.openTransModal({ ...intlObj, step: 1 });
			const transaction = await triggerSmartContract(
				address,
				functionSelector,
				Object.assign({ feeLimit: Config.feeLimit }, options),
				parameters
			);

			const signedTransaction = await sign(transaction);
			const result = await sendRawTransaction(signedTransaction);
			if (!intlObj.continuous) {
				this.openTransModal({
					...intlObj,
					step: 2,
					txId: result.transaction.txID
				});
			}
			if (result && result.result) {
				console.log(result.transaction.txID);
				// setTransactionsData(result.transaction.txID, intlObj);
			}

			callbacks && this.executeCallback(callbacks);
			return result;
		} catch (error) {
			if (error && error.message == 'Confirmation declined by user') {
				this.openTransModal({ ...intlObj, step: 3 });
			}
			console.log(`trigger error ${address} - ${functionSelector}`, error.message ? error.message : error);
			return {};
		}
	};

	executeCallback = (args = [], timeout = 5000) => {
		args.map(arg => {
			let method = arg.shift();
			// Edge case: Skip executing this here so it's only called after an error (via lookForCleanCallBack)
			// If the callback is to execute a getter function is better to wait as sometimes the new value is not uopdated instantly when the tx is confirmed
			setTimeout(() => {
				method = method.split('/');
				if (method[0] === 'system') {
					this[method[1]](...arg);
				} else {
					let object = null;
					switch (method[0]) {
						case 'network':
							object = this.rootStore.network;
							break;
						case 'pool':
							object = this.rootStore.pool;
							break;
						default:
							break;
					}
					object && object[method[1]](...arg);
				}
			}, timeout);
		});
	};

	toApproveLP = async (tokenAddress, exchangeAddress, intlObj) => {
		// debugger;
		const result = await this.trigger(
			tokenAddress,
			'approve(address,uint256)',
			[
				{ type: 'address', value: exchangeAddress },
				{ type: 'uint256', value: MAX_UINT256 }
			],
			{},
			intlObj
		);
		//console.log(result);
		return result && result.transaction ? result.transaction.txID : '';
	};

}
