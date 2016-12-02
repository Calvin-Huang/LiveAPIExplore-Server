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

/**
 * The top-level React component setting context (global) variables
 * that can be accessed from all the child components.
 *
 * https://facebook.github.io/react/docs/context.html
 *
 * Usage example:
 *
 *   const context = {
 *     history: createBrowserHistory(),
 *     store: createStore(),
 *   };
 *
 *   ReactDOM.render(
 *     <App context={context}>
 *       <Layout>
 *         <LandingPage />
 *       </Layout>
 *     </App>,
 *     container,
 *   );
 */
class App extends React.PureComponent {

  static propTypes = {
    children: PropTypes.element.isRequired,
  }

  getChildContext() {
    return this.props.context;
  }

  render() {
    // NOTE: If you need to add or modify header, footer etc. of the app,
    // please do that inside the Layout component.
    return (
      <div>
        <Helmet
          defaultTitle='Live API Explore'
          titleTemplate="%s | Live API Explore"
          meta={[
            {name: 'description', content: 'This project combines Facebook Live API and local hosted socket to broadcast living status.'}
          ]}
          htmlAttributes={{className: 'hold-transition skin-blue sidebar-mini'}}
        />
        {this.props.children}
      </div>
    )
    // return React.Children.only([...this.props.children, ]);
  }

}

export default App;
