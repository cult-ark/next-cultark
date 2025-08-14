export interface BaseComponentProps {
  className?: string;
}

export interface BaseParentComponentProps extends BaseComponentProps {
  children: JSX.Element | JSX.Element[];
}
