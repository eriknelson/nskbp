import { Component } from 'react';
import { connect } from 'react-redux';

import actions from '../actions';

const DnsP = ({ model, app, onLoadDns, onToggleVisible }) => {
  const dnsList = model.map(dns => {
    return <li>{dns.get('id')} | {dns.get('domain')} | {dns.get('ip')}</li>
  });

  return (
    <div className="dns">

      <div>
        <span>
          <button
            className="btn btn-primary load-dns-btn"
            onClick={onLoadDns}>Load DNS Table</button>
        </span>
        <span>
          <button
            className="btn btn-primary toggle-vis-btn"
            onClick={onToggleVisible}>Toggle Visible</button>
        </span>
      </div>

      {
        () => {
          app.get('entriesVisible') ?
            <ul>{dnsList}</ul> : <h3>List is hidden.<h3>
        }
      }

    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    model: state.get('dns'),
    app: state.getIn(['dns', 'app'])
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLoadDns: () => dispatch(actions.loadDns()),
    onToggleVisible: () => dispatch(actions.toggleVisible())
  }
};

const DnsC = connect(
  mapStateToProps,
  mapDispatchToProps
)(DnsP);

export default DnsC;
