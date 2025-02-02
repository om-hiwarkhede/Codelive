import { useEffect, useRef, forwardRef } from "react";
import Codemirror from "codemirror";
import "codemirror/mode/javascript/javascript";
import "codemirror/theme/darcula.css";
import "codemirror/lib/codemirror.css";
import "codemirror/addon/edit/closebrackets";
import "codemirror/addon/edit/closetag";
import { ACTIONS } from "../assets/Actions";

const Editor = forwardRef(({ socketRef, roomId }, ref) => {
  const editorRef = useRef(null);

  useEffect(() => {
    const init = () => {
      if (!editorRef.current && document.getElementById("realTimeEditor")) {
        editorRef.current = Codemirror.fromTextArea(
          document.getElementById("realTimeEditor"),
          {
            mode: { name: "javascript", json: true },
            theme: "darcula",
            autoCloseTags: true,
            autoCloseBrackets: true,
            lineNumbers: true,
          }
        );
      }

      if (!socketRef.current) return;

      const handleCodeChange = ({ code }) => {
        if (editorRef.current) {
          const currentCode = editorRef.current.getValue();
          if (currentCode !== code) {
            editorRef.current.setValue(code);
          }
        }
      };
      console.log(socketRef.current);

      socketRef.current.on(ACTIONS.CODE_CHANGE, handleCodeChange);

      editorRef.current.on("change", (instance, changes) => {
        const { origin } = changes;
        const code = instance.getValue();

        if (origin !== "setValue" && socketRef.current) {
          socketRef.current.emit(ACTIONS.CODE_CHANGE, { roomId, code });
        }
      });

      // Cleanup function
      return () => {
        if (socketRef.current) {
          socketRef.current.off(ACTIONS.CODE_CHANGE, handleCodeChange);
        }
        if (editorRef.current) {
          editorRef.current.toTextArea(); // Removes the CodeMirror instance
          editorRef.current = null;
        }
      };
    };

    init();
  }, [socketRef, roomId]);

  return (
    <div className="h-full">
      <textarea id="realTimeEditor"></textarea>
    </div>
  );
});

export default Editor;
