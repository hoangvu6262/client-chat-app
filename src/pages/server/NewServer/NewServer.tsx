import React, { useRef, useEffect } from "react";
import ServerModal from "../../../components/server/ServerModal/ServerModal";
import { RefType } from "../../../components/server/ServerModal/ServerModal";

type Props = {};

const NewServer = (props: Props) => {
  const refModal = useRef<RefType>(null);

  useEffect(() => {
    refModal && refModal.current?.onOpen();
  }, [refModal]);

  return (
    <div>
      <ServerModal ref={refModal} />
    </div>
  );
};

export default NewServer;
