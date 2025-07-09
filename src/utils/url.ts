import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

type ParamUpdate = {
  key: string;
  value: string;
};

export const useUpdateSearchParam = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const updateParams = (updates: ParamUpdate[] | ParamUpdate) => {
    const params = new URLSearchParams(searchParams.toString());

    const updatesArray = Array.isArray(updates) ? updates : [updates];

    updatesArray.forEach(({ key, value }) => {
      if (value.trim() === "") {
        params.delete(key);
      } else {
        params.set(key, value);
      }
    });

    setSearchParams(params);
  };

  return updateParams;
};

export const useSetInitialSearchParams = (defaults: Record<string, string>) => {
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    if ([...searchParams.keys()].length === 0) {
      setSearchParams(defaults);
    }
  }, []);
};
