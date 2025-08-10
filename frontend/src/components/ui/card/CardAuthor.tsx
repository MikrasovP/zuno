export interface CardAuthorProps {
    author: {
        username: string;
        imageSrc?: string;
    };
}

export function CardAuthorImage({ imageSrc }: { imageSrc?: string }) {
    return (
        <img src={imageSrc || '/defaultAvatar.svg'} className="w-6 h-6 rounded-full" alt="Author" />
    );
}

export function CardAuthor({ author }: CardAuthorProps) {
    return (
        <div className="flex items-center gap-2 ml-auto">
            <CardAuthorImage imageSrc={author.imageSrc} />
            <span className="text-sm text-muted-foreground">{author.username}</span>
        </div>
    );
}

