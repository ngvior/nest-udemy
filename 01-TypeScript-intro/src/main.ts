// import { /*pokemonIds, charmander*/ pokemons } from "./bases/02-objects.ts";
import { charmander } from "./bases/03-classes.ts";
// import { setupCounter } from "./counter.ts";
import "./style.css";
charmander;

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <h1>Hello ${charmander.name}, ${charmander.id}!</h1>
  <a href="https://vitejs.dev/guide/features.html" target="_blank">
    <u>Documentation</u>
  </a>
`;

// setupCounter(document.querySelector<HTMLButtonElement>("#counter")!);
