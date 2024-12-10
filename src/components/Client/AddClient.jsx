import { useState } from "react";
import PropTypes from 'prop-types';
import { useNavigate } from "react-router-dom";
import './AddClient.css';
import ClientService from "../../services/ClientService";



function AddClient({ addClient }) {
    /* État local pour stocker les données du client*/
    const [clientData, setClientData] = useState({
        name: '',
        lastName: '',
        birthday: '',
        email: '',
        phone: ''
    });

    //Permet de faire une redirection
    const navigate = useNavigate();

    /**
     * Met à jour les données du client lorsque l'utilisateur modifie un champ.
     * @param {Object} e - L'événement de changement du champ.
     */
    function handleChange(e) {
        const { name, value } = e.target;
        setClientData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    }

    /**
     * Gère l'événement de pression d'une touche sur les champs de saisie.
     * Si la touche "Enter" est pressée, ajoute le client.
     * @param {Object} e - L'événement de pression de touche.
     */
    function handleKeyDown(e) {
        if (e.code === "Enter") {
            e.preventDefault();
            handleAddClient();
        }
    }

    /**
     * Gère l'ajout d'un nouveau client en utilisant les données du formulaire.
     * Ajoute le client à la liste, réinitialise le formulaire, 
     * puis redirige vers la page de la liste des clients.
     */
    const handleAddClient = async (e) => {
        if (e) e.preventDefault();

        if (!clientData.name || !clientData.lastName || !clientData.birthday || !clientData.email || !clientData.phone) {
            console.error("Veuillez remplir tous les champs obligatoires.");
            alert("Les champs 'Nom', 'Prénom' et 'Email' sont obligatoires.");
            return;
        }

        console.log("Ajout du client avec les données : ", clientData); // Debug

        try {
            const response = await ClientService.addClient(clientData);
            console.log('Client ajouté avec succès', response);


            setClientData({
                name: '',
                lastName: '',
                birthday: '',
                email: '',
                phone: ''
            });

            navigate('/clients');
        } catch (error) {
            console.error('Erreur lors de l’ajout du client:', error);
        }


    };


    return (
        <div className="d-flex flex-column align-items-start form-container ">
            {['name', 'lastName', 'birthday', 'email', 'phone'].map((field) => (
                <div className="form-group" key={field}>
                    <input
                        type={field === 'birthday' ? 'date' : field === 'email' ? 'email' : 'text'}
                        name={field}
                        value={clientData[field]}
                        onChange={handleChange}
                        onKeyDown={handleKeyDown}
                        placeholder={
                            field === 'name' ? 'Nom' :
                                field === 'lastName' ? 'Prénom' :
                                    field === 'birthday' ? 'Date de naissance' :
                                        field === 'email' ? 'Email' : 'Téléphone'
                        }
                        className="mr-15 form-input"
                    />
                </div>
            ))}

            {/* Bouton pour ajouter le client avec les données saisies */}
            <button
                onClick={handleAddClient}
                className="btn btn-primary"
            >
                Ajouter
            </button>
        </div >
    );

}

AddClient.propTypes = {
    addClient: PropTypes.func.isRequired
};


export default AddClient;