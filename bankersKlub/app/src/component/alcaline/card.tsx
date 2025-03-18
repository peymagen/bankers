import style from "./alcaline.module.css";

export default function AlcalineCard({ alcaline }: { alcaline: IAdvantage }) {
  return (
    <div className={style.alter}>
      <div className={style.vertical_line}></div>
      <div className={style.box}>
        <b>
          <span className={style.green}>#{alcaline?.id}</span> {alcaline?.title}
        </b>
        <p>{alcaline?.description}</p>
      </div>
    </div>
  );
}
