import PropTypes from 'prop-types';

function ClientItem({ client }) {
    return (
        <li className="d-flex flex-row justify-content-center align-items-center p-10">
            <p>Nom : {client.name}</p>
            <p>Prénom : {client.lastName}</p>
            <p>Date de Naissance : {client.birthday}</p>
            <p>Email : {client.email}</p>
            <p>Téléphone : {client.phone}</p>
        </li>
    )

}
ClientItem.propTypes = {
    client: PropTypes.shape({
        name: PropTypes.string.isRequired,
        lastName: PropTypes.string.isRequired,
        birthday: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
        phone: PropTypes.string.isRequired,
    }).isRequired,
};


export default ClientItem;
