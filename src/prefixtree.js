import { PrefixTreeNode } from './prefixtreenode'

/**
 * PrefixTree Class creates a trie from an optional input
 * list of strings. It contains multiple methods including
 * inserting a new string, string lookup, and collecting all
 * strings starting with an optional prefix.
*/
class PrefixTree {
  constructor(strings = undefined) {
    // Root node of tree holding empty string
    this.root = new PrefixTreeNode('')

    // Total number of strings in tree
    this.stringCount = 0

    // Total number of nodes in tree (not including root)
    this.nodeCount = 0

    // Insert given strings into tree
    if (strings) {
      strings.forEach((string) => this.insert(string))
    }
  }


  /**
   * isEmpty() takes no arguments
   * The return value is `true` or `false` depending on
   * if the tree's `this.stringCount` is 0 or not
  */
  isEmpty() {
    if (this.stringCount === 0) {
      return true
    }
    return false
  }


  /**
   * contains() takes an input and returns `true` or
   * `false` depending on if the tree contains input
   * @param {string} [input] - required value to
   * check if tree contains that string
  */
  contains(input) {
    const node = this.findNode(input)[0]

    // Check if node is not `undefined` and that it is
    // the last node in its string
    if (node && node.terminal) {
      return true
    }

    return false
  }


  /**
   * insert() takes a string and places in the
   * tree in many individual nodes
   * @param {string} [input] - required value to
   * insert new string into tree
  */
  insert(input) {
    // check if string is in tree
    if (!this.contains(input)) {
      let node = this.root; // required semi-colon for spread operator
      [...input].forEach((char) => {
        if (!node.hasChild(char)) {
          // add char if not in tree
          node.addChild(char, new PrefixTreeNode(char))
          // Increment `this.nodeCount`
          this.nodeCount += 1
        }
        // get child node if/when in tree
        node = node.getChild(char)
      })
      // Increment `this.stringCount`
      this.stringCount += 1
      // Last char in loop
      node.terminal = true
    }
  }


  /**
   * findNode() returns a pair (node, depth) where node is the
   * deepest node in the tree that matches the input and depth
   * is that node's depth
   * @param {string} [input] - a required string to search for
   * in the prefix tree
  */
  findNode(input) {
    // Check with root and 0 string length
    if (input.length === 0) {
      return (this.root, 0)
    }

    let node = this.root
    let depth = 0; // required semicolon for spread operator

    // Check if each character in string is in tree
    [...input].forEach((char) => {
      // If character doesn't exist in tree
      if (!node.hasChild(char)) {
        return (undefined, depth)
      }

      // Move into child node
      node = node.getChild(char)

      // When the whole string is traversed
      // but the node is not terminal
      if (depth === input.length && !node.terminal) {
        return [node, depth]
      }

      // Increment depth
      depth += 1
    })

    return [node, depth]
  }


  /**
   * complete() returns a list of all strings in the tree starting
   * with an optional prefix
   * @param {string} [prefix] - an optional string to search for
   * in the prefix tree to begin the list of completions from
   * defaults to an empty string if no value is passed through
  */
  complete(prefix = '') {
    // When prefix is empty return strings()
    if (prefix === '') {
      return this.strings()
    }

    // Create a list to hold completions
    const completions = []
    // Find the node to begin with or get root
    const node = this.findNode(prefix)[0]
    // Traverse tree and push strings to completions
    if (!this.isEmpty() && node) {
      this.traverse(node, prefix, completions.push.bind(completions))
    }
    return completions
  }


  /**
   * strings() returns a list of all strings in the tree
   */
  strings() {
    const allStrings = []
    this.traverse(this.root, '', allStrings.push.bind(allStrings))
    return allStrings
  }


  /**
   * traverse() walks through the prefix tree in recursive
   * depth-first traversal starting at a given node
   * @param {PrefixTreeNode} [node] - required instantiation
   * of a PrefixTreeNode class that holds a node to traverse from
   * @param {string} [prefix] - a string that holds the given prefix
   * of where the tree traversal should begin
   * @param {method} [visit] - a required function for traverse()
   * to call when the method touches a node is traverses by
  */
  traverse(node, prefix, visit) {
    if (node.terminal) {
      visit(prefix)
    }

    const chars = Object.keys(node.children)
    chars.forEach((char) => {
      const child = node.getChild(char)
      this.traverse(child, prefix + char, visit)
    })
  }
}

module.exports.PrefixTree = PrefixTree
