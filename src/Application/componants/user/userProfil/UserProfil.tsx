import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { UserConnectedProfil } from "../userConnected/UserConnectedProfil";
import { getUserReadOnlyPosts } from "../../../../Module/Observable/userReadOnly/UserReadOnlyPosts.observable";
import { getUserReadOnlyComments } from "../../../../Module/Observable/userReadOnly/UserReadOnlyComments.observable";
import { getUserReadOnlyEvents } from "../../../../Module/Observable/userReadOnly/UserReadOnlyEvents.observable";
import { UserReadOnlyProfil } from "../userReadOnly/UserReadOnlyProfil";

export function UserProfil() {
  const userConnectedId = localStorage.userId;
  const userConnectedToken = localStorage.token;
  const { id } = useParams<{ id: string }>();

  if (id == userConnectedId) {
    return (
      <>
        <UserConnectedProfil />
      </>
    );
  } else {
    useEffect(() => {
      getUserReadOnlyPosts(id!, userConnectedToken, 1);
      getUserReadOnlyComments(id!, userConnectedToken, 1);
      getUserReadOnlyEvents(id!, userConnectedToken, 1);
    }, []);

    return (
      <>
        <UserReadOnlyProfil userReadOnlyId={id!} />
      </>
    );
  }
}
