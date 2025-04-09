import styles from "./navbar.module.scss";
import { Logo } from "@app/components/logo/logo";
import { MobileMenu } from "@app/components/mobile-menu/mobile-menu";

export const Navbar = () => {
  return (
    <nav className={styles["navbar"]}>
      <div className={styles["navbar-body"]}>
        <div className={styles["logo-container"]}>
          <Logo />
        </div>
        <MobileMenu />
      </div>
    </nav>
  );
};
