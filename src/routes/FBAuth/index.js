import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import Content from '../../components/Content';
import { fetchFBAuth } from '../../actions/fbAuth';

import util from 'util';

function mapStateToProps(state) {
  return {
    fbAuth: state.fbAuth
  };
}

class FBAuth extends React.Component {
  static propTypes = {
    fbAuth: PropTypes.shape({
      accessToken: PropTypes.string,
      expiresIn: PropTypes.string,
    }).isRequired,
  }

  static defaultProps = {
    fbAuth: {
      accessToken: '',
      expiresIn: '',
    }
  }

  constructor(props) {
    super(props);

    this.state = { isTokenVisible: false };
  }

  toggleVisible() {
    this.setState({ isTokenVisible: !this.state.isTokenVisible });
  }

  componentDidMount() {
    this.props.fetchFBAuth();
  }

  render() {
    return (
      <Content title="FB 授權管理" subtitle="APP 直播需要 FB 授權範圍包含 : Page Manage, Post In Page">
        <div className="row">
          <div className="col-sm-8 col-xs-12">
            <div className="box">
              <div className="box-body">
                <div style={{marginBottom: '10px'}}>
                  <div className="input-group">
                    <input className="form-control"
                           value={this.props.fbAuth.accessToken}
                           type={this.state.isTokenVisible ? 'text' : 'password'}
                           disabled={true}
                    />
                    <span className="input-group-btn">
                    <button className="btn btn-default" onClick={this.toggleVisible.bind(this)}>
                      <i className={this.state.isTokenVisible ? 'fa-eye-slash fa fa-fw' : 'fa-eye fa fa-fw'}></i>
                    </button>
                  </span>
                  </div>
                </div>
                <div>
                  <a className="btn btn-primary btn-block" href="/auth/facebook">
                    <i className="fa fa-facebook fa-fw"></i>
                    取得授權
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Content>
    )
  }
}

export default connect(mapStateToProps, { fetchFBAuth })(FBAuth);
