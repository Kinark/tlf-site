/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import PropTypes from 'prop-types';

const Input = ({ name, unlabeled, type, className, label, ...rest }) => (
   <React.Fragment>
      <input type={type} id={name} name={name} className={`dead-blue-clear-text ${className}`} {...rest} />
      {!unlabeled && <label htmlFor={name}>{label}</label>}
   </React.Fragment>
)

Input.propTypes = {
   name: PropTypes.string.isRequired,
   unlabeled: PropTypes.bool,
   type: PropTypes.string,
   label: PropTypes.string,
   className: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({})
   ]),
}

Input.defaultProps = {
   unlabeled: false,
   label: '',
   type: 'text',
   className: ''
}

export default Input
