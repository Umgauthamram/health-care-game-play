import { GameEngine } from "@/components/GameEngine";

export default function PlayGamePage() {
  return <GameEngine initialSource="website" isEmbedded={false} />;
}
