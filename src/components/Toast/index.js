import React, { useState, useEffect } from "react";
import BootstrapToast from "react-bootstrap/Toast";

const Toast = ({ status, message }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    status && setShow(true);
  }, [status])

  return (
    <div style={{ position: "absolute", top: 10, right: 20 }}>
      <BootstrapToast onClose={() => setShow(false)} show={show || false} delay={3000} autohide>
        <BootstrapToast.Header>
          <strong className="mr-auto">Error {status}</strong>
        </BootstrapToast.Header>
        <BootstrapToast.Body>{message}</BootstrapToast.Body>
      </BootstrapToast>
    </div>
  );
};

export default Toast;
