export const getAccessToken = () => {
  const accessToken = localStorage.getItem("accessToken");

  if (!accessToken) {
    return null;
  }

  return accessToken;
};

export const getProviderId = () => {
  const infoUser = localStorage.getItem("infoUser");

  if (!infoUser) {
    return null;
  }

  const providerId = JSON.parse(infoUser)?.provider?.providerId;

  return providerId;
};
