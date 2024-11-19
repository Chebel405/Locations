import axios from 'axios';

const API_URL = 'http://localhost:8080/clients';


class ClientService {

    /**
     * Récupère la liste de tous les clients depuis le backend
     * @returns {Promise} - Liste des clients sous forme de réponse HTTP
     */
    getClients() {
        return axios.get(API_URL);
    }

    /**
    * Ajouter un nouveau client dans la base de données
    * @param {Object} clientData - Les données du client à ajouter
    * @returns {Promise} - Réponse du backend avec le client ajouté
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
     * Modifier un client existant dans la base de données
     * @param {number} id - L'ID du client à modifier  
     * @param {Object} clientData - Les nouvelles données du client à mettre à jour
     * @returns {Promise} - Réponse HTTP avec le client mis à jour
     */
    updateClient(id, clientData) {
        const formattedData = {
            name: clientData.name,
            lastName: clientData.lastName,
            email: clientData.email,
            phone: clientData.phone,
            // Ajoutez d'autres champs si nécessaire
        };
        console.log("Données envoyées :", formattedData);
        console.log("URL :", `http://localhost:8080/clients/${id}`);

        return axios.put(`${API_URL}/${id}`, formattedData, {
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(response => {
            console.log('Réponse du backend:', response.data);
            return response.data;
        }).catch(error => {
            console.error('Erreur lors de la mise à jour du client:', error);
            throw error;
        });
    }

    /**
     * Supprimer un client existant de la base de données
     * @param {number} id - L'ID du client à supprimer
     * @returns {Promise} - Réponse HTTP confirmant la suppression
     */
    deleteClient(id) {
        return axios.delete(`${API_URL}/${id}`);
    }

    /**
     * Récupère les détails d'un client spécifique depuis la base de données
     * @param {number} id - L'ID du client à récupérer
     * @returns {Promise} - Réponse HTTP contenant les détails du client
     */
    getClientById(id) {
        return axios.get(`${API_URL}/${id}`);
    }

}

export default new ClientService();