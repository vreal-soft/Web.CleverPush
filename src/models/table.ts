export interface IItem {
  id: string
  firstName: string
  lastName: string
  index: number
  moveCard(dragIndex: number, hoverIndex: number): void
}
