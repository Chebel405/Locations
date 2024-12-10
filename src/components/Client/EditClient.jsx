import { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import ClientService from "../../services/ClientService";


function EditClient({ client, editClient, cancelClient }) {
    /* État local pour stocker les données du client à modifier*/
    const [clientData, setClientData] = useState({
        name: "",
        lastName: "",
        birthday: "",
        email: "",
        phone: ""
    });


    /**
     *  useEffect est utilisé pour remplir les données
     *  du client lorsque ce composant est monté ou lorsque
     *  l'objet client change.
     */
    useEffect(() => {
        if (client && Object.keys(client).length > 0) {
            console.log("Client recu par EditClient: ", client);
            setClientData({
                name: client.name || "",
                lastName: client.lastName || "",
                birthday: client.birthday || "",
                email: client.email || "",
                phone: client.phone || ""
            })
        }
    }, [client]);


    /**
    * Met à jour l'état avec les nouvelles valeurs saisies dans les champs d'input.
    * @param {Object} e - L'événement de changement sur l'input.
    */
    // function handleChange(e) {
    //     const { name, value } = e.target;
    //     setClientData({
    //         ...clientData,
    //         [name]: value
    //     });
    // }

    function handleChange(e) {
        const { name, value } = e.target;
        console.log(`Modification détectée - Champ: ${name}, Valeur: ${value}`); // Debug
        setClientData(prevState => {
            console.log("État précédent :", prevState); // Affiche l'état avant la modification
            const updatedState = { ...prevState, [name]: value };

            console.log("Nouvel état :", updatedState); // Affiche l'état après la modification
            return updatedState;
        });
    }


    /**
     * Gère l'appui sur la touche "Enter" pour déclencher la validation des données en appelant handleEditClient.
     * @param {Object} e - L'événement de clavier sur l'input.
     */
    function handleKeyDown(e) {
        if (e.code === "Enter") {
            e.preventDefault();
            handleEditClient();
        }
    }

    /**
     * Applique les modifications faites sur le client en appelant la fonction editClient avec les nouvelles données.
     */
    function handleEditClient() {
        if (!clientData.name || !clientData.lastName || !clientData.email) {
            alert("Veuillez remplir les champs obligatoires (Nom, Prénom, Email).");
            return;
        }

        const formattedData = {
            ...clientData,
            name: clientData.name.trim(),
            lastName: clientData.lastName.trim(),
            birthday: clientData.birthday.trim(),
            email: clientData.email.trim(),
            phone: clientData.phone.trim() || null,
        };

        console.log("Données à envoyer depuis EditClient :", formattedData);
        editClient(formattedData);

    }


    /**
     * Annule la modification en appelant la fonction cancelClient.
     */
    function handleCancel() {
        cancelClient();
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

            <button
                onClick={handleCancel}
                className="btn btn-primary"
            >
                Annuler
            </button>

            <button
                onClick={handleEditClient}
                className="btn btn-primary"
            >
                Valider
            </button>
        </div >
    );

}

EditClient.propTypes = {
    client: PropTypes.object.isRequired,
    editClient: PropTypes.func.isRequired,
    cancelClient: PropTypes.func.isRequired
};


export default EditClient;