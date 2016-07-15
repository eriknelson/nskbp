import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import actions from '../actions';

import '../styles/dns.scss';

class Dns extends React.Component {
  render() {
    const { model, ui, onLoadDns, onToggleVisible } = this.props;

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

        {ui.get('entriesVisible') ?
          <ul>{dnsList}</ul> : <h3>List is hidden.</h3>}
      </div>
    );
  }
}

Dns.propTypes = {
  model: PropTypes.object.isRequired,
  ui: PropTypes.object.isRequired,
  onLoadDns: PropTypes.func.isRequired,
  onToggleVisible: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
  return {
    model: state.dns.get('model'),
    ui: state.dns.get('ui')
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLoadDns: () => dispatch(actions.loadDns()),
    onToggleVisible: () => dispatch(actions.toggleVisible())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dns);
