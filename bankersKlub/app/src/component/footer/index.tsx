import Image from "next/image";
import style from "./footer.module.css";
import SocialMedia from "../socialMedia";
import Div from "../animation/Div";
export default function Footer() {
  const link = (
    <ul className={style.link}>
      <li>Link1</li>
      <li>Link2</li>
      <li>Link3</li>
      <li>Link4</li>
      <li>Link5</li>
      <li>Link6</li>
    </ul>
  );
  return (
    <Div delay={0.5}>
      <div className={style.footer}>
        <div className={style.img}>
          <Image
            src="/bankerKlub-logo.svg"
            alt="logo"
            width={180}
            height={38}
            priority
          />
        </div>
        <div className={style.right_block}>
          <div className={style.links}>
            <div className={style.gap_flex_block}>{link}</div>
            <div className={style.gap_flex_block}>{link}</div>
          </div>
          <div className={style.gap_flex_block}>
            <h3>Get notification</h3>
            <p>The latest news, articles, sent to your inbox weekly.</p>
            <div className={style.subscription_box}>
              <input
                placeholder="Email Address"
                className={style.subscription_input}
              />
              <button className={style.subscription_btn}>Subscribe</button>
            </div>
          </div>
        </div>
      </div>
      <hr className={style.hr} />
      <div className={style.lower_footer}>
        <p>BankersKlub 2024 - A Unit of ReAttire India Pvt Ltd</p>
        <div>
          <SocialMedia size="small" />
        </div>
      </div>
    </Div>
  );
}
