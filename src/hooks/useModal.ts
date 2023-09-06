import { useState } from "react";

const useModal = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [data, setData] = useState<Record<string, any>>({});

  const _handleToggle = (data?: Record<string, any>) => {
    !!data && setData(data);
    setOpen(!open);
  };

  return { open, data, _handleToggle } as const;
};

export default useModal;
