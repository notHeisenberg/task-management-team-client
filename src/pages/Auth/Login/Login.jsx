import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { FaGithub, FaGoogle } from "react-icons/fa";
import useAuth from "@/hooks/useAuth";
import { axiosCommon } from "@/hooks/useAxiosCommon";
import toast from "react-hot-toast";


const Login = () => {
    const { user, logIn, googleSignIn, githubSignIn } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        const { email, password } = data;

        try {
            await logIn(email, password);
            toast.success("Log In Successfully!");
            navigate(location?.state?.from?.pathname || "/");
        } catch (error) {
            if (error.message.split("/")[1] === "invalid-credential).")
                toast.error("Invalid Credential");
        }
    };

    const handleGoogleSignIn = async () => {
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
            <h1 className="text-[2rem] text-center font-bold mb-4">Sign In</h1>
            <div className="social-icons flex flex-wrap gap-2 mb-4">
                <button
                    type="button"
                    onClick={handleGoogleSignIn}
                    className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border bg-white border-t-[#512da8] transition-all hover:bg-[#512da8] hover:text-white"
                >
                    <FaGoogle className="text-xl" />
                </button>
                <button
                    type="button"
                    onClick={handleGithubSignIn}
                    className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border bg-white border-t-[#512da8] transition-all hover:bg-[#512da8] hover:text-white"
                >
                    <FaGithub className="text-xl" />
                </button>
            </div>
            <span className="text-sm mb-4">or use your email to sign in</span>
            <input
                type="email"
                placeholder="Email"
                {...register("email", { required: "Email is required" })}
                className="bg-gray-200 border-none my-2 mx-0 py-2 px-4 text-sm rounded-lg w-full outline-none"
            />
            {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
            <input
                type="password"
                placeholder="Password"
                {...register("password", { required: "Password is required" })}
                className="bg-gray-200 border-none my-2 mx-0 py-2 px-4 text-sm rounded-lg w-full outline-none"
            />
            {errors.password && <p className="text-red-500 text-xs">{errors.password.message}</p>}
            <a href="#" className="text-xs mt-2 text-gray-600">Forgot your password?</a>
            <button type="submit" className="bg-[#512da8] text-white text-xs py-2 px-11 border border-transparent rounded-lg font-semibold tracking-wide uppercase mt-2 cursor-pointer">Sign In</button>
        </form>
    );
};

export default Login;