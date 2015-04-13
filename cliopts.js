var cliclopts = require('cliclopts')

module.exports = function(config) {
    var clio   = cliclopts(config.options || {})
    var usage  = clio.usage.bind(clio)
    var print  = clio.print.bind(clio)
    clio.usage = function() {
        return (config.usage+"\n" || "")+usage() 
    }
    return clio
}
