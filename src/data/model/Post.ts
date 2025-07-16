export interface Post {
    id: string;
    title: string;
    description: string;
    author: {
        username: string;
        imageSrc: string;
    };
    publishedTimestamp: number;
    imageSrc?: string;
    content: string;
}

export const mockPosts: Post[] = [
    {
        id: '1',
        title: 'Post 1',
        description: 'This is the first post',
        author: { username: 'john_doe', imageSrc: '/defaultAvatar.svg' },
        publishedTimestamp: 1715769600,
        imageSrc: 'https://images.ctfassets.net/hrltx12pl8hq/28ECAQiPJZ78hxatLTa7Ts/2f695d869736ae3b0de3e56ceaca3958/free-nature-images.jpg?fit=fill&w=1200&h=630',
        content: '# Hello World\nThis is a test post with a markdown content\n\n## Subtitle\nThis is a subtitle',
    },
    {
        id: '2',
        title: 'Post 2. This is a very long title that should be truncated.',
        description: 'This is the second post. Trying to make it longer to see how it looks. And how it looks when it is longer than 100 characters.',
        author: { username: 'pavel_nekrasov', imageSrc: '/defaultAvatar.svg' },
        publishedTimestamp: 1715769600,
        imageSrc: 'https://capwn.org/wp-content/uploads/2021/10/qi-bin-w4hbafegiac-unsplash.jpg',
        content: `

# h1 Heading
## h2 Heading
### h3 Heading
#### h4 Heading
##### h5 Heading
###### h6 Heading


## Horizontal Rules

___

---

***


## Emphasis

**This is bold text**

__This is bold text__

*This is italic text*

_This is italic text_

~~Strikethrough~~


## Blockquotes


> Blockquotes can also be nested...
>> ...by using additional greater-than signs right next to each other...
> > > ...or with spaces between arrows.


## Lists

Unordered

+ Create a list by starting a line with \`+\`, \`-\`, or \`*\`
+ Sub-lists are made by indenting 2 spaces:
  - Marker character change forces new list start:
    * Ac tristique libero volutpat at
    + Facilisis in pretium nisl aliquet
    - Nulla volutpat aliquam velit
+ Very easy!

Ordered

1. Lorem ipsum dolor sit amet
2. Consectetur adipiscing elit
3. Integer molestie lorem at massa


1. You can use sequential numbers...
1. ...or keep all the numbers as \`1.\`

Start numbering with offset:

57. foo
1. bar


## Code

Inline \`code\`

Indented code

    // Some comments
    line 1 of code
    line 2 of code
    line 3 of code


Block code "fences"

\`\`\`
Sample text here...
\`\`\`

Syntax highlighting

\`\`\` ts
var foo = function (bar) {
  return bar++;
};

console.log(foo(5));
\`\`\`

## Tables

| Option | Description |
| ------ | ----------- |
| data   | path to data files to supply the data that will be passed into templates. |
| engine | engine to be used for processing templates. Handlebars is the default. |
| ext    | extension to be used for dest files. |

Right aligned columns

| Option | Description |
| ------:| -----------:|
| data   | path to data files to supply the data that will be passed into templates. |
| engine | engine to be used for processing templates. Handlebars is the default. |
| ext    | extension to be used for dest files. |


## Links

[link text](http://dev.nodeca.com)

[link with title](http://nodeca.github.io/pica/demo/ "title text!")

Autoconverted link https://github.com/nodeca/pica (enable linkify to see)


## Images

![Minion](https://octodex.github.com/images/minion.png)
![Stormtroopocat](https://octodex.github.com/images/stormtroopocat.jpg "The Stormtroopocat")

`,
    },
    {
        id: '3',
        title: 'Understanding React Server Components',
        description: 'A deep dive into React Server Components and how they change the way we build web apps.',
        author: { username: 'alice_dev', imageSrc: '/defaultAvatar.svg' },
        publishedTimestamp: 1715856000,
        imageSrc: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1200&q=80',
        content: `\n# React Server Components\n\nReact Server Components (RSC) are a new paradigm in React that allow you to render components on the server without sending their code to the client.\n\n## Key Benefits\n- Reduced bundle size\n- Improved performance\n- Seamless integration with existing React apps\n\n## Example Usage\n\n\`\`\`tsx\n// Server Component\nexport default function PostList() {\n  const posts = fetchPosts();\n  return <ul>{posts.map(p => <li key={p.id}>{p.title}</li>)}</ul>;\n}\n\`\`\`\n\n> "Server Components let you build modern, fast apps with less client-side JavaScript."\n\nLearn more at the [React docs](https://react.dev/reference/react-server-components).\n`,
    },
    {
        id: '4',
        title: 'The Rise of Generative AI: What Developers Need to Know',
        description: 'Explore the impact of generative AI on software development and how to get started with AI APIs.',
        author: { username: 'ai_guru', imageSrc: '/defaultAvatar.svg' },
        publishedTimestamp: 1715942400,
        imageSrc: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
        content: `\n# The Rise of Generative AI\n\nGenerative AI models like GPT-4 and Stable Diffusion are transforming the tech landscape.\n\n## Why It Matters\n- Automate content creation\n- Enhance user experiences\n- Build smarter applications\n\n## Getting Started\n1. Sign up for an AI API (e.g., OpenAI, Hugging Face)\n2. Read the docs and get your API key\n3. Start building!\n\n\`\`\`js\nfetch('https://api.openai.com/v1/completions', {\n  method: 'POST',\n  headers: { 'Authorization': 'Bearer YOUR_KEY' },\n  body: JSON.stringify({ prompt: 'Hello AI!', model: 'gpt-4' })\n});\n\`\`\`\n\n> "AI is not just the future, it’s the present."\n`,
    },
    {
        id: '5',
        title: 'Full Stack Development in 2024: Trends and Tools',
        description: 'A look at the latest trends, frameworks, and best practices for full stack developers in 2024.',
        author: { username: 'stack_master', imageSrc: '/defaultAvatar.svg' },
        publishedTimestamp: 1716028800,
        imageSrc: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=80',
        content: `\n# Full Stack Development in 2024\n\nStaying up-to-date as a full stack developer means learning new tools and best practices.\n\n## Popular Frameworks\n- **Frontend:** Next.js, SvelteKit, Astro\n- **Backend:** Node.js, Deno, Bun\n- **Databases:** PostgreSQL, MongoDB, PlanetScale\n\n## Best Practices\n- Use TypeScript everywhere\n- Automate testing and CI/CD\n- Prioritize accessibility and performance\n\n## Example Stack\n\n| Layer      | Technology   |\n| ---------- | ------------|\n| Frontend   | Next.js     |\n| Backend    | Node.js     |\n| Database   | PostgreSQL  |\n\n> "The best stack is the one that fits your team and project."\n`,
    },
];