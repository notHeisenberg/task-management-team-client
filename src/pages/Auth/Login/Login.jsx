
const Login = () => {
    return (
        <form className="flex flex-col items-center p-8">
            <h1 className="text-[2rem] text-center font-bold mb-4">Sign In</h1>
            <div className="social-icons flex flex-wrap gap-2 mb-4">
                <a href="#" className="border border-gray-300 rounded-[20%] inline-flex justify-center items-center mx-1 w-10 h-10">
                    <i className="fab fa-google-plus-g"></i>
                </a>
                <a href="#" className="border border-gray-300 rounded-[20%] inline-flex justify-center items-center mx-1 w-10 h-10">
                    <i className="fab fa-github"></i>
                </a>
            </div>
            <span className="text-sm mb-4">or use your email to sign in</span>
            <input type="email" placeholder="Email" className="bg-gray-200 border-none my-2 mx-0 py-2 px-4 text-sm rounded-lg w-full outline-none" />
            <input type="password" placeholder="Password" className="bg-gray-200 border-none my-2 mx-0 py-2 px-4 text-sm rounded-lg w-full outline-none" />
            <a href="#" className="text-xs mt-2 text-gray-600">Forgot your password?</a>
            <button className="bg-[#512da8] text-white text-xs py-2 px-11 border border-transparent rounded-lg font-semibold tracking-wide uppercase mt-2 cursor-pointer">Sign In</button>
        </form>
    );
};

export default Login;
