// sample class
import User from "~/scripts/model/User";

export class ServiceUserGetUserRequest {
  public id: string = ""
}

export class ServiceUserGetUserResponse {
  public user!: User
}
