import * as readline from 'readline';
import { Writable } from 'stream';

export class Readline{
    private muted:boolean;
    private rl: readline.Interface;
    private body:string;
    constructor(){
        this.muted = false;
        this.rl = readline.createInterface({
            input: process.stdin,
            output: new Writable({
                write: function(chunk, encoding, callback) {
                    if (!this.muted) process.stdout.write(chunk, encoding);
                    else process.stdout.write(Buffer.from("\x1B[2K\x1B[200D"+this.body+"*".repeat(this.rl.line.length), "utf-8"), encoding);
                    callback();
                }.bind(this)
            }),
            terminal: true
        });
    }
    async input(type:"text"|"secure"|"many", body?:string){
        this.body = body ? body : "";
        if(type==="text"){
            return await new Promise(resolve => {
                this.rl.question(this.body, resolve);
            }) || "";
        } else if(type==="secure"){
            this.muted = true;
            return await new Promise(resolve => {
                this.rl.question(this.body, (answer)=>{
                    this.muted = false;
                    console.log();
                    resolve(answer);
                });
            }) || "";
        } else if(type==="many"){
            throw "Type many come soon";
        } else{
            throw "Unsupported type of input: "+type
        }
    }
    close(){
        this.rl.close()
    }
}