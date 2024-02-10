<script>
  import "./app.css";
  let time = 0.0;
  let status = "none";
  let tempTimeout;
  let tempInterval;

  const handleKeyDown = (e) => {
    if (e.code !== "Space" || status === "inspect" || status === "inspect-done") return;
    if (status === "none") {
      time = 0.0;
      tempTimeout = setTimeout(() => (status = "inspect-done"), 500);
      return (status = "inspect");
    }
    if (status === "solving") {
      clearInterval(tempInterval);
      status = "none";
    }
  };

  const handleKeyUp = (e) => {
    if (e.code !== "Space") return;
    if (status === "inspect-done") {
      status = "solving";
      return (tempInterval = setInterval(() => (time += 0.01), 10));
    }
    if (status === "inspect") {
      clearTimeout(tempTimeout);
      return (status = "none");
    }
  };
</script>

<main class="stat-{status} h-[100dvh] flex justify-center items-center">
  <h1 class="text-[6rem] font-mono">{time.toFixed(2)}</h1>
</main>

<svelte:window on:keydown={handleKeyDown} on:keyup={handleKeyUp} />

<style>
  .stat-none {
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
