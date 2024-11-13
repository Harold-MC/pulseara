import { useState } from 'react';

function useFieldArray<T>(initialArray: T[]) {
  const [fields, setFields] = useState<T[]>(initialArray);

  const append = (item: T): void => {
    setFields((prevFields) => [...prevFields, item]);
  };

  const remove = (index: number): void => {
    setFields((prevFields) => prevFields.filter((_, i) => i !== index));
  };

  const update = (index: number, newItem: Partial<T>): void => {
    setFields((prevFields) => 
      prevFields.map((item, i) => (i === index ? { ...item, ...newItem } : item))
    );
  };

  return {
    fields,
    append,
    remove,
    update,
  };
}

export default useFieldArray;
