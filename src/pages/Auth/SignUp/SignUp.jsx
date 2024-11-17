import { useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { FaGithub, FaGoogle } from "react-icons/fa";
import useAuth from "@/hooks/useAuth";
import { axiosCommon } from "@/hooks/useAxiosCommon";
import toast from "react-hot-toast";


const SignUp = () => {
    const { createAccount, googleSignIn, githubSignIn } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [isSocialLogin, setIsSocialLogin] = useState(false); 

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();

    const onSubmit = async (data) => {
        setIsSocialLogin(false);
        const { name, email, password } = data;

        const userInfo = {
            name,
            email,
            password,
            createdAt: new Date().toISOString(),
            role: "general-user",
        };

        try {
            await createAccount(email, password);
            const res = await axiosCommon.post("/addUser", userInfo);

            if (res.data.insertedId) {
                reset(); // Reset the form
                navigate(location?.state?.from?.pathname || "/");
            }
        } catch (error) {
            console.error(error.message);
        }
    };

    const handleGoogleSignIn = async () => {
        setIsSocialLogin(true);
        try {
            const result = await googleSignIn();
            toast.success("Log In Successfully!");

            const userInfo = {
                email: result.user.email,
                userName: result.user.displayName,
                photoURL: result.user.photoURL,
                password: "",
                role: "general-user",
                createdAt: result.user.metadata.creationTime,
                lastLoginAt: result.user.metadata.lastSignInTime,
            };

            const res = await axiosCommon.post("/login", userInfo);
            if (res.status === 200 || res.status === 201) {
                navigate(location?.state?.from?.pathname || "/");
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    const handleGithubSignIn = async () => {
        setIsSocialLogin(true);
        try {
            const result = await githubSignIn();
            toast.success("Log In Successfully!");

            const userInfo = {
                email: result.user.email,
                userName: result.user.displayName,
                photoURL: result.user.photoURL,
                password: "",
                role: "general-user",
                createdAt: result.user.metadata.creationTime,
                lastLoginAt: result.user.metadata.lastSignInTime,
            };

            const res = await axiosCommon.post("/login", userInfo);
            if (res.status === 200 || res.status === 201) {
                navigate(location?.state?.from?.pathname || "/");
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center p-8">
            <h1 className="text-[2rem] text-center font-bold mb-4">Create Account</h1>
            <div className="social-icons flex gap-2 mb-4">
                <button
                    onClick={handleGoogleSignIn}
                    type="button"
                    className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border bg-white border-b-[#512da8] transition-all hover:bg-[#512da8] hover:text-white"
                >
                    <FaGoogle className="text-xl" />
                </button>
                <button
                    onClick={handleGithubSignIn}
                    type="button"
                    className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border bg-white border-b-[#512da8] transition-all hover:bg-[#512da8] hover:text-white"
                >
                    <FaGithub className="text-xl" />
                </button>
            </div>
            <span className="text-sm mb-4">or use your email to register</span>
            <>
                <input
                    type="text"
                    placeholder="Name"
                    {...register("name", { required: !isSocialLogin })}
                    className="bg-gray-200 border-none my-2 mx-0 py-2 px-4 text-sm rounded-lg w-full outline-none"
                />
                {errors.name && <p className="text-red-500 text-xs">Name is required</p>}
                <input
                    type="email"
                    placeholder="Email"
                    {...register("email", { required: !isSocialLogin })}
                    className="bg-gray-200 border-none my-2 mx-0 py-2 px-4 text-sm rounded-lg w-full outline-none"
                />
                {errors.email && <p className="text-red-500 text-xs">Email is required</p>}
                <input
                    type="password"
                    placeholder="Password"
                    {...register("password", { required: !isSocialLogin })}
                    className="bg-gray-200 border-none my-2 mx-0 py-2 px-4 text-sm rounded-lg w-full outline-none"
                />
                {errors.password && <p className="text-red-500 text-xs">Password is required</p>}
            </>
            <button
                type="submit"
                className="bg-[#512da8] text-white text-xs py-2 px-11 border border-transparent rounded-lg font-semibold tracking-wide uppercase mt-2 cursor-pointer"
            >
                Sign Up
            </button>
        </form>
    );
};

export default SignUp;
