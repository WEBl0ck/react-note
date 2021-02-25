import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  *,
  *::after,
  *::before {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    padding: 0;
    font-family: "Roboto Condensed", sans-serif;
  }
  
    .left-sidebar,
    .right-sidebar {
        background-color: ${({ theme }) => theme.sidebar};
        transition: all 0.25s linear !important;
    }

    .is-active {
        border-left: 2px solid ${({ theme }) => theme.isActive} !important;
        svg {
            fill: ${({ theme }) => theme.isActive};
        }
    }

    .left-sidebar__create-icon,
    .left-sidebar__notes-icon,
    .left-sidebar__setting-icon,
    .left-sidebar__info-icon {
        a {
            &:hover {
            fill: ${({ theme }) => theme.isActive};
            }
        }
    }

    .main-frame,
    .note-title-field, 
    .note-body-field,
    .note-search-field {
        background-color: ${({ theme }) => theme.mainFrame};
        transition: all 0.25s linear !important;
    }

    .note-title-field, 
    .note-body-field,
    .app-name,
    .app-creator,
    .note-search-field,
    .left-sidebar__notes-text
     {
        color: ${({ theme }) => theme.text};
        transition: all 0.25s linear !important;
    }

    .note-unsaved-changes {
        color: ${({ theme }) => theme.text};
        svg g {
            fill: ${({ theme }) => theme.text};
        }
    }

    .app-description {
        color: ${({ theme }) => theme.isActive};
        transition: all 0.25s linear !important;
    }

    .settings {
        border-left: 8px solid ${({ theme }) => theme.mainFrame};
        transition: all 0.25s linear !important;
    }
  `;
