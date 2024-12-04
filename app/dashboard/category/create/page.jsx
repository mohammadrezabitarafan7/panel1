'use client'
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";
import { Button } from "@nextui-org/react";



const CreateCategory = () => {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const [data, setData] = useState("");

    const router = useRouter();


    const onSubmit = async (data) => {
        setData(data)
        const response = await axios.post('http://localhost:8001/category', data);

        alert("Category Added Successfully")
        router.back();

        try {

        } catch (error) {
            alert(error)
        }
    }

    const back = () => {
        router.back();
    }

    return (
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
    )
}
export default CreateCategory
