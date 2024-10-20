import { useState, useEffect } from "react";
import AddClient from "./components/Client/AddClient";
import ClientList from "./components/Client/ClientList";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ClientService from "./services/ClientService";

function App() {
  const [clientList, setClientList] = useState([]);

  useEffect(() => {
    ClientService.getClients()
      .then(response => {
        const clients = response.data.map(c => ({
          ...c,
          id: c.id.toString()
        }));
        setClientList(clients);
      })
      .catch(error => {
        console.error("Erreur lors du chargement des clients : ", error);
      });
  }, []);

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



    ClientService.addClient(client)
      .then(() => {
        return ClientService.getClients();
      })
      .then(response => {
        const clients = response.data.map(c => ({
          ...c,
          id: c.id.toString()
        }));
        setClientList(clients);
      })
      .catch(error => {
        console.error("Erreur lors de l'ajout du client : ", error);
      })

  }

  function deleteClient(id) {
    ClientService.deleteClient(id)
      .then(() => {
        setClientList(clientList.filter(client => client.id !== id));
        console.log("Client supprimé avec succès du backend et du frontend");
      })
      .catch(error => {
        console.error("Erreur lors de la suppression du client dans le backend: ", error);
      });

  }

  function modifyClient(id, newClient) {
    console.log('Modifications envoyées pour le client:', newClient);
    ClientService.updateClient(id, newClient)
      .then(() => {
        setClientList(
          clientList.map(client => client.id === id ? { ...client, ...newClient } : client
          )
        );
      })
      .catch(error => {
        console.error("Erreur lors de la modification du client:", error)
      })


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

