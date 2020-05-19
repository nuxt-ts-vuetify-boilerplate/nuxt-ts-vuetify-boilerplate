// sample class
import User from "~/scripts/model/User";

export class ServiceUserGetUserRequest {
  public offset: number
  public maxItems: number
}

export class ServiceUserGetUserResponse {
  public users: Array<User>
}
