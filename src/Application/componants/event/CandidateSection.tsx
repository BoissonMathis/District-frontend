import { useNavigate } from "react-router-dom";
import { User } from "../../../Infrastructure/User.ts/User.type";
import { FaCheck } from "react-icons/fa6";
import { FaTrashCan } from "react-icons/fa6";
import {
  acceptCandidate,
  cancelCandidate,
} from "../../../Module/Observable/userConnected/UserConnectedEvent.observable";

type CandidateSectionProps = {
  candidates: User[];
  event_id: string;
  refreshEvent: () => void;
};

export default function CandidateSection(props: CandidateSectionProps) {
  const { candidates, event_id, refreshEvent } = props;
  const user_id = localStorage.userId;
  const token = localStorage.token;
  const navigate = useNavigate();

  const handleAcceptCandidate = async (candidate_id: string) => {
    try {
      await acceptCandidate(event_id, candidate_id, token);
      refreshEvent();
    } catch (error) {
      console.error("Error accepting candidate:", error);
    }
  };

  const handleCancelCandidate = async (candidate_id: string) => {
    try {
      await cancelCandidate(event_id, candidate_id, token);
      refreshEvent();
    } catch (error) {
      console.error("Error canceling candidate:", error);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <h3 className="mb-6">Candidat(s)</h3>
      {candidates && candidates.length > 0 ? (
        candidates.map((candidate) => (
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

            <FaCheck
              className="text-green-600"
              onClick={() => handleAcceptCandidate(candidate._id)}
            />
            <FaTrashCan
              className="text-red-500"
              onClick={() => handleCancelCandidate(candidate._id)}
            />
          </div>
        ))
      ) : (
        <span>Aucun candidat</span>
      )}
    </div>
  );
}
