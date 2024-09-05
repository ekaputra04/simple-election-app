import { cn } from "@/lib/utils";
import Marquee from "@/components/magicui/marquee";
import Image from "next/image";

const reviews = [
  {
    name: "Alex",
    username: "@alex_votes",
    body: "The user interface is incredibly intuitive. I was able to cast my vote in seconds, and the candidate profiles were clear and informative.",
    img: "https://avatar.vercel.sh/alex",
  },
  {
    name: "Sara",
    username: "@sara_elections",
    body: "I appreciate the security measures in place. Knowing my vote is safe and anonymous gives me peace of mind.",
    img: "https://avatar.vercel.sh/sara",
  },
  {
    name: "Michael",
    username: "@mike_choice",
    body: "The ability to see detailed candidate information before voting made my decision-making process so much easier.",
    img: "https://avatar.vercel.sh/michael",
  },
  {
    name: "Emily",
    username: "@emily_cast",
    body: "This app makes voting straightforward and stress-free. The design is clean, and everything works smoothly.",
    img: "https://avatar.vercel.sh/emily",
  },
  {
    name: "David",
    username: "@david_picks",
    body: "I love how this app has streamlined the election process. No more confusion or hassle. Just a few clicks, and I'm done.",
    img: "https://avatar.vercel.sh/david",
  },
  {
    name: "Olivia",
    username: "@olivia_votes",
    body: "A revolutionary tool for elections. It's great to see technology making such a positive impact in the voting process.",
    img: "https://avatar.vercel.sh/olivia",
  },
];

const firstRow = reviews.slice(0, reviews.length / 2);
const secondRow = reviews.slice(reviews.length / 2);

const ReviewCard = ({
  img,
  name,
  username,
  body,
}: {
  img: string;
  name: string;
  username: string;
  body: string;
}) => {
  return (
    <figure
      className={cn(
        "relative w-64 cursor-pointer overflow-hidden rounded-xl border p-4",
        // light styles
        "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
        // dark styles
        "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]"
      )}
    >
      <div className="flex flex-row items-center gap-2">
        <img className="rounded-full" width="32" height="32" alt="" src={img} />
        <div className="flex flex-col">
          <figcaption className="font-medium text-sm dark:text-white">
            {name}
          </figcaption>
          <p className="font-medium text-xs dark:text-white/40">{username}</p>
        </div>
      </div>
      <blockquote className="mt-2 text-sm">{body}</blockquote>
    </figure>
  );
};

export function MarqueeDemo() {
  return (
    <div className="relative flex flex-col justify-center items-center bg-transparent w-full h-[500px] overflow-hidden">
      <Marquee pauseOnHover className="[--duration:20s]">
        {firstRow.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee>
      <Marquee reverse pauseOnHover className="[--duration:20s]">
        {secondRow.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee>
      <div className="left-0 absolute inset-y-0 bg-gradient-to-r from-white dark:from-background w-1/3 pointer-events-none"></div>
      <div className="right-0 absolute inset-y-0 bg-gradient-to-l from-white dark:from-background w-1/3 pointer-events-none"></div>
    </div>
  );
}
