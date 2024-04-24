import React from "react";
import { useParams } from "react-router-dom";
import BackButton from "../components/common/BackButton";
import DragAndDropChallenge from "../components/chapterChallanges/DragAndDropChallenge";
const ChapterChallenge = () => {
  const { id, challengeId, challengeName } = useParams();
  return (
    <div className="challenge-container">
      <h2>{`Chapter ${id} - Challenge ${challengeId}`}</h2>
      <h3>{challengeName}</h3>
      <h5>Problem:</h5>
      <p>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quaerat
        pariatur sapiente provident! Dolores corporis libero blanditiis
        architecto placeat ab aperiam totam iure, illo ipsum nobis quas sint!
        Recusandae, sapiente eius. Lorem ipsum, dolor sit amet consectetur
        adipisicing elit. Illo fugit architecto ducimus dolorem rerum debitis
        totam at nulla quidem eius molestias, quas repellat quam repellendus
        corrupti. Natus reiciendis tempore tenetur. Lorem ipsum dolor sit, amet
        consectetur adipisicing elit. Commodi doloribus ut magnam sapiente
        veniam eligendi laudantium iste a iusto soluta molestias esse delectus
        itaque temporibus nemo officia consequuntur, at doloremque!
      </p>
      <br />
      <h6>Drag and drop the code snippets in the right order</h6>
      <DragAndDropChallenge />
      <br />

      <BackButton />
    </div>
  );
};

export default ChapterChallenge;
