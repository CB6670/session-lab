const express = require('express');
const session = require('express-session');
const app = express();

app.use(session({
    // this mandatory configuration ensures that session IDs are not predictable
    secret: 'SunnyB3aches', // or any string you'd like
    // this option says if you haven't changed anything, don't resave. It is recommended and reduces session concurrency issues
    resave: false,
    // this option says if I am new but not modified still save
    saveUninitialized: true
  }))

  app.use((req, res, next) => {
    if (!req.session.counter) req.session.counter = 0
    console.log('counter', ++req.session.counter) // increment THEN log
    next() // needed to continue through express middleware
  });

  app.use((req, res, next) => {
    console.log('SESSION: ', req.session)
    next()
  })

  app.get('/', (req, res, next) => {
    if (!req.session.counter) res.send('Hello')
    else res.send(`You have visited this site ${req.session.counter} times.`)
  })

  app.listen(3000, () => console.log('Listening on port 3000'));
