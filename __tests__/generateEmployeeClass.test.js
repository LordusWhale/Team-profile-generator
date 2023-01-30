const { EmployeeGenerator } = require("../lib/employeeGenerator");
const inquirer = require('inquirer');
const { Engineer, Manager, Intern } = require("../lib/classes");


jest.mock('inquirer');

describe("Employee Generator", () => {
    it ("Should push a new engineer", async () => {
        const empGen = new EmployeeGenerator();
        inquirer.prompt = jest.fn().mockResolvedValue({name: "sam", email: 'some@example.com', github: "sam@sam.com", id: 1 });
        await empGen.generateEngineer()
        expect(empGen.getEmployees()[0]).toBeInstanceOf(Engineer)
    })
    it ("Should push a new Manager", async () => {
        const empGen = new EmployeeGenerator();
        inquirer.prompt = jest.fn().mockResolvedValue({name: "sam", email: 'some@example.com', github: "sam@sam.com", id: 1, officeNumber: 1 });
        await empGen.generateManager()
        expect(empGen.getManager()).toBeInstanceOf(Manager)
    })
    it ("Should push a new Intern", async () => {
        const empGen = new EmployeeGenerator();
        inquirer.prompt = jest.fn().mockResolvedValue({name: "sam", email: 'some@example.com', github: "sam@sam.com", id: 1, school: "school" });
        await empGen.generateIntern()
        expect(empGen.getEmployees()[0]).toBeInstanceOf(Intern)
    })
    it ("Should create a new employee with correct name", async () => {
        const name = "sam";
        const empGen = new EmployeeGenerator();
        inquirer.prompt = jest.fn().mockResolvedValue({name: name, email: 'some@example.com', github: "sam@sam.com", id: 1, school: "school" });
        await empGen.generateIntern()
        expect(empGen.getEmployees()[0].getName()).toBe(name)
    })
    it ("Should generate multiple employees", async() => {
        const empGen = new EmployeeGenerator();
        inquirer.prompt = jest.fn().mockResolvedValue({name: "sam", email: 'some@example.com', github: "sam@sam.com", id: 1, });
        await empGen.generateEngineer();
        await empGen.generateEngineer();
        await empGen.generateEngineer();
        expect(empGen.getEmployees().length).toBe(3)
    })
    it ("Should delete an employee", async () => {
        const empGen = new EmployeeGenerator();
        inquirer.prompt = jest.fn().mockResolvedValue({name: "sam", email: 'some@example.com', github: "sam@sam.com", id: 1 });
        await empGen.generateEngineer()
        expect(empGen.getEmployees().length).toBe(1);
        empGen.deleteEmp(1)
        expect(empGen.getEmployees().length).toBe(0)
    }) 
})