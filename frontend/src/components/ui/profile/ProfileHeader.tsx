import { User } from "@/data/model/User";
import { updateProfile } from "@/api/AuthApi";
import EditableField from "./EditableField";

interface ProfileHeaderProps {
    user: User;
    onUserUpdate: (user: User) => void;
}

export default function ProfileHeader({ user, onUserUpdate }: ProfileHeaderProps) {
    const handleSaveUsername = async (username: string) => {
        const updatedUser = await updateProfile({ id: user.id, username });
        onUserUpdate(updatedUser);
    };

    const handleSaveBio = async (bio: string) => {
        const updatedUser = await updateProfile({ id: user.id, bio });
        onUserUpdate(updatedUser);
    };

    const handleSaveAvatarUrl = async (avatarUrl: string) => {
        const updatedUser = await updateProfile({ id: user.id, avatarUrl });
        onUserUpdate(updatedUser);
    };

    return (
        <div className="flex flex-col space-y-6 pb-8 border-b border-border">
            <div className="flex flex-col space-y-4 pl-8 md:pl-16 lg:pl-48 xl:pl-64">
                <img 
                    src={user.imageSrc || '/defaultAvatar.svg'} 
                    alt={`${user.username}'s avatar`}
                    className="w-24 h-24 rounded-full object-cover"
                />
                <div className="space-y-4 w-full max-w-md">
                    <EditableField
                        label="Username"
                        value={user.username}
                        onSave={handleSaveUsername}
                        placeholder="Enter username"
                    />
                    <EditableField
                        label="Bio"
                        value={user.bio || ''}
                        onSave={handleSaveBio}
                        placeholder="Tell us about yourself"
                    />
                    <EditableField
                        label="Avatar URL"
                        value={user.imageSrc || ''}
                        onSave={handleSaveAvatarUrl}
                        placeholder="Enter avatar image URL"
                        type="url"
                    />
                </div>
            </div>
        </div>
    );
} 