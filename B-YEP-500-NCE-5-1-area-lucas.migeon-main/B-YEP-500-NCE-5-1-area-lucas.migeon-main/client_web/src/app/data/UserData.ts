export class UserData {
  private userData = [
    {
      user_id: "auth0|fafasfafeazaqafsafae",
      name: "Hello",
      email: "jason.fabiano@free.fr",
      role: "plebs"
    },
    {
      user_id: "auth0|aarazrerareazdadqsda",
      name: "UwU",
      email: "lucas.migeon@gmail.com",
      role: "god"
    },
    {
      user_id: "auth0|dadafefzefzdadf",
      name: "YwY",
      email: "tom.bartoccioni@UwU.com",
      role: "god"
    }
  ]

  public getUserData() {
    return this.userData;
  }
}
