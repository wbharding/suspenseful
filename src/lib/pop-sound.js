// Optional popcorn pops for the release timeline. Audio starts only after the reader turns it
// on; a missing or locked audio device leaves the visual playback alone.

let audioContext = null;

// @returns {Promise<boolean>} true when a context is running
export async function enablePopSound() {
  const Context = window.AudioContext || window.webkitAudioContext;
  if (!Context) throw new Error("Audio is not supported");
  if (!audioContext) audioContext = new Context();
  await audioContext.resume();
  playPopSound();
  return audioContext.state === "running";
}

export function disablePopSound() {
  return audioContext?.suspend().catch(() => {});
}

function disconnectLater(...nodes) {
  window.setTimeout(() => {
    nodes.forEach((node) => {
      try {
        node.disconnect();
      } catch {
        // Already torn down.
      }
    });
  }, 250);
}

// A short noise burst plus a high tick, so overlapping pops in a dense month stay countable
// instead of collapsing into one click.
// @param {number} [delay] - seconds to offset this pop, so a cluster does not fire as one click
export function playPopSound(delay = 0) {
  if (!audioContext || audioContext.state !== "running") return;

  try {
    const duration = 0.07;
    const start = audioContext.currentTime + delay;
    const buffer = audioContext.createBuffer(
      1,
      Math.ceil(audioContext.sampleRate * duration),
      audioContext.sampleRate,
    );
    const data = buffer.getChannelData(0);
    for (let i = 0; i < data.length; i += 1) {
      const t = i / data.length;
      data[i] = (Math.random() * 2 - 1) * (1 - t) ** 5;
    }

    const noise = audioContext.createBufferSource();
    noise.buffer = buffer;
    const filter = audioContext.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.value = 1100 + Math.random() * 2400;
    filter.Q.value = 0.85;
    const noiseGain = audioContext.createGain();
    noiseGain.gain.setValueAtTime(0.001, start);
    noiseGain.gain.exponentialRampToValueAtTime(0.22, start + 0.002);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, start + duration);
    noise.connect(filter);
    filter.connect(noiseGain);
    noiseGain.connect(audioContext.destination);
    noise.start(start);
    noise.stop(start + duration);

    const tick = audioContext.createOscillator();
    tick.type = "triangle";
    tick.frequency.setValueAtTime(2400 + Math.random() * 1400, start);
    tick.frequency.exponentialRampToValueAtTime(900 + Math.random() * 400, start + 0.04);
    const tickGain = audioContext.createGain();
    tickGain.gain.setValueAtTime(0.001, start);
    tickGain.gain.exponentialRampToValueAtTime(0.09, start + 0.0015);
    tickGain.gain.exponentialRampToValueAtTime(0.001, start + 0.045);
    tick.connect(tickGain);
    tickGain.connect(audioContext.destination);
    tick.start(start);
    tick.stop(start + 0.05);

    noise.onended = () => disconnectLater(noise, filter, noiseGain);
    tick.onended = () => disconnectLater(tick, tickGain);
  } catch {
    // Visual experience remains usable if an audio device changes.
  }
}
