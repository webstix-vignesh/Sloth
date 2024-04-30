1) To start the react and strapi server concurrently use the below cmd:
> npm start

2) To start the react server use the below cmd:
> cd frontend
> npm start
local host url: http://localhost:3000/

3) To start the strapi server use the below cmd:
> cd backend
> npm run develop
local host url: http://localhost:1337/admin/

4) To build the react, go to frontend folder by using cd,
> cd frontend
>npm run build

5) To build the strapi, go to backend folder by using cd,
> cd backend
>npm run build

6) If you want to deploy the both frontend and backend,
deploy the both build folders in Amazon s3 or vercel or netlify.
