import { useEffect } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import * as Y from "yjs";
import { WebrtcProvider } from "y-webrtc";
// import Quill from "quill";
import { QuillBinding } from "y-quill";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
// import QuillCursors from "quill-cursors";

function App() {
  let quillRef = null;
  let reactQuillRef = null;

  const [params] = useSearchParams();
  const id = params.get("id");
  const navigate = useNavigate();

  console.log(id);

  useEffect(() => {
    if (!id) {
      navigate({
        pathname: "/editor",
        search: "?id=123",
      });
    }
  }, []);

  const attachQuillRefs = () => {
    if (typeof reactQuillRef.getEditor !== "function") return;
    quillRef = reactQuillRef.getEditor();
  };

  useEffect(() => {
    attachQuillRefs();

    // Quill.register("modules/cursors", QuillCursors);

    if (!id) return;

    const ydoc = new Y.Doc();
    const provider = new WebrtcProvider(id, ydoc);
    const ytext = ydoc.getText("quill");

    const binding = new QuillBinding(ytext, quillRef, provider.awareness);
  }, []);

  const modulesRef = {
    toolbar: [
      [{ header: [1, 2, false] }],
      // ["bold", "italic", "underline", "strike", "blockquote"],
      // [
      //   { list: "ordered" },
      //   { list: "bullet" },
      //   { indent: "-1" },
      //   { indent: "+1" },
      // ],
      // ["link", "image"],
      // ["clean"],
    ],
  };

  return (
    <ReactQuill
      ref={(el) => {
        reactQuillRef = el;
      }}
      modules={modulesRef}
      theme={"snow"}
    />
  );
}

export default App;
