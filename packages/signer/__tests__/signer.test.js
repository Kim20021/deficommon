'use strict';
const chai = require('chai');
const assert = chai.assert;

const signer = require('..');
const signerInit = new signer();

import Config from '../../../defi.config';
const { stableLp, lpStablePool } = Config;

describe('signer', () => {
	it('signer test', function () {
		assert.equal('1', '1')
	});

	it('signer approve', function () {
		const intlObj = {
			action: 'approve',
			title: 'deposit.approve_token',
			obj: {
				value: 'USD' // todo, should be symbol
			},
			continuous: true
		};
		const txID = await signerInit.toApproveLP(
			stableLp,
			lpStablePool,
			intlObj
		);
		console.log(txID);
		assert.equal('2', '2');
	})
});
