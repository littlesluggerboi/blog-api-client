import icons from "@/static_resources/icons";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "A Blogs | About",
};

export default async function Page() {
  return (
    <>
      <section className="mx-4 mt-16">
        <div className="flex justify-center my-8">
          <h1 className="gap-2 mb-4 font-heading font-bold text-4xl flex items-center">
            About{" "}
            <div className="flex">
              <div className="w-10">{icons.get("logo black")}</div>{" "}
              <span>Blogs</span>
            </div>
          </h1>
        </div>
        <div className="max-w-3xl m-auto shadow p-8 border-gray-200 border rounded-lg mb-8">
          <h2 className="font-heading font-semibold text-2xl mb-2">
            Our Mission
          </h2>
          <p className="font-text font-[350] leading-8 mb-4">
            Welcome to our blog platform! Our mission is to create a space where
            people can share ideas, knowledge, and experiences. We believe in
            the power of community and open dialogue.
          </p>
          <p className="font-text font-[350] leading-8">
            This platform was built with modern technologies to provide a
            seamless and enjoyable experience for both readers and content
            creators.
          </p>
        </div>
      </section>
      <section className="mx-4">
        <div className="max-w-3xl m-auto shadow p-8 border-gray-200 border rounded-lg mb-8">
          <h2 className="font-heading font-semibold text-2xl mb-2">Feautes</h2>
          <ul className="font-text font-[350] leading-8 mb-4">
            <li><span>&#9989;&nbsp;</span>User authentication and profile management</li>
            <li><span>&#9989;&nbsp;</span>Create, edit, and delete blog posts</li>
            <li><span>&#9989;&nbsp;</span>Comment system for engaging with posts</li>
            <li><span>&#9989;&nbsp;</span>Responsive design for all devices</li>
            <li><span>&#9989;&nbsp;</span>Admin dashboard for content moderation</li>
          </ul>
        </div>
      </section>
      <section className="mx-4">
        <div className="max-w-3xl m-auto shadow p-8 border-gray-200 border rounded-lg mb-16">
          <h2 className="font-heading font-semibold text-2xl mb-4">
            Technologies Used
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 md:grid-cols-3">
            <div className="bg-gray-100 p-4 rounded-lg">
              <h3 className="font-heading font-medium text-lg">Frontend</h3>
              <ul className="font-text font-[350] leading-8 mb-4">
                <li>React</li>
                <li>NextJS</li>
                <li>Tailwind CSS</li>
              </ul>
            </div>
            <div className="bg-gray-100 p-4 rounded-lg">
              <h3 className="font-heading font-medium text-lg">Backend</h3>
              <ul className="font-text font-[350] leading-8 mb-4">
                <li>Node.js</li>
                <li>Express</li>
                <li>PostgreSQL</li>
                <li>Prisma ORM</li>
              </ul>
            </div>
            <div className="bg-gray-100 p-4 rounded-lg">
              <h3 className="font-heading font-medium text-lg">
                Authentication
              </h3>
              <ul className="font-text font-[350] leading-8 mb-4">
                <li>JWT</li>
                <li>Passport.js</li>
                <li>bcrypt</li>
                <li>Session & Cookies</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
