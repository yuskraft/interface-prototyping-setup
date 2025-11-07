# 🎨 Vibe-Prototyping Template

A powerful, flexible React-based prototyping environment for building and testing UI components with an interactive playground. Drag, drop, resize, and experiment with your designs in real-time. Built with React, TypeScript, Vite, and **Tailwind CSS**.

## ✨ Features

### 🎯 Core Capabilities

- **🖱️ Drag & Drop Interface** - Intuitively position and rearrange components on the canvas
- **🌓 Theme Toggle** - Seamlessly switch between light and dark modes with automatic theme-aware styling
- **📐 Adjustable Grid System** - Fine-tune your layout with customizable grid sizes (8px - 64px)
- **📁 Media Upload** - Upload and position images, videos, and GIFs directly on the canvas
- **🔧 Resizable Components** - Dynamically resize media items with interactive handles
- **📦 Workspace Organization** - Organize prototypes in dedicated workspaces for better project structure
- **⚡ Hot Module Replacement** - Instant feedback with Vite's lightning-fast HMR
- **🎨 Flexible Styling** - Use CSS, Tailwind CSS, or both together

### 🛠️ Developer Experience

- **TypeScript First** - Full type safety throughout the codebase
- **Tailwind CSS v4** - Modern utility-first CSS framework with PostCSS integration
- **Modern Build Tooling** - Powered by Vite for optimal performance
- **Modular Architecture** - Clean separation between library code and playground
- **Path Aliases** - Convenient `@/` alias for workspace imports
- **Dual Build System** - Separate configs for library and playground builds
- **CSS Custom Properties** - Theme-aware CSS variables for consistent theming

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18+ 
- **pnpm** (recommended) or npm/yarn

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd interface-prototyping-setup

# Install dependencies
pnpm install
```

### Development

Start the development server:

```bash
pnpm dev
```

The playground will automatically open at `http://localhost:3000`

### Building

```bash
pnpm build

pnpm build:playground

pnpm preview
```

## 📁 Project Structure

```
interface-prototyping-setup/
├── playground/              # Development playground environment
│   ├── App.tsx             # Main playground application
│   ├── App.css             # Playground styles
│   ├── ConfigPanel.tsx     # Configuration panel component
│   ├── ConfigPanel.css     # Config panel styles
│   ├── Draggable.tsx       # Drag & drop wrapper component
│   ├── MediaItem.tsx       # Media display component
│   ├── MediaItem.css       # Media item styles
│   ├── index.css           # Global styles with Tailwind import
│   ├── index.html          # HTML entry point
│   └── main.tsx            # Playground entry point
│
├── src/                     # Source code
│   ├── index.ts            # Library entry point
│   └── workspaces/         # Prototype workspaces
│       └── workspace_1/    # Example workspace
│           ├── ExamplePrototype.tsx    # CSS-based prototype
│           ├── ExamplePrototype2.tsx  # Tailwind-based prototype
│           ├── Example.css            # Custom CSS styles
│           └── index.ts               # Workspace exports
│
├── tailwind.config.js      # Tailwind CSS configuration
├── postcss.config.js       # PostCSS configuration
├── vite.config.ts          # Library build configuration
├── vite.playground.config.ts # Playground build configuration
└── tsconfig.*.json         # TypeScript configurations
```

## 🎮 Usage Guide

### Creating a New Prototype

1. **Create a new workspace** in `src/workspaces/`:

```bash
mkdir -p src/workspaces/my_workspace
```

2. **Create your prototype component** (choose your styling approach):

#### Option A: Using Tailwind CSS

```tsx
// src/workspaces/my_workspace/MyPrototype.tsx
export const MyPrototype = () => {
  return (
    <div className="w-full p-6 max-w-md mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
        My Awesome Prototype
      </h2>
      <p className="text-gray-600 dark:text-gray-300 mb-6">
        This uses Tailwind CSS utility classes!
      </p>
      <button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-colors">
        Click me!
      </button>
    </div>
  );
};
```

#### Option B: Using Custom CSS

```tsx
// src/workspaces/my_workspace/MyPrototype.tsx
import "./MyPrototype.css";

export const MyPrototype = () => {
  return (
    <div className="my-prototype">
      <h1>My Awesome Prototype</h1>
      <button>Click me!</button>
    </div>
  );
};
```

```css
/* src/workspaces/my_workspace/MyPrototype.css */
.my-prototype {
  padding: 2rem;
  background: var(--app-card-bg);
  color: var(--app-text);
  border-radius: 8px;
  box-shadow: 0 2px 8px var(--app-shadow);
}
```

#### Option C: Using Both (Hybrid Approach)

You can combine Tailwind utilities with custom CSS classes for maximum flexibility!

3. **Export from workspace index**:

```tsx
// src/workspaces/my_workspace/index.ts
export { MyPrototype } from "./MyPrototype";
```

4. **Import and use in playground**:

```tsx
// playground/App.tsx
import { MyPrototype } from "@/workspaces/my_workspace";

// In your App component:
<Draggable initialX={0} initialY={0}>
  <MyPrototype />
</Draggable>
```

5. **Import CSS in playground entry** (only if using custom CSS):

```tsx
// playground/main.tsx
import "@/workspaces/my_workspace/MyPrototype.css";
```

### Using the Playground Features

#### Theme Toggle
Click the theme button in the config panel to switch between light and dark modes. The theme is applied globally using CSS custom properties and works seamlessly with Tailwind's `dark:` modifier.

#### Grid System
- Click "Grid Size" in the config panel
- Adjust the slider to change grid size (8px - 64px)
- The grid helps align components precisely

#### Media Upload
1. Click the "Upload" button in the config panel
2. Select one or more image, video, or GIF files
3. Media items appear on the canvas and can be:
   - **Dragged** to reposition
   - **Resized** using corner handles
   - **Removed** using the delete button

#### Dragging Components
- Click and drag any component wrapped in `<Draggable>` to move it
- Interactive elements (buttons, inputs, etc.) are excluded from drag behavior
- Components maintain their position during the session

## 🎨 Styling Guide

### Tailwind CSS

The project includes **Tailwind CSS v4** with PostCSS integration. You can use all Tailwind utility classes in your prototypes.

#### Dark Mode Support

Tailwind's dark mode works automatically with the theme toggle:

```tsx
<div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
  Content that adapts to theme
</div>
```

#### Tailwind Configuration

Customize Tailwind in `tailwind.config.js`:

```js
export default {
  content: ["./playground/**/*.{js,ts,jsx,tsx}", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      // Add your custom theme extensions
    },
  },
  plugins: [],
};
```

### CSS Custom Properties

The playground provides theme-aware CSS custom properties:

```css
/* Light theme variables */
--app-bg: #f5f7fa;
--app-text: #333333;
--app-card-bg: #ffffff;
--app-border: #e0e0e0;
--app-shadow: rgba(0, 0, 0, 0.1);
--grid-color: rgba(0, 0, 0, 0.03);
--grid-size: 24px;

/* Dark theme variables */
--app-bg: #1a1a1a;
--app-text: #e0e0e0;
--app-card-bg: #2d2d2d;
--app-border: #404040;
--app-shadow: rgba(0, 0, 0, 0.3);
--grid-color: rgba(255, 255, 255, 0.03);
```

Use them in your custom CSS:

```css
.my-component {
  background: var(--app-card-bg);
  color: var(--app-text);
  border: 1px solid var(--app-border);
  box-shadow: 0 2px 8px var(--app-shadow);
}
```

### Grid Customization

The grid size is controlled via CSS custom property `--grid-size`. It's automatically updated when you change the grid size in the config panel.

## 🔧 Configuration

### TypeScript Path Aliases

The `@/` alias is configured to point to `src/`. Use it for clean imports:

```tsx
import { MyComponent } from "@/workspaces/my_workspace";
```

### Vite Configuration

- **Library build** (`vite.config.ts`): Configures the library build with TypeScript declarations
- **Playground build** (`vite.playground.config.ts`): Configures the development playground

### Tailwind CSS Configuration

Tailwind is configured to scan both `playground/` and `src/` directories. The configuration is in `tailwind.config.js`.

### PostCSS Configuration

PostCSS is configured with:
- `@tailwindcss/postcss` - Tailwind CSS v4 plugin
- `autoprefixer` - Automatic vendor prefixing

### Port Configuration

Change the playground port in `vite.playground.config.ts`:

```ts
server: {
  port: 3000, 
}
```

## 📦 Building for Production

### Library Build

```bash
pnpm build
```

Outputs:
- `dist/index.es.js` - ES module build
- `dist/index.umd.js` - UMD build
- `dist/index.d.ts` - TypeScript declarations
- `dist/style.css` - Compiled styles

### Playground Build

```bash
pnpm build:playground
```

Outputs a static site in `playground/dist/` ready for deployment.

## 🎯 Example Prototypes

The project includes two example prototypes demonstrating different styling approaches:

1. **ExamplePrototype1** - Uses custom CSS with CSS custom properties
2. **ExamplePrototype2** - Uses Tailwind CSS utility classes

Both are available in `src/workspaces/workspace_1/` and can be used as templates for your own prototypes.

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add amazing feature'`)
5. Push to the branch (`git push origin feature/amazing-feature`)
6. Open a Pull Request

### Development Guidelines

- Follow TypeScript best practices
- Use meaningful component and variable names
- Add comments for complex logic
- Keep components focused and reusable
- Maintain consistent code formatting
- Choose the styling approach (CSS/Tailwind) that best fits your needs

## 📝 Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start development server |
| `pnpm build` | Build the library |
| `pnpm build:playground` | Build the playground |
| `pnpm preview` | Preview the built playground |

## 🐛 Troubleshooting

### Port Already in Use

If port 3000 is already in use, change it in `vite.playground.config.ts`:

```ts
server: {
  port: 3001, 
}
```

### TypeScript Errors

Ensure all workspace exports are properly typed and exported from their `index.ts` files.

### Styles Not Loading

- **Custom CSS**: Make sure to import CSS files in `playground/main.tsx`
- **Tailwind**: Ensure your classes are in files scanned by Tailwind (check `tailwind.config.js` content paths)

### Tailwind Classes Not Working

1. Verify your file is in the content paths in `tailwind.config.js`
2. Check that `@import "tailwindcss";` is in `playground/index.css`
3. Restart the dev server after changing Tailwind config

## 📄 License

MIT License - feel free to use this template for your projects!

## 🙏 Acknowledgments

Built with:
- [React](https://react.dev/) - UI library
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Vite](https://vitejs.dev/) - Build tool
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [PostCSS](https://postcss.org/) - CSS processing
- [pnpm](https://pnpm.io/) - Package manager

---

**Happy Prototyping! 🚀**

For questions, issues, or suggestions, please open an issue on GitHub.
