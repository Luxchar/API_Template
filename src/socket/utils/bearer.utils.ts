export function setBearer(bearer: string){
    return {
        headers: {
            Authorization: `Bearer ${bearer}`
        }
    }
}