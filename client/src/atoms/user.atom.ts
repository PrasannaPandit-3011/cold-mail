import { atomWithStorage } from "jotai/utils";
import { AuthDataType } from "../types/user.type";

export const userAtom = atomWithStorage<AuthDataType>("user", null);
