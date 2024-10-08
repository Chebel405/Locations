import ClientItem from "./ClientItem";
import PropTypes from 'prop-types';
import EditClient from "./EditClient";

function ClientList({ clientList, deleteClient, modifyClient }) {

    return clientList.length ? (
        <ul>
            {clientList.map(client => (
                client.edit ? (
                    <EditClient
                        key={client.id}
                        client={client}
                        cancelClient={() => modifyClient(client.id, { edit: false })}
                        editClient={(newData) => modifyClient(client.id, { ...newData, edit: false })} />
                ) : (
                    <ClientItem
                        key={client.id}
                        client={client}
                        deleteClient={() => deleteClient(client.id)}
                        modifyClient={() => modifyClient(client.id, { edit: true })}
                    />
                )
            )
            )}
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
    modifyClient: PropTypes.func.isRequired,
};

export default ClientList;