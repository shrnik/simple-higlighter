# Simple Highlighter

A React-based component for highlighting specific words within a `contentEditable` element. This project provides a Higher-Order Component (HOC) called `TextHighlighter` that injects a `ref` into its child and highlights specified words dynamically.
This approach doesn't pollute the content of the `contentEditable` element with HTML tags, making it a clean solution for highlighting text.

## Features

- Dynamically highlights specified words in a `contentEditable` element.
- Uses absolute positioning to overlay highlights on the text.
- Automatically updates highlights as the content changes.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/simple-highlighter.git
   ```
2. Navigate to the project directory:
   ```bash
   cd simple-highlighter
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

## Usage

Wrap your `contentEditable` element with the `TextHighlighter` component and pass the words to highlight as a prop.

```tsx
import TextHighlighter from "./app/components/highlighter";

const App = () => {
  return (
    <TextHighlighter highlightWords={["highlight", "example"]}>
      <div contentEditable={true} style={{ position: "relative" }}>
        Type some text here and see the highlights!
      </div>
    </TextHighlighter>
  );
};

export default App;
```

## Props

- `highlightWords` (string[]): An array of words to highlight.
- `children` (ReactNode): A single child element, typically a `contentEditable` element.

## Development

To run the project locally:

1. Start the development server:
   ```bash
   npm run dev
   ```
2. Open your browser and navigate to `http://localhost:3000`.

## License

This project is licensed under the MIT License.
