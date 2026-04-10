import AddItem  from './component/addItem';
import ListItems from './component/listItem';

export default async function list() {
  return (
    <>
      <AddItem />
      <ListItems />
    </>
  );
}
