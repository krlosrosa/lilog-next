'use client';
import { useState, useEffect } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useDebounce } from 'use-debounce'; // ✅ import da lib

export function useUpdateSearchParam(paramName: string, delay = 800) {
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const { replace } = useRouter();

  const [value, setValue] = useState(searchParams.get(paramName) || '');
  const [debouncedValue] = useDebounce(value, delay); // ✅ aplica debounce

  useEffect(() => {
    const params = new URLSearchParams(searchParams);

    params.set(paramName, debouncedValue);
    if (debouncedValue) {
    } else {
      params.delete(paramName);
    }

    replace(`${pathName}?${params.toString()}`);
  }, [debouncedValue]); // ✅ reage só ao valor debounced

  return { value, setValue };
}
