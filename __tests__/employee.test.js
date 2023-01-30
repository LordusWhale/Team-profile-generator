const {Employee} = require('../lib/classes')

describe('Employee class', () => {
    it("Should create an employee object", () => {
        const employee = new Employee("test", 123, "test@test.com");
        expect(typeof employee).toBe("object");
    })
    it ("Should return the correct name passed in the constructor", () => {
        const name = "name";
        const employee = new Employee(name, 123, "test@test.com");
        expect(employee.getName()).toEqual(name);
    }) 
    it ("Should return the correct id passed in the constructor", () => {
        const id = 123;
        const employee = new Employee("name", id, "test@test.com");
        expect(employee.getId()).toEqual(id);
    }) 
    it ("Should return the correct email passed in the constructor", () => {
        const email = "test@test.com";
        const employee = new Employee("name", 123, "test@test.com");
        expect(employee.getEmail()).toEqual(email);
    }) 
    it ("Should return the employee role", () => {
        const employee = new Employee("name", 123, "test@test.com");
        expect(employee.getRole()).toEqual("Employee")
    })
})