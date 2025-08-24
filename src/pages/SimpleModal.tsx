import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogPortal,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface SimpleModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  content: string;
}

export default function SimpleModal({
  isOpen,
  onClose,
  title,
  content,
}: SimpleModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogPortal>
        <DialogContent className="sm:max-w-lg w-full">
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
          </DialogHeader>
          <div className="py-4">{content}</div>
          <div className="flex justify-end mt-4">
            <Button onClick={onClose}>Cerrar</Button>
          </div>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
}
