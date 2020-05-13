/**
 * PrefixTreeNode Class is used in the PrefixTree to
 * store each character and a dictionary of its child nodes.
*/
export default class PrefixTreeNode {
  constructor(character = undefined) {
    // Character that this node represents
    this.character = character
    // Object that holds characters and references to child nodes
    this.children = {}
    // Boolean if node is final character in string
    this.terminal = false
  }


  /**
   * isTerminal() takes no arguments
   * The return value is `true` or `false` depending
   * on the node's `this.terminal` boolean value
  */
  isTerminal() {
    return this.terminal
  }


  /**
   * childrenCount() takes no arguments
   * The return value is the total count of
   * nodes in the current node's `this.children`
  */
  childrenCount() {
    return Object.keys(this.children).length
  }


  /**
   * hasChild() returns a boolean value stating if the current
   * node has a specific character in its `this.children`
   * @param {string} [character] - required argument of which
   * character the method should search for
  */
  hasChild(character) {
    if (character in this.children) {
      return true
    }
    return false
  }


  /**
   * getChild() returns a node object if the current node has
   * a specific node in its `this.children` or raises an Error
   * if the child doesn't exist
   * @param {string} [character] - required argument of which
   * character the method should search for
  */
  getChild(character) {
    if (this.hasChild(character)) {
      return this.children[character]
    }

    // FIXME: "return Error()" may not be the best solution here
    return Error(`No child exists for character ${character}`)
  }


  /**
   * addChild() adds a given character and node as a child of
   * the current node or raises an Error if it already exists
   * @param {string} [character] - required argument of which
   * character the method should search for in `this.children`
   * @param {object} [childNode] - required argument of which
   * node should be added to `this.children`
  */
  addChild(character, childNode) {
    if (!this.hasChild(character)) {
      this.children[character] = childNode
    }

    // FIXME: "return Error()" may not be the best solution here
    return Error(`Child already exists for character ${character}`)
  }
}
