let name = 'henry leu'
let profile = {
  name: 'tom',
  gender: 'f'
}

function Profile (v) {
  this.name = v.name
  v.gender && (this.gender = v.gender)
}

Profile.prototype.sayHi = function () {
  console.log(this.name + ' says hi')
}

const tom = new Profile({ name: 'tom' })
tom.sayHi()

class Employee {
  constructor () {}
  sayHi () {}
}
