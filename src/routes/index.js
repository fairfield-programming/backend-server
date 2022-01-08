const { readFile } = require("fs/promises")
const address = '../../../fairfield-programming.github.io/src/index.html'
module.exports = (req, res) => {
    readFile(address, 'utf-8', (error, html)=>{
        res.send(html)
    }).catch((error)=>{
        console.log(error);
        return res.status(500).send("Internal Server Error.");
    })
}