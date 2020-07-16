const RandExp = require('randexp');

let i = 0;

for (i = 0; i < 10000; i++)
{
console.log(new RandExp(/^([a-zA-Z]){5}([0-9]){4}([a-zA-Z])/).gen());
}