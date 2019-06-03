import React from 'react';
import {Redirect} from 'react-router-dom';
import PropTypes from 'prop-types';

const withPrivateRoute = (Component) => {
  const WithPrivateRoute = (props) => {
    console.log(`location`, props.location);
    if (props.userData) {
      return <Component {...props} />;
    }

    return <Redirect to="/login" />;
  };

  WithPrivateRoute.propTypes = {
    userData: PropTypes.shape({
      id: PropTypes.number.isRequired,
      email: PropTypes.string.isRequired,
    }),
  };

  return WithPrivateRoute;
};

export default withPrivateRoute;
