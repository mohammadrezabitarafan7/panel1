'use client'
import { useForm } from "react-hook-form";
import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddUser = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const router = useRouter();
    const onSubmit = async (data) => {
        try {
            const response = await axios.post('/api/user/add-user', {
                firstname: data.firstname,
                lastname: data.lastname,
                email: data.email,
                password: data.password,
                username: data.username,
                phone: data.phone,
                city: data.city,
                address: data.address,
                number: data.number,
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.status === 201) {
                toast.success("User Added Successfully");
                router.replace('/dashboard/users');
            } else {
                toast.error("Error: Admin not found");
            }

        } catch (error) {
            toast.error(`Error: ${error.response?.data?.message || error.message}`);
        }
    }

    const back = () => {
        router.back();
    }

    return (
        <div className="bg-white m-auto p-3 rounded-lg shadow-md">
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-1 flex-col justify-evenly gap-3 p-3">
                <h1 className="font-semibold text-lg">Personal Information</h1>
                <hr className="border-[#a1a1a1]" />
                <div className="grid grid-cols-2 grid-rows-2 gap-6 max-md:grid-cols-1">
                    <div className="flex flex-col gap-2">
                        <p className="font-bold text-[12px]">First Name</p>
                        <input className="border-1 outline-none p-2 rounded-sm text-[12px]" placeholder="first name" {...register("firstname", { required: true })} />
                        {errors.firstname?.type === "required" && (
                            <p className="text-red-600 text-[12px] font-bold">Please enter your first name</p>
                        )}
                    </div>
                    <div className="flex flex-col gap-2">
                        <p className="font-bold text-[12px]">Last Name</p>
                        <input className="border-1 outline-none p-2 rounded-sm text-[12px]" placeholder="last name" {...register("lastname", { required: true })} />
                        {errors.lastname?.type === "required" && (
                            <p className="text-red-600 text-[12px] font-bold">Please enter your last name</p>
                        )}
                    </div>
                    <div className="flex flex-col gap-2">
                        <p className="font-bold text-[12px]">Email</p>
                        <input className="border-1 outline-none p-2 rounded-sm text-[12px]" placeholder="email" {...register("email", { required: true, pattern: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/ })} />
                        {errors.email?.type === "required" && (
                            <p className="text-red-600 text-[12px] font-bold">Please enter your email</p>
                        )}
                        {errors.email?.type === "pattern" && (
                            <p className="text-red-600 text-[12px] font-bold">Invalid email format</p>
                        )}
                    </div>
                    <div className="flex flex-col gap-2">
                        <p className="font-bold text-[12px]">Password</p>
                        <input className="border-1 outline-none p-2 rounded-sm text-[12px]" placeholder="password" {...register("password", { required: true })} />
                        {errors.password?.type === "required" && (
                            <p className="text-red-600 text-[12px] font-bold">Please enter your password</p>
                        )}
                    </div>
                    <div className="flex flex-col gap-2">
                        <p className="font-bold text-[12px]">Username</p>
                        <input className="border-1 outline-none p-2 rounded-sm text-[12px]" placeholder="username" {...register("username", { required: true })} />
                        {errors.username?.type === "required" && (
                            <p className="text-red-600 text-[12px] font-bold">Please enter your username</p>
                        )}
                    </div>
                    <div className="flex flex-col gap-2">
                        <p className="font-bold text-[12px]">Phone</p>
                        <input className="border-1 outline-none p-2 rounded-sm text-[12px]" placeholder="phone" {...register("phone", { required: true })} />
                        {errors.phone?.type === "required" && (
                            <p className="text-red-600 text-[12px] font-bold">Please enter your phone number</p>
                        )}
                    </div>
                </div>

                <h1 className="font-semibold text-lg">Address</h1>
                <hr className="border-[#a1a1a1]" />
                <div className="grid grid-cols-2 grid-rows-2 gap-6">
                    <div className="flex flex-col gap-2">
                        <p className="font-bold text-[12px]">City</p>
                        <input className="border-1 outline-none p-2 rounded-sm text-[12px]" placeholder="city" {...register("city", { required: true })} />
                        {errors.city?.type === "required" && (
                            <p className="text-red-600 text-[12px] font-bold">Please enter your city</p>
                        )}
                    </div>
                    <div className="flex flex-col w-full gap-2">
                        <p className="font-bold text-[12px]">Address</p>
                        <input className="border-1 outline-none p-2 rounded-sm text-[12px]" placeholder="address" {...register("address", { required: true })} />
                        {errors.address?.type === "required" && (
                            <p className="text-red-600 text-[12px] font-bold">Please enter your address</p>
                        )}
                    </div>
                    <div className="flex flex-col gap-2">
                        <p className="font-bold text-[12px]">Zip Code</p>
                        <input className="border-1 outline-none p-2 rounded-sm text-[12px]" placeholder="zip code" {...register("zipcode", { required: true })} />
                        {errors.zipcode?.type === "required" && (
                            <p className="text-red-600 text-[12px] font-bold">Please enter your zip code</p>
                        )}
                    </div>
                    <div className="flex flex-col gap-2">
                        <p className="font-bold text-[12px]">Number</p>
                        <input className="border-1 outline-none p-2 rounded-sm text-[12px]" placeholder="number" {...register("number", { required: true })} />
                        {errors.number?.type === "required" && (
                            <p className="text-red-600 text-[12px] font-bold">Please enter number</p>
                        )}
                    </div>
                </div>

                <div className="flex flex-col mt-14 justify-center gap-3">
                    <Button type="submit" className="px-8 w-1/3 mx-auto border border-[#5D60EF] bg-white text-neutral-700" radius="sm" size="md">
                        Submit
                    </Button>
                    <Button className="px-8 w-1/3 mx-auto border border-[#E31233] bg-white text-neutral-700" radius="sm" onClick={back}>
                        Cancel
                    </Button>
                </div>
            </form>
            <ToastContainer pauseOnHover={false} autoClose={1000} theme="dark" />
        </div>
    );
};

export default AddUser;
