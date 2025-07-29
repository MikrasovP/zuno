import { useState } from "react";
import { useAuthState } from "@/context/AuthStateContext";
import PanelInput from "../PanelInput";
import SpinnerButtonComponent from "../SpinnerButtonComponent";
import { signup } from "@/api/AuthApi";

interface SignupFormProps {
  onSuccess?: () => void;
}

export default function SignupForm({ onSuccess }: SignupFormProps) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { setUser } = useAuthState();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    
    try {
      if (!username) {
        setError("Username is required.");
        return;
      }
      if (!email) {
        setError("Email is required.");
        return;
      }
      if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
        setError("Invalid email address.");
        return;
      }
      if (password.length < 6) {
        setError("Password must be at least 6 characters.");
        return;
      }
      if (password !== confirmPassword) {
        setError("Passwords do not match.");
        return;
      }
      
      const data = await signup(username, email, password);
      console.log(data);
      setUser(data.user);
      
      onSuccess?.();
    } catch (err) {
      setError("Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <PanelInput
          label="Username"
          type="text"
          value={username}
          onChange={e => setUsername(e.target.value)}
          autoFocus
        />
        <PanelInput
          label="Email"
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <PanelInput
          label="Password"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <PanelInput
          label="Confirm Password"
          type="password"
          value={confirmPassword}
          onChange={e => setConfirmPassword(e.target.value)}
        />
        {error && <div className="text-red-600 text-sm">{error}</div>}
        <SpinnerButtonComponent
          type="submit"
          isLoading={isLoading}
        >
          Sign Up
        </SpinnerButtonComponent>
      </form>
    </>
  );
} 