'use client'
import axios from "axios";
import { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@nextui-org/button";
import { useRouter } from "next/navigation";
import BackgroundBeams from "../ui/background.jsx";
import { AuthContext } from "../context/auth-context/contaxt.js";
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
const Register = () => {


    const { register, handleSubmit, formState: { errors } } = useForm();
    const [loading, setLoading] = useState(false)
    const router = useRouter();

    const onSubmit = async (data) => {

        try {
            setLoading(true)
            if (data.code == 3321) {
                const response = await axios.post('/api/admins/register', {
                    phone: data.phone,
                    password: data.password,
                    username: data.username
                }, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                if (response.status == 201) {
                    router.replace('/');
                }
                else {
                    setLoading(false)
                    toast.error("Admin not Found")
                }
            }
            else {
                toast.error("Register Code Is Wrong")
                setLoading(false)
            }

        } catch (error) {
            setLoading(false)
        }
    }
    return (
        <div className="w-full flex justify-center items-center h-screen bg-neutral-950 flex-col ">
            <div className="w-1/3  rounded-xl bg-neutral-950 border border-neutral-800 p-8 flex flex-col z-10 max-md:w-full max-md:p-6" style={{ height: '320px' }}>
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-1  flex-col justify-evenly gap-5">
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
                    <input type="text" className="border-1 outline-none p-2 rounded-sm text-[12px]" placeholder="Username" {...register("username", { required: true })}
                        aria-invalid={errors.price ? "true" : "false"}
                    />
                    {errors.password?.type === "required" && (
                        <p className="text-red-600 text-[12px] " role="alert">please enter your username</p>
                    )}

                    <input type="number" className="border-1 outline-none p-2 rounded-sm text-[12px]" placeholder="code : 3321" {...register("code", { required: true })}
                        aria-invalid={errors.price ? "true" : "false"}
                    />
                    {errors.password?.type === "required" && (
                        <p className="text-red-600 text-[12px] " role="alert">please enter your code</p>
                    )}
                    <Button className="bg-blue-950 w-1/2 mx-auto text-white font-bold "
                        type="submit" radius="sm"
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
                        Register
                    </Button>
                </form>
            </div>
            <BackgroundBeams />
            <ToastContainer pauseOnHover={false} autoClose={1000} theme="dark" />
        </div >
    )
}
export default Register