import { CreatedOn } from "../Decorators/CreatedOn";
import { ModifiedOn, updateModifiedOn } from "../Decorators/ModifiedOn";

export interface IUser {
  id: number;
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  phone: string;
  role: number;
  address: string;
}

@CreatedOn
@ModifiedOn
class User {
  @updateModifiedOn
  public firstName;
  public middleName;
  public lastName;
  public email;
  public phone;
  public role;
  public address;
  constructor(obj: IUser) {
    const { firstName, middleName, lastName, email, phone, role, address } =
      obj;
    this.firstName = firstName;
    this.middleName = middleName;
    this.lastName = lastName;
    this.email = email;
    this.phone = phone;
    this.role = role;
    this.address = address;
  }
}

export default User;
