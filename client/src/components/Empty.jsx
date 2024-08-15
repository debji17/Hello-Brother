import Image from "next/image";
import React from "react";

function Empty() {
  return (
    <div className="border-conversation-border border-l w-full bg-panel-header-background flex flex-col items-center justify-center h-[100vh] border-b-icon-green">
      <Image src="/hello.gif" alt="hello" height={300} width={300} />
    </div>
  );
}

export default Empty;
