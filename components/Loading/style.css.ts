import { theme, font, flex } from "@/styles";
import { style, keyframes } from "@vanilla-extract/css";

export const spinnerPulse = keyframes({
  "0%": { backgroundPosition: "0 0, 0 100%, 100% 100%" },
  "25%": { backgroundPosition: "100% 0, 0 100%, 100% 100%" },
  "50%": { backgroundPosition: "100% 0, 0 0, 100% 100%" },
  "75%": { backgroundPosition: "100% 0, 0 0, 0 100%" },
  "100%": { backgroundPosition: "100% 100%, 0 0, 0 100%" },
});

export const fadeIn = keyframes({
  from: { opacity: 0 },
  to: { opacity: 1 },
});

export const fadeOut = keyframes({
  "0%": { opacity: 1 },
  "100%": { opacity: 0 },
});

export const textFadeIn = keyframes({
  from: { opacity: 0, transform: 'translateY(10px)' },
  to: { opacity: 1, transform: 'translateY(0)' },
});

export const loading = {
  overlay: style({
    width: "100%",
    minHeight: "100vh",
    ...flex.CENTER,
    position: "fixed",
    top: 0,
    left: 0,
    background: "rgb(0, 0, 0, 0.1)",
    backdropFilter: "blur(2px)",
    zIndex: 9999,
  }),
  fadeIn: style({
    animation: `${fadeIn} 0.3s ease forwards`,
  }),
  fadeOut: style({
    animation: `${fadeOut} 0.2s ease-out forwards`,
  }),
  spinner: style({
    width: "85px",
    aspectRatio: "1",
    background: `
      radial-gradient(farthest-side, transparent calc(95% - 3px), ${theme.purple} calc(100% - 3px) 98%, transparent 101%) no-repeat,
      radial-gradient(farthest-side, transparent calc(95% - 3px), ${theme.purple} calc(100% - 3px) 98%, transparent 101%) no-repeat,
      radial-gradient(farthest-side, transparent calc(95% - 3px), ${theme.purple} calc(100% - 3px) 98%, transparent 101%) no-repeat
    `,
    backgroundSize: "40px 40px",
    animation: `${spinnerPulse} 1.8s infinite`,
  }),
  container: style({
    ...flex.COLUMN_CENTER,
    gap: "10px",
  }),
  progressBox: style({
    width: "300px",
    height: "8px",
    background: "rgba(255, 255, 255, 0.2)",
    borderRadius: "4px",
    overflow: "hidden",
    boxShadow: `0 2px 4px ${theme.shadow}`,
  }),
  progressBar: style({
    height: "100%",
    background: theme.gradient,
    borderRadius: "4px",
    transition: "width 0.3s ease",
  }),
  progressText: style({
    color: theme.black,
    ...font.H6,
    textAlign: "center",
    textShadow: `0 1px 2px ${theme.shadow}`,
    opacity: 0,
  }),
  textFadeIn: style({
    animation: `${textFadeIn} 0.3s ease forwards`,
  }),
};
