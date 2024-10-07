import { useState } from "react";
import AddClient from "./components/Client/AddClient";
import ClientList from "./components/Client/ClientList";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

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
    };
    setClientList([...clientList, client]);
  }

  function deleteClient(id) {
    setClientList(clientList.filter(client => client.id !== id));
  }

  function modifyClient(id, newClient) {
    setClientList(
      clientList.map(client => client.id === id ? { ...client, ...newClient } : client)
    );
  }

  return (
    <Router>
      <div>
        <nav className="d-flex flex-row justify-content-center align-items-center p-20">
          <Link to="/add-client" className="btn btn-primary mr-10">Ajouter un Client</Link>
          <Link to="/clients" className="btn btn-primary">Voir la Liste des Clients</Link>
        </nav>

        <Routes>
          <Route path="/add-client" element={<AddClient addClient={addClient} />} />
          <Route path="/clients" element={
            <ClientList clientList={clientList} deleteClient={deleteClient} modifyClient={modifyClient} />
          } />
          <Route path="/" element={<AddClient addClient={addClient} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;



// import { useState } from "react"
// import AddClient from "./components/Client/AddClient"
// import ClientList from "./components/Client/ClientList"


// function App() {

//   const [clientList, setClientList] = useState([]);

//   function addClient(name, lastName, birthday, email, phone) {
//     const client = {
//       id: crypto.randomUUID(),
//       name,
//       lastName,
//       birthday,
//       email,
//       phone,
//       done: false,
//       edit: false
//     }
//     setClientList([...clientList, client]);
//   }

//   function deleteClient(id) {
//     setClientList(clientList.filter(client => client.id !== id));
//   }

//   function modifyClient(id, newClient) {
//     setClientList(clientList.map(client => client.id == id ? {
//       ...client, ...newClient
//     } : client))
//   }


//   return (
//     <div className="d-flex flex-row justify-content-center align-items-center p-20">
//       <div className="card container p-20">
//         <h1 className="mb-20">Liste des clients</h1>
//         <AddClient addClient={addClient} />
//         <ClientList clientList={clientList} deleteClient={deleteClient} modifyClient={modifyClient} />
//       </div>
//     </div>
//   )
// }


// export default App
