import { NavLink } from "react-router-dom";
import type { NavSection } from "../types";
import { sectionToPath } from "../routes";
import { ThemeToggle } from "./ThemeToggle";

interface SidebarProps {
  mobileOpen: boolean;
  onMobileClose: () => void;
}

const NAV_GROUPS: {
  label: string;
  items: { id: NavSection; label: string }[];
}[] = [
  // {
  //   label: 'Study',
  //   items: [{ id: 'role-study', label: 'My Role' }],
  // },
  {
    label: "Practice",
    items: [{ id: "coding-practice", label: "Coding Practice" }],
  },
  {
    label: "Leadership & AI",
    items: [
      { id: "senior-lead", label: "Senior Lead" },
      { id: "agentic-dev", label: "Agentic Dev" },
    ],
  },
  {
    label: "Languages & Frameworks",
    items: [
      { id: "javascript", label: "JavaScript" },
      { id: "typescript", label: "TypeScript" },
      { id: "react", label: "React" },
      { id: "nextjs", label: "Next.js" },
    ],
  },
  {
    label: "UI & Markup",
    items: [
      { id: "css", label: "CSS" },
      { id: "html", label: "HTML" },
      { id: "design-systems", label: "Design Systems" },
    ],
  },
  {
    label: "Platform & Quality",
    items: [
      { id: "git", label: "Git" },
      { id: "api", label: "API" },
      { id: "performance", label: "Performance" },
      { id: "testing", label: "Testing" },
      { id: "cicd", label: "CI/CD" },
    ],
  },
];

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

export function Sidebar({ mobileOpen, onMobileClose }: SidebarProps) {
  const handleNav = () => {
    onMobileClose();
    scrollToTop();
  };

  return (
    <>
      <div
        className={`sidebar-backdrop ${mobileOpen ? "visible" : ""}`}
        onClick={onMobileClose}
        aria-hidden="true"
      />
      <aside
        className={`sidebar ${mobileOpen ? "mobile-open" : ""}`}
        aria-label="Topics"
      >
        <div className="sidebar-header">
          <NavLink
            to={sectionToPath("role-study")}
            className="sidebar-brand"
            onClick={handleNav}
          >
            <span className="sidebar-brand-mark" aria-hidden="true">
              FR
            </span>
            <span className="sidebar-brand-text">Frontend Reviewer</span>
          </NavLink>
        </div>

        <nav className="sidebar-nav">
          {NAV_GROUPS.map((group) => (
            <div key={group.label} className="sidebar-group">
              <span className="sidebar-group-label">{group.label}</span>
              <ul className="sidebar-list">
                {group.items.map((item) => (
                  <li key={item.id}>
                    <NavLink
                      to={sectionToPath(item.id)}
                      className={({ isActive }) =>
                        `sidebar-link ${isActive ? "active" : ""}`
                      }
                      onClick={handleNav}
                    >
                      {item.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>

        <div className="sidebar-footer">
          <ThemeToggle />
        </div>
      </aside>
    </>
  );
}

export function MobileNavToggle({
  onClick,
  expanded,
}: {
  onClick: () => void;
  expanded: boolean;
}) {
  return (
    <button
      type="button"
      className="mobile-nav-toggle"
      onClick={onClick}
      aria-expanded={expanded}
      aria-label={expanded ? "Close menu" : "Open menu"}
    >
      <span className="mobile-nav-toggle-bar" />
      <span className="mobile-nav-toggle-bar" />
      <span className="mobile-nav-toggle-bar" />
    </button>
  );
}
