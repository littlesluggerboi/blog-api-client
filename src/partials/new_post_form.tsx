"use client";

import Spinner from "./spinner";
import { postPost } from "@/app/actions/newpost";
import { useActionState } from "react";

export default function NewPostForm() {
  const [state, action, pending] = useActionState(postPost, undefined);
  return (
    <>
      <div className="shadow border border-gray-200 rounded-2xl">
        <div className="bg-blue-50 p-8 rounded-t-2xl border-b border-b-gray-300">
          <h2 className="font-heading text-2xl font-semibold">
            Create A New Blog Post
          </h2>
          <p className="font-text font-[350] text-gray-600">
            Share your thoughts with the community.
          </p>
        </div>
        <form className="p-8" action={action}>
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
          ></textarea>
          <input type="checkbox" id="is_published" name="is_published" />
          <label
            className="font-heading ml-2 font-medium text-lg"
            htmlFor="is_published"
          >
            Publish?
          </label>
          {state?.errors?.is_published && (
            <p className="text-red-600 font-text">
              * {state.errors.is_published}
            </p>
          )}
          <div className="flex justify-end items-center gap-2">
            <button
              className="shadow py-2 px-4 border font-heading cursor-pointer hover:bg-gray-300 text-lg border-gray-300 rounded-sm"
              type="button"
            >
              Cancel
            </button>
            <button className="shadow py-2 px-4 border font-heading cursor-pointer text-lg bg-(--color-light) text-white hover:bg-(--color-sub) border-gray-300 rounded-sm flex items-center gap-1 justify-center">
              Create Post {pending && <Spinner height="18" width="18" />}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
