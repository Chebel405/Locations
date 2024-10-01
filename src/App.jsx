import { useState } from "react"
import AddClient from "./components/Client/AddClient"
import ClientList from "./components/Client/ClientList"


function App() {

  const [clientList, setClientList] = useState([]);

  function addClient(name, lastName, birthday, email, phone) {
    const client = {
      id: crypto.randomUUID(),
      name,
      lastName,
      birthday,
      email,
      phone,
      done: false,
      edit: false
    }
    setClientList([...clientList, client]);
  }



  return (
    <div className="d-flex flex-row justify-content-center align-items-center p-20">
      <div className="card container p-20">
        <h1 className="mb-20">Liste des clients</h1>
        <AddClient addClient={addClient} />
        <ClientList clientList={clientList} />
      </div>
    </div>
  )
}

export default App
