import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaDollarSign, FaHandHoldingHeart } from "react-icons/fa";

const Funding = () => {
  const [funds, setFunds] = useState([]);
  
  useEffect(() => {
    axios.get("http://localhost:5000/api/funds").then(res => setFunds(res.data));
  }, []);

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-black">Community <span className="text-error">Funds</span></h1>
        <button className="btn btn-error text-white rounded-xl">
          <FaHandHoldingHeart /> Give Fund
        </button>
      </div>

      <div className="overflow-x-auto bg-white rounded-3xl border shadow-sm">
        <table className="table w-full">
          <thead className="bg-gray-50 text-gray-500 text-xs uppercase">
            <tr>
              <th>User Name</th>
              <th>Amount</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {funds.map((fund, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="font-bold">{fund.userName}</td>
                <td className="text-success font-bold">${fund.amount}</td>
                <td>{new Date(fund.date).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Funding;