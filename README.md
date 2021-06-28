**Usage**
=========

## sync `[OPTIONS]`
```sh
  $ wost sync # Sync shared dir with origin and write changes to work files
  $ wost sync -w -d 20 # Repeat sync each 20 seconds

    Options:

      -w, --watch - Watch changes and sync state after delay
      -d, --delay <seconds> - Default value is 120. Set sync delay for current session
```

> Ignore file stored in `$CONFIG_FILE.dst` with name `.wsignore`

## link `[target]`
```sh
    $ wost link # Link all files (exclude ignored) from source dir to shared dir
    $ wost link /path/ # Link target dir to shared repository
```

## unlink `[target]`
```sh
    $ wost unlink # Remove all files from shared dir
    $ wost unlink /path/to/dir # Remove target directory from shared directory
```

## config `[OPTIONS]`
```sh
  $ wost config # Print you config file in terminal

    Options:

      -s, --src <target> - Set source directory (where stored all you projects)
      -d, --dst <target> - Set shared directory (must be git repository)
      -b, --branch <name> - Set name of the branch with which the user will work
```
## Default config

> Config file stored in `$HOME/.config/wost/config.json`

```json
{
    "src": "$HOME/Projects",
    "dst": "$HOME/WorkStream",
    "branchName": "$HOSTNAME",
    "exclude": [
        ".git",
        ".gitignore",
        "node_modules",
        ".wsignore",
    ]
}
```
