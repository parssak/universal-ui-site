import { MDXProvider as Provider } from "@mdx-js/react";
import { Text } from "@parssa/universal-ui";
import { CodeBlock } from "./CodeBlock";

const components = {
  h1: (props) => <Text {...props} variant="h1" />,
  h2: (props) => <Text {...props} variant="h2" />,
  h3: (props) => <Text {...props} variant="h3" />,
  h4: (props) => <Text {...props} variant="h4" />,
  h5: (props) => <Text {...props} variant="h5" />,
  h6: (props) => <Text {...props} variant="h6" />,
  p: (props) => <Text {...props} variant="p" />,
  code: (props) => <Text {...props} variant="code" />,
  kbd: (props) => <Text {...props} variant="kbd" />,
  pre: (props) => <CodeBlock {...props} />
};

export const MDXProvider = ({ children }: { children: React.ReactNode }) => (
  <Provider components={components}>
    <>{children}</>
  </Provider>
);
