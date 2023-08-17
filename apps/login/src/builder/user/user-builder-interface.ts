import { User } from "../../repository/types";

export interface UserBuilderInterface {
    build(userData: any): User | null;
}