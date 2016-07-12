import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import actions from '../actions';

import '../styles/dns.scss';

const DnsP = ({ model, app, onLoadDns, onToggleVisible }) => {
  const dnsList = model.map(dns => {
    return <li key={dns.get('id')}>
      {dns.get('domain')} -> {dns.get('ip')}</li>
  });

  return (
    <div className="dns">
      <div className="btn-group">
        <span>
          <button className="btn btn-primary" onClick={onLoadDns}>
            Load DNS Table
          </button>
        </span>
        <span>
          <button className="btn btn-primary" onClick={onToggleVisible}>
            Toggle Visible
          </button>
        </span>
      </div>

      {app.get('entriesVisible') ?
        <ul>{dnsList}</ul> : <h3>List is hidden.</h3>}
    </div>
  );
};

DnsP.propTypes = {
  model: PropTypes.object.isRequired,
  app: PropTypes.object.isRequired,
  onLoadDns: PropTypes.func.isRequired,
  onToggleVisible: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
  return {
    model: state.dns.get('model'),
    app: state.dns.get('app')
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLoadDns: () => dispatch(actions.loadDns()),
    onToggleVisible: () => dispatch(actions.toggleVisible())
  };
};

const DnsC = connect(
  mapStateToProps,
  mapDispatchToProps
)(DnsP);

export default DnsC;
