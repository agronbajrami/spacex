import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";
import ReactPlayer from "react-player";
import styles from "./Rockets.module.scss";
import { FirebaseContext } from "../../context/firebase";
import { Card, CardContent, TextField } from "@mui/material";
const QUERY = gql`
  query ($id: ID!) {
    launch(id: $id) {
      id
      launch_site {
        site_id
        site_name_long
        site_name
      }
      details
      links {
        article_link
        video_link
      }
      mission_name
      rocket {
        rocket_name
        rocket_type
        rocket {
          description
          engines {
            type
            engine_loss_max
            version
          }
        }
      }
    }
  }
`;
const Rockets = ({ app }) => {
  const { id } = useParams();
  const { firebase } = useContext(FirebaseContext);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const { data } = useQuery(QUERY, {
    variables: {
      id: id,
    },
  });

  useEffect(() => {
    firebase
      .firestore()
      .collection("comments")
      .where("missionId", "==", id)
      .get()
      .then((snapshot) => {
        const allContent = snapshot.docs.map((contentObj) => ({
          ...contentObj.data(),
        }));
        console.log(allContent);
        setComments(allContent);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, [firebase, id]);
  const rocketData = data?.launch;

  const submitCommentHandler = () => {
    firebase
      .firestore()
      .collection("comments")
      .add({ missionId: id, comment: comment })
      .then(() => {
        console.log(`Comment successfully added!`);
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
    setComments((prevComments) => [
      { missionId: id, comment: comment },
      ...prevComments,
    ]);
    setComment("");
  };

  return (
    <div className={styles.rocket_content}>
      <div className={styles.rocket_data}>
        <div>
          <ReactPlayer url={rocketData?.links?.video_link} controls />
        </div>
        <h1 style={{ textAlign: "center", fontSize: "3rem" }}>
          {rocketData?.rocket?.rocket_name}
        </h1>
        <h3>
          {rocketData?.rocket?.rocket?.description}
          {rocketData?.details}
        </h3>
        <h3>Rocket Type: {rocketData?.rocket?.rocket_type}</h3>
        <h3>Rocket Engine Type: {rocketData?.rocket?.rocket?.engines?.type}</h3>
        <h3>
          Rocket Engine Version: {rocketData?.rocket?.rocket?.engines?.version}
        </h3>
        <h3>
          Rocket Engine loss max:{" "}
          {rocketData?.rocket?.rocket?.engines?.engine_loss_max}
        </h3>
      </div>

      <div>
        <TextField
          label="Add comment..."
          multiline
          rows={4}
          variant="filled"
          style={{ width: "20rem", background: "white" }}
          value={comment}
          onChange={(e) => setComment(e.currentTarget.value)}
        />
        <br />
        <button
          className={styles.submit_comment}
          onClick={submitCommentHandler}
        >
          Submit
        </button>
        <div>
          <h3 style={{ color: "white" }}>Comments:</h3>
          {comments.map((comment) => (
            <Card
              key={comment.missionId + comment.comment}
              style={{ border: "1px solid black" }}
            >
              <CardContent>{comment.comment}</CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Rockets;
