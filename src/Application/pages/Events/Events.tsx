import Auth from "../../../Module/auth";
import { SearchEventForm } from "../../componants/event/SearchEventForm";
import { SearchEventResults } from "../../componants/event/SearchEventResults";

const Events = () => {
  return (
    <div>
      <SearchEventForm />
      <SearchEventResults />
    </div>
  );
};

export default Auth(Events);
