
    import { useState } from "react";
    import emailjs from "emailjs-com";
    import { useNavigate } from "react-router-dom";
    import { ROUTE_PATH } from "../../Router/RoutePath";
    
    const ForgotPassword = () => {
      const [email, setEmail] = useState("");
      const [message, setMessage] = useState("");
      const navigate = useNavigate();
    
      const sendResetEmail = (e) => {
        e.preventDefault();
        const resetLink = `http://localhost:5173/reset-password?email=${encodeURIComponent(email)}`;

    
        emailjs
          .send(
            "service_bt5yewd",
            "template_ufri1cn", 
            {
              email,
              reset_link: resetLink,
            },
            "uh_hKIcfRNajX1nbe"
          )
          .then(
            () => {
              setMessage("Reset link sent! Check your email.");
            },
            (error) => {
              setMessage("Something went wrong: " + error.text);
            }
          );
      };
    
      return (
        <div className="min-h-screen flex flex-col items-center justify-center gap-4">
          <h1 className="text-2xl font-bold">Forgot Password</h1>

          <form onSubmit={sendResetEmail} className="flex flex-col gap-3 w-80">
            <input
              type="email"
              placeholder="Enter your registered email"
              className="border p-2 rounded"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit" className="bg-blue-500 text-white p-2 rounded">
              Send Reset Link
            </button>
            <button type="submit" className="bg-blue-500 text-white p-2 rounded" onClick={()=>navigate(-1)}>
              Go back
            </button>
          </form>
          {message && <p className="text-sm text-green-600">{message}</p>}
        </div>
      );
    };
    
   
    


export default ForgotPassword;