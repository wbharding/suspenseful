import { useState } from "react";
import { sourceRegistry } from "../data/source-registry.js";
import useGuideStore from "../hooks/use-guide-store.js";
import { downloadFile } from "../lib/download.js";
import { DialogHeading, ExternalLink } from "./detail-dialog.jsx";
import FieldIcon from "./field-icon.jsx";

const MEETING_DRAFT = `Subject: Meeting request: independent oversight for frontier AI

Dear [Representative / Senator and staff],

I am a constituent in [city or district]. I would appreciate a short meeting to discuss safeguards for the most capable AI systems.

My goal is to preserve useful innovation while improving independent evaluations, serious-incident reporting and public-sector technical expertise. I would like to understand your office’s position on these measures and the tradeoffs you see.

Could we arrange a 15–20 minute meeting with the appropriate staff member? I can share a short set of original research and policy sources in advance.

Thank you for your time,
[Your name]
[Your preferred contact information]`;

export default function MeetingDialog() {
  const { showToast } = useGuideStore();
  const [ draft, setDraft ] = useState(MEETING_DRAFT);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(draft);
      showToast("Draft copied. Review it before sending.");
    } catch {
      showToast("Draft selected. Use your browser’s Copy command.");
    }
  }

  return (
    <>
      <DialogHeading title="Ask for a conversation.">
        Edit this in your own voice. Nothing is sent automatically, and the draft is not saved
        unless you copy or export it.
      </DialogHeading>

      <label className="field">
        <span>Your editable meeting request</span>
        <textarea
          className="meeting-draft"
          onChange={(event) => setDraft(event.target.value)}
          value={draft}
        />
      </label>

      <div className="dialog-actions">
        <button className="btn primary" onClick={handleCopy} type="button">
          <FieldIcon name="copy" />
          Copy draft
        </button>
        <button
          className="btn"
          onClick={() => downloadFile("meeting-request.txt", draft)}
          type="button"
        >
          <FieldIcon name="download" />
          Save text file
        </button>
      </div>

      <div className="dialog-actions">
        <ExternalLink className="btn" label="Find your U.S. representative" url={sourceRegistry.house.url} />
        <ExternalLink className="btn" label="Find your U.S. senators" url={sourceRegistry.senate.url} />
      </div>

      <p className="after-source">
        Outside the U.S.? Adapt the request to your local elected representative. Do not add
        personal details you are not comfortable sharing.
      </p>
    </>
  );
}
