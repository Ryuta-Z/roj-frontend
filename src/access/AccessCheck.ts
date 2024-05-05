import Access from "./Access";
import User from "@/types/User";
export const checkAccess = (loginUser: User, access = Access.UN_LOGIN) => {
  const userAccess = loginUser.access;
  console.log(loginUser);
  if (access === Access.USER) {
    if (userAccess === Access.UN_LOGIN) return false;
  }

  if (access === Access.ADMIN) {
    if (userAccess !== Access.ADMIN) return false;
  }
  return true;
};
