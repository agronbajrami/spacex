import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import image from "./spacex-falcon-9-bangabandhu-flickr.jpg";
import styles from "./Cards.module.scss";
import { Link } from "react-router-dom";

const Cards = (props) => {
  return (
    <>
      {props.data?.map((launch) => (
        <Link
          to={`mission/${launch.id}`}
          key={launch.id}
          className={styles.noDecoration}
        >
          <Card className={styles.card}>
            <CardActionArea>
              <CardMedia
                component="img"
                style={{ width: "100%", height: "200px" }}
                image={launch.ships[0]?.image || image}
                alt="Space X Rocket"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {launch.mission_name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {launch.launch_site?.site_name_long}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Link>
      ))}
    </>
  );
};

export default Cards;
