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
import { analytics } from '../config';
import assets from './assets';

class Html extends React.Component {
  static propTypes = {
    children: PropTypes.string,
  };

  render() {
    let head = Helmet.rewind();
    return (
      <html className="no-js" lang="en" {...head.htmlAttributes.toComponent()}>
        <head>
          <meta charSet="utf-8" />
          <meta httpEquiv="x-ua-compatible" content="ie=edge" />
          {head.title.toComponent()}
          {head.meta.toComponent()}
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="apple-touch-icon" href="apple-touch-icon.png" />
          {/* Latest compiled and minified CSS */}
          <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap.min.css" />
          {/* Font Awesome */}
          <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css" />
          {/* Ionicons */}
          <link rel="stylesheet" href="https://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css" />
          {/* Theme style */}
          <link rel="stylesheet" href="/dist/css/AdminLTE.min.css" />
          {/* AdminLTE Skins. Choose a skin from the css/skins
           folder instead of downloading all of them to reduce the load. */}
          <link rel="stylesheet" href="/dist/css/skins/_all-skins.min.css" />
          {/* iCheck */}
          <link rel="stylesheet" href="/plugins/iCheck/flat/blue.css" />
          {/* Data Table */}
          <link rel="stylesheet" href="/plugins/datatables/dataTables.bootstrap.css" />
          {/* Date Picker */}
          <link rel="stylesheet" href="/plugins/datepicker/datepicker3.css" />
          {/* Daterange picker */}
          <link rel="stylesheet" href="/plugins/daterangepicker/daterangepicker-bs3.css" />
          {/* bootstrap wysihtml5 - text editor */}
          <link rel="stylesheet" href="/plugins/bootstrap-wysihtml5/bootstrap3-wysihtml5.min.css" />

          {head.link.toComponent()}
        </head>
        <body className="hold-transition skin-blue sidebar-mini login-page">
          <div id="app" dangerouslySetInnerHTML={{ __html: this.props.children }} />
          <script src={assets.client.js}></script>
          {head.script.toComponent()}
          {analytics.google.trackingId &&
            <script
              dangerouslySetInnerHTML={{ __html:
              'window.ga=function(){ga.q.push(arguments)};ga.q=[];ga.l=+new Date;' +
              `ga('create','${analytics.google.trackingId}','auto');ga('send','pageview')` }}
            />
          }
          {analytics.google.trackingId &&
            <script src="https://www.google-analytics.com/analytics.js" async defer />
          }
        </body>
      </html>
    );
  }
}

export default Html;
