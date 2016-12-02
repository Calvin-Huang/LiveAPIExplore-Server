import React, { PropTypes } from 'react';
import { Link } from 'react-router';

class NavLink extends React.Component {
  static contextTypes = {
    router: PropTypes.object,
  };

  render() {
    const activeClassName = this.context.router.isActive(this.props.to, true) ? 'active' : '';

    return (
      <li className={activeClassName}>
        <Link {...this.props}>
          {this.props.children}
        </Link>
      </li>
    )
  }
}

export default NavLink;
