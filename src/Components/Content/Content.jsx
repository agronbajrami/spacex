import Cards from "../Card/Cards";
import styles from "./Content.module.scss";
import { gql, useQuery } from "@apollo/client";

const FEED_QUERY = gql`
  query Feed($offset: Int, $limit: Int) {
    launchesPast(offset: $offset, limit: $limit) {
      id
      mission_name
      launch_date_local
      launch_site {
        site_name_long
      }
      links {
        article_link
        video_link
      }
      ships {
        name
        home_port
        image
      }
    }
  }
`;

const Content = () => {
  const { data, fetchMore } = useQuery(FEED_QUERY, {
    variables: {
      offset: 0,
      limit: 10,
    },
  });

  const loadMoreLaunches = () => {
    fetchMore({
      variables: {
        offset: data.launchesPast.length,
      },
    });
  };

  return (
    <div className={styles.all_cards}>
      <div className={styles.content_cards}>
        <Cards data={data?.launchesPast || []} />
      </div>
      <div className={styles.button_positioning}>
        <button onClick={loadMoreLaunches} className={styles.load_more}>
          Load More
        </button>
      </div>
    </div>
  );
};

export default Content;
