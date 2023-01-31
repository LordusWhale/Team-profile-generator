var inquirer = require("inquirer");
const fs = require("fs");
const { generateHtml } = require("./generateHtml");
const { EmployeeGenerator } = require("../lib/employeeGenerator");

// New instance of employee generator to easily create and get generated employees

const employeeGenerator = new EmployeeGenerator();

// Function to create html file with template 

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

// Promts user to select employee to delete then uses employeeGenerator to remove employee

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

// Continuous loop to prompt user to enter more employees until they select "No"

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
    // Generating employees based on answered prompts
    if (type.type === "Engineer") await employeeGenerator.generateEngineer();
    else await employeeGenerator.generateIntern();
    console.clear();
    continueQuestions = await inquirer.prompt(generateEmpQuestion);
    console.clear();
  }
}
// Using console.table to display created employees
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
// Menu options: Continuous loop until user selects to generate html file then returns all 
// generated employees
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

// Initialising function

async function start() {
  await employeeGenerator.generateManager();
  const {employees, manager} = await showMenuOptions();
  const htmlTemplate =  generateHtml(manager, employees);
  await generateFile("./dist/index.html", htmlTemplate);
}


module.exports = {start};
