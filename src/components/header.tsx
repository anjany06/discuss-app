import React, { Suspense } from "react";

import AuthHeader from "./auth-header";
import SearchInput from "./search-input";

const HeaderPage = async () => {
  // const session = await auth(); // yeh user info niklne ka tareeka sirf server comp me hi kaam krega
  // client comp me tareeka thoda alg hai
  return (
    <div className="grid grid-cols-3 h-14 items-center mt-6">
      <div className="flex justify-start">
        <h1 className="font-bold text-xl">Discuss</h1>
      </div>
      <div className="flex justify-center">
        <Suspense>
          <SearchInput />
        </Suspense>
      </div>
      <div className="flex justify-end gap-2">
        <AuthHeader />
      </div>
    </div>
  );
};

export default HeaderPage;
