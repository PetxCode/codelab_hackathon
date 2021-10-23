import React, { useState } from "react";
import styled from "styled-components";
import { app } from "./../../base";
import firebase from "firebase";
import imgAvatar from "./avatar.png";
import { v4 as uuid } from "uuid";
import { AiOutlineUsergroupAdd, AiFillMinusCircle } from "react-icons/ai";
import { AuthContext } from "./AuthProvider";
import { useHistory } from "react-router-dom";

export const CreateScreen = () => {
  const history = useHistory();
  const { currentUser } = React.useContext(AuthContext);
  const [projectImage, setProjectImage] = useState("");
  const [image, setImage] = useState(imgAvatar);
  const [percent, setPercent] = useState(0.00001);

  const [projectName, setProjectName] = useState("");
  const [projectDesc, setProjectDesc] = useState("");
  const [projectDate, setProjectDate] = useState("");
  const [projectTeam, setProjectTeam] = useState([
    {
      team: "",
      uid: uuid(),
    },
  ]);

  const addMoreEntry = () => {
    setProjectTeam([...projectTeam, { team: "", uid: uuid() }]);
  };

  const removeEntry = (i) => {
    const values = [...projectTeam];
    values.splice(i);
    setProjectTeam(values);
  };

  const onChangeTeam = (i, e) => {
    const values = [...projectTeam];
    values[i][e.target.name] = e.target.value;
    setProjectTeam(values);
  };

  const uploadImage = async (e) => {
    const file = e.target.files[0];
    const save = URL.createObjectURL(file);
    setImage(save);

    const fileRef = await app.storage().ref();
    const storeRef = fileRef.child("avatar/" + file.name).put(file);

    storeRef.on(
      firebase.storage.TaskEvent.STATE_CHANGED,
      (snapShot) => {
        const counter = (snapShot.bytesTransferred / snapShot.totalBytes) * 100;

        setPercent(counter);
        console.log(counter);
      },
      (err) => console.log(err.message),
      () => {
        storeRef.snapshot.ref.getDownloadURL().then((URL) => {
          setProjectImage(URL);
          console.log(URL);
        });
      }
    );
  };

  const pushToBase = async () => {
    await app.firestore().collection("project").doc().set({
      projectImage,
      projectTeam,
      projectName,
      projectDate,
      projectDesc,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      createdBy: currentUser.uid,
    });
    history.push("/");
  };

  return (
    <Container>
      <Wrapper>
        <MainComp>
          <MainContainer>
            <Card>
              <Image src={image} />
              <Label htmlFor="pix">Upload an Image</Label>
              <Input
                placeholder=""
                type="file"
                id="pix"
                onChange={uploadImage}
              />
            </Card>
            <Card>
              <Holder>
                <MainLabel>Project Name</MainLabel>
                <MainInput
                  placeholder="Enter Project Name"
                  value={projectName}
                  onChange={(e) => {
                    setProjectName(e.target.value);
                  }}
                />
              </Holder>
              <Holder>
                <MainLabel>Project Description</MainLabel>
                <MainInput
                  placeholder="Enter Project Description"
                  value={projectDesc}
                  onChange={(e) => {
                    setProjectDesc(e.target.value);
                  }}
                />
              </Holder>
              <Holder>
                <MainLabel>Project Deadline</MainLabel>
                <MainInput
                  placeholder="Enter Project Deadline"
                  value={projectDate}
                  onChange={(e) => {
                    setProjectDate(e.target.value);
                  }}
                />
              </Holder>

              <Holder>
                <MainLabel>Project Team Members</MainLabel>

                {projectTeam?.map((props, i) => (
                  <HolderRow key={i}>
                    <MainInput1
                      placeholder="Enter Project team members"
                      name="team"
                      value={props.projectTeam}
                      onChange={(e) => {
                        onChangeTeam(i, e);
                      }}
                    />
                    {projectTeam.length < 5 ? (
                      <Icons bg="green" onClick={addMoreEntry}>
                        <AiOutlineUsergroupAdd />
                      </Icons>
                    ) : null}

                    {projectTeam.length > 1 ? (
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

              <ButtonB>
                <Button bg="#004080" onClick={pushToBase}>
                  Add Project
                </Button>
              </ButtonB>
            </Card>
          </MainContainer>
        </MainComp>
      </Wrapper>
    </Container>
  );
};

const Icons = styled.div`
  cursor: pointer;
  color: ${({ bg }) => bg};
  font-size: 20px;
`;
const HolderRow = styled.div`
  width: 320px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 60%;
`;

const MainInput1 = styled.input`
  margin: 5px 0;
  padding-left: 10px;
  width: 250px;
  height: 40px;
  outline: none;
  border: 1px solid lightgray;
  border-radius: 3px;
  margin-bottom: 0px;
`;

const ButtonB = styled.div`
  width: 100%;
  justify-content: center;
  display: flex;
  margin-top: 60px;
`;

const Button = styled.div`
  width: 300px;
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

const Form = styled.div`
  padding: 30px 40px;
  box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px,
    rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;

  border-radius: 5px;
`;
const Holder = styled.div`
  display: flex;
  flex-direction: column;
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

const Label = styled.label`
  margin: 20px 0;
  background-color: #004080;
  color: white;
  padding: 15px 30px;
  border-radius: 40px;
  font-weight: bold;
  :hover {
    cursor: pointer;
  }
`;
const Input = styled.input`
  display: none;
`;

const Image = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 50%;
  border: 1px solid lightgray;
`;

const Card = styled.div`
  padding-top: 30px;
  padding-bottom: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 500px;
  height: 100%;
  box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px,
    rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;
  margin: 10px;
  border-radius: 5px;
`;

const MainContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
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
