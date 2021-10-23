import React, { useState, useEffect } from "react";
import styled from "styled-components";
import TeamProfile from "./TeamProfile";
import { useParams } from "react-router-dom";
import { app } from "./../../base";
import { v4 as uuid } from "uuid";
import { AiOutlineUsergroupAdd, AiFillMinusCircle } from "react-icons/ai";
import firebase from "firebase";
import { AuthContext } from "./AuthProvider";
import { useDispatch, useSelector } from "react-redux";
import { addTask, addOnGoing, remove } from "../../Global/taskState";

const ProjectDatail = () => {
  const { id } = useParams();
  const { currentUser } = React.useContext(AuthContext);
  const dispatch = useDispatch();
  const taskData = useSelector((state) => state.myReducer.task);

  const [userData, setUserData] = useState([]);

  const getUserData = async (id) => {
    await app
      .firestore()
      .collection("project")
      .doc(id)
      .get()
      .then((user) => setUserData(user.data()));
  };
  const getUserTaskData = async () => {
    await app
      .firestore()
      .collection("project")
      .doc(id)
      .collection("task")
      .onSnapshot((snapShot) => {
        const r = [];
        snapShot.forEach((doc) => {
          r.push({ ...doc.data(), id: doc.id });
        });
        dispatch(addTask(r));
      });
  };

  const [projectTask, setProjectTask] = useState([
    {
      task: "",
      team: "",
      uid: uuid(),
    },
  ]);

  const addMoreEntry = () => {
    setProjectTask([...projectTask, { task: "", team: "", uid: uuid() }]);
  };

  const removeEntry = (i) => {
    const values = [...projectTask];
    values.splice(i);
    setProjectTask(values);
  };

  const onChangeTeam = (i, e) => {
    const values = [...projectTask];
    values[i][e.target.name] = e.target.value;
    setProjectTask(values);
  };

  const pushTask = async () => {
    await app
      .firestore()
      .collection("project")
      .doc(id)
      .collection("task")
      .doc()
      .set({
        projectTask,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        createdBy: currentUser.uid,
      });
  };

  useEffect(() => {
    getUserData(id);
    getUserTaskData();
  }, []);

  return (
    <Container>
      <Wrapper>
        <MainComp>
          <Card>
            <Title>Enter the Project</Title>

            <Holder>
              <MainLabel>Team Members</MainLabel>

              {userData.projectTeam?.map((props) => (
                <TeamProfile img uid team={props.team} />
              ))}
            </Holder>

            <Holder>
              <Holder>
                <MainLabel>Project Team Members</MainLabel>

                {projectTask?.map((props, i) => (
                  <HolderRow key={i}>
                    <MainInput1
                      placeholder="Enter Project Tesk"
                      name="task"
                      value={props.projectTeam}
                      onChange={(e) => {
                        onChangeTeam(i, e);
                      }}
                    />
                    <MainInput1
                      placeholder="Enter Project team members"
                      name="team"
                      value={props.projectTeam}
                      onChange={(e) => {
                        onChangeTeam(i, e);
                      }}
                    />
                    {projectTask.length < 5 ? (
                      <Icons bg="green" onClick={addMoreEntry}>
                        <AiOutlineUsergroupAdd />
                      </Icons>
                    ) : null}

                    {projectTask.length > 1 ? (
                      <Icons
                        bg="red"
                        onClick={() => {
                          removeEntry(i);
                        }}
                      >
                        <AiFillMinusCircle />
                      </Icons>
                    ) : null}
                  </HolderRow>
                ))}
              </Holder>

              <Holder>
                <Button
                  bg="red"
                  onClick={() => {
                    pushTask();
                    console.log("Hello");
                  }}
                >
                  Enter
                </Button>
              </Holder>
            </Holder>
          </Card>

          {taskData?.map((props) => (
            <Card>
              {props.projectTask.map((props) => (
                <div>
                  <div>{props.task}</div>
                  <div>
                    <TeamProfile img team={props.team} />{" "}
                  </div>
                  <button
                    onClick={() => {
                      dispatch(addOnGoing(props));
                      dispatch(remove(props));
                    }}
                  >
                    add to on-going
                  </button>
                </div>
              ))}
            </Card>
          ))}

          <Card>
            <div>
              <div>task</div>
              <div>who</div>
            </div>
          </Card>
        </MainComp>
      </Wrapper>
    </Container>
  );
};

export default ProjectDatail;

const Icons = styled.div`
  cursor: pointer;
  color: ${({ bg }) => bg};
  font-size: 20px;
`;

const HolderRow = styled.div`
  width: 320px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 60%;
`;

const MainInput1 = styled.input`
  margin: 5px 0;
  padding-left: 10px;
  width: 90%;
  height: 40px;
  outline: none;
  border: 1px solid lightgray;
  border-radius: 3px;
  margin-bottom: 0px;
`;

const Title = styled.div`
  font-weight: bold;
`;

const Holder = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  margin-left: 20px;
`;
const MainLabel = styled.label`
  font-weight: bold;
  font-size: 12px;
  color: #004080;
`;
const MainInput = styled.input`
  padding-left: 10px;
  width: 300px;
  height: 40px;
  outline: none;
  border: 1px solid lightgray;
  border-radius: 3px;
  margin-bottom: 20px;
`;

const Button = styled.div`
  width: 80%;
  height: 50px;
  background-color: ${({ bg }) => bg};
  justify-content: center;
  display: flex;
  align-items: center;
  color: white;
  border-radius: 5px;
  transition: all 350ms;
  transform: scale(1);

  :hover {
    cursor: pointer;
    transform: scale(0.97);
  }
`;

const Card = styled.div`
  /* padding-top: 30px; */
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
  justify-content: center;
  /* flex-direction: column; */
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
