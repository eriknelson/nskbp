import { getResourceUrl } from '../shared/api';
import { fetch } from 'redux-auth';

const actionTypes = {
  LOAD_DNS: 'dns.LOAD_DNS',
  LOAD_DNS_PENDING: 'dns.LOAD_DNS_PENDING',
  LOAD_DNS_FULFILLED: 'dns.LOAD_DNS_FULFILLED',
  LOAD_DNS_REJECTED: 'dns.LOAD_DNS_REJECTED',
  TOGGLE_VISIBLE: 'dns.TOGGLE_VISIBLE'
};

const actions = {
  loadDns: () => {
    return {
      type: actionTypes.LOAD_DNS,
      payload: fetch(getResourceUrl('dns')).then(res => res.json())
    }
  },
  toggleVisible: () => {
    return {
      type: actionTypes.TOGGLE_VISIBLE
    }
  }
};

export { actionTypes };
export default actions;
