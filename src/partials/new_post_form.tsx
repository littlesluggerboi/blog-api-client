"use client";
export default function NewPostForm() {
  return (
    <>
      <div className="shadow border border-gray-200 rounded-2xl">
        <div className="bg-blue-50 p-8 rounded-t-2xl border-b border-b-gray-300">
          <h2 className="font-heading text-2xl font-semibold">Create A New Blog Post</h2>
          <p className="font-text font-[350] text-gray-600">Share your thoughts with the community.</p>
        </div>
        <form className="p-8" action="">
            <label className="block font-heading font-medium text-lg" htmlFor="title">Title</label>
            <input className="block border-gray-300 mb-8 font-text p-3 font-[350] rounded-sm hover:outline-(--color-light) border w-full" type="text" id="title" name="title" required placeholder="Title" />
            <label className="block font-heading font-medium text-lg" htmlFor="content">Content</label>
            <textarea className="block border-gray-300 mb-8 font-text p-3 font-[350] rounded-sm hover:outline-(--color-light) border w-full resize-none" rows={15} name="content" id="content" placeholder="Write content here..."></textarea>
            <input type="checkbox" id="is_published" name="is_published" />
            <label className="font-heading ml-2 font-medium text-lg" htmlFor="is_published">Publish?</label>
            <div className="flex justify-end items-center gap-2">
                <button className="shadow py-2 px-4 border font-heading cursor-pointer hover:bg-gray-300 text-lg border-gray-300 rounded-sm" type="button">Cancel</button>
                <button className="shadow py-2 px-4 border font-heading cursor-pointer text-lg bg-(--color-light) text-white hover:bg-(--color-sub) border-gray-300 rounded-sm">Create Post</button>
            </div>
        </form>
      </div>
    </>
  );
}
