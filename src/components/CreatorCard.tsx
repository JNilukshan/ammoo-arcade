import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { Creator } from "@/lib/data";

interface CreatorCardProps {
  creator: Creator;
}

export function CreatorCard({ creator }: CreatorCardProps) {
  return (
    <Link href={`/store/${creator.id}`} className="group block">
      <div className="flex flex-col items-center text-center">
        <Image src={creator.avatar} alt={creator.name} width={80} height={80} className="rounded-full transition-transform duration-300 group-hover:scale-110" data-ai-hint="creator avatar" />
        <p className="mt-2 text-sm font-semibold">{creator.name}</p>
      </div>
    </Link>
  );
}
