import { theme, font, flex, screen } from "@/styles";
import { style } from "@vanilla-extract/css";

export const pdf = {
  container: style({
    width: "49rem",
    height: "25rem",
    border: "none",
    borderRadius: "1.3rem",
    boxShadow: `0.125rem 0.125rem 0.5rem ${theme.shadow}`,
    margin: "1.875rem 0",
    ...flex.CENTER,
    gap: "2.5rem",
    transition: "all ease 0.1s",
  }),
  dragging: style({
    backgroundColor: "#EEEAFF",
    border: `2px dashed ${theme.purple}`
  }),
  body: style({
    width: "100%",
    ...flex.COLUMN_CENTER,
    gap: "1.25rem",
  }),
  introduce: style({
    padding: "5px 15px",
    backgroundColor: "#C4B5FF7D",
    borderRadius: "3.125rem",
    ...font.H6,
  }),
  title: style({
    ...font.H4
  }),
  highlight: style({
    background: `${theme.gradient}`,
    WebkitBackgroundClip: "text",
    backgroundClip: "text",
    color: "transparent",
    display: "inline-block",
  }),
  btn: style({
    width: "17rem",
    padding: "15px 0",
    borderRadius: "0.5rem",
    border: "none",
    ...font.btnBold,
    color: `${theme.white}`,
    background: `${theme.gradient}`,
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
  }),
};