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

// Initialize Stripe outside of the component
const stripePromise = loadStripe(
  "pk_test_51ScAFcR3NUGSbqET0sdJfkF3ZAvCQ4sDIbGLjjHCr9VVGaG8Lr5GdNhIpnYCudSfKbLuNFXXWblZeOvhKMtpzmDR004Shh7weu",
);

// --- Sub-Component: CheckoutForm ---
const CheckoutForm = ({ price, onSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { user, loading: authLoading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [clientSecret, setClientSecret] = useState("");
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    if (price > 0) {
      axiosSecure
        .post("/api/payments/create-payment-intent", { price })
        .then((res) => setClientSecret(res.data.clientSecret))
        .catch((err) => console.error("Stripe Secret Error:", err));
    }
  }, [price, axiosSecure]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements || !user || !clientSecret) {
      console.log("Stripe, Elements, or User not loaded yet");
      return;
    }

    setProcessing(true);

    const card = elements.getElement(CardElement);

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || "anonymous@test.com",
            name: user?.displayName || "Donor",
          },
        },
      });

    if (confirmError) {
      setProcessing(false);
      Swal.fire("Error", confirmError.message, "error");
    } else {
      if (paymentIntent.status === "succeeded") {
        const paymentData = {
          userName: user.displayName || user.email.split('@')[0] || "Anonymous Donor",
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
          console.error("Save to DB error:", err);
        }
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-gray-50 rounded-xl border">
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              "::placeholder": { color: "#aab7c4" },
            },
            invalid: { color: "#9e2146" },
          },
        }}
        className="mb-4 p-3 bg-white rounded border"
      />
      <button
        type="submit"
        disabled={!stripe || !clientSecret || processing || authLoading}
        className={`btn btn-error btn-block text-white ${processing ? "animate-pulse" : ""}`}
      >
        {processing ? "Processing..." : `Pay $${price}`}
      </button>
    </form>
  );
};

// --- Main Component: Funding ---
const Funding = () => {
  const [funds, setFunds] = useState([]);
  const axiosSecure = useAxiosSecure();

  const fetchFunds = async () => {
    try {
      const res = await axiosSecure.get("/api/payments/funds");
      setFunds(res.data);
    } catch (err) {
      console.error("Fetch Funds Error:", err);
    }
  };

  useEffect(() => {
    fetchFunds();
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-4xl font-black">
          Lifestream <span className="text-error">Funds</span>
        </h1>
        <button
          onClick={() => document.getElementById("pay_modal").showModal()}
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
            {funds.map((f) => (
              <tr key={f._id}>
                <td className="font-bold">{f.userName}</td>
                <td className="text-success font-bold">${f.amount}</td>
                <td>{new Date(f.date).toLocaleDateString()}</td>
              </tr>
            ))}
            {funds.length === 0 && (
              <tr>
                <td colSpan="3" className="text-center py-10 text-gray-400">
                  No donations found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal Section */}
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
                const modal = document.getElementById("pay_modal");
                if (modal) modal.close();

                Swal.fire({
                  title: "Success!",
                  text: "Thank you for your donation!",
                  icon: "success",
                  confirmButtonColor: "#EF4444",
                });

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
