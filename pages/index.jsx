import BluetoothConection from "components/bluetooh/BluetoothConection";

import { userService } from "services";

export default Home;

function Home() {
  return (
    <div className="p-4">
      <div className="container">
        <h1>Hola {userService.userValue?.firstName}!</h1>
        <br />
        <h2 className="font-weight-light"> Seleccione dispositivo BLE </h2>
        <BluetoothConection/>
      </div>
    </div>
  );
}
