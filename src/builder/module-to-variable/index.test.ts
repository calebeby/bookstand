import moduleToVariable from '.'

test('moduleToVariable', () => {
  expect(
    moduleToVariable('asdf-function_name/blah.foo.bar'),
  ).toMatchInlineSnapshot(`"AsdfFunctionNameBlahFoo"`)
})
