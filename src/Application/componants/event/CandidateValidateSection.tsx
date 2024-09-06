import { useNavigate } from "react-router-dom";
import { User } from "../../../Infrastructure/User.ts/User.type";
import { deleteCandidate } from "../../../Module/Observable/userConnected/UserConnectedEvent.observable";
import { FaTrashCan } from "react-icons/fa6";

type CandidateValidateSectionProps = {
  candidates_validate: User[];
  event_id: string;
  refreshEvent: () => void;
};

export default function CandidateValidateSection(
  props: CandidateValidateSectionProps
) {
  const { candidates_validate, event_id, refreshEvent } = props;
  const token = localStorage.token;
  const navigate = useNavigate();

  const handleDeleteCandidate = async (candidate_id: string) => {
    try {
      await deleteCandidate(event_id, candidate_id, token);
      refreshEvent();
    } catch (error) {
      console.error("Error deleting candidate:", error);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <h3 className="mb-6">Participant(s) validé(s)</h3>
      {candidates_validate && candidates_validate.length > 0 ? (
        candidates_validate.map((candidate) => (
          <div
            key={candidate._id}
            className="flex items-center justify-center gap-4 cursor-pointer "
          >
            <div
              className="flex gap-4"
              onClick={() => navigate(`/profil/${candidate._id}`)}
            >
              <img
                src={candidate.profil_image}
                alt=""
                className="user-profil-picture-xs"
              />
              <span>
                {candidate.username} - {candidate.status}
              </span>
            </div>

            <FaTrashCan
              className="text-red-500"
              onClick={() => handleDeleteCandidate(candidate._id)}
            />
          </div>
        ))
      ) : (
        <span>Aucun candidat validé</span>
      )}
    </div>
  );
}
