import { useRouter } from "next/navigation";
import styles from "./Card.module.css";
import Button from "@/component/animation/Button";
interface ServiceCardProps {
  active: boolean;
  d: IService;
}

export default function ServiceCard({ active, d }: ServiceCardProps) {
  const route = useRouter();
  return (
    <div className={`${styles.card} ${active ? styles.activeCard : ""}`}>
      <h2 className={styles.title}>{d.title}</h2>
      <p className={styles.description}>{d.description}</p>
      {d?.quotes && d.quotes.length > 0 && (
        <Button
          onClick={() =>
            route.replace(
              "./services/" + d.title.toLowerCase().replace(/ /g, "-")
            )
          }
          className="secondary"
        >
          Read More
        </Button>
      )}
    </div>
  );
}
