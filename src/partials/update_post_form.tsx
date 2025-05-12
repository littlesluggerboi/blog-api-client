"use client";

import { updatePost } from "@/app/actions/post";
import { Post } from "@/app/lib/definitions";
import { useRouter } from "next/navigation";
import { useActionState, useState } from "react";
import Spinner from "./spinner";

export default function UpdatePostForm(props: { post: Post }) {
  const [state, action, pending] = useActionState(updatePost, undefined);
  const router = useRouter();
  const [input, setInput] = useState({
    content: props.post.content,
    title: props.post.title,
  });
  return (
    <div className="shadow border border-gray-200 rounded-2xl">
      <div className="bg-blue-50 p-8 rounded-t-2xl border-b border-b-gray-300">
        <h2 className="font-heading text-2xl font-semibold">
          Update A Blog Post
        </h2>
        <p className="font-text font-[350] text-gray-600">
          Share your thoughts with the community.
        </p>
      </div>
      <form className="p-8" action={action}>
        <input
          type="number"
          defaultValue={props.post.id}
          name="id"
          id="id"
          className="hidden"
          readOnly
        />
        {state?.message && (
          <p className="text-red-600 text-center font-text text-2xl">
            {state.message}
          </p>
        )}
        <label
          className="block font-heading font-medium text-lg"
          htmlFor="title"
        >
          Title
        </label>
        {state?.errors?.title && (
          <p className="text-red-600 font-text">* {state.errors.title}</p>
        )}
        <input
          className="block border-gray-300 mb-8 font-text p-3 font-[350] rounded-sm hover:outline-(--color-light) border w-full"
          type="text"
          id="title"
          name="title"
          placeholder="Title"
          value={input.title}
          onChange={(e) => setInput({ ...input, title: e.target.value })}
        />
        <label
          className="block font-heading font-medium text-lg"
          htmlFor="content"
        >
          Content
        </label>
        {state?.errors?.content && (
          <p className="text-red-600 font-text">* {state.errors.content}</p>
        )}
        <textarea
          className="block border-gray-300 mb-8 font-text p-3 font-[350] rounded-sm hover:outline-(--color-light) border w-full resize-none"
          rows={15}
          name="content"
          id="content"
          placeholder="Write content here..."
          value={input.content}
          onChange={(e) => setInput({ ...input, content: e.target.value })}
        ></textarea>
        <div className="flex justify-end items-center gap-2 mt-8">
          <button
            className="shadow py-2 px-4 border font-heading cursor-pointer hover:bg-gray-300 text-lg border-gray-300 rounded-sm"
            type="button"
            onClick={() => router.back()}
          >
            Cancel
          </button>
          <button
            disabled={
              input.content == props.post.content &&
              input.title == props.post.title
            }
            className="shadow py-2 px-4 border font-heading cursor-pointer text-lg bg-(--color-light) text-white hover:bg-(--color-sub) border-gray-300 rounded-sm flex items-center gap-1 justify-center disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Update Post
            {pending && <Spinner height="18" width="18" />}
          </button>
        </div>
      </form>
    </div>
  );
}
