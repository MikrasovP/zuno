import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "@/context/AuthStateContext";
import { createPost, CreatePostData } from "@/api/PostApi";
import { useDebounce } from "@/hooks/useDebounce";
import { useUnsavedChanges } from "@/hooks/useUnsavedChanges";
import PostEditor from "@/components/ui/post-editor/PostEditor";
import PostPreview from "@/components/ui/post-editor/PostPreview";
import ConfirmationDialog from "@/components/ui/ConfirmationDialog";
import SpinnerButtonComponent from "@/components/ui/SpinnerButtonComponent";

export default function CreatePostPage() {
    const navigate = useNavigate();
    const { user } = useAuthState();
    
    // Form state
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [content, setContent] = useState("");
    const [imageSrc, setImageSrc] = useState("");
    
    // UI state
    const [isPublishing, setIsPublishing] = useState(false);
    const [showCancelDialog, setShowCancelDialog] = useState(false);
    const [pendingNavigation, setPendingNavigation] = useState<string | null>(null);
    
    // Debounced values for preview
    const debouncedTitle = useDebounce(title, 300);
    const debouncedDescription = useDebounce(description, 300);
    const debouncedContent = useDebounce(content, 300);
    const debouncedImageSrc = useDebounce(imageSrc, 300);
    
    // Check if there are unsaved changes
    const hasUnsavedChanges = title.trim() || description.trim() || content.trim() || imageSrc.trim();
    
    // Handle navigation with unsaved changes
    const handleConfirmNavigation = useCallback(() => {
        setShowCancelDialog(true);
    }, []);
    
    const { handleNavigation } = useUnsavedChanges({
        hasUnsavedChanges: !!hasUnsavedChanges,
        onConfirmNavigation: handleConfirmNavigation,
    });
    
    // Handle cancel confirmation
    const handleCancelConfirm = useCallback(() => {
        if (pendingNavigation) {
            navigate(pendingNavigation);
        } else {
            navigate("/");
        }
    }, [navigate, pendingNavigation]);
    
    // Handle publish
    const handlePublish = async () => {
        if (!title.trim() || !description.trim() || !content.trim()) {
            alert("Please fill in all required fields (title, description, and content)");
            return;
        }
        
        if (!user) {
            alert("You must be logged in to create a post");
            return;
        }
        
        setIsPublishing(true);
        
        try {
            const postData: CreatePostData = {
                title: title.trim(),
                description: description.trim(),
                content: content.trim(),
                imageSrc: imageSrc.trim() || undefined,
            };
            
            const newPost = await createPost(postData);
            navigate(`/post/${newPost.id}`);
        } catch (error) {
            console.error("Failed to create post:", error);
            alert("Failed to create post. Please try again.");
        } finally {
            setIsPublishing(false);
        }
    };
    
    // Handle cancel
    const handleCancel = () => {
        if (hasUnsavedChanges) {
            setShowCancelDialog(true);
        } else {
            navigate("/");
        }
    };
    
    // Handle browser back button or other navigation attempts
    const handleNavigationAttempt = (to: string) => {
        if (hasUnsavedChanges) {
            setPendingNavigation(to);
            setShowCancelDialog(true);
        } else {
            navigate(to);
        }
    };
    
    if (!user) {
        return (
            <div className="text-center text-muted-foreground">
                Please log in to create a post
            </div>
        );
    }
    
    const author = {
        username: user.username,
        imageSrc: user.avatarUrl || "/defaultAvatar.svg",
    };
    
    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
            <div className="border-b border-border bg-background sticky top-0 z-10">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <h1 className="text-2xl font-bold text-foreground">Create New Post</h1>
                        <div className="flex space-x-3">
                            <button
                                onClick={handleCancel}
                                className="px-4 py-2 border border-border rounded-md bg-background text-foreground hover:bg-muted transition-colors"
                            >
                                Cancel
                            </button>
                            <SpinnerButtonComponent
                                onClick={handlePublish}
                                isLoading={isPublishing}
                                disabled={!title.trim() || !description.trim() || !content.trim()}
                                className="px-6 py-2"
                            >
                                Publish
                            </SpinnerButtonComponent>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Main Content */}
            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Editor Panel */}
                    <div className="space-y-6">
                        <h2 className="text-xl font-semibold text-foreground">Editor</h2>
                        <PostEditor
                            title={title}
                            description={description}
                            content={content}
                            imageSrc={imageSrc}
                            onTitleChange={setTitle}
                            onDescriptionChange={setDescription}
                            onContentChange={setContent}
                            onImageSrcChange={setImageSrc}
                        />
                    </div>
                    
                    {/* Preview Panel */}
                    <div className="space-y-6">
                        <h2 className="text-xl font-semibold text-foreground">Preview</h2>
                        <div className="border border-border rounded-lg p-6 bg-background min-h-[600px]">
                            {debouncedTitle || debouncedDescription || debouncedContent ? (
                                <PostPreview
                                    title={debouncedTitle}
                                    description={debouncedDescription}
                                    content={debouncedContent}
                                    imageSrc={debouncedImageSrc}
                                    author={author}
                                />
                            ) : (
                                <div className="text-center text-muted-foreground py-12">
                                    Start typing to see a preview of your post
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Confirmation Dialog */}
            <ConfirmationDialog
                isOpen={showCancelDialog}
                onClose={() => {
                    setShowCancelDialog(false);
                    setPendingNavigation(null);
                }}
                onConfirm={handleCancelConfirm}
                title="Discard Changes?"
                message="You have unsaved changes. Are you sure you want to leave? Your changes will be lost."
                confirmText="Discard"
                cancelText="Keep Editing"
            />
        </div>
    );
}
