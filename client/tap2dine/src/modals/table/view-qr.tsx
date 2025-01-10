import QRCode from "react-qr-code";
import { ModalType } from "../../types/modal.types";
import { DIGITAL_MENU_LOGO } from "../../constants/images";
import { Button } from "../../components/ui/button";
import { PrinterCheck } from "lucide-react";

export default function ViewQr({ data }: ModalType<"VIEW_QR">) {
  return (
    <div>
      <div className="border rounded-md py-4">
        <div className="flex w-full items-center justify-center p-2">
          <img src={DIGITAL_MENU_LOGO} alt="logo" width={70} />
        </div>
        <div className="flex w-full items-center justify-center p-4">
          <QRCode value={data?.qr_code || ""} className="size-44" />
        </div>
        <p className="font-medium text-center">Table:{data?.name}</p>
        <p className="text-sm font-medium text-center">Today's Menu</p>
      </div>
      <div className="mt-4">
        <Button variant={"outline"}>
          <PrinterCheck />
          Print QR
        </Button>
      </div>
    </div>
  );
}
