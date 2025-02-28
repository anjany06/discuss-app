"use server"

import { redirect } from "next/navigation";

export const search = async(formdata : FormData)=>{
  const term = formdata.get("term");

  if(typeof term !== "string" || !term){
    redirect("/");
  }

  redirect(`/search?term=${term}`)
}