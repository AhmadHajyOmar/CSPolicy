const { exec } = require('node:child_process')
const { spawn } = require('node:child_process')
const prompt = require('prompt-sync')();

var latitude = prompt("What is your latitude? ");
var longitude = prompt("What is your longitude? ");
var browser = "";
var accLanguage = "";
var uaOption = "";
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
    console.log("Choose one of the following accept languages:")
    console.log("fr-CH, en-US, de-DE, ru-RU, en-GB, fr-FR, ar-EG, ar-IQ, ar-SA, nl-BE, hi-IN, ab-YZ(not supported accept language), AR;q=10  (mal-formed accept language)")
    accLanguage = prompt("What is your language? ")
    if(accLanguage === 'hi-IN' || accLanguage === 'nl-BE' || accLanguage === 'ar-SA' || accLanguage === 'ar-IQ' || accLanguage === 'ar-EG' || accLanguage === 'fr-CH' || accLanguage === 'en-US' || accLanguage === 'de-DE' || accLanguage === 'ru-RU' || accLanguage === 'en-GB' || accLanguage === 'fr-FR' || accLanguage === 'ab-YZ'
    || accLanguage === 'AR;q=10' ){
        break;
    }
}
while(1){
    console.log("Choose one of the following option:")
    console.log("1: existed ua")
    console.log("2: not existed ua")
    console.log("3: mal-formed ua")

    uaOption = prompt("What is your choice? ")
    if(uaOption === '1' || uaOption === '2' || uaOption === '3'){
        break;
    }
}

exec(`node ./run.js website_1.txt all ${browser} ${accLanguage} lat${latitude} lon${longitude} uaOption${uaOption}`,{maxBuffer: undefined}, (error, stdout, stderr) => {
    if (error) {
        console.error(error)
        return;
    }
    console.log(stdout)
    exec('node ./tests/example.spec.js h',{maxBuffer: undefined}, (error, stdout, stderr) => {
        if (error) {
            console.error(error)
            return;
        }
        console.log(stdout)
        exec('node ./tests/example.spec.js s',{maxBuffer: undefined}, (error, stdout, stderr) => {
            if (error) {
                console.error(error)
                return;
            }
            console.log(stdout)
            exec('node ./tests/comp.js alluris',{maxBuffer: undefined}, (error, stdout, stderr) => {
                if (error) {
                    console.error(error)
                    return;
                }
                console.log(stdout)
                exec('node ./tests/checkNonce.js',{maxBuffer: undefined}, (error, stdout, stderr) => {
                    if (error) {
                        console.error(error)
                        return;
                    }
                    console.log(stdout)
                    exec('node ./tests/HSNonceResult.js',{maxBuffer: undefined}, (error, stdout, stderr) => {
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