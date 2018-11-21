import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import styles from './styles.scss';

class NavItem extends React.Component {
   render() {
      const { to, children, ...rest } = this.props
      const isActive = this.context.router.route.location.pathname === to;
      const ativeClass = isActive ? styles.active : '';

      return (
         <li className={ativeClass}>
            <Link exact="true" to={to} {...rest}>
               {children}
            </Link>
         </li>
      );
   }
}

NavItem.contextTypes = {
   router: PropTypes.shape({})
};

export default NavItem;
