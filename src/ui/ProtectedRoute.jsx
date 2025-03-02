function ProtectedRoute({ children }) {
  // 1) load the user

  // 2) while loading, show a spinner

  // 3) if NOT authenticated, return to /login page

  // 4) if there is such a user, render the app
  return children;
}

export default ProtectedRoute;
