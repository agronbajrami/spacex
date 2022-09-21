import styles from "./Header.module.scss";
import image from "./spacex-logo-big.png";
import { Link } from "react-router-dom";
const Header = () => {
  return (
    <div className={styles.head}>
      <Link to="/">
        <img src={image} alt="" className={styles.logo} />
      </Link>
    </div>
  );
};

export default Header;
