### Hexlet tests and linter status:

[![Actions Status](https://github.com/orishko/backend-project-lvl2/workflows/hexlet-check/badge.svg?branch=)](https://github.com/orishko/backend-project-lvl2/actions?query=branch:)
[![Maintainability](https://api.codeclimate.com/v1/badges/393c5de855752d19f891/maintainability)](https://codeclimate.com/github/orishko/backend-project-lvl2/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/393c5de855752d19f891/test_coverage)](https://codeclimate.com/github/orishko/backend-project-lvl2/test_coverage)

## Gendiff

The CLI util for compares two files and shows a difference.

**Supported file extensions:**

- `.json`
- `.yml` | `.yaml`

**Formats output:**

- `stylish`
- `plain`
- `json`

## Install

```bash
git clone https://github.com/orishko/backend-project-lvl2.git
make install
```

Help run `gendiff -h` or `gendiff --help`:

```
$ gengiff --help
Usage: gendiff [options] <filepath1> <filepath2>
Compares two configuration files and shows a difference.
Options:
  -v, --version        output the version number
  -f, --format <type>  output format (default: "stylish")
  -h, --help           display help for command
```

### Examples

### Comparison of two flat files with 'stylish' formatter

https://asciinema.org/a/BwQZk03YTR2Db1KREzIdJBz8m

### Comparison of two nested files with 'stylish' formatter

https://asciinema.org/a/DmvLU1yqpSfHn8Kbqp3jvX4lf

### Comparison of two nested files with 'plain' formatter

https://asciinema.org/a/hDXlt0e9nP9aTOwio13nXtXmy

### Comparison of two nested files with 'json' formatter

https://asciinema.org/a/K2YoRZ94Wf0uSNgspKHloym0z
