export interface IRoute {
  path: string;
  element: React.ReactNode;
  children?: IRoute[];
}
