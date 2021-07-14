'use strict';
const chai = require('chai');
const assert = chai.assert;

const signer = require('..');
const signerInit = new signer();

describe('signer', () => {
	it('signer test', function () {
		assert.equal('2', '2')
	});

	it('signer inner test', function () {
		let res = signerInit.test();
		assert.equal('lalala', res);
	})
});
