const express = require('express');
const app = express();
const port = 5000;

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

const data = {
    rgb:"#00FF00",
    servo:90
}

app.get('/api/temp', (req, res) =>{
    res.send('temp: 21°C');
})

app.get('/gui', (req, res) => {
    res.send(`
    Io sono un <span style="color:${data.rgb};">LED</span>!<br>
    <input type="color" value="${data.rgb}">
    <button id="btn">Change</button><br>
    Servo: ${data.servo}<br>
    <input type="range" id="servo" min="1" max="360" value="${data.servo}" step="1"><br>
    <h3>API endpoints<h3>
    <p>/api/rbg which expects: {"rgb":#[Color]]}</p>
    <p>/api/servo which expects: {"servo":[ServoAngle]}</p>
    <script>
    document.getElementById('btn').addEventListener('click', () =>{
        let data = {"rgb":document.getElementsByTagName('input')[0].value};
        fetch("/api/rgb", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            redirect: 'follow',
            body: JSON.stringify(data),
        }).then(()=>{
            location.reload()
        })
    })
    document.getElementById('servo').addEventListener('change', (event) => {
        console.log(event.target.value)
        let data = {"servo":event.target.value};
        fetch("/api/servo", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            redirect: 'follow',
            body: JSON.stringify(data),
        }).then(()=>{
            location.reload()
        })
    })
    </script>`);
})

app.get('/', (req, res) => {
    res.json(data);
})

app.post('/api/rgb', (req, res, next) => {
    data.rgb = req.body.rgb;
    console.log(`Color changed to: ${req.body.rgb}`);
    res.json(req.body);
})

app.post('/api/servo', (req, res, next) => {
    console.log(JSON.stringify(req.body))
    data.servo = req.body.servo;
    console.log(`Servo rotation changed to: ${req.body.servo}`);
    res.json(req.body);
})

app.get('/api/servo', (req, res) => {
    res.json(data.servo);
})

app.get('/api/rgb', (req, res) => {
    res.json(data.rgb);
})

app.listen(port, () => {
    console.log(`Listening on Port ${port}`);
})
