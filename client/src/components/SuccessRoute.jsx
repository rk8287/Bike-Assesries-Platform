import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate, useParams } from "react-router-dom";
import axios from "axios";

const SuccessRoute = ({ children }) => {
  const { id } = useParams();
  const [validOrder, setValidOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/orders/${id}`);
        // Only allow the user who placed the order
        if (res.data.userId === user?._id) {
          setValidOrder(res.data);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    if (id && user) fetchOrder();
    else setLoading(false);
  }, [id, user]);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!validOrder) return <Navigate to="/" replace />;

  return children;
};

export default SuccessRoute;
