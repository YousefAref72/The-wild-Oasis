import ButtonIcon from "../../ui/ButtonIcon";
import { HiArrowRightOnRectangle } from "react-icons/hi2";
import useLogout from "./useLogout";
import Spinner from "../../ui/Spinner";

function Logout() {
  const { logout, isLoggingOut } = useLogout();
  // function handleLogout() {
  //   logout();
  // }
  if (isLoggingOut) {
    return <Spinner />;
  }
  return (
    <ButtonIcon onClick={logout}>
      <HiArrowRightOnRectangle />
    </ButtonIcon>
  );
}

export default Logout;
