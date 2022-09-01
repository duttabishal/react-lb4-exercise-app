export interface IUser {
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  phone: string;
  role: number;
  address: string;
  createdOn: Date;
  editedOn: Date;
}

class User {
  public firstName;
  public middleName;
  public lastName;
  public email;
  public phone;
  public role;
  public address;
  public createdOn;
  public editedOn;
  constructor(obj: IUser) {
    const {
      firstName,
      middleName,
      lastName,
      email,
      phone,
      role,
      address,
      createdOn,
      editedOn,
    } = obj;
    this.firstName = firstName;
    this.middleName = middleName;
    this.lastName = lastName;
    this.email = email;
    this.phone = phone;
    this.role = role;
    this.address = address;
    this.createdOn = createdOn;
    this.editedOn = editedOn;
  }
}

export default User;
