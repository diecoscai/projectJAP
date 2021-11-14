const rewire = require("rewire")
const cart = rewire("./cart")
const calcSubTotal = cart.__get__("calcSubTotal")
// @ponicode
describe("calcSubTotal", () => {
    test("0", () => {
        let result = calcSubTotal(0, 1)
        expect(result).toMatchSnapshot()
    })

    test("1", () => {
        let result = calcSubTotal(1, -5.48)
        expect(result).toMatchSnapshot()
    })

    test("2", () => {
        let result = calcSubTotal(-100, 100)
        expect(result).toMatchSnapshot()
    })

    test("3", () => {
        let result = calcSubTotal(-1, 1)
        expect(result).toMatchSnapshot()
    })

    test("4", () => {
        let result = calcSubTotal(-5.48, -100)
        expect(result).toMatchSnapshot()
    })

    test("5", () => {
        let result = calcSubTotal(-Infinity, -Infinity)
        expect(result).toMatchSnapshot()
    })
})
