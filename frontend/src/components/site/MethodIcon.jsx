import { ScanFace, Hand, Fingerprint, Grid3x3, Nfc, KeyRound, Smartphone, Video, Mic, Radio } from "lucide-react";

const ICONS = { face: ScanFace, palm: Hand, fingerprint: Fingerprint, pin: Grid3x3, keytag: Nfc, key: KeyRound, app: Smartphone, video: Video, voice: Mic, remote: Radio };

export const MethodIcon = ({ method, className = "h-4 w-4" }) => {
  const Icon = ICONS[method] || KeyRound;
  return <Icon className={className} strokeWidth={1.6} />;
};
