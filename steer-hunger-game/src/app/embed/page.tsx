import { GameEngine } from "@/components/GameEngine";

export default function EmbedPage() {
  return <GameEngine initialSource="website" isEmbedded={true} />;
}
