import ClientItem from "./ClientItem";
import PropTypes from 'prop-types';

function ClientList({ clientList, deleteClient }) {
    return clientList.length ? (
        <ul>
            {clientList.map(client => (
                <ClientItem key={client.id} client={client} deleteClient={deleteClient} />
            ))}
        </ul>
    ) : (
        <p>Aucun client pour le moment</p>
    )


}

ClientList.propTypes = {
    clientList: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            lastName: PropTypes.string.isRequired,
            birthday: PropTypes.string.isRequired,
            email: PropTypes.string.isRequired,
            phone: PropTypes.string.isRequired,
        })
    ).isRequired,
    deleteClient: PropTypes.func.isRequired,
};

export default ClientList;