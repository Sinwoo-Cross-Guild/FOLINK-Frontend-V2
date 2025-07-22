import { theme, font, flex } from "@/styles";
import { keyframes, style } from "@vanilla-extract/css";

const pulse = keyframes({
  "0%": {
    backgroundColor: "rgba(165, 165, 165, 0.4)",
  },
  "50%": {
    backgroundColor: "rgba(165, 165, 165, 0.2)",
  },
  "100%": {
    backgroundColor: "rgba(165, 165, 165, 0.04)",
  },
});

export const question = {
  container: style({
    width: "100%",
    minHeight: "100%",
    position: "relative",
    ...flex.COLUMN_CENTER,
  }),
  box: style({
    width: "100%",
    maxWidth: "1200px",
    margin: "28px auto 32px auto",
    padding: "0 16px",
    gap: "24px",
    ...flex.BETWEEN,
  }),
};

export const header = {
  back: style({
    position: "absolute",
    top: "20px",
    left: "20px",
    fontSize: "30px",
    color: "#7F7F7F",
    cursor: "pointer",
    transition: "color 0.2s ease",
    selectors: {
      "&:hover": {
        color: "#333",
      },
    },
  }),
  title: style({
    ...font.H2,
  }),
  highlight: style({
    background: `${theme.gradient}`,
    WebkitBackgroundClip: "text",
    backgroundClip: "text",
    color: "transparent",
    display: "inline-block",
  }),
};

export const list = {
  body: style({
    width: "48%",
    height: "100%",
    ...flex.COLUMN_FLEX,
  }),
  header: style({
    background: `${theme.gradient}`,
    borderTopLeftRadius: "16px",
    borderTopRightRadius: "16px",
    padding: "10px 24px",
    gap: "8px",
    color: `${theme.white}`,
    overflow: "hidden",
    ...flex.BETWEEN,
    ...font.H5
  }),
  headerCount: style({
    background: `rgba(255, 255, 255, 0.15)`, 
    backdropFilter: "blur(8px)",
    padding: "4px 14px", 
    borderRadius: "20px",
    ...font.p3,
    color: `${theme.white}`,
    border: `1px solid rgba(255, 255, 255, 0.25)`, 
    boxShadow: `0 2px 6px rgba(0, 0, 0, 0.05)`, 
    transition: "all 0.2s ease",
    selectors: {
      "&:hover": {
        background: `rgba(255, 255, 255, 0.25)`,
        transform: "scale(1.03)",
        boxShadow: `0 4px 8px rgba(0, 0, 0, 0.1)`,
      },
    },
  }),
  container: style({
    width: "100%",
    height: "100%",
    background: `${theme.white}`,
    borderBottomLeftRadius: "16px",
    borderBottomRightRadius: "16px",
    boxShadow: `0 8px 24px ${theme.shadow}`,
    ...flex.COLUMN_FLEX,
    overflow: "hidden",
  }),
  wrap: style({
    width: "100%",
    maxHeight: "calc(100vh - 280px)",
    padding: "24px",
    gap: "16px",
    overflowY: "auto",
    scrollbarWidth: "thin",
    scrollbarColor: "#e0e0e0 transparent",
    ...flex.COLUMN_FLEX,
    selectors: {
      "&::-webkit-scrollbar": {
        width: "6px",
      },
      "&::-webkit-scrollbar-track": {
        background: "transparent",
      },
      "&::-webkit-scrollbar-thumb": {
        background: "#e0e0e0",
        borderRadius: "3px",
      },
      "&::-webkit-scrollbar-thumb:hover": {
        background: "#ccc",
      },
    },
  }),
  box: style({
    background: `${theme.white}`,
    borderRadius: "12px",
    border: "1px solid #f0f0f0",
    padding: "20px",
    transition: "all 0.2s ease",
    position: "relative",
    ...flex.COLUMN_FLEX,
    selectors: {
      "&:hover": {
        boxShadow: `0 8px 20px ${theme.shadow}`,
        borderColor: "#e0e0e0",
        transform: "translateY(-2px)",
      },
      "&::before": {
        content: '""',
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: "7px",
        background: `${theme.gradient}`,
        borderTopLeftRadius: "12px",
        borderTopRightRadius: "12px",
        opacity: 0,
        transition: "opacity 0.2s ease",
      },
      "&:hover::before": {
        opacity: 1,
      },
    },
  }),
  questionText: style({
    fontSize: "16px",
    lineHeight: "1.6",
    color: "#333",
    fontWeight: "500",
    margin: "8px 0",
    padding: "12px 0",
    borderBottom: "1px solid #f8f8f8",
    transition: "color 0.2s ease",
    selectors: {
      "&:last-child": {
        borderBottom: "none",
        marginBottom: 0,
      },
      "&:hover": {
        color: `${theme.blue}`,
      },
    },
  }),
  emptyState: style({
    textAlign: "center",
    padding: "40px 20px",
    color: "#999",
    fontSize: "14px",
    fontStyle: "italic",
  }),
  InterviewBtn: style({
    padding: "15px 30px",
    background: `${theme.gradient}`,
    borderRadius: "8px",
    color: `${theme.white}`,
    ...font.btnBold,
    border: "none",
    transition: "background 0.2s ease, transform 0.2s ease",
    selectors: {
      "&:hover": {
        transform: "scale(1.02)",
      },
      "&:active": {
        transform: "scale(0.98)",
      },
    },
  })
};

export const skeleton = {
  container: style({
    width: "100%",
    background: `${theme.white}`,
    borderRadius: "12px",
    boxShadow: `0 4px 12px ${theme.shadow}`,
    padding: "3rem",
    ...flex.COLUMN_FLEX,
    position: "relative",
    overflow: "hidden",

    selectors: {
      "&::before": {
        content: '""',
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: "100%",
        animation: `${pulse} 1.8s infinite ease-in-out`,
        zIndex: 1,
        pointerEvents: "none",
      },
    },
  }),
};