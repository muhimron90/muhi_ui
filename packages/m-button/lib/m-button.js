import React from 'react';
import PropTypes from 'prop-types';
import cx from 'clsx';
import styles from './styles.css';
const Button = ({ children, onPress, className , variant, ...rest }) => {
  const btnStyled = cx(
    styles.btn__style,
    {
      [styles.btn__second]: variant === 'secondary',
    },
    className
  );
cx()
  return (
    <>
      <button {...rest} onClick={onPress} className={btnStyled}>
        {children}
      </button>
    </>
  );
};

Button.propTypes = {
  onPress: PropTypes.func,
  children: PropTypes.element,
  variant : PropTypes.string
};

export { Button };