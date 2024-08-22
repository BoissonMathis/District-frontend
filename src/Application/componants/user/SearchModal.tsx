import { useNavigate } from "react-router-dom";
import { User } from "../../../Infrastructure/User.ts/User.type";
import { setSearchModal } from "../../../Module/Observable/modal/SearchResults.observable";
import { useEffect, useRef } from "react";

type SearchModalProps = {
  results: User[];
};

export function SearchModal(props: SearchModalProps) {
  const navigate = useNavigate();
  const modalRef = useRef<HTMLDivElement>(null);
  const results = props.results;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setSearchModal();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      className="flex flex-col absolute z-10 mt-4 p-6 gap-2 border-2 rounded-xl h-fit w-1/6 border-brown b-soft-brown"
      ref={modalRef}
    >
      {results.length && results.length > 0 ? (
        <>
          <span className="flex self-center">{results.length} résultat(s)</span>

          {results.slice(0, 5).map((user) => (
            <div
              key={user._id}
              className="flex gap-4 pl-4 items-center cursor-pointer"
              onClick={() => {
                console.log(`navigation vers ${user.username}`),
                  setSearchModal(),
                  navigate(`/profil/${user._id}`);
              }}
            >
              <img
                src={user.profil_image}
                alt=""
                className="user-profil-picture-xs"
              />
              <span>
                {user.username} - {user.status}
              </span>
            </div>
          ))}
        </>
      ) : (
        <span>Aucun résultat</span>
      )}
    </div>
  );
}
