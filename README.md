# simple-readline
 
Easily enter data through the console. 

```js
    let {Readline} = require("easy-readline");

    let sr = new Readline();
    test();

    async function test() {
        console.log(await sr.input("text", "Doctor who?: "))
        console.log(await sr.input("secure", "password: "))
        sr.close()
    }
```