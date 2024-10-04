import { useEffect, useState } from "react";


function EditClient({ client, editClient, cancelClient }) {

    const [clientData, setClientData] = useState({
        name: '',
        lastName: '',
        birthday: '',
        email: '',
        phone: ''
    });

    useEffect(() => {
        if (client) {
            setClientData({
                name: client.name || '',
                lastName: client.lastName || '',
                birthday: client.birthday || '',
                email: client.email || '',
                phone: client.phone || ''
            })
        }
    }, [client]);

    function handleChange(e) {
        const { name, value } = e.target;
        setClientData({
            ...clientData,
            [name]: value
        });
    }



    function handleKeyDown(e) {
        if (e.code === "Enter") {
            e.preventDefault();
            handleEditClient();
        }
    }

    function handleEditClient() {
        editClient(clientData);
        setClientData({
            name: "",
            lastName: "",
            birthday: "",
            email: "",
            phone: "",
        });
    }

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


export default EditClient;