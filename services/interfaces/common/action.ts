export interface IAction {
  actionName: string;
  actionUrl: string;
  deleteAction?: (id: string) => void;
}
