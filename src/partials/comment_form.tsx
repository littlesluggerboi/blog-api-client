"use client";

import { comment } from "@/app/actions/comment";
import { useActionState, useState } from "react";
import Spinner from "./spinner";

export default function CommentForm(props: { post_id: number }) {
  const [input, setInput] = useState({ comment: "", form: false });
  const [state, action, pending] = useActionState(comment, undefined);
  return (
    <>
      <div className="max-w-4xl mx-auto my-8">
        <div className="grid grid-cols-[auto_1fr] gap-2">
          <div className=" w-10 h-10 bg-(--color-light) text-white font-text font-semibold flex justify-center items-center uppercase">
            A
          </div>
          <form action={action}>
            {state?.message && (
              <p className="text-red-600 font-text absolute">{state.message}</p>
            )}
            <input
              type="number"
              id="post_id"
              name="post_id"
              defaultValue={props.post_id}
              readOnly
              className="hidden"
            />
            {state?.message && (
              <input
                value={input.comment}
                onChange={(e) =>
                  setInput({ ...input, comment: e.target.value })
                }
                type="text"
                name="comment"
                id="comment"
                disabled
                className="border-b-gray-400 border-b w-full focus:outline-none focus:border-b-black focus:border-b-2 font-text text-sm font-light"
                placeholder="Add comment"
                onFocus={() => setInput({ ...input, form: true })}
                onBlur={() => {
                  if (input.comment == "") setInput({ ...input, form: false });
                }}
              />
            )}
            {!state?.message && (
              <input
                value={input.comment}
                onChange={(e) =>
                  setInput({ ...input, comment: e.target.value })
                }
                type="text"
                name="comment"
                id="comment"
                className="border-b-gray-400 border-b w-full focus:outline-none focus:border-b-black focus:border-b-2 font-text text-sm font-light"
                placeholder="Add comment"
                onFocus={() => setInput({ ...input, form: true })}
                onBlur={() => {
                  if (input.comment == "") setInput({ ...input, form: false });
                }}
              />
            )}
            {input.form && (
              <div className="flex gap-2 mt-2 font-heading text-[0.8rem] items-center justify-end">
                <button
                  className="shadow py-1 px-4 rounded-2xl cursor-pointer hover:bg-gray-200"
                  type="button"
                  onClick={() => setInput({ ...input, comment: "" })}
                >
                  Cancel
                </button>
                <button
                  className="shadow py-1 px-4 rounded-2xl cursor-pointer text-white disabled:opacity-50 disabled:cursor-not-allowed bg-(--color-light) hover:bg-(--color-sub)"
                  disabled={input.comment == ""}
                >
                  Comment
                  {pending && <Spinner height="10" width="10" />}
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </>
  );
}
