// mock
import User from "~/scripts/model/User";
import {ServiceUserSearchUserRequest, ServiceUserSearchUserResponse} from "~/api/serviceUserSearchUser";
import {ServiceUserGetUsersRequest, ServiceUserGetUsersResponse} from "~/api/serviceUserGetUsers";
import {ServiceUserGetUserRequest, ServiceUserGetUserResponse} from "~/api/serviceUserGetUser";

export default class Client {
  private users: Array<User> = [
    new User('testID_1', 'test1', new Date(), true),
    new User('testID_2', 'test2', new Date(), true),
    new User('testID_3', 'test3', new Date(), true),
    new User('testID_4', 'hoge', new Date(), true),
    new User('testID_5', 'fuga', new Date(), true),
    new User('testID_6', 'hoge2', new Date(), true),
    new User('testID_7', 'fuga2', new Date(), true),
    new User('testID_8', 'aaa', new Date(), false),
    new User('testID_9', 'aaaa', new Date(), false),
    new User('testID_A', 'bbb', new Date(), false),
    new User('testID_B', 'bbbbb', new Date(), false),
    new User('testID_C', 'xxxx', new Date(), false),
  ]

  constructor(token?: string,
              commonHeaders?: { [key: string]: string },
              baseURL?: string,
              commonOptions?: { [key: string]: any }) {
  }

  async getUsers(
    param: ServiceUserGetUsersRequest,
    headers?: { [key: string]: string },
    options?: { [key: string]: any }
  ): Promise<ServiceUserGetUsersResponse> {
    return new Promise<ServiceUserGetUsersResponse>((resolve, reject) => {
      setTimeout(() => {
        if (typeof options !== "undefined" && options['failed']) {
          reject()
        }

        const resp = new ServiceUserGetUsersResponse()
        resp.users = this.users.slice(param.offset, param.offset + param.maxItems)

        resolve(resp)
      }, 2000)
    });
  }

  async getUser(
    param: ServiceUserGetUserRequest,
    headers?: { [key: string]: string },
    options?: { [key: string]: any }
  ): Promise<ServiceUserGetUserResponse> {
    return new Promise<ServiceUserGetUserResponse>((resolve, reject) => {
      setTimeout(() => {
        if (typeof options !== "undefined" && options['failed']) {
          reject()
        }

        const resp = new ServiceUserGetUserResponse()
        this.users.some((u: User) => {
          if (u.ID === param.id) {
            resp.user = u
            return true
          }
          return false
        })


        resolve(resp)
      }, 2000)
    });
  }


  async searchUsers(
    param: ServiceUserSearchUserRequest,
    headers?: { [key: string]: string },
    options?: { [key: string]: any }
  ): Promise<ServiceUserSearchUserResponse> {
    return new Promise<ServiceUserSearchUserResponse>((resolve, reject) => {
      setTimeout(() => {
        if (typeof options !== "undefined" && options['failed']) {
          reject()
        }

        const resp = new ServiceUserSearchUserResponse()
        resp.users = this.users.filter((u: User) => {
          return u.displayName.indexOf(param.searchText) !== -1 || u.ID == param.searchText
        })
        console.log(resp)

        resolve(resp)
      }, 2000)
    });
  }
}
