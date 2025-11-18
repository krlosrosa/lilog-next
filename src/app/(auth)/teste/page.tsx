import AddNewCenter from '@/_modules/center/components/addNewCenter';
import SearchInput from '@/_shared/_components/searchInput';

type Props = {
  searchParams?: Promise<{ search?: string }>;
};

export default async function TestePage({ searchParams }: Props) {
  const params = await searchParams;
  const search = params?.search || '';
  return (
    <div>
      {search}
      <SearchInput />
      <AddNewCenter />
    </div>
  );
}
