import { theme, font, flex } from "@/styles";
import { style } from "@vanilla-extract/css";

export const aside = {
  container: style({
    width: "320px",
    height: "100vh",
    position: "fixed",
    top: 0,
    left: 0,
    background: `${theme.white}`,
    borderRight: "1px solid #f0f0f0",
    boxShadow: `2px 0 12px ${theme.shadow}`,
    zIndex: 100,
    ...flex.COLUMN_FLEX,
    overflow: "hidden",
  }),

  header: style({
    padding: "10px 10px",
    borderBottom: "1px solid #f0f0f0",
    position: "relative",
    background: `${theme.white}`,
    ...flex.FLEX,
    alignItems: "center",
    gap: "16px",
  }),

  backButton: style({
    fontSize: "34px",
    color: `${theme.boldgray}`,
    cursor: "pointer",
    transition: "all 0.2s ease",
    padding: "8px",
    borderRadius: "8px",
    ...flex.CENTER,

    selectors: {
      "&:hover": {
        color: `${theme.primary}`,
        background: "rgba(79, 70, 229, 0.1)",
        transform: "scale(1.1)",
      },
    },
  }),

  title: style({
    ...font.H6,
    color: `${theme.text}`,
  }),

  content: style({
    flex: 1,
    overflowY: "auto",
    scrollbarWidth: "thin",
    scrollbarColor: "#e0e0e0 transparent",

    selectors: {
      "&::-webkit-scrollbar": {
        width: "4px",
      },
      "&::-webkit-scrollbar-track": {
        background: "transparent",
      },
      "&::-webkit-scrollbar-thumb": {
        background: "#e0e0e0",
        borderRadius: "2px",
      },
      "&::-webkit-scrollbar-thumb:hover": {
        background: "#ccc",
      },
    },
  }),

  section: style({
    marginBottom: "32px",
  }),

  sectionContent: style({
    padding: "0",
  }),

  emptyState: style({
    textAlign: "center",
    padding: "40px 24px",
    color: `${theme.boldgray}`,
    fontSize: "14px",
    fontStyle: "italic",
    background: "#fafafa",
    margin: "0",
  }),

  groupContainer: style({
    marginBottom: "20px",
  }),

  groupTitle: style({
    padding: "16px 24px 12px 24px",
    ...font.H6,
    color: `${theme.primary}`,
    background: "#f8f9ff",
    borderBottom: "2px solid rgba(79, 70, 229, 0.1)",
    position: "sticky",
    top: 0, 
    zIndex: 5,
  }),

  questionList: style({
    listStyle: "none",
    padding: 0,
    margin: 0,
  }),

  questionItem: style({
    borderBottom: "1px solid #f8f8f8",
  }),

  questionButton: style({
    width: "100%",
    padding: "16px 24px",
    border: "none",
    background: "transparent",
    textAlign: "left",
    cursor: "pointer",
    transition: "all 0.2s ease",
    ...flex.COLUMN_FLEX,
    gap: "8px",
    position: "relative",

    selectors: {
      "&:hover": {
        background: "rgba(79, 70, 229, 0.05)",
        borderLeft: `4px solid ${theme.primary}`,
        paddingLeft: "20px",
      },
      "&:active": {
        background: "rgba(79, 70, 229, 0.1)",
      },
    },
  }),

  questionButtonActive: style({
    width: "100%",
    padding: "16px 24px",
    border: "none",
    background: "transparent",
    textAlign: "left",
    cursor: "default",
    transition: "all 0.2s ease",
    ...flex.COLUMN_FLEX,
    gap: "8px",
    position: "relative",
  }),

  questionText: style({
    color: `${theme.text}`,
    ...font.p2,
    wordBreak: "break-word",
    margin: 0,
  }),

  questionTag: style({
    color: `${theme.boldgray}`,
    background: "#f0f0f0",
    padding: "2px 8px",
    borderRadius: "12px",
    alignSelf: "flex-start",
    ...font.p4,
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  }),

  questionTextActive: style({
    color: `${theme.primary}`,
    ...font.H6,
    wordBreak: "break-word",
    margin: 0,
  }),

  questionTagActive: style({
    color: `${theme.white}`,
    background: `${theme.primary}`,
    padding: "2px 8px",
    borderRadius: "12px",
    alignSelf: "flex-start",
    ...font.p4,
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  }),
};