# subcmd

Create CLI tools with subcommands.  
Hugely inspired by [subcommand](https://github.com/maxogden/subcommand), but with a nested structure and support for usage information.  
Based on [minimist](https://www.npmjs.com/package/minimist) and [cliclopts](https://www.npmjs.com/package/cliclopts).

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
    usage : 'Usage: ls [OPTIONS]',
    options : [], /* cliclopts options */
    command : function(args) { /* do the ls thing */  },
    commands : [{
        name : 'foo',
        usage : 'Usage: ls foo [OPTIONS]',
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
    autoHelp : <bool>  // Print usage info and quit if -h or --help (default false)
}
```

## Changelog

### 1.0.1

* Added missing deps :see_no_evil:

### 1.0.0

* Initial release :tada:
