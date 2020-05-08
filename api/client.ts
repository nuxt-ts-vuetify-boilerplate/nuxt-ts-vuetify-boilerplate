// mock
import {ServiceUserGetUserRequest, ServiceUserGetUserResponse} from "~/api/serviceUserGetUser";
import User from "~/scripts/model/User";

export default class Client {
  constructor(token?: string,
              commonHeaders?: {[key: string]: string},
              baseURL?: string,
              commonOptions?: {[key: string]: any}) {
  }

  async getUsers(
    param: ServiceUserGetUserRequest,
    headers?: { [key: string]: string },
    options?: { [key: string]: any }
  ): Promise<ServiceUserGetUserResponse> {
    return new Promise<ServiceUserGetUserResponse>((resolve, reject) => {
      setTimeout(() => {
        if (typeof options !== "undefined" && options['failed']) {
          reject();
        }

        const resp = new ServiceUserGetUserResponse();
        resp.users = [
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

        resolve(resp);
      }, 2000)
    });
  }
}
