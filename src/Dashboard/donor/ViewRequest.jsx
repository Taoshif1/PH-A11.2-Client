import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { FaUser, FaHospital, FaLocationDot, FaCalendarDay, FaClock, FaDroplet, FaMessage } from 'react-icons/fa6';
import LifeStreamLoader from '../../components/LifeStreamLoader';

const ViewRequest = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const { data: request, isLoading } = useQuery({
    queryKey: ['bloodRequest', id],
    queryFn: async () => {
        const res = await axiosSecure.get(`/api/donation-requests/${id}`); 
        return res.data;
    }
});
    if (isLoading) return <LifeStreamLoader />;

    return (
        <div className="max-w-4xl mx-auto py-8 px-4">
            <button onClick={() => navigate(-1)} className="btn btn-ghost btn-sm mb-6">← Back</button>
            
            <div className="bg-base-100 rounded-3xl shadow-xl overflow-hidden border border-base-200">
                {/* Header Banner */}
                <div className="bg-error p-8 text-white flex justify-between items-center">
                    <div>
                        <h2 className="text-3xl font-bold">Blood Request Details</h2>
                        <p className="opacity-90">Status: <span className="badge badge-ghost uppercase">{request?.status}</span></p>
                    </div>
                    <div className="bg-white text-error w-20 h-20 rounded-2xl flex flex-col items-center justify-center shadow-lg">
                        <span className="text-xs font-bold uppercase">Group</span>
                        <span className="text-3xl font-black">{request?.bloodGroup}</span>
                    </div>
                </div>

                <div className="p-8 grid md:grid-cols-2 gap-8">
                    {/* Recipient Info */}
                    <div className="space-y-6">
                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-error/10 text-error rounded-xl"><FaUser /></div>
                            <div>
                                <p className="text-xs uppercase font-bold text-base-content/40">Recipient Name</p>
                                <p className="text-lg font-semibold">{request?.recipientName}</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-error/10 text-error rounded-xl"><FaHospital /></div>
                            <div>
                                <p className="text-xs uppercase font-bold text-base-content/40">Hospital</p>
                                <p className="text-lg font-semibold">{request?.hospitalName}</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-error/10 text-error rounded-xl"><FaLocationDot /></div>
                            <div>
                                <p className="text-xs uppercase font-bold text-base-content/40">Full Address</p>
                                <p className="text-lg font-semibold">{request?.fullAddress}</p>
                                <p className="text-sm text-base-content/60">{request?.upazila}, {request?.district}</p>
                            </div>
                        </div>
                    </div>

                    {/* Schedule Info */}
                    <div className="space-y-6">
                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-primary/10 text-primary rounded-xl"><FaCalendarDay /></div>
                            <div>
                                <p className="text-xs uppercase font-bold text-base-content/40">Donation Date</p>
                                <p className="text-lg font-semibold">{request?.donationDate}</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-primary/10 text-primary rounded-xl"><FaClock /></div>
                            <div>
                                <p className="text-xs uppercase font-bold text-base-content/40">Time</p>
                                <p className="text-lg font-semibold">{request?.donationTime}</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-secondary/10 text-secondary rounded-xl"><FaMessage /></div>
                            <div>
                                <p className="text-xs uppercase font-bold text-base-content/40">Request Message</p>
                                <p className="text-base leading-relaxed text-base-content/70 italic">"{request?.requestMessage}"</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer Actions */}
                <div className="p-8 bg-base-200/50 border-t border-base-200 flex flex-wrap gap-4">
                    <button className="btn btn-error flex-1">I Want to Donate</button>
                    <button className="btn btn-outline flex-1">Share Request</button>
                </div>
            </div>
        </div>
    );
};

export default ViewRequest;
