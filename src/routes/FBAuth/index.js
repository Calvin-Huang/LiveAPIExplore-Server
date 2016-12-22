import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import Content from '../../components/Content';
import { fetchFBAuth } from '../../actions/fbAuth';

import 'whatwg-fetch';

function mapStateToProps(state) {
  return state.fbAuth;
}

class FBAuth extends React.Component {
  static propTypes = {
    fbAuth: PropTypes.shape({
      accessToken: PropTypes.string,
      expiresIn: PropTypes.string,
    }).isRequired,
    accounts: PropTypes.arrayOf(PropTypes.shape({
      access_token: PropTypes.string,
      name: PropTypes.string,
      id: PropTypes.string,
    })),
    page: PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      accessToken: PropTypes.string,
    })
  }

  static defaultProps = {
    fbAuth: {
      accessToken: '',
      expiresIn: '',
    },
    accounts: [],
  }

  constructor(props) {
    super(props);

    this.state = {
      isTokenVisible: false,
      currentPage: {},
    };
  }

  toggleVisible() {
    this.setState({ isTokenVisible: !this.state.isTokenVisible });
  }

  async setPage(account = {}) {
    const result = await fetch('/graphql', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
      },
      body: JSON.stringify({
        query: `
          mutation ($id:String!, $accessToken:String!, $name:String!) {
            setPage(id: $id, accessToken: $accessToken, name: $name)
          }
        `,
        variables: {
          id: account.id,
          accessToken: account.access_token,
          name: account.name
        }
      })
    });

    this.setState({
      currentPage: account,
    });
  }

  async componentDidMount() {
    this.props.fetchFBAuth();

    const response = await fetch('/graphql', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
      },
      body: JSON.stringify({
        query: `
          {
            page {
              id, name, accessToken
            }
          }
        `,
      })
    });

    const { data } = await response.json();
    this.setState({
      currentPage: data.page,
    });
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
            <h4>設定專頁</h4>
            <div className="box">
              <div className="box-body">
                {this.props.accounts.map((account, index) => {
                  return <button key={index}
                                 className="btn btn-block btn-default"
                                 disabled={account.name == this.state.currentPage.name}
                                 onClick={this.setPage.bind(this, account)}>
                           {(account.name == this.state.currentPage.name) ? <i className="fa fa-fw fa-check-circle text-success"></i> : null}
                           {account.name}
                         </button>
                })}
              </div>
            </div>
          </div>
        </div>
      </Content>
    )
  }
}

export default connect(mapStateToProps, { fetchFBAuth })(FBAuth);
