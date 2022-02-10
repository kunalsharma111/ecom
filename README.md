FrontEnd - client Folder
Angular Version - 12


Backend - Server Folder
Node js

DataBase - Mongo DB

Build The frontend
command -> ng build --prod
it will create dist folder in client folder just paste the content of dist/client folder to folder where you have set up the path of your frontend in your nginx file

Backend 
just move the server folder to your instance
and just run npm i inside the server folder
after that run node server.js to run your project.
if using pm2 
pm2 start node server.js
pm2 startup
pm2 save



Frontend Env Files 
Edit  - client/src/environments/enviornments.prod.ts
edit the value of apiUrl key -> "/api/ecom" or something like this if you are using nginx

Server Env File
Edit - server/config/config.json
edit the value of key MONGODB_URI -> add your mongodb uri link you can create that on mongo db atlas