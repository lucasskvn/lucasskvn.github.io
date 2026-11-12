import { Component } from "react";
import type { ReactNode, ErrorInfo } from "react";
export default class ErrorBoundary extends Component<
  { children: ReactNode; compact?: boolean },
  { hasError: boolean }
> {
  state = { hasError: false };
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("INTERVALLE:", error, info.componentStack);
  }
  render() {
    return this.state.hasError ? (
      <div className={`error-recovery${this.props.compact ? " compact" : ""}`}>
        <span className="eyebrow">UNE PETITE INTERRUPTION</span>
        <h1>Reprenons là.</h1>
        <p>
          Cette application n’a pas pu s’afficher. Vos notes enregistrées
          restent dans ce navigateur.
        </p>
        <button
          className="primary-button"
          onClick={() => this.setState({ hasError: false })}
        >
          Réessayer
        </button>
        <a
          className="text-button"
          href="https://github.com/lucasskvn"
          target="_blank"
          rel="noreferrer"
        >
          Retrouver mes projets sur GitHub ↗
        </a>
      </div>
    ) : (
      this.props.children
    );
  }
}
