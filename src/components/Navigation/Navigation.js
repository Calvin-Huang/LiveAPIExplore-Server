/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { PropTypes } from 'react';
import { Link } from 'react-router';

import NavLink from './NavLink';

import cx from 'classnames';
import s from './Navigation.css';
import $ from 'jquery';

class Navigation extends React.Component {
  static propTypes = {
    className: PropTypes.string,
  };

  componentDidMount() {
    //Get the screen sizes
    var screenSizes = {
      xs: 480,
      sm: 768,
      md: 992,
      lg: 1200
    };

    //Enable sidebar toggle
    $(document).on('click', "[data-toggle='offcanvas']", function (e) {
      e.preventDefault();

      //Enable sidebar push menu
      if ($(window).width() > (screenSizes.sm - 1)) {
        if ($("body").hasClass('sidebar-collapse')) {
          $("body").removeClass('sidebar-collapse').trigger('expanded.pushMenu');
        } else {
          $("body").addClass('sidebar-collapse').trigger('collapsed.pushMenu');
        }
      }
      //Handle sidebar push menu for small screens
      else {
        if ($("body").hasClass('sidebar-open')) {
          $("body").removeClass('sidebar-open').removeClass('sidebar-collapse').trigger('collapsed.pushMenu');
        } else {
          $("body").addClass('sidebar-open').trigger('expanded.pushMenu');
        }
      }
    });

    $(".content-wrapper").click(function () {
      //Enable hide menu when clicking on the content-wrapper on small screens
      if ($(window).width() <= (screenSizes.sm - 1) && $("body").hasClass("sidebar-open")) {
        $("body").removeClass('sidebar-open');
      }
    });
  }

  render() {
    return (
    <aside className="main-sidebar">
      <section className="sidebar">
        <ul className="sidebar-menu">
          <NavLink to="/">
            <i className="fa fa-key"></i>
            <span>FB授權管理</span>
          </NavLink>
          <NavLink to="/admins">
            <i className="fa fa-user-secret"></i>
            <span>管理者管理</span>
          </NavLink>
          <NavLink to="/users">
            <i className="fa fa-users"></i>
            <span>用戶管理</span>
          </NavLink>
          <NavLink to="/lives">
            <i className="fa fa-video-camera"></i>
            <span>直播中</span>
          </NavLink>
        </ul>
      </section>
    </aside>
    );
  }
}

export default Navigation;

{/*<div className={cx(s.root, this.props.className)} role="navigation">*/}
  {/*<Link className={s.link} to="/about">About</Link>*/}
  {/*<Link className={s.link} to="/contact">Contact</Link>*/}
  {/*<span className={s.spacer}> | </span>*/}
  {/*<Link className={s.link} to="/login">Log in</Link>*/}
  {/*<span className={s.spacer}>or</span>*/}
  {/*<Link className={cx(s.link, s.highlight)} to="/register">Sign up</Link>*/}
{/*</div>*/}