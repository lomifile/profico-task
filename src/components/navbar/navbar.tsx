import styles from "./navbar.module.scss";
import { Logo } from "@app/components/logo/logo";
import { MobileMenu } from "@app/components/mobile-menu/mobile-menu";
import { Button } from "@app/ui/button/button";

export const Navbar = () => {
  return (
    <nav className={styles["navbar"]}>
      <div className={styles["navbar-body"]}>
        <div className={styles["logo-container"]}>
          <Logo />
        </div>
        <div className={styles["navbar-content"]}>
          <div className={styles["background"]} />
          <div className={styles["notification"]}>
            <h3>Make MyNews your homepage</h3>
            <span>Every day discover what’s trending on the internet!</span>
          </div>
          <div className={styles["buttons"]}>
            <Button color="transparent" className={styles["no-thanks-button"]}>
              No, thanks
            </Button>
            <Button className={styles["get-button"]} color="white">
              Get
            </Button>
          </div>
        </div>
        <MobileMenu />
      </div>
    </nav>
  );
};
