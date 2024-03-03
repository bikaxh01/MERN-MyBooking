import { useForm } from "react-hook-form";
import {registerUser} from './register.api'

export type InputValidation = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};
function Register() {
  const { register, watch, handleSubmit, formState:{errors} } = useForm<InputValidation>();

  const onSubmit = handleSubmit((data) => {
    console.log(data);
    registerUser(data)
  });

  return (
    <form className=" flex flex-col gap-5" onSubmit={onSubmit}>
      <h2 className=" text-3xl font-bold">Create Account</h2>
      <div className=" flex flex-col md:flex-row gap-5">
        <label className=" font-bold text-gray-700 text-sm flex-1">
          First Name
          <input
            className=" border rounded w-full py-1 px-2 font-normal"
            {...register("firstName", { required: "This field is required" })}
          ></input>
          {errors.firstName && (
            <span className=" text-red-500">{errors.firstName?.message}</span>
          )}
        </label>
        <label className=" font-bold text-gray-700 text-sm flex-1">
          Last Name
          <input
            className=" border rounded w-full py-1 px-2 font-normal"
            {...register("lastName", { required: "This field is required" })}
          ></input>
          {errors.lastName && (
            <span className=" text-red-500">{errors.lastName?.message}</span>
          )}
        </label>
      </div>
      <div>
        <label className=" font-bold text-gray-700 text-sm flex-1">
          Email
          <input
            className=" border rounded w-full py-1 px-2 font-normal"
            type="email"
            {...register("email", { required: "This field is required" })}
          ></input>
          {errors.email && (
            <span className=" text-red-500">{errors.email?.message}</span>
          )}
        </label><br />
        <label className=" font-bold text-gray-700 text-sm flex-1">
          Password
          <input
            className=" border rounded w-full py-1 px-2 font-normal"
            type="password"
            {...register("password", {
              required: "This field is required",
              minLength: {
                value: 6,
                message: "Password must have 6 character",
              },
            })}
          ></input>
          {errors.password && (
            <span className=" text-red-500">{errors.password?.message}</span>
          )}
        </label><br />
        <label className=" font-bold text-gray-700 text-sm flex-1">
          Confirm password
          <input
            className=" border rounded w-full py-1 px-2 font-normal"
            type="password"
            {...register("confirmPassword", {
              validate: (value) => {
                if (!value) {
                  return "This field is required";
                } else if (watch("password") !== value) {
                  return "Password doesn't match";
                }
              },
            })}
          ></input>
          {errors.confirmPassword && (
            <span className=" text-red-500">{errors.confirmPassword?.message}</span>
          )}
        </label>
      </div>
      <span>
        <button className=" bg-blue-600 text-white p-2 font-bold hover:bg-blue-500 text-xl">
          Create Account
        </button>
      </span>
    </form>
  );
}

export default Register;
