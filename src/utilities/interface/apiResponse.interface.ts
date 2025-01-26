
export interface ApiSuccessResponse<responseData> {
    message?: string[];
    data: responseData;
    statusCode: number;
    jsonApiVersion: {
        version: string;
    }
}

export interface ApiErrorResponse {
    error: string;
    message: string[];
    statusCode: number;
    jsonApiVersion: {
        version: string;
    }
}