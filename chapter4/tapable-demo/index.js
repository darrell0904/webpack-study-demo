const {
  SyncHook
} = require('tapable');


const hook = new SyncHook('arg1', 'arg2', 'arg3');

hook.tap('SyncPlugin', (arg1, arg2, arg3) => {
  console.log(arg1, arg2, arg3, arg4);
});

hook.call(1, 2, 3);