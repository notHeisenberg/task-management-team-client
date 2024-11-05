import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, NavLink, ScrollRestoration, useLocation, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import useAuth from "../../hooks/useAuth";
import useAxiosCommon from "../../hooks/useAxiosCommon";
import logo from "../../assets/logo.svg";
import background from "./../../assets/background5.jpg";
import { PropTypes } from 'prop-types';

const SignUp = () => {
  const { user, loading, createAccount, profileUpdate } = useAuth();
  const axios = useAxiosCommon();
  const navigate = useNavigate();
  const location = useLocation();
  const [viewPass, setViewPass] = useState(false);
  const [viewConfPass, setViewConfPass] = useState(false);

  const { register, handleSubmit, watch, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    const { first_name, last_name, username, mail, password } = data;
    const userInfo = {
      first_name,
      last_name,
      username,
      email: mail,
      password,
      createdAt: new Date().toISOString(),
      role: "general-user",
    };

    try {
      await createAccount(mail, password);
      await profileUpdate(username, null);
      const res = await axios.post("/addUser", userInfo);

      if (res.data.insertedId) {
        navigate(location?.state?.from?.pathname || "/room");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  if (loading) {
    return (
      <div className="fixed top-0 left-0 z-50 w-screen h-screen bg-black bg-opacity-50 flex items-center justify-center">
        <div className="loader"></div>
      </div>
    );
  }

  if (user) {
    navigate(location?.state?.from?.pathname || "/room");
  }

  return (
    <>
      <div
        className="min-h-full flex items-center justify-center p-4"
        style={{
          backgroundImage: `url(${background})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <ScrollRestoration />

        <div className="w-full max-w-lg rounded-xl p-8 space-y-6" style={{
          background: "rgba(0, 0, 0, 0.4)",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)"
        }}>
          <div className="flex flex-col items-center space-y-4">
            <NavLink to="/">
              <img className="w-40" src={logo} alt="logo" />
            </NavLink>
            <h2 className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-blue-500">
              Create An Account
            </h2>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              {["first_name", "last_name"].map((field) => (
                <div key={field}>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    {field === "first_name" ? "First Name" : "Last Name"}
                  </label>
                  <input
                    {...register(field, { required: "Required" })}
                    placeholder={field === "first_name" ? "First Name" : "Last Name"}
                    className="form-input w-full px-3 py-2 rounded-lg focus:outline-none"
                    style={{
                      backgroundColor: "rgba(255, 255, 255, 0.1)",
                      border: "1px solid rgba(255, 255, 255, 0.2)",
                      borderRadius: "0.5rem",
                      padding: "0.5rem 1rem",
                      color: "white",
                      outline: "none",
                      transition: "all 0.3s ease"
                    }}
                  />
                  {errors[field] && (
                    <p className="mt-1 text-pink-500 text-xs">
                      {errors[field].message}
                    </p>
                  )}
                </div>
              ))}
            </div>

            <InputField
              label="Username"
              name="username"
              register={register}
              errors={errors}
              requiredMessage="Username required"
            />
            <InputField
              label="Email"
              name="mail"
              register={register}
              errors={errors}
              requiredMessage="Email required"
              type="email"
            />

            <PasswordField
              label="Password"
              name="password"
              register={register}
              errors={errors}
              viewPassword={viewPass}
              toggleViewPassword={() => setViewPass(!viewPass)}
              pattern={{
                value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                message: "Must contain letter and number",
              }}
              minLength={{
                value: 8,
                message: "Min 8 characters",
              }}
            />
            <PasswordField
              label="Confirm Password"
              name="conf_password"
              register={register}
              errors={errors}
              viewPassword={viewConfPass}
              toggleViewPassword={() => setViewConfPass(!viewConfPass)}
              validate={(value) => value === watch("password") || "Passwords don't match"}
            />

            <CheckboxField
              label="I've read and accept the Privacy Policy"
              name="privacy"
              register={register}
              errors={errors}
              requiredMessage="Privacy Policy acceptance required"
            />

            <button
              type="submit"
              className="w-full px-4 py-2.5 rounded-lg bg-gradient-to-r from-pink-500 to-blue-500 text-white font-medium hover:opacity-90 transition-opacity"
            >
              Sign up
            </button>

            <p className="text-center text-sm text-gray-300">
              Already have an account?{" "}
              <Link to="/logIn" className="text-pink-500 hover:text-pink-400 font-medium">
                Sign in
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

const InputField = ({ label, name, register, errors, requiredMessage, type = "text" }) => (
  <div>
    <label className="block text-sm font-medium text-gray-300 mb-1">
      {label}
    </label>
    <input
      {...register(name, { required: requiredMessage })}
      type={type}
      placeholder={`Enter your ${label.toLowerCase()}`}
      className="form-input w-full px-3 py-2 rounded-lg focus:outline-none"
      style={{
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        border: "1px solid rgba(255, 255, 255, 0.2)",
        borderRadius: "0.5rem",
        padding: "0.5rem 1rem",
        color: "white",
        outline: "none",
        transition: "all 0.3s ease"
      }}
    />
    {errors[name] && (
      <p className="mt-1 text-pink-500 text-xs">
        {errors[name].message}
      </p>
    )}
  </div>
);

InputField.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  register: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  requiredMessage: PropTypes.string.isRequired,
  type: PropTypes.string,
};

const PasswordField = ({ label, name, register, errors, viewPassword, toggleViewPassword, ...rest }) => (
  <div>
    <label className="block text-sm font-medium text-gray-300 mb-1">
      {label}
    </label>
    <div className="relative">
      <input
        {...register(name, rest)}
        type={viewPassword ? "text" : "password"}
        placeholder={`Enter your ${label.toLowerCase()}`}
        className="form-input w-full pr-9 py-2 rounded-lg focus:outline-none"
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          borderRadius: "0.5rem",
          padding: "0.5rem 1rem",
          color: "white",
          outline: "none",
          transition: "all 0.3s ease"
        }}
      />
      <button
        type="button"
        onClick={toggleViewPassword}
        className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-200"
      >
        {viewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
      </button>
    </div>
    {errors[name] && (
      <p className="mt-1 text-pink-500 text-xs">
        {errors[name].message}
      </p>
    )}
  </div>
);

PasswordField.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  register: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  viewPassword: PropTypes.bool.isRequired,
  toggleViewPassword: PropTypes.func.isRequired,
};

const CheckboxField = ({ label, name, register, errors, requiredMessage }) => (
  <div className="flex items-center gap-2">
    <input
      type="checkbox"
      {...register(name, { required: requiredMessage })}
      className="form-input h-4 w-4 rounded"
      style={{
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        border: "1px solid rgba(255, 255, 255, 0.2)",
        borderRadius: "0.5rem",
        padding: "0.5rem 1rem",
        color: "white",
        outline: "none",
        transition: "all 0.3s ease"
      }}
    />
    <span className="text-sm text-gray-300">{label}</span>
    {errors[name] && (
      <p className="text-pink-500 text-xs">{errors[name].message}</p>
    )}
  </div>
);

CheckboxField.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  register: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  requiredMessage: PropTypes.string.isRequired,
};

export default SignUp;