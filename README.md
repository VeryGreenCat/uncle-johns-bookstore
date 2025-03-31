This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Uncle John's Bookstore

Uncle John's Bookstore is an online bookstore website where users can browse and purchase books.

## Live Demo
[Visit the deployed version on Render](https://uncle-johns-bookstore.onrender.com/)

## Getting Started

### Prerequisites
- Docker installed

### Setup
```sh
git clone https://github.com/VeryGreenCat/uncle-johns-bookstore.git
cd uncle-johns-bookstore
```

## Running the Project with Docker
```sh
docker build -t uncle-johns-bookstore .
docker run -p 3000:3000 uncle-johns-bookstore
```

Then, open http://localhost:3000 with your browser to see the result.
You can start editing the page by modifying app/page.tsx. The page auto-updates as you edit the file.

## Technologies Used
* Next.js (App Router for frontend and backend)
* Prisma
* Supabase
* NextAuth
* Tailwind CSS
* Ant Design
* Docker

## Learn More
To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - Learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - An interactive Next.js tutorial.
- [Next.js GitHub repository](https://github.com/vercel/next.js) - Your feedback and contributions are welcome!

## Deploy on Render
Since this project is deployed on Render, you can also deploy it to Render using their platform.

Check out the [Render Documentation](https://render.com/docs) for more details.
