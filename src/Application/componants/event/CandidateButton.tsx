type CandidateButtonProps = {
  candidate: boolean;
  event_id: string;
  user_id: string;
  handleCandidate: (event_id: string, user_id: string, token: string) => void;
};

export default function CandidateButton(props: CandidateButtonProps) {
  const candidate = props.candidate;
  const user_id = props.user_id;
  const event_id = props.event_id;
  const token = localStorage.token;
  console.log("laaaaa", candidate);

  return (
    <div>
      <button
        onClick={() => props.handleCandidate(event_id, user_id, token)}
        className="auth-btn self-center"
      >
        {candidate ? "Annuler candidature" : "Candidater"}
      </button>
    </div>
  );
}
