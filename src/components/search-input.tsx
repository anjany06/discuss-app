"use client";
import { useSearchParams } from "next/navigation";
import { Input } from "./ui/input";
import React from "react";
import { search } from "@/actions/search";

const SearchInput = () => {
  const searchParams = useSearchParams();
  return (
    <form action={search}>
      <Input
        defaultValue={searchParams.get("term") || ""}
        type="text"
        placeholder="Search Post..."
        name="term"
      />
    </form>
  );
};

export default SearchInput;
