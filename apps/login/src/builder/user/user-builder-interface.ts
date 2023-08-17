import { User } from "../../repository/types";

export type UserBuilderInterface = {
    build(userData: any): User | null;
}