import { MDXProvider as Provider } from "@mdx-js/react";
import { Text } from "@parssa/universal-ui";
import { CodeBlock } from "./CodeBlock";

const components = {
  h1: (props) => <Text {...props} variant="h1" />,
  h2: (props) => <Text {...props} variant="h2" className='mt-size-4y' />,
  h3: (props) => <Text {...props} variant="h3" />,
  h4: (props) => <Text {...props} variant="h4" />,
  h5: (props) => <Text {...props} variant="h5" />,
  h6: (props) => <Text {...props} variant="h6" />,
  p: (props) => <Text {...props} variant="p" className='mt-size-2y opacity-80' />,
  code: (props) => <Text {...props} variant="code" size='sm'  />,
  kbd: (props) => <Text {...props} variant="kbd" />,
  pre: (props) => <CodeBlock {...props} className='my-size-4y' />
};

export const MDXProvider = ({ children }: { children: React.ReactNode }) => (
  <Provider components={components}>
    <>{children}</>
  </Provider>
);
