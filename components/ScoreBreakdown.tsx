interface Props {
  breakdown: any;
}

export default function ScoreBreakdown({ breakdown }: Props) {
  return (
    <div>
      <pre>{JSON.stringify(breakdown, null, 2)}</pre>
    </div>
  );
}