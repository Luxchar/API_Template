import { ErrorRouter } from "../errors/"
import { UserRouter } from "../users"

export const Intercept = { // Intercept the requests and responses and route them to the right function, this is the main router and all the other routers are children of this router
    ROOT: {
        path: "/",
        API: { // API ROUTES
            path: "api", // CLIENT SIDE ROUTES

            V1: { // Version 1 of the API
                path: "/v1",
                Users: UserRouter,
            },
    
        },
        
        // ERROR HANDLER OF WRONG ROUTES // PATH * ALWAYS AT THE END OF THE ROUTER OBJECT 
    
        Errors  : {
            path: "*",
            E404: ErrorRouter
        }
    }

}
