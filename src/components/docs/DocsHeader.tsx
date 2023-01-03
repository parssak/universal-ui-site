import { Text } from "@parssa/universal-ui";
import { useRouter } from "next/router";
import React from "react";

export const DocsHeader = ({
  title,
  description,
  ...props
}: Omit<DivProps, "title"> & {
  title: React.ReactNode;
  description?: React.ReactNode;
}) => {
  const router = useRouter();

  const section = router.pathname.split("/")[2];

  return (
    <div {...props}>
      {/* {!(title === "Getting Started" && section === "getting-started") && <Text size='xs' className='uppercase tracking-wider text-theme-muted/80 -mb-4 relative -top-5'>{section.replace(/-/g, " ")}</Text>} */}
      <Text variant="h1" className="gradient-text leading-tight">
        {title}
      </Text>
      {description && (
        <Text variant="h4" as="p" className="text-theme-muted font-medium">
          {description}
        </Text>
      )}
    </div>
  );
};
