export const Inspect = `const inspect=function(){function e(n){return"string"==typeof n?\`"\${n}"\`:"number"==typeof n||"boolean"==typeof n||null==n||"bigint"==typeof n?String(n):"symbol"==typeof n?\`Symbol(\${n.description})\`:"function"==typeof n?\`function \${n.name}() { [native code] }\`:"object"==typeof n?function(n){if(Array.isArray(n))return function(n){const t=n.length>100?n.slice(0,100):n,i=n.length>100?n.length-100:0;return\`[\${t.map((n=>e(n))).join(", ")} \${i?\`... \${i} more items\`:""}]\`}(n);if(n instanceof Map)return\`Map { \${n.size} entries }\`;if(n instanceof Set)return\`Set { \${n.size} entries }\`;if(n instanceof WeakMap)return"WeakMap {}";if(n instanceof WeakSet)return"WeakSet {}";if(n instanceof Date) return n.toString();return\`{\\n\${Object.entries(n).map((n=>\`"\${n[0]}": \${e(n[1])}\`)).join(",\\n")}\\n}\`}(n):void 0}return e}();`;