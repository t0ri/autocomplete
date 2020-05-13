/* eslint-disable */
const Autocompletion = require('../umd/autocomplete.js')
const PrefixTree = require('../umd/prefixtree.js')
const PrefixTreeNode = require('../umd/prefixtreenode.js')


describe('Prefix Tree', () => {
  describe('initializes', () => {
    test('without data', () => {
      tree = new PrefixTree()
      expect(tree).toBeInstanceOf(PrefixTree)
      expect(tree).toHaveProperty('root')
      expect(tree).toHaveProperty('stringCount', 0)
      expect(tree).toHaveProperty('nodeCount', 0)
      expect(tree.isEmpty()).toBe(true)
    })
    test('with data', () => {
      strings = ['testing', 'code', 'is', 'tedious']
      tree = new PrefixTree(strings)
      expect(tree).toBeInstanceOf(PrefixTree)
      expect(tree).toHaveProperty('root')
      expect(tree).toHaveProperty('stringCount', 4)
      expect(tree).toHaveProperty('nodeCount', 18)
      expect(tree.isEmpty()).toBe(false)
    })
  })

  describe('methods return correct values', () => {
    strings = ['testing', 'code', 'is', 'tedious']
    tree = new PrefixTree(strings)
    test('- complete', () => {
      expect(tree.complete()).toStrictEqual(['testing', 'tedious', 'code', 'is'])
      expect(tree.complete('t')).toStrictEqual(['testing', 'tedious'])
    })
    test('- findNode', () => {
      expect(tree.findNode('ted')[0]).toBeInstanceOf(PrefixTreeNode)
      expect(tree.findNode('ted')[1]).toEqual(3)
    })
  })
})

describe('Prefix Tree Node', () => {
  describe('initializes', () => {
    test('without data', () => {
      node = new PrefixTreeNode()
      expect(node).toBeInstanceOf(PrefixTreeNode)
      expect(node).toHaveProperty('character', undefined)
      expect(node).toHaveProperty('children', {})
      expect(node).toHaveProperty('terminal', false)
    })
    test('with data', () => {
      node = new PrefixTreeNode('a')
      expect(node).toBeInstanceOf(PrefixTreeNode)
      expect(node).toHaveProperty('character', 'a')
      node.addChild('c', new PrefixTreeNode('c'))
      expect(node).toHaveProperty('children')
      expect(node.children).toHaveProperty('c')
      expect(node).toHaveProperty('terminal', false)
    })
  })

  describe('methods return correct values', () => {
    strings = ['testing', 'code', 'is', 'tedious']
    tree = new PrefixTree(strings)
    terminalNode = tree.findNode('is')[0]
    nonTerminalNode = tree.findNode('te')[0]
    test('- isTerminal', () => {
      expect(terminalNode.isTerminal()).toBe(true)
      expect(nonTerminalNode.isTerminal()).toBe(false)
    })
    test('- childrenCount', () => {
      expect(terminalNode.childrenCount()).toBe(0)
      expect(nonTerminalNode.childrenCount()).toBe(2)
    })
    test('- getChild throws error', () => {
      expect( () => {
        nonTerminalNode.getChild('a')
      } ).toThrowError(new Error('No child exists for character a'))
    })
    test('- addChild throws error', () => {
      expect( () => {
        nonTerminalNode.addChild('s')
      } ).toThrowError(new Error('Child already exists for character s'))
    })
  })
})

describe('Autocomplete', () => {
  describe('initializes', () => {
    test('without data', () => {
      autocomplete = new Autocompletion()
      expect(autocomplete).toBeInstanceOf(Autocompletion)
      expect(autocomplete).toHaveProperty('entries', 0)
      expect(autocomplete).toHaveProperty('entriesCharCount', 0)
      expect(autocomplete).toHaveProperty('autocompleteCount', undefined)
      expect(autocomplete).toHaveProperty('ignoreCasing', true)
    })
    test('with data', () => {
      strings = ['testing', 'code', 'is', 'tedious']
      autocomplete = new Autocompletion(strings, 1, false)
      expect(autocomplete).toBeInstanceOf(Autocompletion)
      expect(autocomplete).toHaveProperty('entries', 4)
      expect(autocomplete).toHaveProperty('entriesCharCount', 18)
      expect(autocomplete).toHaveProperty('autocompleteCount', 1)
      expect(autocomplete).toHaveProperty('ignoreCasing', false)
    })
  })

  describe('methods return correct values', () => {
    describe('- autocomplete', () => {
      test('ignores casing', () => {
        strings = ['Testing', 'code', 'is', 'tedious']
        autocomplete = new Autocompletion(strings)
        expect(autocomplete.autocomplete('t')).toStrictEqual(['testing', 'tedious'])
        strings = ['Testing', 'code', 'is', 'tedious']
        autocomplete = new Autocompletion(strings, 2, false)
        expect(autocomplete.autocomplete('T')).toStrictEqual(['Testing'])
      })
      test('utilizes autocompleteCount', () => {
        strings = ['testing', 'code', 'is', 'tedious']
        autocomplete = new Autocompletion(strings, 1)
        expect(autocomplete.autocomplete('t')).toStrictEqual(['testing'])
      })
      test('adds default prefix', () => {
        strings = ['testing', 'code', 'is', 'tedious']
        autocomplete = new Autocompletion(strings)
        expect(autocomplete.autocomplete()).toStrictEqual(['testing', 'tedious', 'code', 'is'])
      })
    })
    
    describe('- addEntry', () => {
      test('checks for entry', () => {
        autocomplete = new Autocompletion()
        autocomplete.addEntry()
        expect(autocomplete.entries).toBe(0)
      })
    })

    describe('- addEntries', () => {
      test('checks for entries', () => {
        autocomplete = new Autocompletion()
        autocomplete.addEntries()
        expect(autocomplete.entries).toBe(0)
      })
      test('checks entries are strings', () => {
        autocomplete = new Autocompletion()
        autocomplete.addEntries(['hi', 2])
        expect(autocomplete.entries).toBe(1)
      })
    })
  })
})
