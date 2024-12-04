'use client'
import { useForm } from "react-hook-form";
import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddUser = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [data, setData] = useState("");
    const router = useRouter();

    const onSubmit = async (data) => {
        setData(data)
        await axios.post('http://localhost:8001/users', data);
        toast.success("User Added Successfully")
        router.replace("/dashboard/users")
        try {
        } catch (error) {
            toast.error(error.message)
        }
    }
    const back = () => {
        router.back();
    }
    return (
        <div className="bg-white m-auto p-3 rounded-lg shadow-md">
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-1 flex-col justify-evenly gap-3 p-3">
                <h1 className="font-semibold text-lg">Personal Information</h1>
                <hr class="border-[#a1a1a1]" />
                <div className="grid grid-cols-2 grid-rows-2 gap-6 max-md:grid-cols-1">
                    <div className="flex flex-col gap-2">
                        <p className="font-bold text-[12px]">First Name</p>
                        <input className="border-1 outline-none p-2 rounded-sm text-[12px]" placeholder="first name" {...register("name.firstname", { required: true })}
                            aria-invalid={errors.firstname ? "true" : "false"}
                        />
                        {errors.username?.type === "required" && (
                            <p className="text-red-600 text-[12px] font-bold" role="alert">please enter your first name</p>
                        )}
                    </div>
                    <div className="flex flex-col gap-2">
                        <p className="font-bold text-[12px]">Last Name</p>
                        <input className="border-1 outline-none p-2 rounded-sm text-[12px]" placeholder="last name" {...register("name.lastname", { required: true })}
                            aria-invalid={errors.lastname ? "true" : "false"}
                        />
                        {errors.username?.type === "required" && (
                            <p className="text-red-600 text-[12px] font-bold" role="alert">please enter your last name</p>
                        )}
                    </div>
                    <div className="flex flex-col gap-2">
                        <p className="font-bold text-[12px]">Email</p>
                        <input className="border-1 outline-none p-2 rounded-sm text-[12px]" placeholder="first name" {...register("email", { required: true })}
                            aria-invalid={errors.email ? "true" : "false"}
                        />
                        {errors.username?.type === "required" && (
                            <p className="text-red-600 text-[12px] font-bold" role="alert">please enter your email</p>
                        )}
                    </div>
                    <div className="flex flex-col gap-2">
                        <p className="font-bold text-[12px]">Password</p>
                        <input className="border-1 outline-none p-2 rounded-sm text-[12px]" placeholder="password" {...register("password", { required: true })}
                            aria-invalid={errors.password ? "true" : "false"}
                        />
                        {errors.username?.type === "required" && (
                            <p className="text-red-600 text-[12px] font-bold" role="alert">please enter your password</p>
                        )}
                    </div>
                    <div className="flex flex-col gap-2">
                        <p className="font-bold text-[12px]">User Name</p>
                        <input className="border-1 outline-none p-2 rounded-sm text-[12px]" placeholder="username" {...register("username", { required: true })}
                            aria-invalid={errors.username ? "true" : "false"}
                        />
                        {errors.username?.type === "required" && (
                            <p className="text-red-600 text-[12px] font-bold" role="alert">please enter your user name</p>
                        )}
                    </div>
                    <div className="flex flex-col gap-2">
                        <p className="font-bold text-[12px]">Phone</p>
                        <input className="border-1 outline-none p-2 rounded-sm text-[12px]" placeholder="phone" {...register("phone", { required: true })}
                            aria-invalid={errors.phone ? "true" : "false"}
                        />
                        {errors.username?.type === "required" && (
                            <p className="text-red-600 text-[12px] font-bold" role="alert">please enter your phone</p>
                        )}
                    </div>

                    {/* <div className="flex flex-col gap-2">
                        <p className="font-bold text-[12px]">Sex</p>


                        <select
                                className="border-1 outline-none p-2 rounded-sm text-sm"
                            >
                                <option value="true">man</option>
                                <option value="false">woman</option>
                            </select>
                        <input className="border-1 outline-none p-2 rounded-sm text-[12px]" placeholder="phone" {...register("phone", { required: true })}
                            aria-invalid={errors.phone ? "true" : "false"}
                        />
                        {errors.username?.type === "required" && (
                            <p className="text-red-600 text-[12px] font-bold" role="alert">please selecet your sex</p>
                        )}
                    </div> */}
                </div>
                <h1 className="font-semibold text-lg">Address</h1>
                <hr class="border-[#a1a1a1]" />
                <div className="grid grid-cols-2 grid-rows-2 gap-6">
                {/* <div className="flex flex-col gap-2">
                        <p className="font-bold text-[12px]">Contry</p>
                        <input className="border-1 outline-none p-2 rounded-sm text-[12px]" placeholder="contry" {...register("contry", { required: true })}
                            aria-invalid={errors.contry ? "true" : "false"}
                        />
                        {errors.username?.type === "required" && (
                            <p className="text-red-600 text-[12px] font-bold" role="alert">please your contry</p>
                        )}
                    </div> */}
                    <div className="flex flex-col gap-2">
                        <p className="font-bold text-[12px]">City</p>
                        <input className="border-1 outline-none p-2 rounded-sm text-[12px]" placeholder="city" {...register("city", { required: true })}
                            aria-invalid={errors.city ? "true" : "false"}
                        />
                        {errors.username?.type === "required" && (
                            <p className="text-red-600 text-[12px] font-bold" role="alert">please enter your city</p>
                        )}
                    </div>
                    <div className="flex flex-col w-full gap-2">
                    <p className="font-bold text-[12px]">Address</p>
                    <input className="border-1 outline-none p-2 rounded-sm text-[12px]" 
                    placeholder="address" {...register("address", { required: true })}
                    />
                    {errors.username?.type === "required" && (
                        <p className="text-red-600 text-[12px] font-bold" role="alert">please enter your address</p>
                    )}
                </div>
              
                    <div className="flex flex-col gap-2">
                        <p className="font-bold text-[12px]">Zip Code</p>
                        <input className="border-1 outline-none p-2 rounded-sm text-[12px]" placeholder="street" {...register("zipcode", { required: true })}
                            aria-invalid={errors.zipcode ? "true" : "false"}
                        />
                        {errors.username?.type === "required" && (
                            <p className="text-red-600 text-[12px] font-bold" role="alert">please enter your zip code</p>
                        )}
                    </div>
                  
                    <div className="flex flex-col gap-2">
                        <p className="font-bold text-[12px]">Number</p>
                        <input className="border-1 outline-none p-2 rounded-sm text-[12px]" placeholder="number" {...register("number", { required: true })}
                            aria-invalid={errors.number ? "true" : "false"}
                        />
                        {errors.username?.type === "required" && (
                            <p className="text-red-600 text-[12px] font-bold" role="alert">please enter number</p>
                        )}
                    </div>
                </div>
               
                <div className="flex flex-col mt-14 justify-center gap-3">
                    <Button type="submit" className="px-8 w-1/3 mx-auto border border-[#5D60EF] bg-white text-neutral-700" radius="sm" size="md" >
                        submit
                    </Button>
                    <Button className="px-8 w-1/3 mx-auto border border-[#E31233] bg-white text-neutral-700" radius="sm" onClick={back}>
                        cancel
                    </Button>
                </div>
            </form>
            <ToastContainer pauseOnHover={false} autoClose={1000} theme="dark" />
        </div>
    )
}
export default AddUser
