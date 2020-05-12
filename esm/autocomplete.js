const PrefixTree = require('./prefixtree.js');

class Autocompletion {
  constructor(entries = undefined, count = undefined, ignoreCasing = true) {
    // Access trie directly through `this.trie`
    this.trie = new PrefixTree();

    // Total count of strings inserted in trie
    this.entries = this.trie.stringCount;

    // Total count of all characters in trie
    this.entriesCharCount = this.trie.nodeCount;

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
