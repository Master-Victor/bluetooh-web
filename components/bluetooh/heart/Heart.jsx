import React, { useState } from "react";
import BluetoothButton from "../BluetoothButton";

const Heart = () => {
  const [characteristics, setCharacteristics] = useState([]);
  const [dataValues, setDataValues] = useState([]);

  const connectToDevice = async () => {
    try {
      const device = await navigator.bluetooth.requestDevice({
        acceptAllDevices: true,
        optionalServices: [
          "0000180d-0000-1000-8000-00805f9b34fb", //heart rate
        ],
      });
      const server = await device.gatt.connect();
      const service = await server.getPrimaryService(
        "0000180d-0000-1000-8000-00805f9b34fb"
      );
      const characteristics = await service.getCharacteristics();
      setCharacteristics(characteristics);
      // Leer el valor inicial de la primera característica
      if (characteristics.length > 0) {
        const heartRateSuscription = characteristics[0]; //
        console.log("Caracteristica a escuchar", heartRateSuscription.uuid);

        console.log("iniciando la notificaciones");

        await heartRateSuscription.startNotifications();

        console.log("agregando el evento");

        const handleValueChanged = (event) => {
          const value = event.target.value;
          const dataView = new DataView(value.buffer);

          const byte2 = dataView.getInt8(1); // Ejemplo: obtener un entero de 8 bits en la posición 1
          setDataValues(byte2);
        };

        heartRateSuscription.addEventListener(
          "characteristicvaluechanged",
          handleValueChanged
        );
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <>
      {characteristics.length <= 0 && (
        <BluetoothButton connectToDevice={connectToDevice} />
      )}
      <div className="container">
        {characteristics.length > 0 && (
          <div id="heart">
            <span className="text-white heart-text">{dataValues} bpm</span>
          </div>
        )}
      </div>
    </>
  );
};

export default Heart;
