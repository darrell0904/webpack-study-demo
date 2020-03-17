const Compiler = require('./compiler')
const Plugin = require('./my-plugin')

const myPlugin = new Plugin();
 
const options = {
    plugins: [myPlugin]
}

const compiler = new Compiler();

for (const plugin of options.plugins) {
    if (typeof plugin === "function") {
        plugin.call(compiler, compiler);
    } else {
        plugin.apply(compiler);
    }
}

compiler.run();