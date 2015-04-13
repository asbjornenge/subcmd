var assert = require('assert')
var subcmd = require('../')

function match(fn) {
    return subcmd({
        name : 'foo',
        usage : 'Usage: foo [OPTIONS]',
        options : [
            {
                name    : 'verbose',
                abbr    : 'v',
                boolean : true,
                help    : 'More verbose output'
            },
            {
                name    : 'path',
                abbr    : 'p',
                default : './foo.json',
                help    : 'Path to foo file'
            }
        ],
        command : function(args, opts) {
            fn('foo',args,opts)
        },
        commands : [
            {
                name : 'bar',
                usage : 'Usage: foo bar [OPTIONS]',
                options : [
                    {
                        name    : 'quiet',
                        abbr    : 'q',
                        boolean : true,
                        help    : 'stfu'
                    }
                ],
                command : function(args, opts) {
                    fn('foo bar',args,opts)
                }
            }
        ]
    })
}

it('works with a basic command', function(done) {
    match(function(cmd, args, opts) {
        assert(cmd == 'foo')
        assert(args._[0] == 'test')
        assert(args.v)
        assert(args.path == './foo.json') // default
        done()
    })(['test','-v'])
})

it('works with a sub command', function(done) {
    match(function(cmd, args) {
        assert(cmd == 'foo bar')
        assert(args._[0] == 'test')
        done()
    })(['bar','test','-v'])
})

it('return usage information', function(done) {
    match(function(cmd, args, opts) {
        assert(cmd == 'foo bar')
        assert(opts.usage().indexOf('Usage: foo bar [OPTIONS]') == 0)
        done()
    })(['bar'])
})
