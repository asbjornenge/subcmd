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
        command : function(args) {
            fn('foo',args)
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
                command : function(args) {
                    fn('foo bar',args)
                }
            }
        ]
    })
}

it('works with a basic command', function(done) {
    match(function(cmd, args) {
        assert(cmd == 'foo')
        assert(args._[0] == 'test')
        assert(args.v)
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
