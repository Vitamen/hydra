---
id: defaults_list
title: The Defaults List
---

## Introduction

:::important
Many of the features described in this page are new to Hydra 1.1 and are considered experimental.
Please report any issues.
:::

A Defaults List determines how to build a config object from other configs, and in what order. 
Each config can have a Defaults List as a top level element. The Defaults List itself is not a part of resulting config.

An example of a Defaults List:
```yaml title="config.yaml"
defaults:
  - db: mysql
```

## Default List entries are relative by default

Given this config directory:
```
db/
  mysql.yaml
  engine/
    innodb.yaml
    myiasm.yaml
webserver/
  apache.yaml
```

From within **db/mysql.yaml**, the correct way to address **engine/innodb**, and **webserver/apache** is:
```yaml title="db/mysql.yaml"
defaults:
 - engine: innodb
 - /webserver: apache
```

## Default List Overrides
A Defaults List can contain overrides that can change the choice for config groups that are defined elsewhere.
Such overrides are prefixed with the `override` keyword, and can only be added at the end of the Defaults List.
```yaml
defaults:
 - db: mysql
 - override db/engine: myiasm
 ```
In the above example, the override for `db/engine` will change the default
selection from the config `db/mysql` from `innodb` to `myiasm`.

## Relocating config content in the composed config (Overriding packages)
By default, the package of a config is derived from the config group it is in.

One may want to place the content into a config package other than the default in some cases, for example, when:
 - Using a config group from another library
 - Using a config from the same config group more than once

Overriding the package of a config relocates the entire subtree.

### Determining the final package
The priority for determining the package for a config is as follows:

1. The package specified in the Defaults List (relative to the including config)
2. The package specified in the config header (absolute)
3. The default package


### How to override config packages
**TODO**: decide what to do with overriding_packages.md

For this topic, let’s create a nested config hierarchy with the following directory structure and configs:

<div className="row">
<div className="col col--4">

```text title="Directory structure"
config.yaml
db/
  mysql.yaml
  engine/
     innodb.yaml
```
</div>
<div className="col  col--4">

```yaml title="config.yaml"
defaults:
  - db: mysql



```
</div>
<div className="col col--4">

```yaml title="db/mysql.yaml"
defaults:
  - engine: innodb



```
</div>
</div>

## Overriding the package via the defaults list
The following relocates the packages of `db/mysql` and `db/engine/innodb` from `db` and `db.engine` to `backup` and `backup.engine` respectively.

```yaml title="config.yaml":
defaults:
  - db@backup: mysql
```

### Overriding the package with package header
The default package of a config can also be changed via the package header.
```yaml title="db/mysql.yaml" {1}
# @package foo.bar
hostname: localhost
port: 3306
```

**NOTE**: Packages specified in the package header are absolute. The package of `db/mysql.yaml` above is `foo.bar`, not `db.foo.bar`.


## Extending a base config
A common need is to take an existing config and to change it slightly, overriding a few values.
Each config can contain config content and a Defaults List. 
The `_self_` element can be added to the defaults list to determine the composition order of this
config relative to the other configs in the defaults list:

<div className="row">
<div className="col col--6">

```yaml title="config.yaml"
defaults:
  - _self_
  - db: mysql # Overrides this config 

db: ???
```
</div>
<div className="col  col--6">

```yaml title="Result: All values from db/mysql"
db:
  driver: mysql     
  host: localhost
  port: 3306
```
</div>
</div>

<div className="row">
<div className="col col--6">

```yaml title="config.yaml"
defaults:
  - db: mysql  
  - _self_   # Overrides db/mysql

db:
  port: 3307
```

</div>

<div className="col  col--6">

```yaml title="Result: db.port from config"
db:
  driver: mysql
  host: localhost
  port: 3307


```

</div>
</div>

If `_self_` is not specified in the Defaults List, it is implicitly added as the first item.

## Extending a config in the same config group

# TODO:
 - document group defaults and config defaults