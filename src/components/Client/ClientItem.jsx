import PropTypes from 'prop-types';


/**
 * Composant ClientItem qui affiche les informations d'un client.
 * @param {Object} props - Les props du composant.
 * @param {Object} props.client - Les données du client à afficher.
 * @param {Function} props.deleteClient - Fonction pour supprimer un client.
 * @param {Function} props.modifyClient - Fonction pour modifier les informations d'un client.
 * @returns {JSX.Element} Un élément de liste représentant un client.
 */
function ClientItem({ client, deleteClient, modifyClient }) {


    const handleModifyClick = () => {
        console.log("ID envoyé :", client.id);
        modifyClient(client.id, { ...client, edit: true });
    };
    return (
        <div className="d-flex flex-row justify-content-center align-items-center p-10">
            <p className='flex-fill mr-15'>Nom : {client.name || "Nom manquant"}</p>
            <p className='flex-fill mr-15'>Prénom : {client.lastName || "Prénom manquant"}</p>
            <p className='flex-fill mr-15'>Date de Naissance : {client.birthday || "Date de naissance manquante"}</p>
            <p className='flex-fill mr-15'>Email : {client.email || "email manquant"}</p>
            <p className='flex-fill mr-15'>Téléphone : {client.phone || "Téléphone manquant"}</p>

            <button className="btn btn-primary mr-15" onClick={handleModifyClick}>Modifier</button>
            <button className="btn btn-reverse-primary mr-15" onClick={() => deleteClient(client.id)}>Supprimer</button>
        </div>
    )

}
ClientItem.propTypes = {
    client: PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string,
        lastName: PropTypes.string.isRequired,
        birthday: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
        phone: PropTypes.string.isRequired,

    }).isRequired,
    deleteClient: PropTypes.func.isRequired,
    modifyClient: PropTypes.func.isRequired,

};




export default ClientItem;
