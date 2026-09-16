import { sourceRegistry } from "../data/source-registry.js";
import { surveyQuestions } from "../data/survey-data.js";
import { downloadFile, toCsv } from "../lib/download.js";
import { DialogHeading } from "./detail-dialog.jsx";
import FieldIcon from "./field-icon.jsx";
import { SourceCard } from "./source-drawer.jsx";

export default function SurveyDataDialog() {
  function handleExport() {
    const rows = [
      [ "question", "respondents", "median_percent", "mean_percent", "source" ],
      ...surveyQuestions.map((question) => [
        question.question,
        question.n,
        question.median,
        question.mean,
        sourceRegistry.survey.url,
      ]),
    ];
    downloadFile("ai-researcher-survey-2023-summary.csv", toCsv(rows), "text/csv;charset=utf-8");
  }

  return (
    <>
      <DialogHeading title="What the survey actually says.">
        Question-level statistics from Table 2 of{" "}
        <em>Thousands of AI Authors on the Future of AI</em>. These estimates refer to extinction
        or similarly permanent and severe human disempowerment. Not every respondent answered
        every framing.
      </DialogHeading>

      <div className="data-table-wrap">
        <table>
          <thead>
            <tr>
              <th>Framing</th>
              <th className="number">Responses</th>
              <th className="number">Median</th>
              <th className="number">Mean</th>
            </tr>
          </thead>
          <tbody>
            {surveyQuestions.map((question) => (
              <tr key={question.id}>
                <td>{question.label}</td>
                <td className="number">{question.n.toLocaleString()}</td>
                <td className="number">{question.median}%</td>
                <td className="number">{question.mean}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="dialog-intro">
        The mean and median are different summaries. They do not show the full distribution, and
        the line connecting them on the page is <strong>not</strong> a confidence interval or the
        range of all responses. Researchers also differed over whether faster or slower AI
        progress was preferable.
      </p>

      <SourceCard source={{ id: "survey", ...sourceRegistry.survey }} />

      <div className="dialog-actions">
        <button className="btn primary" onClick={handleExport} type="button">
          <FieldIcon name="download" />
          Download CSV
        </button>
      </div>
    </>
  );
}
