/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';

import { authentication } from '../../actions/auth';

import util from 'util';

function mapStateToProps(state) {
  const { auth } = state;
  return {
    authenticated: auth.authenticated,
    errorMessage: auth.errorMessage,
  }
}

class Login extends React.Component {
  static contextTypes = {
    router: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);

    this.state = {
      username: null,
      password: null,
    }
  }

  handleChange(field, e) {
    let nextState = {};
    nextState[field] = e.target.value;

    this.setState(nextState);
  }

  handleSubmit(e) {
    e.preventDefault();

    this.props.authentication(this.state.username, this.state.password);
  }

  checkAuth(isAuthenticated) {
    if (isAuthenticated) {
      setTimeout(() => {
        this.context.router.replace('/');
      }, 100);
    }
  }

  render() {
    const { username, password } = this.state;
    return (
      <div className="login-box">
        {this.checkAuth(this.props.authenticated)}
        <Helmet
          title="Login Page"
          link={[
            { rel: 'stylesheet', href: '/plugins/iCheck/square/blue.css' }
          ]}
          style={[
            {
              cssText: `
               .icheck:hover .icheckbox_square-blue {
                  background-position: -24px 0;
               }
              `
            }
          ]}
        />
        <div className="login-logo">
          <a href="#">
            Live Explore CMS
          </a>
        </div>
        <div className="login-box-body">
          <p className="login-box-msg">請登入帳號</p>
          <form action="/login" method="post" onSubmit={this.handleSubmit.bind(this)}>
            <div className={username == '' ? 'form-group has-feedback has-error' : 'form-group has-feedback'}>
              <input type="email"
                     onChange={this.handleChange.bind(this, 'username')}
                     className="form-control"
                     placeholder="Email"
              />
              <span className="glyphicon glyphicon-envelope form-control-feedback"></span>
              {username == '' ? <span className="help-block">不可為空</span> : null}
            </div>
            <div className={password == '' ? 'form-group has-feedback has-error' : 'form-group has-feedback'}>
              <input type="password"
                     onChange={this.handleChange.bind(this,'password')}
                     className="form-control"
                     placeholder="Password"
              />
              <span className="glyphicon glyphicon-lock form-control-feedback"></span>
              {password == '' ? <span className="help-block">不可為空</span> : null}
            </div>
            <div className="row">
              <div className="col-xs-8">
                <div className="checkbox icheck">
                  {/*<label>*/}
                  {/*<div className="icheckbox_square-blue"*/}
                  {/*style={{position: 'relative'}}*/}
                  {/*>*/}
                  {/*<input type="checkbox" name="remember" style={{*/}
                  {/*position: 'absolute',*/}
                  {/*top: '-20%',*/}
                  {/*left: '-20%',*/}
                  {/*display: 'block',*/}
                  {/*width: '140%',*/}
                  {/*height: '140%',*/}
                  {/*margin: '0px',*/}
                  {/*padding: '0px',*/}
                  {/*backgroundColor: 'rgb(255, 255, 255)',*/}
                  {/*border: '0px',*/}
                  {/*opacity: 0,*/}
                  {/*backgroundPosition: 'initial initial',*/}
                  {/*backgroundRepeat: 'initial initial',*/}
                  {/*}} />*/}
                  {/*<ins className="iCheck-helper" style={{*/}
                  {/*position: 'absolute',*/}
                  {/*top: '-20%',*/}
                  {/*left: '-20%',*/}
                  {/*display: 'block',*/}
                  {/*width: '140%',*/}
                  {/*height: '140%',*/}
                  {/*margin: '0px',*/}
                  {/*padding: '0px',*/}
                  {/*backgroundColor: 'rgb(255, 255, 255)',*/}
                  {/*border: '0px',*/}
                  {/*opacity: 0,*/}
                  {/*backgroundPosition: 'initial initial',*/}
                  {/*backgroundRepeat: 'initial initial',*/}
                  {/*}}></ins>*/}
                  {/*</div>*/}
                  {/*&nbsp;記住我*/}
                  {/*</label>*/}
                </div>
              </div>
              <div className="col-xs-4">
                <button type="submit" className="btn btn-primary btn-block btn-flat">登入</button>
              </div>
            </div>
          </form>
          <a href="/password/reset">忘記密碼</a><br />
          <h4 className="text-danger text-center">{this.props.errorMessage}</h4>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, { authentication })(Login);
