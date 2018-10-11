const fs = require('fs');
// const util = require('util');
// const exec = util.promisify(require('child_process').exec);
const { exec } = require('child_process');
const path = require('path');
const { pickups } = require('../config/config');
// const up = require('./migrationBlueprint').up;
// const down = require('./migrationBlueprint').down;

const runner = () => {
  const pickupNumber = pickups.length;
  console.log('pickupNumber :', pickupNumber);
  console.log(__dirname);

  let outputs = [];
  pickups.forEach(pickup => {
    exec(
      `knex migrate:make ${pickup.pickupName} --knexfile knexfile.js`,
      (err, stdout, stderr) => {
        if (err) return console.error(err);
        if (stderr) console.log('stderr :', stderr);
        console.log('stdout :', stdout);

        const migrationName = stdout.split('\\')[6];

        console.log(migrationName);
        outputs.push({ migrationName });
        outputs.forEach(output => {
          // console.log(output);
          // const fileContent = fs.open(
          //   'migrationBlueprint.js',
          //   'r',
          //   (err, res) => {
          //     console.log(err);
          //     console.log(res);
          //   }
          // );
          // console.log('fileContent :', fileContent);
          fs.createReadStream('migrationBlueprint.js', 'utf8').pipe(
            fs.createWriteStream(`migrations/${output.migrationName}`)
          );
        });
      }
    );
  });

  // fs.writeFileSync(`${Date.now()}_${pickup.pickupName}`, content, err => {
  //   if (err) throw err;
  //   console.log('file created successfully');
  // });
};

runner();
