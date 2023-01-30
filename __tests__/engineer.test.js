const {Engineer} =require('../lib/classes')



describe("Engineer class", () => {
    it ("should return manager on getRole function", () => {
        const engineer = new Engineer("name", 123, "email@email.com", "github");
        expect(engineer.getRole()).toEqual("Engineer");
    })
    it("Should return correct github", () => {
        const  github= "github";
        const engineer = new Engineer("name", 123, "email@email.com", github);
        expect(engineer.getGithub()).toEqual(github);
    })
})