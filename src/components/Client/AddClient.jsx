import { useState } from "react";
import PropTypes from 'prop-types';
import './AddClient.css';




function AddClient({ addClient }) {
    /* État local pour stocker les données du client*/
    const [clientData, setClientData] = useState({
        name: '',
        lastName: '',
        birthday: '',
        email: '',
        phone: ''
    });

    /**
     * Met à jour les données du client lorsque l'utilisateur modifie un champ.
     * @param {Object} e - L'événement de changement du champ.
     */
    function handleChange(e) {
        const { name, value } = e.target;
        console.log(e);
        setClientData({
            ...clientData,
            [name]: value
        });
    }

    /**
     * Gère l'événement de pression d'une touche sur les champs de saisie.
     * Si la touche "Enter" est pressée, ajoute le client.
     * @param {Object} e - L'événement de pression de touche.
     */
    function handleKeyDown(e) {
        if (e.code === "Enter") {
            e.preventDefault();
            addClient(
                clientData.name,
                clientData.lastName,
                clientData.birthday,
                clientData.email,
                clientData.phone
            ); /*Appelle la fonction addClient avec les données du client*/
            setClientData({ /* Réinitialise les données du client après ajout*/
                name: '',
                lastName: '',
                birthday: '',
                email: '',
                phone: ''
            });
        }
    }


    return (
        <div className="d-flex flex-column align-items-start form-container ">
            <div className="form-group">
                <div className="form-label">Nom:</div>
                <input
                    type="text"
                    name="name"
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    value={clientData.name}
                    placeholder="Nom"
                    className="mr-15 form-input"
                />
            </div>
            <div className="form-group">
                <div className="form-label">Prénom:</div>
                <input
                    type="text"
                    name="lastName"
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    value={clientData.lastName}
                    placeholder="Prenom"
                    className="mr-15 form-input"
                />
            </div>
            <div className="form-group">
                <div className="form-label">Date de naissance:</div>
                <input
                    type="date"
                    name="birthday"
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    value={clientData.birthday}
                    placeholder="Date de naissance"
                    className="mr-15 form-input"
                />
            </div>
            <div className="form-group">
                <div className="form-label">Email:</div>
                <input
                    type="email"
                    name="email"
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    value={clientData.email}
                    placeholder="Mail"
                    className="mr-15 form-input"
                />
            </div>
            <div className="form-group">
                <div className="form-label">Téléphone:</div>
                <input
                    type="text"
                    name="phone"
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    value={clientData.phone}
                    placeholder="Téléphone"
                    className="mr-15 form-input"
                />
            </div>

            {/* Bouton pour ajouter le client avec les données saisies */}
            <button
                onClick={() => {
                    addClient(
                        clientData.name,
                        clientData.lastName,
                        clientData.birthday,
                        clientData.email,
                        clientData.phone
                    ); /* Appelle la fonction addClient avec les données du client*/
                    setClientData({ /* Réinitialise les données du client après ajout*/
                        name: '',
                        lastName: '',
                        birthday: '',
                        email: '',
                        phone: ''
                    });
                }}
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