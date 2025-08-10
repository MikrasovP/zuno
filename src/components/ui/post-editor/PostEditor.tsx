import { ChangeEvent } from "react";

interface PostEditorProps {
    title: string;
    description: string;
    content: string;
    imageSrc: string;
    onTitleChange: (value: string) => void;
    onDescriptionChange: (value: string) => void;
    onContentChange: (value: string) => void;
    onImageSrcChange: (value: string) => void;
}

export default function PostEditor({
    title,
    description,
    content,
    imageSrc,
    onTitleChange,
    onDescriptionChange,
    onContentChange,
    onImageSrcChange,
}: PostEditorProps) {
    const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
        onTitleChange(e.target.value);
    };

    const handleDescriptionChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        onDescriptionChange(e.target.value);
    };

    const handleContentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        onContentChange(e.target.value);
    };

    const handleImageSrcChange = (e: ChangeEvent<HTMLInputElement>) => {
        onImageSrcChange(e.target.value);
    };

    return (
        <div className="space-y-6">
            <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                    Title
                </label>
                <input
                    type="text"
                    value={title}
                    onChange={handleTitleChange}
                    placeholder="Enter post title..."
                    className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                    Description
                </label>
                <textarea
                    value={description}
                    onChange={handleDescriptionChange}
                    placeholder="Enter post description..."
                    rows={3}
                    className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                    Image URL (optional)
                </label>
                <input
                    type="url"
                    value={imageSrc}
                    onChange={handleImageSrcChange}
                    placeholder="Enter image URL..."
                    className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                    Content (Markdown)
                </label>
                <textarea
                    value={content}
                    onChange={handleContentChange}
                    placeholder="Write your post content in Markdown..."
                    rows={15}
                    className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none font-mono text-sm"
                />
            </div>
        </div>
    );
}
