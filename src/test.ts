import {Readline} from "./index";

let sr = new Readline();
test();

async function test() {
    console.log(await sr.input("text", "Doctor who?: "))
    console.log(await sr.input("secure", "password: "))
    sr.close()
}