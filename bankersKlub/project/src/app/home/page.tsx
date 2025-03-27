import Slider from "@/components/sliders";
import Styles from "./home.module.css";
import Image from "next/image";
import TextHighligter from "@/components/textHighlighter";
import VideoTemplate from "@/components/videoTemplate";

export default function Home() {
  return (
    <>
      <div className={Styles.header}>
        <div className={Styles.links}>
          <Image
            src="./bankerKlub-logo.svg"
            width={100}
            height={20}
            alt="logo"
          />
          <p>for Bankers</p>
          <p>for Corporations</p>
          <p>Services</p>
        </div>
        <div className={Styles.buttons}>
          <button>Login</button>
          <button>Signup</button>
        </div>
      </div>

      <div className={Styles.hero_section}>
        <h1 className={Styles.heading}>
          <span className={Styles.heading_head}>One stop solution</span>
          <br />{" "}
          <span className={Styles.heading_body}>for financial success</span>
        </h1>
        <div className={Styles.sub_heading}>
          <p>
            {
              "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
            }
          </p>
          <button className={Styles.button}>Get Started Now</button>
        </div>
        <Slider />
      </div>
      <TextHighligter text="Traditional wealth management is broken & you need a better way to manage your money. Using unbiased data driven decisions, we ensure your investment journey is successful so you can focus on what matters most to you" />
      <VideoTemplate data="https://api-bankers.basukalaiti.com/uploads/video-1739210436340.mp4" />
    </>
  );
}
