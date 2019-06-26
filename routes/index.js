

module.exports=(app)=>{

  //Home
  app.use('/', require('./home'));

  //developer
  app.use('/developer', require('./developer'));

  }


