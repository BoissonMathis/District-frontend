import Auth from "../../Module/auth";
import { UserProfil } from "../componants/user/userProfil/UserProfil";
import { UpdateUserForm } from "../componants/user/userConnected/UpdateUserForm";
import { useUpdateFormUser } from "../../Module/Observable/modal/UpdateFormUser.observable";
import { useEventFormStatus } from "../../Module/Observable/modal/EventForm.observable";
import { CreateEventForm } from "../componants/user/userConnected/CreateEventForm";

const UserProfilPage = () => {
  const updateFormOpened = useUpdateFormUser();
  const createEventFormOpened = useEventFormStatus();

  return (
    <div className="flex-1">
      {updateFormOpened ? (
        <UpdateUserForm />
      ) : createEventFormOpened ? (
        <CreateEventForm />
      ) : (
        <UserProfil />
      )}
    </div>
  );
};

export default Auth(UserProfilPage);
