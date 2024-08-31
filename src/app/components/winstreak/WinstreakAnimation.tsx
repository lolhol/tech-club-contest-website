import { motion } from "framer-motion";
import styles from "./WinstreakAnimation.module.css";

export function WinstreakAnimation(props: {
  winstreak: number;
  data?: string;
}) {
  // Calculate brightness and color based on the winstreak value
  const brightness = Math.min(props.winstreak / 10, 1);
  const color = `rgba(${255 - brightness * 55}, ${
    brightness * 200
  }, 255, ${brightness})`; // Whitish blue to bright blue

  return (
    <div
      className={`${styles.container} flex items-center justify-center`}
      style={{
        width: "150px", // Fixed width
        height: "150px", // Fixed height
        overflow: "hidden", // Hide overflow
        filter: `brightness(${brightness + 0.5})`, // Brightness adjustment
      }}
      data-intro={props.data}
    >
      <svg className={styles.fireSvg} viewBox="0 0 64 64">
        <defs>
          <radialGradient
            id="grad1"
            cx="50%"
            cy="50%"
            r="50%"
            fx="50%"
            fy="50%"
          >
            <stop offset="0%" style={{ stopColor: color, stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: color, stopOpacity: 0 }} />
          </radialGradient>
        </defs>
        <circle cx="32" cy="32" r="32" fill="url(#grad1)">
          <animate
            attributeName="r"
            values="30;35;30"
            dur="1s"
            repeatCount="indefinite"
          />
        </circle>
      </svg>
      <motion.div
        className={`${styles.winstreak} text-6xl font-bold text-white`}
        style={{
          textShadow: `0 0 10px ${color}, 0 0 20px ${color}, 0 0 30px ${color}`,
        }}
        animate={{
          textShadow: [
            `0 0 10px ${color}`,
            `0 0 20px ${color}`,
            `0 0 30px ${color}`,
            `0 0 40px ${color}`,
          ],
        }}
        transition={{
          duration: 1,
          repeat: Infinity,
          repeatType: "mirror",
        }}
      >
        {props.winstreak}
      </motion.div>
    </div>
  );
}
