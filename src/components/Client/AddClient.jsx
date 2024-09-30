import { useState } from "react";

function AddClient({ addClient }) {

    const [clientData, setClientData] = useState({
        name: '',
        lastName: '',
        birthday: '',
        email: '',
        phone: ''
    });

    function handleChange(e) {
        const { name, value } = e.target;
        console.log(e);
        setClientData({
            ...clientData,
            [name]: value
        });
    }



    function handleKeyDown(e) {
        if (e.code === "Enter") {
            e.preventDefault();
            addClient(
                clientData.name,
                clientData.lastName,
                clientData.birthday,
                clientData.email,
                clientData.phone
            );
            setClientData({
                name: '',
                lastName: '',
                birthday: '',
                email: '',
                phone: ''
            });
        }

    }


    return (
        <div className="d-flex flex-row justify-content-center align-items-center ">
            <input
                type="text"
                name="name"
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                value={clientData.name}
                placeholder="Nom"
                className="mr-15"
            />
            <input
                type="text"
                name="lastName"
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                value={clientData.lastName}
                placeholder="Prenom"
                className="mr-15"
            />
            <input
                type="date"
                name="birthday"
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                value={clientData.birthday}
                placeholder="Date de naissance"
                className="mr-15"
            />
            <input
                type="email"
                name="email"
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                value={clientData.email}
                placeholder="Mail"
                className="mr-15"
            />
            <input
                type="text"
                name="phone"
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                value={clientData.phone}
                placeholder="Téléphone"
                className="mr-15"
            />
            <button
                onClick={() => {
                    addClient(
                        clientData.name,
                        clientData.lastName,
                        clientData.birthday,
                        clientData.email,
                        clientData.phone
                    );
                    setClientData({
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

export default AddClient;