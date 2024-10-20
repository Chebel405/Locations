import { useState, useEffect } from "react";
import AddClient from "./components/Client/AddClient";
import ClientList from "./components/Client/ClientList";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ClientService from "./services/ClientService";

function App() {
  const [clientList, setClientList] = useState([]);

  /**
   *  useEffect s'exécute au montage du composant
   *  pour charger la liste des clients depuis le backend
   */
  useEffect(() => {
    ClientService.getClients()
      .then(response => {
        // Transformation des données des clients pour que les IDs soient des chaînes de caractères
        const clients = response.data.map(c => ({
          ...c,
          id: c.id.toString()
        }));
        // Mise à jour de l'état avec la liste des clients
        setClientList(clients);
      })
      .catch(error => {
        console.error("Erreur lors du chargement des clients : ", error);
      });
  }, []);

  /**
   * Fonction pour ajouter un client
   * Cette fonction est déclenchée lors de la soumission du formulaire d'ajout de client
   * - Crée un objet client avec les informations du formulaire
   * - Envoie le client au backend via ClientService.addClient
   * - Recharge la liste des clients pour afficher le nouveau client
   */
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


    // Envoi du client au backend et rechargement de la liste des clients
    ClientService.addClient(client)
      .then(() => {
        return ClientService.getClients(); // Recharge la liste des clients depuis le backend
      })
      .then(response => {
        const clients = response.data.map(c => ({
          ...c,
          id: c.id.toString()
        }));
        setClientList(clients); // Mise à jour de la liste des clients
      })
      .catch(error => {
        console.error("Erreur lors de l'ajout du client : ", error);
      })

  }

  /**
   * Fonction pour supprimer un client
   * - Envoie une requête au backend pour supprimer le client via ClientService.deleteClient
   * - Mets à jour la liste des clients localement en supprimant le client
   */
  function deleteClient(id) {
    ClientService.deleteClient(id)
      .then(() => {
        // Supprime le client de la liste en filtrant par ID
        setClientList(clientList.filter(client => client.id !== id));
        console.log("Client supprimé avec succès du backend et du frontend");
      })
      .catch(error => {
        console.error("Erreur lors de la suppression du client dans le backend: ", error);
      });

  }

  /**
     * Fonction pour modifier un client
     * - Envoie les nouvelles données du client au backend via ClientService.updateClient
     * - Met à jour la liste des clients avec les nouvelles informations
     */
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

