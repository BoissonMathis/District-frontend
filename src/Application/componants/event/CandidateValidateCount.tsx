type CandidateValidateCountProps = {
  slots: number;
  candidateValidateLength: number;
};

export default function CandidateValidateCount(
  props: CandidateValidateCountProps
) {
  return (
    <div>
      <span>
        Inscription validée : {props.candidateValidateLength}/{props.slots}
      </span>
    </div>
  );
}
