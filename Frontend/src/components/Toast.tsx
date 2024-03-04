import React, { useEffect } from "react";

type ToastProp = {
  message: string;
  type: "Success" | "Error";
  onClose: () => void;
};

function Toast({ message, type, onClose }: ToastProp) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
  },[onClose]);

  const style =
    type === "Success"
      ? "fixed top-4 right-4 z-50 p-4 rounded-md bg-green-400 tex-white max-w-md"
      : "fixed top-4 right-4 z-50 p-4 rounded-md bg-red-400 tex-white max-w-md";

  return (
    <div className={style}>
      <div className=" flex justify-center items-center">
        <span className=" text-lg font-semibold">{message}</span>
      </div>
    </div>
  );
}

export default Toast;
