import React, { useState } from "react";
import BluetoothButton from "../BluetoothButton";
import { alertService } from "services";

const User = () => {
  const [characteristics, setCharacteristics] = useState([]);
  const [dataValues, setDataValues] = useState([]);
  const [dataValuesToSend, setDataValuesToSend] = useState([]);

  const onChange = (event) => setDataValuesToSend(event.target.value);

  const onSend = (event) => {
    event.preventDefault();
    try {
      const stringToWrite = dataValuesToSend;
      const encoder = new TextEncoder();
      const valueToWrite = encoder.encode(stringToWrite);
      characteristics[0].writeValue(valueToWrite);
      console.log("Datos enviados");
      alertService.success("Datos enviados");
    } catch (error) {
      alertService.error("Error al enviar los datos");
    }
  };

  const onRead = async (event) => {
    event.preventDefault();
    try{
      const value = await characteristics[0].readValue();
      const decoder = new TextDecoder("utf-8");
      setDataValues(decoder.decode(value.buffer));
      console.log("Datos Leidos");
    }catch(error){
      alertService.error("Error al leer los datos");
    }

  };

  const connectToDevice = async () => {
    try {
      const device = await navigator.bluetooth.requestDevice({
        acceptAllDevices: true,
        optionalServices: [
          "0000181c-0000-1000-8000-00805f9b34fb", //User Data
        ],
      });
      const server = await device.gatt.connect();
      const service = await server.getPrimaryService(
        "0000181c-0000-1000-8000-00805f9b34fb"
      );
      console.log("leyendo las caracteristicas");
      const characteristics = await service.getCharacteristics();
      setCharacteristics(characteristics);
      // Leer el valor inicial de la primera característica
      if (characteristics.length > 0) {
        console.log("Conectado");
        const fistName = characteristics[0];
        const stringToWrite = "Conectado";
        const encoder = new TextEncoder();
        const valueToWrite = encoder.encode(stringToWrite);
        console.log("Leyendo los datos");
        const value = await fistName.readValue();
        const decoder = new TextDecoder("utf-8");
        setDataValues(decoder.decode(value.buffer));
        // Escribir los datos en la característica
        await fistName.writeValue(valueToWrite);
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
        <div className="row">
          <div className="col-12">
            <h1>Bluetooth</h1>
            <p>Caracteristicas: {characteristics.length}</p>
            <p>Valores: {dataValues}</p>
          </div>
          <div className="input-group col-12 mt-5">
            <button onClick={onRead} className="btn btn-light">
              Leer Valores
            </button>
          </div>
          <div className="input-group col-12 mt-5">
            <input
              onChange={onChange}
              className="form-control"
              type="text"
              placeholder="Datos a enviar"
            />
            <button onClick={onSend} className="btn btn-light">
              Enviar
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default User;
