import { useNavigate } from "react-router-dom";
import {
  postLogoutUser,
  useUserConnected,
} from "../../../Module/Observable/userConnected/UserConnected.observable";
import { BrownLine } from "../BrownLine";
import { FaArrowLeftLong } from "react-icons/fa6";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { IoNotificationsSharp } from "react-icons/io5";
import {
  setCurrentPage,
  useCurrentPage,
} from "../../../Module/Observable/CurrentPage.observable";
import { useUserToken } from "../../../Module/Observable/userConnected/UserToken.observable";
import { useEffect, useState, useCallback } from "react";
import { AxiosService } from "../../../Infrastructure/Http/axios.service";
import { debounce } from "lodash";
import {
  setSearchModal,
  useSearchModalStatus,
} from "../../../Module/Observable/modal/SearchResults.observable";
import { SearchModal } from "./SearchModal";
import { User } from "../../../Infrastructure/User.ts/User.type";

type SearchResult = {
  count: number;
  results: User[];
};

export function UserHeader() {
  const [searchValue, setSearchValue] = useState<string>("");
  const [searchResult, setSearchResult] = useState<SearchResult>({
    count: 0,
    results: [],
  });
  const searchModal = useSearchModalStatus();
  const userConnected = useUserConnected();
  const currentPage = useCurrentPage();
  const token = useUserToken() || localStorage.token;
  const navigate = useNavigate();

  const handleSearch = useCallback(
    debounce(async (value: string) => {
      try {
        const response = await AxiosService.getUsersByFilter(
          token,
          1,
          5,
          value
        );
        console.log("RESPONSE =>", response);
        setSearchResult(response.data);
      } catch (error) {
        console.error("ERRORS =>", error);
      }
    }, 300),
    [token?.token]
  );

  useEffect(() => {
    console.log(token);
    if (searchValue.trim()) {
      handleSearch(searchValue);
    }
  }, [searchValue, handleSearch]);

  useEffect(() => {
    if (searchValue.trim() !== "" && !searchModal) {
      setSearchModal();
    } else if (searchValue.trim() == "" && searchModal) {
      setSearchModal();
    }
  }, [searchValue]);

  return (
    <div>
      {currentPage !== "/" && (
        <FaArrowLeftLong
          className="absolute left-24 top-8 w-24 h-8 cursor-pointer"
          onClick={() => {
            navigate(-1);
          }}
        />
      )}
      <div className="flex gap-6 items-center justify-center pt-6 pb-6">
        <div>
          <img
            src={userConnected.profil_image}
            alt="Photo de profil de l'utilisateur"
            className="user-profil-picture-xl cursor-pointer"
            onClick={() => {
              navigate(`/profil/${userConnected._id}`);
              setCurrentPage("profil");
            }}
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Recherche..."
            className="search-bar"
            value={searchValue}
            onChange={(e) => setSearchValue(e.currentTarget.value)}
          />
          {searchModal && <SearchModal results={searchResult?.results} />}
        </div>
        <div className="flex gap-8 absolute right-16">
          <IoNotificationsSharp className="h-8 w-8 cursor-pointer" />
          <RiLogoutCircleRLine
            className="h-8 w-8 cursor-pointer"
            onClick={() => {
              postLogoutUser(userConnected._id, token!);
              // navigate("/login");
            }}
          />
        </div>
      </div>
      <BrownLine />
    </div>
  );
}
