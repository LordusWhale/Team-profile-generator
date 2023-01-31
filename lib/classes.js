// Emplyoee base class, could be changed to abstract if using typescript 
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
  // Overides getRole to employee and adds officenumber
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
    // Overides getRole to Engineer and adds github
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
      // Overides getRole to Intern and adds school
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