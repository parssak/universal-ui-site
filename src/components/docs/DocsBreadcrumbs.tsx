import { Button } from "@parssa/universal-ui";
import { useRouter } from "next/router";
import React, { useMemo } from "react";
import { HiChevronRight, HiMenu } from "react-icons/hi";
import { cx } from "utils";
import { NAV_SECTIONS } from "./constants";

type DivProps = React.HTMLAttributes<HTMLDivElement>;

export const DocsBreadcrumbs = ({ ...props }: DivProps & {}) => {
  const router = useRouter();

  const path = router.asPath;

  const activeSection = useMemo(() => {
    const activeSection = NAV_SECTIONS.find((item) => {
      return item.items.some((item) => item.href === path);
    });

    console.debug("activeSection", activeSection);

    if (!activeSection) return null;

    const activeRoute = {
      title: activeSection.title,
      child: activeSection.items.find((item) => item.href === path)
    };

    return activeRoute;
  }, [path]);

  console.log(activeSection);

  return (
    <div {...props} className={cx("flex items-center", props.className)}>
      <Button
        variant="ghost"
        className="pl-0 pr-0 pt-0 pb-0 hover:bg-theme-pure ml-[-6px]"
        icon={<HiMenu className="text-size w-full h-full scale-110" />}
      >
        <div className="sr-only">Toggle Sidebar</div>
      </Button>
      {/* <HiChevronRight className="w-5 h-5 opacity-60 text-theme-base mr-size-hx" /> */}
      {activeSection && (
        <div className="flex items-center">
          <div className="text-theme-base text-size-2x font-medium opacity-70">{activeSection.title}</div>
          <HiChevronRight className="w-5 h-5 opacity-60 text-theme-base mx-size-hx" />
          <div className="text-theme-base text-size-2x font-medium">
            {activeSection.child.title}
          </div>
        </div>
      )}
    </div>
  );
};
