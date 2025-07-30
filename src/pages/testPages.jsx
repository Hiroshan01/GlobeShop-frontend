import { useState } from "react";
import mediaUpload from "../utils/meadUpload";



export default function TestPage() {
  const [image, setImage] = useState(null);

  function fileUpload() {
    mediaUpload(image)
      .then((res) => {
        console.log("Sucess",res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className="w-full h-screen flex justify-center items-center bg-amber-300">
      <div className="flex flex-col space-y-4 items-center">
        <input
          type="file"
          className="p-2 border border-gray-400 rounded-lg"
          onChange={(e) => {
            setImage(e.target.files[0]);
          }}
        />
        <button
          className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          onClick={fileUpload}
        >
          Upload
        </button>
      </div>
    </div>
  );
}
