import React from "react";

const BluetoothButton = ({ connectToDevice }) => {
  return (
    <button className="btn" onClick={connectToDevice}>
      <img
        className="img-fluid"
        width="50"
        height="50"
        src="https://img.icons8.com/external-others-inmotus-design/67/external-Bluetooth-round-icons-others-inmotus-design-8.png" 
        alt="external-Bluetooth-round-icons-others-inmotus-design-8"
      />
    </button>
  );
};

export default BluetoothButton;
