'use client'
import axios from "axios";
import { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import clsx from "clsx";
import { Button } from "@nextui-org/button";
import { useRouter } from "next/navigation";
import BackgroundBeams from './ui/background.jsx'
import { AuthContext } from "./context/auth-context/contaxt.js";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Link from "next/link.js";


const LoginPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [data, setData] = useState("");
  const [userExist, setUserExist] = useState(true)
  const [response, setResponse] = useState([]);
  const [reg, setReg] = useState(false);
  const [loading, setLoading] = useState(false)
  const router = useRouter();
  const [user, setUser] = useState("");
  const { SetUser } = useContext(AuthContext)
  const [admins, setAdmins] = useState([])
  const onSubmit = async (data) => {

    setData(data)
    try {
      setLoading(true)
      const response = await axios.get(`http://localhost:8001/admins`, {
        params: {
          phone: data.phone,
          password: data.password
        }
      });

      if (response.data.length > 0) {
        // setUserExist(true)
        // setLoading(false)
        SetUser(response.data[0].id)
        router.push('/dashboard');
      }
      else {
        // setUserExist(false)
        setReg(true)
        setLoading(false)
        toast.error("Admin not Found")
      }
    } catch (error) {
      // setUserExist(false)
      setLoading(false)
      setReg(false)

    }
  }
  return (

    <div className="w-full flex justify-center items-center h-screen bg-neutral-950 flex-col ">
      <div className="w-1/3  rounded-xl bg-neutral-950 border border-neutral-800 p-8 flex flex-col z-10 max-md:w-full max-md:p-6" style={{ height: '320px' }}>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-1 flex-col justify-evenly">
          <input type="number" className=" border-1 outline-none p-2 rounded-sm text-[12px]" placeholder="Phone Number" {...register("phone", { required: true })}
            aria-invalid={errors.price ? "true" : "false"}
          />
          {errors.phone?.type === "required" && (
            <p className="text-red-600 text-[12px] " role="alert">please enter your phone number</p>
          )}
          <input type="text" className="border-1 outline-none p-2 rounded-sm text-[12px]" placeholder="Password" {...register("password", { required: true })}
            aria-invalid={errors.price ? "true" : "false"}
          />
          {errors.password?.type === "required" && (
            <p className="text-red-600 text-[12px] " role="alert">please enter your password</p>
          )}



          <Button className="bg-blue-950 text-white font-bold "
            type="submit"
            isLoading={loading}
            spinner={
              <svg
                className="animate-spin h-5 w-5 text-current"
                fill="none"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  fill="currentColor"
                />
              </svg>
            }
          >
            Log in
          </Button>
          {/* <button className=" flex justify-center p-2 rounded-md w-1/2 self-center bg-gray-900  text-white hover:bg-gray-800" type='submit'>
            <span>
              Login
            </span>
          </button> */}
          <h1 className={clsx('flex justify-center text-neutral-300  rounded-md self-center', {
            'hidden': reg === false,
          },
          )}>
            You dont have acoount please <span className=" mx-2 underline cursor-pointer text-neutral-500 hover:text-gray-400"><Link replace href="/register">Register</Link></span>
          </h1>
        </form>
        {/* <span className={clsx(
          'm-auto text-danger-400', {
          'hidden': userExist === true
        },
        )}>User NOT Found !</span> */}
      </div>
      {/* <Button onClick={GetUsers} >Gen JWT</Button> */}
      <BackgroundBeams />
      <ToastContainer pauseOnHover={false} autoClose={1000} theme="dark"/>
    </div >
  );
}
export default LoginPage

