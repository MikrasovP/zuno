import { useAuthState } from "@/context/AuthStateContext";

export default function ProfilePage() {

    const authState = useAuthState();

    return <div>{JSON.stringify(authState.user) || 'No user'}</div>;
}