import React, { useState, useEffect } from "react";
import styled from "styled-components";
import TeamProfile from "./TeamProfile";
import { app } from "./../../base";
import { Link } from "react-router-dom";

export const HomeScreen = () => {
  const [data, setData] = useState([]);
  const getData = async () => {
    await app
      .firestore()
      .collection("project")
      .onSnapshot((snapshot) => {
        const r = [];
        snapshot.forEach((doc) => {
          r.push({ ...doc.data(), id: doc.id });
        });
        setData(r);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Container>
      <Wrapper>
        <MainComp>
          {data?.map((props, i) => (
            <Card key={i} to={`/detail/${props.id}`}>
              <Image src={props.projectImage} />
              <Title>{props.projectName}</Title>
              <Wrap>
                <Desc>{props.projectDesc}</Desc>
              </Wrap>
              <div>
                {props.projectTeam?.map((props) => (
                  <Team>
                    <TeamProfile img name team={props.team} />
                  </Team>
                ))}
              </div>
            </Card>
          ))}
        </MainComp>
      </Wrapper>
    </Container>
  );
};

// const Card = styled.div``

const Wrap = styled.div`
  width: 100%;
  justify-content: flex-start;
  margin-top: 10px;
  margin-left: 10px;
`;

const Image = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  margin-bottom: 20px;
`;
const Title = styled.div`
  font-weight: bold;
`;
const Desc = styled.div`
  margin-bottom: 30px;
`;
const Team = styled.div`
  display: flex;
  width: 300px;
  justify-content: center;
`;

const Card = styled(Link)`
  /* padding-top: 30px; */
  text-decoration: none;
  color: black;
  padding-bottom: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 300px;
  min-height: 200px;
  height: 100%;
  box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px,
    rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;
  margin: 10px;
  border-radius: 5px;
  overflow: hidden;
`;

const MainComp = styled.div`
  width: 80%;
  min-height: 80vh;
  height: 100%;
  background-color: white;
  border-radius: 10px;
  align-items: center;
  display: flex;
  flex-direction: column;
  box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px,
    rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;
`;
const Wrapper = styled.div`
  min-height: 90vh;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  padding-top: 100px;
  width: 100%;
  min-height: 90vh;
  height: 100%;
`;
