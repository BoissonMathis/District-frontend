import { UserProfil } from "../componants/user/UserProfil";
import { UpdateUserForm } from "../componants/user/UpdateUserForm";
import { useUpdateFormUser } from "../../Module/Observable/modal/UpdateFormUser.observable";

export function UserProfilPage() {
  const updateFormOpen = useUpdateFormUser();

  return (
    <div className="flex-1">
      {updateFormOpen ? <UpdateUserForm /> : <UserProfil />}
    </div>
  );
}
