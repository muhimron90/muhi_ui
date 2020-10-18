import React from 'react';
import PropTypes from 'prop-types';

const Button = (props) => {
    const { children } = props;
    return (<><button>{children}</button> </>);
};

Button.propTypes = {
    children: PropTypes.element
};

export { Button };