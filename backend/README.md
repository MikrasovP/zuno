# Zuno-backend

Backend server for Zuno-frontend using Express.js and PostgreSQL

## Setup

```bash
npm install
node index.js
```

## Endpoints

### POST /register
Register a new user.
- Body: `{ "username": string, "password": string }`
- Returns: `{ "token": string }`

### POST /login
Login and receive a JWT.
- Body: `{ "username": string, "password": string }`
- Returns: `{ "token": string }`

### GET /feed
Get paginated list of posts (public, omits `content` field).
- Query: `?page=1&limit=10`
- Returns: `{ posts: Post[], page: number, limit: number }`

### GET /post/:id
Get a single post by id (public, includes all fields).
- Returns: `Post`

#### Post Model
```
{
  id: string,
  title: string,
  description: string,
  author: {
    username: string,
    imageSrc: string
  },
  publishedTimestamp: number,
  imageSrc?: string,
  content: string
}
``` 