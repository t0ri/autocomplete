require('../autocomplete.mjs')

describe('Prefix tree', () => {
  describe('initializes', () => {
    test('without data', () => {
      expect(new Autocompletion()).toBeInstanceOf(Autocompletion)
    })
  })
})
