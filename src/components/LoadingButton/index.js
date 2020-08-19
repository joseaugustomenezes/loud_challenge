import React from "react";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";

const LoadingButton = ({ loading, children, ...rest }) => (
  <Button {...rest} disabled={loading}>
    {loading && (
      <Spinner style={{ marginRight: '5px' }} animation="border" size="sm" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>
    )}
    {children}
  </Button>
);

export default LoadingButton;
