import React from 'react';
import { Button } from 'react-native-elements';
import PropTypes from 'prop-types';

const FormButton = ({
  title,
  buttonType,
  buttonStyle,
  titleStyle,
  ...rest
}) => (
  <Button
    {...rest}
    type={buttonType}
    title={title}
    buttonStyle={buttonStyle}
    titleStyle={titleStyle}
  />
);

FormButton.defaultProps = {
  buttonType: 'solid',
  buttonStyle: null,
};

FormButton.propTypes = {
  title: PropTypes.string.isRequired,
  buttonType: PropTypes.string,
  buttonStyle: PropTypes.objectOf(PropTypes.any),
  titleStyle: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default FormButton;
