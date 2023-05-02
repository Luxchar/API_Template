import express from "express"
import { RouteResponse, Status } from "../controller"

export const ErrorIntercept = {
    ERR404 : (_: any, response: express.Response | null): void => { // Error handler
        try {
            if(response != null) response.status(404)
            response == null ? new Error("Unauthorized function manipulation") : 
            response.json(
                new RouteResponse()
                    .setStatus(Status.error)
                    .setMessage("Unauthorized")
            )
        } catch (err) {
            console.error(err)
        }
    }
}