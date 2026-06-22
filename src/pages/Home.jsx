import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import ContactCard from "../components/ContactCard.jsx";

export const Home = () => {
    const { store, dispatch } = useGlobalReducer();
    const navigate = useNavigate();
    const slug = "SergiVG";
    const baseUrl = `https://playground.4geeks.com/contact/agendas/${slug}`;

    const fetchContacts = () => {
        fetch(`${baseUrl}/contacts`)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                const contactsArray = data.contacts;
                dispatch({ type: "set_contacts", payload: contactsArray });
            })
            .catch((error) => console.error("Error:", error));
    };

    useEffect(() => {
        fetchContacts();
    }, []);

    const handleDelete = (idToDelete) => {
        fetch(`${baseUrl}/contacts/${idToDelete}`, {
            method: "DELETE"
        })
        .then((response) => {
            if (!response.ok) throw new Error("Could not delete contact from API");
            dispatch({ type: "delete_contact", payload: idToDelete });
        })
        .catch((error) => alert(error.message));
    };

    const handleEdit = (contactObject) => {
        navigate("/add-contact", { state: { contact: contactObject } });
    };

    return (
    <div className="container py-5">
        <div className="d-flex justify-content-end align-items-center mb-4">
            <Link to="/add-contact" className="btn btn-success px-4 rounded-3">
                Add new contact
            </Link>
        </div>

        <div className="d-flex flex-column align-items-center">
            {store.contacts && store.contacts.length === 0 ? (
                <div className="text-center py-5 border rounded-3 bg-white w-100">
                    <p className="text-muted m-0">No contacts found in agenda '{slug}'. Click the button above to add one.</p>
                </div>
            ) : (
                store.contacts.map((contact) => (
                    <div key={contact.id} className="w-100 d-flex justify-content-center">
                        <ContactCard 
                            contact={contact} 
                            onDelete={handleDelete} 
                            onEdit={()=> handleEdit(contact)} 
                        />
                    </div>
                ))
            )}
        </div>
    </div>
);
};