export class AuthService {
  loggedIn = false;

  isAuthenticated(){
    const promisse = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.loggedIn)
      }, 800)
    })

    return promisse
  }

  login(){
    this.loggedIn = true
  }

  logout(){
    this.loggedIn = false
  }
}
