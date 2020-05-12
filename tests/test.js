// import * as Autocompletion from '../esm/autocomplete.js'
const { Autocompletion } = require('../umd/autocomplete.js');

describe('Prefix tree', () => {
  describe('initializes', () => {
    test('without data', () => {
      expect(new Autocompletion()).toBeInstanceOf(Autocompletion)
    })
  })
})
