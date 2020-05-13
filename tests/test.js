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
  })
})
