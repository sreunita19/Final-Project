// A small temple-spire silhouette used as a recurring section divider —
// the page's one signature visual motif, nodding to Angkor's prasat towers.
function SpireDivider() {
  return (
    <svg
      className="spire-divider"
      width="90"
      height="34"
      viewBox="0 0 90 34"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M45 2 L50 12 L58 12 L52 18 L60 26 L45 21 L30 26 L38 18 L32 12 L40 12 Z"
        fill="var(--gold)"
      />
      <path d="M0 30 H90" stroke="var(--border)" strokeWidth="1" />
    </svg>
  );
}

export default SpireDivider;
