import { useParams } from 'next/route';
export default function index() {
  const user = useParams();
  console.log(user);
  return <div>Hello world</div>;
}
