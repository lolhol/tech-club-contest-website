import { motion } from "framer-motion";
import styles from "./HeartAnimation.module.css";

export function HeartAnimation(props: { score: number }) {
  return (
    <div
      className={`${styles.container} w-60 flex items-center justify-center overflow-hidden`}
    >
      {Array.from({ length: props.score }, (_, index) => {
        const visibility = index < props.score;
        const heartOpacity = visibility ? 0.7 + (index + 1) * 0.03 : 0.1;
        const heartColor = `rgba(255, ${20 + index * 20}, ${
          20 + index * 20
        }, ${heartOpacity})`; // Bright red with increasing visibility

        return (
          <motion.div
            key={index}
            className={`${styles.heart}`}
            style={{ color: heartColor }}
            animate={{
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 0.8,
              repeat: Infinity,
              repeatType: "mirror",
              delay: index * 0.1, // Slightly faster stagger
            }}
          >
            ❤️
          </motion.div>
        );
      })}
    </div>
  );
}
