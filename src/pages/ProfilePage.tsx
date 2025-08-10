import { AuthState, useAuthState } from "@/context/AuthStateContext";
import { useLoadState } from "@/context/LoadStateContext";
import { useEffect, useState } from "react";
import { PostPreview } from "@/data/model/PostPreview";
import { fetchPostsByUserId } from "@/api/PostApi";
import CardsList from "@/components/ui/list/CardsList";
import ProfileHeader from "@/components/ui/profile/ProfileHeader";
import { User } from "@/data/model/User";

export default function ProfilePage() {
    const { user, authState, onLogin, onLogout } = useAuthState();
    const [posts, setPosts] = useState<PostPreview[]>([]);
    const { setLoading } = useLoadState();

    useEffect(() => {
        if (!user) {
            setPosts([]);
            return;
        }

        setLoading(true);
        fetchPostsByUserId(user.id.toString())
            .then((data) => {
                setPosts(data);
            })
            .catch((error) => {
                console.error('Error fetching user posts:', error);
                setPosts([]);
            })
            .finally(() => setLoading(false));
    }, [user, setLoading]);

    const handleUserUpdate = (updatedUser: User) => {
        onLogin(updatedUser);
    };

    // Show loading state while auth is initializing
    if (authState === AuthState.INITIALIZING) {
        return (
            <div className="text-center text-muted-foreground">
                Loading...
            </div>
        );
    } else if (authState === AuthState.AUTHENTICATED && user) {
        return (
            <div className="space-y-8">
                <ProfileHeader user={user} onUserUpdate={handleUserUpdate} />
                <div>
                    <h2 className="text-2xl font-bold text-foreground mb-6">Posts</h2>
                    <CardsList posts={posts} />
                </div>
            </div>
        );
    } else {
        return (
            <div className="text-center text-muted-foreground">
                Please log in to view your profile
            </div>
        );
    }
}