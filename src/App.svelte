<script>
  import "./app.css";
  let time = 0.0;
  let status = "none";
  let tempTimeout;
  let tempInterval;
  let times = [];
  let currAO5;
  let currAO12;
  let bestAO5;
  let bestAO12;

  const handleTriggerStart = () => {
    if (status === "none") {
      time = 0.0;
      tempTimeout = setTimeout(() => (status = "inspect-done"), 500);
      return (status = "inspect");
    }
    if (status === "solving") {
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
      status = "finished-solving";
    }
  };

  const handleTriggerEnd = () => {
    if (status === "inspect-done") {
      status = "solving";
      return (tempInterval = setInterval(() => (time += 0.01), 10));
    }
    if (status === "inspect") {
      clearTimeout(tempTimeout);
      return (status = "none");
    }
    if (status == "finished-solving") status = "none";
  };
</script>

<main class="stat-{status} h-[100dvh] w-[100dvw] flex justify-center items-center">
  <h1 class="text-[6rem] font-mono select-none">{time.toFixed(2)}</h1>

  <table class="absolute bottom-0 left-0 text-xl font-mono m-4">
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
