import Image from "next/image";
import SocialMedia from "../socialMedia";
import styles from "./Hero.module.css";
import Button from "../animation/Button";
import Div from "../animation/Div";
import TypingText from "../animation/Text";
interface HeroProps {
  title: string;
  description: string;
  active: "CORPORATIONS" | "BANKERS";
  setActive: (value: "CORPORATIONS" | "BANKERS") => void;
  banner: string;
}

export default function Hero({
  title,
  description,
  active,
  setActive,
  banner,
}: HeroProps) {
  return (
    <div className={styles.hero_container}>
      <div className={styles.hero}>
        <div className={styles.hero_head}>
          <div>
            <TypingText className={active} text={title} speed={100} />
            <Div delay={2} direction="left">
              <p className={styles.description}>{description}</p>
            </Div>
          </div>
          <Div direction="right" duration={1} delay={3}>
            <Image
              src={process.env.NEXT_PUBLIC_BACKEND_API_URL + banner}
              alt={title}
              className={styles.hero_banner}
              height={400}
              width={400}
            />
          </Div>
        </div>
        <div className={styles.hero_content}>
          <Div direction="left" duration={1} delay={2}>
            <div className={styles.btnGroup}>
              <button
                onClick={() => setActive("CORPORATIONS")}
                className={active === "CORPORATIONS" ? styles.active : ""}
              >
                For Corporate
              </button>
              <button
                onClick={() => setActive("BANKERS")}
                className={active === "BANKERS" ? styles.active : ""}
              >
                For Banker
              </button>
            </div>
          </Div>
          <Div delay={3}>
            <div className={styles.start_content}>
              <Button className="secondary" outline={false}>
                Get Started
              </Button>
              <SocialMedia size="large" />
            </div>
          </Div>
        </div>
      </div>
    </div>
  );
}
