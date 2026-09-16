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

// @param {number} [delay] - seconds to offset this pop, so a cluster does not fire as one click
export function playPopSound(delay = 0) {
  if (!audioContext || audioContext.state !== "running") return;

  try {
    const duration = 0.085;
    const start = audioContext.currentTime + delay;
    const buffer = audioContext.createBuffer(
      1,
      Math.ceil(audioContext.sampleRate * duration),
      audioContext.sampleRate,
    );
    const data = buffer.getChannelData(0);
    for (let i = 0; i < data.length; i += 1) {
      const t = i / data.length;
      data[i] = (Math.random() * 2 - 1) * (1 - t) ** 4;
    }

    const source = audioContext.createBufferSource();
    source.buffer = buffer;
    const filter = audioContext.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.value = 950 + Math.random() * 1700;
    filter.Q.value = 0.7;
    const gain = audioContext.createGain();
    gain.gain.setValueAtTime(0.001, start);
    gain.gain.exponentialRampToValueAtTime(0.26, start + 0.003);
    gain.gain.exponentialRampToValueAtTime(0.001, start + duration);
    source.connect(filter);
    filter.connect(gain);
    gain.connect(audioContext.destination);
    source.start(start);
    source.stop(start + duration);
    source.onended = () => {
      source.disconnect();
      filter.disconnect();
      gain.disconnect();
    };
  } catch {
    // Visual experience remains usable if an audio device changes.
  }
}
