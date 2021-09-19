export default function Button({
  children,
  ...rest
}: {
  children: JSX.Element | JSX.Element[];
  [x: string]: any;
}) {
  return (
    <div className="button-wrapper" {...rest}>
      {children}
    </div>
  );
}
