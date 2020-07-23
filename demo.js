const open = require('open');
const Application = require('./app')

const app = new Application(); 

app.use((req, res) =>{
    res.end('hello world')
})

app.listen(3000, ()=>{
    open("http://localhost:3000/", "chrome");

    console.log('listen 3000 port!')
});
