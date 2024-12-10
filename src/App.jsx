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

        console.log("Données brutes reçues depuis le backend :", response.data);


        // Transformation des données des clients pour que les IDs soient des chaînes de caractères
        const clients = response.data.map(c => ({
          ...c,
          id: c.id.toString()
        }));

        console.log("Données transformées avant mise à jour de l'état :", clients);
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

    console.log("Nouveau client à ajouter :", client);
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
        console.log("Liste des clients après ajout :", clients);
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
  // function modifyClient(id, newClient) {
  //   console.log('--- Début de modifyClient ---');
  //   console.log('ID du client à modifier :', id);
  //   console.log('Données envoyées pour modification :', newClient);

  //   // console.log('Modifications envoyées pour le client:', newClient);
  //   if (!newClient.name || !newClient.lastName || !newClient.birthday || !newClient.email || !newClient.phone) {
  //     console.error("Les données envoyées à modifyClient sont incomplètes :", newClient);
  //     return;
  //   }

  //   ClientService.updateClient(id, newClient)
  //     .then(() => {
  //       setClientList(
  //         clientList.map(client =>
  //           client.id === id ? { ...client, ...newClient } : client
  //         )
  //       );
  //     })
  //     .catch(error => {
  //       console.error("Erreur lors de la modification du client:", error)
  //     })
  // }
  function modifyClient(id, updatedClient) {

    console.log("ID du client à modifier :", id);
    console.log("Données mises à jour pour le client :", updatedClient);

    const clientIndex = clientList.findIndex(client => client.id === id);
    if (clientIndex === -1) {
      console.error("Client introuvable ! avec l'ID :", id);
      return;
    }

    // Mise à jour des données dans la liste
    const newClientList = [...clientList];
    newClientList[clientIndex] = updatedClient;

    console.log("Nouvelle liste des clients après modification :", newClientList);
    // Mise à jour de l'état ou envoi au backend
    setClientList(newClientList);
    // Ou appeler une API avec ClientService.updateClient(id, updatedClient)
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

