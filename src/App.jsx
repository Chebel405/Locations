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
  async function addClient(newClient) {

    console.log("Nouveau client à ajouter :", newClient);

    try {
      const response = await ClientService.addClient(newClient);
      console.log("Réponse du backend après ajout :", response.data);

      // Ajouter le client reçu du backend à la liste sans recharger toute la liste
      setClientList(prevList => [...prevList, response.data]);

    } catch (error) {
      console.error("Erreur lors de l'ajout du client :", error);
    }

  }

  /**
   * Fonction pour supprimer un client
   * - Envoie une requête au backend pour supprimer le client via ClientService.deleteClient
   * - Mets à jour la liste des clients localement en supprimant le client
   */
  async function deleteClient(id) {
    try {
      await ClientService.deleteClient(id);
      setClientList(prevList => prevList.filter(client => client.id !== id));
      console.log("Client supprimé avec succès");
    } catch (error) {
      console.error("Erreur lors de la suppression du client :", error);
    }

  }


  async function modifyClient(id, updatedClient) {
    console.log("ID du client à modifier :", id);
    console.log("Données mises à jour pour le client :", updatedClient);

    try {
      // Trouver le client existant
      const clientToUpdate = clientList.find(client => client.id === id);
      if (!clientToUpdate) {
        console.error("Client introuvable !");
        return;
      }

      // Fusionner les nouvelles données avec l'ancien client
      const clientData = { ...clientToUpdate, ...updatedClient };

      console.log("Données finales envoyées au backend :", clientData);

      const response = await ClientService.updateClient(id, updatedClient);
      console.log("Réponse du backend :", response);

      // Mise à jour correcte de la liste des clients
      setClientList(prevList =>
        prevList.map(client =>
          client.id === id ? { ...client, ...updatedClient } : client
        )
      );

      console.log("Client modifié avec succès :", updatedClient);
    } catch (error) {
      console.error("Erreur lors de la modification du client :", error);
    }
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

