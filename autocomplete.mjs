import PrefixTree from './prefixtree.mjs'

export default class Autocompletion {
  constructor(input = undefined, count = undefined) {
    // Access trie directly through `this.trie`
    this.trie = new PrefixTree(input)

    // Total count of strings inserted in trie
    this.entries = this.trie.stringCount

    // Total count of all characters in trie
    this.entriesCharCount = this.trie.nodeCount

    // Option to control how many strings are returned
    // when autocomplete() is called
    this.autocompleteCount = count
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
  autocomplete(prefix) {
    // Set prefix to '' if no prefix passed in
    if (prefix === undefined) {
      prefix = ''
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
    if (entry) {
      this.trie.insert(entry)
    }
  }


  /**
   * addEntries() takes a required list of string entries
   * to insert into trie for autocompletion using addEntry()
   * @param {string} [entries] - required value to
   * insert into trie for autocompletion
  */
  addEntries(entries) {
    entries.forEach((entry) => {
      this.addEntry(entry)
    })
  }
}
