import type { NavItemKey } from "./types";

type NavIconProps = {
  name: NavItemKey;
};

export function NavIcon({ name }: NavIconProps) {
  switch (name) {
    case "dashboard":
      return (
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none">
          <path
            d="M4 4h7v7H4zM13 4h7v4h-7zM13 10h7v10h-7zM4 13h7v7H4z"
            stroke="currentColor"
            strokeWidth="1.6"
          />
        </svg>
      );
    case "analytics":
      return (
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none">
          <path
            d="M5 18V9m7 9V6m7 12v-4"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </svg>
      );
    case "orders":
      return (
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none">
          <path
            d="M6 7h12M6 12h12M6 17h8"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </svg>
      );
    case "customers":
      return (
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none">
          <path
            d="M16 11a4 4 0 1 0-8 0M4 19c1.8-2.5 5-4 8-4s6.2 1.5 8 4"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </svg>
      );
    case "reviews":
      return (
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none">
          <path
            d="M12 4l2.2 4.6 5 .7-3.6 3.5.9 4.9L12 15.5 7.5 17.7l.9-4.9L4.8 9.3l5-.7L12 4z"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "chats":
      return (
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none">
          <path
            d="M5 5h14v10H8l-3 4V5z"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "wallet":
      return (
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none">
          <path
            d="M4 7h16v10H4zM16 12h4"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </svg>
      );
    case "logout":
      return (
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none">
          <path
            d="M15 7l4 5-4 5M4 12h15"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </svg>
      );
    default:
      return null;
  }
}
