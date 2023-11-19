import Image from "next/image";
import React from "react";

type Props = {
  label: string;
};

const EmptyComp = ({ label }: Props) => {
  return (
    <div className="h-full p-20 flex flex-col items-center justify-center">
      <div>
        <Image alt="Empty" src="/empty.png" width={230} height={230} />
        <p className="text-muted-foreground text-sm text-center">{label}</p>
      </div>
    </div>
  );
};

export default EmptyComp;
