import { MdEdit } from "react-icons/md";
import { useParams } from "react-router-dom";
import { AxiosService } from "../../../Infrastructure/Http/axios.service";
import { useUserToken } from "../../../Module/Observable/userConnected/UserToken.observable";
import { useEffect, useState } from "react";
import {
  cancelCandidate,
  deleteCandidate,
  Event,
  postCandidate,
} from "../../../Module/Observable/userConnected/UserConnectedEvent.observable";
import { User } from "../../../Infrastructure/User.ts/User.type";
import {
  setUpdateFormEvent,
  useUpdateFormEvent,
} from "../../../Module/Observable/modal/UpdateFormEvent.observable";
import { UpdateEventForm } from "../../componants/event/UpdateEventForm";
import { useUserConnected } from "../../../Module/Observable/userConnected/UserConnected.observable";
import CandidateSection from "../../componants/event/CandidateSection";
import CandidateButton from "../../componants/event/CandidateButton";
import CandidateCount from "../../componants/event/CandidateCount";
import CandidateValidateSection from "../../componants/event/CandidateValidateSection";

export function EventDetail() {
  const [event, setEvent] = useState<Event>();
  const [user, setUser] = useState<User>();
  const userConnected = useUserConnected();
  const token = localStorage.token;
  const { id } = useParams<{ id: string }>();
  const updateFormOpened = useUpdateFormEvent();

  console.log(event);

  const getEventToDisplay = async () => {
    if (token && id) {
      try {
        const response = await AxiosService.getOneEventById(id, token);
        if (response.status === 200) {
          setEvent(response.data);
          setUser(response.data.user);
        }
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    }
  };

  const handleCandidate = async (
    event_id: string,
    user_id: string,
    token: string
  ) => {
    try {
      if (event!.candidate.some((candidate) => candidate._id === user_id)) {
        await cancelCandidate(event_id, user_id, token);
      } else {
        await postCandidate(event_id, user_id, token);
      }
      getEventToDisplay();
    } catch (error) {
      console.error("Error during candidature:", error);
    }
  };

  const handleCandidateValidate = async (
    event_id: string,
    user_id: string,
    token: string
  ) => {
    try {
      await deleteCandidate(event_id, user_id, token);
      getEventToDisplay();
    } catch (error) {
      console.error("Error during candidature:", error);
    }
  };

  useEffect(() => {
    getEventToDisplay();
  }, [token, id, updateFormOpened]);

  return (
    <div className="flex-1">
      {user && event ? (
        updateFormOpened ? (
          <UpdateEventForm event={event} />
        ) : (
          <div className="flex flex-col gap-12 align-center items-center w-full mt-6">
            <div className="flex flex-col w-[70%] p-6 mx-auto">
              {user._id == userConnected._id && (
                <div>
                  <MdEdit
                    className="mr-16 mb-4 h-6 w-6 cursor-pointer"
                    onClick={() => setUpdateFormEvent()}
                  />
                </div>
              )}

              <div className="flex gap-12 w-[100%] space-x-[30%] justify-center">
                <div className="flex flex-col gap-4">
                  <span>Organisateur : {user.username}</span>
                  <span>type : {event.type}</span>
                  <span>date : {event.date}</span>
                  <span>catégorie : {event.categorie}</span>
                  <span>niveau : {event.level}</span>
                </div>
                <div className="flex flex-col gap-4 items-center justify-center">
                  <img
                    src={user.profil_image}
                    alt=""
                    className="user-profil-picture-xl"
                  />
                  <span>
                    {user.username} - {user.status}
                  </span>
                </div>
              </div>
              <div className="flex flex-col mt-6 gap-4">
                <span>informations complémentaire : </span>
                <p className="pl-4">{event.contentText}</p>
              </div>
              <div className="flex mt-6 gap-4">
                <span>lieu : </span>
                <span>{event.place}</span>
              </div>
            </div>
            {user._id == userConnected._id ? (
              <div className="flex flex-col gap-4 items-center">
                <CandidateCount
                  candidate={event.candidate.length}
                  candidateValidate={event.candidate_validate.length}
                  slots={event.slots}
                />
                <div className="flex gap-32">
                  <div>
                    <CandidateSection
                      event_id={event._id!}
                      candidates={event.candidate}
                      refreshEvent={() => getEventToDisplay()}
                    />
                  </div>
                  <div>
                    <CandidateValidateSection
                      candidates_validate={event.candidate_validate}
                      event_id={event._id!}
                      refreshEvent={() => getEventToDisplay()}
                    />
                  </div>
                </div>
              </div>
            ) : (
              <CandidateButton
                candidate={event.candidate.some(
                  (candidate) => candidate._id === userConnected._id
                )}
                event_id={event._id!}
                user_id={userConnected._id}
                handleCandidate={handleCandidate}
              />
            )}
          </div>
        )
      ) : (
        <span>Loading ...</span>
      )}
    </div>
  );
}
