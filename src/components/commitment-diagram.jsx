import FieldIcon from "./field-icon.jsx";

// Element 1E. A stylized incentive chain, not a financial estimate.
export default function CommitmentDiagram() {
  return (
    <>
      <div className="commitment-diagram">
        <div>
          <FieldIcon name="coins" />
          <strong>
            Capital
            <br />
            committed
          </strong>
        </div>
        <FieldIcon name="arrow" />
        <div>
          <FieldIcon name="chart" />
          <strong>
            Growth
            <br />
            expected
          </strong>
        </div>
        <FieldIcon name="arrow" />
        <div>
          <FieldIcon name="road" />
          <strong>
            Pressure
            <br />
            to ship
          </strong>
        </div>
      </div>
      <div className="pullquote">
        “We can’t afford
        <br />
        to fall behind.”
        <small>A stylized incentive—not a financial estimate.</small>
      </div>
    </>
  );
}
