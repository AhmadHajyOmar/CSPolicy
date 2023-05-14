const { exec } = require('node:child_process')
const { spawn } = require('node:child_process')
const prompt = require('prompt-sync')();

var latitude = prompt("What is your latitude? ");
var longitude = prompt("What is your longitude? ");
var browser = "";
var accLanguage = "";
while(1){
    console.log("Choose one of the following browsers:")
    console.log("type c for chrom")
    console.log("type w for safari webkit")
    console.log("type f for firfox")
    browser = prompt("What is your browser? ");
    if(browser === 'c' || browser === 'w' || browser === 'f'){
        break;
    }
}
while(1){
    console.log("Choose one of the following browsers:")
    console.log("fr-CH, en-US, de-DE, ru-RU, en-GB, fr-FR, ar-EG, ar-IQ, ar-SA, nl-BE, hi-IN")
    accLanguage = prompt("What is your language? ")
    if(accLanguage === 'hi-IN' || accLanguage === 'nl-BE' || accLanguage === 'ar-SA' || accLanguage === 'ar-IQ' || accLanguage === 'ar-EG' || accLanguage === 'fr-CH' || accLanguage === 'en-US' || accLanguage === 'de-DE' || accLanguage === 'ru-RU' || accLanguage === 'en-GB' || accLanguage === 'fr-FR'){
        break;
    }
}


exec(`node ./run.js website_1.txt all ${browser} ${accLanguage} lat${latitude} lon${longitude}`, (error, stdout, stderr) => {
    if (error) {
        console.error(error)
        return;
    }
    console.log(stdout)
    exec('node ./tests/example.spec.js h', (error, stdout, stderr) => {
        if (error) {
            console.error(error)
            return;
        }
        console.log(stdout)
        exec('node ./tests/example.spec.js s', (error, stdout, stderr) => {
            if (error) {
                console.error(error)
                return;
            }
            console.log(stdout)
            exec('node ./tests/comp.js alluris', (error, stdout, stderr) => {
                if (error) {
                    console.error(error)
                    return;
                }
                console.log(stdout)
                exec('node ./tests/checkNonce.js', (error, stdout, stderr) => {
                    if (error) {
                        console.error(error)
                        return;
                    }
                    console.log(stdout)
                });
            });
        });
    });
});








/*
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
})*/