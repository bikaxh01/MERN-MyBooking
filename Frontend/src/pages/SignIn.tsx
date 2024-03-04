import React from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../pages/api_request.ts";
import { useAppContext } from "../context/app.context";
import { useNavigate } from "react-router-dom";

export type SignInFromData = {
  email: string;
  password: string;
};

function SignIn() {
   const queryClient= useQueryClient()
    const {showToast} = useAppContext()
    const navigate= useNavigate()
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<SignInFromData>();

  const mutation = useMutation(apiClient.signIn, {
    onSuccess: async () => {
        showToast({message:"Successfully logged In..!",type:"Success"});
        await queryClient.invalidateQueries("validateToken")
        navigate('/')
    },
    onError: async (error:Error) => {
        showToast({message:error.message,type:"Error"})
    },
  });

  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data);
    console.log(data);
  });

  return (
    <form className=" flex flex-col gap-5" onSubmit={onSubmit}>
      <h2 className=" text-3xl font-bold">Sign In </h2>
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
      </label>
      <br />
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
      </label>
      <br />
      <button className=" rounded-2xl bg-blue-600 text-white p-2 font-bold hover:bg-blue-500 text-xl">
        Sign In
      </button>
    </form>
  );
}

export default SignIn;
