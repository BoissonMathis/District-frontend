type CandidateCountProps = {
  candidate: number;
  candidateValidate: number;
  slots: number;
};

export default function CandidateCount(props: CandidateCountProps) {
  return (
    <div className="flex gap-6">
      <span>Candidatures : {props.candidate}</span>
      <span>Places restante : {props.slots - props.candidateValidate}</span>
    </div>
  );
}
