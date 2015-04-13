var minimist = require('minimist')
var cliclopts = require('cliclopts')

function match(config, options, args, cmd) {
    var argv = minimist(args)

    var moreCmds = false
    if (argv._.length > 0 && config.commands) {
        moreCmds = config.commands.filter(function(_cmd) { return _cmd.name == argv._[0]}).length > 0
    }
    var isDefaultCmd = (!cmd && !moreCmds)
    var isSubCmd     = (cmd && cmd == config.name && !moreCmds)

    if (isDefaultCmd || isSubCmd) {
        var clio = cliclopts(config.options || {})
        var argv = minimist(args, {
            alias   : clio.alias(),
            boolean : clio.boolean(),
            default : clio.default()
        })
        config.command(argv, clio)
        return true
    }

    var nextCmd = argv._.shift()
    var nextArgs = args.filter(function(arg) { return arg != nextCmd })
    var nextConfig = config.commands.filter(function(_cmd) { return _cmd.name == nextCmd })

    if (nextConfig.length == 0) {
        return false
    }

    return match(nextConfig[0], options, nextArgs, nextCmd)
}

module.exports = function(config, options) {
  options = options || {}
  config  = Array.isArray(config) ? { commands: config } : config
  return match.bind(undefined, config, options)
}
