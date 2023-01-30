const {Manager} =require('../lib/classes')



describe("Manager class", () => {
    it ("should return manager on getRole function", () => {
        const manager = new Manager("name", 123, "email@email.com", 123);
        expect(manager.getRole()).toEqual("Manager");
    })
    it("Should return the office id", () => {
        const officeId = 999;
        const manager = new Manager("name", 123, "email@email.com", officeId);
        expect(manager.getOfficeNumber()).toEqual(officeId);
    })
})