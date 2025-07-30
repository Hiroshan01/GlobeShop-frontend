import { useState } from "react";
import axios from 'axios';
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import { BsGoogle } from "react-icons/bs";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate()

  const googleLogin = useGoogleLogin({
    onSuccess: (response) => {
      axios.post(import.meta.env.VITE_BACKEND_URL + "/api/users/google-login", {
        accessToken: response.access_token
      }).then((res) => {
        toast.success("Login Successful")
        const token = res.data.token
        localStorage.setItem("token", token)
        if (res.data.role == "admin") {
          navigate("/admin")
        } else {
          navigate("/")
        }
      }).catch((error) => {
        toast.error("Login Failed")
        console.error(error);
      })
    },
    onError: (error) => {
      toast.error("Google login failed")
      console.error(error);
    }
  })

  async function handleLogin() {
    try {
      const response = await axios.post(
        import.meta.env.VITE_BACKEND_URL + "/api/users/login",
        {
          email: email,
          password: password
        },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      toast.success("Login Successful")
      localStorage.setItem("token", response.data.token)
      if (response.data.role == "admin") {
        navigate("/admin")
      } else {
        navigate("/")
      }

      console.log(response.data);
    } catch (e) {
      toast.error(e.response?.data?.message || "Login failed");
    }
  }

  return (
    <div className="w-full h-screen bg-[url('/images/hero-1.jpg')] bg-center bg-cover flex justify-center items-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="w-full md:w-[50%] h-full"> </div>
      <div className="w-full md:w-[50%] h-full flex justify-center items-center">
        <div className="w-[80%] md:w-[500px] h-[600px] backdrop-blur-lg rounded-[20px] shadow-xl flex flex-col justify-center items-center p-6">
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className="w-full md:w-[300px] h-[50px] border border-secondary rounded-[10px] my-[10px] flex text-center text-shadow-white text-white"
            placeholder="Email"
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type="password"
            className="w-full md:w-[300px] h-[50px] border border-secondary rounded-[10px] my-[10px] flex text-center text-shadow-white text-white"
            placeholder="Password"
          />
          <button
            onClick={handleLogin}
            className="w-full md:w-[300px] cursor-pointer h-[50px]  bg-gradient-to-r from-purple-600 to-blue-600  rounded-[10px] my-[10px] flex justify-center items-center text-center text-white font-bold text-xl"
          >
            Login
          </button>
          <button
            onClick={() => googleLogin()}
            className="w-full md:w-[300px] cursor-pointer h-[50px]  bg-gradient-to-r from-purple-600 to-blue-600  hover:bg-blue-600 rounded-[10px] my-[10px] flex justify-center items-center text-center text-white font-bold text-xl gap-2"
          >
            <BsGoogle className="text-xl text-shadow-fuchsia-300 hover:text-yellow-500 transition-all duration-300" />

            Login with Google
          </button>
        </div>
      </div>
    </div>
  );
}