import React, { useState } from 'react';
import { saveGuest, saveReservation } from '../services/api';

const CreateReservationPage = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        nic: '',
        checkInDate: '',
        checkOutDate: '',
        roomType: 'Deluxe King Suite',
        numberOfGuests: '2 Adults',
        specialRequests: '',
    });

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage({ type: '', text: '' });

        try {
            // 1. Save Guest
            const guestResponse = await saveGuest({
                firstName: formData.firstName,
                lastName: formData.lastName,
                phoneNumber: formData.phoneNumber,
                nic: formData.nic,
                email: formData.email,
            });

            const guestId = guestResponse.data.guestId;

            // 2. Save Reservation
            await saveReservation({
                guestId: guestId,
                roomId: formData.roomType,
                checkInDate: formData.checkInDate,
                checkOutDate: formData.checkOutDate,
                status: 'CONFIRMED',
            });

            setMessage({ type: 'success', text: 'Reservation confirmed successfully!' });
        } catch (error) {
            console.error('Error creating reservation:', error);
            setMessage({ type: 'error', text: 'Failed to create reservation. Please try again.' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="layout-container flex h-full grow flex-col bg-background">
            <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-border bg-white px-10 py-3 sticky top-0 z-50">
                <div className="flex items-center gap-8">
                    <div className="flex items-center gap-3 text-primary">
                        <div className="size-8 bg-primary/10 rounded-lg flex items-center justify-center">
                            <span className="material-symbols-outlined text-primary"></span>
                        </div>
                        <h2 className="text-slate-900 text-lg font-bold">Reservation Management</h2>
                    </div>
                </div>
                <div className="flex flex-1 justify-end gap-8">
                    <nav className="flex items-center gap-6">
                        <a className="text-text-secondary hover:text-primary text-sm font-medium transition-colors" href="#">Dashboard</a>
                        <a className="text-primary text-sm font-bold border-b-2 border-primary py-4 -mb-4 transition-colors" href="#">Reservations</a>
                        <a className="text-text-secondary hover:text-primary text-sm font-medium transition-colors" href="#">Rooms</a>
                        <a className="text-text-secondary hover:text-primary text-sm font-medium transition-colors" href="#">Guests</a>
                        <a className="text-text-secondary hover:text-primary text-sm font-medium transition-colors" href="#">Reports</a>
                    </nav>
                    <div className="bg-primary/20 flex items-center justify-center rounded-full size-10 border-2 border-primary/30 overflow-hidden">
                        <img className="w-full h-full object-cover" alt="User avatar" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCLBCoDw7_-Z7TNMn-A_UoigVwCJCiI0z0JlzxFTkMRbj5PJ86ueXp8NgKTPISMF7xKVUuNkdJDiK_crHXBEIQDanPbrGzzrXm5_3MeT_FtkNEqHaKKjBOfGMwOxZawnHs0zvs8DTIzDhMIJqZcCBEehBchwgC_tqENS9GW_exsYM1NaFarb67xoxfY6w8gKMOjbCdQckEfA-Ih8IUcr5T8UdkXwgNEW7jtNJ8RGIqTuh8hqI-yD0pXVWBCfNGveqSlATc1vvWf_Do" />
                    </div>
                </div>
            </header>

            <main className="flex-1 overflow-y-auto pb-12">
                <div className="max-w-5xl mx-auto px-6 pt-8">
                    {message.text && (
                        <div className={`mb-6 p-4 rounded-lg border ${message.type === 'success' ? 'bg-green-100 border-green-200 text-green-800' : 'bg-red-100 border-red-200 text-red-800'}`}>
                            {message.text}
                        </div>
                    )}

                    <div className="flex flex-wrap justify-between items-end gap-4 mb-8">
                        <div className="flex flex-col gap-2">
                            <h1 className="text-slate-900 text-4xl font-black leading-tight tracking-tight">Create Reservation</h1>
                            <p className="text-text-secondary text-base">Register a new guest and book their stay below.</p>
                        </div>
                        <button type="button" className="flex items-center justify-center gap-2 rounded-lg h-11 px-6 border border-border bg-white text-text-primary text-sm font-bold hover:bg-slate-50 transition shadow-sm">
                            <span className="material-symbols-outlined text-lg"></span>
                            View Availability
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2 space-y-8">
                            <section className="bg-white rounded-xl border border-border shadow-sm overflow-hidden">
                                <div className="px-6 py-4 border-b border-border bg-slate-50/50 flex items-center gap-3">
                                    <span className="material-symbols-outlined text-primary"></span>
                                    <h3 className="font-bold text-slate-900">Guest Personal Information</h3>
                                </div>
                                <div className="p-6 space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <label className="flex flex-col gap-2">
                                            <span className="text-text-primary text-sm font-semibold">First Name</span>
                                            <input name="firstName" value={formData.firstName} onChange={handleChange} className="form-input" placeholder="Sarah" type="text" required />
                                        </label>
                                        <label className="flex flex-col gap-2">
                                            <span className="text-text-primary text-sm font-semibold">Last Name</span>
                                            <input name="lastName" value={formData.lastName} onChange={handleChange} className="form-input" placeholder="Jenkins" type="text" required />
                                        </label>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <label className="flex flex-col gap-2">
                                            <span className="text-text-primary text-sm font-semibold">Email Address</span>
                                            <input name="email" value={formData.email} onChange={handleChange} className="form-input" placeholder="sarah.j@example.com" type="email" required />
                                        </label>
                                        <label className="flex flex-col gap-2">
                                            <span className="text-text-primary text-sm font-semibold">Phone Number</span>
                                            <input name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} className="form-input" placeholder="0761234567" type="tel" required />
                                        </label>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <label className="flex flex-col gap-2">
                                            <span className="text-text-primary text-sm font-semibold">NIC Number</span>
                                            <input name="nic" value={formData.nic} onChange={handleChange} className="form-input" placeholder="20011336789V" type="text" required />
                                        </label>
                                    </div>
                                </div>
                            </section>

                            <section className="bg-white rounded-xl border border-border shadow-sm overflow-hidden">
                                <div className="px-6 py-4 border-b border-border bg-slate-50/50 flex items-center gap-3">
                                    <span className="material-symbols-outlined text-primary"></span>
                                    <h3 className="font-bold text-slate-900">Stay Details</h3>
                                </div>
                                <div className="p-6 space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <label className="flex flex-col gap-2">
                                            <span className="text-text-primary text-sm font-semibold">Check-in Date</span>
                                            <input name="checkInDate" value={formData.checkInDate} onChange={handleChange} className="form-input px-3" type="date" required />
                                        </label>
                                        <label className="flex flex-col gap-2">
                                            <span className="text-text-primary text-sm font-semibold">Check-out Date</span>
                                            <input name="checkOutDate" value={formData.checkOutDate} onChange={handleChange} className="form-input px-3" type="date" required />
                                        </label>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <label className="flex flex-col gap-2">
                                            <span className="text-text-primary text-sm font-semibold">Room Type</span>
                                            <select name="roomType" value={formData.roomType} onChange={handleChange} className="form-input px-2">
                                                <option>Deluxe King Suite</option>
                                                <option>Standard Double</option>
                                                <option>Executive Ocean View</option>
                                                <option>Penthouse</option>
                                            </select>
                                        </label>
                                        <label className="flex flex-col gap-2">
                                            <span className="text-text-primary text-sm font-semibold">Guests</span>
                                            <select name="numberOfGuests" value={formData.numberOfGuests} onChange={handleChange} className="form-input px-2">
                                                <option>1 Adult</option>
                                                <option>2 Adults</option>
                                                <option>2 Adults, 1 Child</option>
                                                <option>2 Adults, 2 Children</option>
                                            </select>
                                        </label>
                                    </div>
                                    <label className="flex flex-col gap-2">
                                        <span className="text-text-primary text-sm font-semibold">Special Requests</span>
                                        <textarea name="specialRequests" value={formData.specialRequests} onChange={handleChange} className="form-input py-3 min-h-[100px]" placeholder="Allergies, late check-in, honeymoon package..."></textarea>
                                    </label>
                                </div>
                            </section>
                        </div>

                        <div className="space-y-6">
                            <section className="bg-white rounded-xl border border-border shadow-sm p-6 sticky top-24">
                                <h3 className="font-bold text-slate-900 text-lg mb-6">Reservation Summary</h3>
                                <div className="space-y-4 mb-8">
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-text-secondary">Room Rate (3 nights)</span>
                                        <span className="font-medium text-slate-900">$897.00</span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-text-secondary">Taxes & Fees</span>
                                        <span className="font-medium text-slate-900">$107.64</span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-text-secondary">Service Charge</span>
                                        <span className="font-medium text-slate-900">$45.00</span>
                                    </div>
                                    <div className="pt-4 border-t border-border flex justify-between items-center">
                                        <span className="font-bold text-slate-900">Total Amount</span>
                                        <span className="font-black text-2xl text-primary">$1,049.64</span>
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full flex items-center justify-center gap-2 rounded-lg h-12 bg-primary hover:bg-primary-dark text-white font-bold transition shadow-md shadow-primary/20 disabled:opacity-50"
                                    >
                                        <span className="material-symbols-outlined"></span>
                                        {loading ? 'Confirming...' : 'Confirm Reservation'}
                                    </button>
                                </div>
                                <div className="mt-8 p-4 bg-primary/5 rounded-lg border border-primary/10">
                                    <div className="flex gap-3">
                                        <span className="material-symbols-outlined text-primary text-xl">info</span>
                                        <p className="text-xs text-text-secondary leading-relaxed">
                                            Confirming this reservation will automatically update availability and notify the guest.
                                        </p>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    );
};

export default CreateReservationPage;
