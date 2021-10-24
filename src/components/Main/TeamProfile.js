import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { app } from "./../../base";

const TeamProfile = ({ uid, img, name, team }) => {
  const [myUser, setMyUser] = useState([]);

  const getUser = async () => {
    await app
      .firestore()
      .collection("users")
      .doc(team)
      .get()
      .then((user) => setMyUser(user.data()));
  };

  useEffect(() => {
    getUser();
    console.log(myUser);
  }, [team]);

  return (
    <Container>
      <Wrapper>
        {img ? <Image src={myUser?.avatar} /> : null}
        {name ? <Title>{myUser?.name}</Title> : null}
        {uid ? <Desc>{myUser?.createdBy}</Desc> : null}
      </Wrapper>
    </Container>
  );
};

export default TeamProfile;

const Image = styled.img`
  margin: 5px;
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 50%;
  background-color: red;
`;
const Title = styled.div``;
const Desc = styled.div`
  font-size: 10px;
  opacity: 0;

  :hover {
    opacity: 1;
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const Container = styled.div`
  width: 100%;
  display: flex;
`;
