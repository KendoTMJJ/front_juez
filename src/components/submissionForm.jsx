import { Editor } from "@monaco-editor/react";
import { useState, useRef } from "react";
import { format } from "prettier";
import parserBabel from "prettier/parser-babel";
import parserHtml from "prettier/parser-html";
import parserPostcss from "prettier/parser-postcss";
import parserTypescript from "prettier/parser-typescript";

/**
 * Component for submitting code solutions to problems
 * @param {Object} props - Component props
 * @param {Object} props.problem - The problem object being solved
 * @param {Function} props.onSubmit - Callback function when form is submitted
 */
export function SubmissionForm({ problem, onSubmit }) {
  const [sourceCode, setSourceCode] = useState("");
  const [language, setLanguage] = useState("python");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const idUser = localStorage.getItem("idUser");
  const [editorTheme, setEditorTheme] = useState("vs-dark");
  const editorRef = useRef(null);
  const monacoRef = useRef(null);

  const languageTemplates = {
    python: `def main():\n    # Write your code here\n    pass\n\nif __name__ == "__main__":\n    main()`,
    javascript: `function main() {\n  // Write your code here\n}\n\nmain();`,
    java: `public class Main {\n    public static void main(String[] args) {\n        // Write your code here\n    }\n}`,
    cpp: `#include <iostream>\nusing namespace std;\n\nint main() {\n    // Write your code here\n    return 0;\n}`,
    ruby: `def main\n  # Write your code here\nend\n\nmain`,
    go: `package main\nimport "fmt"\n\nfunc main() {\n    // Write your code here\n}`,
    rust: `fn main() {\n    // Write your code here\n}`,
    typescript: `function main(): void {\n  // Write your code here\n}\n\nmain();`,
  };

  // Supported programming languages with their display names
  const languages = [
    { id: "python", name: "Python" },
    { id: "javascript", name: "JavaScript" },
    { id: "java", name: "Java" },
    { id: "cpp", name: "C++" },
    { id: "ruby", name: "Ruby" },
    { id: "go", name: "Go" },
    { id: "rust", name: "Rust" },
    { id: "typescript", name: "TypeScript" },
  ];

  const themes = [
    { id: "vs", name: "Light" },
    { id: "vs-dark", name: "Dark" },
    { id: "hc-black", name: "High Contrast" },
  ];

  // Get language suggestions for autocomplete
  const getLanguageSuggestions = (lang, code) => {
    const commonSuggestions = [
      {
        label: "if",
        kind: monacoRef.current.languages.CompletionItemKind.Keyword,
        insertText: "if (${1:condition}) {\n\t${2}\n}",
        insertTextRules:
          monacoRef.current.languages.CompletionItemInsertTextRule
            .InsertAsSnippet,
        documentation: "If statement",
      },
      {
        label: "for",
        kind: monacoRef.current.languages.CompletionItemKind.Keyword,
        insertText: "for (${1:let i = 0}; ${2:i < 10}; ${3:i++}) {\n\t${4}\n}",
        insertTextRules:
          monacoRef.current.languages.CompletionItemInsertTextRule
            .InsertAsSnippet,
        documentation: "For loop",
      },
      {
        label: "function",
        kind: monacoRef.current.languages.CompletionItemKind.Keyword,
        insertText: "function ${1:name}(${2:params}) {\n\t${3}\n}",
        insertTextRules:
          monacoRef.current.languages.CompletionItemInsertTextRule
            .InsertAsSnippet,
        documentation: "Function declaration",
      },
    ];

    if (lang === "python") {
      return [
        ...commonSuggestions,
        {
          label: "print",
          kind: monacoRef.current.languages.CompletionItemKind.Function,
          insertText: "print(${1:value})",
          insertTextRules:
            monacoRef.current.languages.CompletionItemInsertTextRule
              .InsertAsSnippet,
          documentation: "Print to console",
        },
      ];
    }

    if (lang === "javascript" || lang === "typescript") {
      return [
        ...commonSuggestions,
        {
          label: "console.log",
          kind: monacoRef.current.languages.CompletionItemKind.Function,
          insertText: "console.log(${1:value})",
          insertTextRules:
            monacoRef.current.languages.CompletionItemInsertTextRule
              .InsertAsSnippet,
          documentation: "Log to console",
        },
      ];
    }

    if (lang === "java") {
      return [
        ...commonSuggestions,
        {
          label: "System.out.println",
          kind: monacoRef.current.languages.CompletionItemKind.Function,
          insertText: "System.out.println(${1:value});",
          insertTextRules:
            monacoRef.current.languages.CompletionItemInsertTextRule
              .InsertAsSnippet,
          documentation: "Print to console",
        },
      ];
    }

    return commonSuggestions;
  };

  // Get trigger characters for autocomplete
  const getTriggerCharacters = (lang) => {
    if (lang === "python") return [".", "("];
    if (lang === "javascript" || lang === "typescript") return [".", "(", "["];
    return ["."];
  };

  // Format code based on language
  const handleFormatCode = () => {
    if (!sourceCode.trim()) return;

    try {
      let formattedCode = sourceCode;

      if (language === "javascript" || language === "typescript") {
        formattedCode = format(sourceCode, {
          parser: "babel",
          plugins: [parserBabel],
          semi: true,
          singleQuote: false,
          tabWidth: 2,
        });
      } else if (language === "python") {
        // For Python, we would normally use something like autopep8 or black
        // This is a simple approximation
        formattedCode = sourceCode
          .split("\n")
          .map((line) => {
            // Simple indentation fix
            const trimmed = line.trim();
            if (
              trimmed.startsWith("def ") ||
              trimmed.startsWith("class ") ||
              trimmed.startsWith("if ") ||
              trimmed.startsWith("for ") ||
              trimmed.startsWith("while ") ||
              trimmed.endsWith(":")
            ) {
              return "    " + trimmed;
            }
            return trimmed;
          })
          .join("\n");
      } else if (language === "java" || language === "cpp") {
        formattedCode = format(sourceCode, {
          parser: "java",
          plugins: [parserBabel],
          tabWidth: 2,
        });
      }

      setSourceCode(formattedCode);
    } catch (error) {
      console.error("Error formatting code:", error);
      // Fallback to simple trimming if formatting fails
      setSourceCode(sourceCode.trim());
    }
  };

  /**
   * Handles editor theme change
   */
  const handleThemeChange = (e) => {
    setEditorTheme(e.target.value);
  };

  const handleEditorDidMount = (editor, monaco) => {
    editorRef.current = editor;
    monacoRef.current = monaco;

    // Configuración de autocompletado para cada lenguaje
    monaco.languages.registerCompletionItemProvider(language, {
      provideCompletionItems: (model, position) => {
        const suggestions = getLanguageSuggestions(language, model.getValue());
        return { suggestions };
      },
      triggerCharacters: getTriggerCharacters(language),
    });

    // Atajo Ctrl+Enter para enviar
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, () => {
      document.querySelector("form")?.requestSubmit();
    });
  };

  /**
   * Handles form submission
   * @param {Event} e - Form submit event
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!sourceCode.trim()) {
      alert("Please enter the source code");
      return;
    }

    setIsSubmitting(true);

    try {
      const submission = {
        sourceCode,
        language,
        problemId: problem.codProblem,
        userId: idUser,
      };

      await onSubmit(submission);
      setSourceCode(""); // Clear code after submission
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      {/* Problem details section */}
      <div className="bg-white shadow-md rounded-lg overflow-hidden max-w-7xl mx-auto p-6 space-y-6">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-gray-900">{problem.title}</h1>

          {/* Problem metadata tags */}
          <div className="flex flex-wrap gap-2 mb-4 mt-4">
            <span
              className={`px-2 py-1 text-xs rounded-full ${
                problem.difficulty === "easy"
                  ? "bg-green-100 text-green-800"
                  : problem.difficulty === "medium"
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-red-100 text-red-800"
              }`}
            >
              {problem.difficulty}
            </span>
            {problem.tags.map((tag) => (
              <span key={tag} className="px-2 py-1 text-xs bg-gray-100 rounded">
                {tag}
              </span>
            ))}
            <span
              className={`px-2 py-1 text-xs rounded-full ${
                problem.isPublic
                  ? "bg-blue-100 text-blue-800"
                  : "bg-gray-100 text-gray-800"
              }`}
            >
              {problem.isPublic ? "Public" : "Private"}
            </span>
          </div>

          {/* Problem description */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2">Description</h2>
            <p className="text-gray-700">{problem.description}</p>
          </div>

          {/* Input/output formats and constraints */}
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div>
              <h2 className="text-lg font-semibold mb-2">Input Format</h2>
              <p className="text-gray-700">{problem.inputFormat}</p>
            </div>
            <div>
              <h2 className="text-lg font-semibold mb-2">Output Format</h2>
              <p className="text-gray-700">{problem.outputFormat}</p>
            </div>

            <div>
              <h2 className="text-lg font-semibold mb-2">Constraints</h2>
              <p className="text-gray-700">
                <ul className="list-disc pl-5">
                  {problem.constraints.map((constraint, index) => (
                    <li key={index}>{constraint}</li>
                  ))}
                </ul>
              </p>
            </div>
          </div>
        </div>

        {/* Submission form */}
        <form onSubmit={handleSubmit}>
          <div className="mb-4 mt-5 text-center space-x-20">
            <label
              htmlFor="language"
              className="text-2xl font-medium text-gray-700 mb-5 mt-5"
            >
              Language
            </label>
            <select
              id="language"
              value={language}
              onChange={(e) => {
                const newLang = e.target.value;
                setLanguage(newLang);
                setSourceCode(languageTemplates[newLang] || "");
              }}
              className="w-2xs px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-700"
            >
              {languages.map((lang) => (
                <option key={lang.id} value={lang.id}>
                  {lang.name}
                </option>
              ))}
            </select>
          </div>

          {/* Code Editor Section */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <div className="flex space-x-2">
                <select
                  id="theme"
                  value={editorTheme}
                  onChange={handleThemeChange}
                  className="bg-gray-800 text-white px-3 py-1 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {themes.map((theme) => (
                    <option key={theme.id} value={theme.id}>
                      {theme.name}
                    </option>
                  ))}
                </select>

                <button
                  type="button"
                  onClick={() => setSourceCode("")}
                  className="bg-gray-700 hover:bg-gray-600 text-white px-3 py-1 rounded-md text-sm transition-colors"
                >
                  Clear
                </button>

                <button
                  type="button"
                  onClick={handleFormatCode}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-md text-sm transition-colors"
                >
                  Format
                </button>
              </div>

              <div className="text-sm text-gray-400">
                {language.toUpperCase()} Editor
              </div>
            </div>

            <div className="border-2 border-gray-700 rounded-lg overflow-hidden shadow-lg">
              <Editor
                height="60vh"
                width="100%"
                language={language}
                value={sourceCode}
                onChange={(value) => setSourceCode(value ?? "")}
                theme={editorTheme}
                options={{
                  fontSize: 14,
                  minimap: { enabled: true },
                  scrollBeyondLastLine: false,
                  automaticLayout: true,
                  fontFamily: "'Fira Code', monospace",
                  wordWrap: "on",
                  renderWhitespace: "selection",
                  tabSize: 2,
                  tabCompletion: "on",
                  quickSuggestions: true,
                  suggestOnTriggerCharacters: true,
                  autoClosingBrackets: "always",
                  autoClosingQuotes: "always",
                  formatOnPaste: true,
                  formatOnType: true,
                }}
                beforeMount={(monaco) => {
                  monaco.editor.defineTheme("custom-dark", {
                    base: "vs-dark",
                    inherit: true,
                    rules: [],
                    colors: {
                      "editor.background": "#1a1a2e",
                      "editor.lineHighlightBackground": "#16213e80",
                      "editorCursor.foreground": "#ffffff",
                    },
                  });
                }}
                onMount={(editor, monaco) => {
                  monaco.editor.setTheme("custom-dark");
                  editor.focus();
                  handleEditorDidMount(editor, monaco);
                }}
              />
            </div>

            <div className="mt-2 flex justify-between items-center">
              <div className="text-xs text-gray-500">
                Line count: {sourceCode.split("\n").length}
              </div>
              <div className="text-xs text-gray-500">
                {sourceCode.length} characters
              </div>
            </div>
          </div>

          {/* Submit button */}
          <div className="text-center">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`px-6 py-3 rounded-md font-medium ${
                isSubmitting
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              } text-white`}
            >
              {isSubmitting ? "Submitting..." : "Submit Solution"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SubmissionForm;
