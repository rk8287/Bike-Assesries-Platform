import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const SuccessPage = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/orders/${id}`)
      .then((res) => setOrder(res.data))
      .catch((err) => console.log(err));
  }, [id]);

  return (
    <div className="max-w-2xl mx-auto p-4 text-center">
      <h2 className="text-3xl font-bold text-green-600">Order Successful!</h2>
      <p className="text-gray-500 mt-2">Your order has been placed successfully.</p>

      <h3 className="mt-4 font-bold">Order ID:</h3>
      <p className="text-blue-600 font-mono text-xl">{id}</p>

      {order && (
        <div className="mt-4 p-4 border rounded">
          <h3 className="font-semibold">Order Total: ₹{order.totalAmount}</h3>
        </div>
      )}
    </div>
  );
};

export default SuccessPage;
