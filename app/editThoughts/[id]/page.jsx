import Editform from "@/component/editform";
export default async function Page({ params }) {
  const { id } = await params;
  return <Editform Id={id} />;
}

