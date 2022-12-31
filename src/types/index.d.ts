type DivProps = React.HTMLAttributes<HTMLDivElement>;

interface ComponentProp {
  name: string;
  type: PropTypes | string;
  description?: string;
  value: string | number | boolean | any;
  defaultValue?: string | number | boolean;
  placeholder?: string;
  options?: string[];
}