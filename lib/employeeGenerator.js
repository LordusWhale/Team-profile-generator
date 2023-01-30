const { Manager, Engineer, Intern } = require("./classes");
const fetch = require('node-fetch')
const inquirer = require("inquirer");
function validateId() {
  let ids = [];
  function enterId(id) {
    ids.push(id);
  }
  function validateId(id) {
    return !ids.includes(id);
  }
  return { enterId, validateId };
}

async function validateGithub(user) {
  try {
    const res = await fetch(`https://api.github.com/users/${user}`);
    const data = await res.json();
    return data.login ? true : false;
  } catch (err) {
    return true;
  }
}

const idValidater = validateId();
const baseQuestions = [
  {
    name: "name",
    type: "input",
    message: "Enter name of employee",
    validate: (val) => val.trim() != "",
  },
  {
    name: "id",
    type: "input",
    message: "Enter Id of employee",
    validate: (val) => {
      if (!idValidater.validateId(val.trim())) {
        return "Id already taken";
      }
      idValidater.enterId(val);
      return true;
    },
  },
  {
    name: "email",
    type: "input",
    message: "Enter email of employee",
    validate: (val) => {
      if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(val)) {
        return "Not a valid email address";
      }
      return true;
    },
  },
];

const managerQuestions = [
  ...baseQuestions,
  {
    name: "office",
    type: "input",
    message: "Enter office number of employee",
    validate: (val) => val.trim() != "",
  },
];

const engineerQuestions = [
  ...baseQuestions,
  {
    name: "github",
    type: "input",
    message: "Enter github of employee",
    validate: async (val) => {
      if (val.trim() != "" && await validateGithub(val)) {
        return true
      }
      return "Not a valid github username";
    },
  },
];

const internQuestions = [
  ...baseQuestions,
  {
    name: "school",
    type: "input",
    message: "Enter school of employee",
    validate: val => val.trim() !== "",
  },
];

class EmployeeGenerator {
  constructor() {
    this.employees = [];
    this.manger = {};
  }
  async generateEngineer() {
    const answers = await inquirer.prompt(engineerQuestions);
    this.employees.push(
      new Engineer(answers.name, answers.id, answers.email, answers.github)
    );
  }
  async generateIntern() {
    const answers = await inquirer.prompt(internQuestions);
    this.employees.push(new Intern(answers.name, answers.id, answers.email));
  }
  async generateManager() {
    const manager = await inquirer.prompt(managerQuestions);
    this.manger = new Manager(
      manager.name,
      manager.id,
      manager.email,
      manager.office
    );
  }
  deleteEmp(id) {
    this.employees = this.employees.filter((emp) => {
      return emp.getId() !== id;
    });
  }
  getManager() {
    return this.manger;
  }
  getEmployees() {
    return this.employees;
  }
  getAllEmployees() {
    return { manager: this.manger, employees: this.employees };
  }
}
module.exports = { EmployeeGenerator };
