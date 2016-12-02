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
import s from './Header.css';
import logoUrl from './logo-small.png';

import { signOut } from '../../actions/auth';

function mapStateToProp(state) {
  const { auth } = state;
  return {
    errorMessage: auth.errorMessage,
    authenticated: auth.authenticated,
  }
}

class Header extends React.Component {
  static contextTypes = {
    router: PropTypes.object.isRequired,
  }

  checkAuth(isAuthenticated) {
    if (!isAuthenticated) {
      setTimeout(() => {
        this.context.router.replace('/login');
      }, 100);
    }
  }

  render() {
    return (
      <header className="main-header">
        {this.checkAuth(this.props.authenticated)}
        <a href="index2.html" className="logo">
          <span className="logo-mini">Live API Explore</span>
          <span className="logo-lg">Live API Explore</span>
        </a>
        <nav className="navbar navbar-static-top" role="navigation">
          <a href="#" className="sidebar-toggle" data-toggle="offcanvas" role="button">
            <span className="sr-only">Toggle navigation</span>
          </a>
          <div className="navbar-custom-menu">
            <ul className="nav navbar-nav">
              <li>
                <a href="/admin/users/setting">
                  <i className="fa fa-gear"></i>
                </a>
              </li>
              <li className="dropdown">
                <a onClick={this.props.signOut.bind(this)}>
                  <span className="hidden-xs">登出</span>
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </header>
    );
  }
}

export default connect(mapStateToProp, { signOut })(Header);
