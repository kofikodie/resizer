export interface JwtServiceInterface {
    signToken(userId: number): Promise<string>
}