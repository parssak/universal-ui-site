import React from "react";

class ErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("component did catch!", error, errorInfo);
  }

  render() {
    return <>{this.props.children}</>;
  }
}

export { ErrorBoundary };
