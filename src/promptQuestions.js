var inquirer = require("inquirer");
const fs = require("fs");
const { generateHtml } = require("./generateHtml");
const { EmployeeGenerator } = require("../lib/employeeGenerator");

const employeeGenerator = new EmployeeGenerator();

async function generateFile(path, file) {
  try {
    await fs.promises.writeFile(path, file);
  } catch(err) {
    return console.log("An error occured")
  }

}


async function askTypeOfEmployees() {
  return await inquirer.prompt([
    {
      name: "type",
      message: "Type of employee",
      type: "list",
      choices: ["Engineer", "Intern"],
    },
  ]);
}

async function askDeleteEmp() {
  console.clear();
  let deletEmp = await inquirer.prompt([
    {
      name: "delete",
      message: "Select employee to delete",
      type: "list",
      choices: [
        ...employeeGenerator.getEmployees().map((emp) => {
          return { name: emp.getName(), value: emp.getId() };
        }),
        { name: "back", value: null },
      ],
    },
  ]);
  if (!deletEmp.delete) return;
  employeeGenerator.deleteEmp(deletEmp.delete);
}

async function enterMoreEmployees() {
  console.clear();
  const generateEmpQuestion = [
    {
      name: "more",
      message: "Enter more Employees?",
      type: "list",
      choices: ["Yes", "No"],
    },
  ];
  let continueQuestions = await inquirer.prompt(generateEmpQuestion);
  console.clear();
  while (continueQuestions.more !== "No") {
    let type = await askTypeOfEmployees();
    console.clear();
    if (type.type === "Engineer") await employeeGenerator.generateEngineer();
    else await employeeGenerator.generateIntern();
    console.clear();
    continueQuestions = await inquirer.prompt(generateEmpQuestion);
    console.clear();
  }
}

async function listEmployees() {
  console.clear();
  console.table([employeeGenerator.getManager(), ...employeeGenerator.getEmployees()])
  await inquirer.prompt([
    {
      name: "Go Back",
      type: "list",
      choices: [
        {name: "Go back"}
      ]
      
    }
  ])
}

async function showMenuOptions() {

  let menuQuestions =  {
    name: "menu",
    message: "Menu Options",
    type: "list",
    choices: [
      { name: "Add Employee", value: "add" },
      { name: "Remove Employee", value: "remove" },
      { name: "List Employees", value: "list" },
      { name: "Generate html", value: "finish" },
    ],
  }
  console.clear();
  let menuOption = await inquirer.prompt([
    menuQuestions
  ]);
  while (menuOption.menu !== "finish") {
    switch (menuOption.menu) {
      case "add":
        await enterMoreEmployees();
        break;
      case "remove":
        await askDeleteEmp();
        break;
      case "list":
        await listEmployees();
        break;
      case "finish": 
        break; 
    }
    console.clear()
    menuOption = await inquirer.prompt([
      menuQuestions
    ])
  }
  return employeeGenerator.getAllEmployees();;
}



async function start() {
  await employeeGenerator.generateManager();
  const {employees, manager} = await showMenuOptions();
  const htmlTemplate =  generateHtml(manager, employees);
  await generateFile("./dist/index.html", htmlTemplate);
}


module.exports = {start};
