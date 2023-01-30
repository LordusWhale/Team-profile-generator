const {Intern} =require('../lib/classes')



describe("Intern class", () => {
    it ("should return manager on getRole function", () => {
        const intern = new Intern("name", 123, "email@email.com", 123);
        expect(intern.getRole()).toEqual("Intern");
    })
    it("Should return the office id", () => {
        const school = "A school";
        const intern = new Intern("name", 123, "email@email.com", school);
        expect(intern.getSchool()).toEqual(school);
    })
})