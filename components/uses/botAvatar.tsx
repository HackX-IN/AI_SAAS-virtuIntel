import React from "react";
import { Avatar, AvatarImage } from "../ui/avatar";

type Props = {};

const botAvatar = (props: Props) => {
  return (
    <Avatar className="h-9 w-8 ">
      <AvatarImage className="p-1" src="/log.png" />
    </Avatar>
  );
};

export default botAvatar;
