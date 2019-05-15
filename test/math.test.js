const { calTip, fahrenheitToCelsius, celsuisToFarhrenhiet, add} = require('../src/math');
// 
//call test setup a new test
//creating test is like creating errors
//
// test('This should calculate Total with a Tip', () => {
//     const total = calTip(10);
//
//     //expect statement
//     expect(total).toBe(13)
// });
//
// test('This should convert Fahrenhiet to celsius', () => {
//     const degree = fahrenheitToCelsius(32);
//
//     //expect statement
//     expect(degree).toBe(0);
// });
//
// test(' This should convert Celsius to Fahrenhiet', () => {
//     const total = celsuisToFarhrenhiet(0);
//
//     //expect statement
//     expect(total).toBe(32);
// });

// test('Async Test Demo', (done) => {
//     setTimeout(() => {
//         expect(1).toBe(2)
//         done()
//     }, 2000)
// });

test('Better work', (done) => {
    add( 1, 9 ).then((sum) => {
        expect(sum).toBe(10)
        done()
    })
})

// test('Using async function', async () => {
//     const sum = await add(28, 10)
//     expect(sum).toBe(38)
// })