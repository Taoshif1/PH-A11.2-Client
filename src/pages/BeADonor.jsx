// src/pages/BeADonor.jsx
const BeADonor = () => {
    return (
        <div className="min-h-[80vh] flex flex-col items-center justify-center bg-base-200 p-6">
            <div className="card w-full max-w-md bg-base-100 shadow-xl">
                <div className="card-body items-center text-center">
                    <h2 className="card-title text-3xl font-bold text-error">Become a Lifesaver!</h2>
                    <p className="py-4 text-gray-600">Fill out the form below to join our donor database.</p>
                    <div className="form-control w-full">
                        <label className="label"><span className="label-text">Blood Group</span></label>
                        <select className="select select-bordered w-full">
                            <option disabled selected>Select your group</option>
                            <option>A+</option>
                            <option>O+</option>
                            <option>B+</option>
                        </select>
                    </div>
                    <div className="card-actions mt-6">
                        <button className="btn btn-error text-white w-full">Register as Donor</button>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default BeADonor