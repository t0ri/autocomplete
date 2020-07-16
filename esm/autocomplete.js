/**
 * PrefixTreeNode Class is used in the PrefixTree to
 * store each character and a dictionary of its child nodes.
*/
class PrefixTreeNode {
  constructor(character = undefined) {
    // Character that this node represents
    this.character = character;
    // Object that holds characters and references to child nodes
    this.children = {};
    // Boolean if node is final character in string
    this.terminal = false;
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

    throw new Error(`No child exists for character ${character}`)
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
      this.children[character] = childNode;
    } else {
      throw new Error(`Child already exists for character ${character}`)
    }
  }
}

/**
 * PrefixTree Class creates a trie from an optional input
 * list of strings. It contains multiple methods including
 * inserting a new string, string lookup, and collecting all
 * strings starting with an optional prefix.
*/
class PrefixTree {
  constructor(strings = undefined) {
    // Root node of tree holding empty string
    this.root = new PrefixTreeNode('');

    // Total number of strings in tree
    this.stringCount = 0;

    // Total number of nodes in tree (not including root)
    this.nodeCount = 0;

    // Insert given strings into tree
    if (strings) {
      strings.forEach((string) => this.insert(string));
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
    const node = this.findNode(input)[0];

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
          node.addChild(char, new PrefixTreeNode(char));
          // Increment `this.nodeCount`
          this.nodeCount += 1;
        }
        // get child node if/when in tree
        node = node.getChild(char);
      });
      // Increment `this.stringCount`
      this.stringCount += 1;
      // Last char in loop
      node.terminal = true;
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

    let node = this.root;
    let depth = 0; // required semicolon for spread operator

    // Check if each character in string is in tree
    [...input].forEach((char) => {
      // If character doesn't exist in tree
      if (!node.hasChild(char)) {
        return (depth)
      }

      // Move into child node
      node = node.getChild(char);

      // When the whole string is traversed
      // but the node is not terminal
      if (depth === input.length && !node.terminal) {
        return [node, depth]
      }

      // Increment depth
      depth += 1;
    });

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
    const completions = [];
    // Find the node to begin with or get root
    const node = this.findNode(prefix)[0];
    // Traverse tree and push strings to completions
    if (!this.isEmpty() && node) {
      this.traverse(node, prefix, completions.push.bind(completions));
    }
    return completions
  }


  /**
   * strings() returns a list of all strings in the tree
   */
  strings() {
    const allStrings = [];
    this.traverse(this.root, '', allStrings.push.bind(allStrings));
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
      visit(prefix);
    }

    const chars = Object.keys(node.children);
    chars.forEach((char) => {
      const child = node.getChild(char);
      this.traverse(child, prefix + char, visit);
    });
  }
}

class Autocompletion {
  constructor(entries = undefined, count = undefined, ignoreCasing = true) {
    // Access trie directly through `this.trie`
    this.trie = new PrefixTree();

    // Option to control how many strings are returned
    // when autocomplete() is called
    // Defaults to unlimited string count
    this.autocompleteCount = count;

    // Option to control if trie ignores casing of
    // characters when autocomplete() is called
    // Defaults to false if no option is passed
    this.ignoreCasing = ignoreCasing;

    // Insert entries to `this.trie`
    if (entries) { this.addEntries(entries); }
  }


  /**
   * @property Total count of strings inserted in trie
  */
  get entries() {
    return this.trie.stringCount
  }


  /**
   * @property Total count of all characters in trie
   */
  get entriesCharCount() {
    return this.trie.nodeCount
  }


  /**
   * autocomplete() takes an optional prefix to return
   * an autocompletion of that prefix.
   * The return value is a list of values from the trie,
   * its length depends on the optional control
   * `this.autocompleteCount`.
   * Without `this.autocompleteCount`, the method will
   * return all autocomplete strings.
   * @param {string} [prefix] - optional value to
   * return autocompletion based on
  */
  autocomplete(prefix = '') {
    // If `this.ignoreCasing` is true, update prefix to lowercase
    if (this.ignoreCasing) {
      prefix = prefix.toLowerCase();
    }

    // If no autocompleteCount is defined, return all
    if (!this.autocompleteCount) {
      return this.trie.complete(prefix)
    }

    return this.trie.complete(prefix).slice(0, this.autocompleteCount)
  }


  /**
   * addEntry() takes a required entry to add to trie.
   * @param {string} [entry] - required value to
   * insert into trie for autocompletion
  */
  addEntry(entry) {
    // If `this.ignoreCasing` is true, convert entry
    // to lowercase before insertion into trie
    if (entry) {
      if (this.ignoreCasing) {
        this.trie.insert(entry.toLowerCase());
      } else {
        this.trie.insert(entry);
      }
    }
  }


  /**
   * addEntries() takes a required list of string entries
   * to insert into trie for autocompletion using addEntry()
   * @param {string} [entries] - required value to
   * insert into trie for autocompletion
  */
  addEntries(entries) {
    // If `this.ignoreCasing` is true, convert all entries
    // to lowercase before insertion into trie
    if (entries) {
      if (this.ignoreCasing) {
        entries.forEach((entry) => {
          if (typeof entry === 'string') {
            this.addEntry(entry.toLowerCase());
          }
        });
      } else {
        entries.forEach((entry) => {
          this.addEntry(entry);
        });
      }
    }
  }
}

export default Autocompletion;
