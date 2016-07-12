import chai from 'chai';
const expect = chai.expect;
import Imm from 'immutable';
import mockDns from '../../../mock_data/dns.json';
import { actionTypes } from '../actions';
import reducer from '../reducer';

const expectedDefaultState = Imm.fromJS({
  model: [],
  app: {
    entriesVisible: true
  }
});

describe('dns reducer', function() {
  it('should have correct defaultState', function() {
    const outputState = reducer(undefined, {type: 'DERP'});
    expect(outputState.equals(expectedDefaultState)).to.be.true;
  });

  it('should set state tree correctly on LOAD_DNS_FULFILLED', function() {
    const expectedState = expectedDefaultState.set('model', Imm.fromJS(mockDns));
    const outputState = reducer(undefined, {
      type: actionTypes.LOAD_DNS_FULFILLED,
      payload: {
        data: mockDns
      }
    });

    expect(outputState.equals(expectedState)).to.be.true;
  });

  it('should set state tree correctly on TOGGLE_VISIBLE', function() {
    const expectedState = expectedDefaultState.setIn(
      ['app', 'entriesVisible'], false
    );

    const outputState = reducer(undefined, {
      type: actionTypes.TOGGLE_VISIBLE
    });

    expect(outputState.equals(expectedState)).to.be.true;
  });
});
