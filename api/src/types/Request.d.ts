type AuthenticatedControllerQuery = {
  session: string;
};

type LogoutControllerQuery = AuthenticatedControllerQuery;

type UserControllerQuery = AuthenticatedControllerQuery;

type LoginCompleteControllerQuery = {
  code?: string;
  error?: string;
  state?: string;
};
