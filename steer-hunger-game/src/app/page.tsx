import { GameEngine } from "@/components/GameEngine";

export default function HomePage() {
  return <GameEngine initialSource="website" isEmbedded={false} />;
}
