'use client'
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";
import { Button } from "@nextui-org/react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const CreateCategory = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const router = useRouter();
    const onSubmit = async (data) => {
        try {
            const response = await axios.post('/api/category/add-category', {
                title: data.title,
                description: data.description,
                status: data.status,
            });

            if (response.status === 200) {
                toast.success("Category added successfully");
                router.back();
            } else {
                toast.error("Error: " + response.status);
            }
        }
        catch (error) {
            toast.error("no");
        }
    }

    const back = () => {
        router.back();
    }

    return (
        <>
            <div className="bg-white p-3 rounded-lg shadow-md">
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-1 flex-col justify-evenly gap-3 p-3">
                    <h1 className="font-semibold text-lg">Add Category</h1>
                    <hr class="border-[#a1a1a1]" />

                    <div className="flex flex-col gap-6">
                        <div className="flex flex-col gap-2">
                            <p className="font-bold text-[12px]">Title</p>
                            <input className="border-1 outline-none p-2 rounded-sm text-[12px]" placeholder="category title" {...register("title", { required: true })}
                                aria-invalid={errors.firstname ? "true" : "false"}
                            />
                            {errors.username?.type === "required" && (
                                <p className="text-red-600 text-[12px] font-bold" role="alert">please enter your first name</p>
                            )}
                        </div>
                        <div className="flex flex-col gap-2">
                            <p className="font-bold text-[12px]">Description</p>
                            <input className="border-1 outline-none p-2 rounded-sm text-[12px]" placeholder="description " {...register("description", { required: false })}
                                aria-invalid={errors.lastname ? "true" : "false"}
                            />

                        </div>

                        <div className="flex flex-col gap-2">
                            <p className="font-bold text-[12px]">Status</p>
                            <select className="border-1 outline-none p-2 rounded-sm text-[12px]" {...register("status", { required: true })}>
                                <option value="Enable">Enable</option>
                                <option value="Disable">Disable</option>

                            </select>
                            {errors.username?.type === "required" && (
                                <p className="text-red-600 text-[12px] font-bold" role="alert">please enter your password</p>
                            )}
                        </div>
                    </div>
                    <div className="flex flex-col mt-14 justify-center gap-3">
                        <Button className="px-8 w-1/3 mx-auto border border-[#5D60EF] bg-white text-neutral-700" radius="sm" size="md" type="submit" >
                            submit
                        </Button>
                        <Button className="px-8 w-1/3 mx-auto border border-[#E31233] bg-white text-neutral-700" radius="sm" onClick={back}>
                            cancel
                        </Button>
                    </div>
                </form>
            </div>
            <ToastContainer pauseOnHover={false} autoClose={1000} theme="dark" />
        </>
    )
}
export default CreateCategory
