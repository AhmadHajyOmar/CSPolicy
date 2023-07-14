const { exec } = require('node:child_process')
exec(`node ./tests/comp.js 2`,{maxBuffer: undefined}, (error, stdout, stderr) => {
    if (error) {
        console.error(error)
        return;
    }
    console.log(stdout)
    exec(`node ./tests/checkNonce.js`,{maxBuffer: undefined}, (error, stdout, stderr) => {
        if (error) {
            console.error(error)
            return;
        }
        console.log(stdout)
        exec(`node ./tests/HSNonceResult.js`,{maxBuffer: undefined}, (error, stdout, stderr) => {
            if (error) {
                console.error(error)
                return;
            }
            console.log(stdout)
        });
    });
});