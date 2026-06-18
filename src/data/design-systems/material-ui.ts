import type { InterviewQuestion } from '../../types'

export const materialUiQuestions: InterviewQuestion[] = [
  {
    id: 34,
    category: 'Material UI',
    question: 'What is Material UI (MUI)?',
    answer: 'Material UI is a popular React component library implementing Google\'s Material Design with production-ready components like Button, TextField, Dialog, and DataGrid. It provides a comprehensive theming system, accessibility features, and extensive customization APIs. MUI ships both styled components (Material UI) and headless primitives (Base UI) for different use cases. The library handles complex patterns like focus management, keyboard navigation, and responsive layouts out of the box. In a real app, you import Button from @mui/material and get a polished, accessible button with hover, focus, and ripple effects without writing CSS.',
    code: `import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';

function LoginForm() {
  return (
    <Stack spacing={2}>
      <TextField label="Email" type="email" fullWidth />
      <Button variant="contained">Sign In</Button>
    </Stack>
  );
}`,
  },
  {
    id: 35,
    category: 'Material UI',
    question: 'How does theming work with createTheme in MUI?',
    answer: 'createTheme generates a theme object containing palette, typography, spacing, breakpoints, and component style overrides. The theme drives all MUI component styling through a centralized configuration instead of scattered CSS. You customize colors, font families, border radius, and spacing scale in one place and every component inherits the changes. TypeScript augments the theme type when you add custom tokens via module augmentation. In a real app, calling createTheme with palette.primary.main set to your brand blue updates every contained Button and active Tab across the app.',
    code: `import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: { main: '#2563eb' },
    secondary: { main: '#7c3aed' },
    background: { default: '#f9fafb' },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", sans-serif',
  },
  shape: { borderRadius: 8 },
});`,
  },
  {
    id: 36,
    category: 'Material UI',
    question: 'What is ThemeProvider and how do you use it?',
    answer: 'ThemeProvider injects a theme object into the React tree via context so all descendant MUI components read shared design tokens. Wrap your app root with ThemeProvider passing the theme from createTheme. Nested ThemeProviders can override the theme for a subtree, useful for admin panels with a different color scheme. CssBaseline optionally normalizes browser defaults to match Material Design baselines. In a real app, main.tsx wraps the app in ThemeProvider so every page automatically uses your brand palette and typography.',
    code: `import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const theme = createTheme({ palette: { primary: { main: '#2563eb' } } });

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router />
    </ThemeProvider>
  );
}`,
  },
  {
    id: 37,
    category: 'Material UI',
    question: 'What is the sx prop in MUI?',
    answer: 'The sx prop is a shorthand for applying theme-aware styles directly on MUI components and Box without writing separate CSS files. It accepts an object with CSS properties plus theme shortcuts like mt: 2 (margin-top from spacing scale), bgcolor: \'primary.main\', and responsive arrays. sx values resolve against the active theme so colors and spacing stay consistent. It supports pseudo-selectors and nested selectors for complex one-off styling. In a real app, <Box sx={{ p: 2, borderRadius: 1, bgcolor: \'background.paper\' }}> gives a padded card surface using theme tokens.',
    code: `<Box
  sx={{
    p: 2,
    mt: { xs: 1, md: 3 },       // responsive spacing
    bgcolor: 'background.paper',
    borderRadius: 1,
    '&:hover': { boxShadow: 3 },
  }}
>
  Card content
</Box>`,
  },
  {
    id: 38,
    category: 'Material UI',
    question: 'How does the styled() API work in MUI?',
    answer: 'The styled() function from @mui/material/styles creates styled components that access the theme in template literals or object syntax. It wraps the Emotion styled engine and supports both MUI components and native HTML elements. styled components automatically receive theme props and support variants via shouldForwardProp. This API suits reusable styled components that go beyond one-off sx prop usage. In a real app, a StyledCard created with styled(Paper) applies consistent elevation and padding wherever you need a card container.',
    code: `import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';

const StyledCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[2],
  transition: theme.transitions.create('box-shadow'),
  '&:hover': {
    boxShadow: theme.shadows[6],
  },
}));

// Usage: <StyledCard>Content</StyledCard>`,
  },
  {
    id: 39,
    category: 'Material UI',
    question: 'What are the core MUI layout and input components?',
    answer: 'MUI provides layout primitives like Box, Stack, Grid, and Container for structuring pages without custom CSS. Input components include TextField, Select, Checkbox, RadioGroup, Switch, and Autocomplete for forms. Feedback components like Alert, Snackbar, Dialog, and Progress handle user notifications and loading states. Navigation components include AppBar, Drawer, Tabs, and Breadcrumbs. These components share consistent APIs for size, color, variant, and disabled states. In a real app, a settings page might combine Stack for vertical spacing, TextField for inputs, and Switch for toggles — all styled by the same theme.',
    code: `import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';

function SettingsForm() {
  return (
    <Stack spacing={3} maxWidth={480}>
      <TextField label="Display Name" defaultValue="Alice" />
      <FormControlLabel control={<Switch defaultChecked />} label="Email notifications" />
    </Stack>
  );
}`,
  },
  {
    id: 40,
    category: 'Material UI',
    question: 'What are the main strategies for customizing MUI components?',
    answer: 'MUI offers five customization levels: one-off sx prop styles, reusable styled() components, theme.components styleOverrides for global changes, individual component slot props, and fully unstyled Base UI primitives. Start with the least invasive approach — sx for single instances, theme overrides for system-wide changes. styleOverrides let you change every Button\'s border-radius without wrapping each usage. Unstyled components give full CSS control when the default look does not fit your brand. In a real app, you might use theme.components.MuiButton.styleOverrides to flatten all buttons for a non-Material brand aesthetic.',
    code: `const theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',  // remove uppercase
          borderRadius: 8,
        },
      },
      defaultProps: {
        disableElevation: true,
      },
    },
  },
});`,
  },
  {
    id: 41,
    category: 'Material UI',
    question: 'What is the difference between MUI and Joy UI?',
    answer: 'Material UI implements Google\'s Material Design with filled surfaces, elevation shadows, and ripple effects. Joy UI is MUI\'s newer library with a softer, more modern aesthetic using CSS variables, smaller bundle sizes, and a simpler API. Joy UI uses the sx prop and theming patterns familiar to MUI users but with different default styling and component design. Both share the same team and infrastructure but target different visual languages. In a real app, a Material Design enterprise dashboard might use MUI while a startup marketing site might choose Joy UI for its lighter, friendlier defaults.',
    code: `// Material UI
import Button from '@mui/material/Button';
<Button variant="contained">Material Button</Button>

// Joy UI
import Button from '@mui/joy/Button';
<Button variant="solid">Joy Button</Button>

// Both support theming but with different default aesthetics`,
  },
  {
    id: 42,
    category: 'Material UI',
    question: 'How do MUI breakpoints enable responsive design?',
    answer: 'MUI defines five default breakpoints — xs, sm, md, lg, xl — with pixel thresholds at 0, 600, 900, 1200, and 1536. The Grid, Stack, and sx prop accept responsive values as objects or arrays keyed by breakpoint. theme.breakpoints.up(\'md\') generates media query strings for use in styled components. Mobile-first logic applies styles at the breakpoint and above unless you use down() or only(). In a real app, sx={{ flexDirection: { xs: \'column\', md: \'row\' } }} stacks items vertically on phones and horizontally on tablets.',
    code: `import Grid from '@mui/material/Grid';

<Grid container spacing={2}>
  <Grid size={{ xs: 12, md: 8 }}>
    <MainContent />
  </Grid>
  <Grid size={{ xs: 12, md: 4 }}>
    <Sidebar />
  </Grid>
</Grid>

// sx responsive object
<Box sx={{ p: { xs: 1, sm: 2, md: 4 } }} />`,
  },
  {
    id: 43,
    category: 'Material UI',
    question: 'How does useMediaQuery work in MUI?',
    answer: 'useMediaQuery is a React hook that listens to CSS media queries and returns a boolean indicating whether the query currently matches. MUI provides helpers like useMediaQuery(theme.breakpoints.up(\'md\')) to reactively respond to viewport changes. It supports SSR with defaultMatches and noSsr options to avoid hydration mismatches. Use it for conditional rendering when CSS-only responsive design is not enough. In a real app, useMediaQuery(theme.breakpoints.down(\'sm\')) might render a Drawer navigation on mobile and a permanent Sidebar on desktop.',
    code: `import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

function Navigation() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return isMobile ? <MobileDrawer /> : <DesktopSidebar />;
}`,
  },
  {
    id: 44,
    category: 'Material UI',
    question: 'How do you customize the MUI palette?',
    answer: 'The palette object defines primary, secondary, error, warning, info, success, text, background, and divider colors with main, light, dark, and contrastText variants. createTheme merges your palette overrides with MUI defaults and computes accessible contrastText automatically. Custom palette keys can be added via module augmentation for brand-specific colors. Components reference palette colors through props like color="primary" or sx={{ color: \'text.secondary\' }}. In a real app, setting palette.primary to your brand blue and palette.error to a custom red ensures every Alert, Button, and Chip uses consistent semantic colors.',
    code: `const theme = createTheme({
  palette: {
    primary: {
      main: '#2563eb',
      light: '#60a5fa',
      dark: '#1d4ed8',
      contrastText: '#ffffff',
    },
    text: {
      primary: '#111827',
      secondary: '#6b7280',
    },
    background: {
      default: '#f9fafb',
      paper: '#ffffff',
    },
  },
});`,
  },
  {
    id: 45,
    category: 'Material UI',
    question: 'How does MUI handle typography?',
    answer: 'The theme typography object defines variants like h1 through h6, subtitle1, body1, body2, button, caption, and overline with fontSize, fontWeight, lineHeight, and letterSpacing. Typography component renders text with the correct variant and supports gutterBottom, noWrap, and color props. You customize the font family globally and override individual variant scales in createTheme. Responsive font sizes can adjust headings at different breakpoints via theme.typography.h1. In a real app, <Typography variant="h4" component="h1"> sets SEO-friendly h1 semantics with h4 visual styling.',
    code: `import Typography from '@mui/material/Typography';

const theme = createTheme({
  typography: {
    fontFamily: '"Inter", sans-serif',
    h1: { fontSize: '2.5rem', fontWeight: 700 },
    body1: { fontSize: '1rem', lineHeight: 1.6 },
  },
});

<Typography variant="h4" component="h1" gutterBottom>
  Dashboard
</Typography>`,
  },
  {
    id: 46,
    category: 'Material UI',
    question: 'What are component styleOverrides in MUI theming?',
    answer: 'styleOverrides in theme.components let you globally customize the internal CSS classes of any MUI component without wrapping or forking it. Each component exposes override keys matching its internal slots like root, label, input, or paper. This is the recommended way to change default styles across every instance of a component. Combine with defaultProps to set default prop values system-wide. In a real app, MuiOutlinedInput.styleOverrides.root might set a consistent border color and focus ring for every text input in the product.',
    code: `const theme = createTheme({
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: '#2563eb',
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: { fontWeight: 500 },
      },
    },
  },
});`,
  },
  {
    id: 47,
    category: 'Material UI',
    question: 'How does MUI support CSS variables for theming?',
    answer: 'MUI v5+ supports CSS theme variables via createTheme({ cssVariables: true }), generating var(--mui-palette-primary-main) custom properties on :root. CSS variables enable runtime theme switching without re-rendering the React tree, which is faster for toggling dark mode. The colorSchemes API in MUI v6 formalizes light and dark palettes with automatic variable generation. Components consume variables internally so custom CSS can reference the same tokens. In a real app, toggling data-mui-color-scheme="dark" on the html element switches the entire app theme instantly using CSS variables.',
    code: `const theme = createTheme({
  cssVariables: true,
  colorSchemes: {
    light: {
      palette: {
        primary: { main: '#2563eb' },
        background: { default: '#ffffff' },
      },
    },
    dark: {
      palette: {
        primary: { main: '#60a5fa' },
        background: { default: '#111827' },
      },
    },
  },
});`,
  },
  {
    id: 48,
    category: 'Material UI',
    question: 'Can you use MUI alongside Tailwind CSS?',
    answer: 'Yes, MUI and Tailwind can coexist in the same project though it requires configuration to avoid style conflicts. MUI uses Emotion for CSS-in-JS while Tailwind generates utility classes — they operate on different layers. Common approaches use MUI for complex components like DataGrid and DatePicker while Tailwind handles page layout and spacing. Configure Tailwind\'s important strategy or prefix to prevent specificity clashes with MUI\'s injected styles. In a real app, a dashboard page might use Tailwind for grid layout and spacing while MUI TextField and Dialog handle form interactions.',
    code: `// Tailwind for layout, MUI for components
<div className="grid grid-cols-12 gap-4 p-6">
  <div className="col-span-8">
    <TextField label="Search" fullWidth />
  </div>
  <div className="col-span-4 flex justify-end">
    <Button variant="contained">Export</Button>
  </div>
</div>`,
  },
  {
    id: 49,
    category: 'Material UI',
    question: 'What are slot props in MUI components?',
    answer: 'Slot props let you pass props to internal sub-components (slots) of a complex MUI component without restructuring its API. For example, TextField accepts slotProps.input to pass props to the underlying input element, or slotProps.inputLabel for the label. This replaces the older componentsProps API with a clearer naming convention. Slots map to identifiable parts of a component like root, input, label, or listbox. In a real app, slotProps.input on a TextField might set autoComplete="email" and aria-describedby for accessibility without wrapping the component.',
    code: `<TextField
  label="Password"
  type="password"
  slotProps={{
    input: {
      autoComplete: 'current-password',
      'aria-describedby': 'password-hint',
    },
    inputLabel: { shrink: true },
  }}
/>`,
  },
  {
    id: 50,
    category: 'Material UI',
    question: 'How do you implement dark mode in MUI?',
    answer: 'Dark mode in MUI is configured by setting palette.mode to "dark" in createTheme or using the colorSchemes API for automatic light/dark switching. Toggle mode by updating the theme or switching the color scheme at runtime. CssBaseline applies the correct background color for each mode. For CSS variables approach, toggle data-mui-color-scheme without re-rendering. Persist user preference in localStorage and respect prefers-color-scheme media query. In a real app, a theme toggle button switches palette.mode and saves the choice so returning users see their preferred mode.',
    code: `const [mode, setMode] = useState<'light' | 'dark'>('light');

const theme = useMemo(
  () => createTheme({ palette: { mode } }),
  [mode],
);

<ThemeProvider theme={theme}>
  <IconButton onClick={() => setMode(m => m === 'light' ? 'dark' : 'light')}>
    {mode === 'light' ? <DarkModeIcon /> : <LightModeIcon />}
  </IconButton>
  <App />
</ThemeProvider>`,
  },
  {
    id: 51,
    category: 'Material UI',
    question: 'What is MUI Base UI and when should you use it?',
    answer: 'Base UI (@mui/base) provides unstyled, accessible component primitives with behavior and ARIA attributes but no default CSS. You bring your own styling via CSS modules, Tailwind, or styled components for complete visual control. Base UI suits design systems that need MUI\'s robust accessibility and interaction logic without Material Design aesthetics. Components include Button, Input, Select, Modal, and Tabs as headless building blocks. In a real app, a company with a custom brand might use Base UI Modal for focus trapping and escape key handling while styling it entirely with their Tailwind design tokens.',
    code: `import { Modal } from '@mui/base/Modal';

function CustomDialog({ open, onClose, children }) {
  return (
    <Modal open={open} onClose={onClose}>
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-xl p-6 max-w-md">
          {children}
        </div>
      </div>
    </Modal>
  );
}`,
  },
]
