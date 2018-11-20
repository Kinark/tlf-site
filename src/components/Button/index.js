/* eslint-disable react/button-has-type */
import React from 'react';
import PropTypes from 'prop-types';

import styles from './styles.scss';

const Button = ({ children, type, ...rest }) => (
   <button className={styles.button} type={type} {...rest}>
      {children}
   </button>
)

Button.propTypes = {
   children: PropTypes.string.isRequired,
   type: PropTypes.string,
}

Button.defaultProps = {
   type: 'button'
}

export default Button
