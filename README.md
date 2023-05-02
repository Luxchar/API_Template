# This is a template API made with NodeJS, Express and Typescript
This template was made with @ByLife

# Run the project
TO LAUNCH THE PROJECT RUN:

```require NodeJS version > 16.5```


to install all the dependencies
``` npm i ```
<br />
to run the project
``` npx nodemon ```

# Contributing
Check CONTRIBUTING.md before contributing to fully understand how to contribute to the project.

# Run the project
To compile the project just go the root of the project and type
``` tsc ```
the project will compile, you can find it in /compilation

# Organisation of the API

- id's are usually sent in the URL
- other params such as channel_name or server_name are in the body 
- token is a header (Authorization: Bearer token)

Request is usually: 
   - GET for small and non sensitive requests (get friends, get channels, get servers)
   - POST when you are sending a lot of data and/or is sensitive (login, register, create channel, create server)

/api/
-> /v1/ 
   -> /client/get/friends/:friend_id
   -> /channel/create/private/:friend_id
   -> /server/get/:server_id
   ...
