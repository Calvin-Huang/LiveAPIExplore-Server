/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { PropTypes } from 'react';
import Helmet from 'react-helmet';

import s from './Layout.css';
import Header from '../Header';
import Navigation from '../Navigation';
import Footer from '../Footer';
import $ from 'jquery';

class Layout extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
  };

  static contextTypes = {
    router: PropTypes.object.isRequired,
  }

  render() {
    return (
      <div className="wrapper">
        <Helmet
          title={null}
          meta={[
            {name: 'description', content: 'This project combines Facebook Live API and local hosted socket to broadcast living status.'}
          ]}
          link={[]}
          style={[]}
        />
        <Header />
        <Navigation />
        {this.props.children}
        <Footer />
      </div>
    );
  }
}

export default Layout;
