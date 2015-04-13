# subcmd

Create CLI tools with subcommands. Hugely inspired by [subcommand](https://github.com/maxogden/subcommand),
but with a nested structure that simplifies usage information output. Based on [minimist](https://www.npmjs.com/package/minimist) and [cliclopts](https://www.npmjs.com/package/cliclopts).

**subcmd** has a single nested structure of commands

```js
{
    name : "",
    usage : "",
    options : [],
    command : function(args) {},
    commands : []
}
```

It can be a single command or nested as deep as you want.

## Install

```sh
npm install --save subcmd
```

## Use

```js
require('subcmd')({
    name : 'ls',
    usage : 'list files in dir',
    options : [], /* cliclopts options */
    command : function(args) { /* do the ls thing */  },
    commands : [{
        name : 'foo',
        usage : 'foo-list files in dir',
        options : [],
        command : function(args) { /* do the ls foo thing */ },
        commands : []
    }]
},{
    autoHelp : true
})(process.argv.slice(2))
```

### Options

```js
{
    autoHelp : <boolean>  /* Automatically prints usage info and quits if -h or --help */
}
```

## Changelog

### 1.0.0

* Initial release :tada:
