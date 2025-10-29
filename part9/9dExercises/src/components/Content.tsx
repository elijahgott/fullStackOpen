import Part from "./Part";
import type { ContentProps } from "../types";

const Content = (props: ContentProps) => {
  const parts = props.courseParts;

  return(
    <>
      {parts.map((part, index) => {
        return(
          <Part key={index} part={part} />
        );
      })}
    </>
  );
};

export default Content;