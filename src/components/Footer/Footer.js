/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import s from './Footer.css';

class Footer extends React.Component {
  render() {
    return (
      <footer className="main-footer">
        <strong>Copyright &copy; 2016 <a href="https://capslock.tw">CapsLock Studio</a>.</strong> All rights reserved.
      </footer>
    );
  }
}

export default Footer;
