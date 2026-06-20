import React, { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export const AddContact = () => {
    const { store } = useGlobalReducer();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    
    const editId = searchParams.get("edit"); 

    const user = "SergiVG";
    const baseUrl = `https://playground.4geeks.com/contact/agendas/${user}/contacts`;

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        address: ""
    });

    useEffect(() => {
        if (editId && store.contacts) {
            const contactToEdit = store.contacts.find(c => c.id === parseInt(editId));
            if (contactToEdit) {
                setFormData({
                    name: contactToEdit.name || "",
                    email: contactToEdit.email || "",
                    phone: contactToEdit.phone || "",
                    address: contactToEdit.address || ""
                });
            }
        }
    }, [editId, store.contacts]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSave = (e) => {
        e.preventDefault();

        const url = editId ? `${baseUrl}/${editId}` : baseUrl;
        const method = editId ? "PUT" : "POST";

        fetch(url, {
            method: method,
            body: JSON.stringify({
                name: formData.name.trim(),
                email: formData.email.trim(),
                phone: formData.phone.trim(),
                address: formData.address.trim()
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then((response) => {
            if (!response.ok) throw new Error("Failed to process contact action.");
            return response.json();
        })
        .then(() => {
            navigate("/");
        })
        .catch((error) => alert(error.message));
    };

    return (
        <div className="container py-5 d-flex flex-column align-items-center">
            <h1 className="display-5 fw-normal mb-4">
                {editId ? "Update contact details" : "Add a new contact"}
            </h1>
            
            <form onSubmit={handleSave} className="w-100" style={{ maxWidth: "600px" }}>
                <div className="mb-3">
                    <label className="form-label text-muted small fw-bold">Full Name</label>
                    <input type="text" name="name" className="form-control" placeholder="Full Name" value={formData.name} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label className="form-label text-muted small fw-bold">Email</label>
                    <input type="email" name="email" className="form-control" placeholder="Enter email" value={formData.email} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label className="form-label text-muted small fw-bold">Phone</label>
                    <input type="text" name="phone" className="form-control" placeholder="Enter phone" value={formData.phone} onChange={handleChange} required />
                </div>
                <div className="mb-4">
                    <label className="form-label text-muted small fw-bold">Address</label>
                    <input type="text" name="address" className="form-control" placeholder="Enter address" value={formData.address} onChange={handleChange} required />
                </div>

                <button type="submit" className="btn btn-primary w-100 py-2 mb-3 text-capitalize">
                    {editId ? "update" : "save"}
                </button>

                <div className="text-start">
                    <Link to="/" className="text-decoration-underline text-primary small">
                        or get back to contacts
                    </Link>
                </div>
            </form>
        </div>
    );
};