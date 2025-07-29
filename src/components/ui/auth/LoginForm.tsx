import { useState } from "react";
import { useAuthState } from "@/context/AuthStateContext";
import PanelInput from "../PanelInput";
import SpinnerButtonComponent from "../SpinnerButtonComponent";
import { login } from "@/api/AuthApi";

interface LoginFormProps {
  onSuccess?: () => void;
}

export default function LoginForm({ onSuccess }: LoginFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { setUser } = useAuthState();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    
    try {
      if (!email || !password) {
        setError("Email and password are required.");
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

      const data = await login(email, password);
      console.log(data);
      setUser(data.user);
      
      onSuccess?.();
    } catch (err) {
      setError("Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <h2 className="text-2xl font-bold mb-6 text-center">Sign In</h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <PanelInput
          label="Email"
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          autoFocus
        />
        <PanelInput
          label="Password"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        {error && <div className="text-red-600 text-sm">{error}</div>}
        <SpinnerButtonComponent
          type="submit"
          isLoading={isLoading}
        >
          Sign In
        </SpinnerButtonComponent>
      </form>
    </>
  );
} 