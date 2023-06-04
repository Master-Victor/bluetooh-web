import React, { useState } from "react";
import User from "./user/User";

import Heart from "components/bluetooh/heart/Heart";

const BluetoothConection = () => {
  const [selectCharacteristic, setSelectCharacteristic] = useState(false);

  return (
    <div className="card bg-dark text-white vh-100">
      <div className="card-body p-5 text-center">
        <ul className="list-group">
          <li className="list-group-item">Heart: Simula un medidor de ritmo cardiaco</li>
          <li className="list-group-item">User: Simula un dispositivo Ble datos</li>
        </ul>
        <p>Para conectarse elecciones uno y luego preciose el boton bluetooth</p>
        <button
          className="btn btn-danger m-5"
          onClick={() => setSelectCharacteristic("heart")}
        >
          Heart
        </button>
        <button
          className="btn btn-info m-5"
          onClick={() => setSelectCharacteristic("users")}
        >
          Users
        </button>
        {selectCharacteristic === "heart" && <Heart />}
        {selectCharacteristic === "users" && <User />}
      </div>
    </div>
  );
};

export default BluetoothConection;
