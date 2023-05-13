const { exec } = require('node:child_process')
const prompt = require('prompt-sync')();
var latitude = prompt("What is your latitude? ");
var longitude = prompt("What is your longitude?s ");

exec(`node ./run.js website_1.txt all w de-DE lat${latitude} lon${longitude}`, (error, output) => {
    if (error) {
        console.error(error)
    }else{
        exec('node ./tests/example.spec.js h', (error, output) => {
            if (error) {
                console.error(error)
            }else{
                exec('node ./tests/example.spec.js s', (error, output) => {
                    if (error) {
                        console.error(error)
                    }else{
                        exec('node ./tests/comp.js alluris', (error, output) => {
                            if (error) {
                                console.error(error)
                            }else{
                                exec('node ./tests/checkNonce.js', (error, output) => {
                                    if (error) {
                                        console.error(error)
                                    }else{
                                        
                                    }
                                    console.log(output)
                                })
                            }
                            console.log(output)
                        })
                    }
                    console.log(output)
                })
            }
            console.log(output)
        })
    }
    //console.log(output)
})
