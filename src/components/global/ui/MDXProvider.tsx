import { MDXProvider as Provider } from "@mdx-js/react";
import { Text } from "@parssa/universal-ui";
import { cx } from "utils";
import { CodeBlock } from "./CodeBlock";
import * as Icon from "react-icons/hi";


const components = {
  h1: (props) => <Text {...props} variant="h1" />,
  h2: ({ children, props }) => (
    <Text {...props} variant="h2" className="mt-size-4y text-theme-active">
      {children}
      <div
        className="relative  -top-24 invisible"
        id={children.toString().replace(/ /g, "_").toLowerCase()}
      ></div>
    </Text>
  ),
  h3: ({ children, props }) => (
    <Text {...props} variant="h3" className="mt-size-4y text-theme-base/90">
      {children}
      <div
        className="relative -top-24 invisible"
        id={children.toString().replace(/ /g, "_").toLowerCase()}
      ></div>
    </Text>
  ),

  h4: (props) => <Text {...props} variant="h4" />,
  h5: (props) => <Text {...props} variant="h5" />,
  h6: (props) => <Text {...props} variant="h6" />,
  p: (props) => (
    <Text {...props} variant="p" className="mt-size-x mdx-p-tag text-theme-muted" />
  ),
  a: (props) => (
    <Text
      {...props}
      as="a"
      className={cx(
        // base
        "inline-block text-blue-500 dark:text-blue-400 ",
        "duration-300 ease-spring transition-all skew-x-1",
        // base -> hover
        "hover:-hue-rotate-60 hover:-skew-x-6",
        // ::before (rect)
        "before:block before:absolute before:inset-y-0 before:-inset-x-0.5 before:scale-75",
        "before:rounded before:opacity-0 before:bg-sky-400/20",
        "before:duration-300 before:ease-spring",
        // ::before -> hover
        "hover:before:opacity-100 hover:before:scale-100",
        // ::after (underline)
        "after:absolute after:w-full after:bottom-0 after:rounded-full",
        "after:h-[1.5px] after:left-0 after:scale-x-95 after:-translate-y-0.5",
        "after:bg-blue-500 dark:after:bg-blue-400",
        "after:duration-300 after:ease-spring after:transition-all",
        // ::after -> hover
        "hover:after:scale-x-75 hover:after:translate-y-0.5 hover:after:opacity-80"
      )}
    />
  ),
  code: (props) => (
    <Text
      {...props}
      variant="code"
      size="sm"
      className="text-theme-muted border-theme-base/40 font-normal"
    />
  ),
  kbd: (props) => <Text {...props} variant="kbd" />,
  pre: (props) => <CodeBlock {...props} className="mt-size-2y mb-size-4y" />,
  hr: (props) => <hr {...props} className="my-8 text-theme-muted border-theme-muted" />
};

export const MDXProvider = ({ children }: { children: React.ReactNode }) => (
  <Provider components={components}>
    <>{children}</>

  </Provider>
);
