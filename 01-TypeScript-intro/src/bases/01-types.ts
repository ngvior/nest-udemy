let name: string = "Nicolas";
const age: number = 35,
  isAlive = true;

const templateString = `Esto es un string 
multilinea
que puede tener
" dobles
' simples
inyectar valores \${name} == ${name}
expresiones: ${1 + 1}
numeros: ${age}
booleanos: ${isAlive}`;

console.log(templateString);

export { name, age, isAlive, templateString };
