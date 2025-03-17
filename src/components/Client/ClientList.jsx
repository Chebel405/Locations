import ClientItem from "./ClientItem";
import PropTypes from 'prop-types';
import EditClient from "./EditClient";

function ClientList({ clientList, deleteClient, modifyClient }) {
    console.log("ClientList mis à jour :", clientList); // Vérifier si la liste se met à jour

    const rows = [];
    for (let i = 0; i < clientList.length; i += 3) {
        rows.push(clientList.slice(i, i + 3));
    }

    function handleModifyClient(id, client) {
        console.log("Données envoyées à modifyClient depuis ClientList :", client);
        modifyClient(id, client);
    }

    return clientList.length ? (
        <div>
            {rows.map((row, rowIndex) => (
                <div key={`row-${rowIndex}`} className="client-row" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                    {row.map((client, clientIndex) => (
                        client.edit ? (
                            <EditClient
                                key={`edit-${client.id}`}
                                client={client}
                                cancelClient={() => handleModifyClient(client.id, { ...client, edit: false })}
                                editClient={(newData) => {
                                    console.log("Modification appliquée :", newData);
                                    handleModifyClient(client.id, { ...newData, edit: false });
                                }}
                            />
                        ) : (
                            client.name && client.lastName && client.birthday && client.email && client.phone ? (
                                <div
                                    key={`client-${client.id || clientIndex}`}
                                    style={{
                                        flex: '1',
                                        minWidth: '250px',
                                        maxWidth: '300px',
                                        padding: '16px',
                                        backgroundColor: 'white',
                                        border: '1px solid #ccc',
                                        borderRadius: '8px',
                                        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                                        marginRight: clientIndex < row.length - 1 ? '20px' : '0',
                                    }}>
                                    <ClientItem
                                        client={client}
                                        deleteClient={() => deleteClient(client.id)}
                                        modifyClient={(id, updatedClient) => modifyClient(id, updatedClient)}
                                    />

                                </div>
                            ) : (
                                <p key={`incomplete-${client.id}`}>Client avec données incomplètes</p>
                            )
                        )
                    ))}
                </div>
            ))}
        </div>
    ) : (
        <p>Aucun client pour le moment</p>
    );
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
            edit: PropTypes.bool, // Ajout de l'attribut edit
        })
    ).isRequired,
    deleteClient: PropTypes.func.isRequired,
    modifyClient: PropTypes.func.isRequired,
};

export default ClientList;
