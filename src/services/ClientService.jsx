import axios from 'axios';

const API_URL = 'http://localhost:8080/clients';


class ClientService {

    /**
     * Récupère la liste de tous les clients
     * @returns {Promise} - Liste des clients
     */
    getClients() {
        return axios.get(API_URL);
    }

    /**
     * Ajouter un nouveau client
     * @param {Objet} clientData - Les données du client à ajouter
     * @returns {Promise} - Le client ajouté
     */
    addClient(clientData) {
        console.log('Données envoyées au backend :', clientData); // Ajoute cette ligne pour déboguer
        return axios.post(API_URL, clientData, {
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(response => {
            console.log('Réponse du backend:', response.data);
            return response.data;
        }).catch(error => {
            console.error('Erreur lors de l ajout du client: ', error);
            throw error;
        });
    }

    /**
     * Modifier un client existant
     * @param {number} id - L'ID du client à modifier  
     * @param {Objet} clientData - Les nouvelles données du client 
     * @returns {Promise} - Le client modifié
     */
    updateClient(id, clientData) {
        return axios.put(`${API_URL}/${id}`, clientData);
    }

    /**
     * Supprimer un client existant
     * @param {number} id - L'Id du client à supprimer 
     * @returns {Promise} - Le statut de la suppression
     */
    deleteClient(id) {
        return axios.delete(`${API_URL}/${id}`);
    }

    /**
     * Récupère les détails d'un client spécifique
     * @param {number} id - L'Id du client à récupérer 
     * @returns {Promise} - Détails du client
     */
    getClientById(id) {
        return axios.get(`${API_URL}/${id}`);
    }

}

export default new ClientService();