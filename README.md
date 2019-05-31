# Zapi CLI
This is a small project in which I made an effort to write cleaner and better code. It uses things i wasnt familiar with using yet, such as the events module as well as organizing my code into more separate files. This is the first project i made a lib/ for.
This project is a CLI for an API, `api.js` present in the project.

### Usage
`npm i -g` can be ran inside the root of the project to install it globally.
`zapi [command] [args]` is the syntax I'm using.

### Commands:
Currently there is no help command, though i have planned ahead for this and it will be implemented.

`zapi servo [-l]` will get the current servo value and render a CLI slider I've made for this project. Left and right arrow keys to increment and decrement. ctrl+arrow will add or sub 10 and shift+arrow will add/sub 100. Hit enter to post. The -l flag will enable live mode which will post at every change on the slider.

`zapi rgb` will change the color of the given hex value. Will add a more interesting way to change the color.
