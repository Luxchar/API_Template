export enum RATELIMIT {
    TIME = 60 * 1000 * 15, // 15 minutes
    MAX_REQUEST = 500, // 500 requests per 15 minutes
    STANDARD_REQUEST = 1, // True
    LEGACY_HEADERS = 1, // True
}