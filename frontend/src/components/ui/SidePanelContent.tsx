import LoginForm from "./auth/LoginForm";
import SignupForm from "./auth/SignupForm";

interface SidePanelContentProps {
  content: 'login' | 'signup';
  onClose: () => void;
}

export default function SidePanelContent({ content, onClose }: SidePanelContentProps) {
  if (content === 'login') {
    return <LoginForm onSuccess={onClose} />;
  }

  if (content === 'signup') {
    return <SignupForm onSuccess={onClose} />;
  }

  return null;
} 