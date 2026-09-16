// Element 1A. METR task-completion time horizons, in human-expert minutes at 50% model
// success. Each horizon is [estimate, intervalLow, intervalHigh] from the reported bootstrapped
// confidence interval.
//
// The two benchmark versions are deliberately kept apart rather than merged: METR revised its
// estimates between them, and several models were never scored under 1.1. A model with no `v11`
// entry is omitted from that series instead of being interpolated.

export const benchmarkVersions = [
  { id: 'v11', label: 'TH 1.1', fullLabel: 'Time Horizon 1.1' },
  { id: 'v10', label: 'TH 1.0', fullLabel: 'Time Horizon 1.0' },
];

export const capabilityModels = [
  {
    name: "GPT-4 (March)",
    date: "2023-03-14",
    provider: "OpenAI",
    horizons: {
      v11: [3.5, 1.6, 6.9],
      v10: [5.4, 2.5, 10.3]
    }
  },
  {
    name: "GPT-4 (November)",
    date: "2023-11-06",
    provider: "OpenAI",
    horizons: {
      v11: [3.6, 1.6, 7.5],
      v10: [8.5, 4, 16.1]
    }
  },
  {
    name: "Claude 3.7 Sonnet",
    date: "2025-02-24",
    provider: "Anthropic",
    horizons: {
      v11: [60, 32, 106],
      v10: [56, 28, 94]
    }
  },
  {
    name: "o3",
    date: "2025-04-16",
    provider: "OpenAI",
    horizons: {
      v11: [121, 74, 201],
      v10: [94, 48, 165]
    }
  },
  {
    name: "Claude Sonnet 4",
    date: "2025-05-22",
    provider: "Anthropic",
    horizons: {
      v10: [75, 38, 132]
    }
  },
  {
    name: "Claude Opus 4",
    date: "2025-05-22",
    provider: "Anthropic",
    horizons: {
      v11: [101, 58, 170],
      v10: [86, 44, 144]
    }
  },
  {
    name: "Grok 4",
    date: "2025-07-09",
    provider: "xAI",
    horizons: {
      v10: [109, 48, 235]
    }
  },
  {
    name: "Claude Opus 4.1",
    date: "2025-08-05",
    provider: "Anthropic",
    horizons: {
      v10: [114, 56, 215]
    }
  },
  {
    name: "GPT-5",
    date: "2025-08-07",
    provider: "OpenAI",
    horizons: {
      v11: [214, 117, 480],
      v10: [138, 68, 281]
    }
  },
  {
    name: "Claude Sonnet 4.5",
    date: "2025-09-29",
    provider: "Anthropic",
    horizons: {
      v10: [122, 59, 252]
    }
  },
  {
    name: "GPT-5.1 Codex Max",
    date: "2025-11-19",
    provider: "OpenAI",
    horizons: {
      v10: [173, 81, 411]
    }
  },
  {
    name: "Claude Opus 4.5",
    date: "2025-11-24",
    provider: "Anthropic",
    horizons: {
      v11: [320, 170, 729],
      v10: [289, 110, 1268]
    }
  }
];

// @param {string} versionId - 'v11' or 'v10'
// @returns {object[]} models scored under that benchmark version, in date order
export function modelsForVersion(versionId) {
  return capabilityModels.filter((model) => Array.isArray(model.horizons[versionId]));
}
