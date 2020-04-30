export default class User {
  public ID: string = ''
  public displayName: string = ''
  public _created: Date | undefined
  public createdFormatted: string = ''
  public status: boolean = false

  constructor(id: string, displayName: string, created: Date, status: boolean) {
    this.ID = id
    this.displayName = displayName
    this.created = created
    this.status = status
  }

  set created(val: Date) {
    this._created = val
    this.createdFormatted = val.getFullYear() + '/' +
      ('00' + (val.getMonth() + 1)).slice(-2) + '/' +
      ('00' + val.getDate()).slice(-2) + ' ' +
      ('00' + val.getHours()).slice(-2) + ':' +
      ('00' + val.getMinutes()).slice(-2) + ':' +
      ('00' + val.getSeconds()).slice(-2)
  }

  public clone(): User {
    return new User(this.ID, this.displayName, this._created!, this.status);
  }
}
