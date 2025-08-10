import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

export default function ForgotPassword() {
    const [otpSent, setOtpSent] = useState(false);
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    function sentOtp() {
        axios.post(
            import.meta.env.VITE_BACKEND_URL + '/api/users/send-otp', { email })
            .then((response) => {
                setOtpSent(true);
                toast.success("OTP sent to your email");
            }).catch((error) => {
                console.error("Error sending OTP:", error);
            })
    }

    function verifyOtp() {
        axios.post(
            import.meta.env.VITE_BACKEND_URL + '/api/users/reset-password', { email, otp, newPassword })
            .then((response) => {
                toast.success("OTP verification successful");
                console.log("Password reset successful:", response.data);
            }).catch((error) => {
                console.error("Error verifying OTP:", error);
                toast.error("OTP verification failed");
            })
    }
    return (
        <div className="w-full h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 to-blue-600">
            {
                otpSent ?
                    <div className="w-[90%] sm:w-[400px] bg-white p-6 rounded-lg shadow-md">
                        <input
                            type="text"
                            className="w-full p-2 border border-gray-300 rounded mb-4"
                            placeholder="Enter OTP"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                        />
                        <input
                            type="password"
                            className="w-full p-2 border border-gray-300 rounded mb-4"
                            placeholder="Enter New Password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                        <input
                            type="password"
                            className="w-full p-2 border border-gray-300 rounded mb-4"
                            placeholder="Confirm New Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        <button
                            onClick={verifyOtp}
                            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white p-2 rounded hover:bg-blue-600 transition-all duration-300"
                        >
                            Verify OTP
                        </button>
                        <button
                            onClick={() => setOtpSent(false)}
                            className="w-full bg-gray-300 text-black p-2 rounded hover:bg-gray-400 mt-4"
                        >
                            Resend OTP
                        </button>
                    </div> :
                    <div className="w-[90%] sm:w-[400px] bg-white p-6 rounded-lg shadow-md">
                        <input
                            type="email"
                            className="w-full p-2 border border-gray-300 rounded mb-4"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <button
                            onClick={sentOtp}
                            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white p-2 rounded hover:bg-blue-600 transition-all duration-300"
                        >
                            Send OTP
                        </button>
                    </div>
            }
        </div>
    );
}