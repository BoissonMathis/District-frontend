import { useState } from "react";
import { AxiosService } from "../../../Infrastructure/Http/axios.service";
import { useUserToken } from "../../../Module/Observable/userConnected/UserToken.observable";

type CommentModalProps = {
  post_id: string;
  user_id: string;
  comment_id?: string;
  onSuccess: () => void;
};

export function CommentModal(props: CommentModalProps) {
  const [contentText, setContentText] = useState("");
  const post_id = props.post_id;
  const user_id = props.user_id;
  const comment_id = props.comment_id && props.comment_id;
  const token = useUserToken();

  const handleCommentPost = async () => {
    if (contentText !== "" && token) {
      try {
        const response = await AxiosService.postOneComment(
          user_id,
          post_id,
          token,
          contentText
        );
        console.log("response comment =>", response);
        if (response.status === 201) {
          console.log("Commentaire posté avec succès");
          props.onSuccess();
        }
      } catch (e: any) {
        console.log("ERROR:", e);
      }
    } else {
      console.log("Vous ne pouvez pas poster de commentaire vide");
    }
  };

  return (
    <div className="flex h-6 w-full bg-brown">
      <div>
        <label htmlFor=""></label>
        <input
          type="text"
          placeholder="Poster un commentaire ..."
          value={contentText}
          onChange={(e) => {
            setContentText(e.currentTarget.value);
          }}
        />
      </div>
      <button onClick={() => handleCommentPost()}>Poster</button>
    </div>
  );
}
