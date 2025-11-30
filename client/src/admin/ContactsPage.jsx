import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchContacts } from "../slices/contactSlice";

function ContactsPage() {
  const dispatch = useDispatch();
  const { items: contacts, loading } = useSelector((state) => state.contacts);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-black">User Contact Messages</h1>

      <div className="bg-white shadow rounded-xl p-4">
        {loading ? (
          <p>Loading...</p>
        ) : (
          contacts.map((contact) => (
            <div key={contact._id} className="border-b p-4">
              <h3 className="font-semibold">{contact.name}</h3>
              <p className="text-gray-600">{contact.message}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default ContactsPage;
