// See https://kit.svelte.dev/docs/types#app
import type { UserWithCartAndPurchase } from "./stores/user";

// for information about these interfaces
declare global {
    namespace App {
        // interface Error {}
        interface Locals {
            user: UserWithCartAndPurchase
        }
        interface PageData {
            user: UserWithCartAndPurchase
        }
        // interface Platform {}
    }
}

export { };
