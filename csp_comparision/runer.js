const fs = require('fs');
const { exec } = require('child_process');
const inputCommand = process.argv.splice(2);


// Read commands from a text file
const readCommandsFromFile = (filePath) => {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        reject(err);
        return;
      }

      const commands = data.split('\n').filter((command) => command.trim() !== '');
      resolve(commands);
    });
  });
};

// Run a command using the system's default shell
const runCommand = (command) => {
  return new Promise((resolve, reject) => {
    exec(command, (err, stdout, stderr) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(stdout);
    });
  });
};
let filePath = './tests/HomepagseCommands.txt';

if(inputCommand == 's'){
    filePath = './tests/SubpagseCommands.txt';
}

readCommandsFromFile(filePath)
  .then((commands) => {
    const commandPromises = commands.map((command) => runCommand(command));
    return Promise.all(commandPromises);
  })
  .then((outputs) => {
    outputs.forEach((output) => {
      console.log(output);
    });
  })
  .catch((err) => {
    console.error(err);
  });