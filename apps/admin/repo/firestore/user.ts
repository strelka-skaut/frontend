import { getDocs, collection, setDoc, doc, Timestamp } from "firebase/firestore"
import { db } from "repo/firebase"
import { Optional } from "utility-types"
import { getDocument } from "./docs"

export enum UserRole {
  Editor = "editor",
  Admin = "admin",
  SuperAdmin = "superadmin",
  None = "none",
}

export interface User {
  email: string
  image?: string
  name?: string
  lastLoggedIn?: string
  role: UserRole
  superadmin?: boolean
}

const collectionName = "users"

export const getUsersList = async (): Promise<User[]> => {
  const users = await getDocs(collection(db, collectionName))
  return users.docs.map((item) => {
    const data = item.data() as Omit<User, "email">
    return {
      email: item.id,
      ...data,
    }
  })
}

export const getUser = getDocument<User>(collectionName, "email")

export const setUser = async (user: Optional<User, "role" | "superadmin">) => {
  const { email, ...restData } = user
  if (!email) {
    throw new Error("No user email.")
  }
  await setDoc(
    doc(db, collectionName, email),
    {
      ...restData,
      lastLoggedIn: Timestamp.now(),
    },
    { merge: true }
  )
}
