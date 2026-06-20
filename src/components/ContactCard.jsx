import React from "react";
import "../index.css";

const ContactCard = ({ contact, onEdit, onDelete }) => {
    return (
        <div className="card shadow-sm border border-1 rounded-3 bg-white p-4 mb-3 position-relative contact-card-container">

            <div className="position-absolute top-0 end-0 m-3 d-flex gap-3 action-buttons-group">
                <button
                    onClick={() => onEdit(contact.id)}
                    className="btn btn-link p-0 text-dark border-0 fs-5 text-decoration-none action-btn"
                    title="Edit contact">
                        <i className="fa-solid fa-pencil fa-lg"></i>
                </button>
                <button
                    onClick={() => onDelete(contact.id)}
                    className="btn btn-link p-0 text-dark border-0 fs-5 text-decoration-none action-btn"
                    title="Delete contact">
                        <i className="fa-solid fa-trash fa-lg"></i>
                </button>
            </div>

            <div className="d-flex align-items-center gap-4">

                <div className="flex-shrink-0">
                    <img
                        className="rounded-circle"
                        src="https://picsum.photos/170/170/"
                        alt="Contact"
                    />
                </div>

                <div className="flex-grow-1 contact-details-pane">
                    <h4 className="fw-normal text-dark mb-3">{contact.name}</h4>

                    <div className="d-flex align-items-center text-secondary mb-2">
                        <span className="me-2 fs-5 contact-icon-span"><i className="fa-solid fa-location-dot fa-lg"></i></span>
                        <span className="fw-light">{contact.address}</span>
                    </div>

                    <div className="d-flex align-items-center text-secondary mb-2">
                        <span className="me-2 fs-5 contact-icon-span"><i className="fa-solid fa-phone fa-lg"></i></span>
                        <span className="fw-light">{contact.phone}</span>
                    </div>

                    <div className="d-flex align-items-center text-secondary">
                        <span className="me-2 fs-5 contact-icon-span"><i className="fa-solid fa-envelope fa-lg"></i></span>
                        <span className="fw-light">{contact.email}</span>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default ContactCard;