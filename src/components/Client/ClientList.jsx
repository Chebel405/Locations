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
                    client.name && client.lastName && client.birthday && client.email && client.phone ? (
                        <ClientItem
                            key={client.id}
                            client={client}
                            deleteClient={() => deleteClient(client.id)}
                            modifyClient={() => modifyClient(client.id, { edit: true })}
                        />
                    ) : (
                        <p key={client.id}>Client avec données incomplètes</p>
                    )
                )
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
            name: PropTypes.string,
            lastName: PropTypes.string,
            birthday: PropTypes.string,
            email: PropTypes.string,
            phone: PropTypes.string,
        })
    ).isRequired,
    deleteClient: PropTypes.func.isRequired,
    modifyClient: PropTypes.func.isRequired,
};

export default ClientList;