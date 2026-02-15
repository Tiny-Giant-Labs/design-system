export interface PropDef {
  name: string;
  type: string;
  default?: string;
  required?: boolean;
  options?: string[];
  controlType: "text" | "select" | "checkbox" | "number" | "none";
}

export interface ComponentDef {
  name: string;
  icon: string;
  description: string;
  props: PropDef[];
}

export const componentDefs: ComponentDef[] = [
  {
    name: "Button",
    icon: "🔘",
    description:
      "Primary action button with multiple variants, sizes, loading state, and keyboard shortcut display.",
    props: [
      {
        name: "text",
        type: "string",
        controlType: "text",
        default: "undefined",
      },
      {
        name: "isLoading",
        type: "boolean",
        default: "false",
        controlType: "checkbox",
      },
      {
        name: "variant",
        type: "'default' | 'outline' | 'destructive'",
        default: "'default'",
        controlType: "select",
        options: ["default", "outline", "destructive"],
      },
      {
        name: "size",
        type: "'default' | 'small'",
        default: "'default'",
        controlType: "select",
        options: ["default", "small"],
      },
      {
        name: "shortcut",
        type: "string",
        controlType: "text",
        default: "undefined",
      },
      {
        name: "disabled",
        type: "boolean",
        default: "false",
        controlType: "checkbox",
      },
      {
        name: "block",
        type: "boolean",
        default: "true",
        controlType: "checkbox",
      },
    ],
  },
  {
    name: "Input",
    icon: "✏️",
    description:
      "Text input with label, error state, mask support, and start/end icon slots.",
    props: [
      { name: "label", type: "string", controlType: "text" },
      { name: "placeholder", type: "string", controlType: "text" },
      {
        name: "type",
        type: "'text' | 'email' | 'password' | 'number' | 'date' | 'datetime-local'",
        required: true,
        controlType: "select",
        options: [
          "text",
          "email",
          "password",
          "number",
          "date",
          "datetime-local",
        ],
      },
      { name: "id", type: "string", required: true, controlType: "text" },
      { name: "error", type: "string", controlType: "text" },
    ],
  },
  {
    name: "TextArea",
    icon: "📝",
    description: "Multi-line text input with label and error display.",
    props: [
      { name: "label", type: "string", required: true, controlType: "text" },
      { name: "placeholder", type: "string", controlType: "text" },
      { name: "id", type: "string", required: true, controlType: "text" },
      { name: "error", type: "string", controlType: "text" },
    ],
  },
  {
    name: "Toggle",
    icon: "🔀",
    description: "Switch toggle with optional label and description.",
    props: [
      {
        name: "modelValue",
        type: "boolean",
        required: true,
        controlType: "checkbox",
      },
      { name: "label", type: "string", controlType: "text" },
      { name: "description", type: "string", controlType: "text" },
      {
        name: "disabled",
        type: "boolean",
        default: "false",
        controlType: "checkbox",
      },
    ],
  },
  {
    name: "Select",
    icon: "📋",
    description: "Native select dropdown with label and error support.",
    props: [
      { name: "label", type: "string", controlType: "text" },
      { name: "id", type: "string", controlType: "text" },
      { name: "error", type: "string", controlType: "text" },
      {
        name: "disabled",
        type: "boolean",
        default: "false",
        controlType: "checkbox",
      },
      {
        name: "widthClass",
        type: "string",
        default: "'w-full'",
        controlType: "text",
      },
    ],
  },
  {
    name: "IconButton",
    icon: "⚡",
    description:
      "Compact icon-only button with optional link and visible background.",
    props: [
      { name: "href", type: "string", controlType: "text" },
      {
        name: "size",
        type: "'default' | 'small'",
        default: "'default'",
        controlType: "select",
        options: ["default", "small"],
      },
      {
        name: "bgColorIsVisible",
        type: "boolean",
        default: "false",
        controlType: "checkbox",
      },
    ],
  },
  {
    name: "SSOButton",
    icon: "🔐",
    description: "Social sign-on button with icon slot and text label.",
    props: [
      { name: "text", type: "string", required: true, controlType: "text" },
    ],
  },
  {
    name: "OTPInput",
    icon: "🔢",
    description:
      "One-time-password input with configurable length, auto-focus, and paste support.",
    props: [
      { name: "length", type: "number", default: "6", controlType: "number" },
    ],
  },
  {
    name: "PasswordInput",
    icon: "🔑",
    description:
      'Password field with visibility toggle and optional "Forgot password" link.',
    props: [
      { name: "label", type: "string", required: true, controlType: "text" },
      {
        name: "placeholder",
        type: "string",
        required: true,
        controlType: "text",
      },
      { name: "id", type: "string", required: true, controlType: "text" },
      { name: "error", type: "string", controlType: "text" },
      {
        name: "displayForgotPassword",
        type: "boolean",
        default: "false",
        controlType: "checkbox",
      },
    ],
  },
  {
    name: "PasswordValidation",
    icon: "✅",
    description: "Inline validation indicators for password requirements.",
    props: [
      { name: "password", type: "string", required: true, controlType: "text" },
      {
        name: "validation",
        type: "{ minCharacter: boolean; hasLetterAndNumber: boolean }",
        required: true,
        controlType: "none",
      },
    ],
  },
  {
    name: "Tabs",
    icon: "📑",
    description: "Horizontal tab navigation with active state indicator.",
    props: [
      { name: "tabs", type: "Tab[]", required: true, controlType: "none" },
      {
        name: "modelValue",
        type: "string",
        required: true,
        controlType: "none",
      },
    ],
  },
  {
    name: "SegmentedControl",
    icon: "🎚️",
    description: "Pill-style segmented control for toggling between options.",
    props: [
      {
        name: "options",
        type: "Option[]",
        required: true,
        controlType: "none",
      },
      { name: "modelValue", type: "T", required: true, controlType: "none" },
    ],
  },
  {
    name: "Pagination",
    icon: "📄",
    description: "Page navigation with item count display.",
    props: [
      {
        name: "totalCount",
        type: "number",
        required: true,
        controlType: "number",
      },
      {
        name: "pageSize",
        type: "number",
        default: "10",
        controlType: "number",
      },
      {
        name: "isLoading",
        type: "boolean",
        default: "false",
        controlType: "checkbox",
      },
      {
        name: "label",
        type: "string",
        default: "'items'",
        controlType: "text",
      },
    ],
  },
  {
    name: "Modal",
    icon: "🪟",
    description:
      "Dialog overlay with trigger slot, ESC-to-close, and configurable width/z-index.",
    props: [
      { name: "title", type: "string", controlType: "text" },
      {
        name: "widthClass",
        type: "string",
        default: "'w-lg'",
        controlType: "text",
      },
      {
        name: "zIndexClass",
        type: "string",
        default: "'z-50'",
        controlType: "text",
      },
    ],
  },
  {
    name: "Tooltip",
    icon: "💬",
    description: "Hover tooltip powered by Tippy.js with text or HTML content.",
    props: [
      { name: "content", type: "string", controlType: "text" },
      { name: "htmlContent", type: "string", controlType: "text" },
      {
        name: "placement",
        type: "'bottom' | 'top' | 'right'",
        default: "'top'",
        controlType: "select",
        options: ["top", "bottom", "right"],
      },
      {
        name: "followCursor",
        type: "boolean",
        default: "false",
        controlType: "checkbox",
      },
      { name: "maxWidth", type: "number", controlType: "number" },
    ],
  },
  {
    name: "Dropdown",
    icon: "🔽",
    description:
      "Tippy.js-powered popover dropdown with trigger and content slots.",
    props: [
      {
        name: "placement",
        type: "Placement",
        default: "'bottom-end'",
        controlType: "select",
        options: [
          "bottom-end",
          "bottom-start",
          "top",
          "top-start",
          "top-end",
          "left",
          "right",
        ],
      },
      {
        name: "hideAfterClick",
        type: "boolean",
        default: "true",
        controlType: "checkbox",
      },
      {
        name: "appendToBody",
        type: "boolean",
        default: "true",
        controlType: "checkbox",
      },
    ],
  },
  {
    name: "CardView",
    icon: "🃏",
    description:
      "Simple card container with rounded corners, border, and shadow.",
    props: [],
  },
  {
    name: "SimpleImageUpload",
    icon: "🖼️",
    description: "Avatar-style image uploader with file validation.",
    props: [
      { name: "image", type: "string", required: true, controlType: "text" },
      { name: "error", type: "string", controlType: "text" },
      {
        name: "loading",
        type: "boolean",
        default: "false",
        controlType: "checkbox",
      },
      {
        name: "helperText",
        type: "string",
        required: true,
        controlType: "text",
      },
      { name: "maxFileSize", type: "number", controlType: "number" },
    ],
  },
  {
    name: "Filter",
    icon: "🔍",
    description:
      "Multi/single select filter dropdown with search and infinite scroll.",
    props: [
      { name: "label", type: "string", required: true, controlType: "text" },
      {
        name: "single",
        type: "boolean",
        default: "false",
        controlType: "checkbox",
      },
      {
        name: "loading",
        type: "boolean",
        default: "false",
        controlType: "checkbox",
      },
      {
        name: "hasMore",
        type: "boolean",
        default: "false",
        controlType: "checkbox",
      },
    ],
  },
  {
    name: "SearchableSelect",
    icon: "🔎",
    description: "Searchable dropdown select with infinite scroll support.",
    props: [
      { name: "label", type: "string", controlType: "text" },
      {
        name: "placeholder",
        type: "string",
        default: "'Select an option...'",
        controlType: "text",
      },
      {
        name: "loading",
        type: "boolean",
        default: "false",
        controlType: "checkbox",
      },
      {
        name: "hasMore",
        type: "boolean",
        default: "false",
        controlType: "checkbox",
      },
      { name: "error", type: "string", controlType: "text" },
      {
        name: "widthClass",
        type: "string",
        default: "'w-full'",
        controlType: "text",
      },
    ],
  },
  {
    name: "ShopifyIcon",
    icon: "🛍️",
    description: "Static Shopify brand logo SVG icon.",
    props: [],
  },
];
