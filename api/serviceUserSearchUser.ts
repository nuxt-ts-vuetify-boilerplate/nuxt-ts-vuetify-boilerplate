// sample class
import User from "~/scripts/model/User";

export class ServiceUserSearchUserRequest {
  public searchText: string = ""
}

export class ServiceUserSearchUserResponse {
  public users: Array<User> = []
}
