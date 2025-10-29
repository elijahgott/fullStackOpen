import type { PartProps } from '../types';

const Part = (props: PartProps) => {
  const part = props.part;

  switch (part.kind){
    case "basic":
      return(
        <div>
          <strong>{part.name} {part.exerciseCount}</strong>
          <p><i>{part.description}</i></p>
        </div>
      );
    case "group":
      return(
        <div>
          <strong>{part.name} {part.exerciseCount}</strong>
          <p>Group Projects: {part.groupProjectCount}</p>
        </div>
      );
    case "background":
      return(
        <div>
          <strong>{part.name} {part.exerciseCount}</strong>
          <p><i>{part.description}</i></p>
          <p>Background Material: {part.backgroundMaterial}</p>
        </div>
      );
    case "special":
      return(
        <div>
          <strong>{part.name} {part.exerciseCount}</strong>
          <p><i>{part.description}</i></p>
          <p>Required Skills: {part.requirements.join(', ')}</p>
        </div>
      );
  };
};

export default Part;