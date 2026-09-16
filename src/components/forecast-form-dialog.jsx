import { useState } from "react";
import useGuideStore from "../hooks/use-guide-store.js";
import { createForecastId } from "../lib/forecast-id.js";
import { DialogHeading } from "./detail-dialog.jsx";
import FieldIcon from "./field-icon.jsx";

function defaultDeadline() {
  return new Date(Date.now() + 365 * 86400000).toISOString().slice(0, 10);
}

// @param {string} [id] - existing forecast to revise
export default function ForecastFormDialog({ id }) {
  const { forecasts, saveForecast, openDialog, showToast } = useGuideStore();
  const existing = id ? forecasts.find((entry) => entry.id === id) : null;

  const [ scenario, setScenario ] = useState(existing?.scenario || "");
  const [ probability, setProbability ] = useState(
    existing ? String(existing.probability) : "",
  );
  const [ deadline, setDeadline ] = useState(existing?.deadline || defaultDeadline());
  const [ criteria, setCriteria ] = useState(existing?.criteria || "");
  const [ rationale, setRationale ] = useState(existing?.rationale || "");

  function handleSubmit(event) {
    event.preventDefault();
    if (!event.target.reportValidity()) return;

    const parsed = Number(probability);
    const trimmedScenario = scenario.trim();
    const trimmedCriteria = criteria.trim();
    const trimmedRationale = rationale.trim();

    if (
      !trimmedScenario ||
      !trimmedCriteria ||
      !Number.isFinite(parsed) ||
      parsed < 0 ||
      parsed > 100 ||
      !/^\d{4}-\d{2}-\d{2}$/.test(deadline)
    ) {
      showToast("Provide a scenario, probability, deadline and resolution criteria.");
      return;
    }

    const now = new Date().toISOString();
    if (existing) {
      saveForecast({
        ...existing,
        scenario: trimmedScenario,
        probability: parsed,
        deadline,
        criteria: trimmedCriteria,
        rationale: trimmedRationale,
        updated: now,
        history: [
          ...existing.history,
          { date: now, probability: parsed, rationale: trimmedRationale },
        ],
      });
    } else {
      saveForecast({
        id: createForecastId(),
        scenario: trimmedScenario,
        probability: parsed,
        deadline,
        criteria: trimmedCriteria,
        rationale: trimmedRationale,
        created: now,
        updated: now,
        history: [ { date: now, probability: parsed, rationale: trimmedRationale } ],
      });
    }

    openDialog({ type: "plan", kicker: "YOUR LOCAL ACTION PLAN" });
  }

  return (
    <>
      <button
        className="back-btn"
        onClick={() => openDialog({ type: "plan", kicker: "YOUR LOCAL ACTION PLAN" })}
        type="button"
      >
        <FieldIcon name="arrow" />
        Back to my plan
      </button>
      <DialogHeading
        title={existing ? "Update the belief. Keep the history." : "Make the uncertainty explicit."}
      >
        A useful forecast has a resolvable event, a probability and a deadline. This is your own
        estimate—not an expert prediction supplied by this site.
      </DialogHeading>

      <form className="forecast-form" onSubmit={handleSubmit}>
        <h3>{existing ? "Revise this forecast" : "A new forecast"}</h3>
        <label className="field">
          <span>What exactly do you expect to happen?</span>
          <input
            maxLength={240}
            onChange={(event) => setScenario(event.target.value)}
            placeholder="Describe a specific, observable outcome"
            required
            type="text"
            value={scenario}
          />
        </label>
        <div className="form-grid">
          <label className="field">
            <span>Your probability (0–100%)</span>
            <input
              inputMode="decimal"
              max="100"
              min="0"
              onChange={(event) => setProbability(event.target.value)}
              placeholder="Your estimate"
              required
              step="0.1"
              type="number"
              value={probability}
            />
          </label>
          <label className="field">
            <span>Resolution deadline</span>
            <input
              onChange={(event) => setDeadline(event.target.value)}
              required
              type="date"
              value={deadline}
            />
          </label>
        </div>
        <label className="field">
          <span>What would count as this happening?</span>
          <textarea
            maxLength={2000}
            onChange={(event) => setCriteria(event.target.value)}
            placeholder="Define the evidence or source that will resolve the forecast"
            required
            value={criteria}
          />
        </label>
        <label className="field">
          <span>Why this probability—and what would change it?</span>
          <textarea
            maxLength={4000}
            onChange={(event) => setRationale(event.target.value)}
            placeholder="Write your assumptions, evidence and uncertainties"
            value={rationale}
          />
        </label>
        <button className="btn primary" type="submit">
          <FieldIcon name="check" />
          {existing ? "Save revision" : "Save forecast"}
        </button>
      </form>
      <p className="local-note">
        <FieldIcon name="lock" />
        Stored in this browser only. Export your plan for a portable copy.
      </p>
    </>
  );
}
