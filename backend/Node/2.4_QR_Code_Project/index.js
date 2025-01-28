/* 
1. Use the inquirer npm package to get user input.
2. Use the qr-image npm package to turn the user entered URL into a QR code image.
3. Create a txt file to save the user input using the native fs node module.
*/

import inquirer from "inquirer";
import qr from "qr-image";
import fs from 'fs'

 

// qr_png.pipe(require('fs').createWriteStream('i_love_qr.png'));

var png = qr.imageSync('I love QR!', { type: 'svg' });
// fs.writeFile("qr_png.png", qr_png, (err) => {
//     if (err) throw err;
//     console.log('The file has been saved!');
// });


inquirer
  .prompt([
    /* Pass your questions in here */
    {
        type: 'input',
        name: 'url',
        message: 'Please enter the URL',
    }
  ])
  .then((answers) => {
    // Use user feedback for... whatever!!
    console.log(answers)
    var qr_png = qr.image(answers.url);
    qr_png.pipe(fs.createWriteStream('qr_img.png'));
    fs.writeFile("URL.txt", answers.url, (err) => {
        if (err) throw err;
        console.log('The file has been saved!');
    });
    console.log('done')
  })
  .catch((error) => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else went wrong
    }
  });

  