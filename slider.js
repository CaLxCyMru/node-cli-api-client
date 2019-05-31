const EventEmitter = require('events');
class Slider extends EventEmitter{
    constructor(current, maxValue, size = 50){
        super();
        this.terminal = require('terminal-kit').terminal;
        this.clear = require('readline').clearLine;

        this.current = current;
        this.maxValue = maxValue;
        // Learn proper options object pattern
        this.size = size;
                
        this.terminal.saveCursor();

        this.stdin = process.stdin;

        this.stdin.setRawMode(true);
        this.stdin.resume();
        this.stdin.setEncoding('utf8');

        this.keyPressHandler = key => {
            
            if (key == '\u001B\u005B\u0043') { // right
                this.current++;
            }
            if (key == '\u001B\u005B\u0044') { // left
                this.current--;
            }
            if (key == '\u001B\u005B\u0031\u003B\u0035\u0043') { // ctrl + right
                this.current += 10;
            }
            if (key == '\u001B\u005B\u0031\u003B\u0035\u0044') { // ctrl + left
                this.current -= 10;
            }
            if (key == '\u001B\u005B\u0031\u003B\u0032\u0043') { // shift + right
                this.current += 100;
            }
            if (key == '\u001B\u005B\u0031\u003B\u0032\u0044') { // shift + left
                this.current -= 100;
            }
            this.emit('changed', this.current);
            this.terminal.restoreCursor();
            this.render();
            
            if (key == '\u000D') { this.getValue(); }    // enter
            if (key == '\u0003') { // ctlr + c
                console.log();
                process.exit();
            }    
        }
        this.stdin.on('data', this.keyPressHandler);
        this.render();
    }
    
    actual(){
        let temp = Math.floor(this.current * this.size / this.maxValue);
        if (temp > this.size) return this.size;
        if (temp < 0) return 0;
        return temp;
    }

    render(){
        const color = require("cli-color");
        const slider = ['[', ']']
        const actual = this.actual()

        for (let i = 0; i < actual; i++) {
            slider.splice(slider.length - 1, 0, color.green('|'));
        }
        for (let i = actual; i < this.size; i++) {
            slider.splice(slider.length - 1, 0, color.blackBright('|'));
        }
        this.clear(process.stdout);
        process.stdout.write(`${slider.join('')} Value: ${this.current} `);
    }

    getValue(){
        this.emit('value', this.current);
        this.clear(process.stdout);
        this.terminal.restoreCursor();
        this.stdin.removeListener('data', this.keyPressHandler);
    }

}

module.exports = Slider;