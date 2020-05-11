// sample class
import User from "~/scripts/model/User";

export class ServiceUserGetUsersRequest {
  public offset: number = 0
  public maxItems: number = 0
}

export class ServiceUserGetUsersResponse {
  public users: Array<User> = []
}
