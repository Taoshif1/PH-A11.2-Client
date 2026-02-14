import React, { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useAuth } from "../hooks/useAuth";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const stripePromise = loadStripe(
  "pk_test_51ScAFcR3NUGSbqET0sdJfkF3ZAvCQ4sDIbGLjjHCr9VVGaG8Lr5GdNhIpnYCudSfKbLuNFXXWblZeOvhKMtpzmDR004Shh7weu",
);

const CheckoutForm = ({ price, onSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [clientSecret, setClientSecret] = useState("");
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    if (price > 0 && user) {
      axiosSecure
        .post("/api/payments/create-payment-intent", { price })
        .then((res) => setClientSecret(res.data.clientSecret))
        .catch((err) => console.error("Stripe Secret Error:", err));
    }
  }, [price, axiosSecure, user]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements || !user || !clientSecret) return;

    setProcessing(true);
    const card = elements.getElement(CardElement);

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || "anonymous@test.com",
            // FIX: Fallback if displayName is null
            name:
              user?.displayName || user?.email?.split("@")[0] || "Guest Donor",
          },
        },
      });

    if (confirmError) {
      setProcessing(false);
      Swal.fire("Error", confirmError.message, "error");
    } else if (paymentIntent.status === "succeeded") {
      const paymentData = {
        // FIX: Ensuring we send a name to the backend
        userName:
          user?.displayName || user?.email?.split("@")[0] || "Anonymous",
        userEmail: user.email,
        amount: price,
        transactionId: paymentIntent.id,
        date: new Date(),
      };

      try {
        await axiosSecure.post("/api/payments/funds", paymentData);
        setProcessing(false);
        onSuccess();
      } catch (err) {
        setProcessing(false);
        Swal.fire(
          "Error",
          "Payment succeeded but failed to save record.",
          "error",
        );
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-gray-50 rounded-xl border">
      <CardElement className="mb-4 p-3 bg-white rounded border" />
      <button
        type="submit"
        disabled={!stripe || !clientSecret || processing}
        className="btn btn-error btn-block text-white"
      >
        {processing ? "Processing..." : `Pay $${price}`}
      </button>
    </form>
  );
};

const Funding = () => {
  const [funds, setFunds] = useState([]);
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const fetchFunds = async () => {
    if (!user) return; // Don't fetch if no user (prevents 403 errors)
    try {
      const res = await axiosSecure.get("/api/payments/funds");
      setFunds(Array.isArray(res.data.result) ? res.data.result : []);
    } catch (err) {
      setFunds([]);
    }
  };

  useEffect(() => {
    if (!loading) fetchFunds();
  }, [user, loading]);

  const handleOpenModal = () => {
    if (!user) {
      Swal.fire({
        title: "Login Required",
        text: "You must be logged in to donate.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Login Now",
      }).then((result) => {
        if (result.isConfirmed) navigate("/login");
      });
      return;
    }
    document.getElementById("pay_modal").showModal();
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-4xl font-black">
          Lifestream <span className="text-error">Funds</span>
        </h1>
        <button
          onClick={handleOpenModal}
          className="btn btn-error text-white px-8 rounded-xl"
        >
          Give Fund
        </button>
      </div>

      <div className="overflow-x-auto bg-white rounded-3xl border">
        <table className="table w-full">
          <thead className="bg-gray-50">
            <tr>
              <th>Donor</th>
              <th>Amount</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {!user ? (
              <tr>
                <td colSpan="3" className="text-center py-10">
                  Please login to view donation history.
                </td>
              </tr>
            ) : (
              funds.map((f) => (
                <tr key={f._id}>
                  <td className="font-bold">{f.userName || "Anonymous"}</td>
                  <td className="text-success font-bold">${f.amount}</td>
                  <td>{new Date(f.date).toLocaleDateString()}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <dialog id="pay_modal" className="modal">
        <div className="modal-box rounded-3xl relative">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg mb-4 text-center">
            Support our Cause
          </h3>
          <Elements stripe={stripePromise}>
            <CheckoutForm
              price={10}
              onSuccess={() => {
                document.getElementById("pay_modal").close();
                Swal.fire(
                  "Success!",
                  "Thank you for your donation!",
                  "success",
                );
                fetchFunds();
              }}
            />
          </Elements>
        </div>
      </dialog>
    </div>
  );
};

export default Funding;
