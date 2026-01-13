export type IJwt = {
    id?: string;
    sessionId?: string;
    exp?: number;
    iat?: number;
};

export type ResponseSessionPayload = { sessionInfo: IJwt };
