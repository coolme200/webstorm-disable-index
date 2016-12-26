## webstorm-disable-index

Init default webstorm config.

usage:

```
// package.json
"devDependencies": {
  "webstorm-disable-index": "1"
},
"config": {
  "webstorm": {
    // ignore the whole node_modules, but add these as lib
    "index": ["egg", "egg-init"]
  }
}

```

