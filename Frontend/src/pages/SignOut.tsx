import { useMutation, useQueryClient } from "react-query";
import * as apirequest from "./api_request";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/app.context";

function SignOut() {
  let { showToast } = useAppContext();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const mutation = useMutation(apirequest.signOut, {
    onSuccess: async () => {
      await queryClient.invalidateQueries("validateToken");
      showToast({ message: "User Logged Out", type: "Success" });
      navigate("/");
    },
    onError: async (error: Error) => {
      console.log("Error occured");
      showToast({ message: "Error Occured", type: "Error" });
    },
  });
  const onClick = () => {
    mutation.mutate();
  };
  return (
    <div>
      <button
        onClick={onClick}
        className=" bg-blue-600 text-white p-2 font-bold hover:bg-blue-500 text-xl"
      >
        Sign Out
      </button>
    </div>
  );
}

export default SignOut;
