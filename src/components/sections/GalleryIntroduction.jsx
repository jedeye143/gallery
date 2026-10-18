import React from "react";
import ImageReveal from "../ui/ImageReveal";
import Button from "../ui/Button";
import { GALLERY_INFO } from "@/data/gallery";
import styles from "./GalleryIntroduction.module.css";

export default function GalleryIntroduction() {
  return (
    <section className={styles.introSection}>
      <div className="container-wide">
        <div className={styles.grid}>
          {/* Left Column: Image */}
          <div className={styles.imageCol}>
            <ImageReveal
              src={GALLERY_INFO.aboutImage}
              alt="Dawson Wells Gallery Architecture"
              aspectRatio="4/5"
            />
          </div>

          {/* Right Column: Editorial Text */}
          <div className={styles.textCol}>
            <span className="text-subheading">ABOUT THE GALLERY</span>
            <h2 className="heading-lg" style={{ marginTop: "0.5rem", marginBottom: "1.5rem" }}>
              A SPACE FOR CONTEMPORARY ART
            </h2>

            <p className="body-lead" style={{ marginBottom: "1.5rem" }}>
              {GALLERY_INFO.about.lead}
            </p>

            <p className="body-main" style={{ marginBottom: "2rem" }}>
              We curate eight major exhibitions annually, alongside representing an international roster of pioneering contemporary voices across photography, painting, sculpture, and ceramics.
            </p>

            <div>
              <Button href="/about" variant="outline">
                READ GALLERY STORY
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
