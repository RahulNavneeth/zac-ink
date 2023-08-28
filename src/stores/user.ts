import type { Cart, Item, Purchase, PurchaseItem, User } from "@prisma/client";
import { writable } from "svelte/store";

export type UserWithCartAndPurchase = User & { cart: Cart[] & { item: Item }, purchase: Purchase[] & { item: PurchaseItem[] & { item: Item } } };

export const user = writable<User | null>(null);
