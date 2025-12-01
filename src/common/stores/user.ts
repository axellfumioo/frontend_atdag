import { Store } from "@tanstack/react-store";
import { UserStore } from "../model";

export const userStore = new Store<null | UserStore>(
    null
);

export const setUserStore = (user: UserStore) => {
    userStore.setState(user); 
}