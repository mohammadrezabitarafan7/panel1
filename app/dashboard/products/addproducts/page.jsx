'use client'
import { useForm } from "react-hook-form";
import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddProducts = () => {
    const [category, setCategory] = useState([]);

    useEffect(() => {
        axios.get('/api/category/add-category ')
            .then(response => {
                setCategory(response.data);
                console.log(response.data)
            })
            .catch(error => {
                console.error('خطا در دریافت داده‌ها:', error);
            });
    }, []);



    const { register, handleSubmit, formState: { errors } } = useForm();
    const router = useRouter();
    const onSubmit = async (data) => {
        try {
            const response = await axios.post('/api/products/add-product', {
                title: data.title,
                price: data.price,
                count: data.count,
                discount: data.discount,
                status: data.status,
                category: data.category,
                amazing: data.amazing,
                image: data.image
            });
    
            if (response.status === 201) {
                toast.success("Product added successfully");
                router.replace("/dashboard/products")
            } else {
                toast.error("Error: " + response.status);
            }
        } catch (error) {
            if (error.response) {
                console.error('Error Response:', error.response);
                toast.error(`Server Error: ${error.response.status} - ${error.response.data.message}`);
            } else if (error.request) {
                console.error('Error Request:', error.request);
                toast.error("Error: No response from server");
            } else {
                console.error('Error Message:', error.message);
                toast.error(`Error: ${error.message}`);
            }
        }
    };
    

    const back = () => {
        router.back();
    }
    return (
        <div className="bg-white p-3 rounded-lg shadow-md">
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-1 flex-col justify-evenly gap-3 p-3">
                <h1 className="font-semibold text-lg">Add Product</h1>
                <hr class="border-[#a1a1a1]" />
                <div className=" flex flex-col gap-6">
                    {/* -----title----- */}
                    <div className="flex flex-col gap-2">
                        <p className="font-bold text-[12px]">Title</p>
                        <input className="border-1 outline-none p-2 rounded-sm text-[12px]" placeholder="title" {...register("title", { required: true })}
                            aria-invalid={errors.title ? "true" : "false"}
                        />
                        {errors.username?.type === "required" && (
                            <p className="text-red-600 text-[12px] font-bold" role="alert">please enter title</p>
                        )}
                    </div>
                    {/* -----price----- */}
                    <div className="flex flex-col gap-2">
                        <p className="font-bold text-[12px]">Price ($)</p>
                        <input type="number" min="0.00" max="10000.00" step="0.01" className="border-1 outline-none p-2 rounded-sm text-[12px]" placeholder="price" {...register("price", { required: true })}
                            aria-invalid={errors.price ? "true" : "false"}
                        />
                        {errors.username?.type === "required" && (
                            <p className="text-red-600 text-[12px] font-bold" role="alert">please enter price</p>
                        )}
                    </div>
                    {/* -----count----- */}
                    <div className="flex flex-col gap-2">
                        <p className="font-bold text-[12px]">count</p>
                        <input type="number" className="border-1 outline-none p-2 rounded-sm text-[12px]" placeholder="count" {...register("count", { required: true })}
                            aria-invalid={errors.price ? "true" : "false"}
                        />
                        {errors.username?.type === "required" && (
                            <p className="text-red-600 text-[12px] font-bold" role="alert">please enter price</p>
                        )}
                    </div>
                    {/* -----discount----- */}
                    <div className="flex flex-col gap-2">
                        <p className="font-bold text-[12px]">Discount (%)</p>
                        <input type="number" className="border-1 outline-none p-2 rounded-sm text-[12px]" placeholder="discount" {...register("discount", { required: false })}
                            aria-invalid={errors.discount ? "true" : "false"}
                        />
                    </div>
                    {/* -----status----- */}
                    <div className="flex flex-col gap-2">
                        <p className="font-bold text-[12px]">Status</p>
                        <select className="border-1 outline-none p-2 rounded-sm text-[12px]" {...register("status", { required: true })}>
                            <option value="Avalibake">Avalibale</option>
                            <option value="Hidden">Hidden</option>
                            <option value="Finished">Finished</option>
                            <option value="Unavailable">Unavailable</option>
                        </select>
                        {errors.status?.type === "required" && (
                            <p className="text-red-600 text-[12px] font-bold" role="alert">please select status</p>
                        )}
                    </div>
                    {/* -----category----- */}
                    <div className="flex flex-col gap-2">
                        <p className="font-bold text-[12px]">Category</p>
                        <select className="border-1 outline-none p-2 rounded-sm text-[12px]" {...register("category", { required: true })}>
                            {
                                category.map(i =>
                                    <option value={i.title}>{i.title}</option>
                                )
                            }
                        </select>
                        {errors.category?.type === "required" && (
                            <p className="text-red-600 text-[12px] font-bold" role="alert">please select your category</p>
                        )}
                    </div>
                    {/* -----Brand----- */}
                    {/* <div className="flex flex-col gap-2">
                        <p className="font-bold text-[12px]">Brand</p>
                        <select className="border-1 outline-none p-2 rounded-sm text-[12px]" {...register("category", { required: true })}>
                            <option value="Avalibake">Avalibale</option>
                            <option value="Hidden">Hidden</option>
                            <option value="Finished">Finished</option>
                            <option value="Unavailable">Unavailable</option>
                        </select>
                        {errors.username?.type === "required" && (
                            <p className="text-red-600 text-[12px] font-bold" role="alert">please enter your password</p>
                        )}
                    </div> */}
                    {/* -----Amazing ----- */}
                    <div className="flex flex-col gap-2">
                        <p className="font-bold text-[12px]">Amazing</p>
                        <select className="border-1 outline-none p-2 rounded-sm text-[12px]" {...register("amazing", { required: true })}>
                            <option value="true">Enable</option>
                            <option value="false">Disable</option>
                        </select>
                        {errors.username?.type === "required" && (
                            <p className="text-red-600 text-[12px] font-bold" role="alert">please select amazing</p>
                        )}
                    </div>
                    {/* -----Images ----- */}
                    <div className="flex flex-col gap-2">
                        <p className="font-bold text-[12px]">Image</p>
                        {/* <input type="file" className="border-1 outline-none p-2 rounded-sm text-[12px]" placeholder="price" {...register("image", { required: true })}
                            aria-invalid={errors.price ? "true" : "false"}
                        /> */}
                        <input className="border-1 outline-none p-2 rounded-sm text-[12px]"
                            placeholder="image link address" {...register("image", { required: true })}
                            aria-invalid={errors.price ? "true" : "false"}
                        />
                        {errors.username?.type === "required" && (
                            <p className="text-red-600 text-[12px] font-bold" role="alert">please chioce image</p>
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
export default AddProducts
