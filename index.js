const tk = require('terminal-kit').terminal;

tk.saveCursor();
console.log('hello');
tk.restoreCursor();
console.log('there');