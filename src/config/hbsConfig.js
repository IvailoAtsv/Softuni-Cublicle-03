const handlebars = require('express-handlebars')
function hbsConfig(app){
    app.engine('hbs', handlebars.engine({
        extname: 'hbs',
        layoutsDir: 'src/views/layouts'
    }))
    
    app.set('view engine', 'hbs')
    app.set('views', 'src/views')
    
}
module.exports = hbsConfig