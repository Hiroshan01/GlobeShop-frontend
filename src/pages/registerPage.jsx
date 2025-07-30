import { useState } from "react";
import axios from 'axios';
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleRegister() {
    try {
      const response = await axios.post(
        import.meta.env.VITE_BACKEND_URL + "/api/users",
        {
          email: email,
          firstName: firstName,
          lastName: lastName,
          password: password
        },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      toast.success("Registration Successful");
      navigate("/login");
      console.log(response.data);
    } catch (e) {
      toast.error(e.response.data.message);
      console.error("Registration failed:", e.response.data.message);
    }
  }

  return (
    <div className="w-full h-screen bg-[url('/images/hero-1.jpg')]  bg-center bg-cover flex justify-center items-center">
      <div className="w-full md:w-[50%] h-full"></div>
      <div className="w-full md:w-[50%] h-full flex justify-center items-center">
        <div className="w-[80%] md:w-[500px] h-[600px] backdrop-blur-lg rounded-[20px] shadow-xl flex flex-col justify-center items-center p-6">
          <input
            onChange={(e) => setFirstName(e.target.value)}
            value={firstName}
            className="w-full md:w-[300px] h-[50px] border border-secondary rounded-[10px] my-[10px] flex text-center text-shadow-white"
            placeholder="First Name"
          />
          <input
            onChange={(e) => setLastName(e.target.value)}
            value={lastName}
            className="w-full md:w-[300px] h-[50px] border border-secondary rounded-[10px] my-[10px] flex text-center text-shadow-white"
            placeholder="Last Name"
          />
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className="w-full md:w-[300px] h-[50px] border border-secondary rounded-[10px] my-[10px] flex text-center text-shadow-white"
            placeholder="Email"
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type="password"
            className="w-full md:w-[300px] h-[50px] border border-secondary rounded-[10px] my-[10px] flex text-center text-shadow-white"
            placeholder="Password"
          />
          <button
            onClick={handleRegister}
            className="w-full md:w-[300px] cursor-pointer h-[50px] bg-gradient-to-r from-purple-600 to-blue-600 rounded-[10px] my-[10px] flex justify-center items-center text-center text-white font-bold text-xl"
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
}
