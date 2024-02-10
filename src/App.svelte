<script>
  import { scale } from "svelte/transition";
  import "./app.css";
  import generateScramble from "./lib/scrambler.js";
  let time = 0.0;
  let status = "none";
  let times = [];
  let tempTimeout, tempInterval, currAO5, currAO12, bestAO5, bestAO12;

  const NONE = "none";
  const INSPECT = "inspect";
  const INSPECT_DONE = "inspect-done";
  const SOLVING = "solving";
  const FINISHED_SOLVING = "finished-solving";

  let scramble = generateScramble();

  const handleTriggerStart = () => {
    if (status === NONE) {
      time = 0.0;
      tempTimeout = setTimeout(() => (status = INSPECT_DONE), 500);
      status = INSPECT;
    } else if (status === SOLVING) {
      clearInterval(tempInterval);
      times = [...times, Number(time.toFixed(2))];
      if (times.length >= 5) {
        currAO5 = (times.slice(-5).reduce((acc, cur) => acc + cur, 0) / 5).toFixed(2);
        if (currAO5 < bestAO5 || !bestAO5) bestAO5 = currAO5;
      }
      if (times.length >= 12) {
        currAO12 = (times.slice(-12).reduce((acc, cur) => acc + cur, 0) / 12).toFixed(2);
        if (currAO12 < bestAO12 || !bestAO12) bestAO12 = currAO12;
      }
      status = FINISHED_SOLVING;
      scramble = generateScramble();
    }
  };

  const handleTriggerEnd = () => {
    if (status === INSPECT) {
      clearTimeout(tempTimeout);
      status = NONE;
    } else if (status === INSPECT_DONE) {
      status = SOLVING;
      tempInterval = setInterval(() => (time += 0.01), 10);
    } else if (status == FINISHED_SOLVING) status = NONE;
  };
</script>

<main class="stat-{status} flex justify-center items-center select-none font-mono h-[100dvh] w-[100dvw]">
  <h1 class="text-[6rem]">{time.toFixed(2)}</h1>

  <h4 class="absolute top-0 my-2 mx-6 text-2xl text-center">
    {status === SOLVING ? "" : scramble}
  </h4>

  <table class="absolute bottom-0 left-0 text-xl m-4 {status === SOLVING ? 'hidden' : ''}">
    <tr>
      <td />
      <td class="text-center px-2">Current</td>
      <td class="text-center px-2">Best</td>
    </tr>
    <tr>
      <td class="text-center">AO5</td>
      <td class="text-center">{currAO5 ? currAO5 : "-"}</td>
      <td class="text-center">{bestAO5 ? bestAO5 : "-"}</td>
    </tr>
    <tr>
      <td class="text-center">AO12</td>
      <td class="text-center">{currAO12 ? currAO12 : "-"}</td>
      <td class="text-center">{bestAO12 ? bestAO12 : "-"}</td>
    </tr>
  </table>
</main>

<svelte:window
  on:keydown={(e) => e.code === "Space" && handleTriggerStart()}
  on:keyup={(e) => e.code === "Space" && handleTriggerEnd()}
  on:touchstart={handleTriggerStart}
  on:touchend={handleTriggerEnd}
/>

<style>
  .stat-none {
    background-color: #eee;
  }
  .stat-finished-solving {
    background-color: #eee;
  }

  .stat-inspect {
    background-color: #e06666;
  }

  .stat-inspect-done {
    background-color: #93c47d;
  }
  .stat-solving {
    background-color: #93c47d;
  }
</style>
