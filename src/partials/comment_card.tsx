"use client";
import { deleteComment, updateComment } from "@/app/actions/comment";
import { Comment, User } from "@/app/lib/definitions";
import icons from "@/static_resources/icons";
import { useRouter } from "next/navigation";
import { useActionState, useState } from "react";
import Spinner from "./spinner";

export default function CommentCard(props: {
  comment: Comment;
  user: User | null;
}) {
  const [state, action, pending] = useActionState(updateComment, undefined);
  const router = useRouter();
  const [edit, setEdit] = useState({
    comment: props.comment.comment,
    form: false,
  });
  const [menu, setMenu] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const deleteAction = () => {
    const advance = confirm("Are you sure you want to delete this comment?");
    if (advance) {
      setDeleteLoading(true);
      deleteComment(props.comment.id)
        .then(() => {
          router.push(`/posts/${props.comment.post_id}`);
        })
        .catch((err) => {
          alert(err.message);
        })
        .finally(() => setDeleteLoading(false));
    }
  };
  return (
    <div className="my-4">
      <div className="grid grid-cols-[auto_1fr] gap-2">
        <div className=" w-8 h-8 bg-(--color-warn) text-white font-text font-semibold flex justify-center items-center uppercase">
          {props.comment.user.username
            ? props.comment.user.username.charAt(0)
            : props.comment.user.email.charAt(0)}
        </div>
        <div className="mb-4">
          <div className="font-text flex justify-between">
            <p>{props.comment.user.username} </p>

            {props.user && props.user.email == props.comment.user.email && (
              <div
                className="relative"
                onMouseOver={() => setMenu(true)}
                onMouseLeave={() => setMenu(false)}
              >
                <div className="w-6 p-1 hover:bg-gray-200 rounded-2xl h-fit">
                  {icons.get("ellipsis menu")}
                </div>
                {menu && (
                  <div className="z-10 py-2 right-0 bg-white absolute shadow">
                    <button
                      onClick={() => {
                        setEdit({ ...edit, form: true });
                      }}
                      className="hover:bg-gray-100 w-full px-4 cursor-pointer"
                    >
                      Edit
                    </button>
                    <button
                      className="hover:bg-gray-100 w-full px-4 cursor-pointer flex items-center gap-1"
                      onClick={deleteAction}
                    >
                      Delete{" "}
                      {deleteLoading && <Spinner height="10" width="10" />}
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
          {!edit.form && (
            <p className="font-text font-light text-sm">
              {props.comment.comment}
            </p>
          )}
          {edit.form && (
            <form action={action}>
              {state?.message && (
                <p className="text-red-600 font-text">*{state.message}</p>
              )}
              <input
                type="number"
                name="id"
                id="id"
                defaultValue={props.comment.id}
                className="hidden"
                readOnly
              />
              <input
                type="number"
                readOnly
                defaultValue={props.comment.post_id}
                id="post_id"
                name="post_id"
              />
              <input
                value={edit.comment}
                onChange={(e) => setEdit({ ...edit, comment: e.target.value })}
                type="text"
                name="comment"
                autoFocus
                id="comment"
                className="border-b-gray-400 border-b w-full focus:outline-none focus:border-b-black focus:border-b-2 font-text text-sm font-light"
                placeholder="Add comment"
              />

              <div className="flex gap-2 mt-2 font-heading text-[0.8rem] items-center justify-end">
                <button
                  className="shadow py-1 px-4 rounded-2xl cursor-pointer hover:bg-gray-200"
                  type="button"
                  onClick={() => setEdit({ ...edit, form: false })}
                >
                  Cancel
                </button>
                <button
                  className="shadow py-1 px-4 rounded-2xl cursor-pointer text-white disabled:opacity-50 disabled:cursor-not-allowed bg-(--color-light) hover:bg-(--color-sub)"
                  disabled={
                    edit.comment == "" || edit.comment == props.comment.comment
                  }
                >
                  Save {pending && <Spinner height="10" width="10" />}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
