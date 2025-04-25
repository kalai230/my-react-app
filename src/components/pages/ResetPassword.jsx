import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { ROUTE_PATH } from "../../Router/RoutePath";
const ResetPassword = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const emailParam = params.get("email");
    if (emailParam) {
      setEmail(emailParam);
    }
  }, [location.search]);

  const handleReset = (e) => {
    e.preventDefault();
    
  
    const user = JSON.parse(localStorage.getItem("user")) || [];


    const updatedUsers = 
       { ...user, password: newPassword }
   

    if (updatedUsers) {
      localStorage.setItem("user", JSON.stringify(updatedUsers));
      alert("Password reset successfully!");
      navigate(ROUTE_PATH.SIGNIN); 
    } else {
      alert("User not found!");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4">
      <h1 className="text-2xl font-bold">Reset Password</h1>
      <form onSubmit={handleReset} className="flex flex-col gap-3 w-80">
        <input
          type="password"
          placeholder="Enter new password"
          className="border p-2 rounded"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
        <button type="submit" className="bg-green-500 text-white p-2 rounded">
          Save New Password
        </button>
        <button type="submit" className="bg-green-500 text-white p-2 rounded" onClick={()=>navigate(-1)}>
          Go back
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
