export type JwtServiceInterface = {
    signToken(userId: number): Promise<string>
}