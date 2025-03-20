import Image from "next/image";
import SocialMedia from "../socialMedia";
import styles from "./Hero.module.css";
import Button from "../animation/Button";
import Div from "../animation/Div";
import TypingText from "../animation/Text";
import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
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
  const getRandomPosition = () => ({
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
  });
  const [bg, setBg] = useState<"white" | "purple">("white");
  const getRandomColor = () => {
    const colors = [
      "#FF5733",
      "#33FF57",
      "#3357FF",
      "#FF33A1",
      "#A133FF",
      "#FF8C00",
      "#00CED1",
      "#FFD700",
      "#FF4500",
      "#00FF7F",
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const NUM_SPOTS = 7;

  const [spots, setSpots] = useState(
    Array.from({ length: NUM_SPOTS }, () => ({
      position: getRandomPosition(),
      color: getRandomColor(),
    }))
  );

  const toggleColor = useCallback(() => {
    if (active === "CORPORATIONS") {
      setBg("white");
      setSpots(
        Array.from({ length: NUM_SPOTS }, () => ({
          position: getRandomPosition(),
          color: getRandomColor(),
        }))
      );
    } else {
      setBg("purple");
      setSpots([]);
    }
  }, [active]);

  useEffect(() => {
    toggleColor();
  }, [active, toggleColor]);

  useEffect(() => {
    const interval = setInterval(() => {
      setSpots(
        spots.map(() => ({
          position: getRandomPosition(),
          color: getRandomColor(),
        }))
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [spots]);

  return (
    <div className={`${styles.hero_container} ${styles[bg]}`}>
      {spots.map((spot, index) => (
        <motion.div
          key={index}
          className={styles.spot}
          style={{ backgroundColor: spot.color }}
          animate={spot.position}
          transition={{ duration: 4, ease: "easeInOut" }}
        />
      ))}
      <div className={styles.hero}>
        <div className={styles.hero_head}>
          <div>
            <TypingText className={active} text={title} speed={100} />
            <Div delay={2} direction="left">
              <h2 className={styles.description}>{description}</h2>
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
