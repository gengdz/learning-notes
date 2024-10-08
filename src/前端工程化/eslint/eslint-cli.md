# eslint cli

```bash
eslint [options] file.js [file.js] [dir]
```

## 用法

```bash
eslint --fix --ext .js,.vue src/
eslint --fix 'src/**/*.{ts,js,tsx,jsx}'
```

## Basic configuration

- --no-eslintrc Disable use of configuration from .eslintrc.\_
- `-c`, `--config` path::String Use this configuration, overriding .eslintrc.\_ config options if present
- --env [String] Specify environments
- `--ext` [String] Specify JavaScript file extensions
- --global [String] Define global variables
- --parser String Specify the parser to be used
- --parser-options Object Specify parser options
- --resolve-plugins-relative-to path::String A folder where plugins should be resolved from, CWD by default

## Specify Rules and Plugins

- --plugin [String] Specify plugins
- --rule Object Specify rules
- --rulesdir [path::String] Load additional rules from this directory. Deprecated: Use rules from plugins

## Fix Problems

- `--fix` Automatically fix problems
- --fix-dry-run Automatically fix problems without saving the changes to the file system
- --fix-type Array Specify the types of fixes to apply (directive, problem, suggestion, layout)

## Ignore Files

- --ignore-path path::String Specify path of ignore file
- --no-ignore Disable use of ignore files and patterns
- --ignore-pattern [String] Pattern of files to ignore (in addition to those in .eslintignore)

## Use stdin

- --stdin Lint code provided on <STDIN> - default: false
- --stdin-filename String Specify filename to process STDIN as

## Handle Warnings

- `--quiet` Report errors only - default: false
- --max-warnings Int Number of warnings to trigger nonzero exit code - default: -1

## Output

- -o, --output-file path::String Specify file to write report to
- -f, --format String Use a specific output format - default: stylish
- --color, --no-color Force enabling/disabling of color

## Inline configuration comments

- --no-inline-config Prevent comments from changing config or rules
- --report-unused-disable-directives Adds reported errors for unused eslint-disable and eslint-enable directives
- --report-unused-disable-directives-severity String Chooses severity level for reporting unused eslint-disable and eslint-enable directives - either: off, warn, error, 0, 1, or 2

## Caching

- --cache Only check changed files - default: false
- --cache-file path::String Path to the cache file. Deprecated: use --cache-location - default: .eslintcache
- --cache-location path::String Path to the cache file or directory
- --cache-strategy String Strategy to use for detecting changed files in the cache - either: metadata or content - default: metadata

## Miscellaneous

- `--init` Run config initialization wizard - default: false
- --env-info Output execution environment information - default: false
- --no-error-on-unmatched-pattern Prevent errors when pattern is unmatched
- --exit-on-fatal-error Exit with exit code 2 in case of fatal error - default: false
- --debug Output debugging information
- `-h`, --help Show help
- -v, --version Output the version number
- `--print-config` path::String Print the configuration for the given file
