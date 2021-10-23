import React, { useContext } from "react";
import { AuthContext } from "./AuthProvider";

const StatScreen = () => {
  const { currentUser } = useContext(AuthContext);
  return (
    <div style={{ padding: "150px" }}>
      <div>Your Secrete key is:</div>
      <div style={{ fontWeight: "bold", marginTop: "20px" }}>
        {currentUser.uid}
      </div>
    </div>
  );
};

export default StatScreen;
