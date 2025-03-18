import { useGetOpportunitysQuery } from "@/services/opportunity.api";
import styles from "./Opportunity.module.css";
import Div from "../animation/Div";

export default function Opportunity() {
  const { data, isLoading } = useGetOpportunitysQuery(undefined);
  return (
    <div className={styles.opportunity_box}>
      <Div direction="left">
        <h1 className={styles.opportunity_title}>
          Earning Opportunity with BankersKlub
        </h1>
      </Div>

      <hr />
      <div>
        {!isLoading &&
          data?.data?.map(
            (data: { id: number; title: string; description: string }) => (
              <Div key={data.id} delay={data.id * 0.3} direction="right">
                <div key={data.id} className={styles.opportunity_card}>
                  <h3>{data.title}</h3>
                  <p>{data.description}</p>
                  <button>Read More</button>
                </div>
              </Div>
            )
          )}
      </div>
    </div>
  );
}
