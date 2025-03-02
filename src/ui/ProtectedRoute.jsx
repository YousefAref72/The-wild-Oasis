import styled from "styled-components";
import useUser from "../features/authentication/useUser";
import Spinner from "./Spinner";
import { redirect, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const FullPage = styled.div`
  height: 100 vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`;

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  // 1) load the user
  const { user, isLoading } = useUser();
  // 2) if NOT authenticated, return to /login page
  //calling it in useEffect cuz of navigate

  useEffect(
    function () {
      if (!user && !isLoading) {
        navigate("/login");
      }
    },
    [isLoading, user, navigate]
  );
  // 3) while loading, show a spinner
  if (isLoading)
    return (
      <FullPage>
        <Spinner />;
      </FullPage>
    );

  // 4) if there is such a user, render the app
  return children;
}

export default ProtectedRoute;
