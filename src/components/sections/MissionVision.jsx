import React from "react";
import { GALLERY_INFO } from "@/data/gallery";
import styles from "./MissionVision.module.css";

export default function MissionVision() {
  return (
    <section className="section-padding">
      <div className="container-wide">
        <div className={styles.grid}>
          {/* Mission */}
          <div className={styles.card}>
            <span className="caption">OUR PURPOSE</span>
            <h3 className="heading-md" style={{ marginTop: "0.5rem", marginBottom: "1rem" }}>
              {GALLERY_INFO.mission.title}
            </h3>
            <p className="body-lead" style={{ fontSize: "1.05rem" }}>
              {GALLERY_INFO.mission.text}
            </p>
          </div>

          {/* Divider */}
          <div className={styles.verticalDivider} />

          {/* Vision */}
          <div className={styles.card}>
            <span className="caption">OUR COMMITMENT</span>
            <h3 className="heading-md" style={{ marginTop: "0.5rem", marginBottom: "1rem" }}>
              {GALLERY_INFO.vision.title}
            </h3>
            <p className="body-lead" style={{ fontSize: "1.05rem" }}>
              {GALLERY_INFO.vision.text}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
