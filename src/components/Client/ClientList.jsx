import ClientItem from "./ClientItem";

function ClientList({ clientList }) {
    return clientList.length ? (
        <ul>
            {clientList.map(client => (
                <ClientItem key={client.id} client={client} />
            ))}
        </ul>
    ) : (
        <p>Aucun client pour le moment</p>
    )


}

export default ClientList;