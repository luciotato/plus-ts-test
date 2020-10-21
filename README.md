#plus-typescript node console app (cli) example

This is an example/test project for [github.com/luciotato/plus-typescript](https://github.com/luciotato/plus-typescript)

## Testing

```
npm install
npm run build
```

Edit the .js files, change one type annotations in the comments to generate errors. build again.
You should get ts-compiler errors meaning tsc is reading type-annotations in comments inside the .js files

`npm run build` to test how typescript still sees the type-annotations and reports type-checking errors.


## Notes:

`npm run build` executes `node build.js`

`build.js` searches for all .js files under /src and adds them to `files:[...]` in `tsconfig.json` so plus-tsc compiles all .js files under /src

You can ignore generated files in /dist. Those would be similar .js files with the special type-annotation comments removed.

