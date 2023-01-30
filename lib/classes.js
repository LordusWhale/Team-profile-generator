class Employee {
    name;
    id;
    email;
    constructor(name, id, email) {
      this.name = name;
      this.id = id;
      this.email = email;
    }
    getName() {
      return this.name;
    }
    getId() {
      return this.id;
    }
    getEmail() {
      return this.email;
    }
    getRole() {
      return "Employee"
    }
  }
  
  class Manager extends Employee {
    officeNumber;
    constructor(name, id, email, officeNumber) {
      super(name, id, email);
      this.officeNumber = officeNumber;
    }
    getGitHub() {
      return this.gitHub;
    }
    getOfficeNumber() {
      return this.officeNumber;
    }
    getRole() {
      return "Manager";
    }
  }
  
  class Engineer extends Employee {
    gitHub;
    constructor(name, id, email, gitHub) {
      super(name, id, email);
      this.gitHub = gitHub;
    }
    getGithub() {
      return this.gitHub;
    }
    getRole() {
      return "Engineer";
    }
  }
  class Intern extends Employee {
    school;
  
    constructor(name, id, email, school) {
      super(name, id, email);
      this.school = school;
    }
  
    getSchool() {
      return this.school;
    }
    getRole() {
      return "Intern";
    }
  }


  module.exports = {Manager, Engineer, Intern, Employee};