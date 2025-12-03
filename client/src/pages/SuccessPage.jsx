import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import { CheckCircle } from "lucide-react";

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
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-yellow-50 to-yellow-100 px-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 max-w-md w-full text-center animate-fadeIn">
        <CheckCircle className="mx-auto text-green-500 w-16 h-16 mb-4" />
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800">
          Order Placed Successfully!
        </h2>
        <p className="text-gray-500 mt-2">
          Thank you for your purchase. Your order is confirmed.
        </p>

        <div className="mt-6 bg-yellow-50 border border-yellow-300 rounded-lg p-4">
          <h3 className="text-gray-700 font-semibold">Order ID:</h3>
          <p className="text-yellow-600 font-mono text-lg break-words">{id}</p>

          {order && (
            <>
              <h3 className="mt-4 text-gray-700 font-semibold">Order Total:</h3>
              <p className="text-gray-900 text-xl font-bold">₹{order.totalAmount}</p>
              {order.items && order.items.length > 0 && (
                <div className="mt-4 text-left">
                  <h4 className="font-semibold text-gray-700 mb-2">Items:</h4>
                  <ul className="list-disc list-inside space-y-1 text-gray-600">
                    {order.items.map((item) => (
                      <li key={item._id}>
                        {item.name} x {item.quantity} - ₹{item.price * item.quantity}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </>
          )}
        </div>

        <Link
          to="/"
          className="mt-6 inline-block bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition-all duration-300"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
};

export default SuccessPage;
