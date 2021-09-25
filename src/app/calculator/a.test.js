const rewire = require("rewire")
const a = rewire("./a")
const no = a.__get__("no")
// @ponicode
describe("no", () => {
    test("0", () => {
        let callFunction = () => {
            no("##ff00FF")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            no("rgb(0,100,200)")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            no("#AB00EF")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction = () => {
            no("#ff00fF")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction = () => {
            no("rgb(20%,10%,30%))")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction = () => {
            no("")
        }
    
        expect(callFunction).not.toThrow()
    })
})
