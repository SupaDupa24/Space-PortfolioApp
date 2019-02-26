# Space PortfolioApp
Space personal site that shows cool content about SpaceX missions and NASA's multimedia. New features are in progress.

<img src="/Screens/Safari Sapce App Screen.jpg"
     alt="Sapce app"
     style="float: left; margin-right: 10px;" />
     
## Techs under the hood 
This is a small fullstack JavaScript application I made to practice. It uses **React** in the front and connects through **Apollo** to a simple Express **GraphQl** middleware to request field specific data from NASA's and SpaceX rest APIs. Feel free to fork the project or test open graphiql endpoint to request data from both APIs (limited to 20 requests).

### Getting Starter
To begin working locally run the **dev** script. This will fire concurrently both the server and the client.
```sh

# Install dependencies (server & client)
npm install
cd client && npm install

# Run server & client (:3000 & :5000)
npm run dev
```
To deploy just run the start script and it will take care of everything. Optional scripts:
```sh
# Build for production (Builds into server ./public)
cd client && npm run build

# Graphiql - http://localhost:5000/graphql
```

## Models
You will find full model types in the *schema.js* file under ``/app``.

### Example
For example to request all SpaceX missions, the GraphQl query would look something like this:
``` js
lanzamientos {
      flight_number
      mission_name
      launch_date_local
      launch_success
    }
```

## What I practice 
- Apollo Client
- GraphQl Models
- GraphQl Queries
- React


