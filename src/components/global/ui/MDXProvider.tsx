import { MDXProvider as Provider } from "@mdx-js/react";
import { Text } from "@parssa/universal-ui";
import { CodeBlock } from "./CodeBlock";

const components = {
  h1: (props) => <Text {...props} variant="h1" />,
  h2: (props) => (
    <Text
      {...props}
      variant="h2"
      className="mt-size-4y"
      id={props.children.toString().replace(/ /g, "_").toLowerCase()}
    />
  ),
  h3: (props) => (
    <Text
      {...props}
      variant="h3"
      className="mt-size-2y"
      id={props.children.toString().replace(/ /g, "_").toLowerCase()}
    />
  ),
  h4: (props) => <Text {...props} variant="h4" />,
  h5: (props) => <Text {...props} variant="h5" />,
  h6: (props) => <Text {...props} variant="h6" />,
  p: (props) => <Text {...props} variant="p" className="mt-size-x text-theme-muted" />,
  a: (props) => (
    <Text
      {...props}
      theme="info"
      as="a"
      className="text-theme-active underline underline-offset-2"
    />
  ),
  code: (props) => (
    <Text
      {...props}
      variant="code"
      size="sm"
      className="text-theme-muted border-theme-base/40 font-normal"
      theme="brand"
    />
  ),
  kbd: (props) => <Text {...props} variant="kbd" />,
  pre: (props) => <CodeBlock {...props} className="mt-size-2y mb-size-4y" />
};

export const MDXProvider = ({ children }: { children: React.ReactNode }) => (
  <Provider components={components}>
    <>{children}</>
  </Provider>
);
